import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import vitePageLinker from './src/preprocess/pageLinker';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit(), vitePageLinker]
});
