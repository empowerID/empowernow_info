# EmpowerNow Web (Astro)

This is the marketing site built with Astro and NeonFlux styling.

## Design & Authoring Docs
- [Design System](./DESIGN_SYSTEM.md)
- [Design Checklist](./DESIGN_SYSTEM_CHECKLIST.md)
- [Patterns](./PATTERNS.md)
- [Quick Start](./QUICK_START.md)
- [Analyzer (console)](./design-system-analyzer.js)
- See also authoring guide: [AUTHORING.md](./AUTHORING.md)

## Quick start
- Install: `npm ci`
- Dev: `npm run dev`
- Build: `npm run build` (Pagefind runs in `postbuild`)
- Preview: `npm run preview`

## Authoring guide
See `AUTHORING.md` for step‑by‑step instructions for developers, marketing, and AI contributors.

## CI & quality
- Lighthouse CI with budgets
- Pa11y a11y checks
- Staging/preview `noindex` via middleware

## Structure
- `src/layouts/` Base, Product, Solution, Primer
- `src/components/` shared NeonFlux components
- `src/pages/` products, solutions, comparisons, industries, trust, sitemaps, search
- `src/lib/` url, analytics, experiments, keywords
- `public/` static assets

## License
Internal EmpowerNow project.
