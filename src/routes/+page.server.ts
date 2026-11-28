import { listPosts } from '$lib/posts';
import type { PageServerLoad } from './$types';

/**
 * Load the full post list for the homepage timeline.
 * Filtering (by search query and tag) happens client-side for instant feedback.
 */
export const load: PageServerLoad = () => ({ posts: listPosts() });
