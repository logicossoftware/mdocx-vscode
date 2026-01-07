import * as vscode from 'vscode';
import { Buffer } from 'buffer';
import * as path from 'path';
import { TextDecoder } from 'util';
import { marked } from 'marked';
import { MdocxFileSystemProvider } from './mdocxFileSystemProvider.js';

type RenderRequestMessage =
  | { type: 'ready'; selectedPath?: string }
  | { type: 'select'; path: string }
  | { type: 'copy'; path?: string }
  | { type: 'edit'; path?: string }
  | { type: 'saveMetadata'; metadata: MetadataFields }
  | { type: 'addMedia' }
  | { type: 'removeMedia'; id: string }
  | { type: 'replaceMedia'; id: string };

type MetadataFields = {
  title?: string;
  description?: string;
  author?: string;
  root?: string;
  tags?: string[];
};

type MediaItemInfo = {
  id: string;
  path?: string;
  mimeType?: string;
  size: number;
  dataUri?: string;
};

type RenderResponseMessage = {
  type: 'render';
  path: string;
  title?: string;
  description?: string;
  html: string;
  error?: string;
  fileList: string[];
  metadata?: MetadataFields;
  mediaItems?: MediaItemInfo[];
};

const viewType = 'mdocx.preview';

export class MdocxPreviewEditorProvider implements vscode.CustomReadonlyEditorProvider {
  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new MdocxPreviewEditorProvider(context);
    return vscode.window.registerCustomEditorProvider(viewType, provider, {
      webviewOptions: {
        retainContextWhenHidden: true
      }
    });
  }

  constructor(private readonly _context: vscode.ExtensionContext) {}

  async openCustomDocument(
    uri: vscode.Uri,
    _openContext: vscode.CustomDocumentOpenContext,
    _token: vscode.CancellationToken
  ): Promise<vscode.CustomDocument> {
    return {
      uri,
      dispose: () => {
        // No-op: readonly documents do not need explicit cleanup here.
      }
    };
  }

  async resolveCustomEditor(
    document: vscode.CustomDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    webviewPanel.webview.options = {
      enableScripts: true
    };

    let selectedPath: string | undefined;
    let hasReceivedReady = false;

    const postRender = async (path?: string) => {
      const response = await this.renderDocument(document.uri, path ?? selectedPath);
      selectedPath = response.path || path || selectedPath;
      await webviewPanel.webview.postMessage(response);
    };

    // Set up message handler BEFORE setting HTML to avoid race condition
    const messageDisposable = webviewPanel.webview.onDidReceiveMessage(async (message: RenderRequestMessage) => {
      if (!message || typeof (message as any).type !== 'string') return;

      if (message.type === 'ready') {
        hasReceivedReady = true;
        if (typeof message.selectedPath === 'string' && message.selectedPath.length > 0) {
          selectedPath = message.selectedPath;
        }
        await postRender(selectedPath);
        return;
      }

      if (message.type === 'select' && typeof message.path === 'string') {
        selectedPath = message.path;
        await postRender(selectedPath);
        return;
      }

      if (message.type === 'copy') {
        const pathToCopy = typeof message.path === 'string' && message.path.length > 0 ? message.path : selectedPath;
        const text = await this.getMarkdownText(document.uri, pathToCopy);
        if (!text) {
          void vscode.window.showWarningMessage('MDOCX: No markdown content to copy.');
          return;
        }
        await vscode.env.clipboard.writeText(text);
        void vscode.window.showInformationMessage('MDOCX: Markdown copied to clipboard.');
        return;
      }

      if (message.type === 'edit') {
        const pathToEdit = typeof message.path === 'string' && message.path.length > 0 ? message.path : selectedPath;
        if (!pathToEdit) {
          void vscode.window.showWarningMessage('MDOCX: No markdown file selected to edit.');
          return;
        }
        const editUri = MdocxFileSystemProvider.buildUri(document.uri, pathToEdit);
        await vscode.window.showTextDocument(editUri, { preview: false });
        return;
      }

      if (message.type === 'saveMetadata') {
        await this.saveMetadata(document.uri, message.metadata);
        void vscode.window.showInformationMessage('MDOCX: Metadata saved.');
        await postRender(selectedPath);
        return;
      }

      if (message.type === 'addMedia') {
        const files = await vscode.window.showOpenDialog({
          canSelectMany: true,
          openLabel: 'Add Media',
          filters: {
            'Images': ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'],
            'All Files': ['*']
          }
        });
        if (files && files.length > 0) {
          await this.addMediaFiles(document.uri, files);
          void vscode.window.showInformationMessage(`MDOCX: Added ${files.length} media file(s).`);
          await postRender(selectedPath);
        }
        return;
      }

      if (message.type === 'removeMedia') {
        const confirm = await vscode.window.showWarningMessage(
          `Remove media "${message.id}" from MDOCX?`,
          { modal: true },
          'Remove'
        );
        if (confirm === 'Remove') {
          await this.removeMedia(document.uri, message.id);
          void vscode.window.showInformationMessage('MDOCX: Media removed.');
          await postRender(selectedPath);
        }
        return;
      }

      if (message.type === 'replaceMedia') {
        const files = await vscode.window.showOpenDialog({
          canSelectMany: false,
          openLabel: 'Replace Media',
          filters: {
            'Images': ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'],
            'All Files': ['*']
          }
        });
        if (files && files.length > 0) {
          await this.replaceMedia(document.uri, message.id, files[0]);
          void vscode.window.showInformationMessage('MDOCX: Media replaced.');
          await postRender(selectedPath);
        }
      }
    });

    const pattern = new vscode.RelativePattern(path.dirname(document.uri.fsPath), path.basename(document.uri.fsPath));
    const watcher = vscode.workspace.createFileSystemWatcher(pattern);

    const onDiskChange = async () => {
      await postRender(selectedPath);
    };

    const watcherDisposables = [
      watcher,
      watcher.onDidChange(onDiskChange),
      watcher.onDidCreate(onDiskChange),
      watcher.onDidDelete(async () => {
        await webviewPanel.webview.postMessage({
          type: 'render',
          path: '',
          title: 'MDOCX',
          description: undefined,
          html: '',
          fileList: [],
          error: 'The file was deleted from disk.'
        } satisfies RenderResponseMessage);
      })
    ];

    // Now set the HTML after message handler is ready
    webviewPanel.webview.html = this.getWebviewHtml(webviewPanel.webview);

    // Fallback: if we don't receive 'ready' within 500ms, render anyway
    // This handles cases where the message was lost due to timing
    setTimeout(async () => {
      if (!hasReceivedReady) {
        await postRender(selectedPath);
      }
    }, 500);

    webviewPanel.onDidDispose(() => {
      messageDisposable.dispose();
      watcherDisposables.forEach(d => d.dispose());
    });
  }

  private async renderDocument(resource: vscode.Uri, selectedPath?: string): Promise<RenderResponseMessage> {
    try {
      const bytes = await vscode.workspace.fs.readFile(resource);
      const { readMdocx, MediaResolver } = await import('ts-mdocx');
      const doc = await readMdocx(bytes);

      // Ensure expected structures exist to avoid runtime errors for malformed docs
      doc.markdown = doc.markdown || { files: [] };
      if (!Array.isArray(doc.markdown.files)) doc.markdown.files = [];
      doc.media = doc.media || { items: [] };
      if (!Array.isArray(doc.media.items)) doc.media.items = [];
      const fileList = doc.markdown.files.map((file: { path: string }) => file.path).sort((a: string, b: string) => a.localeCompare(b));

      const rootPath =
        selectedPath ??
        doc.markdown.rootPath ??
        (typeof doc.metadata?.root === 'string' ? doc.metadata.root : undefined) ??
        doc.markdown.files[0]?.path;

      const rootFile = doc.markdown.files.find((file: { path: string }) => file.path === rootPath) ?? doc.markdown.files[0];
      if (!rootFile) {
        return {
          type: 'render',
          path: selectedPath ?? '',
          html: '',
          fileList,
          error: 'No markdown files found in this MDOCX.'
        };
      }

      const decoder = new TextDecoder('utf-8');
      const markdownText = decoder.decode(rootFile.content);

      const resolver = new MediaResolver(doc);

      const html = this.renderMarkdownToHtml(markdownText, {
        resolveMediaHref: (href) => this.tryResolveMediaHrefToDataUri(resolver, href, rootFile)
      });

      const title = typeof (doc.metadata as any)?.title === 'string' ? (doc.metadata as any).title : undefined;
      const description =
        typeof (doc.metadata as any)?.description === 'string' ? (doc.metadata as any).description : undefined;

      // Extract metadata fields
      const metadata: MetadataFields = {
        title,
        description,
        author: typeof (doc.metadata as any)?.creator === 'string' ? (doc.metadata as any).creator : undefined,
        root: doc.markdown.rootPath ?? (doc.metadata as any)?.root,
        tags: Array.isArray((doc.metadata as any)?.tags) ? (doc.metadata as any).tags : undefined
      };

      // Extract media items info with thumbnails for images
      const mediaItems: MediaItemInfo[] = (doc.media.items || []).map((item: any) => {
        const info: MediaItemInfo = {
          id: item.id,
          path: item.path,
          mimeType: item.mimeType,
          size: item.data?.byteLength ?? 0
        };
        // Generate small thumbnail for images
        if (item.mimeType?.startsWith('image/') && item.data && item.data.byteLength < 500 * 1024) {
          info.dataUri = `data:${item.mimeType};base64,${Buffer.from(item.data).toString('base64')}`;
        }
        return info;
      });

      return {
        type: 'render',
        path: rootFile.path,
        title,
        description,
        html,
        fileList,
        metadata,
        mediaItems
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        type: 'render',
        path: selectedPath ?? '',
        html: '',
        fileList: [],
        error: `Failed to read MDOCX: ${message}`
      };
    }
  }

  private async getMarkdownText(resource: vscode.Uri, selectedPath?: string): Promise<string | undefined> {
    try {
      const bytes = await vscode.workspace.fs.readFile(resource);
      const { readMdocx } = await import('ts-mdocx');
      const doc = await readMdocx(bytes);

      // Defensive normalization
      doc.markdown = doc.markdown || { files: [] };
      if (!Array.isArray(doc.markdown.files)) doc.markdown.files = [];
      const rootPath =
        selectedPath ??
        doc.markdown.rootPath ??
        (typeof doc.metadata?.root === 'string' ? doc.metadata.root : undefined) ??
        doc.markdown.files[0]?.path;

      const rootFile = doc.markdown.files.find((file: { path: string }) => file.path === rootPath) ?? doc.markdown.files[0];
      if (!rootFile) return undefined;

      const decoder = new TextDecoder('utf-8');
      return decoder.decode(rootFile.content);
    } catch {
      return undefined;
    }
  }

  private async saveMetadata(resource: vscode.Uri, metadata: MetadataFields): Promise<void> {
    const bytes = await vscode.workspace.fs.readFile(resource);
    const { readMdocx, writeMdocxAsync } = await import('ts-mdocx');
    const doc = await readMdocx(bytes);

    // Defensive normalization
    doc.markdown = doc.markdown || { files: [] };
    if (!Array.isArray(doc.markdown.files)) doc.markdown.files = [];
    // Update metadata
    const existingMetadata = (doc.metadata || {}) as Record<string, any>;
    if (metadata.title !== undefined) existingMetadata.title = metadata.title;
    if (metadata.description !== undefined) existingMetadata.description = metadata.description;
    if (metadata.author !== undefined) existingMetadata.creator = metadata.author;
    if (metadata.root !== undefined) existingMetadata.root = metadata.root;
    if (metadata.tags !== undefined) existingMetadata.tags = metadata.tags;

    // Update root path in markdown bundle
    if (metadata.root !== undefined) {
      doc.markdown.rootPath = metadata.root;
    }

    const newBytes = await writeMdocxAsync(doc.markdown, doc.media, {
      metadata: existingMetadata,
      markdownCompression: 'zip',
      mediaCompression: 'zip'
    });

    await vscode.workspace.fs.writeFile(resource, newBytes);
  }

  private async addMediaFiles(resource: vscode.Uri, files: vscode.Uri[]): Promise<void> {
    const bytes = await vscode.workspace.fs.readFile(resource);
    const { readMdocx, writeMdocxAsync } = await import('ts-mdocx');
    const doc = await readMdocx(bytes);

    // Defensive normalization
    doc.markdown = doc.markdown || { files: [] };
    if (!Array.isArray(doc.markdown.files)) doc.markdown.files = [];
    doc.media = doc.media || { items: [] };
    if (!Array.isArray(doc.media.items)) doc.media.items = [];
    const baseTime = Date.now();
    let index = 0;
    for (const file of files) {
      const data = await vscode.workspace.fs.readFile(file);
      const fileName = path.basename(file.fsPath);
      const ext = path.extname(fileName).toLowerCase();
      const id = fileName.replace(/[^a-zA-Z0-9_-]/g, '_') + '_' + (baseTime + index++);
      const mimeType = this.getMimeTypeFromExtension(ext);

      doc.media.items.push({
        id,
        path: `media/${fileName}`,
        mimeType,
        data: new Uint8Array(data)
      });
    }

    const newBytes = await writeMdocxAsync(doc.markdown, doc.media, {
      metadata: doc.metadata,
      markdownCompression: 'zip',
      mediaCompression: 'zip'
    });

    await vscode.workspace.fs.writeFile(resource, newBytes);
  }

  private async removeMedia(resource: vscode.Uri, mediaId: string): Promise<void> {
    const bytes = await vscode.workspace.fs.readFile(resource);
    const { readMdocx, writeMdocxAsync } = await import('ts-mdocx');
    const doc = await readMdocx(bytes);

    // Defensive normalization
    doc.markdown = doc.markdown || { files: [] };
    if (!Array.isArray(doc.markdown.files)) doc.markdown.files = [];
    doc.media = doc.media || { items: [] };
    if (!Array.isArray(doc.media.items)) doc.media.items = [];
    const index = doc.media.items.findIndex((item: any) => item.id === mediaId);
    if (index >= 0) {
      doc.media.items.splice(index, 1);
    }

    const newBytes = await writeMdocxAsync(doc.markdown, doc.media, {
      metadata: doc.metadata,
      markdownCompression: 'zip',
      mediaCompression: 'zip'
    });

    await vscode.workspace.fs.writeFile(resource, newBytes);
  }

  private async replaceMedia(resource: vscode.Uri, mediaId: string, newFile: vscode.Uri): Promise<void> {
    const bytes = await vscode.workspace.fs.readFile(resource);
    const { readMdocx, writeMdocxAsync } = await import('ts-mdocx');
    const doc = await readMdocx(bytes);

    const item = doc.media.items.find((i: any) => i.id === mediaId);
    if (item) {
      const data = await vscode.workspace.fs.readFile(newFile);
      const fileName = path.basename(newFile.fsPath);
      const ext = path.extname(fileName).toLowerCase();
      item.data = new Uint8Array(data);
      item.mimeType = this.getMimeTypeFromExtension(ext);
      item.path = `media/${fileName}`;
    }

    const newBytes = await writeMdocxAsync(doc.markdown, doc.media, {
      metadata: doc.metadata,
      markdownCompression: 'zip',
      mediaCompression: 'zip'
    });

    await vscode.workspace.fs.writeFile(resource, newBytes);
  }

  private getMimeTypeFromExtension(ext: string): string {
    const mimeTypes: Record<string, string> = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.webm': 'video/webm',
      '.pdf': 'application/pdf'
    };
    return mimeTypes[ext] || 'application/octet-stream';
  }

  private renderMarkdownToHtml(
    markdown: string,
    options?: {
      resolveMediaHref?: (href: string) => string | undefined;
    }
  ): string {
    const sanitizeHref = (href: string | null | undefined): string | null => {
      const raw = (href ?? '').trim();
      if (!raw) return null;
      if (raw.startsWith('#')) return raw;
      if (/^mailto:/i.test(raw)) return raw;
      if (/^data:/i.test(raw)) return raw;
      if (/^https?:\/\//i.test(raw)) return raw;
      return null;
    };

    // Webview safety:
    // - drop raw HTML
    // - strip unsafe URLs (e.g. javascript:)
    const renderer = new marked.Renderer();
    renderer.html = () => '';
    renderer.link = (href: string | null, title: string | null, text: string) => {
      const safe = sanitizeHref(href);
      if (!safe) return text;
      const t = title ? ` title="${this.escapeHtmlAttr(title)}"` : '';
      const external = /^https?:\/\//i.test(safe);
      const rel = external ? ' rel="noreferrer noopener" target="_blank"' : '';
      return `<a href="${this.escapeHtmlAttr(safe)}"${t}${rel}>${text}</a>`;
    };
    renderer.image = (href: string | null, title: string | null, text: string) => {
      const safe = sanitizeHref(href);
      if (!safe) return '';
      const t = title ? ` title="${this.escapeHtmlAttr(title)}"` : '';
      const alt = this.escapeHtmlAttr(text ?? '');
      return `<img src="${this.escapeHtmlAttr(safe)}" alt="${alt}"${t} />`;
    };

    const walkTokens = (token: any) => {
      if (!options?.resolveMediaHref) return;
      if (!token || typeof token.type !== 'string') return;

      if ((token.type === 'image' || token.type === 'link') && typeof token.href === 'string') {
        const rewritten = options.resolveMediaHref(token.href);
        if (rewritten) {
          token.href = rewritten;
        }
      }
    };

    const parsed = marked.parse(markdown, { renderer, walkTokens } as any);
    return typeof parsed === 'string' ? parsed : '';
  }

  private tryResolveMediaHrefToDataUri(resolver: any, href: string, fromFile: { path: string }): string | undefined {
    const rawHref = href.trim().replace(/^<|>$/g, '');
    if (!rawHref) return undefined;

    // Don't touch external links or existing data URIs.
    // NOTE: `mdocx://media/...` is internal and should be resolved.
    if (/^https?:\/\//i.test(rawHref) || /^data:/i.test(rawHref) || /^mailto:/i.test(rawHref) || rawHref.startsWith('#')) {
      return undefined;
    }

    const withoutFragmentOrQuery = rawHref.split('#')[0]?.split('?')[0] ?? rawHref;
    const normalizedSlashes = withoutFragmentOrQuery.replace(/\\/g, '/');

    const candidates = new Set<string>([
      normalizedSlashes,
      normalizedSlashes.startsWith('./') ? normalizedSlashes.slice(2) : normalizedSlashes,
      normalizedSlashes.startsWith('/') ? normalizedSlashes.slice(1) : normalizedSlashes
    ]);

    // Best-effort decode (handles spaces like %20)
    try {
      candidates.add(decodeURI(normalizedSlashes));
    } catch {
      // ignore
    }

    let item: any | undefined;
    for (const candidate of candidates) {
      try {
        item = resolver.resolve(candidate, fromFile);
        if (item) break;
      } catch {
        // ignore and try next candidate
      }

      // Fall back to explicit getters if available
      try {
        if (!item && typeof resolver.getByPath === 'function') {
          item = resolver.getByPath(candidate);
          if (item) break;
        }
      } catch {
        // ignore
      }

      try {
        const m = /^mdocx:\/\/media\/(.+)$/i.exec(candidate);
        if (!item && m && typeof resolver.getById === 'function') {
          item = resolver.getById(m[1]);
          if (item) break;
        }
      } catch {
        // ignore
      }
    }

    if (!item || !item.data) return undefined;

    const maxInlineBytes = this.getMaxInlineMediaBytes();
    if (typeof item.data.byteLength === 'number' && item.data.byteLength > maxInlineBytes) {
      return undefined;
    }

    const inferred = this.inferMimeType(item);
    const mimeType = typeof item.mimeType === 'string' && item.mimeType.length > 0 ? item.mimeType : inferred;
    const base64 = Buffer.from(item.data).toString('base64');
    return `data:${mimeType};base64,${base64}`;
  }

  private inferMimeType(item: { mimeType?: string; path?: string; data?: Uint8Array }): string {
    const p = typeof item.path === 'string' ? item.path.toLowerCase() : '';
    if (p.endsWith('.png')) return 'image/png';
    if (p.endsWith('.jpg') || p.endsWith('.jpeg')) return 'image/jpeg';
    if (p.endsWith('.gif')) return 'image/gif';
    if (p.endsWith('.webp')) return 'image/webp';
    if (p.endsWith('.svg')) return 'image/svg+xml';

    const bytes = item.data;
    if (!bytes || bytes.length < 12) return 'application/octet-stream';

    // PNG
    if (
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a
    ) {
      return 'image/png';
    }

    // JPEG
    if (bytes[0] === 0xff && bytes[1] === 0xd8) {
      return 'image/jpeg';
    }

    // GIF
    if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
      return 'image/gif';
    }

    // WEBP: RIFF....WEBP
    if (
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    ) {
      return 'image/webp';
    }

    // SVG (best-effort)
    try {
      const head = new TextDecoder('utf-8').decode(bytes.slice(0, 256));
      if (head.includes('<svg') || head.includes('<?xml')) {
        return 'image/svg+xml';
      }
    } catch {
      // ignore
    }

    return 'application/octet-stream';
  }

  private getMaxInlineMediaBytes(): number {
    const configured = vscode.workspace.getConfiguration('mdocx').get<number>('maxInlineMediaBytes');
    if (typeof configured === 'number' && Number.isFinite(configured) && configured > 0) {
      return configured;
    }
    return 25 * 1024 * 1024;
  }

  private getWebviewHtml(webview: vscode.Webview): string {
    const nonce = String(Date.now());

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: https: http:; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MDOCX Preview</title>
  <style>
    :root {
      color-scheme: light dark;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: var(--vscode-font-family);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
    }
    header {
      position: sticky;
      top: 0;
      z-index: 2;
      padding: 10px 12px;
      border-bottom: 1px solid var(--vscode-editorGroup-border);
      background: var(--vscode-editor-background);
      display: flex;
      gap: 10px;
      align-items: center;
    }
    header .meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow: hidden;
    }
    header .meta .title {
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    header .meta .desc {
      opacity: 0.8;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    select {
      min-width: 240px;
      max-width: 50vw;
    }
    button {
      border: 1px solid var(--vscode-button-border, transparent);
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      padding: 3px 8px;
      border-radius: 6px;
      cursor: pointer;
      font-family: var(--vscode-font-family);
      font-size: 12px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }
    button svg {
      width: 14px;
      height: 14px;
      fill: currentColor;
      opacity: 0.9;
    }
    button:hover {
      background: var(--vscode-button-hoverBackground);
    }
    main {
      padding: 18px 22px;
    }
    main img {
      max-width: 100%;
    }
    main pre {
      padding: 12px;
      overflow: auto;
      background: color-mix(in srgb, var(--vscode-editor-background) 85%, black);
      border: 1px solid var(--vscode-editorGroup-border);
      border-radius: 6px;
    }
    main code {
      font-family: var(--vscode-editor-font-family);
    }
    .error {
      color: var(--vscode-errorForeground);
      padding: 10px 12px;
      border: 1px solid var(--vscode-errorForeground);
      border-radius: 6px;
      margin: 12px 0;
      white-space: pre-wrap;
    }
    .panel {
      margin: 12px 0;
      border: 1px solid var(--vscode-editorGroup-border);
      border-radius: 6px;
      overflow: hidden;
    }
    .panel-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: color-mix(in srgb, var(--vscode-editor-background) 90%, black);
      cursor: pointer;
      user-select: none;
    }
    .panel-header:hover {
      background: color-mix(in srgb, var(--vscode-editor-background) 80%, black);
    }
    .panel-header .chevron {
      width: 12px;
      height: 12px;
      fill: currentColor;
      transition: transform 0.15s;
    }
    .panel-header.collapsed .chevron {
      transform: rotate(-90deg);
    }
    .panel-header h3 {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
    }
    .panel-body {
      padding: 12px;
    }
    .panel-header.collapsed + .panel-body {
      display: none;
    }
    .form-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 12px;
    }
    .form-row label {
      font-size: 12px;
      opacity: 0.8;
    }
    .form-row input, .form-row textarea {
      padding: 6px 8px;
      border: 1px solid var(--vscode-input-border, var(--vscode-editorGroup-border));
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      border-radius: 4px;
      font-family: var(--vscode-font-family);
      font-size: 13px;
    }
    .form-row textarea {
      min-height: 60px;
      resize: vertical;
    }
    .media-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 12px;
    }
    .media-item {
      border: 1px solid var(--vscode-editorGroup-border);
      border-radius: 6px;
      padding: 8px;
      text-align: center;
      position: relative;
    }
    .media-item img {
      max-width: 100%;
      max-height: 80px;
      object-fit: contain;
      margin-bottom: 6px;
    }
    .media-item .placeholder {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: color-mix(in srgb, var(--vscode-editor-background) 85%, black);
      border-radius: 4px;
      margin-bottom: 6px;
      font-size: 11px;
      opacity: 0.6;
    }
    .media-item .info {
      font-size: 11px;
      word-break: break-all;
    }
    .media-item .actions {
      margin-top: 6px;
      display: flex;
      gap: 4px;
      justify-content: center;
    }
    .media-item button {
      padding: 2px 6px;
      font-size: 11px;
    }
    .btn-row {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
  </style>
</head>
<body>
  <header>
    <select id="fileSelect" aria-label="MDOCX markdown file"></select>
    <button id="copyBtn" type="button" title="Copy Markdown to Clipboard" aria-label="Copy Markdown to Clipboard">
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M10 1H3.5A1.5 1.5 0 0 0 2 2.5V10h1V2.5a.5.5 0 0 1 .5-.5H10V1z"/>
        <path d="M5.5 4H12A2 2 0 0 1 14 6v6.5A2 2 0 0 1 12 14H5.5A2 2 0 0 1 3.5 12.5V6A2 2 0 0 1 5.5 4zm0 1A1 1 0 0 0 4.5 6v6.5a1 1 0 0 0 1 1H12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5.5z"/>
      </svg>
      Copy
    </button>
    <button id="editBtn" type="button" title="Edit Markdown" aria-label="Edit Markdown">
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-4 1.5a.5.5 0 0 1-.638-.638l1.5-4a.5.5 0 0 1 .11-.168l9.5-9.5zM11.207 2L3 10.207V10.5a.5.5 0 0 0 .5.5h.293L12 2.793 11.207 2zM2.5 12.5l-.646.647.793 2.121 2.121.793.647-.646L2.5 12.5z"/>
      </svg>
      Edit
    </button>
    <div class="meta">
      <div id="docTitle" class="title">MDOCX</div>
      <div id="docDesc" class="desc"></div>
    </div>
  </header>
  <main>
    <div id="error" class="error" style="display:none"></div>

    <!-- Metadata Panel -->
    <div class="panel">
      <div class="panel-header collapsed" id="metadataHeader">
        <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        <h3>Metadata</h3>
      </div>
      <div class="panel-body" id="metadataBody">
        <div class="form-row">
          <label for="metaTitle">Title</label>
          <input type="text" id="metaTitle" placeholder="Document title" />
        </div>
        <div class="form-row">
          <label for="metaDescription">Description</label>
          <textarea id="metaDescription" placeholder="Document description"></textarea>
        </div>
        <div class="form-row">
          <label for="metaAuthor">Author</label>
          <input type="text" id="metaAuthor" placeholder="Author name" />
        </div>
        <div class="form-row">
          <label for="metaRoot">Root File</label>
          <select id="metaRoot"></select>
        </div>
        <div class="form-row">
          <label for="metaTags">Tags (comma-separated)</label>
          <input type="text" id="metaTags" placeholder="tag1, tag2, tag3" />
        </div>
        <div class="btn-row">
          <button type="button" id="saveMetadataBtn">Save Metadata</button>
        </div>
      </div>
    </div>

    <!-- Media Panel -->
    <div class="panel">
      <div class="panel-header collapsed" id="mediaHeader">
        <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        <h3>Media (<span id="mediaCount">0</span>)</h3>
      </div>
      <div class="panel-body" id="mediaBody">
        <div class="btn-row" style="margin-top:0;margin-bottom:12px;">
          <button type="button" id="addMediaBtn">+ Add Media</button>
        </div>
        <div class="media-grid" id="mediaGrid"></div>
      </div>
    </div>

    <!-- Content Preview -->
    <div id="content"></div>
  </main>

  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();

    const state = vscode.getState() || {};

    const fileSelect = document.getElementById('fileSelect');
    const copyBtn = document.getElementById('copyBtn');
    const editBtn = document.getElementById('editBtn');
    const content = document.getElementById('content');
    const error = document.getElementById('error');
    const docTitle = document.getElementById('docTitle');
    const docDesc = document.getElementById('docDesc');

    // Metadata elements
    const metadataHeader = document.getElementById('metadataHeader');
    const metaTitle = document.getElementById('metaTitle');
    const metaDescription = document.getElementById('metaDescription');
    const metaAuthor = document.getElementById('metaAuthor');
    const metaRoot = document.getElementById('metaRoot');
    const metaTags = document.getElementById('metaTags');
    const saveMetadataBtn = document.getElementById('saveMetadataBtn');

    // Media elements
    const mediaHeader = document.getElementById('mediaHeader');
    const mediaCount = document.getElementById('mediaCount');
    const mediaGrid = document.getElementById('mediaGrid');
    const addMediaBtn = document.getElementById('addMediaBtn');

    // Panel toggle
    document.querySelectorAll('.panel-header').forEach(header => {
      header.addEventListener('click', () => {
        header.classList.toggle('collapsed');
      });
    });

    function setError(message) {
      if (!message) {
        error.style.display = 'none';
        error.textContent = '';
        return;
      }
      error.style.display = 'block';
      error.textContent = message;
    }

    function setFiles(files, currentPath) {
      const prev = fileSelect.value;
      fileSelect.innerHTML = '';
      metaRoot.innerHTML = '';
      for (const path of files || []) {
        const opt = document.createElement('option');
        opt.value = path;
        opt.textContent = path;
        fileSelect.appendChild(opt);

        const rootOpt = document.createElement('option');
        rootOpt.value = path;
        rootOpt.textContent = path;
        metaRoot.appendChild(rootOpt);
      }
      const desired = currentPath || prev || (files && files[0]) || '';
      if (desired) {
        fileSelect.value = desired;
      }
    }

    function setMetadata(metadata) {
      if (!metadata) return;
      metaTitle.value = metadata.title || '';
      metaDescription.value = metadata.description || '';
      metaAuthor.value = metadata.author || '';
      if (metadata.root) metaRoot.value = metadata.root;
      metaTags.value = Array.isArray(metadata.tags) ? metadata.tags.join(', ') : '';
    }

    function setMediaItems(items) {
      mediaCount.textContent = items ? items.length : 0;
      mediaGrid.innerHTML = '';
      if (!items || items.length === 0) {
        mediaGrid.innerHTML = '<p style="opacity:0.6;font-size:12px;">No media items</p>';
        return;
      }
      for (const item of items) {
        const div = document.createElement('div');
        div.className = 'media-item';

        if (item.dataUri) {
          const img = document.createElement('img');
          img.src = item.dataUri;
          img.alt = item.id;
          div.appendChild(img);
        } else {
          const placeholder = document.createElement('div');
          placeholder.className = 'placeholder';
          placeholder.textContent = item.mimeType || 'binary';
          div.appendChild(placeholder);
        }

        const info = document.createElement('div');
        info.className = 'info';
        info.innerHTML = '<strong>' + escapeHtml(item.id) + '</strong><br/>' +
          (item.path ? escapeHtml(item.path) + '<br/>' : '') +
          formatBytes(item.size);
        div.appendChild(info);

        const actions = document.createElement('div');
        actions.className = 'actions';

        const replaceBtn = document.createElement('button');
        replaceBtn.type = 'button';
        replaceBtn.textContent = 'Replace';
        replaceBtn.onclick = () => vscode.postMessage({ type: 'replaceMedia', id: item.id });
        actions.appendChild(replaceBtn);

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.textContent = 'Remove';
        removeBtn.style.background = 'var(--vscode-inputValidation-errorBackground, #5a1d1d)';
        removeBtn.onclick = () => vscode.postMessage({ type: 'removeMedia', id: item.id });
        actions.appendChild(removeBtn);

        div.appendChild(actions);
        mediaGrid.appendChild(div);
      }
    }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function formatBytes(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    fileSelect.addEventListener('change', () => {
      setError(null);
      vscode.setState({ selectedPath: fileSelect.value });
      vscode.postMessage({ type: 'select', path: fileSelect.value });
    });

    copyBtn.addEventListener('click', () => {
      vscode.postMessage({ type: 'copy', path: fileSelect.value });
    });

    editBtn.addEventListener('click', () => {
      vscode.postMessage({ type: 'edit', path: fileSelect.value });
    });

    saveMetadataBtn.addEventListener('click', () => {
      const tagsStr = metaTags.value.trim();
      const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : undefined;
      vscode.postMessage({
        type: 'saveMetadata',
        metadata: {
          title: metaTitle.value || undefined,
          description: metaDescription.value || undefined,
          author: metaAuthor.value || undefined,
          root: metaRoot.value || undefined,
          tags
        }
      });
    });

    addMediaBtn.addEventListener('click', () => {
      vscode.postMessage({ type: 'addMedia' });
    });

    // Ask extension to render using persisted selection (if any).
    vscode.postMessage({ type: 'ready', selectedPath: state.selectedPath });

    window.addEventListener('message', (event) => {
      const msg = event.data;
      if (!msg || msg.type !== 'render') return;

      if (msg.title) docTitle.textContent = msg.title;
      else docTitle.textContent = 'MDOCX';

      docDesc.textContent = msg.description || '';

      if (Array.isArray(msg.fileList)) {
        setFiles(msg.fileList, msg.path);
      }

      if (msg.metadata) {
        setMetadata(msg.metadata);
        // Sync metaRoot after files are populated
        if (msg.metadata.root) {
          metaRoot.value = msg.metadata.root;
        }
      }

      if (msg.mediaItems) {
        setMediaItems(msg.mediaItems);
      }

      if (msg.path) {
        vscode.setState({ selectedPath: msg.path });
      }

      if (msg.error) {
        setError(msg.error);
      } else {
        setError(null);
      }

      if (typeof msg.html === 'string') {
        content.innerHTML = msg.html;
      }
    });
  </script>
</body>
</html>`;
  }

  private escapeHtmlAttr(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}
