<script lang="ts">
	import { formatDate } from '$lib/format';
	import { tagClass } from '$lib/tags';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

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

<p class="text-[var(--color-muted)] text-[0.9em] mb-10 leading-[1.6]">
	What changed, when, and why.
</p>

{#if data.posts.length === 0}
	<p class="text-[var(--color-dim)] text-[0.88em] italic">
		No entries yet.
	</p>
{:else}
	<div class="timeline">
		{#each grouped as group, gi}
			<div class="timeline-month">
				<span class="timeline-month-label">{group.month}</span>
			</div>

			{#each group.posts as post, pi}
				{@const isFirst = gi === 0 && pi === 0}
				<div class="timeline-entry">
					<div class="timeline-marker" class:timeline-marker-active={isFirst}></div>
					<a href="/{post.path}" class="timeline-link no-underline block">
						<p class="text-[0.72em] text-[var(--color-dim)] font-mono mb-1">{formatDate(post.date)}</p>
						<h2 class="text-[1em] font-medium text-[var(--color-text)] leading-[1.4] mb-1 transition-colors duration-150 group-hover:text-[var(--color-accent)]">
							{post.title}
						</h2>
						{#if post.description}
							<p class="text-[0.82em] text-[var(--color-muted)] leading-[1.5] mb-2">{post.description}</p>
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
		{/each}
	</div>
{/if}
