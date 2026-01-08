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
  | { type: 'editExternal'; path?: string }
  | { type: 'saveContent'; path: string; content: string }
  | { type: 'saveMetadata'; metadata: MetadataFields }
  | { type: 'addMedia' }
  | { type: 'removeMedia'; id: string }
  | { type: 'replaceMedia'; id: string }
  | { type: 'addMarkdown' }
  | { type: 'renameMarkdown'; oldPath: string; newPath: string }
  | { type: 'deleteMarkdown'; path: string }
  | { type: 'getMarkdownContent'; path: string };

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
  markdown?: string;
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
        // Edit mode is now handled in the webview - this is kept for backwards compatibility
        // The webview will request markdown content via getMarkdownContent
        return;
      }

      if (message.type === 'editExternal') {
        const pathToEdit = typeof message.path === 'string' && message.path.length > 0 ? message.path : selectedPath;
        if (!pathToEdit) {
          void vscode.window.showWarningMessage('MDOCX: No markdown file selected to edit.');
          return;
        }
        const editUri = MdocxFileSystemProvider.buildUri(document.uri, pathToEdit);
        await vscode.window.showTextDocument(editUri, { preview: false });
        return;
      }

      if (message.type === 'getMarkdownContent') {
        const pathToGet = message.path;
        if (!pathToGet) {
          return;
        }
        const text = await this.getMarkdownText(document.uri, pathToGet);
        await webviewPanel.webview.postMessage({
          type: 'markdownContent',
          path: pathToGet,
          content: text || ''
        });
        return;
      }

      if (message.type === 'saveContent') {
        const pathToSave = message.path;
        const content = message.content;
        if (!pathToSave) {
          void vscode.window.showWarningMessage('MDOCX: No file path specified.');
          return;
        }
        await this.saveMarkdownContent(document.uri, pathToSave, content);
        void vscode.window.showInformationMessage('MDOCX: File saved.');
        await postRender(selectedPath);
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
        return;
      }

      if (message.type === 'addMarkdown') {
        const fileName = await vscode.window.showInputBox({
          prompt: 'Enter the path for the new markdown file',
          value: 'new-file.md',
          validateInput: (value) => {
            if (!value || value.trim().length === 0) {
              return 'File name cannot be empty';
            }
            if (!value.endsWith('.md') && !value.endsWith('.markdown')) {
              return 'File must have .md or .markdown extension';
            }
            return undefined;
          }
        });
        if (fileName) {
          await this.addMarkdownFile(document.uri, fileName);
          void vscode.window.showInformationMessage(`MDOCX: Added ${fileName}`);
          selectedPath = fileName;
          await postRender(selectedPath);
        }
        return;
      }

      if (message.type === 'renameMarkdown') {
        await this.renameMarkdownFile(document.uri, message.oldPath, message.newPath);
        void vscode.window.showInformationMessage(`MDOCX: Renamed to ${message.newPath}`);
        if (selectedPath === message.oldPath) {
          selectedPath = message.newPath;
        }
        await postRender(selectedPath);
        return;
      }

      if (message.type === 'deleteMarkdown') {
        const confirm = await vscode.window.showWarningMessage(
          `Delete "${message.path}" from MDOCX? This cannot be undone.`,
          { modal: true },
          'Delete'
        );
        if (confirm === 'Delete') {
          await this.deleteMarkdownFile(document.uri, message.path);
          void vscode.window.showInformationMessage('MDOCX: File deleted.');
          if (selectedPath === message.path) {
            selectedPath = undefined;
          }
          await postRender(selectedPath);
        }
        return;
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
        markdown: markdownText,
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

  private async saveMarkdownContent(resource: vscode.Uri, filePath: string, content: string): Promise<void> {
    const bytes = await vscode.workspace.fs.readFile(resource);
    const { readMdocx, writeMdocxAsync } = await import('ts-mdocx');
    const doc = await readMdocx(bytes);

    // Defensive normalization
    doc.markdown = doc.markdown || { files: [] };
    if (!Array.isArray(doc.markdown.files)) doc.markdown.files = [];
    doc.media = doc.media || { items: [] };
    if (!Array.isArray(doc.media.items)) doc.media.items = [];

    const file = doc.markdown.files.find((f: { path: string }) => f.path === filePath);
    if (!file) {
      throw new Error(`File "${filePath}" not found in this MDOCX`);
    }

    // Update the content
    const encoder = new TextEncoder();
    file.content = encoder.encode(content);

    const newBytes = await writeMdocxAsync(doc.markdown, doc.media, {
      metadata: doc.metadata,
      markdownCompression: 'zip',
      mediaCompression: 'zip'
    });

    await vscode.workspace.fs.writeFile(resource, newBytes);
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

  private async addMarkdownFile(resource: vscode.Uri, filePath: string): Promise<void> {
    const bytes = await vscode.workspace.fs.readFile(resource);
    const { readMdocx, writeMdocxAsync } = await import('ts-mdocx');
    const doc = await readMdocx(bytes);

    // Defensive normalization
    doc.markdown = doc.markdown || { files: [] };
    if (!Array.isArray(doc.markdown.files)) doc.markdown.files = [];
    doc.media = doc.media || { items: [] };
    if (!Array.isArray(doc.media.items)) doc.media.items = [];

    // Check if file already exists
    const existing = doc.markdown.files.find((f: { path: string }) => f.path === filePath);
    if (existing) {
      throw new Error(`File "${filePath}" already exists in this MDOCX`);
    }

    // Create default content
    const fileName = path.basename(filePath, path.extname(filePath));
    const defaultContent = `# ${fileName}\n\nStart writing here...\n`;
    const encoder = new TextEncoder();

    doc.markdown.files.push({
      path: filePath,
      content: encoder.encode(defaultContent)
    });

    const newBytes = await writeMdocxAsync(doc.markdown, doc.media, {
      metadata: doc.metadata,
      markdownCompression: 'zip',
      mediaCompression: 'zip'
    });

    await vscode.workspace.fs.writeFile(resource, newBytes);
  }

  private async renameMarkdownFile(resource: vscode.Uri, oldPath: string, newPath: string): Promise<void> {
    const bytes = await vscode.workspace.fs.readFile(resource);
    const { readMdocx, writeMdocxAsync } = await import('ts-mdocx');
    const doc = await readMdocx(bytes);

    // Defensive normalization
    doc.markdown = doc.markdown || { files: [] };
    if (!Array.isArray(doc.markdown.files)) doc.markdown.files = [];
    doc.media = doc.media || { items: [] };
    if (!Array.isArray(doc.media.items)) doc.media.items = [];

    const file = doc.markdown.files.find((f: { path: string }) => f.path === oldPath);
    if (!file) {
      throw new Error(`File "${oldPath}" not found in this MDOCX`);
    }

    // Check if new path already exists
    const existing = doc.markdown.files.find((f: { path: string }) => f.path === newPath);
    if (existing) {
      throw new Error(`File "${newPath}" already exists in this MDOCX`);
    }

    file.path = newPath;

    // Update root path if it was pointing to the old file
    if (doc.markdown.rootPath === oldPath) {
      doc.markdown.rootPath = newPath;
    }

    const newBytes = await writeMdocxAsync(doc.markdown, doc.media, {
      metadata: doc.metadata,
      markdownCompression: 'zip',
      mediaCompression: 'zip'
    });

    await vscode.workspace.fs.writeFile(resource, newBytes);
  }

  private async deleteMarkdownFile(resource: vscode.Uri, filePath: string): Promise<void> {
    const bytes = await vscode.workspace.fs.readFile(resource);
    const { readMdocx, writeMdocxAsync } = await import('ts-mdocx');
    const doc = await readMdocx(bytes);

    // Defensive normalization
    doc.markdown = doc.markdown || { files: [] };
    if (!Array.isArray(doc.markdown.files)) doc.markdown.files = [];
    doc.media = doc.media || { items: [] };
    if (!Array.isArray(doc.media.items)) doc.media.items = [];

    const index = doc.markdown.files.findIndex((f: { path: string }) => f.path === filePath);
    if (index >= 0) {
      doc.markdown.files.splice(index, 1);
    }

    // Update root path if it was pointing to deleted file
    if (doc.markdown.rootPath === filePath && doc.markdown.files.length > 0) {
      doc.markdown.rootPath = doc.markdown.files[0].path;
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
      --border-color: var(--vscode-editorGroup-border);
      --panel-bg: color-mix(in srgb, var(--vscode-editor-background) 92%, black);
      --panel-hover-bg: color-mix(in srgb, var(--vscode-editor-background) 85%, black);
      --danger-bg: var(--vscode-inputValidation-errorBackground, #5a1d1d);
    }
    * { box-sizing: border-box; }
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
      z-index: 10;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border-color);
      background: var(--vscode-editor-background);
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }
    header .meta {
      flex: 1;
      min-width: 200px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow: hidden;
    }
    header .meta .title {
      font-weight: 600;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    header .meta .desc {
      opacity: 0.7;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    select, input, textarea {
      padding: 6px 10px;
      border: 1px solid var(--vscode-input-border, var(--border-color));
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      border-radius: 4px;
      font-family: var(--vscode-font-family);
      font-size: 13px;
    }
    select:focus, input:focus, textarea:focus {
      outline: 1px solid var(--vscode-focusBorder);
      outline-offset: -1px;
    }
    button {
      border: 1px solid var(--vscode-button-border, transparent);
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-family: var(--vscode-font-family);
      font-size: 12px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      transition: background 0.1s;
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
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    button.secondary {
      background: var(--vscode-button-secondaryBackground);
      color: var(--vscode-button-secondaryForeground);
    }
    button.secondary:hover {
      background: var(--vscode-button-secondaryHoverBackground);
    }
    button.active {
      background: var(--vscode-button-hoverBackground);
      box-shadow: inset 0 0 0 1px var(--vscode-focusBorder);
    }
    button.danger {
      background: var(--danger-bg);
    }
    button.small {
      padding: 3px 8px;
      font-size: 11px;
    }
    .layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      min-height: calc(100vh - 60px);
    }
    @media (max-width: 800px) {
      .layout {
        grid-template-columns: 1fr;
      }
      .sidebar {
        border-right: none !important;
        border-bottom: 1px solid var(--border-color);
      }
    }
    .sidebar {
      border-right: 1px solid var(--border-color);
      background: var(--panel-bg);
      overflow-y: auto;
      max-height: calc(100vh - 60px);
    }
    .main-content {
      padding: 20px 24px;
      overflow-y: auto;
      max-height: calc(100vh - 60px);
      display: flex;
      flex-direction: column;
    }
    .main-content img {
      max-width: 100%;
    }
    .main-content pre {
      padding: 12px;
      overflow: auto;
      background: var(--panel-bg);
      border: 1px solid var(--border-color);
      border-radius: 6px;
    }
    .main-content code {
      font-family: var(--vscode-editor-font-family);
    }
    .main-content h1:first-child { margin-top: 0; }
    .error {
      color: var(--vscode-errorForeground);
      padding: 12px 16px;
      border: 1px solid var(--vscode-errorForeground);
      border-radius: 6px;
      margin: 12px 0;
      white-space: pre-wrap;
    }
    
    /* Sidebar sections */
    .sidebar-section {
      border-bottom: 1px solid var(--border-color);
    }
    .sidebar-section:last-child {
      border-bottom: none;
    }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      cursor: pointer;
      user-select: none;
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.8;
    }
    .section-header:hover {
      background: var(--panel-hover-bg);
    }
    .section-header .chevron {
      width: 12px;
      height: 12px;
      fill: currentColor;
      transition: transform 0.15s;
    }
    .section-header.collapsed .chevron {
      transform: rotate(-90deg);
    }
    .section-header.collapsed + .section-body {
      display: none;
    }
    .section-body {
      padding: 8px 12px 12px;
    }
    .section-actions {
      display: flex;
      gap: 6px;
      margin-bottom: 10px;
    }

    /* File list */
    .file-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .file-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
    }
    .file-item:hover {
      background: var(--panel-hover-bg);
    }
    .file-item.selected {
      background: var(--vscode-list-activeSelectionBackground);
      color: var(--vscode-list-activeSelectionForeground);
    }
    .file-item .file-icon {
      width: 16px;
      height: 16px;
      fill: currentColor;
      opacity: 0.7;
      flex-shrink: 0;
    }
    .file-item .file-name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .file-item .file-actions {
      display: none;
      gap: 4px;
    }
    .file-item:hover .file-actions {
      display: flex;
    }
    .file-item .file-actions button {
      padding: 2px 4px;
      background: transparent;
      border: none;
      opacity: 0.7;
    }
    .file-item .file-actions button:hover {
      opacity: 1;
      background: var(--panel-hover-bg);
    }
    .file-item.root-file .file-name::after {
      content: ' (root)';
      opacity: 0.5;
      font-size: 11px;
    }

    /* Media grid */
    .media-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 8px;
    }
    .media-item {
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 8px;
      text-align: center;
      background: var(--vscode-editor-background);
    }
    .media-item img {
      max-width: 100%;
      max-height: 60px;
      object-fit: contain;
      margin-bottom: 6px;
      border-radius: 2px;
    }
    .media-item .placeholder {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--panel-bg);
      border-radius: 4px;
      margin-bottom: 6px;
      font-size: 10px;
      opacity: 0.6;
    }
    .media-item .info {
      font-size: 10px;
      word-break: break-all;
      opacity: 0.8;
    }
    .media-item .actions {
      margin-top: 6px;
      display: flex;
      gap: 4px;
      justify-content: center;
    }

    /* Form elements */
    .form-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 10px;
    }
    .form-row:last-child {
      margin-bottom: 0;
    }
    .form-row label {
      font-size: 11px;
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .form-row textarea {
      min-height: 50px;
      resize: vertical;
    }
    .btn-row {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }

    /* Empty state */
    .empty-state {
      text-align: center;
      padding: 20px;
      opacity: 0.6;
      font-size: 12px;
    }

    /* Badge */
    .badge {
      background: var(--vscode-badge-background);
      color: var(--vscode-badge-foreground);
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 10px;
      margin-left: 6px;
    }

    /* View toggle */
    .view-toggle {
      display: flex;
      border: 1px solid var(--vscode-button-border, var(--border-color));
      border-radius: 4px;
      overflow: hidden;
    }
    .view-toggle button {
      border: none;
      border-radius: 0;
      background: var(--vscode-button-secondaryBackground);
      color: var(--vscode-button-secondaryForeground);
    }
    .view-toggle button:first-child {
      border-right: 1px solid var(--vscode-button-border, var(--border-color));
    }
    .view-toggle button.active {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      box-shadow: none;
    }
    .view-toggle button:hover:not(.active) {
      background: var(--vscode-button-secondaryHoverBackground);
    }

    /* Editor view */
    #previewView {
      flex: 1;
    }
    #editorView {
      display: none;
      flex: 1;
      flex-direction: column;
      gap: 12px;
    }
    #editorView.active {
      display: flex;
    }
    #previewView.hidden {
      display: none;
    }
    .editor-toolbar {
      display: flex;
      gap: 8px;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-color);
    }
    .editor-toolbar .file-path {
      flex: 1;
      font-size: 12px;
      opacity: 0.8;
      font-family: var(--vscode-editor-font-family);
    }
    .editor-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    #markdownEditor {
      flex: 1;
      width: 100%;
      min-height: 400px;
      padding: 12px;
      border: 1px solid var(--vscode-input-border, var(--border-color));
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      border-radius: 6px;
      font-family: var(--vscode-editor-font-family);
      font-size: 13px;
      line-height: 1.5;
      resize: none;
      tab-size: 2;
    }
    #markdownEditor:focus {
      outline: 1px solid var(--vscode-focusBorder);
      outline-offset: -1px;
    }
    .editor-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 8px;
      font-size: 11px;
      opacity: 0.7;
    }
    .editor-status .modified {
      color: var(--vscode-gitDecoration-modifiedResourceForeground, #e2c08d);
    }
    .editor-actions {
      display: flex;
      gap: 8px;
    }
  </style>
</head>
<body>
  <header>
    <div class="meta">
      <div id="docTitle" class="title">MDOCX</div>
      <div id="docDesc" class="desc"></div>
    </div>
    <div class="view-toggle">
      <button id="previewToggle" type="button" class="active" title="Preview Mode">
        <svg viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>
        Preview
      </button>
      <button id="editToggle" type="button" title="Edit Mode">
        <svg viewBox="0 0 16 16"><path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-4 1.5a.5.5 0 0 1-.638-.638l1.5-4a.5.5 0 0 1 .11-.168l9.5-9.5z"/></svg>
        Edit
      </button>
    </div>
    <button id="copyBtn" type="button" class="secondary" title="Copy Markdown to Clipboard">
      <svg viewBox="0 0 16 16"><path d="M10 1H3.5A1.5 1.5 0 0 0 2 2.5V10h1V2.5a.5.5 0 0 1 .5-.5H10V1z"/><path d="M5.5 4H12A2 2 0 0 1 14 6v6.5A2 2 0 0 1 12 14H5.5A2 2 0 0 1 3.5 12.5V6A2 2 0 0 1 5.5 4zm0 1A1 1 0 0 0 4.5 6v6.5a1 1 0 0 0 1 1H12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5.5z"/></svg>
      Copy
    </button>
    <button id="editExternalBtn" type="button" class="secondary" title="Edit in VS Code Editor">
      <svg viewBox="0 0 16 16"><path d="M4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V4.207L10.793 1H4.5z"/><path d="M10 1v3.5a.5.5 0 0 0 .5.5H14"/></svg>
      Open in Editor
    </button>
  </header>

  <div class="layout">
    <aside class="sidebar">
      <!-- Files Section -->
      <div class="sidebar-section">
        <div class="section-header" id="filesHeader">
          <span>Files <span class="badge" id="fileCount">0</span></span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body" id="filesBody">
          <div class="section-actions">
            <button type="button" id="addFileBtn" class="small">+ Add File</button>
          </div>
          <ul class="file-list" id="fileList"></ul>
        </div>
      </div>

      <!-- Media Section -->
      <div class="sidebar-section">
        <div class="section-header" id="mediaHeader">
          <span>Media <span class="badge" id="mediaCount">0</span></span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body" id="mediaBody">
          <div class="section-actions">
            <button type="button" id="addMediaBtn" class="small">+ Add Media</button>
          </div>
          <div class="media-grid" id="mediaGrid"></div>
        </div>
      </div>

      <!-- Metadata Section -->
      <div class="sidebar-section">
        <div class="section-header collapsed" id="metadataHeader">
          <span>Metadata</span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body" id="metadataBody">
          <div class="form-row">
            <label for="metaTitle">Title</label>
            <input type="text" id="metaTitle" placeholder="Document title" />
          </div>
          <div class="form-row">
            <label for="metaDescription">Description</label>
            <textarea id="metaDescription" placeholder="Description"></textarea>
          </div>
          <div class="form-row">
            <label for="metaAuthor">Author</label>
            <input type="text" id="metaAuthor" placeholder="Author" />
          </div>
          <div class="form-row">
            <label for="metaRoot">Root File</label>
            <select id="metaRoot"></select>
          </div>
          <div class="form-row">
            <label for="metaTags">Tags</label>
            <input type="text" id="metaTags" placeholder="tag1, tag2" />
          </div>
          <div class="btn-row">
            <button type="button" id="saveMetadataBtn" class="small">Save Metadata</button>
          </div>
        </div>
      </div>
    </aside>

    <main class="main-content">
      <div id="error" class="error" style="display:none"></div>
      <div id="previewView">
        <div id="content"></div>
      </div>
      <div id="editorView">
        <div class="editor-toolbar">
          <span class="file-path" id="editorFilePath"></span>
          <button type="button" id="discardBtn" class="secondary small">Discard</button>
          <button type="button" id="saveBtn" class="small">Save</button>
        </div>
        <div class="editor-container">
          <textarea id="markdownEditor" placeholder="Enter markdown content..."></textarea>
        </div>
        <div class="editor-status">
          <span id="editorStatus"></span>
          <div class="editor-actions">
            <span id="charCount">0 characters</span>
          </div>
        </div>
      </div>
    </main>
  </div>

  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    const state = vscode.getState() || {};

    // Elements
    const content = document.getElementById('content');
    const error = document.getElementById('error');
    const docTitle = document.getElementById('docTitle');
    const docDesc = document.getElementById('docDesc');
    const fileList = document.getElementById('fileList');
    const fileCount = document.getElementById('fileCount');
    const mediaGrid = document.getElementById('mediaGrid');
    const mediaCount = document.getElementById('mediaCount');
    const metaTitle = document.getElementById('metaTitle');
    const metaDescription = document.getElementById('metaDescription');
    const metaAuthor = document.getElementById('metaAuthor');
    const metaRoot = document.getElementById('metaRoot');
    const metaTags = document.getElementById('metaTags');
    const previewView = document.getElementById('previewView');
    const editorView = document.getElementById('editorView');
    const markdownEditor = document.getElementById('markdownEditor');
    const editorFilePath = document.getElementById('editorFilePath');
    const editorStatus = document.getElementById('editorStatus');
    const charCount = document.getElementById('charCount');
    const previewToggle = document.getElementById('previewToggle');
    const editToggle = document.getElementById('editToggle');

    let currentFiles = [];
    let currentPath = '';
    let rootPath = '';
    let isEditMode = false;
    let originalContent = '';
    let isModified = false;

    // Section toggle
    document.querySelectorAll('.section-header').forEach(header => {
      header.addEventListener('click', () => header.classList.toggle('collapsed'));
    });

    function setError(message) {
      error.style.display = message ? 'block' : 'none';
      error.textContent = message || '';
    }

    function escapeHtml(str) {
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function formatBytes(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    function updateEditorStatus() {
      const len = markdownEditor.value.length;
      charCount.textContent = len + ' character' + (len !== 1 ? 's' : '');
      isModified = markdownEditor.value !== originalContent;
      if (isModified) {
        editorStatus.innerHTML = '<span class="modified">● Modified</span>';
      } else {
        editorStatus.textContent = '';
      }
    }

    function switchToPreview() {
      if (isModified) {
        // Could prompt to save, but for simplicity just switch
      }
      isEditMode = false;
      previewView.classList.remove('hidden');
      editorView.classList.remove('active');
      previewToggle.classList.add('active');
      editToggle.classList.remove('active');
    }

    function switchToEdit() {
      isEditMode = true;
      previewView.classList.add('hidden');
      editorView.classList.add('active');
      previewToggle.classList.remove('active');
      editToggle.classList.add('active');
      editorFilePath.textContent = currentPath;
      vscode.postMessage({ type: 'getMarkdownContent', path: currentPath });
    }

    function setFiles(files, selected, root) {
      currentFiles = files || [];
      currentPath = selected || currentFiles[0] || '';
      rootPath = root || '';
      fileCount.textContent = currentFiles.length;
      fileList.innerHTML = '';
      metaRoot.innerHTML = '';

      if (currentFiles.length === 0) {
        fileList.innerHTML = '<li class="empty-state">No files yet</li>';
        return;
      }

      for (const path of currentFiles) {
        // File list item
        const li = document.createElement('li');
        li.className = 'file-item' + (path === currentPath ? ' selected' : '') + (path === rootPath ? ' root-file' : '');
        li.innerHTML = \`
          <svg class="file-icon" viewBox="0 0 16 16"><path d="M4 0h5.5L14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 0v4.5H14L9.5 0zM4.5 12.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/></svg>
          <span class="file-name">\${escapeHtml(path)}</span>
          <span class="file-actions">
            <button type="button" title="Edit" data-action="edit" data-path="\${escapeHtml(path)}">
              <svg viewBox="0 0 16 16" width="12" height="12"><path fill="currentColor" d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-4 1.5a.5.5 0 0 1-.638-.638l1.5-4a.5.5 0 0 1 .11-.168l9.5-9.5z"/></svg>
            </button>
            <button type="button" title="Delete" data-action="delete" data-path="\${escapeHtml(path)}">
              <svg viewBox="0 0 16 16" width="12" height="12"><path fill="currentColor" d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill="currentColor" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
            </button>
          </span>
        \`;
        li.addEventListener('click', (e) => {
          if (e.target.closest('button')) return;
          // If in edit mode and modified, confirm before switching
          if (isEditMode && isModified) {
            if (!confirm('You have unsaved changes. Discard them?')) return;
          }
          vscode.postMessage({ type: 'select', path });
        });
        fileList.appendChild(li);

        // Root select option
        const opt = document.createElement('option');
        opt.value = path;
        opt.textContent = path;
        metaRoot.appendChild(opt);
      }

      // Update root select
      if (rootPath) metaRoot.value = rootPath;
    }

    function setMetadata(metadata) {
      if (!metadata) return;
      metaTitle.value = metadata.title || '';
      metaDescription.value = metadata.description || '';
      metaAuthor.value = metadata.author || '';
      if (metadata.root) {
        rootPath = metadata.root;
        metaRoot.value = metadata.root;
      }
      metaTags.value = Array.isArray(metadata.tags) ? metadata.tags.join(', ') : '';
    }

    function setMediaItems(items) {
      mediaCount.textContent = items ? items.length : 0;
      mediaGrid.innerHTML = '';
      if (!items || items.length === 0) {
        mediaGrid.innerHTML = '<div class="empty-state">No media</div>';
        return;
      }
      for (const item of items) {
        const div = document.createElement('div');
        div.className = 'media-item';
        div.innerHTML = \`
          \${item.dataUri 
            ? \`<img src="\${item.dataUri}" alt="\${escapeHtml(item.id)}" />\`
            : \`<div class="placeholder">\${escapeHtml(item.mimeType || 'binary')}</div>\`
          }
          <div class="info">\${escapeHtml(item.id)}<br/>\${formatBytes(item.size)}</div>
          <div class="actions">
            <button type="button" class="small secondary" data-action="replace" data-id="\${escapeHtml(item.id)}">Replace</button>
            <button type="button" class="small danger" data-action="remove" data-id="\${escapeHtml(item.id)}">✕</button>
          </div>
        \`;
        mediaGrid.appendChild(div);
      }
    }

    // Event delegation for file actions
    fileList.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const path = btn.dataset.path;
      if (action === 'edit') {
        // Switch to inline edit for that file
        if (isEditMode && isModified && currentPath !== path) {
          if (!confirm('You have unsaved changes. Discard them?')) return;
        }
        vscode.postMessage({ type: 'select', path });
        setTimeout(() => switchToEdit(), 100);
      } else if (action === 'delete') {
        vscode.postMessage({ type: 'deleteMarkdown', path });
      }
    });

    // Event delegation for media actions
    mediaGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      if (action === 'replace') {
        vscode.postMessage({ type: 'replaceMedia', id });
      } else if (action === 'remove') {
        vscode.postMessage({ type: 'removeMedia', id });
      }
    });

    // Button handlers
    document.getElementById('copyBtn').addEventListener('click', () => {
      vscode.postMessage({ type: 'copy', path: currentPath });
    });

    document.getElementById('editExternalBtn').addEventListener('click', () => {
      vscode.postMessage({ type: 'editExternal', path: currentPath });
    });

    previewToggle.addEventListener('click', () => {
      if (!isEditMode) return;
      if (isModified) {
        if (!confirm('You have unsaved changes. Discard them?')) return;
      }
      switchToPreview();
    });

    editToggle.addEventListener('click', () => {
      if (isEditMode) return;
      switchToEdit();
    });

    document.getElementById('saveBtn').addEventListener('click', () => {
      if (!currentPath) return;
      vscode.postMessage({ type: 'saveContent', path: currentPath, content: markdownEditor.value });
      originalContent = markdownEditor.value;
      updateEditorStatus();
    });

    document.getElementById('discardBtn').addEventListener('click', () => {
      if (isModified) {
        if (!confirm('Discard all changes?')) return;
      }
      markdownEditor.value = originalContent;
      updateEditorStatus();
    });

    markdownEditor.addEventListener('input', updateEditorStatus);

    // Handle Ctrl+S in editor
    markdownEditor.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (currentPath) {
          vscode.postMessage({ type: 'saveContent', path: currentPath, content: markdownEditor.value });
          originalContent = markdownEditor.value;
          updateEditorStatus();
        }
      }
    });

    document.getElementById('addFileBtn').addEventListener('click', () => {
      vscode.postMessage({ type: 'addMarkdown' });
    });

    document.getElementById('addMediaBtn').addEventListener('click', () => {
      vscode.postMessage({ type: 'addMedia' });
    });

    document.getElementById('saveMetadataBtn').addEventListener('click', () => {
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

    // Init
    vscode.postMessage({ type: 'ready', selectedPath: state.selectedPath });

    // Message handler
    window.addEventListener('message', (event) => {
      const msg = event.data;
      
      // Handle markdown content for editor
      if (msg && msg.type === 'markdownContent') {
        markdownEditor.value = msg.content || '';
        originalContent = msg.content || '';
        editorFilePath.textContent = msg.path || currentPath;
        updateEditorStatus();
        markdownEditor.focus();
        return;
      }

      if (!msg || msg.type !== 'render') return;

      docTitle.textContent = msg.title || 'MDOCX';
      docDesc.textContent = msg.description || '';

      if (Array.isArray(msg.fileList)) {
        setFiles(msg.fileList, msg.path, msg.metadata?.root);
      }

      if (msg.metadata) {
        setMetadata(msg.metadata);
      }

      if (msg.mediaItems) {
        setMediaItems(msg.mediaItems);
      }

      if (msg.path) {
        vscode.setState({ selectedPath: msg.path });
        // If in edit mode, update the editor content
        if (isEditMode && msg.markdown) {
          markdownEditor.value = msg.markdown;
          originalContent = msg.markdown;
          editorFilePath.textContent = msg.path;
          updateEditorStatus();
        }
      }

      setError(msg.error || null);

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
