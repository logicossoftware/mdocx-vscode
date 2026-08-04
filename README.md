# MDOCX for VS Code

[![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/logicossoftware.mdocx-vscode?label=Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=logicossoftware.mdocx-vscode)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Preview, edit, and manage MDOCX files directly in Visual Studio Code.**

MDOCX (**M**ark**D**own **O**pen **C**ontainer e**X**change) bundles one or more Markdown documents together with referenced media (images, audio, video, and more) into a single portable file. This extension brings first-class support for `.mdocx` files to VS Code.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **Live Preview** | Render any Markdown file inside the MDOCX with a single click. |
| ↔️ **Split View** | Edit and preview side by side, with the preview updating as you type. |
| 🧭 **Outline** | Jump between headings of the current document. |
| 🔎 **Full-Text Search** | Search every embedded document at once, with highlighted results. |
| 📂 **File Manager** | Add, rename, duplicate, delete, and set the root of embedded Markdown files. |
| 🖼️ **Embedded Media** | Images and other media stored in the container are resolved and displayed inline. |
| 🎞️ **Media Manager** | Add, replace, export, or remove media assets — unused items are flagged. |
| ✍️ **Formatting Toolbar** | Bold, italic, code, headings, links, lists, quotes, and tables with keyboard shortcuts. |
| 📝 **Edit in Place** | Edit inline or open the Markdown in VS Code's text editor; changes save back to the container. |
| 📤 **Import / Export** | Pack a folder into an MDOCX, extract one to disk, or export self-contained HTML. |
| 🗂️ **Metadata Panel** | View and edit document metadata (title, description, author, root file, tags). |
| 📋 **Copy to Clipboard** | Quickly copy the raw Markdown source to paste elsewhere. |
| 🔒 **Safe Rendering** | Raw HTML is stripped; unsafe URL schemes (e.g., `javascript:`) are blocked. |

---

## 📸 Screenshots

<!-- Add your own screenshots here. Place images in an `images/` folder and reference them like: -->
<!-- ![Preview](images/preview.png) -->

*Coming soon — screenshots of the preview panel, metadata editor, and media manager.*

---

## 🚀 Installation

1. Open **Extensions** in VS Code (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **MDOCX**.
3. Click **Install**.

Alternatively, install from the command line:

```bash
code --install-extension logicos.mdocx-vscode
```

---

## 📖 Usage

1. Open any `.mdocx` file — the **MDOCX Preview** editor opens automatically.
2. Use the **Files** panel to switch between embedded Markdown documents, or rename, duplicate, delete, and set the root file.
3. Switch between **Preview**, **Split**, and **Edit** modes in the header. Save with `Ctrl+S`.
4. Use the **Outline** panel to jump between headings and the **Search** panel (`Ctrl+F`) to search all documents.
5. Expand the **Media** panel to add, replace, export, or remove assets — or insert a reference at the cursor.
6. Expand the **Metadata** panel to update title, description, author, root file, or tags.

### Commands

| Command | Description |
|---------|-------------|
| `MDOCX: Create New MDOCX File` | Creates an empty container with a default `README.md`. |
| `MDOCX: Create MDOCX from Folder` | Packs a folder of Markdown and media files into a container. |
| `MDOCX: Extract MDOCX to Folder` | Unpacks Markdown, media, and metadata to disk. |
| `MDOCX: Export MDOCX as HTML` | Writes a self-contained HTML file with media inlined. |

---

## ⚙️ Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `mdocx.maxInlineMediaBytes` | `number` | `26214400` (25 MB) | Maximum size of a single media item to inline as a data URI. Larger items are not displayed inline. |
| `mdocx.confirmDelete` | `boolean` | `true` | Ask for confirmation before deleting Markdown files or media from a container. |

Access settings via **File → Preferences → Settings** and search for *MDOCX*.

---

## 🛠️ Development

```bash
# Clone the repo
git clone https://github.com/logicossoftware/mdocx-vscode.git
cd mdocx-vscode

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Generate a sample MDOCX file
npm run sample:generate

# Launch Extension Development Host
# Press F5 in VS Code, then open samples/sample.mdocx
```

---

## 📚 Resources

- [MDOCX RFC (spec)](https://github.com/logicossoftware/go-mdocx/blob/main/rfc.md)
- [ts-mdocx on npm](https://www.npmjs.com/package/ts-mdocx)

---

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for release notes.

---
## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This extension is released under the [MIT License](LICENSE).

