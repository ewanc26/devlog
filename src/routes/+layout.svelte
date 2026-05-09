<script lang="ts">
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

<div class="min-h-dvh flex flex-col">
	<Header />
	<main class="flex-1 px-6 py-10 max-w-[680px] w-full mx-auto">
		{@render children()}
	</main>
	<Footer />
</div>
