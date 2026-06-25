<script lang="ts">
	// ── Single timeline entry: date, title, description, and tags ──────────

	import { formatDate } from '$lib/date';
	import Tag from './Tag.svelte';
	import type { PostMeta } from '$lib/posts';

	let { post, active = false }: { post: PostMeta; active?: boolean } = $props();
</script>

<div class="timeline-entry">
	<div class="timeline-marker" class:timeline-marker-active={active}></div>
	<a href="/{post.path}" class="no-underline block">
		<p class="text-[0.72em] text-[var(--color-dim)] font-mono mb-1">{formatDate(post.date, post.time)}</p>
		<h2 class="text-[1em] font-medium text-[var(--color-text)] leading-[1.4] mb-1 transition-colors duration-150 group-hover:text-[var(--color-accent)]">
			{post.title}
		</h2>
		{#if post.description}
			<p class="text-[0.82em] text-[var(--color-muted)] leading-[1.5] mb-2">{post.description}</p>
		{/if}
		{#if post.tags.length}
			<div class="flex gap-1.5 flex-wrap">
				{#each post.tags as tag}
					<Tag {tag} />
				{/each}
			</div>
		{/if}
	</a>
</div>
