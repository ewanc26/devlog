<script lang="ts">
	import { ArrowLeft, Rss, ExternalLink } from '@lucide/svelte';
	import { page } from '$app/stores';

	const isHome = $derived($page.url.pathname === '/');
</script>

<header class="border-b border-[var(--color-border)] px-6 py-4 flex items-center justify-between">
	<div class="flex items-center gap-3">
		{#if !isHome}
			<a href="/" class="text-[var(--color-dim)] hover:text-[var(--color-accent)] transition-colors" aria-label="back to entries">
				<ArrowLeft size={18} />
			</a>
		{/if}
		<a href="/" class="no-underline">
			<span class="text-[1.05em] font-semibold tracking-tight text-[var(--color-text)]">devlog</span><span class="text-[var(--color-accent)]">.</span><span class="text-[var(--color-dim)] font-normal text-[0.9em]">croft.click</span>
		</a>
	</div>
	<div class="flex items-center gap-4">
		<a href="/rss.xml" class="text-[var(--color-dim)] hover:text-[var(--color-accent)] transition-colors" aria-label="RSS feed">
			<Rss size={15} />
		</a>
		<a href="https://ewancroft.uk" target="_blank" rel="noopener" class="text-[var(--color-dim)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1.5 text-[0.8em] no-underline">
			ewancroft.uk <ExternalLink size={11} />
		</a>
	</div>
</header>
