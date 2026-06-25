<script lang="ts">
	// ── Homepage: post listing with live search and tag filtering ──────────

	import Timeline from '$lib/components/Timeline.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let query = $state('');
	let activeTag = $state('');

	// Two-pass filtering: query narrows the pool, then active tag (if set)
	// narrows it further. Tag frequencies are derived from the query-filtered
	// set so chip counts stay relevant as you type.

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
	<meta property="og:image" content="{PUBLIC_SITE_URL}/api/og?title=devlog.croft.click&description=Changelog+and+devlog+for+ewan%27s+projects." />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="devlog.croft.click" />
	<meta name="twitter:description" content="Changelog and devlog for ewan's projects." />
	<meta name="twitter:image" content="{PUBLIC_SITE_URL}/api/og?title=devlog.croft.click&description=Changelog+and+devlog+for+ewan%27s+projects." />
</svelte:head>

<p class="text-[var(--color-muted)] text-[0.9em] mb-10 leading-[1.6]">
	What changed, when, and why.
</p>

<SearchBar bind:query bind:activeTag tags={visibleTags} />
<Timeline posts={filtered} />
