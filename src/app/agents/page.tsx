import { PageHeader, Card, Badge } from "@/components/ui";
import { PixelMech, MECH_PALETTES } from "@/components/pixel-mech";
import { Cpu, Wrench, Lightbulb } from "lucide-react";

const AGENTS = [
  { name: "Main", alias: "PRIME", model: "claude-opus-4-7", tools: 9, persona: "Orchestrator. Triages, consolidates, owns the war room." },
  { name: "Comms", alias: "BUZZ", model: "claude-sonnet-4-6", tools: 6, persona: "Email, Telegram, Slack, WhatsApp. Fast replies, human tone." },
  { name: "Content", alias: "VIVID", model: "claude-sonnet-4-6", tools: 5, persona: "Newsletters, posts, briefs. On-brand neon-pink voice." },
  { name: "Ops", alias: "STEEL", model: "claude-haiku-4-5", tools: 7, persona: "Cron jobs, invoices, housekeeping. Quiet and reliable." },
  { name: "Research", alias: "SKYE", model: "claude-opus-4-7", tools: 8, persona: "Deep research, vault sync, semantic memory curation." },
];

export default function AgentsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="The Team"
        subtitle="Five autobots, one swarm. Each agent is a folder: agent.yaml (model + tools) and CLAUDE.md (persona)."
        action={<Badge tone="muted">_template → copy to grow the team</Badge>}
      />

      <Card className="mb-6 flex items-start gap-3 border-pink/30 bg-pink/5">
        <Lightbulb size={18} className="mt-0.5 shrink-0 text-pink" />
        <div className="text-sm text-ink">
          <span className="text-ink-strong font-medium">Suggestion · </span>
          Your <span className="font-mono text-pink">Comms</span> agent handles email,
          Telegram, Slack, and WhatsApp. Consider splitting an{" "}
          <span className="font-mono">Email Manager</span> bot.
          <span className="text-ink-faint"> Nudge only — you decide.</span>
        </div>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {AGENTS.map((a) => {
          const p = MECH_PALETTES[a.name];
          return (
            <Card
              key={a.name}
              className="group flex flex-col items-center p-0 overflow-hidden transition-all hover:glow-pink hover:-translate-y-1"
            >
              {/* stage */}
              <div
                className="relative flex w-full justify-center pt-8 pb-6"
                style={{
                  background: `radial-gradient(120% 90% at 50% 0%, ${p.body}22, transparent 70%)`,
                }}
              >
                <div className="absolute right-3 top-3">
                  <Badge tone="done">live</Badge>
                </div>
                <PixelMech
                  palette={p}
                  size={184}
                  className="drop-shadow-[0_14px_18px_rgba(20,16,8,0.18)] transition-transform duration-300 group-hover:scale-105 group-hover:animate-bob"
                />
                {/* floor shadow */}
                <div className="absolute bottom-4 h-2 w-28 rounded-full bg-ink/15 blur-md" />
              </div>

              {/* nameplate */}
              <div className="w-full border-t border-border px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-mono text-lg text-ink-strong tracking-tight">
                    {a.name}
                  </h2>
                  <span
                    className="font-mono text-xs font-bold tracking-[0.2em]"
                    style={{ color: p.accent }}
                  >
                    {a.alias}
                  </span>
                </div>
                <div className="text-[11px] text-ink-faint">
                  agents/{a.name.toLowerCase()}/
                </div>
                <p className="mt-3 text-sm text-ink-dim leading-relaxed">
                  {a.persona}
                </p>
                <div className="mt-4 flex items-center gap-4 text-[11px] font-mono text-ink-faint">
                  <span className="flex items-center gap-1.5">
                    <Cpu size={12} className="text-pink" /> {a.model}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Wrench size={12} className="text-gold-dim" /> {a.tools} tools
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
