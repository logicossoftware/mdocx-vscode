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
| 📂 **File Picker** | Switch between embedded Markdown documents instantly. |
| 🖼️ **Embedded Media** | Images and other media stored in the container are resolved and displayed inline. |
| 📝 **Edit in Place** | Open the selected Markdown in VS Code's text editor and save changes back to the container. |
| 📋 **Copy to Clipboard** | Quickly copy the raw Markdown source to paste elsewhere. |
| 🗂️ **Metadata Panel** | View and edit document metadata (title, description, author, root file, tags). |
| 🎞️ **Media Manager** | Add, replace, or remove media assets without leaving VS Code. |
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
2. Use the **file selector** at the top to switch between embedded Markdown documents.
3. Click **Edit** to open the Markdown in a text editor; changes are saved back to the container.
4. Expand the **Metadata** panel to update title, description, author, root file, or tags.
5. Expand the **Media** panel to add, replace, or remove embedded assets.

---

## ⚙️ Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `mdocx.maxInlineMediaBytes` | `number` | `26214400` (25 MB) | Maximum size of a single media item to inline as a data URI. Larger items are not displayed inline. |

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

