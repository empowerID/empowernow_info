# EmpowerNow Web (Marketing) — NeonFlux Design System

This guide codifies the NeonFlux design language as implemented on the marketing site (Astro). Use it to evaluate pages, file issues, and keep branding accessible and consistent.

## Tokens (web)

CSS source of truth: `src/styles/empowernow_unified_design_final.css` (v2). Legacy files `src/styles/tokens.css` and `src/styles/utilities.css` remain supported via aliases during migration.

```css
:root {
  /* Unified v2 core palette */
  --cyan: #00E7F6;
  --violet: #6C4CFF;
  --magenta: #B326FF;
  --green: #B6FF3C;
  --amber: #FFC266; /* contrast-fixed */
  --red: #FF5D73;

  /* Text & surfaces */
  --bg-primary: #0A0A0A;
  --bg-secondary: #0B1C3D;
  --text-primary: #E8ECFF;
  --text-secondary: #B3BCD2;

  /* Legacy aliases (backward compatible) */
  --color-bg: var(--bg-primary);
  --navy: var(--bg-secondary);
  --color-primary: var(--violet);
  --color-secondary: var(--magenta);
  --color-accent: var(--cyan);
  --color-success: var(--green);
  --color-warning: var(--amber);
}
```

Utilities used across pages (legacy classes remain valid; prefer v2 patterns where possible):

```css
nav { background: rgba(11,28,61,.8); border-bottom: 1px solid rgba(0,231,246,.2) }
.glass-card { background: rgba(11,28,61,.85); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,.1) }
.btn-primary { background: var(--color-accent); color: var(--on-accent) }
```

## Neon‑Flux Re‑Art Direction

North star: Neon instruments on a dark stage. The dark background is the stage, neon elements are the instruments that guide attention (hero, Orchestration Service, primary CTAs, proof atoms).

### Palette & Roles

| Role | Token | Usage |
| --- | --- | --- |
| Primary action | `--color-accent` (pulse cyan) | Filled buttons, active tab underline, key callouts |
| Secondary accents | `--color-primary` (violet), `--color-secondary` (magenta) | Section rails, gradients, ambient halos |
| Positive/Warning | `--ion-lime`, `--signal-amber` | Success/limit states, receipts |
| Surfaces | Stage: `--color-bg` • Glass: `--surface-1/2` • Ghost: transparent + subtle border | Panels & dividers |

Accessibility rule: cyan on dark must meet AA; avoid cyan body paragraphs. Use `--on-bg` for paragraphs and `--on-muted` for secondary text. Focus-visible outline uses unified `--cyan` and reduced-motion is respected.

### Surface System (Depth)

Use three variants consistently:

- Glow Panel (hero highlights / Orchestration Service)
  - Soft radial halo + thin neon edge → primary attention.
- Glass Panel (secondary sections / control stack)
  - Frosted dark with 1px soft border.
- Ghost Block (supporting text, chip rails)
  - No fill; subtle top border or rail.

### CSS Patterns (drop‑in)

```css
/* Ambient stage */
.page-stage {
  background: radial-gradient(40% 30% at 15% 8%, rgba(108,76,255,.20), transparent 60%),
              radial-gradient(35% 30% at 85% 12%, rgba(0,231,246,.14), transparent 60%),
              radial-gradient(25% 20% at 70% 80%, rgba(179,38,255,.12), transparent 70%),
              var(--color-bg);
}

/* Glow panel */
.panel-glow { position:relative; background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.04)); border:1px solid rgba(0,231,246,.25); border-radius:16px; box-shadow:0 0 0 1px rgba(0,231,246,.12) inset, 0 20px 60px rgba(0,231,246,.15), 0 10px 30px rgba(108,76,255,.10); }
.panel-glow::before { content:""; position:absolute; left:12px; right:12px; top:0; height:2px; border-radius:2px; background:linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-secondary)); opacity:.7; }

/* Glass panel */
.panel-glass { background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.12); border-radius:14px; box-shadow:0 8px 24px rgba(0,0,0,.25); }

/* Ghost block */
.block-ghost { border-top:1px solid rgba(255,255,255,.12); padding-top:16px; }

/* Section rail */
.section-rail { border-top:2px solid rgba(108,76,255,.25); box-shadow:0 1px 0 0 rgba(0,231,246,.18) inset; }

/* Buttons */
.btn-primary { background:var(--color-accent); color:var(--on-accent); border-radius:12px; box-shadow:0 8px 24px rgba(0,231,246,.25); }
.btn-ghost { border:1px solid rgba(255,255,255,.18); color:var(--on-bg); background:transparent; border-radius:12px; }

/* Tabs */
.tab-active { border-bottom:2px solid var(--color-accent); color:#fff; }

/* Code proof atom */
.code-proof { background:#0A0B0D; border:1px solid rgba(255,255,255,.14); border-radius:12px; padding:16px; box-shadow:0 0 0 1px rgba(0,231,246,.12) inset; font:500 14px/1.6 ui-monospace,Menlo,Consolas,monospace; color:#E6E6E6; }
```

### Hierarchy Guidelines

- Glow: hero headline, Orchestration Service panel, one control highlight.
- Glass: control stack, role paths, pricing anchor.
- Ghost: “Works with” rails, status strip, section intros.

### CTA Discipline

Exactly one cyan `.btn-primary` per section; all other actions are `.btn-ghost`. Tabs use neon underline (`.tab-active`) rather than filled backgrounds.

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

## NeonFlux layering (homepage)
- Ambient glows: apply `.hero-ambient` to the hero container; gradients use violet/cyan/magenta at low opacity for depth (AA-safe).
- Dividers: use `.section-divider` between sections to create rhythm.
- Buttons: `.btn-primary` includes a subtle inner shine via a masked gradient border.

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


