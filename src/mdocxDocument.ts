import * as vscode from 'vscode';
import { TextDecoder, TextEncoder } from 'util';
import type { MarkdownFile, MdocxDocument as TsMdocxDocument, MediaItem } from 'ts-mdocx' with { 'resolution-mode': 'import' };

export type MdocxMarkdownFile = MarkdownFile;
export type MdocxMediaItem = MediaItem;
export type MdocxDocument = TsMdocxDocument;
export type MdocxMarkdownBundle = TsMdocxDocument['markdown'];
export type MdocxMediaBundle = TsMdocxDocument['media'];
export type MdocxDocumentMetadata = NonNullable<TsMdocxDocument['metadata']>;

interface CacheEntry {
  mtime: number;
  size: number;
  doc: MdocxDocument;
}

/**
 * Parsing an MDOCX means unzipping and decoding every embedded bundle, which is
 * far too expensive to repeat for each preview interaction. Entries are keyed by
 * URI and validated against the on-disk mtime/size before being reused.
 */
const documentCache = new Map<string, CacheEntry>();

export function invalidateDocument(uri: vscode.Uri): void {
  documentCache.delete(uri.toString());
}

export function normalizeDocument(doc: any): MdocxDocument {
  doc.markdown = doc.markdown || { bundleVersion: 1, files: [] };
  if (!Array.isArray(doc.markdown.files)) doc.markdown.files = [];
  doc.media = doc.media || { bundleVersion: 1, items: [] };
  if (!Array.isArray(doc.media.items)) doc.media.items = [];
  return doc as MdocxDocument;
}

/**
 * Read an MDOCX document. Pass `fresh` for read-modify-write flows so callers
 * never mutate the shared cached instance.
 */
export async function readDocument(uri: vscode.Uri, options?: { fresh?: boolean }): Promise<MdocxDocument> {
  const key = uri.toString();

  let stat: vscode.FileStat | undefined;
  try {
    stat = await vscode.workspace.fs.stat(uri);
  } catch {
    stat = undefined;
  }

  if (!options?.fresh && stat) {
    const cached = documentCache.get(key);
    if (cached && cached.mtime === stat.mtime && cached.size === stat.size) {
      return cached.doc;
    }
  }

  const bytes = await vscode.workspace.fs.readFile(uri);
  const { readMdocx } = await import('ts-mdocx');
  const doc = normalizeDocument(await readMdocx(bytes));

  if (options?.fresh) {
    documentCache.delete(key);
  } else if (stat) {
    documentCache.set(key, { mtime: stat.mtime, size: stat.size, doc });
  }

  return doc;
}

export async function writeDocument(uri: vscode.Uri, doc: MdocxDocument): Promise<void> {
  const { writeMdocxAsync } = await import('ts-mdocx');
  const bytes = await writeMdocxAsync(doc.markdown, doc.media, {
    metadata: doc.metadata,
    markdownCompression: 'zip',
    mediaCompression: 'zip'
  });
  await vscode.workspace.fs.writeFile(uri, bytes);
  invalidateDocument(uri);
}

export async function updateDocument(
  uri: vscode.Uri,
  mutate: (doc: MdocxDocument) => void | Promise<void>
): Promise<void> {
  const doc = await readDocument(uri, { fresh: true });
  await mutate(doc);
  await writeDocument(uri, doc);
}

export function decodeText(content: Uint8Array): string {
  return new TextDecoder('utf-8').decode(content);
}

export function encodeText(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

export function findMarkdownFile(doc: MdocxDocument, filePath?: string): MdocxMarkdownFile | undefined {
  const target =
    filePath ??
    doc.markdown.rootPath ??
    (typeof doc.metadata?.root === 'string' ? doc.metadata.root : undefined) ??
    doc.markdown.files[0]?.path;
  return doc.markdown.files.find((file) => file.path === target) ?? doc.markdown.files[0];
}

export function getMimeTypeFromExtension(ext: string): string {
  const mimeTypes: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.bmp': 'image/bmp',
    '.ico': 'image/x-icon',
    '.avif': 'image/avif',
    '.svg': 'image/svg+xml',
    '.mp3': 'audio/mpeg',
    '.ogg': 'audio/ogg',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.pdf': 'application/pdf',
    '.json': 'application/json',
    '.txt': 'text/plain',
    '.csv': 'text/csv',
    '.zip': 'application/zip'
  };
  return mimeTypes[ext.toLowerCase()] || 'application/octet-stream';
}

export const MEDIA_EXTENSIONS = [
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.bmp',
  '.ico',
  '.avif',
  '.svg',
  '.mp3',
  '.ogg',
  '.wav',
  '.mp4',
  '.webm',
  '.pdf'
];

export function inferMimeType(item: { mimeType?: string; path?: string; data?: Uint8Array }): string {
  if (typeof item.mimeType === 'string' && item.mimeType.length > 0) {
    return item.mimeType;
  }

  const p = typeof item.path === 'string' ? item.path.toLowerCase() : '';
  const dot = p.lastIndexOf('.');
  if (dot >= 0) {
    const byExt = getMimeTypeFromExtension(p.slice(dot));
    if (byExt !== 'application/octet-stream') return byExt;
  }

  const bytes = item.data;
  if (!bytes || bytes.length < 12) return 'application/octet-stream';

  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return 'image/png';
  }

  if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'image/jpeg';
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return 'image/gif';

  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return 'image/webp';
  }

  try {
    const head = new TextDecoder('utf-8').decode(bytes.slice(0, 256));
    if (head.includes('<svg') || head.includes('<?xml')) return 'image/svg+xml';
  } catch {
    // ignore
  }

  return 'application/octet-stream';
}

export function getMaxInlineMediaBytes(): number {
  const configured = vscode.workspace.getConfiguration('mdocx').get<number>('maxInlineMediaBytes');
  if (typeof configured === 'number' && Number.isFinite(configured) && configured > 0) {
    return configured;
  }
  return 25 * 1024 * 1024;
}

export function makeMediaId(fileName: string, existingIds: Set<string>): string {
  const base = fileName.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_') || 'media';
  if (!existingIds.has(base)) return base;
  let index = 2;
  while (existingIds.has(`${base}_${index}`)) index++;
  return `${base}_${index}`;
}
