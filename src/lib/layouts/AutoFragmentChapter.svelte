<!-- variant of AutoChapter -->
<!-- coallates any entries in the /lib/fragmentRoutes folder that corresponds to the current route -->
<!-- REQUIRES MATCHING +page.js SCRIPT THAT CALLS AutoFragment.js TO WORK -->
<script lang="ts">
	import AutoChapter from './AutoChapter.svelte';
	import { page } from '$app/state';
	const route = page.route;

	let { children, bookTitle, chapterTitle, prevURL, nextURL, chapterNum } = $props();
	//const fragRoute = '$lib/fragmentRoutes' + (page.route.id ?? '');
	const modules = import.meta.glob('$lib/fragmentRoutes/**/*.svx');
	const prefix = `fragmentRoutes${route.id}/`;
	const matches = Object.entries(modules).filter(([path]) => path.includes(prefix));
	const fragsPromise = Promise.all(
		matches.map(([, resolve]) => resolve().then((mod) => mod.default))
	);
</script>

<AutoChapter {bookTitle} {chapterTitle} {prevURL} {nextURL} {chapterNum}>
	{@render children()}
	{#await fragsPromise then frags}
		{#each frags as Frag (Frag)}
			<Frag />
		{/each}
	{/await}
</AutoChapter>
