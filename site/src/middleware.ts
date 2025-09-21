import type { APIContext, MiddlewareNext } from 'astro';

let redirects: Array<{ from: string; to: string }> | null = null;

async function loadRedirects() {
	if (redirects) return redirects;
	try {
		const res = await fetch('/_redirects.csv');
		const text = await res.text();
		redirects = text
			.split(/\r?\n/)
			.slice(1)
			.filter(Boolean)
			.map((line) => {
				const [from, to] = line.split(',');
				return { from: from.trim(), to: to.trim() };
			});
		return redirects;
	} catch {
		redirects = [];
		return redirects;
	}
}

export async function onRequest({ request, locals }, next: MiddlewareNext) {
	// staging/preview noindex header
	if (process.env.NODE_ENV !== 'production') {
		locals.headers = new Headers(locals.headers || {});
		locals.headers.set('x-robots-tag', 'noindex');
	}
	// simple CSV-based redirects
	const list = await loadRedirects();
	const url = new URL(request.url);
	const match = list.find((r) => url.pathname === r.from || url.pathname === r.from.replace(/\/$/, ''));
	if (match) {
		return new Response(null, { status: 301, headers: { Location: match.to } });
	}
	return next();
}
