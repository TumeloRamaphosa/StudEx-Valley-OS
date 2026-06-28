<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# StudEx Valley OS — ClaudeClaw Mission Control

An AI operating system: a swarm of Claude agents you steer from one
dashboard. Tasks flow **Queued → Running → Done**; untargeted tasks
auto-route to the best agent.

## Brand — "Daylight Neon"

- **Cream paper** base `#FBF6E9` — light, warm, daylight surfaces.
- **Neon pink** `#FF2EC4` — primary accent, glow, focus.
- **Gold** `#C9A84C` — secondary accent + the logo (gold arch + sun on a dark tile).
- **Ink** `#15110C / #2B2620` — warm near-black text.
- Mono = JetBrains Mono (system, ids, code). Sans = Space Grotesk (prose).
- Tokens live in `src/app/globals.css`. Never hardcode hex in components —
  use the `pink` / `gold` / `ink` / `surface` Tailwind tokens.
- Logo: `src/components/logo.tsx`. Agent avatars: blocky pixel-art mechs in
  `src/components/pixel-mech.tsx`, one color-themed palette per agent.

## Layout

- `src/app/*` — one route per Mission Control section.
- `src/components/{sidebar,topbar,ui}.tsx` — shell + primitives.
- `agents/<name>/` — `agent.yaml` (model + tools) + `CLAUDE.md` (persona).
  Copy `agents/_template/` to add a teammate.
- `.claude/skills/` — bundled skills (design, browser QA, goal, memory).
- `memory/supermemory/` — three-layer recall (FTS5 + embeddings + salience).

## Skills wired in

`/goal` (persistent objective, Stop hook in `.claude/settings.json`) ·
`gstack` (browser QA) · `ui-ux-pro-max` + `claudedesignskills` (design
intelligence) · `graphify` (Hive Mind graphs) · `superpowers` ·
`huashu-design` (HTML-native hi-fi prototypes, slide decks, animations,
MP4/GIF export, 20 design philosophies + 5-dimensional expert review —
invoke with `/huashu-design` or trigger words like "做原型", "prototype",
"make an animation", "design variant", "hi-fi mockup").

## Conventions

- Read the Next.js docs note above — this is Next 16 / Tailwind v4 / React 19.
- `npm run build` must pass before every commit.
- Every consequential action is append-only auditable (see `/audit`).

