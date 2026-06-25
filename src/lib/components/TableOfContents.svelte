<script lang="ts">
	import type { TocEntry } from '$lib/markdown';

	let { toc }: { toc: TocEntry[] } = $props();
</script>

{#if toc.length > 1}
	<aside class="shrink-0 w-40 sticky top-6 max-h-[calc(100dvh-3rem)] overflow-y-auto pl-5 border-l border-[var(--color-border)] hidden [@media(min-width:900px)]:block">
		<p class="text-[0.7em] font-semibold uppercase tracking-[0.08em] text-[var(--color-dim)] mb-2">on this page</p>
		<nav>
			<ul class="list-none flex flex-col gap-1">
				{#each toc as entry}
					<!-- h3 entries are indented and slightly dimmer to show hierarchy -->
					<li class:pl-3={entry.level === 3}>
						<a href="#{entry.id}" class="text-[0.78em] no-underline text-[var(--color-muted)] leading-[1.4] block transition-colors hover:text-[var(--color-accent)] {entry.level === 3 ? 'opacity-75' : ''}">{entry.text}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
{/if}
