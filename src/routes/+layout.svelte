<script lang="ts">
	import './layout.sass';
	import favicon from '$lib/assets/favicon.png';
	import Background from '$lib/Background.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Background />
<div class="root">{@render children()}</div>
