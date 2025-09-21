# EmpowerNow Marketing Site Authoring Guide (Astro)

This guide explains how our Astro site is structured and how to add or update content with production‑quality SEO, analytics, and NeonFlux design.

## 1) Project layout
- `src/layouts/`
  - `Base.astro`: global `<head>`, nav, footer, consent + analytics click handler
  - `Product.astro`: product marketing layout (front‑matter props below)
  - `Solution.astro`: outcome/solution layout (front‑matter props below)
  - `Primer.astro`: standards primers (optional; follows same patterns)
- `src/components/`: reusable UI (LogoWall, PricingCTA, CrossSiteLinks, RelatedContent, JSON‑LD components, etc.)
- `src/pages/`: route‑based pages (Astro). Key folders:
  - `products/`: one file per product (e.g., `aria-shield.astro`)
  - `solutions/`: one file per solution (`zero-token-spas.astro`, …)
  - `comparisons/`: programmatic competitor comparisons (`[competitor].astro`)
  - `industries/`: programmatic industry pages (`[industry].astro`)
  - `search/`: Pagefind client search
  - `sitemap*.ts`: dynamic sitemaps per type
- `src/lib/`:
  - `url.ts`: slug/canonical helpers
  - `analytics.ts`: event taxonomy (client‑side, consent‑gated)
  - `experiments.ts`: simple deterministic A/B helper
  - `keywords.ts`: keyword→related link map
- `public/`: static assets

## 2) Content types and required props
Use layouts to ensure consistency and SEO.

### Product pages (`Product.astro`)
Provide these props in the page file (top of the component):
- `title` (string): HTML/OG title
- `description` (string): meta description
- `canonical` (string): canonical path (with trailing slash)
- `headline` (string): H1
- Optional: `subhead` (string), `keyBenefits` (string[]), `targetICP` (string[])
- Optional: `primaryCTA`, `secondaryCTA` ({ label, href })
- Optional: `jsonLdProduct` (object) → passed to `<JsonLd />`
- Optional: `docsLinks`, `wwwLinks` (Link[]) → auto renders CrossSiteLinks
- Optional: `keywords` (string[]) → powers RelatedContent via `keywords.ts`
Slots (named): `how`, `proof`, `related`

SEO/Schema:
- Product pages auto render Breadcrumbs JSON‑LD
- Include `jsonLdProduct` with name/brand/url/description

Analytics/UX:
- CTAs are annotated with `data-ev` and consent‑gated tracking is handled in `Base.astro`
- Experiments: use `getVariant('key', Astro.url.pathname)` and vary CTA labels, etc.

### Solution pages (`Solution.astro`)
Required props: `title`, `description`, `canonical`, `headline`
Optional: `outcomes` (string[]), `faq` ({q,a}[]), `primaryCTA`, `secondaryCTA`, `docsLinks`, `wwwLinks`, `keywords`
Slots: `how`, `standards`, `related`

SEO/Schema:
- FAQ JSON‑LD auto generated when `faq` is provided
- Breadcrumbs JSON‑LD is auto rendered

### Programmatic pages
- `comparisons/[competitor].astro`: fills a table + JSON‑LD (Article) and breadcrumbs
- `industries/[industry].astro`: headline, outcomes, and cross‑links

## 3) Where new content belongs
- New product feature or service → `src/pages/products/<slug>.astro` using `Product.astro`
- New solution/outcome narrative → `src/pages/solutions/<slug>.astro` using `Solution.astro`
- Competitive take/compare → `src/pages/comparisons/[competitor].astro`
- Industry‑specific messaging → `src/pages/industries/[industry].astro`
- Standards primer → `Primer.astro` (or keep on www `resources/standards` hub if HTML)

Decision rules (updates vs new page):
- Update existing page if the content is the same product/solution and expands clarity, capabilities, or links.
- Create a new page if the audience, intent, or URL taxonomy changes (e.g., a distinct solution outcome, a new service, or a new competitor/industry).
- Keep URLs short, lowercase, hyphenated; end with trailing slash. Update sitemaps happen automatically via dynamic sitemap handlers.

## 4) NeonFlux styling
- Use layout defaults and utilities in `src/styles/tokens.css` and `src/styles/utilities.css`
- Prefer `.glass-card`, `.btn`, `.btn-primary`, `.grid-3`, `.container`
- Avoid inline colors; when needed use `color:#9ba3b7` for secondary text

## 5) SEO and structured data
- Always set `title`, `description`, and `canonical`
- Product pages: include JSON‑LD Product via `<JsonLd data={jsonLdProduct} />`
- FAQ: supply `faq` to `Solution.astro` to auto render FAQPage JSON‑LD
- Breadcrumbs JSON‑LD is added by layouts
- Sitemaps are dynamic: products, solutions, comparisons, industries

## 6) Analytics & consent
- Events: add `data-ev`, `data-label`, `data-position` to interactive elements; the global handler in `Base.astro` sends events only after consent
- Consent banner: built‑in; users can Allow/Decline; state in `localStorage`
- For server‑side tagging, wire your provider to consume `window.dataLayer`

## 7) Search
- Pagefind runs postbuild: `pagefind --site dist`
- Search UI is at `/search/`; uses local `/pagefind/pagefind.js`

## 8) Creating a new page (checklist)
1. Choose layout (`Product.astro` or `Solution.astro`)
2. Fill required props: `title`, `description`, `canonical`, `headline`
3. Add `docsLinks` and `wwwLinks` for cross‑site discoverability
4. Add `keywords` for `RelatedContent`
5. Add `keyBenefits` or `outcomes` and slots (`how`, `proof`, etc.)
6. For product: include `jsonLdProduct`
7. Ensure CTAs include `data-ev` attributes for analytics
8. Verify build: `npm run build` (CI also runs Lighthouse + Pa11y)

## 9) Editing existing content
- Update the page file in `src/pages/...`
- Keep canonical URL stable unless the taxonomy truly changes; if changing, add a redirect row in `src/pages/_redirects.csv` (`from,to,code`)
- Validate links; use CrossSiteLinks to ensure docs/www bi‑directional navigation

## 10) CI and quality gates
- On PRs/commits, GitHub Actions build the site, run Lighthouse (with budgets) and Pa11y a11y checks
- Staging/preview get `X-Robots-Tag: noindex` via middleware

## 11) For AI contributors (Cursor)
- Determine target layout: product vs solution vs comparison vs industry
- If content matches an existing page’s purpose, edit that page; otherwise create a new page with a new slug
- Always set `title`, `description`, `canonical`; add JSON‑LD where applicable
- Add cross‑links: set `docsLinks`, `wwwLinks`, and `keywords`
- Keep NeonFlux classes and avoid introducing one‑off inline styles
- After changes: add to git, commit with a clear message, and push

## 12) Commands
- Dev: `npm run dev`
- Build: `npm run build` (then Pagefind runs via `postbuild`)
- Preview: `npm run preview`

Appendix: Front‑matter examples live in `src/pages/products/aria-shield.astro` and `src/pages/solutions/zero-token-spas.astro`.
