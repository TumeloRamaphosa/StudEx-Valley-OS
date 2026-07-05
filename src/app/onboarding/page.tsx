"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui";
import { Badge } from "@/components/ui";
import {
  ArrowRight, ArrowLeft, Check, Bot, Globe, Building2, Zap,
  Users, MessageSquare, Cpu, Shield, Snowflake, CalendarDays,
  Loader2, Sparkles, ChevronRight, Star,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "pharma" | "cloud" | "markets" | "bridge" | null;
type Stack = { lark: boolean; slack: boolean; discord: boolean };
type Agent = "research" | "outreach" | "compliance" | "pipeline" | "coldchain" | "tradeweek";

const ROLES = [
  {
    id: "pharma" as Role,
    emoji: "💊",
    title: "Pharmaceutical Distributor",
    desc: "Africa-first pharma distribution — JHB hub, cold chain, government tenders",
  },
  {
    id: "cloud" as Role,
    emoji: "☁️",
    title: "AI Cloud Operator",
    desc: "Orgo VM orchestration, Lark + Slack multi-channel agent deployment",
  },
  {
    id: "markets" as Role,
    emoji: "🌍",
    title: "Global Markets Agent",
    desc: "SA-Russia trade, AfricaBiz bridge, Russian partner coordination",
  },
  {
    id: "bridge" as Role,
    emoji: "🤝",
    title: "Trade Bridge",
    desc: "Connect Russian pharma + African distribution networks",
  },
];

const STACKS = [
  { id: "lark" as const, icon: MessageSquare, label: "Lark", desc: "China / Russia clients", color: "#00A3E0" },
  { id: "slack" as const, icon: MessageSquare, label: "Slack", desc: "Western market", color: "#4A154B" },
  { id: "discord" as const, icon: MessageSquare, label: "Discord", desc: "Community & dev", color: "#5865F2" },
];

const AGENTS = [
  { id: "research" as Agent, icon: Globe, label: "Research Agent", desc: "China AI intel + Africa trade briefs" },
  { id: "outreach" as Agent, icon: Users, label: "Outreach Agent", desc: "Tencent, ByteDance, NVIDIA, Anthropic" },
  { id: "compliance" as Agent, icon: Shield, label: "Compliance Agent", desc: "Government VM structure + SA regulations" },
  { id: "pipeline" as Agent, icon: CalendarDays, label: "Pipeline Tracker", desc: "Deal pipeline + trade week ops" },
  { id: "coldchain" as Agent, icon: Snowflake, label: "Cold Chain Monitor", desc: "Rwanda + SA cold storage IoT" },
  { id: "tradeweek" as Agent, icon: Star, label: "Trade Week Coord", desc: "SA-Russia Trade Week events" },
];

const LOADING_STEPS = [
  "Connecting Lark workspace...",
  "Registering agents to Obsidian brain...",
  "Provisioning Government VMs...",
  "Syncing to Rwanda cold storage...",
  "Publishing to SA-Russia Trade Week...",
  "Activating QwenPaw multi-channel...",
  "Your workspace is ready.",
];

const PREVIEW_AGENTS_MAP: Record<Agent, string> = {
  research: "Research",
  outreach: "Outreach",
  compliance: "Compliance",
  pipeline: "Pipeline",
  coldchain: "Cold Chain",
  tradeweek: "Trade Week",
};

// ─── Live Preview ─────────────────────────────────────────────────────────────

function LivePreview({
  role,
  stack,
  agents,
  selectedColor,
}: {
  role: Role;
  stack: Stack;
  agents: Agent[];
  selectedColor: string;
}) {
  const name = role
    ? ROLES.find((r) => r.id === role)?.title ?? "Your Hub"
    : "Your Hub";

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface-2)",
      }}
    >
      {/* Mock Topbar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: selectedColor }}
          />
          <span className="font-mono text-xs" style={{ color: "var(--ink)" }}>
            {name}
          </span>
        </div>
        <div className="flex gap-2">
          {(Object.keys(stack) as (keyof Stack)[]).map((k) =>
            stack[k] ? (
              <div
                key={k}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: selectedColor, opacity: 0.6 }}
              />
            ) : null
          )}
        </div>
      </div>

      {/* Mock Sidebar */}
      <div className="p-3 space-y-2">
        {["Dashboard", "Agents", "Memory", "Scheduler"].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs"
            style={{
              color: "var(--ink-dim)",
              background: "var(--surface-3)",
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-sm"
              style={{ backgroundColor: selectedColor, opacity: 0.7 }}
            />
            {item}
          </div>
        ))}

        {/* Active agents */}
        {agents.map((a) => (
          <div
            key={a}
            className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs"
            style={{
              color: "var(--ink)",
              background: "rgba(255,46,196,0.1)",
              borderLeft: `2px solid ${selectedColor}`,
            }}
          >
            <Bot size={10} style={{ color: selectedColor }} />
            {PREVIEW_AGENTS_MAP[a]}
          </div>
        ))}

        {agents.length === 0 && (
          <div
            className="text-xs font-mono px-3 py-2"
            style={{ color: "var(--ink-faint)" }}
          >
            Select agents on the left →
          </div>
        )}
      </div>

      {/* Mock welcome msg */}
      <div
        className="mx-3 mb-3 p-3 rounded-xl text-xs"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-soft)",
          color: "var(--ink)",
        }}
      >
        Welcome to {name}. Your agent swarm is ready.
      </div>
    </div>
  );
}

