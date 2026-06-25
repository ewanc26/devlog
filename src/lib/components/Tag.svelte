<script lang="ts">
	// Coloured tag badge — colour is derived deterministically from the tag name
	import { tagStyle } from '$lib/tags';
	let { tag }: { tag: string } = $props();
</script>

<span class="tag" style={tagStyle(tag)}>{tag}</span>
