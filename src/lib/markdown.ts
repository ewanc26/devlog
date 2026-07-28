import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import type { Root } from 'mdast';

/** Strip h1 headings — the title is rendered separately above the content. */
function remarkStripH1() {
	return (tree: Root) => {
		tree.children = tree.children.filter(
			(node) => node.type !== 'heading' || node.depth !== 1
		);
	};
}

export interface TocEntry {
	level: number;
	text: string;
	id: string;
}

export interface RenderResult {
	html: string;
	toc: TocEntry[];
}

/**
 * Reproduce github-slugger (used by rehype-slug) for a single document, so ToC
 * anchors match the ids rehype-slug writes into the rendered HTML.
 *
 * Returns a stateful function: repeated headings get an incrementing suffix
 * (`foo`, `foo-1`, `foo-2`) exactly as github-slugger does. Without this,
 * every repeat of a heading anchors back to the first occurrence.
 */
function createSlugger(): (text: string) => string {
	const occurrences = new Map<string, number>();
	return (text: string) => {
		// replace each whitespace char individually (no collapse), strip non-word chars
		const base = text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.trim()
			.replace(/\s/g, '-');
		const seen = occurrences.get(base) ?? 0;
		occurrences.set(base, seen + 1);
		return seen === 0 ? base : `${base}-${seen}`;
	};
}

const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkStripH1)
	.use(remarkRehype)
	.use(rehypeSlug)
	.use(rehypeStringify);

/**
 * Render markdown to HTML and extract the table of contents in a single pass.
 * The AST is parsed once, then the TOC is extracted before the rehype pipeline
 * converts it to HTML.
 */
export async function renderMarkdown(markdown: string): Promise<RenderResult> {
	const tree = processor.parse(markdown);

	// Extract TOC from the parsed AST (before rehype transforms)
	const toc: TocEntry[] = [];
	const slugify = createSlugger();
	for (const node of tree.children) {
		// h1 is stripped before rehype-slug runs, but h4–h6 still consume slugs,
		// so they must advance the counter even though the ToC omits them.
		if (node.type !== 'heading' || node.depth < 2) continue;
		const text = node.children
			.filter((c) => c.type === 'text' || c.type === 'inlineCode')
			.map((c) => ('value' in c ? c.value : ''))
			.join('');
		const id = slugify(text);
		if (node.depth <= 3) toc.push({ level: node.depth, text, id });
	}

	// Run transformers (remark → rehype) then stringify to HTML
	const hast = await processor.run(tree);
	const html = processor.stringify(hast);

	return { html, toc };
}
