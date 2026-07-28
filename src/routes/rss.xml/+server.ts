/** Pre-rendered RSS 2.0 feed of all published posts, most recent first. */
import { PUBLIC_SITE_URL } from '$env/static/public';
import { listPosts } from '$lib/posts';
import type { RequestHandler } from './$types';

// Sourced from the environment rather than hardcoded so the feed, the sitemap
// and the page metadata cannot drift apart when the domain changes.
const SITE_URL = PUBLIC_SITE_URL.replace(/\/$/, '');
const SITE_TITLE = 'devlog';
const SITE_DESCRIPTION = "Changelog and devlog for ewan's projects.";

export const prerender = true;

/**
 * Escape text for inclusion in an XML text node or attribute.
 * Frontmatter is authored freely and regularly contains `&`, `<` and `>`,
 * which would otherwise produce a feed that fails to parse.
 */
function escapeXml(value: string): string {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

/** RFC 822 pubDate honouring the post's optional time-of-day. */
function pubDate(date: string, time: string): string {
	const parsed = new Date(`${date}T${time || '12:00'}:00Z`);
	return isNaN(parsed.getTime()) ? new Date(0).toUTCString() : parsed.toUTCString();
}

export const GET: RequestHandler = () => {
	const posts = listPosts();

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(SITE_TITLE)}</title>
		<description>${escapeXml(SITE_DESCRIPTION)}</description>
		<link>${SITE_URL}</link>
		<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
		<language>en-gb</language>
		${posts
			.map(
				(post) => `<item>
			<title>${escapeXml(post.title)}</title>
			<description>${escapeXml(post.description)}</description>
			<link>${escapeXml(`${SITE_URL}/${post.path}`)}</link>
			<guid isPermaLink="true">${escapeXml(`${SITE_URL}/${post.path}`)}</guid>
			<pubDate>${pubDate(post.date, post.time)}</pubDate>
			${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n\t\t\t')}
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
