import { PageHeader, Card, Badge, Stat } from "@/components/ui";
import { Search, Layers, Sparkles, Pin } from "lucide-react";

const LAYERS = [
  { icon: Search, name: "Layer 1 · FTS5 keyword", note: "Fast exact-match search. Misses semantic similarity." },
  { icon: Layers, name: "Layer 2 · Embeddings", note: "Semantic recall — catches meaning even without keyword overlap." },
  { icon: Sparkles, name: "Layer 3 · Salience", note: "Memories useful in past answers get boosted. Merged at query time." },
];

const MEMS = [
  { text: "User brand: neon pink #FF2EC4 + gold #C9A84C on cream paper #FBF6E9 (daylight).", score: 0.97, pinned: true },
  { text: "Obsidian vault '2nd Brain' is the source-of-truth knowledge corpus.", score: 0.94, pinned: true },
  { text: "Weekly exchange newsletter ships Mondays 07:30 via Ops cron.", score: 0.81, pinned: false },
  { text: "Prefers Telegram over Slack for on-the-go approvals.", score: 0.76, pinned: false },
];

export default function MemoriesPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Memories"
        subtitle="Three-layer hybrid recall. Old memories decay; pinned memories never do."
        action={<Badge tone="running">supermemory linked</Badge>}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat label="Indexed" value="3.4k" hint="vault + conversations" />
        <Stat label="Pinned" value="12" hint="never decay" />
        <Stat label="Recall / turn" value="10" hint="injected as context" />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {LAYERS.map((l) => {
          const Icon = l.icon;
          return (
            <Card key={l.name}>
              <Icon size={18} className="text-pink" />
              <div className="mt-3 font-mono text-sm text-ink-strong">{l.name}</div>
              <p className="mt-1 text-[12px] text-ink-dim leading-relaxed">{l.note}</p>
            </Card>
          );
        })}
      </div>

      <Card className="p-0">
        <div className="border-b border-border px-5 py-3 font-mono text-xs text-ink-faint">
          ranked recall · query: &quot;brand + cadence&quot;
        </div>
        <div className="divide-y divide-border">
          {MEMS.map((m, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3.5">
              {m.pinned ? (
                <Pin size={14} className="shrink-0 text-pink" />
              ) : (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint" />
              )}
              <p className="flex-1 text-sm text-ink">{m.text}</p>
              <span className="font-mono text-xs text-ink-faint">
                {m.score.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
