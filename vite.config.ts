import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import vitePageLinker from './src/preprocess/pageLinker';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit(), vitePageLinker]
});
