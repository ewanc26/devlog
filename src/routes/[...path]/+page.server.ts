import { getPost, listPosts } from '$lib/posts';
import { renderMarkdown } from '$lib/markdown';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => listPosts().map(({ path }) => ({ path }));

/**
 * Load a single devlog post by its URL path.
 * The catch-all route matches paths like 2024/03/02/mastodon-markov-bot,
 * renders the markdown to HTML, and extracts the table of contents.
 */
export const load: PageServerLoad = async ({ params }) => {
	// params.path is "2024/03/02/mastodon-markov-bot" — match on the full path,
	// since the trailing slug alone is not unique across dates
	const post = listPosts().find((p) => p.path === params.path);
	if (!post) error(404, 'not found');

	const full = getPost(post.slug);
	const { html, toc } = await renderMarkdown(full.content);
	return { post: full, html, toc };
};
