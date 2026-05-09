/**
 * Dynamic OG image endpoint for devlog posts.
 * Generates OpenGraph images on demand using @ewanc26/og.
 *
 * Query params:
 * - title: Post title (required)
 * - description: Optional one-line description
 */
import { createOgEndpoint } from '@ewanc26/og';
import { PUBLIC_SITE_URL } from '$env/static/public';

export const GET = createOgEndpoint({
	siteName: 'devlog.croft.click',
	defaultTemplate: 'blog',
	colors: {
		background: '#1a1816',
		text: '#ede9e0',
		accent: '#e2a93b',
	},
	cacheMaxAge: 86_400, // 24 hours
});
