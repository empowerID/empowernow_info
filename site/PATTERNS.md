# Web Patterns (Astro + NeonFlux)

## Page Anatomy
- Base layout `Base.astro` wraps all pages (nav, footer, consent, analytics).
- Use section rhythm: 40–96px vertical; grids with 16–24px gap.
- H1 once per page; subheads use muted text.

### Stage & Surfaces
- Apply `.page-stage` to page containers for ambient gradients (AA-safe).
- Primary highlight blocks use `.panel-glow`; secondary use `.panel-glass`; supporting text rails use `.block-ghost`.

## Cards & Grids
- `.glass-card` for any elevated surface.
- Grid: `display:grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap:16px`.

### Product rails & icons
- Use `.product-rail` with `.rail--crud|gateway|pdp|shield|idp|receipts|collector` at the top of product cards/sections for identity.
- Use `.icon-accent.icon--{product}` for 24–32px pictograms. Do not use accents for body copy.

## Links & Buttons
- Links default to `--on-bg`; on hover/focus switch to accent cyan and underline.
- Primary button uses cyan with `--on-accent` text; secondary is glass with accent border.
- One cyan primary per section; other actions `.btn-ghost`.

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
- Tabs: use ARIA roles (tablist/tab/tabpanel) with Arrow/Home/End keyboard support.

## Common Pitfalls
- Cyan paragraphs (avoid); missing base-aware URLs; transparent tiles; duplicate navbars.
