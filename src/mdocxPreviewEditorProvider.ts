import * as vscode from 'vscode';
import * as path from 'path';
import { MdocxFileSystemProvider } from './mdocxFileSystemProvider.js';
import {
  MdocxDocument,
  decodeText,
  encodeText,
  findMarkdownFile,
  getMaxInlineMediaBytes,
  getMimeTypeFromExtension,
  inferMimeType,
  makeMediaId,
  readDocument,
  updateDocument
} from './mdocxDocument.js';
import { OutlineEntry, hrefCandidates, isExternalHref, renderMarkdown, toDataUri } from './mdocxRender.js';

type RenderRequestMessage =
  | { type: 'ready'; selectedPath?: string }
  | { type: 'select'; path: string }
  | { type: 'copy'; path?: string }
  | { type: 'editExternal'; path?: string }
  | { type: 'saveContent'; path: string; content: string }
  | { type: 'saveMetadata'; metadata: MetadataFields }
  | { type: 'addMedia' }
  | { type: 'removeMedia'; id: string }
  | { type: 'replaceMedia'; id: string }
  | { type: 'exportMedia'; id: string }
  | { type: 'addMarkdown' }
  | { type: 'renameMarkdown'; path: string }
  | { type: 'duplicateMarkdown'; path: string }
  | { type: 'deleteMarkdown'; path: string }
  | { type: 'setRoot'; path: string }
  | { type: 'getMarkdownContent'; path: string }
  | { type: 'renderPreview'; path: string; content: string }
  | { type: 'search'; query: string }
  | { type: 'exportHtml' };

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
  used: boolean;
};

type FileEntry = {
  path: string;
  words: number;
  size: number;
  isRoot: boolean;
};

type DocumentStats = {
  files: number;
  media: number;
  words: number;
  mediaBytes: number;
};

type RenderResponseMessage = {
  type: 'render';
  path: string;
  title?: string;
  description?: string;
  html: string;
  markdown?: string;
  outline?: OutlineEntry[];
  error?: string;
  fileList: FileEntry[];
  metadata?: MetadataFields;
  mediaItems?: MediaItemInfo[];
  stats?: DocumentStats;
};

type SearchResult = {
  path: string;
  line: number;
  text: string;
};

