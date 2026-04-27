<script lang="ts">
	import './layout.sass';
	import favicon from '$lib/assets/favicon.png';
	import backdrop from '$lib/assets/lightmodeback.jpg?enhanced'

	let { children } = $props();
</script>

<style lang="scss">
	.backdrop{
		position: fixed;
		z-index: -1;
		inset: 0;
		width: auto;
		height: 100vh;
	}
	@media (min-aspect-ratio: 3504/4656) {
		.backdrop { 
			width: 100vw; 
			height: auto; 
		}
	}
	.root{
		background: white;
		padding: 2%;
		column-count: 2;
	}
</style>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<enhanced:img class="backdrop" src={backdrop} sizes="min(3504px, 100vw)" alt='' />
<p>{backdrop.img.w} x {backdrop.img.h}</p>
<div class="root">{@render children()}</div>