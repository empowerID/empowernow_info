import type { APIContext } from 'astro';

export async function GET({ request }: APIContext) {
	const origin = new URL(request.url).origin;
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<sitemap><loc>${origin}/sitemaps/products.xml</loc></sitemap>
	<sitemap><loc>${origin}/sitemaps/solutions.xml</loc></sitemap>
	<sitemap><loc>${origin}/sitemaps/comparisons.xml</loc></sitemap>
	<sitemap><loc>${origin}/sitemaps/industries.xml</loc></sitemap>
</sitemapindex>`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
