import type { APIContext } from 'astro';

const paths = [
	'/solutions/',
	'/solutions/zero-token-spas/',
];

export async function GET({ request }: APIContext) {
	const origin = new URL(request.url).origin;
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(p => `  <url><loc>${origin}${p}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`).join('\n')}
</urlset>`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
