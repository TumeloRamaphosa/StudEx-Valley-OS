# StudEx Valley OS — ClaudeClaw Mission Control

An AI operating system. A swarm of Claude agents you steer from a single
dark, neon-pink dashboard. Tasks flow **Queued → Running → Done** and
auto-route to the best agent for the job.

```
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before every commit
```

## Sections

| Route | What it is |
|---|---|
| `/` | **Mission Control** — Kanban + auto-assign |
| `/agents` | The team — each agent is `agent.yaml` + a persona |
| `/chat` | Every channel (Telegram/Slack/Discord/web) → one history |
| `/memories` | Three-layer hybrid recall, with pinning |
| `/scheduler` | Cron jobs written in plain English |
| `/hive-mind` | Force-directed graph of the swarm |
| `/war-room` | `/standup` + `/discuss` across all agents |
| `/audit` | Append-only trail with correlation IDs |

## Stack

Next.js 16 · React 19 · Tailwind v4 · TypeScript. Brand tokens in
`src/app/globals.css`. See `AGENTS.md` for the full brand + architecture
guide.

## Grow the team

```
cp -r agents/_template agents/<name>
$EDITOR agents/<name>/agent.yaml agents/<name>/CLAUDE.md
```
