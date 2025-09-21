import type { APIContext } from 'astro';

export function getStaticPaths() { return []; }

// Existing dynamic OG endpoint implementation remains below (not used in static build)
export async function GET({ params }) {
	const text = params?.text || 'EmpowerNow';
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="100%" height="100%" fill="#0B1C3D"/><text x="60" y="330" font-size="96" fill="#00E7F6" font-family="Inter, Arial, sans-serif">${text}</text></svg>`;
	return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}

function escapeXml(s: string): string {
	return s.replace(/[&<>"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'} as any)[c]);
}
