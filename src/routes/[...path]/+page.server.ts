import { getPost, listPosts } from '$lib/posts';
import { renderMarkdown } from '$lib/markdown';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => listPosts().map(({ path }) => ({ path }));

export const load: PageServerLoad = async ({ params }) => {
	// params.path is "2024/03/02/mastodon-markov-bot" — extract the slug part
	const parts = params.path.split('/');
	const slugPart = parts[parts.length - 1];

	// Find the matching post by checking all files (slug part may not be unique across dates)
	const post = listPosts().find((p) => p.path === params.path);
	if (!post) error(404, 'not found');

	const full = getPost(post.slug);
	const { html, toc } = await renderMarkdown(full.content);
	return { post: full, html, toc };
};
