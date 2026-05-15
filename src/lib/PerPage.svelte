<script lang="ts">
	import PageSpread from '$lib/PageSpread.svelte';

	let { pages, bookTitle, chapterTitle, showChapterTitle, prevURL, nextURL, chapterNum } =
		$props();

	let pageNum = $state(0);
	let secondPageWidth = $state(1);

	function next() {
		let pageJump = secondPageWidth == 0 ? 1 : 2;
		if (pageNum < pages.length - pageJump) pageNum += pageJump;
	}
	function prev() {
		let pageJump = secondPageWidth == 0 ? 1 : 2;
		if (pageNum >= pageJump) pageNum -= pageJump;
	}
	function hasNext() {
		return pageNum < pages.length - (secondPageWidth == 0 ? 1 : 2);
	}
	function getPageNum(pageNum: number) {
		return chapterNum ? `${chapterNum}-${pageNum}` : '';
	}
</script>

<style lang="scss">
	.bothPages {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.page {
		width: calc(50% - var(--gap) / 2);
		box-sizing: border-box;
		@media (max-width: 650px) {
			width: 100%;
		}
	}
	.mobileHide {
		@media (max-width: 650px) {
			display: none;
		}
	}
</style>

<svelte:head><title>{chapterTitle} - TemoffyTelos</title></svelte:head>

<PageSpread
	{bookTitle}
	{chapterTitle}
	{showChapterTitle}
	pageNumL={getPageNum(pageNum)}
	pageNumR={getPageNum(pageNum + 1)}
	{prevURL}
	{nextURL}
	prevClickHijack={pageNum != 0}
	prevOnclick={prev}
	nextClickHijack={hasNext()}
	nextOnclick={next}
>
	<div class="bothPages">
		<div class="page">
			{@render pages[pageNum]()}
		</div>
		<div class="page mobileHide"  bind:clientWidth={secondPageWidth}>
			{#if pageNum<pages.length-1}
				{@render pages[pageNum + 1]()}
			{/if}
		</div>
	</div>
</PageSpread>
