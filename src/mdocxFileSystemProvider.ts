import * as vscode from 'vscode';
import { Buffer } from 'buffer';
import { TextDecoder, TextEncoder } from 'util';

/**
 * Virtual FileSystemProvider for embedded markdown files within MDOCX containers.
 *
 * URI scheme: mdocx-md://<encoded-mdocx-path>/<embedded-path>
 *
 * Example:
 *   mdocx-md:///D%3A%2FDocs%2Fexample.mdocx/docs/readme.md
 *
 * Authority is the percent-encoded path to the .mdocx file on disk.
 * Path is the embedded markdown file path inside the container.
 */
export class MdocxFileSystemProvider implements vscode.FileSystemProvider {
  public static readonly scheme = 'mdocx-md';

  private readonly _onDidChangeFile = new vscode.EventEmitter<vscode.FileChangeEvent[]>();
  readonly onDidChangeFile = this._onDidChangeFile.event;

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new MdocxFileSystemProvider();
    return vscode.workspace.registerFileSystemProvider(MdocxFileSystemProvider.scheme, provider, {
      isCaseSensitive: true,
      isReadonly: false
    });
  }

  /**
   * Build a URI for an embedded markdown file.
   */
  public static buildUri(mdocxUri: vscode.Uri, embeddedPath: string): vscode.Uri {
    const encodedMdocx = encodeURIComponent(mdocxUri.fsPath);
    // Ensure embeddedPath starts with /
    const normalizedPath = embeddedPath.startsWith('/') ? embeddedPath : '/' + embeddedPath;
    return vscode.Uri.parse(`${MdocxFileSystemProvider.scheme}://${encodedMdocx}${normalizedPath}`);
  }

  /**
   * Parse a mdocx-md URI back to (mdocxUri, embeddedPath).
   * Returns null if the URI is malformed.
   */
  public static parseUri(uri: vscode.Uri): { mdocxUri: vscode.Uri; embeddedPath: string } | null {
    try {
      if (!uri.authority) {
        return null;
      }
      const mdocxFsPath = decodeURIComponent(uri.authority);
      if (!mdocxFsPath) {
        return null;
      }
      const embeddedPath = uri.path.startsWith('/') ? uri.path.slice(1) : uri.path;
      if (!embeddedPath) {
        return null;
      }
      return {
        mdocxUri: vscode.Uri.file(mdocxFsPath),
        embeddedPath
      };
    } catch {
      return null;
    }
  }

  // --- FileSystemProvider implementation ---

  watch(_uri: vscode.Uri): vscode.Disposable {
    // No-op watcher; we rely on explicit change events.
    return new vscode.Disposable(() => {});
  }

  async stat(uri: vscode.Uri): Promise<vscode.FileStat> {
    try {
      const parsed = MdocxFileSystemProvider.parseUri(uri);
      if (!parsed) {
        throw vscode.FileSystemError.FileNotFound(uri);
      }
      const { mdocxUri, embeddedPath } = parsed;
      const file = await this.findFile(mdocxUri, embeddedPath);
      if (!file) {
        throw vscode.FileSystemError.FileNotFound(uri);
      }
      return {
        type: vscode.FileType.File,
        ctime: 0,
        mtime: Date.now(),
        size: file.content.byteLength
      };
    } catch (e) {
      if (e instanceof vscode.FileSystemError) {
        throw e;
      }
      throw vscode.FileSystemError.FileNotFound(uri);
    }
  }

  async readDirectory(_uri: vscode.Uri): Promise<[string, vscode.FileType][]> {
    // Not used; we don't expose directory browsing.
    return [];
  }

  createDirectory(_uri: vscode.Uri): void | Thenable<void> {
    throw vscode.FileSystemError.NoPermissions('Cannot create directories in MDOCX.');
  }

  async readFile(uri: vscode.Uri): Promise<Uint8Array> {
    try {
      const parsed = MdocxFileSystemProvider.parseUri(uri);
      if (!parsed) {
        throw vscode.FileSystemError.FileNotFound(uri);
      }
      const { mdocxUri, embeddedPath } = parsed;
      const file = await this.findFile(mdocxUri, embeddedPath);
      if (!file) {
        throw vscode.FileSystemError.FileNotFound(uri);
      }
      return file.content;
    } catch (e) {
      if (e instanceof vscode.FileSystemError) {
        throw e;
      }
      throw vscode.FileSystemError.FileNotFound(uri);
    }
  }

  async writeFile(
    uri: vscode.Uri,
    content: Uint8Array,
    _options: { create: boolean; overwrite: boolean }
  ): Promise<void> {
    const parsed = MdocxFileSystemProvider.parseUri(uri);
    if (!parsed) {
      throw vscode.FileSystemError.FileNotFound(uri);
    }
    const { mdocxUri, embeddedPath } = parsed;

    const bytes = await vscode.workspace.fs.readFile(mdocxUri);
    const { readMdocx, writeMdocxAsync } = await import('ts-mdocx');
    const doc = await readMdocx(bytes);

    const file = doc.markdown.files.find((f: { path: string }) => f.path === embeddedPath);
    if (!file) {
      throw vscode.FileSystemError.FileNotFound(uri);
    }

    // Update the content
    file.content = content;

    // Re-write the MDOCX
    const newBytes = await writeMdocxAsync(doc.markdown, doc.media, {
      metadata: doc.metadata,
      markdownCompression: 'zip',
      mediaCompression: 'zip'
    });

    await vscode.workspace.fs.writeFile(mdocxUri, newBytes);

    this._onDidChangeFile.fire([{ type: vscode.FileChangeType.Changed, uri }]);
  }

  delete(_uri: vscode.Uri, _options: { recursive: boolean }): void | Thenable<void> {
    throw vscode.FileSystemError.NoPermissions('Cannot delete files from MDOCX via this provider.');
  }

  rename(_oldUri: vscode.Uri, _newUri: vscode.Uri, _options: { overwrite: boolean }): void | Thenable<void> {
    throw vscode.FileSystemError.NoPermissions('Cannot rename files in MDOCX via this provider.');
  }

  // --- Helpers ---

  private async findFile(
    mdocxUri: vscode.Uri,
    embeddedPath: string
  ): Promise<{ path: string; content: Uint8Array } | undefined> {
    try {
      const bytes = await vscode.workspace.fs.readFile(mdocxUri);
      const { readMdocx } = await import('ts-mdocx');
      const doc = await readMdocx(bytes);
      return doc.markdown.files.find((f: { path: string }) => f.path === embeddedPath);
    } catch {
      return undefined;
    }
  }
}
