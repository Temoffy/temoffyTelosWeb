<script lang="ts">
	let { direction, target, hijack = false, onclick = () => {}} = $props();
</script>

<style lang="scss">
	a, button {
		display: block;
		text-align: center;
		position: absolute;
		bottom: 0px;
		&.forward {
			right: 0px;
		}
		&.backward {
			left: 0px;
		}
	}
</style>

{#if hijack}
	<button class={direction} onclick={onclick}>turn page</button>
{:else}
	<a class={direction} href={target}>turn page</a>
{/if}