// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { EnumChangefreq } from 'sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://empowerid.github.io/empowernow_info',
	base: '/empowernow_info/',
	trailingSlash: 'always',
	outDir: '../docs',
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/drafts/'),
			serialize(item) {
				return { ...item, changefreq: EnumChangefreq.WEEKLY, priority: 0.7 };
			},
		}),
	],
});
