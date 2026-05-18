<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# StudEx Valley OS — ClaudeClaw Mission Control

An AI operating system: a swarm of Claude agents you steer from one
dashboard. Tasks flow **Queued → Running → Done**; untargeted tasks
auto-route to the best agent.

## Brand (non-negotiable)

- **Neon pink** `#FF2EC4` — primary accent, glow, focus.
- **Cream white** `#F6EDD8` — text and light surfaces.
- **Dark YAML** base `#0B0B0D` — terminal/editor feel, scanlines.
- Mono = JetBrains Mono (system, ids, code). Sans = Space Grotesk (prose).
- Tokens live in `src/app/globals.css`. Never hardcode hex in components —
  use the `pink` / `cream` / `surface` Tailwind tokens.

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
intelligence) · `graphify` (Hive Mind graphs) · `superpowers`.

## Conventions

- Read the Next.js docs note above — this is Next 16 / Tailwind v4 / React 19.
- `npm run build` must pass before every commit.
- Every consequential action is append-only auditable (see `/audit`).

