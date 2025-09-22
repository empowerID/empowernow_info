# Web Patterns (Astro + NeonFlux)

## Page Anatomy
- Base layout `Base.astro` wraps all pages (nav, footer, consent, analytics).
- Use section rhythm: 40–96px vertical; grids with 16–24px gap.
- H1 once per page; subheads use muted text.

## Cards & Grids
- `.glass-card` for any elevated surface.
- Grid: `display:grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap:16px`.

## Links & Buttons
- Links default to `--on-bg`; on hover/focus switch to accent cyan and underline.
- Primary button uses cyan with `--on-accent` text; secondary is glass with accent border.

## Images
- Use `ResponsiveImg.astro` with `srcset/sizes`, `loading="lazy"`, `decoding="async"`.

## JSON‑LD
- Product pages: Product + BreadcrumbList.
- Solutions: FAQPage (when Q&A present) + BreadcrumbList.

## Routing
- Use `import.meta.env.BASE_URL` for all internal URLs and asset paths.
- Keep trailing slashes per `astro.config.mjs` (trailingSlash: 'always').

## a11y
- Focus visible outlines, 4.5:1 text contrast, descriptive alt text.

## Common Pitfalls
- Cyan paragraphs (avoid); missing base-aware URLs; transparent tiles; duplicate navbars.
