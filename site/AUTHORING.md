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

### Hero Component (`Hero.astro`)
The `Hero.astro` component provides a unified, flexible hero header system across all pages. It supports illustrations, videos, chips, CTAs, and custom content via slots.

**Required props:**
- `headline` (string): Main H1 text

**Optional props:**
- `layout` ('split' | 'single' | 'grid' | 'custom'): Hero layout style (default: 'split')
- `background` (string): Path to background image (relative to BASE_URL)
- `eyebrow` (string): Small text label above headline
- `subhead` (string): Larger descriptive text below headline
- `body` (string): Body paragraph text (alternative to subhead)
- `illustration` (string): Path to illustration (relative to BASE_URL)
- `illustrationAlt` (string): Alt text for illustration
- `illustrationWidth` (number): Illustration width in pixels
- `illustrationHeight` (number): Illustration height in pixels
- `chips` (string[]): Array of chip labels to display
- `chipStyle` ('outline-cyan' | 'outline-violet' | 'solid'): Chip visual style
- `primaryCTA`, `secondaryCTA`, `tertiaryCTA` ({ label, href }): Call-to-action buttons
- `showAAIcon` (boolean): Display AA compliance icon (default: true)
- `containerClass` (string): Additional classes for container
- `contentClass` (string): Additional classes for content area

**Slots (all optional):**
- `default`: Replaces all hero content (full custom hero)
- `content`: Replaces text content only (headline, subhead, chips)
- `visual`: Replaces illustration/video
- `actions`: Replaces CTAs
- `extra`: Additional content after actions

**Examples:**

Simple hero with props:
```astro
<Hero
  headline="Create. Control. Prove."
  body="Turn any API into a <strong>secure agent tool</strong>."
  illustration="images/hero-example.png"
  illustrationAlt="Example illustration"
  primaryCTA={{ label: "Get Started", href: "/demo/" }}
/>
```

Hero with custom actions:
```astro
<Hero headline="Products" body="Build once, deploy everywhere.">
  <div slot="actions" class="hero__actions">
    <a class="btn btn-primary" href="/products/">View Products</a>
    <a class="btn btn-ghost" href="/docs/">Documentation</a>
  </div>
</Hero>
```

Hero with chips:
```astro
<Hero
  headline="Solutions"
  chips={['Budget Control', 'Policy Enforcement', 'Audit Receipts']}
  chipStyle="outline-cyan"
/>
```

**Typography sizing:**
- Headlines and subheads are 25% smaller than the original Product hero design
- Responsive sizing via CSS clamp (scales between mobile and desktop)
- All sizing is controlled by CSS classes in `custom-styles.css`

**Layouts:**
- `split`: Two-column with content on left, visual on right (default, stacks on mobile)
- `single`: Full-width content only
- `grid`: 5fr/7fr grid layout (used by Landing pages)
- `custom`: Minimal wrapper for fully custom heroes

**CSS Classes:**
All hero styling uses unified CSS classes in `custom-styles.css`:
- `.hero-plate`: Full-bleed background wrapper
- `.hero-container`: Content wrapper with padding
- `.hero-layout--split`, `.hero-layout--grid`: Layout variants
- `.hero__content`: Left content area
- `.hero__visual`: Right visual area (illustration/video)
- `.hero__headline`, `.hero__subhead`, `.hero__body`: Typography
- `.hero__eyebrow`: Small label text
- `.hero__actions`: CTA button container
- `.hero__chips`: Chip container
- `.hero__aa-icon`: AA compliance icon with tooltip

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
- For homepage/hero, wrap with `.hero-ambient` to add subtle layered gradients.
- Use `.section-divider` between major sections to create rhythm without heavy borders.
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

## 25) Web developer workflow (branches, PRs, local QA)
- Branch naming: `feat/<area>-<slug>`, `fix/<area>-<slug>`, `docs/<area>-<slug>`
- Commit format: `<scope>: <concise change>` (e.g., `site: add Spend Governance solution page`)
- PR checklist:
  - Build passes locally (`npm ci && npm run build`) and preview works (`npm run preview`)
  - Lighthouse local run ≥ budgets; Pa11y threshold not exceeded
  - Links resolve; no `.md` links; trailing slashes
  - Sitemaps include new pages (handlers are dynamic)
  - Redirects added if URLs changed (`src/pages/_redirects.csv`)
  - JSON‑LD present as applicable (Product, FAQ, Breadcrumbs, Article/HowTo/Video)
