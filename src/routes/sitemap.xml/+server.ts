// ── Sitemap ──────────────────────────────────────────────────────
// robots.txt advertises /sitemap.xml, so it has to exist. SvelteKit does not
// generate one, and the post routes live under a [...path] catch-all that a
// crawler cannot enumerate, so every published post is listed explicitly.

import { PUBLIC_SITE_URL } from '$env/static/public';
import { listPosts } from '$lib/posts';
import type { RequestHandler } from './$types';

export const prerender = true;

/** Escape the five XML predefined entities. */
function escapeXml(value: string): string {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET: RequestHandler = () => {
	const origin = PUBLIC_SITE_URL.replace(/\/$/, '');

	// listPosts() already filters drafts and sorts newest-first.
	const urls = [
		{ loc: `${origin}/`, priority: '1.0', lastmod: '' },
		...listPosts().map((post) => ({
			loc: `${origin}/${post.path}`,
			priority: '0.7',
			lastmod: post.date
		}))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		({ loc, priority, lastmod }) =>
			`	<url>
		<loc>${escapeXml(loc)}</loc>
${lastmod ? `		<lastmod>${escapeXml(lastmod)}</lastmod>\n` : ''}		<priority>${priority}</priority>
	</url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
};
