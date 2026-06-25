import type { LayoutServerLoad } from './$types';

/**
 * Empty layout load — required to satisfy SvelteKit's layout hierarchy
 * but all data comes from the page-level load functions.
 */
export const load: LayoutServerLoad = () => ({});
