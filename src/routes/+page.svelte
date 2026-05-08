<script lang="ts">
	import Timeline from '$lib/components/Timeline.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let query = $state('');
	let activeTag = $state('');

	// Collect unique tags sorted by frequency
	const allTags = $derived.by(() => {
		const counts = new Map<string, number>();
		for (const post of data.posts) {
			for (const tag of post.tags) {
				counts.set(tag, (counts.get(tag) ?? 0) + 1);
			}
		}
		return [...counts.entries()]
			.sort((a, b) => b[1] - a[1])
			.map(([tag]) => tag);
	});

	// Filter posts by query + active tag
	const filtered = $derived.by(() => {
		let posts = data.posts;
		if (activeTag) {
			posts = posts.filter((p) => p.tags.includes(activeTag));
		}
		if (query) {
			const q = query.toLowerCase();
			posts = posts.filter((p) => {
				const text = `${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase();
				return text.includes(q);
			});
		}
		return posts;
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

<SearchBar bind:query bind:activeTag tags={allTags} />
<Timeline posts={filtered} />
