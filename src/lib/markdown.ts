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
	for (const node of tree.children) {
		if (node.type !== 'heading' || node.depth < 2 || node.depth > 3) continue;
		const text = node.children
			.filter((c) => c.type === 'text' || c.type === 'inlineCode')
			.map((c) => ('value' in c ? c.value : ''))
			.join('');
		// Match github-slugger exactly (used by rehype-slug):
		// replace each whitespace char individually (no collapse), strip non-word chars
		const id = text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.trim()
			.replace(/\s/g, '-');
		toc.push({ level: node.depth, text, id });
	}

	// Run transformers (remark → rehype) then stringify to HTML
	const hast = await processor.run(tree);
	const html = processor.stringify(hast);

	return { html, toc };
}

/** Extract h2/h3 headings from raw markdown for the table of contents. */
export function extractToc(markdown: string): TocEntry[] {
	const tree = unified().use(remarkParse).parse(markdown) as Root;
	const entries: TocEntry[] = [];

	for (const node of tree.children) {
		if (node.type !== 'heading' || node.depth < 2 || node.depth > 3) continue;
		const text = node.children
			.filter((c) => c.type === 'text' || c.type === 'inlineCode')
			.map((c) => ('value' in c ? c.value : ''))
			.join('');
		// Match github-slugger exactly (used by rehype-slug):
		// replace each whitespace char individually (no collapse), strip non-word chars
		const id = text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.trim()
			.replace(/\s/g, '-');
		entries.push({ level: node.depth, text, id });
	}

	return entries;
}
