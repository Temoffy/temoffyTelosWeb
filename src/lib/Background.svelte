<script lang="ts">
	import backgroundLight from '$lib/assets/lightmodeback.jpg?enhanced';
	import backgroundDark from '$lib/assets/darkmodeback.png?enhanced';
</script>

<style lang="scss">
	.background {
		position: fixed;
		top: -50%;
		bottom: -50%;
		margin: auto;
		z-index: -1;
		inset: 0;
		justify-content: center;
		width: auto;
		height: 100vh;
		@media (min-aspect-ratio: 3504/4656) {
			width: 100vw;
			height: auto;
		}
		background: lightblue;
		@media (prefers-color-scheme: dark) {
			background: darkolivegreen;
		}
	}
	.dark {
		display: none;
		@media (prefers-color-scheme: dark) {
			display: flex;
		}
	}
	.light {
		display: none;
		@media (prefers-color-scheme: light) {
			display: flex;
		}
	}
</style>

<enhanced:img
	class="background dark"
	src={backgroundDark}
	sizes="min(3504px, 100vw)"
	alt=""
/>
<enhanced:img
	class="background light"
	src={backgroundLight}
	sizes="min(3504px, 100vw)"
	alt=""
/>
