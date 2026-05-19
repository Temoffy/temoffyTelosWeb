<script lang="ts">
	import PageSpread from '$lib/PageSpread.svelte';
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
		@media (max-width: 650px) {
			justify-content: space-around;
		}
		.page {
			width: 49%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			@media (max-width: 650px) {
				width: 100%;
			}
			.third {
				height: 33%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
		.mobileHide {
			@media (max-width: 650px) {
				display: none;
			}
		}
	}
	h1,
	p {
		text-align: center;
		margin: 0;
	}
</style>

<svelte:head><title>Title - TemoffyTelos</title></svelte:head>

<PageSpread showPrev={false} nextURL="/frontmatter/dedication">
	<div class="bookContent">
		<div class="page mobileHide"></div>
		<div class="page">
			<div class="third">
				<h1>Collectanea</h1>
				<p><i>or Sundry Works, Writings, and Resources</i></p>
			</div>
			<div class="third"></div>
			<div class="third">
				<p>by T. Telos</p>
				<p>Α ☧ ω</p>
			</div>
		</div>
	</div>
</PageSpread>
