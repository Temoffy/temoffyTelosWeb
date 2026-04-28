<script lang="ts">
	import './layout.sass';
	import favicon from '$lib/assets/favicon.png';
	import Background from './Background.svelte';

	let { children } = $props();
</script>

<style lang="scss">
	.root{
		background: antiquewhite;
		color: darkslategray;
		padding: 2%;
		column-count: 2;
		@media (prefers-color-scheme: dark){
			background: slategrey;
			color: black;
		}
	}
</style>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Background />
<div class="root">{@render children()}</div>