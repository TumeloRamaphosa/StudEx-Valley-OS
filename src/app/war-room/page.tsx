import { PageHeader, Card, Badge } from "@/components/ui";
import { Swords, Terminal } from "lucide-react";

const REPORTS = [
  { agent: "Comms", wrapped: "Cleared 12 Telegram threads", queued: "Draft 3 partner replies", blocked: "—" },
  { agent: "Content", wrapped: "Newsletter draft v1", queued: "Social cutdowns", blocked: "Awaiting brand sign-off" },
  { agent: "Ops", wrapped: "Invoices reconciled", queued: "Housing CSV import", blocked: "Missing Q2 CSV" },
  { agent: "Research", wrapped: "EU partner shortlist", queued: "Vault re-index", blocked: "—" },
];

export default function WarRoomPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="War Room"
        subtitle="Five agents, one prompt. Each runs in isolation; Main consolidates last."
        action={<Badge tone="running">5 seated</Badge>}
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <button className="flex items-center gap-2 rounded-lg bg-pink px-4 py-2 text-sm font-medium text-ink-strong transition-transform hover:scale-[1.03] active:scale-95">
          <Terminal size={15} /> /standup
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-pink/40 bg-pink/10 px-4 py-2 text-sm font-medium text-pink transition-colors hover:bg-pink/20">
          <Swords size={15} /> /discuss
        </button>
      </div>

      <Card className="p-0">
        <div className="border-b border-border px-5 py-3 font-mono text-xs text-ink-faint">
          /standup · {new Date().toISOString().slice(0, 10)} · morning report
        </div>
        <div className="divide-y divide-border">
          {REPORTS.map((r) => (
            <div key={r.agent} className="grid grid-cols-[90px_1fr] gap-4 px-5 py-4 sm:grid-cols-[90px_1fr_1fr_1fr]">
              <div className="font-mono text-sm text-pink">{r.agent}</div>
              <div className="text-[12px]">
                <span className="text-ink-faint">wrapped · </span>
                <span className="text-ink">{r.wrapped}</span>
              </div>
              <div className="text-[12px]">
                <span className="text-ink-faint">queued · </span>
                <span className="text-ink">{r.queued}</span>
              </div>
              <div className="text-[12px]">
                <span className="text-ink-faint">blocked · </span>
                <span className={r.blocked === "—" ? "text-ink-dim" : "text-warn"}>
                  {r.blocked}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border bg-pink/5 px-5 py-4 text-sm text-ink">
          <span className="font-mono text-pink">Main · consolidated · </span>
          Two real blockers: brand sign-off on the newsletter and the missing Q2
          housing CSV. Everything else is on track for the weekly ship.
        </div>
      </Card>
    </div>
  );
}
