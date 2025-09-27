# Web (Marketing) Design System Checklist — NeonFlux

Use this to review any www page before publish.

## Header
- [ ] Glass background `rgba(11,28,61,.8)` with 20px blur
- [ ] Bottom border `rgba(0,231,246,.2)`
- [ ] Brand logo visible on dark (uses `en-logo-dark.png`)
- [ ] Nav links `--on-bg` color; hover to cyan; focus-visible outline

## Typography & Colors
- [ ] Body text uses `--on-bg`; secondary uses `--on-muted`
- [ ] Headings may use `--color-primary` (violet) sparingly
- [ ] CTAs are cyan with `--on-accent` text
- [ ] No long cyan paragraphs; links underlined on hover/focus

## Surfaces & Hierarchy
- [ ] Use one of: Glow panel (primary), Glass panel (secondary), Ghost block (supporting)
- [ ] Exactly one cyan `.btn-primary` per section; others `.btn-ghost`
- [ ] Active tab uses neon underline (`.tab-active`), not filled box
- [ ] “Works with” rails and Status are Ghost (no heavy fill)

## Cards & Surfaces
- [ ] Glass cards `rgba(11,28,61,.85)` + 12px blur + white border
- [ ] Top hairline gradient present (subtle)
- [ ] Section spacing 40–96px; grid gaps 16–24px
 - [ ] Ambient glow on hero via `.hero-ambient` (optional, AA-safe)
 - [ ] Section dividers present via `.section-divider` where helpful

## Images
- [ ] Use `ResponsiveImg` with `loading="lazy"` and `sizes/srcset`
- [ ] Provide descriptive alt text

## Accessibility (WCAG AA)
- [ ] Text contrast ≥ 4.5:1; large/non-text ≥ 3:1
- [ ] Focus outline visible for links/buttons
- [ ] Semantic headings (single H1 per page)
- [ ] ARIA labels where needed
- [ ] Tabs use ARIA roles/keyboard (tablist/tab/tabpanel; Arrow/Home/End)

## Links & URLs
- [ ] All internal links/assets use `import.meta.env.BASE_URL`
- [ ] Canonical set; meta description present
- [ ] JSON-LD where applicable (Product, FAQ, Article, Breadcrumbs)

## Performance & SEO
- [ ] Lazy images; no render-blocking third-party scripts
- [ ] Sitemaps include new routes
- [ ] Pagefind search still indexes content

## Consistency
- [ ] Color roles followed (violet headings, cyan CTAs)
- [ ] Magenta used sparingly
- [ ] Success/warning only for feedback (lime/amber)

Record issues with screenshots and file paths.
