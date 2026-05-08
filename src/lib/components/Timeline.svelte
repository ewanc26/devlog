<script lang="ts">
	import TimelineEntry from './TimelineEntry.svelte';
	import type { PostMeta } from '$lib/posts';

	let { posts }: { posts: PostMeta[] } = $props();

	// Group posts by month
	const grouped = $derived.by(() => {
		const groups: { month: string; posts: PostMeta[] }[] = [];
		let currentMonth = '';
		for (const post of posts) {
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

{#if posts.length === 0}
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
				<TimelineEntry {post} active={gi === 0 && pi === 0} />
			{/each}
		{/each}
	</div>
{/if}
