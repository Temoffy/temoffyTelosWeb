<script lang="ts">
	import Pageturn from '$lib/Pageturn.svelte';
	import { onMount } from 'svelte';

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
		gap = parseFloat(getComputedStyle(pages)?.columnGap);
		pageWidth = pages.offsetWidth;

		const observer = new ResizeObserver(() => {
			gap = parseFloat(getComputedStyle(pages)?.columnGap);
			pageWidth = pages.offsetWidth;
		});
		observer.observe(pages);

		return () => observer.disconnect();
	});
</script>

<style lang="scss">
	.margins {
		width: 100%;
		height: 100%;
		padding: 5% 10%;
		position: relative;
		box-sizing: border-box;
	}
	.book {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
	}
	.pages {
		height: 100%;
		width: 100%;
		column-count: 2;
		column-gap: 1em;
		box-sizing: border-box;
		white-space: nowrap;
		* {
			white-space: normal;
		}
	}
	h1,
	h2 {
		break-before: column;
		text-align: center;
	}
	.noBreak {
		break-inside: avoid;
	}
</style>

<svelte:head><title>Contents - TemoffyTelos</title></svelte:head>

<div class="margins">
	<div class="book">
		<div class="pages" bind:this={pages} style="transform: translateX({getOffset()}px)">
			<p>
				You've reached a very young site! Try again later maybe for updates! Setting up a
				webpage as a porfolio/project display/alternate to social apps seemed handy, may
				migrate some of my stuff here if even for my own reference
			</p>

			<p>
				I'm going to use this as a note page because I'm doing this away from my main
				workstation and want to remember some links and such, don't mind me! (this is how
				indie web is supposed to work anyhow right? link to lots of things? :P)
			</p>

			<p>
				Someone already made a great <a href="https://neocities.org">dithering tool</a>,
				and it works in Oklab!!! That makes my pet color handling project Chromaloom
				easier. If you want to see Chromaloom actually hit the web yell at me and i might
				actually get around to it
			</p>
			<p>
				stumbled across <a href="https://midnightsolarium.neocities.org/links"
					>this neocities site</a
				> while googling neocities vs nekocities, very handy stuff here.
			</p>
			<p>
				One of the things I discovered through the above is the <a
					href="https://marginalia-search.com/">marginalia search engine</a
				> which I would normally ignore, BUT I decided to test it by searching for the old 4x
				game Stars! (yes, including exclamation) and it POPPED UP IN THE SUGGESTED SEARCHES
				LIST AS "stars! autohost"!! I may not use this a lot, but for obscure or older topic
				I might bring it to bear.
			</p>

			<div class="noBreak">
				<h2>Update</h2>
				<p>
					this website is now built on sveltekit <br /> That should make it very easy to maintain
					fancier pieces!
				</p>
			</div>
			<p>
				I'm currently writing this in sveltekit with typescript and sass, deployed via <a
					href="https://github.com/Temoffy/temoffyTelosWeb">github</a
				> workflow. I think this will work great, but there's only one way to find out.
			</p>
			<p>
				Todo: See about basic telemetry about lightmode and darkmode so I know where to
				focus development. Add dark/light mode toggle? Comments/guestbook at some point.
			</p>
		</div>
	</div>
	{#if pageNum == 0}
		<Pageturn direction="backward" target="/" />
	{:else}
		<button onclick={prev} style="bottom: 0px; left: 0px; position: absolute;">←</button>
	{/if}
	{#if pageNum < getPageCount() - 1}
		<button onclick={next} style="bottom: 0px; right: 0px; position: absolute;">→</button>
	{:else}
		<Pageturn direction="forward" target="/" />
	{/if}
</div>
