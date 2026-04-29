<script lang="ts">
	let { direction, target } = $props();
</script>

<style lang="scss">
	a {
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

<a class={direction} href={target}>turn page</a>
