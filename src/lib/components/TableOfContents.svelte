<script lang="ts">
	import type { TocEntry } from '$lib/markdown';

	let { toc }: { toc: TocEntry[] } = $props();
</script>

{#if toc.length > 1}
	<aside
		class="sticky top-6 hidden max-h-[calc(100dvh-3rem)] w-40 shrink-0 overflow-y-auto border-l border-[var(--color-border)] pl-5 [@media(min-width:900px)]:block"
	>
		<p class="mb-2 text-[0.7em] font-semibold tracking-[0.08em] text-[var(--color-dim)] uppercase">
			on this page
		</p>
		<nav>
			<ul class="flex list-none flex-col gap-1">
				{#each toc as entry}
					<!-- h3 entries are indented and slightly dimmer to show hierarchy -->
					<li class:pl-3={entry.level === 3}>
						<a
							href="#{entry.id}"
							class="block text-[0.78em] leading-[1.4] text-[var(--color-muted)] no-underline transition-colors hover:text-[var(--color-accent)] {entry.level ===
							3
								? 'opacity-75'
								: ''}"
						>
							{entry.text}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
{/if}
