<script lang="ts">
	// ── Timeline: month-grouped post list with scroll-reveal animation ─────

	import TimelineEntry from './TimelineEntry.svelte';
	import { fade } from 'svelte/transition';
	import type { PostMeta } from '$lib/posts';

	let { posts }: { posts: PostMeta[] } = $props();

	// Group posts by month for chronologically-ordered section headers
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

	// Scroll reveal via IntersectionObserver — entries fade in as they appear
	let timelineEl: HTMLDivElement | undefined = $state();
	let observer: IntersectionObserver | undefined;

	$effect(() => {
		// Read `grouped` so this effect re-runs whenever the post list changes
		// (e.g. after toggling a tag filter), not just on initial mount.
		const _ = grouped;

		if (!timelineEl) return;

		// Tear down any existing observer before re-observing the new DOM nodes.
		observer?.disconnect();

		observer = new IntersectionObserver(
			(entries) => {
				let visibleIndex = 0;
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const el = entry.target as HTMLElement;
						// Apply staggered delay for a cascading reveal effect
						el.style.setProperty('--stagger', `${visibleIndex * 0.05}s`);
						el.classList.add('revealed');
						observer!.unobserve(el);
						visibleIndex++;
					}
				}
			},
			{ rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
		);

		// Observe all month headers and entries
		const children = timelineEl.querySelectorAll('.timeline-month, .timeline-entry');
		for (const child of children) {
			observer.observe(child);
		}

		return () => {
			observer?.disconnect();
		};
	});
</script>

{#if posts.length === 0}
	<p class="text-[var(--color-dim)] text-[0.88em] italic">
		No entries yet.
	</p>
{:else}
	<div class="timeline" bind:this={timelineEl}>
		{#each grouped as group, gi}
			<div class="timeline-month">
				<span class="timeline-month-label">{group.month}</span>
			</div>

			{#each group.posts as post, pi}
				<div transition:fade={{ duration: 200 }}>
					<TimelineEntry {post} active={gi === 0 && pi === 0} />
				</div>
			{/each}
		{/each}
	</div>
{/if}
