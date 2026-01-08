import * as vscode from 'vscode';
import { MdocxPreviewEditorProvider } from './mdocxPreviewEditorProvider.js';
import { MdocxFileSystemProvider } from './mdocxFileSystemProvider.js';
import { MdocxCompletionProvider } from './mdocxCompletionProvider.js';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(MdocxFileSystemProvider.register(context));
  context.subscriptions.push(MdocxPreviewEditorProvider.register(context));
  context.subscriptions.push(MdocxCompletionProvider.register(context));

  // Register command to create new MDOCX file
  context.subscriptions.push(
    vscode.commands.registerCommand('mdocx.createNew', async (uri?: vscode.Uri) => {
      await createNewMdocxFile(uri);
    })
  );
}

async function createNewMdocxFile(contextUri?: vscode.Uri): Promise<void> {
  // Determine default folder
  let defaultFolder: vscode.Uri | undefined;
  if (contextUri) {
    const stat = await vscode.workspace.fs.stat(contextUri);
    if (stat.type === vscode.FileType.Directory) {
      defaultFolder = contextUri;
    } else {
      defaultFolder = vscode.Uri.joinPath(contextUri, '..');
    }
  } else if (vscode.workspace.workspaceFolders?.[0]) {
    defaultFolder = vscode.workspace.workspaceFolders[0].uri;
  }

  // Prompt for file name
  const fileName = await vscode.window.showInputBox({
    prompt: 'Enter the name for the new MDOCX file',
    value: 'document.mdocx',
    validateInput: (value) => {
      if (!value || value.trim().length === 0) {
        return 'File name cannot be empty';
      }
      if (!value.endsWith('.mdocx')) {
        return 'File name must end with .mdocx';
      }
      return undefined;
    }
  });

  if (!fileName) {
    return; // User cancelled
  }

  // Prompt for save location
  const saveUri = await vscode.window.showSaveDialog({
    defaultUri: defaultFolder ? vscode.Uri.joinPath(defaultFolder, fileName) : undefined,
    filters: {
      'MDOCX Files': ['mdocx']
    },
    saveLabel: 'Create MDOCX'
  });

  if (!saveUri) {
    return; // User cancelled
  }

  try {
    const { writeMdocxAsync } = await import('ts-mdocx');

    // Create default markdown content
    const defaultMarkdown = `# New Document

Welcome to your new MDOCX document!

## Getting Started

Start editing this file or add more markdown files to build your document.
`;

    const encoder = new TextEncoder();
    const markdownBundle = {
      bundleVersion: 1,
      files: [
        {
          path: 'README.md',
          content: encoder.encode(defaultMarkdown)
        }
      ],
      rootPath: 'README.md'
    };

    const mediaBundle = {
      bundleVersion: 1,
      items: []
    };

    const metadata = {
      title: fileName.replace('.mdocx', ''),
      created: new Date().toISOString()
    };

    const bytes = await writeMdocxAsync(markdownBundle, mediaBundle, {
      metadata,
      markdownCompression: 'zip',
      mediaCompression: 'zip'
    });

    await vscode.workspace.fs.writeFile(saveUri, bytes);

    // Open the newly created file
    await vscode.commands.executeCommand('vscode.openWith', saveUri, 'mdocx.preview');

    void vscode.window.showInformationMessage(`Created MDOCX file: ${saveUri.fsPath}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    void vscode.window.showErrorMessage(`Failed to create MDOCX file: ${message}`);
  }
}

export function deactivate() {}
