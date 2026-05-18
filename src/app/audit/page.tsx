import { PageHeader, Card, Badge } from "@/components/ui";

const ROWS = [
  { t: "09:48:02", cid: "c-7f3a", actor: "Content", event: "tool.write", detail: "newsletter-draft.md → review queue", kind: "tool" },
  { t: "09:12:55", cid: "c-7f3a", actor: "Main", event: "task.route", detail: "TSK-242 → Research (auto-assign)", kind: "route" },
  { t: "08:30:11", cid: "c-91bd", actor: "system", event: "killswitch.flip", detail: "MISSION_AUTO_ASSIGN_ENABLED = true", kind: "safety" },
  { t: "07:30:00", cid: "c-44e0", actor: "Ops", event: "cron.fire", detail: "Exchange-program brief sent (Telegram)", kind: "cron" },
  { t: "02:00:09", cid: "c-2a17", actor: "Research", event: "memory.reindex", detail: "Obsidian vault → 3,402 embeddings", kind: "memory" },
];

const tone = (k: string) =>
  k === "safety" ? "warn" : k === "route" ? "running" : k === "cron" ? "done" : "muted";

export default function AuditPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Audit"
        subtitle="Append-only. 90-day retention. Correlation IDs group one user turn."
        action={<Badge tone="done">append-only · pinned survive prune</Badge>}
      />

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-[12px]">
            <thead className="border-b border-border font-mono text-cream-faint">
              <tr>
                <th className="px-5 py-3 font-normal">time</th>
                <th className="px-3 py-3 font-normal">corr-id</th>
                <th className="px-3 py-3 font-normal">actor</th>
                <th className="px-3 py-3 font-normal">event</th>
                <th className="px-3 py-3 font-normal">detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ROWS.map((r, i) => (
                <tr key={i} className="font-mono hover:bg-surface-2/50">
                  <td className="whitespace-nowrap px-5 py-3 text-cream-dim">{r.t}</td>
                  <td className="px-3 py-3 text-cream-faint">{r.cid}</td>
                  <td className="px-3 py-3 text-pink">{r.actor}</td>
                  <td className="px-3 py-3">
                    <Badge tone={tone(r.kind) as "warn" | "running" | "done" | "muted"}>
                      {r.event}
                    </Badge>
                  </td>
                  <td className="px-3 py-3 text-cream">{r.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
