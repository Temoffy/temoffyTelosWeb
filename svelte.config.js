import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { remarkNoBreak } from './mdsvex/remarkNoBreak.js';
import { join } from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path_to_layout = join(__dirname, "./src/lib/AutoChapter.svelte");

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') || filename.includes('svx') ? undefined : true)
	},
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [
		mdsvex({
			extensions: ['.md', '.svx'],
			remarkPlugins: [remarkNoBreak],
			layout: {
				autochapter: path_to_layout,
				//_: "./path/to/fallback/layout.svelte"
			}
		}),
		vitePreprocess({
			style: true,      // default value
			script: false     // default value
		})
	],
	kit: { adapter: adapter({
			fallback: '404.html'
		}) },
};

export default config;
