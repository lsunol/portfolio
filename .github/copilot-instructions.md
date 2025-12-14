# AI Agent Guide for this Repository

- Stack: Next.js App Router (TypeScript, Tailwind via app/globals.css), client-heavy single page defined in [app/page.tsx](app/page.tsx); root shell and fonts in [app/layout.tsx](app/layout.tsx).
- Run locally with `npm run dev`; standard Next.js scripts, no custom build/test commands documented in [README.md](README.md).
- Styling uses CSS variables + Tailwind utility classes; neumorphic surfaces and blurred panels rely on vars from [app/globals.css](app/globals.css).
- Color themes: default "tech-cold" vars on :root; alternate palettes keyed by `data-palette` ("indigo-salmon", "neutro-elegante"). Palette chosen via `?palette=` query string in [lib/usePalette.ts](lib/usePalette.ts) and applied by [components/PaletteProvider.tsx](components/PaletteProvider.tsx); variables feed backgrounds/text/shadows.
- If adding new themed styles, prefer CSS variables over hard-coded colors so palettes stay consistent.
- Main content is data-driven arrays inside [app/page.tsx](app/page.tsx) (`projects`, `skillGroups`, `experiences`, `askMeMessages`). Update these to change displayed cards/timeline without touching components.
- Sections animate in with Framer Motion using shared `sectionVariants` (fade + slide) configured at top of [app/page.tsx](app/page.tsx); keep new sections consistent by reusing that pattern.
- Background effect toggle via `backgroundMode` constant in [app/page.tsx](app/page.tsx) ("particles" shows [components/NeuralNetwork.tsx](components/NeuralNetwork.tsx), "none" disables for perf).
- Reusable UI pieces live in [components](components):
  - [Header.tsx](components/Header.tsx) fixed nav with mobile dropdown (framer-motion `AnimatePresence` for slide-in).
  - [SectionTitle.tsx](components/SectionTitle.tsx) shared eyebrow/title/description block.
  - [ProjectCard.tsx](components/ProjectCard.tsx) handles optional image, GitHub/demo links, and tag chips.
  - [TimelineItem.tsx](components/TimelineItem.tsx) renders experience steps; follow its layout for new timeline entries.
  - [ChatMock.tsx](components/ChatMock.tsx) static chat transcript used by [FloatingChat.tsx](components/FloatingChat.tsx) (toggle state + slide animation).
  - [FlowiseChat.tsx](components/FlowiseChat.tsx) dynamically imports `flowise-embed-react` with `ssr: false`; chatflow id + apiHost are hard-coded.
- Fonts: Inter loaded via next/font in [app/layout.tsx](app/layout.tsx); body uses `--font-inter` variable.
- Assets: images live under [public/images](public/images); resume files under [public/resume](public/resume).
- Client components are explicitly marked `"use client"`; keep that on new components that rely on state/effects/framer-motion.
- Keep markup accessible (aria-labels on buttons, alt text on images) as seen across components.
- Deployment target appears to be Vercel (default Next setup); no custom server code present.

Ask for clarification if adding new palettes (provide desired keys/hex values) or changing Flowise endpoints/chatflow ids.
