import { listPosts } from '$lib/posts';
import { PUBLIC_SITE_URL, PUBLIC_SITE_TITLE, PUBLIC_SITE_DESCRIPTION } from '$env/static/public';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
	const posts = listPosts();
	const siteUrl = PUBLIC_SITE_URL || 'https://devlog.croft.click';

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${PUBLIC_SITE_TITLE || 'devlog'}</title>
		<description>${PUBLIC_SITE_DESCRIPTION || 'Changelog and devlog'}</description>
		<link>${siteUrl}</link>
		<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
		<language>en-gb</language>
		${posts
			.map(
				(post) => `<item>
			<title>${post.title}</title>
			<description>${post.description}</description>
			<link>${siteUrl}/${post.slug}</link>
			<guid isPermaLink="true">${siteUrl}/${post.slug}</guid>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			${post.tags.map((tag) => `<category>${tag}</category>`).join('\n\t\t\t')}
		</item>`
			)
			.join('\n\t\t')}
	</channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
