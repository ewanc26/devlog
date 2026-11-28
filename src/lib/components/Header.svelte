<script lang="ts">
	// ── Site header: logo, back link, RSS, and main site link ──────────────

	import { ArrowLeft, Rss, ExternalLink } from '@lucide/svelte';
	import { page } from '$app/state';

	const isHome = $derived(page.url.pathname === '/');
</script>

<header class="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
	<div class="flex items-center gap-3">
		{#if !isHome}
			<a
				href="/"
				class="text-[var(--color-dim)] transition-colors hover:text-[var(--color-accent)]"
				aria-label="back to entries"
			>
				<ArrowLeft size={18} />
			</a>
		{/if}
		<a href="/" class="no-underline">
			<span class="text-[1.05em] font-semibold tracking-tight text-[var(--color-text)]">
				devlog
			</span><span class="text-[var(--color-accent)]">.</span><span
				class="text-[0.9em] font-normal text-[var(--color-dim)]"
			>
				croft.click
			</span>
		</a>
	</div>
	<div class="flex items-center gap-4">
		<a
			href="/rss.xml"
			class="text-[var(--color-dim)] transition-colors hover:text-[var(--color-accent)]"
			aria-label="RSS feed"
		>
			<Rss size={15} />
		</a>
		<a
			href="https://ewancroft.uk"
			target="_blank"
			rel="noopener"
			class="flex items-center gap-1.5 text-[0.8em] text-[var(--color-dim)] no-underline transition-colors hover:text-[var(--color-accent)]"
		>
			ewancroft.uk <ExternalLink size={11} />
		</a>
	</div>
</header>
