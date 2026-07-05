"use client";

import { useState } from "react";
import {
  Server, MessageSquare, Globe, Bot, Lock, Wifi, WifiOff,
  ChevronRight, Cpu, Database, Shield, Zap, CheckCircle2,
  AlertTriangle, Loader2, ArrowRight, Layers,
} from "lucide-react";
import { Badge } from "@/components/ui";

// ─── Agent Registry Types ─────────────────────────────────────────────────────

interface VMNode {
  id: string;
  name: string;
  type: "orgo" | "daytona" | "local" | "discord";
  region: string;
  status: "online" | "offline" | "warn" | "provisioning";
  agents: string[];
  api: string;
  color: string;
  memory: number; // GB
  uptime: string;
  lastSeen: string;
}

interface PlatformNode {
  id: string;
  name: "Lark" | "Slack" | "Discord" | "All";
  icon: string;
  color: string;
  status: "connected" | "disconnected" | "syncing";
  channels: number;
  agents: number;
  lastSync: string;
  tagline: string;
}

interface RegisteredAgent {
  id: string;
  name: string;
  role: string;
  vm: string;
  platform: string;
  skills: string[];
  memory: string;
  status: "active" | "idle" | "training";
  uptime: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const VMS: VMNode[] = [
  { id: "orgo-main", name: "Orgo AI — agentsnestcloud", type: "orgo", region: "Johannesburg, SA", status: "online", agents: ["Research Agent", "Outreach Agent", "Cold Chain Monitor", "Pipeline Tracker"], api: "orgo_apo", color: "#39ffaa", memory: 32, uptime: "99.7%", lastSeen: "Just now" },
  { id: "orgo-russia", name: "Orgo AI — Russia Bridge", type: "orgo", region: "Moscow, RU (via SA)", status: "online", agents: ["Trade Week Coord", "Compliance Agent"], api: "orgo_apo", color: "#c41230", memory: 16, uptime: "97.4%", lastSeen: "2 min ago" },
  { id: "daytona-1", name: "Daytona — Dev Workspace", type: "daytona", region: "SA Cloud", status: "warn", agents: ["Dev Agent", "Build Agent"], api: "daytona-token", color: "#8a6bff", memory: 8, uptime: "89.1%", lastSeen: "14 min ago" },
  { id: "discord-bot", name: "ADAM SMASHER — Discord", type: "discord", region: "Cloud VM", status: "online", agents: ["ADAM SMASHER", "Trade Bot"], api: "DISCORD_BOT_TOKEN", color: "#5865F2", memory: 4, uptime: "99.9%", lastSeen: "Just now" },
  { id: "orgo-rwanda", name: "Orgo AI — Rwanda Cold Storage", type: "orgo", region: "Kigali, RW", status: "online", agents: ["Cold Chain Monitor", "Logistics Agent"], api: "orgo_apo", color: "#00A3E0", memory: 8, uptime: "98.8%", lastSeen: "5 min ago" },
  { id: "orgo-gov-bw", name: "Orgo AI — Botswana Gov VM", type: "orgo", region: "Gaborone, BW", status: "provisioning", agents: ["Gov Compliance", "Tender Tracker"], api: "orgo_apo", color: "#c9a84c", memory: 8, uptime: "—", lastSeen: "Provisioning" },
];

const PLATFORMS: PlatformNode[] = [
  { id: "lark", name: "Lark", icon: "📨", color: "#00A3E0", status: "connected", channels: 12, agents: 6, lastSync: "2 min ago", tagline: "China / Russia clients — Tencent built" },
  { id: "slack", name: "Slack", icon: "💬", color: "#4A154B", status: "connected", channels: 8, agents: 4, lastSync: "5 min ago", tagline: "Western market — native AI" },
  { id: "discord", name: "Discord", icon: "🎮", color: "#5865F2", status: "syncing", channels: 6, agents: 3, lastSync: "Syncing...", tagline: "Community & dev — agent-to-agent" },
  { id: "all", name: "All", icon: "🔗", color: "#ff2ec4", status: "connected", channels: 26, agents: 13, lastSync: "Live", tagline: "Unified agent mesh — all channels" },
];

const AGENTS: RegisteredAgent[] = [
  { id: "a1", name: "Research Agent", role: "China AI Intel", vm: "orgo-main", platform: "Lark", skills: ["Agent-Reach", "last30days", "QwenPaw"], memory: "4-tier progressive", status: "active", uptime: "99.2%" },
  { id: "a2", name: "Outreach Agent", role: "Partner Outreach", vm: "orgo-main", platform: "Lark + Slack", skills: ["Agent-Reach", "email-strategist"], memory: "4-tier progressive", status: "active", uptime: "98.7%" },
  { id: "a3", name: "Cold Chain Monitor", role: "IoT + Cold Storage", vm: "orgo-rwanda", platform: "Lark", skills: ["IoT monitoring", "Alert escalation"], memory: "2GB", status: "idle", uptime: "100%" },
  { id: "a4", name: "Pipeline Tracker", role: "Deal Pipeline", vm: "orgo-main", platform: "Slack", skills: ["Sales pipeline", "MEDDPICC"], memory: "1GB", status: "active", uptime: "99.9%" },
  { id: "a5", name: "Compliance Agent", role: "Government VM + SA Regs", vm: "orgo-russia", platform: "Lark", skills: ["legal-compliance", "SA government tender"], memory: "2GB", status: "active", uptime: "97.4%" },
  { id: "a6", name: "Trade Week Coord", role: "SA-Russia Trade Events", vm: "orgo-russia", platform: "Lark + Discord", skills: ["event-coord", "Russian language"], memory: "1.5GB", status: "active", uptime: "98.1%" },
  { id: "a7", name: "ADAM SMASHER", role: "Global Markets AI", vm: "discord-bot", platform: "Discord", skills: ["All of StudEx OS", "10yr anniversary"], memory: "Unlimited", status: "active", uptime: "99.9%" },
  { id: "a8", name: "Huashu Design Agent", role: "Visual Design", vm: "orgo-main", platform: "Slack", skills: ["Huashu Design", "40 philosophies", "HTML-native"], memory: "3GB", status: "training", uptime: "94.3%" },
];

const SKILL_INVENTORY = [
  { name: "QwenPaw", desc: "Multi-channel Lark/DingTalk/WeChat/Discord/Telegram/QQ — native Lark support", source: "share.google/dXr69MqQJab5dhMqX", status: "active" },
  { name: "Agent-Reach", desc: "Zero-API-fee internet — Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, LinkedIn", source: "share.google/IIYm7sTnN29j1z8LA", status: "active" },
  { name: "Huashu Design", desc: "HTML-native prototypes, 40 design philosophies, animations, MP4/GIF", source: "share.google/gVCG0LMIyU4t87yx4", status: "active" },
  { name: "last30days", desc: "Social trend monitoring across 30 platforms", source: "Embedded", status: "active" },
  { name: "second-brain", desc: "Brand voice, PPTX maker, MCP client, SOP creator, Remotion video", source: "Embedded", status: "active" },
  { name: "TencentDB Agent Memory", desc: "4-tier progressive memory pipeline — 61% token reduction", source: "share.google/DeAmo4VdvTEXwn0ds", status: "integrating" },
  { name: "Cult UI", desc: "92+ AI agent patterns (ReAct/plan-solve/RAG/tool-use)", source: "opensrcprojects.dev", status: "planned" },
  { name: "Agno AgentOS", desc: "Python agent framework — BYOC, MCP 50+ endpoints, JWT RBAC", source: "agno.com", status: "planned" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function VMStatusDot({ status }: { status: VMNode["status"] }) {
  const map = {
    online: { color: "var(--green)", glow: "var(--green-glow)", label: "Online" },
    offline: { color: "#ff4444", glow: "rgba(255,68,68,0.5)", label: "Offline" },
    warn: { color: "#ffcf4a", glow: "rgba(255,207,74,0.5)", label: "Warning" },
    provisioning: { color: "#8a6bff", glow: "rgba(138,107,255,0.5)", label: "Provisioning" },
  };
  const m = map[status];
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full" style={{ background: m.color, boxShadow: `0 0 6px ${m.glow}` }} />
      <span className="font-mono text-[10px]" style={{ color: m.color }}>{m.label}</span>
    </div>
  );
}

function PlatformCard({ platform }: { platform: PlatformNode }) {
  const iconMap: Record<string, string> = { connected: "var(--green)", syncing: "var(--pink)", disconnected: "#ff4444" };
  return (
    <div
      className="p-4 rounded-xl border flex flex-col gap-3 transition-all hover:-translate-y-0.5"
      style={{
        borderColor: platform.status === "syncing" ? "var(--pink)" : "var(--border-soft)",
        background: "var(--surface-2)",
        boxShadow: platform.status === "syncing" ? "0 0 16px rgba(255,46,196,0.2)" : "none",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{platform.icon}</span>
        <div>
          <p className="font-mono text-sm font-bold" style={{ color: platform.color }}>{platform.name}</p>
          <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{platform.tagline}</p>
        </div>
        <div className="ml-auto">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: iconMap[platform.status], boxShadow: `0 0 8px ${iconMap[platform.status]}` }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-center p-2 rounded-lg" style={{ background: "var(--surface-3)" }}>
          <p className="font-mono text-lg font-bold" style={{ color: platform.color }}>{platform.channels}</p>
          <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>Channels</p>
        </div>
        <div className="text-center p-2 rounded-lg" style={{ background: "var(--surface-3)" }}>
          <p className="font-mono text-lg font-bold" style={{ color: platform.color }}>{platform.agents}</p>
          <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>Agents</p>
        </div>
      </div>
      <p className="font-mono text-[10px] text-right" style={{ color: "var(--ink-faint)" }}>Last sync: {platform.lastSync}</p>
    </div>
  );
}

function AgentCard({ agent }: { agent: RegisteredAgent }) {
  return (
    <div
      className="p-4 rounded-xl border"
      style={{ borderColor: "var(--border-soft)", background: "var(--surface-2)" }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-mono text-sm font-bold truncate" style={{ color: "var(--ink)" }}>{agent.name}</p>
          <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{agent.role}</p>
        </div>
        <Badge tone={agent.status === "active" ? "done" : agent.status === "training" ? "running" : "muted"}>
          {agent.status}
        </Badge>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {agent.skills.map((s) => (
          <span key={s} className="font-mono text-[10px] px-2 py-0.5 rounded-full border" style={{
            borderColor: "var(--border)", color: "var(--ink-dim)",
          }}>{s}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 pt-2 border-t" style={{ borderColor: "var(--border-soft)" }}>
        <span className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{agent.vm}</span>
        <span className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{agent.uptime}</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AgentsRegistryPage() {
  const [activeTab, setActiveTab] = useState<"vms" | "platforms" | "agents" | "skills">("vms");
  const [selectedVM, setSelectedVM] = useState<VMNode | null>(null);

  const tabs = [
    { id: "vms" as const, label: "VMs", icon: Server, count: VMS.length },
    { id: "platforms" as const, label: "Platforms", icon: MessageSquare, count: 4 },
    { id: "agents" as const, label: "Agents", icon: Bot, count: AGENTS.length },
    { id: "skills" as const, label: "Skills", icon: Cpu, count: SKILL_INVENTORY.length },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-mono text-2xl" style={{ color: "var(--ink-strong)" }}>
          Agent Registry
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--ink-dim)" }}>
          Unified view — Orgo AI VMs · Lark · Slack · Discord · All skills
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl inline-flex" style={{ background: "var(--surface-2)", border: "1px solid var(--border-soft)" }}>
        {tabs.map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all"
            style={{
              background: activeTab === id ? "var(--surface-3)" : "transparent",
              color: activeTab === id ? "var(--ink-strong)" : "var(--ink-dim)",
              boxShadow: activeTab === id ? "0 0 12px rgba(255,46,196,0.15)" : "none",
            }}
          >
            <Icon size={14} />
            {label}
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full" style={{
              background: activeTab === id ? "var(--pink)" : "var(--border)",
              color: activeTab === id ? "white" : "var(--ink-faint)",
            }}>{count}</span>
          </button>
        ))}
      </div>

      {/* VMs Tab */}
      {activeTab === "vms" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VMS.map((vm) => (
            <div
              key={vm.id}
              onClick={() => setSelectedVM(selectedVM?.id === vm.id ? null : vm)}
              className="p-4 rounded-xl border cursor-pointer transition-all hover:-translate-y-0.5"
              style={{
                borderColor: selectedVM?.id === vm.id ? vm.color : "var(--border-soft)",
                background: "var(--surface-2)",
                boxShadow: selectedVM?.id === vm.id ? `0 0 20px ${vm.color}30` : "none",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Server size={14} style={{ color: vm.color }} />
                  <span className="font-mono text-xs font-bold" style={{ color: "var(--ink)" }}>{vm.name}</span>
                </div>
                <VMStatusDot status={vm.status} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Globe size={10} style={{ color: "var(--ink-faint)" }} />
                <span className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{vm.region}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-1.5 rounded-lg" style={{ background: "var(--surface-3)" }}>
                  <p className="font-mono text-xs font-bold" style={{ color: vm.color }}>{vm.memory}GB</p>
                  <p className="font-mono text-[9px]" style={{ color: "var(--ink-faint)" }}>RAM</p>
                </div>
                <div className="text-center p-1.5 rounded-lg" style={{ background: "var(--surface-3)" }}>
                  <p className="font-mono text-xs font-bold" style={{ color: vm.color }}>{vm.agents.length}</p>
                  <p className="font-mono text-[9px]" style={{ color: "var(--ink-faint)" }}>Agents</p>
                </div>
                <div className="text-center p-1.5 rounded-lg" style={{ background: "var(--surface-3)" }}>
                  <p className="font-mono text-xs font-bold" style={{ color: vm.color }}>{vm.uptime}</p>
                  <p className="font-mono text-[9px]" style={{ color: "var(--ink-faint)" }}>Uptime</p>
                </div>
              </div>
              {selectedVM?.id === vm.id && (
                <div className="space-y-1 pt-2 border-t" style={{ borderColor: "var(--border-soft)" }}>
                  <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>Running agents:</p>
                  {vm.agents.map((a) => (
                    <p key={a} className="font-mono text-[10px] pl-2" style={{ color: "var(--ink)" }}>• {a}</p>
                  ))}
                  <p className="font-mono text-[10px] mt-1" style={{ color: "var(--ink-faint)" }}>API: {vm.api}</p>
                  <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>Last seen: {vm.lastSeen}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Platforms Tab */}
      {activeTab === "platforms" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLATFORMS.map((p) => <PlatformCard key={p.id} platform={p} />)}
        </div>
      )}

      {/* Agents Tab */}
      {activeTab === "agents" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {AGENTS.map((a) => <AgentCard key={a.id} agent={a} />)}
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === "skills" && (
        <div className="space-y-3">
          {SKILL_INVENTORY.map((skill) => (
            <div
              key={skill.name}
              className="p-4 rounded-xl border"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface-2)" }}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>{skill.name}</p>
                  <p className="font-mono text-xs mt-1" style={{ color: "var(--ink-dim)" }}>{skill.desc}</p>
                  <p className="font-mono text-[10px] mt-1" style={{ color: "var(--ink-faint)" }}>Source: {skill.source}</p>
                </div>
                <Badge tone={skill.status === "active" ? "done" : skill.status === "integrating" ? "running" : "queued"}>
                  {skill.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Obsidian Brain Status */}
      <div className="mt-6 p-4 rounded-xl border" style={{
        borderColor: "var(--gold)",
        background: "rgba(201,168,76,0.05)",
      }}>
        <div className="flex items-center gap-3">
          <Database size={16} style={{ color: "var(--gold)" }} />
          <div className="flex-1">
            <p className="font-mono text-sm font-bold" style={{ color: "var(--gold)" }}>Obsidian Brain — Active</p>
            <p className="font-mono text-xs" style={{ color: "var(--ink-dim)" }}>
              4-tier progressive memory across all VMs · 61% token reduction (TencentDB method)
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs" style={{ color: "var(--green)" }}>8 agents</p>
            <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>Connected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
