<script lang="ts">
	import Pageturn from '$lib/Pageturn.svelte';
</script>

<style lang="scss">
	.bookContent {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		box-sizing: border-box;
		.page {
			width: 49%;
			padding:10% 5% 5% 5%;
			box-sizing: border-box;
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
	<div class="page">
		<h1>Collectanea</h1>
		<p>or; Sundry Works, Writings, and Resources</p>
		<p>by T. Telos</p>
		<p>Α☧ω</p>
	</div>
	<Pageturn direction="backward" target="/" />
	<Pageturn direction="forward" target="/contents" />
</div>
