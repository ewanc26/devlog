import { listPosts } from '$lib/posts';
import type { RequestHandler } from './$types';

const SITE_URL = 'https://devlog.croft.click';
const SITE_TITLE = 'devlog';
const SITE_DESCRIPTION = "Changelog and devlog for ewan's projects.";

export const prerender = true;

export const GET: RequestHandler = () => {
	const posts = listPosts();

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${SITE_TITLE}</title>
		<description>${SITE_DESCRIPTION}</description>
		<link>${SITE_URL}</link>
		<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
		<language>en-gb</language>
		${posts
			.map(
				(post) => `<item>
			<title>${post.title}</title>
			<description>${post.description}</description>
			<link>${SITE_URL}/${post.slug}</link>
			<guid isPermaLink="true">${SITE_URL}/${post.slug}</guid>
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
