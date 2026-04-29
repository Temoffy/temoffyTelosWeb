<script lang="ts">
	import Pageturn from '$lib/Pageturn.svelte';
</script>

<style lang="scss">
	.bookContent {
		width: 100%;
		aspect-ratio: 3/2;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.page {
			width: 49%;
		}
	}
	h1,
	p {
		text-align: center;
	}
</style>

<svelte:head><title>Title - TemoffyTelos</title></svelte:head>

<div class="bookContent">
	<div class="page"></div>
	<div class="page" style="padding:10% 5% 5% 5%;">
		<h1>Collectanea</h1>
		<p>Or sundry works, writings, and resources</p>
		<p>by T. Telos</p>
		<p>Α☧ω</p>
	</div>
	<Pageturn direction="backward" target="/" />
	<Pageturn direction="forward" target="/contents" />
</div>