- Local commands:
  - Serve dist for audits: `npx http-server dist -p 4321`
  - Lighthouse: `npx lhci autorun --collect.url=http://localhost:4321/`
  - Pa11y: `npx pa11y http://localhost:4321/ --threshold 5`

## 26) Coding standards (Astro/TS/a11y)
- TypeScript/Astro
  - Prefer explicit props interfaces; meaningful names
  - Single responsibility per component; compose small parts
  - Avoid inline JS for complex logic—extract to `src/lib/*`
- Formatting
  - Keep lines readable; break long attribute lines
  - Consistent attribute order: class, href/src, aria‑*, data‑*, style
- Accessibility
  - One `<h1>` per page; logical heading order
  - `alt` text is mandatory and descriptive
  - Buttons vs links: actions use `<button>`, navigation uses `<a>`
  - Focus states remain visible; don’t disable outlines

## 27) Assets and images
- Store public assets under `public/` when shared; page‑local assets can live adjacent to pages
- Formats: SVG for logos/icons; PNG or optimized JPEG/WebP for photos
- Size caps: keep inline images < 200 KB; prefer `ResponsiveImg.astro`
- Favicon/OG updates: update `public/favicon.svg` and use `/og/[text].svg`

## 28) Environments and redirects
- Preview/stage: use `npm run preview`; staging gets `X‑Robots‑Tag: noindex` via middleware
- Redirect process: create or update rows in `src/pages/_redirects.csv` and test locally

## 29) Error playbook
- Pagefind search returns no results
  - Ensure `npm run build` ran and `postbuild` generated the index; verify `/pagefind/pagefind.js` in dist
- Sitemap empty for a section
  - Confirm files exist and globs in `src/pages/sitemaps/*.ts` match (`**/*.{astro,md,mdx}`)
- 404 on internal links
  - Add missing trailing slash; ensure path is under `src/pages/`; no `.md` in URLs
- Build fails
  - Check TypeScript imports/paths, missing props in layout usage, or stray JSX syntax

## 30) Marketing assistant workflow
- Content brief template
  - Audience: …
  - Outcome/value: …
  - Proof/evidence (data, receipts, quotes): …
  - Primary CTA / Secondary CTA: …
  - Target keywords (2–4) + internal links to include: …
- Voice and style guardrails
  - Headline: outcome‑led, ≤ 9 words; Subhead: how it works in one line
  - Use short paragraphs and 2–4 bullet lists; avoid buzzwords; prefer concrete benefits
- CTA rules
  - Primary CTA is action verb + outcome (e.g., “Book demo”); Secondary is “Read docs”/“See deep dives”
  - Add `data-ev`, `data-label`, `data-position` via layout props
- SEO workflow
  - Put primary keyword in `title`, H1, first paragraph; link to 2+ internal relevant pages
  - Choose schema: Product for product pages, FAQ on Q&A, Article/TechArticle for educational pieces
- Images and OG
  - Provide alt text and, if social share expected, specify OG text for `/og/[text].svg`
- Approval flow
  - SME review (factual), Marketing review (voice/SEO), Dev review (structure/links), then merge

## 31) Page scaffolds (copy/paste and fill)

Minimal Product page
```astro
---
import Base from '../../layouts/Base.astro';
import Product from '../../layouts/Product.astro';
import JsonLd from '../../components/JsonLd.astro';
const title = 'Product — One‑liner';
const description = 'Short meta description.';
const canonical = '/products/product-slug/';
const jsonLdProduct = {"@context":"https://schema.org","@type":"Product","name":"Product","brand":{"@type":"Brand","name":"EmpowerNow"},"description":description,"url":new URL(canonical, Astro.site)};
---
<Base title={title} description={description} canonical={canonical}>
	<JsonLd data={jsonLdProduct} />
	<Product title={title} description={description} canonical={canonical} headline="Outcome headline" subhead="How we do it in one line" keyBenefits={[ 'Benefit 1','Benefit 2','Benefit 3' ]} primaryCTA={{ label: 'Book demo', href: '/demo/' }} secondaryCTA={{ label: 'Read docs', href: 'https://empowerid.github.io/empowernow_docs/docs/.../' }} docsLinks={[ { href: 'https://empowerid.github.io/empowernow_docs/docs/.../', label: 'Docs' } ]} wwwLinks={[ { href: '/solutions/.../', label: 'Related solution' } ]} keywords={[ 'keyword1','keyword2' }}>
		<fragment slot="how">
			<section class="container" style="padding:8px 0 24px">
				<h2 class="section-title">How it works</h2>
				<p style="color:#9ba3b7">Short explainer…</p>
			</section>
		</fragment>
	</Product>
</Base>
```

