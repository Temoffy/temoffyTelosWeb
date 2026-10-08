<script lang="ts">
	import PageSpread from '$lib/PageSpread.svelte';
	import { onMount } from 'svelte';
	import './AutoChapter.sass';

	let { children, bookTitle, chapterTitle, prevURL, nextURL, chapterNum } = $props();

	let spreadNum = $state(0);
	let pages: HTMLElement;
	let gap = $state(0);
	let pageWidth = $state(0);

	function getPageCount() {
		return Math.ceil((pages?.scrollWidth + gap) / (pageWidth + gap)) || 0;
	}
	function getOffset() {
		return -(pageWidth + gap) * spreadNum;
	}

	function next() {
		if (spreadNum < getPageCount() - 1) spreadNum++;
	}
	function prev() {
		if (spreadNum > 0) spreadNum--;
	}

	onMount(() => {
		gap = (parseFloat(getComputedStyle(pages)?.columnGap) * pages.offsetWidth) / 100;
		pageWidth = pages.offsetWidth;

		const observer = new ResizeObserver(() => {
			// ONLY WORKS IF GAP DEFINED AS PERCENT!!
			gap = (parseFloat(getComputedStyle(pages)?.columnGap) * pages.offsetWidth) / 100;
			pageWidth = pages.offsetWidth;
		});
		observer.observe(pages);

		return () => observer.disconnect();
	});
</script>

<style lang="scss">
	.pages {
		height: 100%;
		width: 100%;
		column-count: 2;
		column-fill: auto;
		column-gap: var(--gap);
		box-sizing: border-box;
		white-space: nowrap;
		@media (max-width: 650px) {
			column-count: 1;
		}
	}
	.cutoff {
		overflow: hidden;
		height: 100%;
		width: 100%;
	}
</style>

<svelte:head><title>{chapterTitle} - TemoffyTelos</title></svelte:head>

<PageSpread
	{bookTitle}
	{chapterTitle}
	pageNumL="{chapterNum}-{spreadNum * 2 + 1}"
	pageNumR="{chapterNum}-{spreadNum * 2 + 2}"
	{prevURL}
	{nextURL}
	prevClickHijack={spreadNum != 0}
	prevOnclick={prev}
	nextClickHijack={spreadNum < getPageCount() - 1}
	nextOnclick={next}
>
	<div class="cutoff">
		<div class="pages" bind:this={pages} style="transform: translateX({getOffset()}px)">
			{@render children()}
		</div>
	</div>
</PageSpread>
