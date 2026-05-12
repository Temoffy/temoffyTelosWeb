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
		container-type: size;
		@media (max-width: 600px) {
			justify-content: space-around;
		}
		.page {
			width: 49%;
			padding: 10cqh 5cqw 5cqh 5cqw;
			box-sizing: border-box;
			@media (max-width: 600px) {
				width: 100%;
			}
		}
		.mobileHide {
			@media (max-width: 600px) {
				display: none;
			}
		}
	}
	h1,
	p {
		text-align: center;
	}
</style>

<svelte:head><title>Title - TemoffyTelos</title></svelte:head>

<div class="bookContent">
	<div class="page mobileHide"></div>
	<div class="page">
		<h1>Collectanea</h1>
		<p>or; Sundry Works, Writings, and Resources</p>
		<p>by T. Telos</p>
		<p>Α☧ω</p>
	</div>
	<Pageturn direction="backward" target="/" />
	<Pageturn direction="forward" target="/early-rambles" />
</div>
