import * as vscode from 'vscode';
import * as path from 'path';
import { MdocxPreviewEditorProvider } from './mdocxPreviewEditorProvider.js';
import { MdocxFileSystemProvider } from './mdocxFileSystemProvider.js';
import { MdocxCompletionProvider } from './mdocxCompletionProvider.js';
import {
  MEDIA_EXTENSIONS,
  MdocxDocumentMetadata,
  MdocxMarkdownBundle,
  MdocxMediaBundle,
  decodeText,
  encodeText,
  getMimeTypeFromExtension,
  inferMimeType,
  makeMediaId,
  readDocument
} from './mdocxDocument.js';
import { docAnchorId, escapeHtml, hrefCandidates, isExternalHref, renderMarkdown, toDataUri } from './mdocxRender.js';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(MdocxFileSystemProvider.register(context));
  context.subscriptions.push(MdocxPreviewEditorProvider.register(context));
  context.subscriptions.push(MdocxCompletionProvider.register(context));

  context.subscriptions.push(
    vscode.commands.registerCommand('mdocx.createNew', (uri?: vscode.Uri) => createNewMdocxFile(uri)),
    vscode.commands.registerCommand('mdocx.extractToFolder', (uri?: vscode.Uri) => extractToFolder(uri)),
    vscode.commands.registerCommand('mdocx.createFromFolder', (uri?: vscode.Uri) => createFromFolder(uri)),
    vscode.commands.registerCommand('mdocx.exportHtml', (uri?: vscode.Uri) => exportHtml(uri))
  );
}

export function deactivate() {}

async function resolveMdocxUri(candidate?: vscode.Uri): Promise<vscode.Uri | undefined> {
  if (candidate?.fsPath.toLowerCase().endsWith('.mdocx')) {
    return candidate;
  }

  const active = vscode.window.activeTextEditor?.document.uri;
  if (active?.fsPath.toLowerCase().endsWith('.mdocx')) {
    return active;
  }

  const found = await vscode.workspace.findFiles('**/*.mdocx', '**/node_modules/**', 50);
  if (found.length === 1) return found[0];
  if (found.length > 1) {
    const picked = await vscode.window.showQuickPick(
      found.map((uri) => ({ label: vscode.workspace.asRelativePath(uri), uri })),
      { placeHolder: 'Select an MDOCX file' }
    );
    if (picked) return picked.uri;
    return undefined;
  }

  const selection = await vscode.window.showOpenDialog({
    canSelectMany: false,
    filters: { 'MDOCX Files': ['mdocx'] },
    openLabel: 'Select MDOCX'
  });
  return selection?.[0];
}

async function withError<T>(action: () => Promise<T>): Promise<T | undefined> {
  try {
    return await action();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    void vscode.window.showErrorMessage(`MDOCX: ${message}`);
    return undefined;
  }
}

async function createNewMdocxFile(contextUri?: vscode.Uri): Promise<void> {
  let defaultFolder: vscode.Uri | undefined;
  if (contextUri) {
    try {
      const stat = await vscode.workspace.fs.stat(contextUri);
      defaultFolder =
        stat.type === vscode.FileType.Directory ? contextUri : vscode.Uri.joinPath(contextUri, '..');
    } catch {
      defaultFolder = undefined;
    }
  }
  if (!defaultFolder && vscode.workspace.workspaceFolders?.[0]) {
    defaultFolder = vscode.workspace.workspaceFolders[0].uri;
  }

  const fileName = await vscode.window.showInputBox({
    prompt: 'Enter the name for the new MDOCX file',
    value: 'document.mdocx',
    validateInput: (value) => {
      if (!value || value.trim().length === 0) return 'File name cannot be empty';
      if (!value.endsWith('.mdocx')) return 'File name must end with .mdocx';
      return undefined;
    }
  });
  if (!fileName) return;

  const saveUri = await vscode.window.showSaveDialog({
    defaultUri: defaultFolder ? vscode.Uri.joinPath(defaultFolder, fileName) : undefined,
    filters: { 'MDOCX Files': ['mdocx'] },
    saveLabel: 'Create MDOCX'
  });
  if (!saveUri) return;

  await withError(async () => {
    const title = fileName.replace(/\.mdocx$/i, '');
    const markdown = `# ${title}\n\nWelcome to your new MDOCX document!\n\n## Getting Started\n\nStart editing this file or add more markdown files to build your document.\n`;

    await writeMdocx(
      saveUri,
      {
        bundleVersion: 1,
        files: [{ path: 'README.md', content: encodeText(markdown) }],
        rootPath: 'README.md'
      },
      { bundleVersion: 1, items: [] },
      { title, created_at: new Date().toISOString(), root: 'README.md' }
    );

    await vscode.commands.executeCommand('vscode.openWith', saveUri, 'mdocx.preview');
    void vscode.window.showInformationMessage(`MDOCX: Created ${path.basename(saveUri.fsPath)}`);
  });
}

