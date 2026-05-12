<script lang="ts">
	import AutoChapter from '$lib/AutoChapter.svelte';
</script>

<AutoChapter bookTitle="Collectanea" chapterTitle="Early Rambles" chapterNum="iii" prevURL="/" nextURL="/">
	<div class="noBreak">
		<h2>Early Rambles</h2>
		<p>
			You've reached a very young site! Try again later maybe for updates! Setting up a
			webpage as a porfolio/project display/alternate to social apps seemed handy, may
			migrate some of my stuff here if even for my own reference
		</p>
	</div>

	<p>
		I'm going to use this as a note page because I'm doing this away from my main
		workstation and want to remember some links and such, don't mind me! (this is how
		indie web is supposed to work anyhow right? link to lots of things? :P)
	</p>

	<p>
		Someone already made a great <a href="https://neocities.org">dithering tool</a>, and
		it works in Oklab!!! That makes my pet color handling project Chromaloom easier. If
		you want to see Chromaloom actually hit the web yell at me and i might actually get
		around to it
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
		game Stars! (yes, including exclamation) and it POPPED UP IN THE SUGGESTED SEARCHES LIST
		AS "stars! autohost"!! I may not use this a lot, but for obscure or older topic I might
		bring it to bear.
	</p>

	<div class="noBreak">
		<h2>Update</h2>
		<p>
			This website is now built on sveltekit. That should make it very easy to maintain
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
</AutoChapter>