Minimal Solution page
```astro
---
import Base from '../../layouts/Base.astro';
import Solution from '../../layouts/Solution.astro';
const title = 'Solution — Outcome';
const description = 'Short meta description.';
const canonical = '/solutions/solution-slug/';
---
<Base title={title} description={description} canonical={canonical}>
	<Solution title={title} description={description} canonical={canonical} headline="Outcome" outcomes={[ 'Value 1','Value 2','Value 3' ]} docsLinks={[ { href: 'https://empowerid.github.io/empowernow_docs/docs/.../', label: 'Docs' } ]} wwwLinks={[ { href: '/products/.../', label: 'Related product' } ]} keywords={[ 'keyword1','keyword2' }}>
		<fragment slot="how">
			<section class="container" style="padding:8px 0 24px">
				<h2 class="section-title">How it works</h2>
				<ol class="numbered">
					<li>Step 1</li>
					<li>Step 2</li>
					<li>Step 3</li>
				</ol>
			</section>
		</fragment>
	</Solution>
</Base>
```

## 32) Issue/PR templates (suggested)

New page request (marketing)
```md
- Page type: Product | Solution | Comparison | Industry | Primer
- Proposed URL slug:
- Audience & outcome:
- Key benefits/outcomes (3 bullets):
- Proof/evidence links:
- Primary/Secondary CTAs:
- Keywords + internal links:
- Images/OG needs:
```

Edit existing page (dev)
```md
- File(s) to edit:
- Change summary:
- URL changes (if any) + redirects added:
- JSON‑LD updates:
- Cross‑links added (docs/www):
- QA: Lighthouse/Pa11y status:
```

## 33) Component catalog (when to use)
- LogoWall: social proof row for known brands
- TestimonialCard: short quotes with author/role
- TrustBadges: certifications/compliance chips
- ComparisonTable: side‑by‑side capability compare
- CrossSiteLinks: render docs/www link blocks
- RelatedContent: auto links sourced from `keywords`
- PricingCTA: wide call‑to‑action bar

## 34) Router mapping (what goes where)
- Product → `/products/<slug>/` → `Product.astro` → required: title, description, canonical, headline
- Solution → `/solutions/<slug>/` → `Solution.astro` → required: title, description, canonical, headline
- Comparison → `/comparisons/<competitor>/` → programmatic
- Industry → `/industries/<industry>/` → programmatic
- Trust pages → `/trust/...` → simple sections with `Base.astro`

## 35) Quality bar (pre‑publish)
- H1 present and unique; title/meta/canonical set
- JSON‑LD valid for page type(s)
- Internal links and CTAs work; no `.md` or missing trailing slashes
- Cross‑links to docs/www added; keywords render RelatedContent
- a11y: alt text, headings order, focus states
- Performance: images optimized; budgets pass
- Consent banner visible for new sessions

## 36) Product page consistency kit (`/products/*`)

Use this drop‑in pack to make every product page unmistakably clear and consistent across `/products/*`, using official product names. It includes a shared masthead (hero) + sticky “Studio Bar”, per‑product copy blocks, gradient/icon tokens, and a QA checklist.

### A) Shared page template (use for every product)

Add the context class for gradients on the page root wrapper (e.g., the top container in your page, or on `<body>` via `Base.astro`): `.product--idp | .product--pdp | .product--crud | .product--collector | .product--shield | .product--gateway | .product--vds | .product--nowconnect`.

#### 1) Masthead (Hero)

- Kicker (eyebrow): `ICON  PRODUCT NAME` (uppercase)
- H1: official Product Name (not a slogan)
- Sub‑headline (promise): 1–2 lines
- One‑line explainer: ≤140 chars
- CTA cluster: Book demo (primary), Read docs (secondary), Quickstart (secondary)
- Visual: product icon + color gradient band

