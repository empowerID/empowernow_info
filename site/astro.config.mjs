// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { EnumChangefreq } from 'sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://empowernow.ai',
	base: '/',
	trailingSlash: 'always',
	outDir: '../docs',
	integrations: [
		react(),
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/drafts/'),
			serialize(item) {
				return { ...item, changefreq: EnumChangefreq.WEEKLY, priority: 0.7 };
			},
		}),
	],
});
