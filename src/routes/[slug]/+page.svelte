<script lang="ts">
	import { formatDate } from '$lib/format';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const tagClass = (tag: string) => {
		const t = tag.toLowerCase();
		if (t === 'feature' || t === 'feat' || t === 'new') return 'tag-feature';
		if (t === 'fix' || t === 'bugfix' || t === 'bug') return 'tag-fix';
		if (t === 'infra' || t === 'config' || t === 'nix') return 'tag-infra';
		if (t === 'breaking' || t === 'major') return 'tag-breaking';
		return 'tag-default';
	};
</script>

<svelte:head>
	<title>{data.post.title} | devlog</title>
	<meta name="description" content={data.post.description} />
	<meta property="og:title" content="{data.post.title} | devlog" />
	<meta property="og:description" content={data.post.description} />
	<meta property="og:type" content="article" />
	{#if data.post.date}<meta property="article:published_time" content={data.post.date} />{/if}
	{#if data.post.tags.length}{#each data.post.tags as tag}<meta property="article:tag" content={tag} />{/each}{/if}
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{data.post.title} | devlog" />
	<meta name="twitter:description" content={data.post.description} />
	<!-- sequoia inject stamps the at-uri link tag here -->
</svelte:head>

<div class="flex gap-10 items-start w-full">
	<!-- Article -->
	<div class="flex-1 min-w-0">
		<p class="text-[0.75em] text-[var(--color-dim)] font-mono mb-2">{formatDate(data.post.date)}</p>
		<h1 class="text-[1.5em] font-semibold tracking-tight text-[var(--color-text)] leading-[1.3] mb-3">{data.post.title}</h1>

		{#if data.post.tags.length}
			<div class="flex gap-1.5 flex-wrap mb-6">
				{#each data.post.tags as tag}
					<span class="tag {tagClass(tag)}">{tag}</span>
				{/each}
			</div>
		{/if}

		<hr class="border-0 border-t border-[var(--color-border)] my-6" />

		<div class="prose max-w-none">{@html data.html}</div>

		<hr class="border-0 border-t border-[var(--color-border)] my-6" />
		<a href="/" class="text-[0.85em] no-underline text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]">all entries</a>
	</div>

	<!-- ToC -->
	{#if data.toc.length > 1}
		<aside class="shrink-0 w-40 sticky top-6 max-h-[calc(100dvh-3rem)] overflow-y-auto pl-5 border-l border-[var(--color-border)] hidden [@media(min-width:900px)]:block">
			<p class="text-[0.7em] font-semibold uppercase tracking-[0.08em] text-[var(--color-dim)] mb-2">on this page</p>
			<nav>
				<ul class="list-none flex flex-col gap-1">
					{#each data.toc as entry}
						<li class:pl-3={entry.level === 3}>
							<a href="#{entry.id}" class="text-[0.78em] no-underline text-[var(--color-muted)] leading-[1.4] block transition-colors hover:text-[var(--color-accent)] {entry.level === 3 ? 'opacity-75' : ''}">{entry.text}</a>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
	{/if}
</div>
