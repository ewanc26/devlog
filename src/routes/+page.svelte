<script lang="ts">
	import Timeline from '$lib/components/Timeline.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
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

<Timeline posts={data.posts} />
