// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://empowerid.github.io/empowernow_info',
	trailingSlash: 'always',
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
