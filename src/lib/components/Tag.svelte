<script lang="ts">
	import { tagStyle } from '$lib/tags';
	let { tag }: { tag: string } = $props();
</script>

<span class="tag" style={tagStyle(tag)}>{tag}</span>
