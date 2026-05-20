<script lang="ts">
	import PerPage from '$lib/PerPage.svelte';
</script>

<style lang="scss">
	.center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
		font-size: medium;
		margin: 0.5em 0 0 0;
		font-family: 'IM Fell English SC', 'IM Fell English', serif;
	}
	* {
		white-space: normal;
	}
</style>

{#snippet empty()}{/snippet}
{#snippet epigraph()}
	<div class="center">
		<p class="epigraph">
			<i>
				He had a number of pictures on hand; most of them were too large and ambitious for
				his skill. He was the sort of painter who can paint leaves better than trees. He
				used to spend a long time on a single leaf, trying to catch its shape, and its
				sheen, and the glistening of dewdrops on its edges. Yet he wanted to paint a whole
				tree, with all of its leaves in the same style, and all of them different.
			</i>
		</p>
		<p class="epigraphSignature">"Leaf by Niggle" JRR Tolkien</p>
	</div>
{/snippet}

<PerPage
	bookTitle=""
	chapterTitle="Epigraph"
	showChapterTitle={false}
	chapterNum=""
	prevURL="/frontmatter/dedication"
	nextURL="/frontmatter/contents"
	pages={[empty, epigraph]}
/>
