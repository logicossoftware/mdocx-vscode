"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const mdocxPreviewEditorProvider_js_1 = require("./mdocxPreviewEditorProvider.js");
const mdocxFileSystemProvider_js_1 = require("./mdocxFileSystemProvider.js");
const mdocxCompletionProvider_js_1 = require("./mdocxCompletionProvider.js");
function activate(context) {
    context.subscriptions.push(mdocxFileSystemProvider_js_1.MdocxFileSystemProvider.register(context));
    context.subscriptions.push(mdocxPreviewEditorProvider_js_1.MdocxPreviewEditorProvider.register(context));
    context.subscriptions.push(mdocxCompletionProvider_js_1.MdocxCompletionProvider.register(context));
}
function deactivate() { }
//# sourceMappingURL=extension.js.map