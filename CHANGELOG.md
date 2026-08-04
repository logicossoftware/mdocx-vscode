# Changelog

## 0.2.0

### Added
- **Split view** - New Preview / Split / Edit mode switcher. Split mode shows the editor next to a live preview that re-renders as you type (embedded media resolves in the live preview too).
- **Document outline** - Sidebar panel listing the headings of the current document; click to jump. Headings now get stable anchor ids and hover anchor links.
- **Full-text search** - Search across every markdown file in the container with highlighted, clickable results (`Ctrl+F` inside the preview).
- **File filter** - Quickly narrow the file list by name.
- **Rename and duplicate files** - Rename or duplicate embedded markdown files from the file list.
- **Set root file** - Mark any file as the container root directly from the file list.
- **Markdown formatting toolbar** - Bold, italic, inline code, heading, link, lists, quote, table, and code block helpers with `Ctrl+B` / `Ctrl+I` / `Ctrl+K` shortcuts, plus `Tab` indentation support.
- **Insert media references** - Insert a markdown reference to any embedded media item at the cursor.
- **Export media** - Save any embedded media item back to disk.
- **Unused media detection** - Media not referenced by any markdown file is flagged in the sidebar.
- **New commands**
  - `MDOCX: Create MDOCX from Folder` - packs a folder of markdown and media into a container.
  - `MDOCX: Extract MDOCX to Folder` - unpacks markdown, media, and metadata to disk.
  - `MDOCX: Export MDOCX as HTML` - writes a self-contained HTML file (media inlined) for a single document or all documents combined.
- **Document statistics** - Word counts per file plus totals for files, words, and media size.
- **Cross-document links** - Links to other markdown files inside the container now navigate the preview instead of being dropped.
- **Cross-document completions** - Autocomplete now suggests other embedded markdown files alongside media references.
- **Setting** `mdocx.confirmDelete` to disable delete confirmations.
- **Collapsible sidebar** and toast notifications for in-preview feedback.

### Changed
- Rendering improvements: GFM tables, task lists, blockquotes, horizontal rules, and code blocks are styled; code blocks show their language and a copy button.
- Missing or unresolvable images now render a visible placeholder instead of disappearing silently.
- Editor status bar shows word count, character count, and estimated reading time.
- Explorer context menu entries are now scoped (create commands on folders, extract/export on `.mdocx` files).
- Media ids are derived from the file name instead of a timestamp suffix.

### Fixed
- MDOCX contents are now cached and invalidated by file timestamp, so switching files, searching, and previewing no longer re-parse the whole container each time.
- Writes made by the extension no longer trigger a redundant file-watcher re-render (which could clobber in-progress edits).
- Errors from add / rename / delete / media operations are surfaced as notifications instead of failing silently.
- New and renamed file paths are validated (extension, duplicates, and `..` path traversal).
- Editing an embedded file through the virtual filesystem now invalidates the preview cache, and reports the container's real timestamps instead of `Date.now()`, which caused phantom "file changed" prompts.
- Extracting a container rejects unsafe paths that would escape the target folder.
- MIME types are inferred consistently from extension and file signature for previews, exports, and thumbnails.

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
