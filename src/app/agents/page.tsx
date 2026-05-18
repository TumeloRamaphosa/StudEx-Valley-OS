import { PageHeader, Card, Badge } from "@/components/ui";
import { Bot, Cpu, Wrench, Lightbulb } from "lucide-react";

const AGENTS = [
  { name: "Main", model: "claude-opus-4-7", tools: 9, persona: "Orchestrator. Triages, consolidates, owns the war room." },
  { name: "Comms", model: "claude-sonnet-4-6", tools: 6, persona: "Email, Telegram, Slack, WhatsApp. Fast replies, human tone." },
  { name: "Content", model: "claude-sonnet-4-6", tools: 5, persona: "Newsletters, posts, briefs. On-brand neon-pink voice." },
  { name: "Ops", model: "claude-haiku-4-5", tools: 7, persona: "Cron jobs, invoices, housekeeping. Quiet and reliable." },
  { name: "Research", model: "claude-opus-4-7", tools: 8, persona: "Deep research, vault sync, semantic memory curation." },
];

export default function AgentsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Agents"
        subtitle="Every agent is a folder: agent.yaml (model + tools) and CLAUDE.md (persona)."
        action={<Badge tone="muted">_template → copy to grow the team</Badge>}
      />

      <Card className="mb-6 flex items-start gap-3 border-pink/30 bg-pink/5">
        <Lightbulb size={18} className="mt-0.5 shrink-0 text-pink" />
        <div className="text-sm text-cream">
          <span className="text-cream-bright font-medium">Suggestion · </span>
          Your <span className="font-mono text-pink">Comms</span> agent handles email,
          Telegram, Slack, and WhatsApp. Consider splitting an{" "}
          <span className="font-mono">Email Manager</span> agent.
          <span className="text-cream-faint"> Nudge only — you decide.</span>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {AGENTS.map((a) => (
          <Card key={a.name} className="transition-all hover:glow-pink">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg grain glow-pink">
                  <Bot size={18} className="text-pink" />
                </div>
                <div>
                  <div className="font-mono text-cream-bright">{a.name}</div>
                  <div className="text-[11px] text-cream-faint">agents/{a.name.toLowerCase()}/</div>
                </div>
              </div>
              <Badge tone="done">live</Badge>
            </div>
            <p className="mt-4 text-sm text-cream-dim leading-relaxed">{a.persona}</p>
            <div className="mt-4 flex items-center gap-4 text-[11px] font-mono text-cream-faint">
              <span className="flex items-center gap-1.5">
                <Cpu size={12} className="text-pink" /> {a.model}
              </span>
              <span className="flex items-center gap-1.5">
                <Wrench size={12} className="text-pink" /> {a.tools} tools
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
