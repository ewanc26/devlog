<script lang="ts">
	// ── Single timeline entry: date, title, description, and tags ──────────

	import { formatDate } from '$lib/date';
	import Tag from './Tag.svelte';
	import type { PostMeta } from '$lib/posts';

	let { post, active = false }: { post: PostMeta; active?: boolean } = $props();
</script>

<div class="timeline-entry">
	<div class="timeline-marker" class:timeline-marker-active={active}></div>
	<a href="/{post.path}" class="block no-underline">
		<p class="mb-1 font-mono text-[0.72em] text-[var(--color-dim)]">
			{formatDate(post.date, post.time)}
		</p>
		<h2
			class="mb-1 text-[1em] leading-[1.4] font-medium text-[var(--color-text)] transition-colors duration-150 group-hover:text-[var(--color-accent)]"
		>
			{post.title}
		</h2>
		{#if post.description}
			<p class="mb-2 text-[0.82em] leading-[1.5] text-[var(--color-muted)]">{post.description}</p>
		{/if}
		{#if post.tags.length}
			<div class="flex flex-wrap gap-1.5">
				{#each post.tags as tag}
					<Tag {tag} />
				{/each}
			</div>
		{/if}
	</a>
</div>
