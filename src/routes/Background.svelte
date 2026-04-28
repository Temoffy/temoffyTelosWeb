<script lang="ts">
	import backgroundLight from '$lib/assets/lightmodeback.jpg?enhanced'
    import backgroundDark from '$lib/assets/darkmodeback.png?enhanced'

    import {onMount} from 'svelte';

    // Source - https://stackoverflow.com/a/60971231
    // Posted by SanBen, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-04-27, License - CC BY-SA 4.0
    const checkIsDarkModePreferred = () => window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?? false;
    let background = $state(backgroundDark);

    onMount(() => {
        background = checkIsDarkModePreferred() ? backgroundDark : backgroundLight;
    });
</script>

<style lang="scss">
	.background{
		position: fixed;
        top:-50%; bottom:-50%;
        margin:auto;
		z-index: -1;
		inset: 0;
        display: flex;
        justify-content: center;
		width: auto;
		height: 100vh;
        @media (min-aspect-ratio: 3504/4656) {
            width: 100vw; 
			height: auto; 
        }
        background: lightblue;
        @media (prefers-color-scheme: dark){
            background: darkolivegreen;
        }
	}
</style>

<enhanced:img class="background" src={background} sizes="min(3504px, 100vw)" alt='' />