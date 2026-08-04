import * as vscode from 'vscode';
import { MdocxFileSystemProvider } from './mdocxFileSystemProvider.js';
import { inferMimeType, readDocument } from './mdocxDocument.js';

/**
 * Provides autocomplete suggestions for media references when editing
 * markdown files embedded in MDOCX containers.
 */
export class MdocxCompletionProvider implements vscode.CompletionItemProvider {
  public static readonly scheme = MdocxFileSystemProvider.scheme;

  // Trigger on common image/link patterns
  public static readonly triggerCharacters = ['/', '(', '[', '!', '.', '"', "'"];

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new MdocxCompletionProvider();
    return vscode.languages.registerCompletionItemProvider(
      { scheme: MdocxCompletionProvider.scheme, language: 'markdown' },
      provider,
      ...MdocxCompletionProvider.triggerCharacters
    );
  }

  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken,
    _context: vscode.CompletionContext
  ): Promise<vscode.CompletionItem[] | undefined> {
    // Only for mdocx-md:// URIs
    if (document.uri.scheme !== MdocxCompletionProvider.scheme) {
      return undefined;
    }

    const parsed = MdocxFileSystemProvider.parseUri(document.uri);
    if (!parsed) {
      return undefined;
    }

    // Check if we're in a context where media references make sense
    const line = document.lineAt(position.line).text;
    const textBefore = line.substring(0, position.character);

    // Match patterns like:
    // ![alt](  - image
    // [text](  - link
    // src="    - HTML attribute
    // href="   - HTML attribute
    // ![       - starting image syntax
    const isImageOrLinkContext = 
      /!\[[^\]]*\]\([^)]*$/.test(textBefore) ||  // ![alt](path
      /\[[^\]]*\]\([^)]*$/.test(textBefore) ||   // [text](path
      /src=["'][^"']*$/.test(textBefore) ||       // src="path
      /href=["'][^"']*$/.test(textBefore) ||      // href="path
      /!\[$/.test(textBefore) ||                  // ![
      /!\[[^\]]*$/.test(textBefore);              // ![alt text

    if (!isImageOrLinkContext) {
      return undefined;
    }

    try {
      const { mediaItems, markdownPaths } = await this.getDocumentEntries(parsed.mdocxUri);
      if (mediaItems.length === 0 && markdownPaths.length === 0) {
        return undefined;
      }

      const completions: vscode.CompletionItem[] = [];

      for (const other of markdownPaths) {
        if (other === parsed.embeddedPath) continue;
        const item = new vscode.CompletionItem(other, vscode.CompletionItemKind.File);
        item.detail = 'Markdown document in this MDOCX';
        item.documentation = new vscode.MarkdownString(`Links to the embedded document **${other}**.`);
        item.insertText = other;
        item.sortText = '0_doc_' + other;
        completions.push(item);
      }

      for (const item of mediaItems) {
        // Create completion for path-based reference
        if (item.path) {
          const pathCompletion = new vscode.CompletionItem(
            item.path,
            vscode.CompletionItemKind.File
          );
          pathCompletion.detail = `${item.mimeType || 'media'} (${this.formatBytes(item.size)})`;
          pathCompletion.documentation = new vscode.MarkdownString(
            `**Media ID:** ${item.id}\n\n**Path:** ${item.path}\n\n**Type:** ${item.mimeType || 'unknown'}\n\n**Size:** ${this.formatBytes(item.size)}`
          );
          pathCompletion.insertText = item.path;
          pathCompletion.sortText = '0_' + item.path; // Sort paths first
          completions.push(pathCompletion);
        }

        // Create completion for ID-based reference (mdocx://media/id)
        const idRef = `mdocx://media/${item.id}`;
        const idCompletion = new vscode.CompletionItem(
          idRef,
          vscode.CompletionItemKind.Reference
        );
        idCompletion.detail = `${item.mimeType || 'media'} by ID`;
        idCompletion.documentation = new vscode.MarkdownString(
          `**Media ID:** ${item.id}\n\n**Path:** ${item.path || 'N/A'}\n\n**Type:** ${item.mimeType || 'unknown'}\n\n**Size:** ${this.formatBytes(item.size)}`
        );
        idCompletion.insertText = idRef;
        idCompletion.sortText = '1_' + item.id; // Sort IDs after paths
        completions.push(idCompletion);
      }

      // If we're at the start of image syntax, offer to complete the full syntax
      if (/!\[$/.test(textBefore)) {
        for (const item of mediaItems) {
          if (item.mimeType?.startsWith('image/')) {
            const snippetCompletion = new vscode.CompletionItem(
              `Image: ${item.id}`,
              vscode.CompletionItemKind.Snippet
            );
            snippetCompletion.detail = 'Insert complete image markdown';
            snippetCompletion.documentation = new vscode.MarkdownString(
              `Inserts: \`![${item.id}](${item.path || `mdocx://media/${item.id}`})\``
            );
            snippetCompletion.insertText = new vscode.SnippetString(
              `[\${1:${item.id}}](${item.path || `mdocx://media/${item.id}`})`
            );
            snippetCompletion.sortText = '2_' + item.id;
            completions.push(snippetCompletion);
          }
        }
      }

      return completions;
    } catch {
      return undefined;
    }
  }

  private async getDocumentEntries(
    mdocxUri: vscode.Uri
  ): Promise<{ mediaItems: MediaItemInfo[]; markdownPaths: string[] }> {
    try {
      const doc = await readDocument(mdocxUri);
      return {
        mediaItems: doc.media.items.map((item) => ({
          id: item.id,
          path: item.path,
          mimeType: inferMimeType(item),
          size: item.data?.byteLength ?? 0
        })),
        markdownPaths: doc.markdown.files.map((file) => file.path)
      };
    } catch {
      return { mediaItems: [], markdownPaths: [] };
    }
  }

  private formatBytes(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
}

type MediaItemInfo = {
  id: string;
  path?: string;
  mimeType?: string;
  size: number;
};
