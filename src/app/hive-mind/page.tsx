import { PageHeader, Card, Badge } from "@/components/ui";

const NODES = [
  { id: "Main", x: 50, y: 45, r: 22 },
  { id: "Comms", x: 22, y: 22, r: 15 },
  { id: "Content", x: 80, y: 24, r: 15 },
  { id: "Ops", x: 24, y: 76, r: 15 },
  { id: "Research", x: 78, y: 74, r: 15 },
  { id: "Memory", x: 50, y: 88, r: 12 },
];

const EDGES = [
  ["Main", "Comms"],
  ["Main", "Content"],
  ["Main", "Ops"],
  ["Main", "Research"],
  ["Research", "Memory"],
  ["Ops", "Memory"],
];

const pos = (id: string) => NODES.find((n) => n.id === id)!;

export default function HiveMindPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Hive Mind"
        subtitle="One hive_mind_log, three views. This is the 2D force-directed graph."
        action={
          <div className="flex gap-2">
            <Badge tone="running">2D graph</Badge>
            <Badge tone="muted">list</Badge>
            <Badge tone="muted">3D brain</Badge>
          </div>
        }
      />

      <Card className="p-0 overflow-hidden">
        <svg viewBox="0 0 100 100" className="h-[60vh] w-full">
          {EDGES.map(([a, b], i) => {
            const p1 = pos(a);
            const p2 = pos(b);
            return (
              <line
                key={i}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="#ff2ec4"
                strokeOpacity="0.35"
                strokeWidth="0.4"
              />
            );
          })}
          {NODES.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r / 6 + 2}
                fill="#ff2ec4"
                fillOpacity="0.12"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r / 8 + 1.4}
                fill="#141418"
                stroke="#ff2ec4"
                strokeWidth="0.5"
              />
              <text
                x={n.x}
                y={n.y + n.r / 8 + 5}
                textAnchor="middle"
                fontSize="2.6"
                fill="#f6edd8"
                fontFamily="monospace"
              >
                {n.id}
              </text>
            </g>
          ))}
        </svg>
      </Card>

      <p className="mt-4 text-center text-[12px] text-cream-faint">
        If the list view is operational, layer 2D and 3D on top later — same
        underlying table.
      </p>
    </div>
  );
}
