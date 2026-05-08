<script lang="ts">
	import { formatDate } from '$lib/format';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const tagClass = (tag: string) => {
		const t = tag.toLowerCase();
		if (t === 'feature' || t === 'feat' || t === 'new') return 'tag-feature';
		if (t === 'fix' || t === 'bugfix' || t === 'bug') return 'tag-fix';
		if (t === 'infra' || t === 'config' || t === 'nix' || t === 'infra') return 'tag-infra';
		if (t === 'breaking' || t === 'major') return 'tag-breaking';
		return 'tag-default';
	};

	// Group posts by month
	const grouped = $derived.by(() => {
		const groups: { month: string; posts: typeof data.posts }[] = [];
		let currentMonth = '';
		for (const post of data.posts) {
			const month = new Date(`${post.date}T12:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
			if (month !== currentMonth) {
				groups.push({ month, posts: [] });
				currentMonth = month;
			}
			groups[groups.length - 1].posts.push(post);
		}
		return groups;
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

<p class="text-[var(--color-muted)] text-[0.9em] mb-8 leading-[1.6]">
	What changed, when, and why.
</p>

{#if data.posts.length === 0}
	<p class="text-[var(--color-dim)] text-[0.88em] italic">
		No entries yet.
	</p>
{:else}
	{#each grouped as group}
		<p class="text-[0.72em] font-semibold uppercase tracking-[0.1em] text-[var(--color-dim)] mb-4">{group.month}</p>

		<div class="timeline mb-8">
			{#each group.posts as post}
				<div class="timeline-entry">
					<a href="/{post.slug}" class="no-underline block">
						<p class="text-[0.75em] text-[var(--color-dim)] font-mono mb-1">{formatDate(post.date)}</p>
						<h2 class="text-[1em] font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors leading-[1.4] mb-1">
							{post.title}
						</h2>
						{#if post.description}
							<p class="text-[0.85em] text-[var(--color-muted)] leading-[1.5] mb-2">{post.description}</p>
						{/if}
						{#if post.tags.length}
							<div class="flex gap-1.5 flex-wrap">
								{#each post.tags as tag}
									<span class="tag {tagClass(tag)}">{tag}</span>
								{/each}
							</div>
						{/if}
					</a>
				</div>
			{/each}
		</div>
	{/each}
{/if}
