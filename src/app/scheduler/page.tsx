import { PageHeader, Card, Badge } from "@/components/ui";
import { Clock, ToggleRight } from "lucide-react";

const JOBS = [
  { name: "Exchange-program brief", english: "Every weekday at 7:30 AM", cron: "30 7 * * 1-5", agent: "Ops", on: true },
  { name: "Vault → semantic re-index", english: "Every night at 2:00 AM", cron: "0 2 * * *", agent: "Research", on: true },
  { name: "Weekly newsletter draft", english: "Mondays at 6:00 AM", cron: "0 6 * * 1", agent: "Content", on: true },
  { name: "Inbox triage sweep", english: "Every 2 hours, 8 AM–8 PM", cron: "0 8-20/2 * * *", agent: "Comms", on: false },
];

export default function SchedulerPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Scheduler"
        subtitle="Cron under the hood. Plain English in front of you. Edit raw cron in Advanced."
        action={<Badge tone="done">SCHEDULER_ENABLED</Badge>}
      />

      <div className="space-y-3">
        {JOBS.map((j) => (
          <Card
            key={j.name}
            className="flex items-center gap-4 transition-all hover:glow-pink"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg grain">
              <Clock size={17} className="text-pink" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-mono text-sm text-ink-strong">{j.name}</div>
              <div className="text-[12px] text-ink-dim">
                {j.english}{" "}
                <span className="ml-1 rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">
                  {j.cron}
                </span>
              </div>
            </div>
            <Badge tone="muted">{j.agent}</Badge>
            <ToggleRight
              size={28}
              className={j.on ? "text-pink" : "text-ink-faint rotate-180"}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
