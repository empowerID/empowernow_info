export type AnalyticsEvent =
	| { type: 'cta_click'; label: string; page: string; position?: string }
	| { type: 'pricing_view'; page: string }
	| { type: 'contact_submit'; page: string; source?: string }
	| { type: 'doc_view'; doc: string }
	| { type: 'video_play'; title: string; page: string }
	| { type: 'faq_expand'; question: string; page: string };

export function track(ev: AnalyticsEvent) {
	try {
		(window as any).dataLayer = (window as any).dataLayer || [];
		(window as any).dataLayer.push({ event: ev.type, ...ev });
	} catch {
		/* no-op in SSR */
	}
}
