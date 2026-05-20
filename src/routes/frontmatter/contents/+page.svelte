<script lang="ts">
	import PerPage from '$lib/PerPage.svelte';
</script>

<style lang="scss">
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		margin: 0.5em 0;
	}
	.pageNum {
		float: right;
		text-transform: none;
	}
	h2 {
		text-align: center;
	}
	* {
		text-transform: uppercase;
	}
</style>

{#snippet contents()}
	<h2>Contents</h2>
	<ol>
		<li>
			<a href="/frontmatter/dedication">Dedication</a><span class="pageNum">i</span>
		</li>
		<li>
			<a href="/frontmatter/epigraph">Epigraph</a><span class="pageNum">ii</span>
		</li>
		<li>
			<a href="/frontmatter/contents">Contents</a><span class="pageNum">iii</span>
		</li>
		<li>
			<a href="/early-rambles">Early Rambles</a><span class="pageNum">iv</span>
		</li>
	</ol>
{/snippet}
{#snippet empty()}{/snippet}

<PerPage
	bookTitle=""
	chapterTitle="Contents"
	showChapterTitle={false}
	chapterNum=""
	prevURL="/frontmatter/epigraph"
	nextURL="/early-rambles"
	pages={[empty, contents]}
/>
