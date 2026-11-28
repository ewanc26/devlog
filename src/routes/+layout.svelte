<script lang="ts">
	// ── Root layout: header, main content slot, footer ─────────────────────

	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onNavigate } from '$app/navigation';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	// View Transitions API — cross-fade between pages
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="flex min-h-dvh flex-col">
	<Header />
	<main class="mx-auto w-full max-w-[680px] flex-1 px-6 py-10">
		{@render children()}
	</main>
	<Footer />
</div>
