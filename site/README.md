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

## Components
- `LogoWall.astro` – responsive, simple logo strip
- `NotebookLMVideo.astro` – responsive embed for Google NotebookLM Video Overviews
- `MediaImage.astro` – local-first responsive images (srcset, formats, placeholders)
- `MediaVideo.astro` – local-first accessible video (poster, captions, defer)

Usage:
```astro
---
import NotebookLMVideo from '../src/components/NotebookLMVideo.astro';
---
<NotebookLMVideo
  url="https://notebooklm.google.com/share/your-video-overview-link"
  title="NotebookLM: Intro walkthrough"
  poster={`${import.meta.env.BASE_URL}images/notebooklm-poster.jpg`}
  defer={true}
  aspect="16/9"
/>
```

### MediaImage (local)
```astro
---
import MediaImage from '../src/components/MediaImage.astro';
---
<MediaImage
  src={`${import.meta.env.BASE_URL}images/products/pdp/hero.jpg`}
  alt="Authorization Studio – policy view"
  aspect="16/9"
  formats={['avif','webp']}
  widths={[480,768,1024,1440]}
  placeholder={`${import.meta.env.BASE_URL}images/products/pdp/hero.blur.jpg`}
  priority
/>
```

Place these sibling files under `site/public/images/...`:
- `hero.w480.jpg`, `hero.w768.jpg`, `hero.w1024.jpg`, `hero.w1440.jpg`
- Optional: `hero.w*.webp`, `hero.w*.avif` and a tiny `hero.blur.jpg`

### MediaVideo (local)
```astro
---
import MediaVideo from '../src/components/MediaVideo.astro';
---
<MediaVideo
  src={{ webm: `${import.meta.env.BASE_URL}videos/launch.webm`, mp4: `${import.meta.env.BASE_URL}videos/launch.mp4` }}
  poster={`${import.meta.env.BASE_URL}images/launch-poster.jpg`}
  aspect="16/9"
  captions={[{ src: `${import.meta.env.BASE_URL}videos/launch.en.vtt`, srclang: 'en', label: 'English', default: true }]}
  defer
  title="Launch overview"
/>
```

## License
Internal EmpowerNow project.
