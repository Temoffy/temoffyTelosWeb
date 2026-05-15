<script lang="ts">
	import PerPage from '$lib/PerPage.svelte';
</script>

<style lang="scss">
	.smallcaps {
		font-family: 'IM Fell English SC', 'IM Fell English', serif;
	}
	.center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	.centerAlign {
		text-align: center;
	}
	.distribute {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
	.epigraph {
		text-indent: 0;
		margin: 0px;
		hyphens: auto;
		text-align: center;
	}
	.epigraphSignature {
		text-align: right;
		font-size:medium;
		margin: .5em 0 0 0;
		font-family: 'IM Fell English SC', 'IM Fell English', serif;
	}
	*{
		white-space: normal;
	}
</style>

{#snippet publishing()}
	<div class = 'distribute'>
		<div>
			<span class="smallcaps">Collectanea or Sundry Works, Writings, and Resources.</span> Copyright © 2026, Temoffy Telos.
		</div>
		<div>
			Some rights reserved. This work is licensed under CC BY-NC 4.0. To view a copy of this license, visit creativecommons.org/licenses/by-nc/4.0
		</div>
		<div></div>
		<div class="centerAlign">
			Printed in the United States of America.
			<br />
			First Edition, 2026.
		</div>
		<div class="centerAlign">
			𐡷Α⳩ω𐡸 <br />
			𐫱
		</div>
			
	</div>
{/snippet}
{#snippet epigraph()}
	<div class="center">
		<p class="epigraph"><i>
			He had a number of pictures on hand; most of them were too large and ambitious for his
			skill. He was the sort of painter who can paint leaves better than trees. He used to
			spend a long time on a single leaf, trying to catch its shape, and its sheen, and the
			glistening of dewdrops on its edges. Yet he wanted to paint a whole tree, with all of
			its leaves in the same style, and all of them different.
		</i></p>
		<p class="epigraphSignature">"Leaf by Niggle" JRR Tolkien</p>
	</div>
{/snippet}

<PerPage
	bookTitle=""
	chapterTitle="Epigraph"
	showChapterTitle={false}
	chapterNum=""
	prevURL="/"
	nextURL="/early-rambles"
	pages={[publishing, epigraph]}
/>