const viewType = 'mdocx.preview';
const SELF_WRITE_GRACE_MS = 900;

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
    let lastSelfWrite = 0;

    const postRender = async (target?: string) => {
      const response = await this.renderDocument(document.uri, target ?? selectedPath);
      selectedPath = response.path || target || selectedPath;
      await webviewPanel.webview.postMessage(response);
    };

    const mutate = async (action: () => Promise<void>, successMessage?: string) => {
      try {
        lastSelfWrite = Date.now();
        await action();
        lastSelfWrite = Date.now();
        if (successMessage) {
          void vscode.window.showInformationMessage(successMessage);
        }
        await postRender(selectedPath);
        return true;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        void vscode.window.showErrorMessage(`MDOCX: ${message}`);
        return false;
      }
    };

    const confirmDestructive = async (prompt: string, action: string): Promise<boolean> => {
      const shouldConfirm = vscode.workspace.getConfiguration('mdocx').get<boolean>('confirmDelete', true);
      if (!shouldConfirm) return true;
      const answer = await vscode.window.showWarningMessage(prompt, { modal: true }, action);
      return answer === action;
    };

    // Set up message handler BEFORE setting HTML to avoid a race condition.
    const messageDisposable = webviewPanel.webview.onDidReceiveMessage(async (message: RenderRequestMessage) => {
      if (!message || typeof (message as any).type !== 'string') return;

      switch (message.type) {
        case 'ready': {
          hasReceivedReady = true;
          if (typeof message.selectedPath === 'string' && message.selectedPath.length > 0) {
            selectedPath = message.selectedPath;
          }
          await postRender(selectedPath);
          return;
        }

        case 'select': {
          selectedPath = message.path;
          await postRender(selectedPath);
          return;
        }

        case 'copy': {
          const pathToCopy = message.path || selectedPath;
          const text = await this.getMarkdownText(document.uri, pathToCopy);
          if (!text) {
            void vscode.window.showWarningMessage('MDOCX: No markdown content to copy.');
            return;
          }
          await vscode.env.clipboard.writeText(text);
          void vscode.window.showInformationMessage('MDOCX: Markdown copied to clipboard.');
          return;
        }

        case 'editExternal': {
          const pathToEdit = message.path || selectedPath;
          if (!pathToEdit) {
            void vscode.window.showWarningMessage('MDOCX: No markdown file selected to edit.');
            return;
          }
          const editUri = MdocxFileSystemProvider.buildUri(document.uri, pathToEdit);
          await vscode.window.showTextDocument(editUri, { preview: false });
          return;
        }

        case 'getMarkdownContent': {
          if (!message.path) return;
          const text = await this.getMarkdownText(document.uri, message.path);
          await webviewPanel.webview.postMessage({
            type: 'markdownContent',
            path: message.path,
            content: text || ''
          });
          return;
        }

        case 'renderPreview': {
          const rendered = await this.renderLivePreview(document.uri, message.path, message.content);
          await webviewPanel.webview.postMessage({ type: 'previewHtml', path: message.path, ...rendered });
          return;
        }

        case 'search': {
          const results = await this.search(document.uri, message.query);
          await webviewPanel.webview.postMessage({ type: 'searchResults', query: message.query, results });
          return;
        }

        case 'saveContent': {
          if (!message.path) {
            void vscode.window.showWarningMessage('MDOCX: No file path specified.');
            return;
          }
          const ok = await mutate(() =>
            updateDocument(document.uri, (doc) => {
              const file = doc.markdown.files.find((f) => f.path === message.path);
              if (!file) throw new Error(`File "${message.path}" not found in this MDOCX`);
              file.content = encodeText(message.content);
            })
          );
          if (ok) {
            await webviewPanel.webview.postMessage({ type: 'saved', path: message.path });
          }
          return;
        }

        case 'saveMetadata': {
          await mutate(() => this.saveMetadata(document.uri, message.metadata), 'MDOCX: Metadata saved.');
          return;
        }

        case 'addMedia': {
          const files = await vscode.window.showOpenDialog({
            canSelectMany: true,
            openLabel: 'Add Media',
            filters: {
              Images: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'avif'],
              Media: ['mp3', 'wav', 'ogg', 'mp4', 'webm'],
              'All Files': ['*']
            }
          });
          if (files && files.length > 0) {
            await mutate(() => this.addMediaFiles(document.uri, files), `MDOCX: Added ${files.length} media file(s).`);
          }
          return;
        }

        case 'removeMedia': {
          if (!(await confirmDestructive(`Remove media "${message.id}" from MDOCX?`, 'Remove'))) return;
          await mutate(
            () =>
              updateDocument(document.uri, (doc) => {
                const index = doc.media.items.findIndex((item) => item.id === message.id);
                if (index >= 0) doc.media.items.splice(index, 1);
              }),
            'MDOCX: Media removed.'
          );
          return;
        }

        case 'replaceMedia': {
          const files = await vscode.window.showOpenDialog({
            canSelectMany: false,
            openLabel: 'Replace Media',
            filters: { 'All Files': ['*'] }
          });
          if (files && files.length > 0) {
            await mutate(() => this.replaceMedia(document.uri, message.id, files[0]), 'MDOCX: Media replaced.');
          }
          return;
        }

        case 'exportMedia': {
          await this.exportMedia(document.uri, message.id);
          return;
        }

        case 'addMarkdown': {
          const existing = (await this.safeReadDocument(document.uri))?.markdown.files.map((f) => f.path) ?? [];
          const fileName = await vscode.window.showInputBox({
            prompt: 'Enter the path for the new markdown file',
            value: 'new-file.md',
            validateInput: (value) => this.validateMarkdownPath(value, existing)
          });
          if (!fileName) return;
          const created = await mutate(
            () =>
              updateDocument(document.uri, (doc) => {
                const name = path.basename(fileName, path.extname(fileName));
                doc.markdown.files.push({
                  path: fileName,
                  content: encodeText(`# ${name}\n\nStart writing here...\n`)
                });
              }),
            `MDOCX: Added ${fileName}`
          );
          if (created) {
            selectedPath = fileName;
            await postRender(selectedPath);
          }
          return;
        }

        case 'renameMarkdown': {
          const existing = (await this.safeReadDocument(document.uri))?.markdown.files.map((f) => f.path) ?? [];
          const newPath = await vscode.window.showInputBox({
            prompt: 'Enter the new path for this markdown file',
            value: message.path,
            validateInput: (value) => (value === message.path ? undefined : this.validateMarkdownPath(value, existing))
          });
          if (!newPath || newPath === message.path) return;
          const renamed = await mutate(
            () =>
              updateDocument(document.uri, (doc) => {
                const file = doc.markdown.files.find((f) => f.path === message.path);
                if (!file) throw new Error(`File "${message.path}" not found in this MDOCX`);
                file.path = newPath;
                if (doc.markdown.rootPath === message.path) doc.markdown.rootPath = newPath;
                if (doc.metadata?.root === message.path) doc.metadata.root = newPath;
              }),
            `MDOCX: Renamed to ${newPath}`
          );
          if (renamed && selectedPath === message.path) {
            selectedPath = newPath;
            await postRender(selectedPath);
          }
          return;
        }

        case 'duplicateMarkdown': {
          await mutate(
            () =>
              updateDocument(document.uri, (doc) => {
                const file = doc.markdown.files.find((f) => f.path === message.path);
                if (!file) throw new Error(`File "${message.path}" not found in this MDOCX`);
                const taken = new Set(doc.markdown.files.map((f) => f.path));
                const ext = path.extname(message.path);
                const base = message.path.slice(0, message.path.length - ext.length);
                let candidate = `${base}-copy${ext}`;
                let index = 2;
                while (taken.has(candidate)) candidate = `${base}-copy-${index++}${ext}`;
                doc.markdown.files.push({ path: candidate, content: file.content.slice() });
              }),
            'MDOCX: File duplicated.'
          );
          return;
        }

        case 'setRoot': {
          await mutate(
            () =>
              updateDocument(document.uri, (doc) => {
                doc.markdown.rootPath = message.path;
                doc.metadata = doc.metadata || {};
                doc.metadata.root = message.path;
              }),
            `MDOCX: Root file set to ${message.path}`
          );
          return;
        }

        case 'deleteMarkdown': {
          if (!(await confirmDestructive(`Delete "${message.path}" from MDOCX? This cannot be undone.`, 'Delete'))) {
            return;
          }
          const deleted = await mutate(
            () =>
              updateDocument(document.uri, (doc) => {
                const index = doc.markdown.files.findIndex((f) => f.path === message.path);
                if (index >= 0) doc.markdown.files.splice(index, 1);
                if (doc.markdown.rootPath === message.path && doc.markdown.files.length > 0) {
                  doc.markdown.rootPath = doc.markdown.files[0].path;
                }
              }),
            'MDOCX: File deleted.'
          );
          if (deleted && selectedPath === message.path) {
            selectedPath = undefined;
            await postRender(undefined);
          }
          return;
        }

        case 'exportHtml': {
          await vscode.commands.executeCommand('mdocx.exportHtml', document.uri);
          return;
        }
      }
    });

    const pattern = new vscode.RelativePattern(path.dirname(document.uri.fsPath), path.basename(document.uri.fsPath));
    const watcher = vscode.workspace.createFileSystemWatcher(pattern);

    const onDiskChange = async () => {
      // Our own writes already trigger an explicit re-render; ignore the echo.
      if (Date.now() - lastSelfWrite < SELF_WRITE_GRACE_MS) return;
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

    webviewPanel.webview.html = this.getWebviewHtml(webviewPanel.webview);

    // Fallback: if 'ready' never arrives (lost message), render anyway.
    const readyFallback = setTimeout(async () => {
      if (!hasReceivedReady) {
        await postRender(selectedPath);
      }
    }, 500);

    webviewPanel.onDidDispose(() => {
      clearTimeout(readyFallback);
      messageDisposable.dispose();
      watcherDisposables.forEach((d) => d.dispose());
    });
  }

  private validateMarkdownPath(value: string, existing: string[]): string | undefined {
    const trimmed = (value || '').trim();
    if (!trimmed) return 'File name cannot be empty';
    if (!/\.(md|markdown)$/i.test(trimmed)) return 'File must have a .md or .markdown extension';
    if (trimmed.startsWith('/') || trimmed.includes('..') || /^[a-zA-Z]:/.test(trimmed)) {
      return 'Use a relative path inside the container (no "..", no drive letters)';
    }
    if (existing.includes(trimmed)) return `"${trimmed}" already exists in this MDOCX`;
    return undefined;
  }

  private async safeReadDocument(uri: vscode.Uri): Promise<MdocxDocument | undefined> {
    try {
      return await readDocument(uri);
    } catch {
      return undefined;
    }
  }

  private countWords(text: string): number {
    const matches = text.match(/[\p{L}\p{N}'-]+/gu);
    return matches ? matches.length : 0;
  }

  private async renderDocument(resource: vscode.Uri, selectedPath?: string): Promise<RenderResponseMessage> {
    try {
      const doc = await readDocument(resource);
      const { MediaResolver } = await import('ts-mdocx');

      const rootPath =
        doc.markdown.rootPath ?? (typeof doc.metadata?.root === 'string' ? doc.metadata.root : undefined);

      const fileList: FileEntry[] = doc.markdown.files
        .map((file) => ({
          path: file.path,
          words: this.countWords(decodeText(file.content)),
          size: file.content.byteLength,
          isRoot: file.path === rootPath
        }))
        .sort((a, b) => a.path.localeCompare(b.path));

      const selectedFile = findMarkdownFile(doc, selectedPath);
      if (!selectedFile) {
        return {
          type: 'render',
          path: selectedPath ?? '',
          html: '',
          fileList,
          error: 'No markdown files found in this MDOCX.'
        };
      }

      const markdownText = decodeText(selectedFile.content);
      const resolver = new MediaResolver(doc);
      const knownPaths = new Set(doc.markdown.files.map((f) => f.path));

      const { html, outline } = renderMarkdown(markdownText, {
        resolveMediaHref: (href) => this.tryResolveMediaHrefToDataUri(resolver, href, selectedFile),
        resolveFileHref: (href) => this.resolveEmbeddedFile(href, knownPaths)
      });

      const title = typeof doc.metadata?.title === 'string' ? doc.metadata.title : undefined;
      const description = typeof doc.metadata?.description === 'string' ? doc.metadata.description : undefined;

      const metadata: MetadataFields = {
        title,
        description,
        author: typeof doc.metadata?.creator === 'string' ? doc.metadata.creator : undefined,
        root: rootPath,
        tags: Array.isArray(doc.metadata?.tags) ? doc.metadata.tags : undefined
      };

      const allMarkdown = doc.markdown.files.map((f) => decodeText(f.content)).join('\n');
      const mediaItems: MediaItemInfo[] = doc.media.items.map((item) => {
        const mimeType = inferMimeType(item);
        const info: MediaItemInfo = {
          id: item.id,
          path: item.path,
          mimeType,
          size: item.data?.byteLength ?? 0,
          used: this.isMediaReferenced(item, allMarkdown)
        };
        if (mimeType.startsWith('image/') && item.data && item.data.byteLength < 512 * 1024) {
          info.dataUri = toDataUri(mimeType, item.data);
        }
        return info;
      });

      const stats: DocumentStats = {
        files: fileList.length,
        media: mediaItems.length,
        words: fileList.reduce((sum, f) => sum + f.words, 0),
        mediaBytes: mediaItems.reduce((sum, m) => sum + m.size, 0)
      };

      return {
        type: 'render',
        path: selectedFile.path,
        title,
        description,
        html,
        markdown: markdownText,
        outline,
        fileList,
        metadata,
        mediaItems,
        stats
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

  private async renderLivePreview(
    resource: vscode.Uri,
    filePath: string,
    content: string
  ): Promise<{ html: string; outline: OutlineEntry[] }> {
    try {
      const doc = await readDocument(resource);
      const { MediaResolver } = await import('ts-mdocx');
      const resolver = new MediaResolver(doc);
      const knownPaths = new Set(doc.markdown.files.map((f) => f.path));
      return renderMarkdown(content, {
        resolveMediaHref: (href) => this.tryResolveMediaHrefToDataUri(resolver, href, { path: filePath }),
        resolveFileHref: (href) => this.resolveEmbeddedFile(href, knownPaths)
      });
    } catch {
      return { html: '', outline: [] };
    }
  }

  private async search(resource: vscode.Uri, query: string): Promise<SearchResult[]> {
    const trimmed = (query || '').trim();
    if (trimmed.length < 2) return [];
    const doc = await this.safeReadDocument(resource);
    if (!doc) return [];

    const needle = trimmed.toLowerCase();
    const results: SearchResult[] = [];
    const limit = 200;

    for (const file of doc.markdown.files) {
      const lines = decodeText(file.content).split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        if (!lines[i].toLowerCase().includes(needle)) continue;
        results.push({ path: file.path, line: i + 1, text: lines[i].trim().slice(0, 160) });
        if (results.length >= limit) return results;
      }
    }
    return results;
  }

  private isMediaReferenced(item: { id: string; path?: string }, allMarkdown: string): boolean {
    if (allMarkdown.includes(item.id)) return true;
    if (item.path) {
      if (allMarkdown.includes(item.path)) return true;
      const base = item.path.split('/').pop();
      if (base && allMarkdown.includes(base)) return true;
    }
    return false;
  }

  private resolveEmbeddedFile(href: string, knownPaths: Set<string>): string | undefined {
    if (!href || isExternalHref(href)) return undefined;
    for (const candidate of hrefCandidates(href)) {
      if (knownPaths.has(candidate)) return candidate;
    }
    return undefined;
  }

  private async getMarkdownText(resource: vscode.Uri, selectedPath?: string): Promise<string | undefined> {
    try {
      const doc = await readDocument(resource);
      const file = findMarkdownFile(doc, selectedPath);
      return file ? decodeText(file.content) : undefined;
    } catch {
      return undefined;
    }
  }

  private async saveMetadata(resource: vscode.Uri, metadata: MetadataFields): Promise<void> {
    await updateDocument(resource, (doc) => {
      const existing = (doc.metadata || {}) as Record<string, any>;
      if (metadata.title !== undefined) existing.title = metadata.title;
      if (metadata.description !== undefined) existing.description = metadata.description;
      if (metadata.author !== undefined) existing.creator = metadata.author;
      if (metadata.root !== undefined) existing.root = metadata.root;
      if (metadata.tags !== undefined) existing.tags = metadata.tags;
      doc.metadata = existing;
      if (metadata.root !== undefined) doc.markdown.rootPath = metadata.root;
    });
  }

  private async addMediaFiles(resource: vscode.Uri, files: vscode.Uri[]): Promise<void> {
    const payloads = await Promise.all(
      files.map(async (file) => ({
        data: new Uint8Array(await vscode.workspace.fs.readFile(file)),
        fileName: path.basename(file.fsPath)
      }))
    );

    await updateDocument(resource, (doc) => {
      const taken = new Set(doc.media.items.map((item) => item.id));
      for (const { data, fileName } of payloads) {
        const id = makeMediaId(fileName, taken);
        taken.add(id);
        doc.media.items.push({
          id,
          path: `media/${fileName}`,
          mimeType: getMimeTypeFromExtension(path.extname(fileName)),
          data
        });
      }
    });
  }

  private async replaceMedia(resource: vscode.Uri, mediaId: string, newFile: vscode.Uri): Promise<void> {
    const data = new Uint8Array(await vscode.workspace.fs.readFile(newFile));
    const fileName = path.basename(newFile.fsPath);

    await updateDocument(resource, (doc) => {
      const item = doc.media.items.find((i) => i.id === mediaId);
      if (!item) throw new Error(`Media "${mediaId}" not found in this MDOCX`);
      item.data = data;
      item.mimeType = getMimeTypeFromExtension(path.extname(fileName));
      item.path = `media/${fileName}`;
    });
  }

  private async exportMedia(resource: vscode.Uri, mediaId: string): Promise<void> {
    try {
      const doc = await readDocument(resource);
      const item = doc.media.items.find((i) => i.id === mediaId);
      if (!item?.data) {
        void vscode.window.showWarningMessage(`MDOCX: Media "${mediaId}" has no data.`);
        return;
      }
      const suggested = item.path ? path.basename(item.path) : mediaId;
      const target = await vscode.window.showSaveDialog({
        defaultUri: vscode.Uri.joinPath(vscode.Uri.file(path.dirname(resource.fsPath)), suggested),
        saveLabel: 'Export Media'
      });
      if (!target) return;
      await vscode.workspace.fs.writeFile(target, item.data);
      void vscode.window.showInformationMessage(`MDOCX: Exported ${suggested}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      void vscode.window.showErrorMessage(`MDOCX: ${message}`);
    }
  }

  private tryResolveMediaHrefToDataUri(resolver: any, href: string, fromFile: { path: string }): string | undefined {
    if (!href || isExternalHref(href)) return undefined;

    let item: any | undefined;
    for (const candidate of hrefCandidates(href)) {
      try {
        item = resolver.resolve(candidate, fromFile);
        if (item) break;
      } catch {
        // ignore and try next candidate
      }

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

    const maxInlineBytes = getMaxInlineMediaBytes();
    if (typeof item.data.byteLength === 'number' && item.data.byteLength > maxInlineBytes) {
      return undefined;
    }

    return toDataUri(inferMimeType(item), item.data);
  }

  private getWebviewHtml(_webview: vscode.Webview): string {
    const nonce = String(Date.now());

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: https: http:; media-src data:; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MDOCX Preview</title>
  <style>
    :root {
      color-scheme: light dark;
      --border-color: var(--vscode-editorGroup-border, rgba(128,128,128,0.35));
      --panel-bg: color-mix(in srgb, var(--vscode-editor-background) 92%, black);
      --panel-hover-bg: color-mix(in srgb, var(--vscode-editor-background) 85%, black);
      --danger-bg: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      --header-height: 52px;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: var(--vscode-font-family);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
      overflow: hidden;
    }
    header {
      height: var(--header-height);
      padding: 0 12px;
      border-bottom: 1px solid var(--border-color);
      background: var(--vscode-editor-background);
      display: flex;
      gap: 8px;
      align-items: center;
    }
    header .meta {
      flex: 1;
      min-width: 60px;
      display: flex;
      flex-direction: column;
      gap: 1px;
      overflow: hidden;
    }
    header .meta .title {
      font-weight: 600;
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    header .meta .desc {
      opacity: 0.65;
      font-size: 11px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    select, input, textarea {
      padding: 5px 8px;
      border: 1px solid var(--vscode-input-border, var(--border-color));
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      border-radius: 4px;
      font-family: var(--vscode-font-family);
      font-size: 12px;
      width: 100%;
    }
    select:focus, input:focus, textarea:focus {
      outline: 1px solid var(--vscode-focusBorder);
      outline-offset: -1px;
    }
    button {
      border: 1px solid var(--vscode-button-border, transparent);
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-family: var(--vscode-font-family);
      font-size: 12px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
    }
    button svg { width: 13px; height: 13px; fill: currentColor; opacity: 0.9; }
    button:hover { background: var(--vscode-button-hoverBackground); }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    button.secondary {
      background: var(--vscode-button-secondaryBackground);
      color: var(--vscode-button-secondaryForeground);
    }
    button.secondary:hover { background: var(--vscode-button-secondaryHoverBackground); }
    button.small { padding: 3px 7px; font-size: 11px; }
    button.icon {
      background: transparent;
      border: none;
      color: var(--vscode-foreground);
      padding: 2px 4px;
      opacity: 0.75;
    }
    button.icon:hover { opacity: 1; background: var(--panel-hover-bg); }

    .layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      height: calc(100vh - var(--header-height));
    }
    .layout.sidebar-hidden { grid-template-columns: 1fr; }
    .layout.sidebar-hidden .sidebar { display: none; }
    @media (max-width: 760px) {
      .layout { grid-template-columns: 1fr; }
      .sidebar { border-right: none !important; border-bottom: 1px solid var(--border-color); }
    }
    .sidebar {
      border-right: 1px solid var(--border-color);
      background: var(--panel-bg);
      overflow-y: auto;
    }
    .main-content {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .view-area { flex: 1; display: flex; min-height: 0; }
    .view-area > section {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .view-area.mode-preview #editorView { display: none; }
    .view-area.mode-edit #previewView { display: none; }
    .view-area.mode-split #editorView { border-left: 1px solid var(--border-color); }

    .doc-body {
      padding: 20px 26px 60px;
      overflow-y: auto;
      flex: 1;
      line-height: 1.6;
    }
    .doc-body img { max-width: 100%; border-radius: 4px; }
    .doc-body h1, .doc-body h2, .doc-body h3, .doc-body h4 { line-height: 1.3; }
    .doc-body h1:first-child { margin-top: 0; }
    .doc-body h1, .doc-body h2 { border-bottom: 1px solid var(--border-color); padding-bottom: 0.25em; }
    .doc-body .heading-anchor {
      opacity: 0;
      text-decoration: none;
      margin-left: -0.8em;
      padding-right: 0.3em;
      color: var(--vscode-textLink-foreground);
      font-weight: 400;
    }
    .doc-body h1:hover .heading-anchor,
    .doc-body h2:hover .heading-anchor,
    .doc-body h3:hover .heading-anchor,
    .doc-body h4:hover .heading-anchor { opacity: 0.6; }
    .doc-body a { color: var(--vscode-textLink-foreground); }
    .doc-body blockquote {
      margin: 1em 0;
      padding: 0.4em 1em;
      border-left: 3px solid var(--vscode-textBlockQuote-border, var(--border-color));
      background: var(--vscode-textBlockQuote-background, transparent);
    }
    .doc-body table {
      border-collapse: collapse;
      margin: 1em 0;
      display: block;
      overflow-x: auto;
      max-width: 100%;
    }
    .doc-body th, .doc-body td { border: 1px solid var(--border-color); padding: 6px 10px; text-align: left; }
    .doc-body th { background: var(--panel-bg); }
    .doc-body code {
      font-family: var(--vscode-editor-font-family);
      font-size: 0.92em;
      background: var(--panel-hover-bg);
      padding: 0.1em 0.35em;
      border-radius: 3px;
    }
    .doc-body .code-block { position: relative; margin: 1em 0; }
    .doc-body .code-block pre {
      margin: 0;
      padding: 12px;
      overflow: auto;
      background: var(--panel-bg);
      border: 1px solid var(--border-color);
      border-radius: 6px;
    }
    .doc-body .code-block pre code { background: none; padding: 0; }
    .doc-body .code-block .code-lang {
      position: absolute;
      top: 7px;
      right: 66px;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.5;
    }
    .doc-body .code-block .copy-code {
      position: absolute;
      top: 4px;
      right: 6px;
      opacity: 0;
      transition: opacity 0.12s;
    }
    .doc-body .code-block:hover .copy-code { opacity: 1; }
    .doc-body input[type="checkbox"] { margin-right: 6px; }
    .doc-body .missing-media {
      display: inline-block;
      padding: 2px 6px;
      border: 1px dashed var(--vscode-errorForeground);
      border-radius: 4px;
      font-size: 11px;
      opacity: 0.8;
    }
    .doc-body hr { border: none; border-top: 1px solid var(--border-color); }

    .error {
      color: var(--vscode-errorForeground);
      padding: 10px 14px;
      border: 1px solid var(--vscode-errorForeground);
      border-radius: 6px;
      margin: 12px 24px;
      white-space: pre-wrap;
    }

    .sidebar-section { border-bottom: 1px solid var(--border-color); }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 9px 12px;
      cursor: pointer;
      user-select: none;
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.85;
    }
    .section-header:hover { background: var(--panel-hover-bg); }
    .section-header .chevron { width: 12px; height: 12px; fill: currentColor; transition: transform 0.15s; }
    .section-header.collapsed .chevron { transform: rotate(-90deg); }
    .section-header.collapsed + .section-body { display: none; }
    .section-body { padding: 6px 10px 12px; }
    .section-actions { display: flex; gap: 6px; margin-bottom: 8px; align-items: center; }
    .section-actions input { flex: 1; }

    .file-list, .outline-list, .search-results { list-style: none; margin: 0; padding: 0; }
    .file-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 6px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12.5px;
    }
    .file-item:hover { background: var(--panel-hover-bg); }
    .file-item.selected {
      background: var(--vscode-list-activeSelectionBackground);
      color: var(--vscode-list-activeSelectionForeground);
    }
    .file-item .file-icon { width: 14px; height: 14px; fill: currentColor; opacity: 0.7; flex-shrink: 0; }
    .file-item .file-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .file-item .file-actions { display: none; gap: 1px; }
    .file-item:hover .file-actions { display: flex; }
    .file-item.root-file .file-name::after {
      content: 'root';
      margin-left: 6px;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      opacity: 0.6;
      border: 1px solid currentColor;
      border-radius: 6px;
      padding: 0 4px;
    }

    .outline-list li {
      padding: 3px 6px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      opacity: 0.9;
    }
    .outline-list li:hover { background: var(--panel-hover-bg); }
    .outline-list li[data-level="1"] { font-weight: 600; }
    .outline-list li[data-level="2"] { padding-left: 16px; }
    .outline-list li[data-level="3"] { padding-left: 28px; opacity: 0.8; }
    .outline-list li[data-level="4"], .outline-list li[data-level="5"], .outline-list li[data-level="6"] {
      padding-left: 40px;
      opacity: 0.7;
    }

    .search-results li {
      padding: 5px 6px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 11.5px;
      border-left: 2px solid transparent;
    }
    .search-results li:hover { background: var(--panel-hover-bg); border-left-color: var(--vscode-focusBorder); }
    .search-results .result-path { opacity: 0.65; font-size: 10px; }
    .search-results .result-text {
      font-family: var(--vscode-editor-font-family);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .search-results mark {
      background: var(--vscode-editor-findMatchHighlightBackground, rgba(234,179,8,0.35));
      color: inherit;
    }

    .media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); gap: 8px; }
    .media-item {
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 6px;
      text-align: center;
      background: var(--vscode-editor-background);
      position: relative;
    }
    .media-item.unused { border-style: dashed; opacity: 0.75; }
    .media-item.unused::after {
      content: 'unused';
      position: absolute;
      top: 3px;
      right: 4px;
      font-size: 8px;
      text-transform: uppercase;
      opacity: 0.6;
    }
    .media-item img { max-width: 100%; max-height: 56px; object-fit: contain; margin-bottom: 4px; border-radius: 2px; }
    .media-item .placeholder {
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--panel-bg);
      border-radius: 4px;
      margin-bottom: 4px;
      font-size: 9px;
      opacity: 0.6;
      word-break: break-all;
    }
    .media-item .info { font-size: 9.5px; word-break: break-all; opacity: 0.8; }
    .media-item .actions { margin-top: 5px; display: flex; gap: 2px; justify-content: center; flex-wrap: wrap; }

    .form-row { display: flex; flex-direction: column; gap: 4px; margin-bottom: 9px; }
    .form-row:last-child { margin-bottom: 0; }
    .form-row label { font-size: 10px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.3px; }
    .form-row textarea { min-height: 48px; resize: vertical; }
    .btn-row { display: flex; gap: 8px; margin-top: 10px; }

    .empty-state { text-align: center; padding: 14px; opacity: 0.55; font-size: 11.5px; }
    .badge {
      background: var(--vscode-badge-background);
      color: var(--vscode-badge-foreground);
      font-size: 10px;
      padding: 1px 6px;
      border-radius: 10px;
      margin-left: 6px;
    }
    .stats-line { padding: 8px 12px; font-size: 10.5px; opacity: 0.6; }

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
    .view-toggle button + button { border-left: 1px solid var(--vscode-button-border, var(--border-color)); }
    .view-toggle button.active {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
    }
    .view-toggle button:hover:not(.active) { background: var(--vscode-button-secondaryHoverBackground); }

    .editor-toolbar {
      display: flex;
      gap: 3px;
      align-items: center;
      padding: 6px 10px;
      border-bottom: 1px solid var(--border-color);
      flex-wrap: wrap;
    }
    .editor-toolbar .spacer { flex: 1; }
    .editor-toolbar .file-path {
      font-size: 11px;
      opacity: 0.7;
      font-family: var(--vscode-editor-font-family);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 180px;
    }
    .fmt-btn {
      background: transparent;
      border: 1px solid transparent;
      color: var(--vscode-foreground);
      padding: 2px 6px;
      font-size: 12px;
      min-width: 26px;
      justify-content: center;
      opacity: 0.8;
    }
    .fmt-btn:hover { background: var(--panel-hover-bg); opacity: 1; }
    #markdownEditor {
      flex: 1;
      width: 100%;
      padding: 14px;
      border: none;
      border-radius: 0;
      background: var(--vscode-editor-background);
      color: var(--vscode-editor-foreground, var(--vscode-foreground));
      font-family: var(--vscode-editor-font-family);
      font-size: 13px;
      line-height: 1.55;
      resize: none;
      tab-size: 2;
    }
    #markdownEditor:focus { outline: none; }
    .editor-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 5px 12px;
      font-size: 11px;
      opacity: 0.75;
      border-top: 1px solid var(--border-color);
    }
    .editor-status .modified { color: var(--vscode-gitDecoration-modifiedResourceForeground, #e2c08d); }

    .toast {
      position: fixed;
      bottom: 16px;
      right: 16px;
      background: var(--vscode-notifications-background, var(--panel-bg));
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 8px 14px;
      font-size: 12px;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.15s, transform 0.15s;
      pointer-events: none;
    }
    .toast.show { opacity: 1; transform: translateY(0); }
  </style>
</head>
<body>
  <header>
    <button id="toggleSidebarBtn" type="button" class="icon" title="Toggle sidebar">
      <svg viewBox="0 0 16 16" width="16" height="16"><path d="M1.5 2h13a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5zM2 3v10h3V3H2zm4 0v10h8V3H6z"/></svg>
    </button>
    <div class="meta">
      <div id="docTitle" class="title">MDOCX</div>
      <div id="docDesc" class="desc"></div>
    </div>
    <div class="view-toggle">
      <button id="previewToggle" type="button" class="active" title="Preview only">Preview</button>
      <button id="splitToggle" type="button" title="Split editor and live preview">Split</button>
      <button id="editToggle" type="button" title="Editor only">Edit</button>
    </div>
    <button id="copyBtn" type="button" class="secondary small" title="Copy markdown to clipboard">Copy</button>
    <button id="exportHtmlBtn" type="button" class="secondary small" title="Export rendered HTML">Export HTML</button>
    <button id="editExternalBtn" type="button" class="secondary small" title="Open in VS Code text editor">Open in Editor</button>
  </header>

  <div class="layout" id="layout">
    <aside class="sidebar">
      <div class="sidebar-section">
        <div class="section-header" id="filesHeader">
          <span>Files <span class="badge" id="fileCount">0</span></span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
          <div class="section-actions">
            <input type="search" id="fileFilter" placeholder="Filter files..." />
            <button type="button" id="addFileBtn" class="small" title="Add markdown file">+</button>
          </div>
          <ul class="file-list" id="fileList"></ul>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header" id="outlineHeader">
          <span>Outline</span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
          <ul class="outline-list" id="outlineList"></ul>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header collapsed" id="searchHeader">
          <span>Search <span class="badge" id="searchCount">0</span></span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
          <div class="section-actions">
            <input type="search" id="searchInput" placeholder="Search all documents..." />
          </div>
          <ul class="search-results" id="searchResults"></ul>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header" id="mediaHeader">
          <span>Media <span class="badge" id="mediaCount">0</span></span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
          <div class="section-actions">
            <button type="button" id="addMediaBtn" class="small">+ Add Media</button>
          </div>
          <div class="media-grid" id="mediaGrid"></div>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="section-header collapsed" id="metadataHeader">
          <span>Metadata</span>
          <svg class="chevron" viewBox="0 0 16 16"><path d="M6 12l4-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
        </div>
        <div class="section-body">
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

      <div class="stats-line" id="statsLine"></div>
    </aside>

    <main class="main-content">
      <div id="error" class="error" style="display:none"></div>
      <div class="view-area mode-preview" id="viewArea">
        <section id="previewView">
          <div class="doc-body" id="content"></div>
        </section>
        <section id="editorView">
          <div class="editor-toolbar">
            <button type="button" class="fmt-btn" data-fmt="bold" title="Bold (Ctrl+B)"><b>B</b></button>
            <button type="button" class="fmt-btn" data-fmt="italic" title="Italic (Ctrl+I)"><i>I</i></button>
            <button type="button" class="fmt-btn" data-fmt="code" title="Inline code">&lt;/&gt;</button>
            <button type="button" class="fmt-btn" data-fmt="heading" title="Heading">H</button>
            <button type="button" class="fmt-btn" data-fmt="link" title="Link (Ctrl+K)">Link</button>
            <button type="button" class="fmt-btn" data-fmt="ul" title="Bullet list">&bull;</button>
            <button type="button" class="fmt-btn" data-fmt="ol" title="Numbered list">1.</button>
            <button type="button" class="fmt-btn" data-fmt="quote" title="Blockquote">&ldquo;</button>
            <button type="button" class="fmt-btn" data-fmt="table" title="Table">Table</button>
            <button type="button" class="fmt-btn" data-fmt="codeblock" title="Code block">Code</button>
            <span class="spacer"></span>
            <span class="file-path" id="editorFilePath"></span>
            <button type="button" id="discardBtn" class="secondary small">Discard</button>
            <button type="button" id="saveBtn" class="small">Save</button>
          </div>
          <textarea id="markdownEditor" spellcheck="true" placeholder="Enter markdown content..."></textarea>
          <div class="editor-status">
            <span id="editorStatus"></span>
            <span id="editorCounts">0 words</span>
          </div>
        </section>
      </div>
    </main>
  </div>

  <div class="toast" id="toast"></div>

  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    const state = vscode.getState() || {};

    const $ = (id) => document.getElementById(id);
    const content = $('content');
    const errorBox = $('error');
    const docTitle = $('docTitle');
    const docDesc = $('docDesc');
    const fileList = $('fileList');
    const fileCount = $('fileCount');
    const fileFilter = $('fileFilter');
    const outlineList = $('outlineList');
    const searchInput = $('searchInput');
    const searchResults = $('searchResults');
    const searchCount = $('searchCount');
    const mediaGrid = $('mediaGrid');
    const mediaCount = $('mediaCount');
    const statsLine = $('statsLine');
    const metaTitle = $('metaTitle');
    const metaDescription = $('metaDescription');
    const metaAuthor = $('metaAuthor');
    const metaRoot = $('metaRoot');
    const metaTags = $('metaTags');
    const viewArea = $('viewArea');
    const layout = $('layout');
    const markdownEditor = $('markdownEditor');
    const editorFilePath = $('editorFilePath');
    const editorStatus = $('editorStatus');
    const editorCounts = $('editorCounts');
    const toast = $('toast');
    const previewToggle = $('previewToggle');
    const splitToggle = $('splitToggle');
    const editToggle = $('editToggle');

    let currentFiles = [];
    let currentPath = '';
    let rootPath = '';
    let mode = state.mode || 'preview';
    let originalContent = '';
    let isModified = false;
    let livePreviewTimer = null;
    let searchTimer = null;
    let toastTimer = null;

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function formatBytes(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
    }

    function setError(message) {
      errorBox.style.display = message ? 'block' : 'none';
      errorBox.textContent = message || '';
    }

    function isEditing() { return mode === 'edit' || mode === 'split'; }

    function confirmDiscard() {
      return !isModified || confirm('You have unsaved changes. Discard them?');
    }

    function persistState() {
      vscode.setState({ selectedPath: currentPath, mode: mode });
    }

    function applyMode() {
      viewArea.className = 'view-area mode-' + mode;
      previewToggle.classList.toggle('active', mode === 'preview');
      splitToggle.classList.toggle('active', mode === 'split');
      editToggle.classList.toggle('active', mode === 'edit');
    }

    function setMode(next) {
      if (next === mode) return;
      if (next === 'preview' && !confirmDiscard()) return;
      if (next === 'preview' && isModified) {
        markdownEditor.value = originalContent;
      }
      mode = next;
      applyMode();
      persistState();
      if (isEditing()) {
        editorFilePath.textContent = currentPath;
        if (!isModified) {
          vscode.postMessage({ type: 'getMarkdownContent', path: currentPath });
        }
        setTimeout(() => markdownEditor.focus(), 30);
      }
      updateEditorStatus();
    }

    function updateEditorStatus() {
      const value = markdownEditor.value;
      const words = (value.match(/[\\p{L}\\p{N}'-]+/gu) || []).length;
      const minutes = Math.max(1, Math.round(words / 200));
      editorCounts.textContent = words + ' words \\u00b7 ' + value.length + ' chars \\u00b7 ~' + minutes + ' min read';
      isModified = value !== originalContent;
      editorStatus.innerHTML = isModified ? '<span class="modified">\\u25cf Unsaved changes</span>' : '';
      if (mode === 'split') scheduleLivePreview();
    }

    function scheduleLivePreview() {
      clearTimeout(livePreviewTimer);
      livePreviewTimer = setTimeout(() => {
        vscode.postMessage({ type: 'renderPreview', path: currentPath, content: markdownEditor.value });
      }, 350);
    }

    function renderFileList() {
      const filter = fileFilter.value.trim().toLowerCase();
      const visible = currentFiles.filter((f) => !filter || f.path.toLowerCase().includes(filter));
      fileList.innerHTML = '';
      if (visible.length === 0) {
        fileList.innerHTML = '<li class="empty-state">' + (currentFiles.length ? 'No matches' : 'No files yet') + '</li>';
        return;
      }
      for (const file of visible) {
        const li = document.createElement('li');
        li.className = 'file-item' + (file.path === currentPath ? ' selected' : '') + (file.isRoot ? ' root-file' : '');
        li.title = file.path + ' \\u2014 ' + file.words + ' words \\u00b7 ' + formatBytes(file.size);
        li.dataset.path = file.path;
        const safePath = escapeHtml(file.path);
        li.innerHTML =
          '<svg class="file-icon" viewBox="0 0 16 16"><path d="M4 0h5.5L14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 0v4.5H14L9.5 0z"/></svg>' +
          '<span class="file-name">' + safePath + '</span>' +
          '<span class="file-actions">' +
          '<button type="button" class="icon" title="Set as root file" data-action="root" data-path="' + safePath + '">&#9733;</button>' +
          '<button type="button" class="icon" title="Rename" data-action="rename" data-path="' + safePath + '">&#9998;</button>' +
          '<button type="button" class="icon" title="Duplicate" data-action="duplicate" data-path="' + safePath + '">&#10697;</button>' +
          '<button type="button" class="icon" title="Delete" data-action="delete" data-path="' + safePath + '">&#10005;</button>' +
          '</span>';
        fileList.appendChild(li);
      }
    }

    function setFiles(files, selected, root) {
      currentFiles = files || [];
      currentPath = selected || (currentFiles[0] && currentFiles[0].path) || '';
      rootPath = root || '';
      fileCount.textContent = currentFiles.length;
      renderFileList();

      metaRoot.innerHTML = '';
      for (const file of currentFiles) {
        const opt = document.createElement('option');
        opt.value = file.path;
        opt.textContent = file.path;
        metaRoot.appendChild(opt);
      }
      if (rootPath) metaRoot.value = rootPath;
    }

    function setOutline(outline) {
      const entries = outline || [];
      outlineList.innerHTML = '';
      if (entries.length === 0) {
        outlineList.innerHTML = '<li class="empty-state">No headings</li>';
        return;
      }
      for (const entry of entries) {
        const li = document.createElement('li');
        li.dataset.level = entry.level;
        li.dataset.id = entry.id;
        li.textContent = entry.text;
        li.title = entry.text;
        outlineList.appendChild(li);
      }
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
        div.className = 'media-item' + (item.used ? '' : ' unused');
        div.title = (item.path || item.id) + ' \\u2014 ' + (item.mimeType || 'unknown');
        const safeId = escapeHtml(item.id);
        const preview = item.dataUri
          ? '<img src="' + item.dataUri + '" alt="' + safeId + '" />'
          : '<div class="placeholder">' + escapeHtml(item.mimeType || 'binary') + '</div>';
        div.innerHTML = preview +
          '<div class="info">' + safeId + '<br/>' + formatBytes(item.size) + '</div>' +
          '<div class="actions">' +
          '<button type="button" class="icon" title="Insert reference at cursor" data-action="insert" data-id="' + safeId +
            '" data-path="' + escapeHtml(item.path || '') + '" data-mime="' + escapeHtml(item.mimeType || '') + '">&#43;</button>' +
          '<button type="button" class="icon" title="Export to disk" data-action="export" data-id="' + safeId + '">&#8615;</button>' +
          '<button type="button" class="icon" title="Replace" data-action="replace" data-id="' + safeId + '">&#8646;</button>' +
          '<button type="button" class="icon" title="Remove" data-action="remove" data-id="' + safeId + '">&#10005;</button>' +
          '</div>';
        mediaGrid.appendChild(div);
      }
    }

    function setStats(stats) {
      if (!stats) { statsLine.textContent = ''; return; }
      statsLine.textContent = stats.files + ' files \\u00b7 ' + stats.words + ' words \\u00b7 ' +
        stats.media + ' media (' + formatBytes(stats.mediaBytes) + ')';
    }

    function enhancePreview() {
      content.querySelectorAll('.code-block').forEach((block) => {
        if (block.querySelector('.copy-code')) return;
        const lang = block.dataset.lang;
        if (lang) {
          const label = document.createElement('span');
          label.className = 'code-lang';
          label.textContent = lang;
          block.appendChild(label);
        }
        const btn = document.createElement('button');
        btn.className = 'copy-code secondary small';
        btn.type = 'button';
        btn.textContent = 'Copy';
        btn.addEventListener('click', () => {
          const code = block.querySelector('code');
          if (!code) return;
          navigator.clipboard.writeText(code.textContent || '').then(() => showToast('Code copied'));
        });
        block.appendChild(btn);
      });
    }

    function replaceSelection(before, after, placeholder) {
      const start = markdownEditor.selectionStart;
      const end = markdownEditor.selectionEnd;
      const value = markdownEditor.value;
      const selected = value.slice(start, end) || placeholder || '';
      markdownEditor.value = value.slice(0, start) + before + selected + after + value.slice(end);
      markdownEditor.selectionStart = start + before.length;
      markdownEditor.selectionEnd = start + before.length + selected.length;
      markdownEditor.focus();
      updateEditorStatus();
    }

    function prefixLines(prefix, numbered) {
      const value = markdownEditor.value;
      const start = value.lastIndexOf('\\n', Math.max(0, markdownEditor.selectionStart - 1)) + 1;
      let end = value.indexOf('\\n', markdownEditor.selectionEnd);
      if (end === -1) end = value.length;
      const lines = value.slice(start, end).split('\\n');
      const updated = lines.map((line, i) => (numbered ? (i + 1) + '. ' : prefix) + line).join('\\n');
      markdownEditor.value = value.slice(0, start) + updated + value.slice(end);
      markdownEditor.selectionStart = start;
      markdownEditor.selectionEnd = start + updated.length;
      markdownEditor.focus();
      updateEditorStatus();
    }

    function applyFormat(fmt) {
      if (fmt === 'bold') return replaceSelection('**', '**', 'bold text');
      if (fmt === 'italic') return replaceSelection('*', '*', 'italic text');
      if (fmt === 'code') return replaceSelection('\\u0060', '\\u0060', 'code');
      if (fmt === 'heading') return prefixLines('## ');
      if (fmt === 'link') return replaceSelection('[', '](https://)', 'link text');
      if (fmt === 'ul') return prefixLines('- ');
      if (fmt === 'ol') return prefixLines('', true);
      if (fmt === 'quote') return prefixLines('> ');
      if (fmt === 'table') return replaceSelection('\\n| Column A | Column B |\\n| --- | --- |\\n| ', ' | |\\n', 'value');
      if (fmt === 'codeblock') {
        const fence = '\\u0060\\u0060\\u0060';
        return replaceSelection('\\n' + fence + '\\n', '\\n' + fence + '\\n', 'code');
      }
    }

    function insertAtCursor(text) {
      const start = markdownEditor.selectionStart;
      const end = markdownEditor.selectionEnd;
      const value = markdownEditor.value;
      markdownEditor.value = value.slice(0, start) + text + value.slice(end);
      markdownEditor.selectionStart = markdownEditor.selectionEnd = start + text.length;
      markdownEditor.focus();
      updateEditorStatus();
    }

    function save() {
      if (!currentPath) return;
      vscode.postMessage({ type: 'saveContent', path: currentPath, content: markdownEditor.value });
      originalContent = markdownEditor.value;
      updateEditorStatus();
    }

    document.querySelectorAll('.section-header').forEach((header) => {
      header.addEventListener('click', () => header.classList.toggle('collapsed'));
    });

    fileList.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (btn) {
        const action = btn.dataset.action;
        const target = btn.dataset.path;
        if (action === 'delete') vscode.postMessage({ type: 'deleteMarkdown', path: target });
        else if (action === 'rename') vscode.postMessage({ type: 'renameMarkdown', path: target });
        else if (action === 'duplicate') vscode.postMessage({ type: 'duplicateMarkdown', path: target });
        else if (action === 'root') vscode.postMessage({ type: 'setRoot', path: target });
        return;
      }
      const item = e.target.closest('.file-item[data-path]');
      if (!item || !confirmDiscard()) return;
      vscode.postMessage({ type: 'select', path: item.dataset.path });
    });

    fileFilter.addEventListener('input', renderFileList);

    outlineList.addEventListener('click', (e) => {
      const li = e.target.closest('li[data-id]');
      if (!li) return;
      if (mode === 'edit') setMode('split');
      const target = content.querySelector('[id="' + CSS.escape(li.dataset.id) + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      const query = searchInput.value;
      searchTimer = setTimeout(() => vscode.postMessage({ type: 'search', query: query }), 250);
    });

    searchResults.addEventListener('click', (e) => {
      const li = e.target.closest('li[data-path]');
      if (!li || !confirmDiscard()) return;
      vscode.postMessage({ type: 'select', path: li.dataset.path });
    });

    mediaGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      if (action === 'replace') vscode.postMessage({ type: 'replaceMedia', id: id });
      else if (action === 'remove') vscode.postMessage({ type: 'removeMedia', id: id });
      else if (action === 'export') vscode.postMessage({ type: 'exportMedia', id: id });
      else if (action === 'insert') {
        const ref = btn.dataset.path || ('mdocx://media/' + id);
        const isImage = (btn.dataset.mime || '').indexOf('image/') === 0;
        if (!isEditing()) setMode('split');
        insertAtCursor((isImage ? '!' : '') + '[' + id + '](' + ref + ')');
        showToast('Reference inserted');
      }
    });

    content.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-mdocx-file]');
      if (!link) return;
      e.preventDefault();
      if (!confirmDiscard()) return;
      vscode.postMessage({ type: 'select', path: link.dataset.mdocxFile });
    });

    document.querySelectorAll('.fmt-btn').forEach((btn) => {
      btn.addEventListener('click', () => applyFormat(btn.dataset.fmt));
    });

    $('toggleSidebarBtn').addEventListener('click', () => layout.classList.toggle('sidebar-hidden'));
    $('copyBtn').addEventListener('click', () => vscode.postMessage({ type: 'copy', path: currentPath }));
    $('exportHtmlBtn').addEventListener('click', () => vscode.postMessage({ type: 'exportHtml' }));
    $('editExternalBtn').addEventListener('click', () => vscode.postMessage({ type: 'editExternal', path: currentPath }));
    previewToggle.addEventListener('click', () => setMode('preview'));
    splitToggle.addEventListener('click', () => setMode('split'));
    editToggle.addEventListener('click', () => setMode('edit'));
    $('saveBtn').addEventListener('click', save);
    $('discardBtn').addEventListener('click', () => {
      if (isModified && !confirm('Discard all changes?')) return;
      markdownEditor.value = originalContent;
      updateEditorStatus();
    });
    $('addFileBtn').addEventListener('click', () => vscode.postMessage({ type: 'addMarkdown' }));
    $('addMediaBtn').addEventListener('click', () => vscode.postMessage({ type: 'addMedia' }));
    $('saveMetadataBtn').addEventListener('click', () => {
      const tagsStr = metaTags.value.trim();
      const tags = tagsStr ? tagsStr.split(',').map((t) => t.trim()).filter(Boolean) : [];
      vscode.postMessage({
        type: 'saveMetadata',
        metadata: {
          title: metaTitle.value,
          description: metaDescription.value,
          author: metaAuthor.value,
          root: metaRoot.value || undefined,
          tags: tags
        }
      });
    });

    markdownEditor.addEventListener('input', updateEditorStatus);

    markdownEditor.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      e.preventDefault();
      const start = markdownEditor.selectionStart;
      const value = markdownEditor.value;
      markdownEditor.value = value.slice(0, start) + '  ' + value.slice(markdownEditor.selectionEnd);
      markdownEditor.selectionStart = markdownEditor.selectionEnd = start + 2;
      updateEditorStatus();
    });

    document.addEventListener('keydown', (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const inEditor = document.activeElement === markdownEditor;
      if (e.key === 's') { e.preventDefault(); save(); }
      else if (e.key === 'b' && inEditor) { e.preventDefault(); applyFormat('bold'); }
      else if (e.key === 'i' && inEditor) { e.preventDefault(); applyFormat('italic'); }
      else if (e.key === 'k' && inEditor) { e.preventDefault(); applyFormat('link'); }
      else if (e.key === 'f') {
        e.preventDefault();
        $('searchHeader').classList.remove('collapsed');
        searchInput.focus();
      }
    });

    applyMode();
    vscode.postMessage({ type: 'ready', selectedPath: state.selectedPath });

    window.addEventListener('message', (event) => {
      const msg = event.data;
      if (!msg || typeof msg.type !== 'string') return;

      if (msg.type === 'markdownContent') {
        markdownEditor.value = msg.content || '';
        originalContent = msg.content || '';
        editorFilePath.textContent = msg.path || currentPath;
        updateEditorStatus();
        return;
      }

      if (msg.type === 'previewHtml') {
        content.innerHTML = msg.html || '';
        enhancePreview();
        setOutline(msg.outline);
        return;
      }

      if (msg.type === 'saved') {
        showToast('Saved ' + msg.path);
        return;
      }

      if (msg.type === 'searchResults') {
        const results = msg.results || [];
        searchCount.textContent = results.length;
        searchResults.innerHTML = '';
        if (results.length === 0) {
          const hint = msg.query && msg.query.trim().length >= 2 ? 'No results' : 'Type at least 2 characters';
          searchResults.innerHTML = '<li class="empty-state">' + hint + '</li>';
          return;
        }
        const needle = (msg.query || '').trim().toLowerCase();
        for (const result of results) {
          const li = document.createElement('li');
          li.dataset.path = result.path;
          const index = result.text.toLowerCase().indexOf(needle);
          const highlighted = index >= 0
            ? escapeHtml(result.text.slice(0, index)) + '<mark>' +
              escapeHtml(result.text.slice(index, index + needle.length)) + '</mark>' +
              escapeHtml(result.text.slice(index + needle.length))
            : escapeHtml(result.text);
          li.innerHTML = '<div class="result-path">' + escapeHtml(result.path) + ':' + result.line + '</div>' +
            '<div class="result-text">' + highlighted + '</div>';
          searchResults.appendChild(li);
        }
        return;
      }

      if (msg.type !== 'render') return;

      docTitle.textContent = msg.title || 'MDOCX';
      docDesc.textContent = msg.description || '';

      if (Array.isArray(msg.fileList)) {
        setFiles(msg.fileList, msg.path, msg.metadata && msg.metadata.root);
      }
      if (msg.metadata) setMetadata(msg.metadata);
      if (msg.mediaItems) setMediaItems(msg.mediaItems);
      setStats(msg.stats);
      setOutline(msg.outline);
      setError(msg.error || null);

      if (typeof msg.html === 'string') {
        content.innerHTML = msg.html;
        enhancePreview();
      }

      if (msg.path) {
        persistState();
        const switchedFile = msg.path !== editorFilePath.textContent;
        if (typeof msg.markdown === 'string' && (!isModified || switchedFile)) {
          markdownEditor.value = msg.markdown;
          originalContent = msg.markdown;
          editorFilePath.textContent = msg.path;
          updateEditorStatus();
        }
      }
    });
  </script>
</body>
</html>`;
  }
}