```astro
---
// In a product page under src/pages/products/*.astro
---
<header class="hero-band">
	<section class="container" style="padding:24px 0 28px">
		<div class="eyebrow" aria-hidden="true">[ICON] PRODUCT NAME</div>
		<h1 class="h1">[Product Name]</h1>
		<p class="h3" style="margin:8px 0 0">[Promise line]</p>
		<p class="body" style="margin:8px 0 0;max-width:72ch">[One-line explainer]</p>
		<div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
			<a class="btn btn-primary" href="/demo/" data-ev="cta" data-label="book-demo" data-position="hero">Book demo</a>
			<a class="btn btn-secondary" href="[DOCS_URL]" data-ev="cta" data-label="read-docs" data-position="hero">Read docs</a>
			<a class="btn btn-secondary" href="/quickstart/" data-ev="cta" data-label="quickstart" data-position="hero">Quickstart</a>
		</div>
	</section>
</header>
```

#### 2) Sticky “Studio Bar”

- Left: Icon + Product name
- Center tabs: Why it wins • How it works • Standards • Examples • Plans
- Right: Docs • Book demo

```astro
<nav class="studio-bar" aria-label="Product sections">
	<div class="container" style="display:flex;align-items:center;gap:12px;padding:10px 0">
		<div class="studio-brand"><span aria-hidden="true">[ICON]</span><span class="h3" style="font-size:16px">[Product Name]</span></div>
		<ul class="studio-tabs tabs-scroll" role="tablist">
			<li role="presentation"><a role="tab" href="#why">Why it wins</a></li>
			<li role="presentation"><a role="tab" href="#how">How it works</a></li>
			<li role="presentation"><a role="tab" href="#standards">Standards</a></li>
			<li role="presentation"><a role="tab" href="#examples">Examples</a></li>
			<li role="presentation"><a role="tab" href="#plans">Plans</a></li>
		</ul>
		<div class="studio-cta">
			<a class="btn btn-ghost" href="[DOCS_URL]">Docs</a>
			<a class="btn btn-primary" href="/demo/">Book demo</a>
		</div>
	</div>
</nav>
```

#### 3) Sections (copy pattern)

- `#why` — Why it wins (3–4 bullets; outcomes)
- `#how` — How it works (3 steps + mini diagram)
- `#standards` — Standards (pills)
- `#examples` — Examples (2–4 cards)
- `#plans` — Plans/Contact (link to pricing or contact)

#### 4) A11y & SEO

- Heading order H1→H2 (no skips)
- Title: `[Product Name] | EmpowerNow`
- Meta description ≤160 chars
- OG: product icon + gradient band + product name

### B) Product pages — copy blocks

Replace `[DOCS_URL]` with the correct docs path.

#### 1) IdP

- Icon/gradient: 🔐  • indigo 600 → cyan 500
- Docs: `/docs/idp`

Hero

- Kicker: 🔐 IDP
- H1: IdP
- Promise: Bind agents to users and capture consent up front.
- Explainer: Issue purpose‑bound Agent Passports (OAuth TE + RAR + optional DPoP) and attach obligations enforced downstream.

Why it wins

- Strong agent→user binding with purpose scope
- Pre‑issuance consent & obligations
- Budget envelopes that downstream services enforce
- Optional DPoP (proof‑of‑possession)

How it works

1. Request — agent requests purpose‑bound Passport (TE+RAR)
2. Consent & obligations — user consent recorded, obligations attached
3. Enforce — Shield/Gateway enforce scope/budget/obligations

Standards: `OAuth TE • RAR • DPoP • OIDC • SCIM • CAEP`

SEO

- Title: `IdP | EmpowerNow`
- Meta: `Issue purpose-bound Agent Passports (OAuth TE + RAR + optional DPoP), bind agents to users, capture consent, and enforce downstream.`

#### 2) PDP

- Icon/gradient: 🛡️  • violet 500 → magenta 500
- Docs: `/docs/pdp`

Hero

- Kicker: 🛡️ PDP
- H1: PDP
- Promise: Standardized decisions with constraints, obligations, and TTL.
- Explainer: Visual policy → normalized decision that gateways and apps can enforce—budgets, content, egress, params—everywhere.

Why it wins