async function writeMdocx(
  target: vscode.Uri,
  markdown: MdocxMarkdownBundle,
  media: MdocxMediaBundle,
  metadata: MdocxDocumentMetadata
): Promise<void> {
  const { writeMdocxAsync } = await import('ts-mdocx');
  const bytes = await writeMdocxAsync(markdown, media, {
    metadata,
    markdownCompression: 'zip',
    mediaCompression: 'zip'
  });
  await vscode.workspace.fs.writeFile(target, bytes);
}

async function extractToFolder(contextUri?: vscode.Uri): Promise<void> {
  const source = await resolveMdocxUri(contextUri);
  if (!source) return;

  const folders = await vscode.window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: false,
    canSelectMany: false,
    openLabel: 'Extract Here'
  });
  const targetRoot = folders?.[0];
  if (!targetRoot) return;

  await withError(async () => {
    const doc = await readDocument(source);
    const baseName = path.basename(source.fsPath, path.extname(source.fsPath));
    const outputRoot = vscode.Uri.joinPath(targetRoot, baseName);

    for (const file of doc.markdown.files) {
      await vscode.workspace.fs.writeFile(joinSafe(outputRoot, file.path), file.content);
    }
    for (const item of doc.media.items) {
      const relative = item.path || `media/${item.id}`;
      await vscode.workspace.fs.writeFile(joinSafe(outputRoot, relative), item.data);
    }
    if (doc.metadata) {
      await vscode.workspace.fs.writeFile(
        vscode.Uri.joinPath(outputRoot, 'mdocx-metadata.json'),
        encodeText(JSON.stringify(doc.metadata, null, 2))
      );
    }

    const open = await vscode.window.showInformationMessage(
      `MDOCX: Extracted ${doc.markdown.files.length} markdown and ${doc.media.items.length} media files.`,
      'Reveal Folder'
    );
    if (open === 'Reveal Folder') {
      await vscode.commands.executeCommand('revealFileInOS', outputRoot);
    }
  });
}

/** Joins a container-relative path onto a folder, rejecting traversal attempts. */
function joinSafe(root: vscode.Uri, relative: string): vscode.Uri {
  const segments = relative
    .replace(/\\/g, '/')
    .split('/')
    .filter((segment) => segment && segment !== '.' && segment !== '..');
  if (segments.length === 0) {
    throw new Error(`Invalid path in container: "${relative}"`);
  }
  return vscode.Uri.joinPath(root, ...segments);
}

