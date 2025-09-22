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
- Use `.glass-card`, `.btn`, and token colors from `src/styles/*`
- Headings violet, CTAs cyan, body text `--on-bg`

## SEO
- Use `SeoHead.astro` via `Base.astro`
- Add canonical + meta description; JSON‑LD where relevant

## Accessibility
- Ensure contrast AA; focus outlines; alt text; single H1

## Build & Deploy
```bash
npm run build
# pushes to main triggers Pages
```

## Docs
- See `DESIGN_SYSTEM.md`, `DESIGN_SYSTEM_CHECKLIST.md`, `PATTERNS.md`
