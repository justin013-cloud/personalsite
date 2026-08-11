// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://justindsims.com',
	integrations: [sitemap()],
	fonts: [
		{
			// Display face — headlines, wordmark, section labels. Matches the
			// bold gothic used on Justin's resume.
			// Astro downloads and self-hosts this at build time, so there is no
			// runtime request to Google and nothing to configure on Netlify.
			provider: fontProviders.google(),
			name: 'Science Gothic',
			cssVariable: '--font-display',
			fallbacks: ['Impact', 'system-ui', 'sans-serif'],
			weights: [700],
			styles: ['normal'],
			subsets: ['latin'],
		},
		{
			// Body face — everything that isn't a headline.
			provider: fontProviders.google(),
			name: 'Roboto',
			cssVariable: '--font-body',
			fallbacks: ['system-ui', 'sans-serif'],
			weights: [400, 700],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
		},
	],
});
