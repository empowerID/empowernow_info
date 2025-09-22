# EmpowerNow Web (Marketing) — NeonFlux Design System

This guide codifies the NeonFlux design language as implemented on the marketing site (Astro). Use it to evaluate pages, file issues, and keep branding accessible and consistent.

## Tokens (web)

CSS source of truth: `src/styles/tokens.css` and `src/styles/utilities.css`.

```css
:root {
  --color-bg: #0E0E10;
  --navy: #0B1C3D;               /* surfaces/nav */
  --color-primary: #6C4CFF;      /* violet headings/highlights */
  --color-secondary: #B326FF;    /* magenta accents/small areas */
  --color-accent: #00E7F6;       /* cyan CTAs/links hover/focus */
  --color-success: #B6FF3C;      /* lime success */
  --color-warning: #FFC266;      /* amber warnings */
  --color-surface: rgba(255,255,255,.06);
  /* Typography colors (recommended) */
  --on-bg: #E8ECFF;              /* body text */
  --on-muted: #A7B0C7;           /* secondary text */
  --on-accent: #002628;          /* text on cyan */
}
```

Utilities used across pages:

```css
nav { background: rgba(11,28,61,.8); border-bottom: 1px solid rgba(0,231,246,.2) }
.glass-card { background: rgba(11,28,61,.85); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,.1) }
.btn-primary { background: var(--color-accent); color: var(--navy) }
```

## Color roles

- Brand primary (violet): headings, key dividers, selected tabs
- Accent/CTA (cyan): primary buttons, link hover/focus, hairline glows
- Secondary (magenta): small badges, highlights, data accents
- Success/Warning (lime/amber): feedback only; avoid long text
- Surfaces: `--navy` + glass cards `rgba(11,28,61,.85)`

Accessibility rules (WCAG AA):

- Body text ≥ 4.5:1; large text and non-text UI ≥ 3:1
- Links are color + underline on hover/focus; never color-only
- Focus visible ring: 3px `--color-accent` with 2px offset
- Cyan is not used for long paragraphs; use `--on-bg` and `--on-muted`

## Components (web)

- Base layout `Base.astro` exposes: navbar, footer, consent, analytics. Use base-aware URLs via `import.meta.env.BASE_URL`.
- Product/Solution layouts (`Product.astro`, `Solution.astro`) render hero, proof, related links, and JSON-LD.
- Reusable blocks: `LogoWall`, `PricingCTA`, `RelatedContent`, `ResponsiveImg`, `BreadcrumbsJsonLd`.

Layout rules:

- Sections stack with 40–96px vertical rhythm
- Card grids: CSS grid with min 280–320px columns; gap 16–24px
- Images: `ResponsiveImg` with `loading=lazy` and proper `sizes`

## Do/Don’t

Do:
- Use glass cards for any elevated surface
- Keep violet for headings, cyan for actions, magenta sparingly
- Use base-aware links/assets (`import.meta.env.BASE_URL}`)

Don’t:
- Use cyan for body text
- Add transparent tiles without borders
- Hardcode project paths in links or images

## Performance & SEO

- Use Pagefind search page; defer heavy scripts; lazy images
- Add canonical, meta description, JSON-LD via `SeoHead`/`JsonLd`
- Sitemaps generated under `src/pages/sitemaps/*`

## Checklist

See `DESIGN_SYSTEM_CHECKLIST.md` for page-level QA gates.


