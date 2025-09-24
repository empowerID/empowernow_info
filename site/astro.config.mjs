// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.empowernow.ai',
	base: '/',
	trailingSlash: 'always',
	outDir: '../docs',
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/drafts/'),
			serialize(item) {
				return { ...item, changefreq: 'weekly', priority: 0.7 };
			},
		}),
	],
});
