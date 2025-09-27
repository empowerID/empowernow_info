import { a as createComponent, c as createAstro, m as maybeRenderHead, r as renderTemplate } from './astro/server_Kv8UWHwR.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro("https://empowerid.github.io/empowernow_info");
const $$HeroComposite = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeroComposite;
  Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="composite vignette" aria-hidden="true" data-astro-cid-srhfr7sd> <div class="panel" data-astro-cid-srhfr7sd> <div class="title" data-astro-cid-srhfr7sd>AuthZEN Decision</div> <pre data-astro-cid-srhfr7sd>${`{
  "decision": "Permit",
  "constraints": [{ "id": "stream_tokens_max", "value": 2048 }],
  "obligations": [{ "id": "budget_hold", "call_id": "abc-123" }],
  "ttl_ms": 5000
}`}</pre> </div> <div class="arrow" data-astro-cid-srhfr7sd>→</div> <div class="panel" data-astro-cid-srhfr7sd> <div class="title" data-astro-cid-srhfr7sd>HTTP 402 (budget)</div> <pre data-astro-cid-srhfr7sd>${`HTTP/1.1 402 Payment Required
{
  "error": "budget_exceeded",
  "call_id": "abc-123"
}`}</pre> </div> <div class="arrow" data-astro-cid-srhfr7sd>→</div> <div class="panel" data-astro-cid-srhfr7sd> <div class="title" data-astro-cid-srhfr7sd>Receipt</div> <pre data-astro-cid-srhfr7sd>${`{
  "receipt_id": "r-001",
  "call_id": "abc-123",
  "hash": "...",
  "ts": "2025-09-27T12:00:00Z"
}`}</pre> </div> </div> `;
}, "C:/source/repos/empowernow_info/site/src/components/HeroComposite.astro", void 0);

export { $$HeroComposite as default };
