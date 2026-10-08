# Lydia Chebet — Industrial & Textile Engineering Portfolio

An award-grade, single-page engineering portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4** and **Motion (Framer Motion)** — with a Lenis-powered experience layer, a WebGL silk hero, scroll-scrub kinetic typography, a draggable horizontal project gallery and a fully theme-aware light/dark design system.

![Next.js 16](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8) ![Motion](https://img.shields.io/badge/Motion-framer-f43f5e)

---

## Quick start

```bash
bun install        # or npm install / pnpm install
bun run dev        # develop at http://localhost:3000
bun run build      # production build
bun run start      # serve the production build
bun run lint       # eslint
```

> Node 20+ recommended. The project uses Bun as its primary runtime but works with any Node package manager.

---

## The experience layer

| Feature | Where |
| --- | --- |
| Cinematic preloader — machine boot sequence + 0→100 counter + curtain lift | `src/components/portfolio/fx/preloader.tsx` |
| Lenis smooth scrolling with anchor interception | `fx/smooth-scroll.tsx` |
| Custom cursor (dot + spring ring, `OPEN` label over cards) | `fx/cursor.tsx` |
| WebGL flowing-silk hero shader, theme-aware, DPR-capped, pause-when-hidden | `fx/silk-canvas.tsx` |
| Kinetic typography — char-level masked rises, line-level masked headlines, scramble links | `fx/kinetic.tsx` |
| Scroll-scrub manifesto — viewport-filling words light up with scroll | `manifesto.tsx` |
| Horizontal project gallery — sticky scroll-driven track + **drag-to-travel**, broken panel rhythm, duotone imagery, ghost dye-fill indices, edge fades | `fx/horizontal-showcase.tsx` |
| Scroll-linked variable font weight — the hero name thins from 800 → 430 as it leaves the fold | `hero.tsx` |
| Velocity-reactive marquees (pixel-exact, fps-independent, rest at 42 px/s) | `fx/kinetic.tsx` |
| Magnetic buttons, tilt cards, parallax images | `fx/motion-kit.tsx` |
| Live Nairobi clock footer, velocity marquee wall, giant email finale | `closing.tsx` |

Everything is **reduced-motion safe** (every animation has a `prefers-reduced-motion` path) and **performance-guarded** (IntersectionObservers pause offscreen work, transforms/opacity only, LQIP blur-up on every image).

---

## Design system

- **Tokens & themes** — light (`#f8f8f6` paper) / dark (`#101412` ink) with signature green `#2f7d5b` / `#57c18a`, indigo and amber accents: `src/app/globals.css`
- **Editorial devices** — outlined ghost type (`.text-outline*`), duotone image treatment (`.duotone`), giant display scales (`.type-display`, `.type-giant`), hairline strips, film grain, blueprint grids
- **Typography** — Inter Tight (display, variable wght), Geist (body), IBM Plex Mono (technical)
- **Signature interaction** — duotone images colorize on hover; ghost panel numbers flood green ("dye fill") on card hover

---

## Content model

All copy, projects, case studies, skills, timeline and education data live in one typed file:

```
src/lib/data.ts
```

Update `profile` (email, LinkedIn, `cvUrl`), project case studies and every section's content there. Values marked `[PLACEHOLDER]` / `[EXAMPLE]` follow the spec's honesty policy — swap them for verified data before publishing.

Images live in `public/images/` (optimised, progressive JPEGs with LQIP placeholders in `src/lib/lqip.ts`).

---

## Project structure

```
src/
├─ app/                  # layout (fonts, SEO, themes), page assembly, globals.css
├─ components/
│  ├─ portfolio/         # all sections (hero, snapshot, manifesto, projects, …)
│  │  ├─ charts/         # line-balance, Pareto, time-study, process-flow visuals
│  │  └─ fx/             # experience layer (preloader, cursor, silk, kinetic, showcase)
│  └─ ui/                # shadcn/ui primitives
└─ lib/                  # data model, LQIP map, utils
```

---

## Before you publish

1. Replace the placeholder email / LinkedIn / CV URL in `src/lib/data.ts` (`profile`).
2. Swap the portrait placeholder in `public/images/portrait.jpg`.
3. Replace `[EXAMPLE]` project data with your verified numbers.
4. Update SEO metadata in `src/app/layout.tsx` if needed.
