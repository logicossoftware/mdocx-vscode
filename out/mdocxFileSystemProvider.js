"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MdocxFileSystemProvider = void 0;
const vscode = __importStar(require("vscode"));
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
class MdocxFileSystemProvider {
    static scheme = 'mdocx-md';
    _onDidChangeFile = new vscode.EventEmitter();
    onDidChangeFile = this._onDidChangeFile.event;
    static register(context) {
        const provider = new MdocxFileSystemProvider();
        return vscode.workspace.registerFileSystemProvider(MdocxFileSystemProvider.scheme, provider, {
            isCaseSensitive: true,
            isReadonly: false
        });
    }
    /**
     * Build a URI for an embedded markdown file.
     */
    static buildUri(mdocxUri, embeddedPath) {
        const encodedMdocx = encodeURIComponent(mdocxUri.fsPath);
        // Ensure embeddedPath starts with /
        const normalizedPath = embeddedPath.startsWith('/') ? embeddedPath : '/' + embeddedPath;
        return vscode.Uri.parse(`${MdocxFileSystemProvider.scheme}://${encodedMdocx}${normalizedPath}`);
    }
    /**
     * Parse a mdocx-md URI back to (mdocxUri, embeddedPath).
     * Returns null if the URI is malformed.
     */
    static parseUri(uri) {
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
        }
        catch {
            return null;
        }
    }
    // --- FileSystemProvider implementation ---
    watch(_uri) {
        // No-op watcher; we rely on explicit change events.
        return new vscode.Disposable(() => { });
    }
    async stat(uri) {
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
        }
        catch (e) {
            if (e instanceof vscode.FileSystemError) {
                throw e;
            }
            throw vscode.FileSystemError.FileNotFound(uri);
        }
    }
    async readDirectory(_uri) {
        // Not used; we don't expose directory browsing.
        return [];
    }
    createDirectory(_uri) {
        throw vscode.FileSystemError.NoPermissions('Cannot create directories in MDOCX.');
    }
    async readFile(uri) {
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
        }
        catch (e) {
            if (e instanceof vscode.FileSystemError) {
                throw e;
            }
            throw vscode.FileSystemError.FileNotFound(uri);
        }
    }
    async writeFile(uri, content, _options) {
        const parsed = MdocxFileSystemProvider.parseUri(uri);
        if (!parsed) {
            throw vscode.FileSystemError.FileNotFound(uri);
        }
        const { mdocxUri, embeddedPath } = parsed;
        const bytes = await vscode.workspace.fs.readFile(mdocxUri);
        const { readMdocx, writeMdocxAsync } = await import('ts-mdocx');
        const doc = await readMdocx(bytes);
        const file = doc.markdown.files.find((f) => f.path === embeddedPath);
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
    delete(_uri, _options) {
        throw vscode.FileSystemError.NoPermissions('Cannot delete files from MDOCX via this provider.');
    }
    rename(_oldUri, _newUri, _options) {
        throw vscode.FileSystemError.NoPermissions('Cannot rename files in MDOCX via this provider.');
    }
    // --- Helpers ---
    async findFile(mdocxUri, embeddedPath) {
        try {
            const bytes = await vscode.workspace.fs.readFile(mdocxUri);
            const { readMdocx } = await import('ts-mdocx');
            const doc = await readMdocx(bytes);
            return doc.markdown.files.find((f) => f.path === embeddedPath);
        }
        catch {
            return undefined;
        }
    }
}
exports.MdocxFileSystemProvider = MdocxFileSystemProvider;
//# sourceMappingURL=mdocxFileSystemProvider.js.map