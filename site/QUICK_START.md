# Quick Start — EmpowerNow Web (Astro)

## Install & Dev
```bash
npm i
npm run dev
```

## Project Basics
- Site generator: Astro (content, MDX, sitemaps)
- Output path: `docs/` for GitHub Pages
- Base path: `/empowernow_info/` (use `import.meta.env.BASE_URL`)

## Create a Page
```tsx
---
// src/pages/products/example.astro
import Product from '@/layouts/Product.astro';
const title = 'Example — Product';
const description = 'Example product';
const canonical = '/products/example/';
---
<Product title={title} description={description} canonical={canonical} headline="Example" />
```

## Add Links/Assets (base‑aware)
```tsx
<a href={`${import.meta.env.BASE_URL}products/`}>Products</a>
<img src={`${import.meta.env.BASE_URL}images/en-logo-dark.png`} alt="logo" />
```

## Styling
- Use NeonFlux surfaces and utilities from `src/styles/*`:
  - Surfaces: `.panel-glow` (hero/primary), `.panel-glass` (content), `.block-ghost` (low‑emphasis rails)
  - Stage: `.page-stage` on hero sections
  - Cards: `.glass-card` for interactive/content blocks
- CTA discipline:
  - Exactly one `.btn.btn-primary` (Pulse Cyan) per section
  - All other links/buttons use `.btn.btn-ghost`
  - Do not change button fills per product
- Product accents (for identity, not CTAs):
  - Tokens in `src/styles/tokens.css` (`--accent-crud`, `--accent-gateway`, `--accent-pdp`, `--accent-shield`, `--accent-idp`, `--accent-receipts`, `--accent-collector`)
  - Helpers in `src/styles/utilities.css`: `.product-rail.rail--{product}` and `.icon-accent.icon--{product}`
  - Use accents for top rails, small icons, and badges only; avoid long text/body

## SEO
- Use `SeoHead.astro` via `Base.astro`
- Add canonical + meta description; JSON‑LD where relevant

## Accessibility
- Ensure contrast AA; focus outlines; alt text; single H1
- Rails are decorative: keep `.product-rail{ pointer-events:none }`
- Tabs: use ARIA roles (`role="tablist"`, `role="tab"`, `role="tabpanel"`); update `aria-selected` and hash; support arrow keys

## Build & Deploy
```bash
npm run build
# pushes to main triggers Pages
```

## Docs
- See `DESIGN_SYSTEM.md`, `DESIGN_SYSTEM_CHECKLIST.md`, `PATTERNS.md`
