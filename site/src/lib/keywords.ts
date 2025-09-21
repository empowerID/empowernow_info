export type RelatedLink = { label: string; href: string };

const map: Record<string, RelatedLink[]> = {
	"bff": [
		{ label: "BFF Overview", href: "https://empowerid.github.io/empowernow_docs/docs/services/bff/explanation/overview/" }
	],
	"mcp": [
		{ label: "MCP Primer", href: "/resources/standards/mcp/" }
	],
	"authzen": [
		{ label: "PDP Reference", href: "https://empowerid.github.io/empowernow_docs/docs/services/pdp/" }
	]
};

export function relatedFor(keywords: string[]): RelatedLink[] {
	const set = new Map<string, RelatedLink>();
	for (const k of keywords) {
		const items = map[k.toLowerCase()];
		if (!items) continue;
		for (const it of items) set.set(it.href, it);
	}
	return Array.from(set.values());
}