- One decision contract across agents/apps
- Budget 402, content & egress limits, param allow‑lists
- Conservative merge across policy layers
- Explainable decisions with cache‑friendly TTL

How it works

1. Decide — PDP returns `decision + constraints/obligations/ttl`
2. Enforce — Shield/Gateway & apps apply limits during calls/streams
3. Prove — Receipts link decision to policy snapshot

Standards: `AuthZEN • OIDC • CAEP`

SEO

- Title: `PDP | EmpowerNow`
- Meta: `Policy decisions with standardized constraints/obligations/TTL—budgets, content, egress, params—enforced by gateways and apps.`

#### 3) CRUD Service

- Icon/gradient: ⚙️  • lime 400 → cyan 500
- Docs: `/docs/crud-service`

Hero

- Kicker: ⚙️ CRUD SERVICE
- H1: CRUD Service
- Promise: Create tools once—publish to MCP, Functions, and Copilot.
- Explainer: No‑code connectors/workflows that output MCP Tools/Resources/Prompts and adapters for OpenAI Functions & Copilot actions.

Why it wins

- Author once → publish to many platforms
- Idempotent runs with approvals & retries
- Param schemas & validation built‑in
- Hello‑world to usable tool in minutes

How it works

1. Define — tool inputs, validation, approvals
2. Publish — output MCP + Functions + Copilot manifests
3. Invoke — same tool from any agent; policy enforced downstream

Standards: `MCP • OpenAI Function Calling • Copilot Studio`

SEO

- Title: `CRUD Service | EmpowerNow`
- Meta: `No-code connectors/workflows that output MCP tools, OpenAI Functions, and Copilot actions. Author once—publish to many platforms.`

#### 4) Data Collector

- Icon/gradient: 🧭  • teal 400 → cyan 500
- Docs: `/docs/data-collector`

Hero

- Kicker: 🧭 DATA COLLECTOR
- H1: Data Collector
- Promise: Keep identity facts fresh for accurate policy.
- Explainer: Identity/IGA inventory & lineage (accounts, entitlements, memberships, sources, freshness) feeding PDP/PIP and IGA systems.

Why it wins

- Fresh, normalized identity facts for decisions
- Source lineage for audit and forensics
- Reduces false positives/negatives in policy checks
- Lightweight to deploy; fits existing IGA

How it works

1. Ingest — pull deltas from systems of record
2. Normalize — unify schemas, map relationships
3. Serve — expose to PDP/PIP & IGA for evaluation

Standards: `SCIM • OIDC • CAEP` (plus source‑specific connectors)

SEO

- Title: `Data Collector | EmpowerNow`
- Meta: `Identity/IGA inventory & lineage (accounts, entitlements, memberships, sources, freshness) feeding PDP/PIP for accurate policy.`

#### 5) ARIA Shield

- Icon/gradient: 🧊  • cyan 500 → violet 500
- Docs: `/docs/aria-shield`

Hero

- Kicker: 🧊 ARIA SHIELD
- H1: ARIA Shield
- Promise: Enforce budgets & streaming caps at runtime—zero‑token SPA.
- Explainer: BFF gateway: applies budgets (402), streaming caps; terminates OAuth in backend (no tokens in browser); emits receipts.

Why it wins

- Real‑time spend & stream control
- Zero‑token SPA for safer apps
- Friendly UX on budget exceed (upgrade CTA)
- Cryptographic receipts for audit

How it works

1. Pre‑check — fetch decision; set caps
2. Stream — enforce caps; stop on exceed
3. Record — write receipt & metrics

Standards: `AuthZEN • OIDC • CAEP`

SEO

- Title: `ARIA Shield | EmpowerNow`
- Meta: `BFF gateway that enforces budgets (402) and streaming caps at runtime, enables zero-token SPA, and emits cryptographic receipts.`

#### 6) ARIA MCP Gateway

- Icon/gradient: 🚦  • cyan 500 → violet 500
- Docs: `/docs/aria-mcp-gateway`

Hero

- Kicker: 🚦 ARIA MCP GATEWAY
- H1: ARIA MCP Gateway
- Promise: Stop off‑plan & drifted tool calls—before execution.
- Explainer: Enforces plan steps and schema pins at the agent→tool boundary; param & egress allow‑lists; receipts for every permit.

Why it wins

