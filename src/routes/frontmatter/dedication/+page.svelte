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
		height: 110%;
	}
	.space {
		padding: 0.5em 0 0 0;
	}
	.dedication {
		text-indent: 0;
		margin: 0px;
		hyphens: auto;
		text-align: center;
	}
	* {
		white-space: normal;
	}
</style>

{#snippet publishing()}
	<div class="distribute">
		<div>
			<span class="smallcaps">Collectanea or Sundry Works, Writings, and Resources.</span> Copyright
			© 2026, Temoffy Telos.
		</div>
		<div class="space">
			Some rights reserved. This work is licensed under CC BY-NC 4.0. To view a copy of
			this license, visit creativecommons.org/licenses/by-nc/4.0
		</div>
		<div></div>
		<div class="centerAlign space">
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
{#snippet dedication()}
	<div class="center">
		<p class="dedication">
			For all the help, guidance, and support I've been blessed with. Thank you Pop, Mom,
			family, and friends; you've shaped who I am. And thank you Stack Overflow, and
			myriad helpful forums and blogs; I couldn't have debugged without you.
		</p>
	</div>
{/snippet}

<PerPage
	bookTitle=""
	chapterTitle="Dedication and Publishing"
	showChapterTitle={false}
	chapterNum=""
	prevURL="/"
	nextURL="/frontmatter/epigraph"
	pages={[publishing, dedication]}
/>
