import type { APIContext } from 'astro';

function toRoutePath(filePath: string): string {
	const normalized = filePath.replace(/\\/g, '/');
	const withoutSrc = normalized.replace(/^.*\/src\/pages\//, '/');
	const withoutExt = withoutSrc.replace(/\.(astro|md|mdx)$/i, '');
	const route = withoutExt.endsWith('/index') ? withoutExt.replace(/\/index$/, '/') : `${withoutExt}/`;
	return route;
}

const files = Object.keys(import.meta.glob('/src/pages/comparisons/**/*.{astro,md,mdx}', { eager: true }));
const paths = Array.from(new Set(files.map(toRoutePath)));

export async function GET({ request }: APIContext) {
	const origin = new URL(request.url).origin;
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(p => `  <url><loc>${origin}${p}</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`).join('\n')}
</urlset>`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
