import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// Tailwind v4 CSS-first processing, then SvelteKit's plugin
	plugins: [tailwindcss(), sveltekit()]
});