async function createFromFolder(contextUri?: vscode.Uri): Promise<void> {
  let sourceFolder = contextUri;
  if (sourceFolder) {
    try {
      const stat = await vscode.workspace.fs.stat(sourceFolder);
      if (stat.type !== vscode.FileType.Directory) sourceFolder = undefined;
    } catch {
      sourceFolder = undefined;
    }
  }
  if (!sourceFolder) {
    const folders = await vscode.window.showOpenDialog({
      canSelectFolders: true,
      canSelectFiles: false,
      canSelectMany: false,
      openLabel: 'Use This Folder'
    });
    sourceFolder = folders?.[0];
  }
  if (!sourceFolder) return;

  const saveUri = await vscode.window.showSaveDialog({
    defaultUri: vscode.Uri.file(`${sourceFolder.fsPath}.mdocx`),
    filters: { 'MDOCX Files': ['mdocx'] },
    saveLabel: 'Create MDOCX'
  });
  if (!saveUri) return;

  await withError(async () => {
    const markdownFiles: { path: string; content: Uint8Array }[] = [];
    const mediaItems: { id: string; path: string; mimeType: string; data: Uint8Array }[] = [];
    const takenIds = new Set<string>();

    const walk = async (folder: vscode.Uri, prefix: string): Promise<void> => {
      for (const [name, type] of await vscode.workspace.fs.readDirectory(folder)) {
        if (name.startsWith('.') || name === 'node_modules') continue;
        const child = vscode.Uri.joinPath(folder, name);
        const relative = prefix ? `${prefix}/${name}` : name;

        if (type === vscode.FileType.Directory) {
          await walk(child, relative);
          continue;
        }

        const ext = path.extname(name).toLowerCase();
        if (ext === '.md' || ext === '.markdown') {
          markdownFiles.push({ path: relative, content: await vscode.workspace.fs.readFile(child) });
        } else if (MEDIA_EXTENSIONS.includes(ext)) {
          const id = makeMediaId(name, takenIds);
          takenIds.add(id);
          mediaItems.push({
            id,
            path: relative,
            mimeType: getMimeTypeFromExtension(ext),
            data: await vscode.workspace.fs.readFile(child)
          });
        }
      }
    };

    await walk(sourceFolder!, '');

    if (markdownFiles.length === 0) {
      throw new Error('No markdown files found in the selected folder.');
    }

    const rootPath =
      markdownFiles.find((f) => /^readme\.(md|markdown)$/i.test(f.path))?.path ??
      markdownFiles.find((f) => !f.path.includes('/'))?.path ??
      markdownFiles[0].path;

    await writeMdocx(
      saveUri,
      { bundleVersion: 1, files: markdownFiles, rootPath },
      { bundleVersion: 1, items: mediaItems },
      {
        title: path.basename(saveUri.fsPath, '.mdocx'),
        created_at: new Date().toISOString(),
        root: rootPath
      }
    );

    await vscode.commands.executeCommand('vscode.openWith', saveUri, 'mdocx.preview');
    void vscode.window.showInformationMessage(
      `MDOCX: Packed ${markdownFiles.length} markdown and ${mediaItems.length} media files.`
    );
  });
}

async function exportHtml(contextUri?: vscode.Uri): Promise<void> {
  const source = await resolveMdocxUri(contextUri);
  if (!source) return;

  await withError(async () => {
    const doc = await readDocument(source);
    if (doc.markdown.files.length === 0) {
      throw new Error('This MDOCX contains no markdown files.');
    }

    const ALL = '$all';
    const picked =
      doc.markdown.files.length === 1
        ? doc.markdown.files[0].path
        : (
            await vscode.window.showQuickPick(
              [
                { label: 'All files (combined)', value: ALL },
                ...doc.markdown.files.map((f) => ({ label: f.path, value: f.path }))
              ],
              { placeHolder: 'Which document should be exported?' }
            )
          )?.value;
    if (!picked) return;

    const selected = picked === ALL ? doc.markdown.files : doc.markdown.files.filter((f) => f.path === picked);
    const title = (typeof doc.metadata?.title === 'string' && doc.metadata.title) || path.basename(source.fsPath);

    const defaultName = picked === ALL ? `${path.basename(source.fsPath, '.mdocx')}.html` : `${picked.replace(/[\\/]/g, '-').replace(/\.(md|markdown)$/i, '')}.html`;
    const target = await vscode.window.showSaveDialog({
      defaultUri: vscode.Uri.joinPath(vscode.Uri.file(path.dirname(source.fsPath)), defaultName),
      filters: { 'HTML Files': ['html'] },
      saveLabel: 'Export HTML'
    });
    if (!target) return;

    const { MediaResolver } = await import('ts-mdocx');
    const resolver = new MediaResolver(doc);
    const knownPaths = new Set(doc.markdown.files.map((f) => f.path));

    const sections = selected.map((file) => {
      const { html } = renderMarkdown(decodeText(file.content), {
        resolveMediaHref: (href) => resolveMediaForExport(resolver, href, file),
        // Cross-document links only make sense when everything is in one page.
        resolveFileHref: (href) => (picked === ALL ? resolveKnownFile(href, knownPaths) : undefined)
      });
      return { path: file.path, html };
    });

    await vscode.workspace.fs.writeFile(target, encodeText(buildStandaloneHtml(title, sections, picked === ALL)));

    const open = await vscode.window.showInformationMessage('MDOCX: HTML exported.', 'Open File');
    if (open === 'Open File') {
      await vscode.env.openExternal(target);
    }
  });
}

