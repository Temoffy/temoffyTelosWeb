<script lang="ts">
	import PageSpread from '$lib/PageSpread.svelte';
	import { onMount } from 'svelte';
	import './AutoChapter.sass';

	let {children, bookTitle, chapterTitle, prevURL, nextURL, chapterNum} = $props();

	let pageNum = $state(0);
	let pages: HTMLElement;
	let gap = $state(0);
	let pageWidth = $state(0);

	function getPageCount() {
		return Math.ceil((pages?.scrollWidth + gap) / (pageWidth + gap)) || 0;
	}
	function getOffset() {
		return -(pageWidth + gap) * pageNum;
	}

	function next() {
		if (pageNum < getPageCount() - 1) pageNum++;
	}
	function prev() {
		if (pageNum > 0) pageNum--;
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
		column-gap: var(--gap);
		box-sizing: border-box;
		white-space: nowrap;
		@media (max-width: 600px) {
			column-count: 1;
		}
	}
</style>

<svelte:head><title>{chapterTitle} - TemoffyTelos</title></svelte:head>

<PageSpread
	bookTitle={bookTitle}
	chapterTitle={chapterTitle}
	pageNumL="{chapterNum}-{pageNum * 2 + 1}"
	pageNumR="{chapterNum}-{pageNum * 2 + 2}"
	prevURL={prevURL}
	nextURL={nextURL}
	prevClickHijack={pageNum != 0}
	prevOnclick={prev}
	nextClickHijack={pageNum < getPageCount() - 1}
	nextOnclick={next}
>
	<div class="pages" bind:this={pages} style="transform: translateX({getOffset()}px)">
		{@render children()}
	</div>
</PageSpread>