- Blocks risky tool calls pre‑execution
- Prevents schema drift with pins + grace windows
- Params/egress allowlists at the edge
- Signed receipts for compliance

How it works

1. Validate — Passport + plan step + schema pin
2. Allow/deny — match params & egress lists
3. Receipt — sign & chain with policy snapshot

Standards: `MCP • AuthZEN`

SEO

- Title: `ARIA MCP Gateway | EmpowerNow`
- Meta: `MCP gateway that enforces plan steps and schema pins at the agent→tool boundary, validates params/egress, and emits receipts.`

#### 7) VDS (Virtual Directory Service)

- Icon/gradient: 🗂️  • slate 500 → cyan 500
- Docs: `/docs/vds`

Hero

- Kicker: 🗂️ VDS
- H1: VDS
- Promise: Virtualize identity data for legacy and modern apps.
- Explainer: Present a unified, read‑optimized directory view across sources without moving data; cache, map, and secure.

Why it wins

- Single logical directory across sources
- Offloads legacy apps without migration
- Caching for performance & resilience
- Works with modern auth & IGA

How it works

1. Map — define virtual schema & joins
2. Expose — standards‑compliant views for apps
3. Secure — apply access policy & caching

Standards: `LDAP • SCIM • OIDC` (as applicable)

SEO

- Title: `VDS | EmpowerNow`
- Meta: `Virtual Directory Service: unify identity across sources without moving data; cache, map, secure; serve legacy and modern apps.`

#### 8) NowConnect (hybrid connectivity)

- Icon/gradient: 🔗  • emerald 500 → cyan 500
- Docs: `/docs/nowconnect`

Hero

- Kicker: 🔗 NOWCONNECT
- H1: NowConnect
- Promise: Hybrid connectivity for on‑prem and cloud—secure by default.
- Explainer: Lightweight relay patterns for connecting agents and PEPs to on‑prem systems without opening inbound ports.

Why it wins

- No inbound holes; outbound‑only relays
- Simple deployment; cloud or self‑hosted
- Observability & controls built‑in
- Works with CRUD Service and gateways

How it works

1. Relay — establish outbound connector
2. Authorize — policy‑guarded calls only
3. Observe — logs/metrics/receipts

Standards: `mTLS • OAuth • AuthZEN` (as applicable)

SEO

- Title: `NowConnect | EmpowerNow`
- Meta: `Hybrid connectivity using outbound relay patterns; connect agents and PEPs to on-prem systems securely—no inbound ports.`

### C) Icons & gradient tokens

Map icon and gradient per product. Use a product context class to activate gradient tokens:

| Product | Icon | Gradient (from → to) |
| --- | --- | --- |
| IdP | 🔐 | indigo 600 → cyan 500 |
| PDP | 🛡️ | violet 500 → magenta 500 |
| CRUD Service | ⚙️ | lime 400 → cyan 500 |
| Data Collector | 🧭 | teal 400 → cyan 500 |
| ARIA Shield | 🧊 | cyan 500 → violet 500 |
| ARIA MCP Gateway | 🚦 | cyan 500 → violet 500 |
| VDS | 🗂️ | slate 500 → cyan 500 |
| NowConnect | 🔗 | emerald 500 → cyan 500 |

Implementation notes:

- Add `.product--{key}` to the page root to map `--grad-start/--grad-mid` via `utilities.css`.
- Use `.hero-band` on the masthead wrapper to render the ambient gradient.
- Replace emoji icons with SVGs at a consistent 24–32px size.

### D) QA checklist (per product page)

- [ ] H1 is exact product name
- [ ] Eyebrow shows ICON + PRODUCT NAME in uppercase
- [ ] Gradient band matches tokens
- [ ] Sticky bar shows icon + name while scrolling
- [ ] Tabs anchor to `#why #how #standards #examples #plans`
- [ ] OG image includes product icon + name
- [ ] CTAs: Book demo, Read docs, Quickstart
- [ ] A11y: heading order, ARIA for tabs, focus styles, skip link
- [ ] Mobile: identity above fold; tabs become horizontal scroller

### E) Ship list (this sprint)

1. Implement shared masthead + sticky bar component with token support
2. Wire per‑product icon/gradient tokens
3. Paste the copy blocks above for each product
4. Generate per‑product OG images (icon + band + name)
5. Verify SEO/A11y/Perf and launch