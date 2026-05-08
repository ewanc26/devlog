<script lang="ts">
	import { tagStyle } from '$lib/tags';
	import { Search, X } from '@lucide/svelte';

	interface TagEntry { tag: string; count: number }

	let { query = $bindable(''), activeTag = $bindable(''), tags }: {
		query: string;
		activeTag: string;
		tags: TagEntry[];
	} = $props();

	function toggleTag(tag: string) {
		activeTag = activeTag === tag ? '' : tag;
	}

	function clear() {
		query = '';
		activeTag = '';
	}

	const hasFilter = $derived(query.length > 0 || activeTag.length > 0);
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
			<button class="search-clear" onclick={clear} aria-label="Clear search">
				<X size={14} />
			</button>
		{/if}
	</div>
	{#if tags.length}
		<div class="search-tags">
			{#each tags as { tag, count } (tag)}
				<button
					class="tag search-tag"
					class:search-tag-active={activeTag === tag}
					style={tagStyle(tag)}
					onclick={() => toggleTag(tag)}
				>
					{tag}<span class="search-tag-count">{count}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>
