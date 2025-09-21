import type { APIContext } from 'astro';

export async function GET({ params, request }: APIContext) {
	const title = decodeURIComponent(params.text || 'EmpowerNow');
	const width = 1200;
	const height = 630;
	const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%" stop-color="#00E7F6"/>
			<stop offset="100%" stop-color="#6C4CFF"/>
		</linearGradient>
	</defs>
	<rect width="100%" height="100%" fill="#0B1C3D"/>
	<circle cx="960" cy="-120" r="420" fill="url(#g)" opacity="0.18"/>
	<text x="60" y="360" fill="#FFFFFF" font-family="Inter, -apple-system, sans-serif" font-size="72" font-weight="700">${escapeXml(title)}</text>
	<text x="60" y="420" fill="#9ba3b7" font-family="Inter, -apple-system, sans-serif" font-size="28">EmpowerNow — Identity & Authorization Fabric</text>
</svg>`;
	return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}

function escapeXml(s: string): string {
	return s.replace(/[&<>"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'} as any)[c]);
}
