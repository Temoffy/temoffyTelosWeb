<script lang="ts">
	import './layout.sass';
	import favicon from '$lib/assets/favicon.png';
	import Background from '$lib/Background.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<Background />
<div class="root">{@render children()}</div>
