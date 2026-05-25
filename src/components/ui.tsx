import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h1 className="font-mono text-2xl text-ink-strong tracking-tight">
          {title}
        </h1>
        <p className="mt-1 text-sm text-ink-dim">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("surface-card p-5", className)}>{children}</div>
  );
}

const TONES = {
  queued: "text-queued border-queued/40 bg-queued/10",
  running: "text-pink border-pink/40 bg-pink/10",
  done: "text-done border-done/40 bg-done/10",
  warn: "text-warn border-warn/40 bg-warn/10",
  muted: "text-ink-dim border-border bg-surface-2",
} as const;

export function Badge({
  tone = "muted",
  children,
}: {
  tone?: keyof typeof TONES;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-mono",
        TONES[tone]
      )}
    >
      {children}
    </span>
  );
}

export function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card className="flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
        {label}
      </span>
      <span className="font-mono text-2xl text-ink-strong text-glow">
        {value}
      </span>
      {hint && <span className="text-[11px] text-ink-dim">{hint}</span>}
    </Card>
  );
}
