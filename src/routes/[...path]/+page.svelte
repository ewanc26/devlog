<script lang="ts">
	// ── Individual post page ───────────────────────────────────────────────

	import { formatDate } from '$lib/date';
	import Tag from '$lib/components/Tag.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import { PUBLIC_SITE_URL } from '$app/env/public';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	// Dynamic OG image per post — generated server-side by the /api/og endpoint.
	// Derived so it tracks `data` across client-side navigations between posts.
	const ogImageUrl = $derived(
		`${PUBLIC_SITE_URL}/api/og?title=${encodeURIComponent(data.post.title)}&description=${encodeURIComponent(data.post.description ?? '')}`
	);

	/** Canonical URL for this post. */
	const canonical = $derived(`${PUBLIC_SITE_URL}/${data.post.path}`);
</script>

<svelte:head>
	<title>{data.post.title} | devlog</title>
	<meta name="description" content={data.post.description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content="{data.post.title} | devlog" />
	<meta property="og:description" content={data.post.description} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:type" content="article" />
	{#if data.post.date}<meta
			property="article:published_time"
			content={data.post.date.includes('T')
				? data.post.date
				: `${data.post.date}T${data.post.time || '12:00'}:00Z`}
		/>{/if}
	{#if data.post.tags.length}{#each data.post.tags as tag}<meta
				property="article:tag"
				content={tag}
			/>{/each}{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{data.post.title} | devlog" />
	<meta name="twitter:description" content={data.post.description} />
	<meta name="twitter:image" content={ogImageUrl} />
	<!-- sequoia inject stamps the at-uri link tag here -->
</svelte:head>

<div class="flex w-full items-start gap-10">
	<!-- Article -->
	<div class="min-w-0 flex-1">
		<p class="mb-2 font-mono text-[0.75em] text-[var(--color-dim)]">
			{formatDate(data.post.date, data.post.time)}
		</p>
		<h1
			class="mb-3 text-[1.5em] leading-[1.3] font-semibold tracking-tight text-[var(--color-text)]"
		>
			{data.post.title}
		</h1>

		{#if data.post.tags.length}
			<div class="mb-6 flex flex-wrap gap-1.5">
				{#each data.post.tags as tag}
					<Tag {tag} />
				{/each}
			</div>
		{/if}

		<hr class="my-6 border-0 border-t border-[var(--color-border)]" />

		<div class="prose max-w-none">{@html data.html}</div>

		<hr class="my-6 border-0 border-t border-[var(--color-border)]" />
		<a
			href="/"
			class="text-[0.85em] text-[var(--color-muted)] no-underline transition-colors hover:text-[var(--color-accent)]"
		>
			all entries
		</a>
	</div>

	<!-- ToC -->
	<TableOfContents toc={data.toc} />
</div>
