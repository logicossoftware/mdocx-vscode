# Changelog

## 0.1.0

### Added
- **Integrated Markdown Editor** - Edit markdown files directly within the MDOCX preview panel
  - Toggle between Preview and Edit modes using the toolbar buttons
  - Full-featured text editor with character count and modification indicator
  - Save changes with the Save button or Ctrl+S keyboard shortcut
  - Discard changes button to revert to last saved version
  - Unsaved changes warning when switching files or modes
- **Improved UI Consistency**
  - Unified view toggle for switching between Preview and Edit modes
  - "Open in Editor" button to edit in VS Code's native editor when preferred
  - Clicking edit icon on files in sidebar switches to inline edit mode

### Changed
- Reorganized header toolbar with clear mode toggle buttons
- Edit button in file list now opens inline editor instead of external editor

## 0.0.4

### Added
- **Create New MDOCX File** command (`MDOCX: Create New MDOCX File`)
  - Available from Command Palette and Explorer context menu
  - Creates a new MDOCX with a default README.md
- **Add Markdown Files** to existing MDOCX documents
  - New "+ Add File" button in the sidebar
  - Specify custom paths (e.g., `docs/guide.md`)
- **Delete Markdown Files** from MDOCX documents
  - Delete button appears on hover in file list
  - Confirmation dialog before deletion
- **Enhanced Preview UI**
  - New sidebar layout with collapsible sections: Files, Media, Metadata
  - File list shows all markdown files with edit/delete actions
  - Root file indicator shows which file is the main document
  - Responsive design - sidebar adapts on narrow screens
  - Better visual styling with VS Code theme integration

### Fixed
- **Extension not working from Marketplace** - Fixed bundling issue where dependencies (`ts-mdocx`, `marked`) were not included in the packaged extension. Now uses esbuild to bundle all dependencies.
- Fixed `BundleVersion must be a number` error when creating new MDOCX files

### Changed
- Build system now uses esbuild for bundling instead of plain TypeScript compilation
- Production builds are minified for smaller package size

## 0.0.3

- Metadata editing panel (title, description, author, tags, root file)
- Media management (add, replace, remove media files)
- File watcher for automatic preview refresh

## 0.0.2

- Virtual filesystem provider for editing embedded markdown files
- Copy markdown to clipboard
- Edit button to open markdown in VS Code editor

## 0.0.1

- Initial release: readonly MDOCX preview custom editor