function resolveKnownFile(href: string, knownPaths: Set<string>): string | undefined {
  if (!href || isExternalHref(href)) return undefined;
  for (const candidate of hrefCandidates(href)) {
    if (knownPaths.has(candidate)) return candidate;
  }
  return undefined;
}

function resolveMediaForExport(resolver: any, href: string, fromFile: { path: string }): string | undefined {
  if (!href || isExternalHref(href)) return undefined;
  for (const candidate of hrefCandidates(href)) {
    let item: any | undefined;
    try {
      item = resolver.resolve(candidate, fromFile);
    } catch {
      item = undefined;
    }
    if (!item) {
      const byId = /^mdocx:\/\/media\/(.+)$/i.exec(candidate);
      if (byId && typeof resolver.getById === 'function') {
        try {
          item = resolver.getById(byId[1]);
        } catch {
          item = undefined;
        }
      }
    }
    if (item?.data) {
      return toDataUri(inferMimeType(item), item.data);
    }
  }
  return undefined;
}

function buildStandaloneHtml(
  title: string,
  sections: { path: string; html: string }[],
  includeToc: boolean
): string {
  const toc =
    includeToc && sections.length > 1
      ? `<nav class="toc"><strong>Contents</strong><ul>${sections
          .map((s) => `<li><a href="#${docAnchorId(s.path)}">${escapeHtml(s.path)}</a></li>`)
          .join('')}</ul></nav>`
      : '';

  const body = sections
    .map(
      (s) =>
        `<article id="${docAnchorId(s.path)}">${
          sections.length > 1 ? `<h1 class="doc-heading">${escapeHtml(s.path)}</h1>` : ''
        }${s.html}</article>`
    )
    .join('\n<hr />\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.65; max-width: 860px; margin: 0 auto; padding: 40px 20px 80px; }
  img { max-width: 100%; border-radius: 4px; }
  pre { background: rgba(127,127,127,0.12); padding: 12px; border-radius: 6px; overflow: auto; }
  code { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 0.92em; }
  pre code { background: none; }
  :not(pre) > code { background: rgba(127,127,127,0.15); padding: 0.1em 0.35em; border-radius: 3px; }
  table { border-collapse: collapse; margin: 1em 0; }
  th, td { border: 1px solid rgba(127,127,127,0.4); padding: 6px 10px; text-align: left; }
  blockquote { margin: 1em 0; padding: 0.4em 1em; border-left: 3px solid rgba(127,127,127,0.5); }
  hr { border: none; border-top: 1px solid rgba(127,127,127,0.35); margin: 3em 0; }
  .toc { background: rgba(127,127,127,0.08); border-radius: 8px; padding: 12px 18px; margin-bottom: 32px; }
  .toc ul { margin: 8px 0 0; padding-left: 18px; }
  .heading-anchor { display: none; }
  .doc-heading { font-size: 0.85em; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.55; border: none; }
</style>
</head>
<body>
${toc}
${body}
</body>
</html>
`;
}