// ─── Loading Screen ──────────────────────────────────────────────────────────

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);

  useState(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        if (s >= LOADING_STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(onDone, 600);
          return s;
        }
        return s + 1;
      });
    }, 500);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      {/* Progress circle */}
      <div className="relative">
        <svg className="w-24 h-24 animate-spin" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="var(--border)"
            strokeWidth="6"
          />
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="var(--pink)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="264"
            strokeDashoffset="66"
            style={{ filter: "drop-shadow(0 0 8px var(--pink-glow))" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles size={20} style={{ color: "var(--pink)" }} />
        </div>
      </div>

      <div className="text-center">
        <p className="font-mono text-xl" style={{ color: "var(--ink-strong)" }}>
          Building workspace...
        </p>
        <p
          className="font-mono text-sm mt-3 min-h-[1.5rem] transition-all"
          style={{ color: "var(--ink-dim)" }}
        >
          {LOADING_STEPS[step]}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {LOADING_STEPS.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{
              background: i <= step ? "var(--pink)" : "var(--border)",
              boxShadow: i <= step ? "0 0 6px var(--pink-glow)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Step Components ─────────────────────────────────────────────────────────

function Step1Role({ value, onChange }: { value: Role; onChange: (r: Role) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {ROLES.map((role) => (
        <button
          key={role.id}
          onClick={() => onChange(role.id)}
          className="text-left p-5 rounded-xl border transition-all hover:-translate-y-0.5"
          style={{
            borderColor: value === role.id ? "var(--pink)" : "var(--border-soft)",
            background: value === role.id
              ? "rgba(255,46,196,0.12)"
              : "var(--surface-2)",
            boxShadow: value === role.id
              ? "0 0 20px rgba(255,46,196,0.25)"
              : "none",
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{role.emoji}</span>
            <div>
              <p className="font-mono text-sm font-semibold" style={{ color: "var(--ink-strong)" }}>
                {role.title}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--ink-dim)" }}>
                {role.desc}
              </p>
            </div>
          </div>
          {value === role.id && (
            <div className="mt-3 flex items-center gap-1.5">
              <Check size={12} style={{ color: "var(--pink)" }} />
              <span className="text-xs font-mono" style={{ color: "var(--pink)" }}>Selected</span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

function Step2Name({
  value,
  onChange,
  role,
}: {
  value: string;
  onChange: (v: string) => void;
  role: Role;
}) {
  const defaults: Record<string, string> = {
    pharma: "Africa Pharma Hub",
    cloud: "AI Cloud Command",
    markets: "Global Markets Bridge",
    bridge: "Trade Connect Hub",
  };

  return (
    <div className="max-w-md">
      <label className="block font-mono text-sm mb-2" style={{ color: "var(--ink)" }}>
        Name your workspace
      </label>
      <input
        type="text"
        value={value || defaults[role ?? "cloud"]}
        onChange={(e) => onChange(e.target.value)}
        placeholder={defaults[role ?? "cloud"]}
        className="w-full px-4 py-3 rounded-xl border font-mono text-sm outline-none"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface-2)",
          color: "var(--ink)",
        }}
        autoFocus
      />
      <p className="text-xs mt-2" style={{ color: "var(--ink-faint)" }}>
        You can always change this later.
      </p>
    </div>
  );
}

function Step3Stack({
  value,
  onChange,
}: {
  value: Stack;
  onChange: (s: Stack) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {STACKS.map((s) => {
        const active = value[s.id];
        const Icon = s.icon;
        return (
          <button
            key={s.id}
            onClick={() => onChange({ ...value, [s.id]: !value[s.id] })}
            className="flex flex-col items-center gap-3 p-6 rounded-xl border transition-all hover:-translate-y-0.5"
            style={{
              borderColor: active ? s.color : "var(--border-soft)",
              background: active ? `${s.color}18` : "var(--surface-2)",
              boxShadow: active ? `0 0 16px ${s.color}40` : "none",
            }}
          >
            <Icon size={24} style={{ color: active ? s.color : "var(--ink-dim)" }} />
            <div className="text-center">
              <p className="font-mono text-sm font-semibold" style={{ color: active ? s.color : "var(--ink)" }}>
                {s.label}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--ink-faint)" }}>
                {s.desc}
              </p>
            </div>
            <div
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
              style={{
                borderColor: active ? s.color : "var(--border)",
                background: active ? s.color : "transparent",
              }}
            >
              {active && <Check size={10} color="white" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function Step4Agents({
  value,
  onChange,
  selectedColor,
}: {
  value: Agent[];
  onChange: (a: Agent[]) => void;
  selectedColor: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {AGENTS.map((agent) => {
        const active = value.includes(agent.id);
        const Icon = agent.icon;
        return (
          <button
            key={agent.id}
            onClick={() =>
              onChange(
                active
                  ? value.filter((a) => a !== agent.id)
                  : [...value, agent.id]
              )
            }
            className="text-left p-4 rounded-xl border transition-all hover:-translate-y-0.5"
            style={{
              borderColor: active ? selectedColor : "var(--border-soft)",
              background: active ? `${selectedColor}18` : "var(--surface-2)",
              boxShadow: active ? `0 0 14px ${selectedColor}30` : "none",
            }}
          >
            <Icon size={18} style={{ color: active ? selectedColor : "var(--ink-dim)" }} />
            <p className="font-mono text-xs font-semibold mt-2" style={{ color: "var(--ink)" }}>
              {agent.label}
            </p>
            <p className="text-[10px] mt-1" style={{ color: "var(--ink-faint)" }}>
              {agent.desc}
            </p>
            <div className="mt-2">
              <div
                className="w-4 h-4 rounded border flex items-center justify-center"
                style={{
                  borderColor: active ? selectedColor : "var(--border)",
                  background: active ? selectedColor : "transparent",
                }}
              >
                {active && <Check size={8} color="white" />}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function Step5Invite({
  values,
  onChange,
}: {
  values: { gov: string; russia: string; sa: string };
  onChange: (v: typeof values) => void;
}) {
  return (
    <div className="space-y-4 max-w-lg">
      {[
        { key: "gov" as const, label: "Government VM Partner", placeholder: "e.g. botlhapelo@gov.bw", desc: "Botswana / Eswatini / Mozambique government" },
        { key: "russia" as const, label: "Russian Partner", placeholder: "e.g. natalia@africabiz.ru", desc: "Bridge builder — Natalia Mordvinova" },
        { key: "sa" as const, label: "South Africa Ops", placeholder: "e.g. ops@studexmeat.com", desc: "Johannesburg + Cape Town facility" },
      ].map((field) => (
        <div key={field.key}>
          <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--ink)" }}>
            {field.label}
          </label>
          <input
            type="email"
            value={values[field.key]}
            onChange={(e) => onChange({ ...values, [field.key]: e.target.value })}
            placeholder={field.placeholder}
            className="w-full px-4 py-2.5 rounded-lg border font-mono text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface-2)",
              color: "var(--ink)",
            }}
          />
          <p className="text-[10px] mt-1" style={{ color: "var(--ink-faint)" }}>
            {field.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Main Onboarding ──────────────────────────────────────────────────────────

const TOTAL_STEPS = 5;
const COLOR_OPTIONS = ["#ff2ec4", "#39ffaa", "#c9a84c", "#8a6bff", "#ff6b35"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<Role>(null);
  const [name, setName] = useState("");
  const [stack, setStack] = useState<Stack>({ lark: true, slack: false, discord: false });
  const [agents, setAgents] = useState<Agent[]>(["research", "pipeline"]);
  const [invites, setInvites] = useState({ gov: "", russia: "", sa: "" });
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [loading, setLoading] = useState(false);

  const canContinue = () => {
    if (step === 0) return role !== null;
    if (step === 1) return true;
    if (step === 2) return Object.values(stack).some(Boolean);
    if (step === 3) return agents.length > 0;
    return true;
  };

  if (loading) return <LoadingScreen onDone={() => (window.location.href = "/")} />;

  const stepLabel = ["Role", "Name", "Stack", "Agents", "Invite"][step];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-2xl" style={{ color: "var(--ink-strong)" }}>
            Let's get Started
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--ink-dim)" }}>
            Answer a few questions to set up your workspace.
          </p>
        </div>
        <Badge tone="muted">
          Step {step + 1} of {TOTAL_STEPS}
        </Badge>
      </div>

      {/* Progress bar */}
      <div className="mb-8 flex gap-1.5">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-500"
            style={{
              background: i <= step ? "var(--pink)" : "var(--border)",
              boxShadow: i <= step ? "0 0 8px var(--pink-glow)" : "none",
            }}
          />
        ))}
      </div>

      {/* Content — 2 columns on large screens */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left: step content */}
        <div>
          {step === 0 && <Step1Role value={role} onChange={setRole} />}
          {step === 1 && <Step2Name value={name} onChange={setName} role={role} />}
          {step === 2 && <Step3Stack value={stack} onChange={setStack} />}
          {step === 3 && <Step4Agents value={agents} onChange={setAgents} selectedColor={color} />}
          {step === 4 && <Step5Invite values={invites} onChange={setInvites} />}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all disabled:opacity-30"
              style={{ color: "var(--ink-dim)" }}
            >
              <ArrowLeft size={14} /> Back
            </button>

            {step < TOTAL_STEPS - 1 ? (
              <button
                onClick={() => canContinue() && setStep((s) => s + 1)}
                disabled={!canContinue()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-sm font-semibold transition-all disabled:opacity-30 hover:-translate-y-0.5"
                style={{
                  background: "var(--pink)",
                  color: "white",
                  boxShadow: canContinue() ? "0 0 20px var(--pink-glow)" : "none",
                }}
              >
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => setLoading(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-sm font-semibold transition-all hover:-translate-y-0.5"
                style={{
                  background: "var(--gold)",
                  color: "var(--bg)",
                  boxShadow: "0 0 20px var(--gold-glow)",
                }}
              >
                <Zap size={14} /> Build Workspace
              </button>
            )}
          </div>
        </div>

        {/* Right: live preview (steps 1–4) */}
        {step < 4 && (
          <div className="lg:sticky lg:top-6">
            {/* Color pickers for step 3+ */}
            {step >= 2 && (
              <div className="flex gap-2 mb-4">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className="w-6 h-6 rounded-full border-2 transition-all"
                    style={{
                      background: c,
                      borderColor: color === c ? "white" : "transparent",
                      boxShadow: color === c ? `0 0 8px ${c}` : "none",
                    }}
                  />
                ))}
              </div>
            )}
            <LivePreview role={role} stack={stack} agents={agents} selectedColor={color} />
          </div>
        )}
      </div>

      {/* Skip */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setLoading(true)}
          className="text-xs font-mono"
          style={{ color: "var(--ink-faint)" }}
        >
          Skip setup — go to workspace →
        </button>
      </div>
    </div>
  );
}
