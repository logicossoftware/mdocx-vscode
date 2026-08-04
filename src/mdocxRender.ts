import { Buffer } from 'buffer';
import { marked } from 'marked';

export interface OutlineEntry {
  level: number;
  text: string;
  id: string;
}

export interface RenderOptions {
  /** Resolve an href to an inlineable data URI for embedded media. */
  resolveMediaHref?: (href: string) => string | undefined;
  /** Resolve an href to another markdown file inside the same container. */
  resolveFileHref?: (href: string) => string | undefined;
}

export interface RenderResult {
  html: string;
  outline: OutlineEntry[];
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Stable anchor id for an embedded document path (used by the HTML export). */
export function docAnchorId(filePath: string): string {
  return 'doc-' + filePath.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
}

export function createSlugger(): (text: string) => string {
  const seen = new Map<string, number>();
  return (text: string) => {
    const base =
      text
        .toLowerCase()
        .replace(/<[^>]*>/g, '')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-') || 'section';
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}

function collectHeadingTokens(tokens: any[], out: any[]): void {
  for (const token of tokens) {
    if (!token || typeof token !== 'object') continue;
    if (token.type === 'heading') {
      out.push(token);
    }
    if (Array.isArray(token.tokens) && token.type !== 'heading') {
      collectHeadingTokens(token.tokens, out);
    }
    if (Array.isArray(token.items)) {
      collectHeadingTokens(token.items, out);
    }
  }
}

export function extractOutline(markdown: string): OutlineEntry[] {
  const slug = createSlugger();
  const headings: any[] = [];
  try {
    collectHeadingTokens(marked.lexer(markdown) as any[], headings);
  } catch {
    return [];
  }
  return headings.map((token) => {
    const text = String(token.text ?? '').replace(/[*_`~]/g, '');
    return { level: Number(token.depth) || 1, text, id: slug(text) };
  });
}

function sanitizeHref(href: string | null | undefined): string | null {
  const raw = (href ?? '').trim();
  if (!raw) return null;
  if (raw.startsWith('#')) return raw;
  if (/^mailto:/i.test(raw)) return raw;
  if (/^data:/i.test(raw)) return raw;
  if (/^https?:\/\//i.test(raw)) return raw;
  return null;
}

/**
 * Renders markdown for the webview. Raw HTML is dropped and unsafe URL schemes
 * (e.g. `javascript:`) are rejected, so the output is safe to inject.
 */
export function renderMarkdown(markdown: string, options?: RenderOptions): RenderResult {
  const outline = extractOutline(markdown);
  let headingIndex = 0;
  const fallbackSlug = createSlugger();

  const renderer = new marked.Renderer();

  renderer.html = () => '';

  renderer.heading = (text: string, level: number) => {
    const entry = outline[headingIndex++];
    const id = entry ? entry.id : fallbackSlug(text);
    return `<h${level} id="${escapeHtml(id)}"><a class="heading-anchor" href="#${escapeHtml(
      id
    )}" aria-hidden="true">#</a>${text}</h${level}>\n`;
  };

  renderer.code = (code: string, infostring?: string) => {
    const lang = (infostring || '').split(/\s+/)[0] ?? '';
    return `<div class="code-block"${lang ? ` data-lang="${escapeHtml(lang)}"` : ''}><pre><code${
      lang ? ` class="language-${escapeHtml(lang)}"` : ''
    }>${escapeHtml(code)}</code></pre></div>\n`;
  };

  renderer.link = (href: string | null, title: string | null, text: string) => {
    const raw = (href ?? '').trim();
    const embedded = options?.resolveFileHref?.(raw);
    const t = title ? ` title="${escapeHtml(title)}"` : '';

    if (embedded) {
      return `<a href="#${docAnchorId(embedded)}" class="internal-link" data-mdocx-file="${escapeHtml(
        embedded
      )}"${t}>${text}</a>`;
    }

    const media = options?.resolveMediaHref?.(raw);
    const safe = sanitizeHref(media ?? raw);
    if (!safe) return text;

    const external = /^https?:\/\//i.test(safe);
    const rel = external ? ' rel="noreferrer noopener" target="_blank"' : '';
    return `<a href="${escapeHtml(safe)}"${t}${rel}>${text}</a>`;
  };

  renderer.image = (href: string | null, title: string | null, text: string) => {
    const safe = sanitizeHref(href);
    if (!safe) return `<span class="missing-media">${escapeHtml(text || 'missing media')}</span>`;
    const t = title ? ` title="${escapeHtml(title)}"` : '';
    return `<img src="${escapeHtml(safe)}" alt="${escapeHtml(text ?? '')}"${t} loading="lazy" />`;
  };

  const walkTokens = (token: any) => {
    if (!options?.resolveMediaHref) return;
    if (token?.type === 'image' && typeof token.href === 'string') {
      const rewritten = options.resolveMediaHref(token.href);
      if (rewritten) token.href = rewritten;
    }
  };

  const parsed = marked.parse(markdown, { renderer, walkTokens, gfm: true, breaks: false } as any);
  return { html: typeof parsed === 'string' ? parsed : '', outline };
}

/** Candidate paths for an href written inside an embedded markdown file. */
export function hrefCandidates(href: string): string[] {
  const rawHref = href.trim().replace(/^<|>$/g, '');
  if (!rawHref) return [];

  const withoutFragmentOrQuery = rawHref.split('#')[0]?.split('?')[0] ?? rawHref;
  const normalized = withoutFragmentOrQuery.replace(/\\/g, '/');

  const candidates = new Set<string>([normalized]);
  if (normalized.startsWith('./')) candidates.add(normalized.slice(2));
  if (normalized.startsWith('/')) candidates.add(normalized.slice(1));
  try {
    candidates.add(decodeURI(normalized));
  } catch {
    // ignore malformed escapes
  }
  return [...candidates].filter(Boolean);
}

export function isExternalHref(href: string): boolean {
  const raw = href.trim();
  return /^https?:\/\//i.test(raw) || /^data:/i.test(raw) || /^mailto:/i.test(raw) || raw.startsWith('#');
}

export function toDataUri(mimeType: string, data: Uint8Array): string {
  return `data:${mimeType};base64,${Buffer.from(data).toString('base64')}`;
}
