import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Deploy to Vercel via the build output API (static + serverless)
		adapter: adapter(),
		// All content is pre-rendered at build time; warn rather than fail on
		// expected edge cases like missing IDs in heading anchors.
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn',
			entries: ['*']
		}
	}
};

export default config;
