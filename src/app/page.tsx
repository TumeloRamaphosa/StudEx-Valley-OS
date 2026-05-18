import { PageHeader, Card, Badge, Stat } from "@/components/ui";
import { Bot, Sparkles } from "lucide-react";

type Task = {
  id: string;
  title: string;
  agent: string;
  tag: string;
};

const COLUMNS: { key: "queued" | "running" | "done"; label: string; tasks: Task[] }[] = [
  {
    key: "queued",
    label: "Queued",
    tasks: [
      { id: "TSK-241", title: "Draft weekly student-exchange newsletter", agent: "Content", tag: "comms" },
      { id: "TSK-242", title: "Research partner universities in EU", agent: "Research", tag: "research" },
      { id: "TSK-243", title: "Reconcile housing invoices", agent: "Ops", tag: "finance" },
    ],
  },
  {
    key: "running",
    label: "Running",
    tasks: [
      { id: "TSK-238", title: "Summarize applicant interviews → memory", agent: "Main", tag: "triage" },
      { id: "TSK-240", title: "Sync Obsidian vault → semantic index", agent: "Research", tag: "memory" },
    ],
  },
  {
    key: "done",
    label: "Done",
    tasks: [
      { id: "TSK-235", title: "7:30 AM exchange-program brief", agent: "Ops", tag: "cron" },
      { id: "TSK-236", title: "Reply to 12 Telegram inbound", agent: "Comms", tag: "bridge" },
      { id: "TSK-237", title: "Audit kill-switch flips", agent: "Main", tag: "safety" },
    ],
  },
];

export default function MissionControl() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Mission Control"
        subtitle="Tasks flow Queued → Running → Done. Untargeted tasks auto-route to the best agent."
        action={
          <Badge tone="running">
            <Sparkles size={12} /> auto-assign on
          </Badge>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Agents" value="5" hint="Main · Comms · Content · Ops · Research" />
        <Stat label="Running" value="2" hint="live right now" />
        <Stat label="Queued" value="3" hint="awaiting pickup" />
        <Stat label="Done (24h)" value="14" hint="+3 vs yesterday" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {COLUMNS.map((col) => (
          <div key={col.key} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span
                  className={
                    col.key === "queued"
                      ? "h-2.5 w-2.5 rounded-full bg-queued"
                      : col.key === "running"
                        ? "h-2.5 w-2.5 rounded-full bg-pink animate-pulse"
                        : "h-2.5 w-2.5 rounded-full bg-done"
                  }
                />
                <h2 className="font-mono text-sm text-cream-bright">
                  {col.label}
                </h2>
              </div>
              <span className="font-mono text-xs text-cream-faint">
                {col.tasks.length.toString().padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-border-soft bg-surface/40 p-3 min-h-[60vh]">
              {col.tasks.map((t) => (
                <Card
                  key={t.id}
                  className="cursor-pointer p-4 transition-all hover:glow-pink hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-cream-faint">
                      {t.id}
                    </span>
                    <Badge tone="muted">{t.tag}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-cream leading-snug">
                    {t.title}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-cream-dim">
                    <Bot size={13} className="text-pink" />
                    <span className="font-mono">{t.agent}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
