# EmpowerNow Marketing Site (Astro)

This is the EmpowerNow marketing site built with Astro, using NeonFlux styles and reusable layouts for Products, Solutions, Primers, and more. It includes dynamic sitemaps, JSON‑LD, consent‑gated analytics, Pagefind search, simple experiments, and CI (Lighthouse + Pa11y).

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
