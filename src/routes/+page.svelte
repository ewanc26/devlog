<script lang="ts">
	import Timeline from '$lib/components/Timeline.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let query = $state('');
	let activeTag = $state('');

	// First pass: filter by query only (tag chips should reflect this set)
	const queryFiltered = $derived.by(() => {
		if (!query) return data.posts;
		const q = query.toLowerCase();
		return data.posts.filter((p) => {
			const text = `${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase();
			return text.includes(q);
		});
	});

	// Tags from the query-filtered set, sorted by frequency
	const visibleTags = $derived.by(() => {
		const counts = new Map<string, number>();
		for (const post of queryFiltered) {
			for (const tag of post.tags) {
				counts.set(tag, (counts.get(tag) ?? 0) + 1);
			}
		}
		return [...counts.entries()]
			.sort((a, b) => b[1] - a[1])
			.map(([tag, count]) => ({ tag, count }));
	});

	// Second pass: also filter by active tag
	const filtered = $derived.by(() => {
		if (!activeTag) return queryFiltered;
		return queryFiltered.filter((p) => p.tags.includes(activeTag));
	});
</script>

<svelte:head>
	<title>devlog.croft.click</title>
	<meta name="description" content="Changelog and devlog for ewan's projects." />
	<meta property="og:title" content="devlog.croft.click" />
	<meta property="og:description" content="Changelog and devlog for ewan's projects." />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="devlog.croft.click" />
	<meta name="twitter:description" content="Changelog and devlog for ewan's projects." />
</svelte:head>

<p class="text-[var(--color-muted)] text-[0.9em] mb-10 leading-[1.6]">
	What changed, when, and why.
</p>

<SearchBar bind:query bind:activeTag tags={visibleTags} />
<Timeline posts={filtered} />
