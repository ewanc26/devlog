<script lang="ts">
	import { tagStyle } from '$lib/tags';
	import { Search, X } from '@lucide/svelte';
	import { fade } from 'svelte/transition';

	interface TagEntry { tag: string; count: number }

	// bindable props: parent owns query/activeTag state, we update via two-way binding
	let { query = $bindable(''), activeTag = $bindable(''), tags }: {
		query: string;
		activeTag: string;
		tags: TagEntry[];
	} = $props();

	// Toggle a tag on/off — clicking the same tag again clears it
	function toggleTag(tag: string) {
		activeTag = activeTag === tag ? '' : tag;
	}

	function clear() {
		query = '';
		activeTag = '';
	}

	const hasFilter = $derived(query.length > 0 || activeTag.length > 0);

	// The tag cloud grows with every post ever written (190+ and counting) --
	// showing all of them turns the page header into a wall of chips before
	// any actual content. Cap it to the most-used tags; a toggle reveals the
	// long tail for anyone who wants it. The active tag always stays visible
	// even if it falls outside the cap, so clicking a chip never strands it.
	const TAG_LIMIT = 20;
	let expanded = $state(false);

	const visibleTags = $derived.by(() => {
		if (expanded || tags.length <= TAG_LIMIT) return tags;
		const capped = tags.slice(0, TAG_LIMIT);
		if (activeTag && !capped.some((t) => t.tag === activeTag)) {
			const active = tags.find((t) => t.tag === activeTag);
			if (active) capped.push(active);
		}
		return capped;
	});

	const hiddenCount = $derived(Math.max(0, tags.length - visibleTags.length));
</script>

<div class="search-bar">
	<div class="search-input-wrap">
		<Search size={14} class="search-icon" />
		<input
			type="text"
			class="search-input"
			placeholder="search entries…"
			bind:value={query}
			aria-label="Search entries"
		/>
		{#if hasFilter}
			<button class="search-clear" onclick={clear} aria-label="Clear search" transition:fade={{ duration: 150 }}>
				<X size={14} />
			</button>
		{/if}
	</div>
	{#if tags.length}
		<div class="search-tags">
			{#each visibleTags as { tag, count } (tag)}
				<button
					class="tag search-tag"
					class:search-tag-active={activeTag === tag}
					style={tagStyle(tag)}
					onclick={() => toggleTag(tag)}
					transition:fade={{ duration: 150 }}
				>
					{tag}<span class="search-tag-count">{count}</span>
				</button>
			{/each}
			{#if hiddenCount > 0}
				<button class="search-tags-more" onclick={() => (expanded = true)}>
					+{hiddenCount} more
				</button>
			{:else if expanded && tags.length > TAG_LIMIT}
				<button class="search-tags-more" onclick={() => (expanded = false)}>
					show fewer
				</button>
			{/if}
		</div>
	{/if}
</div>
