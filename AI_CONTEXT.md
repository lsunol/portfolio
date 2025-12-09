# AI Context for This Project

This document is for bootstrapping any AI/LLM that joins the project. Keep it updated when architecture or conventions change.

## What This Project Is
- Personal portfolio site for Lluís Suñol (Software Engineer, AI/ML focus).
- Built with Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion.
- Visual theme: neumorphic cards, soft gradients, animated neural-network background.
- Multi-palette theming switchable via URL query (?palette=tech-cold|indigo-salmon|neutro-elegante) using CSS variables on `html[data-palette]`.

## High-Level Architecture
- Next.js App Router (folder `app/`). Root layout sets CSS variable-based background and mounts PaletteProvider.
- Client components for interactive/animated pieces (Framer Motion sections, FloatingChat, ChatMock, NeuralNetwork).
- Styling primarily via Tailwind utility classes plus custom CSS variables defined in `app/globals.css`.
- Animated background: `components/NeuralNetwork` uses `particles.js` via dynamic import in `useEffect` to avoid SSR issues.
- Theming: `components/PaletteProvider` + `lib/usePalette` read query param and set `data-palette` on `<html>`, driving CSS variables.

## Key Files
- `app/page.tsx`: main page with hero, stats, about, skills/resume, projects, ask-me, contact sections. Uses Framer Motion for reveal animations.
- `app/layout.tsx`: wraps with PaletteProvider; body uses CSS variables for background/text.
- `app/globals.css`: defines Tailwind base plus palette variable sets under `:root` and `html[data-palette=…]`.
- `components/NeuralNetwork.tsx`: particles background (dynamic import, client-only).
- `components/Header.tsx`, `FloatingChat.tsx`, `ChatMock.tsx`, `ProjectCard.tsx`, `SectionTitle.tsx`, `TimelineItem.tsx`: UI building blocks.
- `lib/usePalette.ts`: client hook to read ?palette and set data-palette; SSR-safe (uses `useEffect`).

## Patterns & Conventions
- **SSR safety:** Any `window`/`document` access must be inside `useEffect` or dynamic import. NeuralNetwork and usePalette follow this.
- **Theming:** Only change colors via CSS variables in `globals.css`; palettes are applied with `data-palette` on `<html>`. Avoid hardcoded colors in components; prefer `var(--app-…)` or Tailwind classes that map well to current palette.
- **Animations:** Framer Motion variants are defined in `sectionVariants` and reused across sections for consistency.
- **Layout:** Sections are stacked with gaps; hero previously had spacing issues—if adjusting, ensure header height and viewport math stay SSR-safe and responsive.
- **Neumorphism:** Cards use custom shadows (see `neumorphic-surface` class in CSS) and rounded corners.

## Gotchas
- Do not import `particles.js` on the server; keep it dynamic in `useEffect`.
- When reading URL/search params for palette, guard for SSR (no `window` at module scope).
- If modifying hero spacing, remember the header is outside normal flow; account for its height when centering content.
- The palette CSS uses `!important` in some variables to ensure overrides; keep consistency when adding new palettes.

## How to Extend
- **Add a new palette:** Define variables in `globals.css` under a new `html[data-palette="name"]` block; ensure matching keys to existing palettes.
- **Add sections/components:** Prefer client components only when needed (animation/interaction). Otherwise, keep server components for simplicity.
- **Animations:** Use existing `sectionVariants` or create new variants; keep durations/easing consistent.
- **Data/content:** Currently some sections use placeholder text; replace with real copy as needed.

## Running & Tooling
- Typical Next.js scripts (check `package.json`): `dev`, `build`, `start`, `lint`.
- Tailwind configured via `postcss.config.mjs` and `globals.css`.

## Keeping This File Fresh
- Update this file whenever:
  - You add/remove palettes or change variable naming.
  - You change how theming is applied (e.g., different attribute or provider).
  - You alter layout assumptions (header height handling, hero spacing logic).
  - You introduce new major components/sections or architectural patterns.

## Quick Orientation Checklist for a New AI
- Read `app/page.tsx` to see current sections and component usage.
- Read `app/globals.css` to understand palettes and the neumorphic styles.
- Note SSR guards in `NeuralNetwork` and `usePalette`; follow the same pattern.
- If touching theming, set `data-palette` on `<html>`, not `body`.
- Verify animations with Framer Motion remain lightweight (duration ~0.6s easeOut).
