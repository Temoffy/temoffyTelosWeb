<script lang="ts">
	import Pageturn from '$lib/Pageturn.svelte';

	let {
		children,
		showNext = true,
		showPrev = true,
		nextURL = '/',
		prevURL = '/',
		prevClickHijack = false,
		prevOnclick = () => {},
		nextClickHijack = false,
		nextOnclick = () => {},
		pageNumL = '',
		pageNumR = '',
		bookTitle = '',
		chapterTitle = ''
	} = $props();

	//defaults for all pages, do not diverge without VERY good reason.
	const gapPercent = 10;
	const topPad = 10;
	const bottomPad = 20;
	const outerPad = 11;

	let centerPercent = (100 - gapPercent - outerPad * 2) / 4 + outerPad;
</script>

<style lang="scss">
	.margins {
		width: 100%;
		height: 100%;
		padding: calc(var(--topPad) * 1) var(--outerPad) var(--bottomPad) var(--outerPad);
		position: relative;
		box-sizing: border-box;
	}
	article {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
	}
	.left,
	.right {
		position: absolute;
		display: block;
		text-align: center;
	}
	.left {
		left: var(--pageCenter);
		&.header {
			transform: translateX(-50%) translateY(-50%);
		}
		&.pageNum {
			transform: translateX(-50%) translateY(50%);
		}
	}
	.right {
		right: var(--pageCenter);
		&.header {
			transform: translateX(50%) translateY(-50%);
		}
		&.pageNum {
			transform: translateX(50%) translateY(50%);
		}
	}
	.header {
		top: calc(var(--topPad) * 2 / 3);
	}
	.pageNum {
		bottom: calc(var(--bottomPad) * 2 / 3);
	}
	h5,
	h6 {
		text-transform: lowercase;
		font-family: 'IM Fell English SC', 'IM Fell English', serif;
		letter-spacing: 2px;
		margin: 0.0em 0 0 0;
	}
</style>

<div
	class="margins"
	style="--gap: {gapPercent}%; --pageCenter: {centerPercent}%; --topPad: {topPad}cqh; --bottomPad: {bottomPad}cqh; --outerPad: {outerPad}cqw;"
>
	<h5 class="left header">{bookTitle}</h5>
	<h5 class="right header">{chapterTitle}</h5>

	<article>
		{@render children()}
	</article>

	<h5 class="left pageNum">{pageNumL}</h5>
	<h5 class="right pageNum">{pageNumR}</h5>

	{#if showPrev}
		<Pageturn
			direction="backward"
			target={prevURL}
			hijack={prevClickHijack}
			onclick={prevOnclick}
		/>
	{/if}
	{#if showNext}
		<Pageturn
			direction="forward"
			target={nextURL}
			hijack={nextClickHijack}
			onclick={nextOnclick}
		/>
	{/if}
</div>
