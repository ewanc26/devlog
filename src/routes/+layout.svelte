<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import { ArrowLeft, Rss, ExternalLink } from '@lucide/svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	const isHome = $derived($page.url.pathname === '/');
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="min-h-dvh flex flex-col">
	<!-- Header -->
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

	<!-- Main -->
	<main class="flex-1 px-6 py-10 max-w-[680px] w-full mx-auto">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="border-t border-[var(--color-border)] px-6 py-4 text-center text-[0.75em] text-[var(--color-dim)]">
		published via <a href="https://sequoia.pub" target="_blank" rel="noopener" class="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors no-underline">sequoia</a>
		·
		<a href="https://github.com/ewanc26" target="_blank" rel="noopener" class="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors no-underline">github</a>
	</footer>
</div>
