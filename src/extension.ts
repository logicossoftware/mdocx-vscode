import * as vscode from 'vscode';
import { MdocxPreviewEditorProvider } from './mdocxPreviewEditorProvider.js';
import { MdocxFileSystemProvider } from './mdocxFileSystemProvider.js';
import { MdocxCompletionProvider } from './mdocxCompletionProvider.js';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(MdocxFileSystemProvider.register(context));
  context.subscriptions.push(MdocxPreviewEditorProvider.register(context));
  context.subscriptions.push(MdocxCompletionProvider.register(context));
}

export function deactivate() {}
