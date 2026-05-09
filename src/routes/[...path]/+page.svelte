<script lang="ts">
	import { formatDate } from '$lib/date';
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import Tag from '$lib/components/Tag.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const ogImageUrl = `${PUBLIC_SITE_URL}/og?title=${encodeURIComponent(data.post.title)}&description=${encodeURIComponent(data.post.description ?? '')}`;
</script>

<svelte:head>
	<title>{data.post.title} | devlog</title>
	<meta name="description" content={data.post.description} />
	<meta property="og:title" content="{data.post.title} | devlog" />
	<meta property="og:description" content={data.post.description} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:type" content="article" />
	{#if data.post.date}<meta property="article:published_time" content={data.post.time ? `${data.post.date}T${data.post.time}` : data.post.date} />{/if}
	{#if data.post.tags.length}{#each data.post.tags as tag}<meta property="article:tag" content={tag} />{/each}{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{data.post.title} | devlog" />
	<meta name="twitter:description" content={data.post.description} />
	<meta name="twitter:image" content={ogImageUrl} />
	<!-- sequoia inject stamps the at-uri link tag here -->
</svelte:head>

<div class="flex gap-10 items-start w-full">
	<!-- Article -->
	<div class="flex-1 min-w-0">
		<p class="text-[0.75em] text-[var(--color-dim)] font-mono mb-2">{formatDate(data.post.date, data.post.time)}</p>
		<h1 class="text-[1.5em] font-semibold tracking-tight text-[var(--color-text)] leading-[1.3] mb-3">{data.post.title}</h1>

		{#if data.post.tags.length}
			<div class="flex gap-1.5 flex-wrap mb-6">
				{#each data.post.tags as tag}
					<Tag {tag} />
				{/each}
			</div>
		{/if}

		<hr class="border-0 border-t border-[var(--color-border)] my-6" />

		<div class="prose max-w-none">{@html data.html}</div>

		<hr class="border-0 border-t border-[var(--color-border)] my-6" />
		<a href="/" class="text-[0.85em] no-underline text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]">all entries</a>
	</div>

	<!-- ToC -->
	<TableOfContents toc={data.toc} />
</div>
