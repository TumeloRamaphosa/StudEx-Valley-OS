"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Server,
  MessageSquare,
  Globe,
  Bot,
  Lock,
  Wifi,
  WifiOff,
  ChevronRight,
  Cpu,
  Database,
  Shield,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ArrowRight,
  Layers,
  Plus,
  X,
  Settings,
  Activity,
  HardDrive,
  MemoryStick,
  Network,
  Cloud,
  MessageCircle,
  Send,
  Users,
  Clock,
  TrendingUp,
  Box,
  GitBranch,
  Terminal,
  Eye,
  RefreshCw,
  Power,
  Link2,
  Cpu4,
  FileText,
  Bell,
  PieChart,
  Search,
  Filter,
  Download,
  Upload,
  Trash2,
  Edit3,
  Copy,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  Gauge,
} from "lucide-react";
import { Badge } from "@/components/ui";

// ─── Type Definitions ─────────────────────────────────────────────────────────

type VMStatus = "online" | "offline" | "warn" | "provisioning" | "maintenance";
type PlatformStatus = "connected" | "disconnected" | "syncing" | "error";
type AgentStatus = "active" | "idle" | "training" | "error" | "paused";
type PlatformId = "lark" | "slack" | "discord" | "telegram";

interface VMNode {
  id: string;
  name: string;
  type: "orgo" | "daytona" | "local" | "discord" | "railway";
  region: string;
  country: string;
  status: VMStatus;
  agents: string[];
  api: string;
  color: string;
  memory: number;
  cpu: number;
  disk: number;
  uptime: string;
  lastSeen: string;
  ipAddress: string;
  costPerMonth: string;
}

interface PlatformNode {
  id: PlatformId;
  name: string;
  icon: string;
  color: string;
  status: PlatformStatus;
  channels: number;
  agents: number;
  lastSync: string;
  tagline: string;
  region: string;
  messageRate: string;
}

interface RegisteredAgent {
  id: string;
  name: string;
  role: string;
  vm: string;
  platform: PlatformId[];
  skills: string[];
  memory: string;
  status: AgentStatus;
  uptime: string;
  lastActive: string;
  owner: string;
  version: string;
  apiKeySet: boolean;
}

interface Skill {
  name: string;
  desc: string;
  source: string;
  status: "active" | "integrating" | "planned";
  agents: number;
  category: string;
}

interface ConnectionPath {
  from: string;
  to: string;
  status: "active" | "idle" | "error";
  latency: string;
}

interface MemoryStats {
  working: { used: number; total: number };
  episodic: { used: number; total: number };
  semantic: { concepts: number; relations: number };
  procedural: { skills: number; workflows: number };
  totalTokens: number;
  savings: number;
}

interface StorageStats {
  total: number;
  used: number;
  available: number;
  databases: number;
}

// ─── Animation Styles ──────────────────────────────────────────────────────────

const pulseAnimation = `
  @keyframes pulse-glow {
    0%, 100% { opacity: 1; filter: brightness(1); }
    50% { opacity: 0.8; filter: brightness(1.2); }
  }
  @keyframes scan-line {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes data-flow {
    0% { stroke-dashoffset: 100; }
    100% { stroke-dashoffset: 0; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const globalStyles = `
  ${pulseAnimation}
  .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-blink { animation: blink 1s ease-in-out infinite; }
  .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
  .data-flow-line {
    stroke-dasharray: 5 5;
    animation: data-flow 1s linear infinite;
  }
`;

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const VMS: VMNode[] = [
  {
    id: "orgo-ntechj",
    name: "Orgo agentsnestcloud NTECHJ",
    type: "orgo",
    region: "Johannesburg, SA",
    country: "South Africa",
    status: "online",
    agents: ["QwenPaw Agent", "CashClaw Agent", "Research Agent", "Africa Pharma Agent"],
    api: "orgo_ntechj_api",
    color: "#39ffaa",
    memory: 64,
    cpu: 16,
    disk: 500,
    uptime: "99.9%",
    lastSeen: "Just now",
    ipAddress: "10.0.1.10",
    costPerMonth: "$480",
  },
  {
    id: "sa-gov-botswana",
    name: "SA Gov Botswana",
    type: "orgo",
    region: "Gaborone, BW",
    country: "Botswana",
    status: "provisioning",
    agents: ["Gov Compliance Agent", "Tender Tracker"],
    api: "orgo_gov_bw_api",
    color: "#c9a84c",
    memory: 32,
    cpu: 8,
    disk: 200,
    uptime: "—",
    lastSeen: "Provisioning",
    ipAddress: "10.0.2.10",
    costPerMonth: "$280",
  },
  {
    id: "russia-bridge",
    name: "Russia Bridge",
    type: "orgo",
    region: "Moscow, RU (via SA)",
    country: "Russia",
    status: "online",
    agents: ["Russia Trade Agent", "Russian Client Agent #1", "Russian Client Agent #2", "Russian Client Agent #3", "Russian Client Agent #4"],
    api: "orgo_russia_api",
    color: "#c41230",
    memory: 32,
    cpu: 8,
    disk: 200,
    uptime: "98.5%",
    lastSeen: "2 min ago",
    ipAddress: "10.0.3.10",
    costPerMonth: "$260",
  },
  {
    id: "china-vm",
    name: "China VM",
    type: "orgo",
    region: "Shenzhen, CN",
    country: "China",
    status: "online",
    agents: ["China Partner Agent", "Lark Bot"],
    api: "orgo_china_api",
    color: "#ff4444",
    memory: 32,
    cpu: 8,
    disk: 200,
    uptime: "99.2%",
    lastSeen: "1 min ago",
    ipAddress: "10.0.4.10",
    costPerMonth: "$240",
  },
  {
    id: "lagos",
    name: "Lagos Hub",
    type: "orgo",
    region: "Lagos, NG",
    country: "Nigeria",
    status: "online",
    agents: ["West Africa Agent", "Nigerian Client Agent"],
    api: "orgo_lagos_api",
    color: "#008751",
    memory: 16,
    cpu: 4,
    disk: 100,
    uptime: "97.8%",
    lastSeen: "5 min ago",
    ipAddress: "10.0.5.10",
    costPerMonth: "$160",
  },
  {
    id: "nairobi",
    name: "Nairobi Gateway",
    type: "orgo",
    region: "Nairobi, KE",
    country: "Kenya",
    status: "online",
    agents: ["East Africa Agent", "EAC Trade Agent"],
    api: "orgo_nairobi_api",
    color: "#006600",
    memory: 16,
    cpu: 4,
    disk: 100,
    uptime: "98.9%",
    lastSeen: "3 min ago",
    ipAddress: "10.0.6.10",
    costPerMonth: "$160",
  },
  {
    id: "dubai",
    name: "Dubai MENA Hub",
    type: "orgo",
    region: "Dubai, UAE",
    country: "UAE",
    status: "online",
    agents: ["MENA Agent", "Gulf Partner Agent"],
    api: "orgo_dubai_api",
    color: "#007A33",
    memory: 32,
    cpu: 8,
    disk: 200,
    uptime: "99.5%",
    lastSeen: "1 min ago",
    ipAddress: "10.0.7.10",
    costPerMonth: "$320",
  },
  {
    id: "cape-town",
    name: "Cape Town Regional",
    type: "orgo",
    region: "Cape Town, SA",
    country: "South Africa",
    status: "online",
    agents: ["Regional Analytics", "Backup Agent"],
    api: "orgo_cpt_api",
    color: "#0072CE",
    memory: 32,
    cpu: 8,
    disk: 200,
    uptime: "99.1%",
    lastSeen: "2 min ago",
    ipAddress: "10.0.8.10",
    costPerMonth: "$260",
  },
  {
    id: "johannesburg",
    name: "Johannesburg Primary",
    type: "orgo",
    region: "Johannesburg, SA",
    country: "South Africa",
    status: "online",
    agents: ["ADAM SMASHER", "Discord Bot", "Slack Bot"],
    api: "orgo_jnb_api",
    color: "#39ffaa",
    memory: 64,
    cpu: 16,
    disk: 500,
    uptime: "99.9%",
    lastSeen: "Just now",
    ipAddress: "10.0.9.10",
    costPerMonth: "$520",
  },
  {
    id: "rwanda-cold",
    name: "Rwanda Cold Storage",
    type: "orgo",
    region: "Kigali, RW",
    country: "Rwanda",
    status: "online",
    agents: ["Cold Chain Monitor", "Logistics Agent"],
    api: "orgo_rwanda_api",
    color: "#00A3E0",
    memory: 16,
    cpu: 4,
    disk: 100,
    uptime: "98.8%",
    lastSeen: "4 min ago",
    ipAddress: "10.0.10.10",
    costPerMonth: "$140",
  },
];

const PLATFORMS: PlatformNode[] = [
  {
    id: "lark",
    name: "Lark",
    icon: "📨",
    color: "#00A3E0",
    status: "connected",
    channels: 24,
    agents: 8,
    lastSync: "30 sec ago",
    tagline: "China / Russia clients — Tencent built",
    region: "APAC + EMEA",
    messageRate: "142/min",
  },
  {
    id: "slack",
    name: "Slack",
    icon: "💬",
    color: "#4A154B",
    status: "connected",
    channels: 16,
    agents: 6,
    lastSync: "1 min ago",
    tagline: "Western market — native AI",
    region: "Americas + EMEA",
    messageRate: "89/min",
  },
  {
    id: "discord",
    name: "Discord",
    icon: "🎮",
    color: "#5865F2",
    status: "syncing",
    channels: 12,
    agents: 4,
    lastSync: "Syncing...",
    tagline: "Community & dev — agent-to-agent",
    region: "Global",
    messageRate: "234/min",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: "✈️",
    color: "#0088CC",
    status: "connected",
    channels: 8,
    agents: 3,
    lastSync: "2 min ago",
    tagline: "Mobile-first — mobile clients",
    region: "EMEA + CIS",
    messageRate: "56/min",
  },
];

const AGENTS: RegisteredAgent[] = [
  {
    id: "agent-qwenpaw",
    name: "QwenPaw Agent",
    role: "Multi-Channel AI Assistant",
    vm: "orgo-ntechj",
    platform: ["lark", "slack", "discord", "telegram"],
    skills: ["research", "translate", "summarize", "draft_response"],
    memory: "4-tier progressive",
    status: "active",
    uptime: "99.7%",
    lastActive: "Just now",
    owner: "System",
    version: "2.0",
    apiKeySet: true,
  },
  {
    id: "agent-cashclaw",
    name: "CashClaw Agent",
    role: "Agent Economy Layer",
    vm: "orgo-ntechj",
    platform: ["discord", "slack"],
    skills: ["seo_auditor", "content_writer", "lead_generator", "stripe_invoicer", "hyrve_marketplace"],
    memory: "4-tier progressive",
    status: "active",
    uptime: "99.2%",
    lastActive: "1 min ago",
    owner: "ADAM SMASHER",
    version: "1.7.0",
    apiKeySet: true,
  },
  {
    id: "agent-research",
    name: "Research Agent",
    role: "China AI Intel",
    vm: "orgo-ntechj",
    platform: ["lark"],
    skills: ["market_research", "competitor_analysis", "trend_monitoring"],
    memory: "4-tier progressive",
    status: "active",
    uptime: "98.9%",
    lastActive: "5 min ago",
    owner: "Research Team",
    version: "1.4.2",
    apiKeySet: true,
  },
  {
    id: "agent-africa-pharma",
    name: "Africa Pharma Agent",
    role: "Pharmaceutical Trade Intelligence",
    vm: "orgo-ntechj",
    platform: ["lark", "telegram"],
    skills: ["pharma_trade", "regulatory_compliance", "cold_chain_monitoring"],
    memory: "2GB",
    status: "active",
    uptime: "99.5%",
    lastActive: "2 min ago",
    owner: "Trade Team",
    version: "1.2.0",
    apiKeySet: true,
  },
  {
    id: "agent-russia-trade",
    name: "Russia Trade Agent",
    role: "SA-Russia Bilateral Trade",
    vm: "russia-bridge",
    platform: ["lark", "discord"],
    skills: ["trade_compliance", "document_processing", "russian_language"],
    memory: "4-tier progressive",
    status: "active",
    uptime: "98.5%",
    lastActive: "3 min ago",
    owner: "Russia Desk",
    version: "1.3.1",
    apiKeySet: true,
  },
  {
    id: "agent-china-partner",
    name: "China Partner Agent",
    role: "China Market Integration",
    vm: "china-vm",
    platform: ["lark"],
    skills: ["wechat_integration", "chinese_content", "supplier_research"],
    memory: "4GB",
    status: "active",
    uptime: "99.2%",
    lastActive: "1 min ago",
    owner: "China Desk",
    version: "1.5.0",
    apiKeySet: true,
  },
  {
    id: "agent-discord",
    name: "Discord Bot",
    role: "Community Hub",
    vm: "johannesburg",
    platform: ["discord"],
    skills: ["community_management", "moderation", "analytics"],
    memory: "2GB",
    status: "active",
    uptime: "99.9%",
    lastActive: "Just now",
    owner: "Community Team",
    version: "2.1.0",
    apiKeySet: true,
  },
  {
    id: "agent-slack",
    name: "Slack Bot",
    role: "Western Ops Hub",
    vm: "johannesburg",
    platform: ["slack"],
    skills: ["workflow_automation", "reporting", "notifications"],
    memory: "1.5GB",
    status: "idle",
    uptime: "99.8%",
    lastActive: "10 min ago",
    owner: "Ops Team",
    version: "1.8.0",
    apiKeySet: true,
  },
  {
    id: "agent-lark",
    name: "Lark Bot",
    role: "APAC Communication Hub",
    vm: "china-vm",
    platform: ["lark"],
    skills: ["lark_integration", "multi_language", "file_processing"],
    memory: "2GB",
    status: "active",
    uptime: "99.4%",
    lastActive: "2 min ago",
    owner: "APAC Team",
    version: "1.6.0",
    apiKeySet: true,
  },
  {
    id: "agent-russian-1",
    name: "Russian Client Agent #1",
    role: "Client Services — Moscow",
    vm: "russia-bridge",
    platform: ["lark", "telegram"],
    skills: ["client_support", "russian_language", "document_translation"],
    memory: "1GB",
    status: "active",
    uptime: "97.8%",
    lastActive: "8 min ago",
    owner: "Russia Desk",
    version: "1.1.0",
    apiKeySet: true,
  },
  {
    id: "agent-russian-2",
    name: "Russian Client Agent #2",
    role: "Client Services — St. Petersburg",
    vm: "russia-bridge",
    platform: ["lark"],
    skills: ["client_support", "russian_language", "scheduling"],
    memory: "1GB",
    status: "idle",
    uptime: "98.2%",
    lastActive: "15 min ago",
    owner: "Russia Desk",
    version: "1.1.0",
    apiKeySet: true,
  },
  {
    id: "agent-russian-3",
    name: "Russian Client Agent #3",
    role: "Trade Compliance — Vladivostok",
    vm: "russia-bridge",
    platform: ["lark", "discord"],
    skills: ["trade_compliance", "customs_documentation", "russian_language"],
    memory: "1.5GB",
    status: "active",
    uptime: "96.9%",
    lastActive: "4 min ago",
    owner: "Russia Desk",
    version: "1.2.0",
    apiKeySet: false,
  },
  {
    id: "agent-russian-4",
    name: "Russian Client Agent #4",
    role: "Logistics Coordinator",
    vm: "russia-bridge",
    platform: ["telegram"],
    skills: ["logistics_tracking", "russian_language", "notifications"],
    memory: "1GB",
    status: "training",
    uptime: "94.3%",
    lastActive: "1 min ago",
    owner: "Russia Desk",
    version: "0.9.0",
    apiKeySet: true,
  },
];

const SKILLS: Skill[] = [
  { name: "QwenPaw", desc: "Multi-channel Lark/DingTalk/WeChat/Discord/Telegram/QQ — native Lark support", source: "share.google/dXr69MqQJab5dhMqX", status: "active", agents: 1, category: "Core" },
  { name: "CashClaw", desc: "Agent Economy Layer with HYRVE marketplace and Stripe MPP payments", source: "share.google/cashclaw_economy", status: "active", agents: 1, category: "Economy" },
  { name: "Agent-Reach", desc: "Zero-API-fee internet — Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, LinkedIn", source: "share.google/IIYm7sTnN29j1z8LA", status: "active", agents: 3, category: "Social" },
  { name: "Huashu Design", desc: "HTML-native prototypes, 40 design philosophies, animations, MP4/GIF", source: "share.google/gVCG0LMIyU4t87yx4", status: "active", agents: 1, category: "Design" },
  { name: "last30days", desc: "Social trend monitoring across 30 platforms", source: "Embedded", status: "active", agents: 2, category: "Analytics" },
  { name: "second-brain", desc: "Brand voice, PPTX maker, MCP client, SOP creator, Remotion video", source: "Embedded", status: "active", agents: 4, category: "Productivity" },
  { name: "TencentDB Agent Memory", desc: "4-tier progressive memory pipeline — 61% token reduction", source: "share.google/DeAmo4VdvTEXwn0ds", status: "integrating", agents: 0, category: "Memory" },
  { name: "Cult UI", desc: "92+ AI agent patterns (ReAct/plan-solve/RAG/tool-use)", source: "opensrcprojects.dev", status: "planned", agents: 0, category: "Patterns" },
  { name: "Agno AgentOS", desc: "Python agent framework — BYOC, MCP 50+ endpoints, JWT RBAC", source: "agno.com", status: "planned", agents: 0, category: "Framework" },
  { name: "SEO Auditor", desc: "Technical SEO analysis, keyword research, SERP tracking, backlink analysis", source: "CashClaw v1.7.0", status: "active", agents: 1, category: "Marketing" },
  { name: "Content Writer", desc: "Blog posts, landing page copy, email sequences, multi-language support", source: "CashClaw v1.7.0", status: "active", agents: 1, category: "Marketing" },
  { name: "Lead Generator", desc: "Prospect research, data enrichment, lead scoring, CRM integration", source: "CashClaw v1.7.0", status: "active", agents: 1, category: "Sales" },
  { name: "Stripe Invoicer", desc: "Invoice generation, payment processing, subscription management", source: "CashClaw v1.7.0", status: "active", agents: 1, category: "Finance" },
];

const CONNECTIONS: ConnectionPath[] = [
  { from: "orgo-ntechj", to: "lark", status: "active", latency: "45ms" },
  { from: "orgo-ntechj", to: "slack", status: "active", latency: "120ms" },
  { from: "russia-bridge", to: "lark", status: "active", latency: "180ms" },
  { from: "russia-bridge", to: "discord", status: "active", latency: "200ms" },
  { from: "china-vm", to: "lark", status: "active", latency: "35ms" },
  { from: "johannesburg", to: "discord", status: "active", latency: "15ms" },
  { from: "johannesburg", to: "slack", status: "active", latency: "130ms" },
  { from: "dubai", to: "telegram", status: "idle", latency: "85ms" },
  { from: "lagos", to: "telegram", status: "active", latency: "95ms" },
  { from: "nairobi", to: "telegram", status: "active", latency: "70ms" },
];

const MEMORY_STATS: MemoryStats = {
  working: { used: 2458, total: 4096 },
  episodic: { used: 18432, total: 32768 },
  semantic: { concepts: 2847, relations: 12893 },
  procedural: { skills: 47, workflows: 12 },
  totalTokens: 1.2e6,
  savings: 61.2,
};

const STORAGE_STATS: StorageStats = {
  total: 2048,
  used: 847,
  available: 1201,
  databases: 24,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function VMStatusDot({ status }: { status: VMStatus }) {
  const config: Record<VMStatus, { color: string; glow: string; label: string }> = {
    online: { color: "var(--green)", glow: "rgba(57,255,170,0.5)", label: "Online" },
    offline: { color: "#ff4444", glow: "rgba(255,68,68,0.5)", label: "Offline" },
    warn: { color: "#ffcf4a", glow: "rgba(255,207,74,0.5)", label: "Warning" },
    provisioning: { color: "#8a6bff", glow: "rgba(138,107,255,0.5)", label: "Provisioning" },
    maintenance: { color: "#00A3E0", glow: "rgba(0,163,224,0.5)", label: "Maintenance" },
  };
  const m = config[status];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div
        className="animate-pulse-glow"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: m.color,
          boxShadow: `0 0 8px ${m.glow}`,
        }}
      />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: m.color }}>
        {m.label}
      </span>
    </div>
  );
}

function PlatformStatusBadge({ status }: { status: PlatformStatus }) {
  const config: Record<PlatformStatus, { color: string; label: string; icon: React.ReactNode }> = {
    connected: { color: "var(--green)", label: "Connected", icon: <Wifi size={12} /> },
    disconnected: { color: "#ff4444", label: "Disconnected", icon: <WifiOff size={12} /> },
    syncing: { color: "var(--pink)", label: "Syncing", icon: <RefreshCw size={12} className="animate-spin" /> },
    error: { color: "#ffcf4a", label: "Error", icon: <AlertTriangle size={12} /> },
  };
  const m = config[status];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "4px 8px",
        borderRadius: "12px",
        background: `${m.color}22`,
        border: `1px solid ${m.color}44`,
        color: m.color,
        fontSize: "10px",
        fontFamily: "var(--font-mono)",
      }}
    >
      {m.icon}
      {m.label}
    </div>
  );
}

function AgentStatusBadge({ status }: { status: AgentStatus }) {
  const config: Record<AgentStatus, { bg: string; color: string; label: string }> = {
    active: { bg: "var(--green)", color: "#000", label: "Active" },
    idle: { bg: "var(--ink-faint)", color: "#fff", label: "Idle" },
    training: { bg: "var(--pink)", color: "#fff", label: "Training" },
    error: { bg: "#ff4444", color: "#fff", label: "Error" },
    paused: { bg: "#ffcf4a", color: "#000", label: "Paused" },
  };
  const m = config[status];
  return (
    <div
      style={{
        padding: "2px 8px",
        borderRadius: "10px",
        background: m.bg,
        color: m.color,
        fontSize: "9px",
        fontFamily: "var(--font-mono)",
        fontWeight: "bold",
        textTransform: "uppercase",
      }}
    >
      {m.label}
    </div>
  );
}

function MetricCard({ label, value, unit, color, icon }: { label: string; value: string | number; unit?: string; color: string; icon: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        borderRadius: "8px",
        background: "var(--surface-3)",
        gap: "4px",
      }}
    >
      <div style={{ color: "var(--ink-faint)" }}>{icon}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: "bold", color }}>
          {value}
        </span>
        {unit && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
            {unit}
          </span>
        )}
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)" }}>
        {label}
      </span>
    </div>
  );
}

function VMCard({ vm, onSelect, isSelected }: { vm: VMNode; onSelect: () => void; isSelected: boolean }) {
  return (
    <div
      onClick={onSelect}
      style={{
        position: "relative",
        padding: "16px",
        borderRadius: "12px",
        border: `1px solid ${isSelected ? vm.color : "var(--border-soft)"}`,
        background: "var(--surface-2)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: isSelected ? `0 0 24px ${vm.color}33, 0 0 48px ${vm.color}11` : "none",
      }}
    >
      {/* Status indicator */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
        }}
      >
        <VMStatusDot status={vm.status} />
      </div>

      {/* Header */}
      <div style={{ marginBottom: "12px", paddingRight: "80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <Server size={14} style={{ color: vm.color }} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: "bold",
              color: "var(--ink)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {vm.name}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Globe size={10} style={{ color: "var(--ink-faint)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
            {vm.region}
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "6px",
          marginBottom: "12px",
        }}
      >
        <MetricCard label="RAM" value={vm.memory} unit="GB" color={vm.color} icon={<MemoryStick size={10} />} />
        <MetricCard label="CPU" value={vm.cpu} unit="C" color={vm.color} icon={<Cpu size={10} />} />
        <MetricCard label="Uptime" value={vm.uptime} color={vm.color} icon={<Activity size={10} />} />
        <MetricCard label="Agents" value={vm.agents.length} color={vm.color} icon={<Bot size={10} />} />
      </div>

      {/* Agents list on expand */}
      {isSelected && (
        <div
          style={{
            paddingTop: "12px",
            borderTop: "1px solid var(--border-soft)",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
              Running Agents ({vm.agents.length})
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px" }}>
            {vm.agents.map((agent) => (
              <span
                key={agent}
                style={{
                  padding: "2px 8px",
                  borderRadius: "6px",
                  background: "var(--surface-3)",
                  fontSize: "9px",
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink-dim)",
                }}
              >
                {agent}
              </span>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)" }}>IP</span>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink)" }}>{vm.ipAddress}</p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)" }}>Cost</span>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink)" }}>{vm.costPerMonth}/mo</p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)" }}>API</span>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink)" }}>{vm.api}</p>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)" }}>Last Seen</span>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink)" }}>{vm.lastSeen}</p>
            </div>
          </div>
        </div>
      )}

      {/* Type badge */}
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          right: "8px",
          padding: "2px 6px",
          borderRadius: "4px",
          background: `${vm.color}22`,
          fontSize: "8px",
          fontFamily: "var(--font-mono)",
          color: vm.color,
          textTransform: "uppercase",
        }}
      >
        {vm.type}
      </div>
    </div>
  );
}

function PlatformCard({ platform }: { platform: PlatformNode }) {
  const platformIcons: Record<PlatformId, React.ReactNode> = {
    lark: <MessageCircle size={24} />,
    slack: <MessageSquare size={24} />,
    discord: <Users size={24} />,
    telegram: <Send size={24} />,
  };

  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "12px",
        border: `1px solid ${platform.status === "syncing" ? "var(--pink)" : "var(--border-soft)"}`,
        background: "var(--surface-2)",
        boxShadow: platform.status === "syncing" ? "0 0 20px rgba(255,46,196,0.2)" : "none",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "16px" }}>
        <div style={{ color: platform.color, fontSize: "24px" }}>{platformIcons[platform.id]}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: "bold", color: platform.color }}>
              {platform.name}
            </span>
            <PlatformStatusBadge status={platform.status} />
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
            {platform.tagline}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", marginBottom: "12px" }}>
        <div
          style={{
            textAlign: "center",
            padding: "8px",
            borderRadius: "8px",
            background: "var(--surface-3)",
          }}
        >
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "20px", fontWeight: "bold", color: platform.color }}>
            {platform.channels}
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)" }}>Channels</p>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "8px",
            borderRadius: "8px",
            background: "var(--surface-3)",
          }}
        >
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "20px", fontWeight: "bold", color: platform.color }}>
            {platform.agents}
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)" }}>Agents</p>
        </div>
      </div>

      {/* Footer info */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "12px",
          borderTop: "1px solid var(--border-soft)",
        }}
      >
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)" }}>Message Rate</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink)" }}>{platform.messageRate}</p>
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)" }}>Last Sync</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink)" }}>{platform.lastSync}</p>
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)" }}>Region</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink)" }}>{platform.region}</p>
        </div>
      </div>
    </div>
  );
}

function AgentCard({ agent }: { agent: RegisteredAgent }) {
  const platformIcons: Record<PlatformId, React.ReactNode> = {
    lark: <MessageCircle size={12} />,
    slack: <MessageSquare size={12} />,
    discord: <Users size={12} />,
    telegram: <Send size={12} />,
  };

  const platformColors: Record<PlatformId, string> = {
    lark: "#00A3E0",
    slack: "#4A154B",
    discord: "#5865F2",
    telegram: "#0088CC",
  };

  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "10px",
        border: "1px solid var(--border-soft)",
        background: "var(--surface-2)",
        transition: "all 0.2s ease",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: "bold",
              color: "var(--ink)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {agent.name}
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)" }}>{agent.role}</p>
        </div>
        <AgentStatusBadge status={agent.status} />
      </div>

      {/* Platforms */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
        {agent.platform.map((p) => (
          <div
            key={p}
            style={{
              padding: "2px 6px",
              borderRadius: "4px",
              background: `${platformColors[p]}22`,
              color: platformColors[p],
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            {platformIcons[p]}
            <span style={{ fontSize: "8px", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>{p}</span>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginBottom: "10px" }}>
        {agent.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            style={{
              padding: "2px 6px",
              borderRadius: "4px",
              border: "1px solid var(--border)",
              fontSize: "8px",
              fontFamily: "var(--font-mono)",
              color: "var(--ink-dim)",
            }}
          >
            {skill}
          </span>
        ))}
        {agent.skills.length > 3 && (
          <span
            style={{
              padding: "2px 6px",
              fontSize: "8px",
              fontFamily: "var(--font-mono)",
              color: "var(--ink-faint)",
            }}
          >
            +{agent.skills.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "8px",
          borderTop: "1px solid var(--border-soft)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <MemoryStick size={10} style={{ color: "var(--ink-faint)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)" }}>
            {agent.memory}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Activity size={10} style={{ color: "var(--ink-faint)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)" }}>
            {agent.uptime}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {agent.apiKeySet ? (
            <Lock size={10} style={{ color: "var(--green)" }} />
          ) : (
            <Lock size={10} style={{ color: "#ff4444" }} />
          )}
        </div>
      </div>

      {/* Version badge */}
      <div
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          padding: "2px 4px",
          borderRadius: "3px",
          background: "var(--surface-3)",
          fontSize: "7px",
          fontFamily: "var(--font-mono)",
          color: "var(--ink-faint)",
        }}
      >
        v{agent.version}
      </div>
    </div>
  );
}

function ConnectionDiagram() {
  const vmPositions: Record<string, { x: number; y: number }> = {
    "orgo-ntechj": { x: 50, y: 100 },
    "russia-bridge": { x: 180, y: 60 },
    "china-vm": { x: 180, y: 140 },
    "johannesburg": { x: 310, y: 100 },
  };

  const platformPositions: Record<string, { x: number; y: number }> = {
    lark: { x: 440, y: 80 },
    slack: { x: 440, y: 140 },
    discord: { x: 440, y: 200 },
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "280px",
        background: "var(--surface-2)",
        borderRadius: "12px",
        border: "1px solid var(--border-soft)",
        overflow: "hidden",
      }}
    >
      {/* SVG Diagram */}
      <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Connection lines */}
        {CONNECTIONS.map((conn, idx) => {
          const fromPos = vmPositions[conn.from] || platformPositions[conn.from];
          const toPos = platformPositions[conn.to] || vmPositions[conn.to];
          if (!fromPos || !toPos) return null;

          return (
            <g key={idx}>
              <line
                x1={fromPos.x + 40}
                y1={fromPos.y}
                x2={toPos.x - 10}
                y2={toPos.y}
                stroke={conn.status === "active" ? "var(--green)" : conn.status === "idle" ? "var(--ink-faint)" : "#ff4444"}
                strokeWidth="2"
                className={conn.status === "active" ? "data-flow-line" : ""}
                opacity={0.6}
              />
              {conn.status === "active" && (
                <circle r="3" fill="var(--green)" className="animate-blink">
                  <animateMotion dur="2s" repeatCount="indefinite" path={`M${fromPos.x + 40},${fromPos.y} L${toPos.x - 10},${toPos.y}`} />
                </circle>
              )}
            </g>
          );
        })}

        {/* VM Nodes */}
        {Object.entries(vmPositions).map(([id, pos]) => {
          const vm = VMS.find((v) => v.id === id);
          if (!vm) return null;
          return (
            <g key={id} transform={`translate(${pos.x}, ${pos.y})`}>
              <rect
                x="-40"
                y="-25"
                width="80"
                height="50"
                rx="8"
                fill="var(--surface-3)"
                stroke={vm.color}
                strokeWidth="2"
              />
              <Server x="-12" y="-15" size={24} style={{ color: vm.color }} />
              <text x="0" y="18" textAnchor="middle" fill="var(--ink)" fontSize="8" fontFamily="var(--font-mono)">
                {vm.name.split(" ")[0]}
              </text>
            </g>
          );
        })}

        {/* Platform Nodes */}
        {Object.entries(platformPositions).map(([id, pos]) => {
          const platform = PLATFORMS.find((p) => p.id === id);
          if (!platform) return null;
          return (
            <g key={id} transform={`translate(${pos.x}, ${pos.y})`}>
              <rect
                x="-40"
                y="-25"
                width="80"
                height="50"
                rx="8"
                fill="var(--surface-3)"
                stroke={platform.color}
                strokeWidth="2"
              />
              <text x="0" y="-5" textAnchor="middle" fill={platform.color} fontSize="16">
                {platform.icon}
              </text>
              <text x="0" y="18" textAnchor="middle" fill="var(--ink)" fontSize="8" fontFamily="var(--font-mono)">
                {platform.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "12px",
          display: "flex",
          gap: "16px",
          padding: "8px 12px",
          background: "var(--surface)",
          borderRadius: "6px",
          border: "1px solid var(--border-soft)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "20px", height: "2px", background: "var(--green)" }} />
          <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>Active</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "20px", height: "2px", background: "var(--ink-faint)" }} />
          <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>Idle</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "20px", height: "2px", background: "#ff4444" }} />
          <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "var(--ink-faint)" }}>Error</span>
        </div>
      </div>
    </div>
  );
}

function MemorySection() {
  const getProgressWidth = (used: number, total: number) => (used / total) * 100;

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
        background: "rgba(201,168,76,0.05)",
        border: "1px solid var(--gold)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <Database size={20} style={{ color: "var(--gold)" }} />
        <div>
          <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: "bold", color: "var(--gold)", margin: 0 }}>
            Progressive Memory System
          </h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-dim)", margin: 0 }}>
            4-tier architecture • 61% token reduction
          </p>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Badge tone="done">Connected</Badge>
        </div>
      </div>

      {/* Memory Tiers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
        {/* Working Memory */}
        <div
          style={{
            padding: "12px",
            borderRadius: "8px",
            background: "var(--surface-3)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink)" }}>Working</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--green)" }}>
              {MEMORY_STATS.working.used.toLocaleString()} / {MEMORY_STATS.working.total.toLocaleString()}
            </span>
          </div>
          <div style={{ height: "4px", background: "var(--surface)", borderRadius: "2px", overflow: "hidden" }}>
            <div
              style={{
                width: `${getProgressWidth(MEMORY_STATS.working.used, MEMORY_STATS.working.total)}%`,
                height: "100%",
                background: "var(--green)",
                borderRadius: "2px",
              }}
            />
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--ink-faint)", marginTop: "4px" }}>4KB tokens</p>
        </div>

        {/* Episodic Buffer */}
        <div
          style={{
            padding: "12px",
            borderRadius: "8px",
            background: "var(--surface-3)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink)" }}>Episodic</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--pink)" }}>
              {MEMORY_STATS.episodic.used.toLocaleString()} / {MEMORY_STATS.episodic.total.toLocaleString()}
            </span>
          </div>
          <div style={{ height: "4px", background: "var(--surface)", borderRadius: "2px", overflow: "hidden" }}>
            <div
              style={{
                width: `${getProgressWidth(MEMORY_STATS.episodic.used, MEMORY_STATS.episodic.total)}%`,
                height: "100%",
                background: "var(--pink)",
                borderRadius: "2px",
              }}
            />
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--ink-faint)", marginTop: "4px" }}>7 day retention</p>
        </div>

        {/* Semantic */}
        <div
          style={{
            padding: "12px",
            borderRadius: "8px",
            background: "var(--surface-3)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink)" }}>Semantic</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--gold)" }}>
              {MEMORY_STATS.semantic.concepts.toLocaleString()} concepts
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              style={{
                flex: 1,
                padding: "6px",
                borderRadius: "4px",
                background: "var(--surface)",
                textAlign: "center",
              }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--gold)" }}>
                {MEMORY_STATS.semantic.relations.toLocaleString()}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "var(--ink-faint)" }}>relations</p>
            </div>
          </div>
        </div>

        {/* Procedural */}
        <div
          style={{
            padding: "12px",
            borderRadius: "8px",
            background: "var(--surface-3)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink)" }}>Procedural</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--queued)" }}>
              {MEMORY_STATS.procedural.skills} skills
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              style={{
                flex: 1,
                padding: "6px",
                borderRadius: "4px",
                background: "var(--surface)",
                textAlign: "center",
              }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--queued)" }}>
                {MEMORY_STATS.procedural.workflows}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "var(--ink-faint)" }}>workflows</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          paddingTop: "16px",
          borderTop: "1px solid var(--border-soft)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Gauge size={14} style={{ color: "var(--green)" }} />
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--green)", fontWeight: "bold" }}>
              {MEMORY_STATS.savings}%
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--ink-faint)" }}>Token Savings</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Layers size={14} style={{ color: "var(--ink)" }} />
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--ink)", fontWeight: "bold" }}>
              {(MEMORY_STATS.totalTokens / 1e6).toFixed(1)}M
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--ink-faint)" }}>Total Tokens</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <HardDrive size={14} style={{ color: "var(--ink)" }} />
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--ink)", fontWeight: "bold" }}>
              {AGENTS.filter((a) => a.memory.includes("4-tier")).length}
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--ink-faint)" }}>Agents Connected</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StorageSection() {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "12px",
        background: "var(--surface-2)",
        border: "1px solid var(--border-soft)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <HardDrive size={18} style={{ color: "var(--ink)" }} />
        <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "bold", color: "var(--ink)", margin: 0 }}>
          Storage Overview
        </h3>
      </div>

      {/* Storage bar */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            height: "24px",
            borderRadius: "6px",
            overflow: "hidden",
            background: "var(--surface-3)",
          }}
        >
          <div
            style={{
              width: `${(STORAGE_STATS.used / STORAGE_STATS.total) * 100}%`,
              background: "linear-gradient(90deg, var(--green), var(--pink))",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
            {STORAGE_STATS.used} GB used
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
            {STORAGE_STATS.available} GB available
          </span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
        <div style={{ textAlign: "center", padding: "8px", background: "var(--surface-3)", borderRadius: "6px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--ink)" }}>{STORAGE_STATS.total}GB</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--ink-faint)" }}>Total</p>
        </div>
        <div style={{ textAlign: "center", padding: "8px", background: "var(--surface-3)", borderRadius: "6px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--pink)" }}>{STORAGE_STATS.databases}</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--ink-faint)" }}>Databases</p>
        </div>
        <div style={{ textAlign: "center", padding: "8px", background: "var(--surface-3)", borderRadius: "6px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--green)" }}>
            {((STORAGE_STATS.used / STORAGE_STATS.total) * 100).toFixed(0)}%
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--ink-faint)" }}>Usage</p>
        </div>
      </div>
    </div>
  );
}

function SkillInventoryPanel({ skills }: { skills: Skill[] }) {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "12px",
        background: "var(--surface-2)",
        border: "1px solid var(--border-soft)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <Cpu4 size={18} style={{ color: "var(--ink)" }} />
        <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "bold", color: "var(--ink)", margin: 0 }}>
          Skill Inventory
        </h3>
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
          {skills.length} skills
        </span>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "16px", flexWrap: "wrap" }}>
        <button
          style={{
            padding: "4px 10px",
            borderRadius: "6px",
            background: "var(--pink)",
            color: "#fff",
            fontSize: "9px",
            fontFamily: "var(--font-mono)",
            border: "none",
            cursor: "pointer",
          }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              background: "var(--surface-3)",
              color: "var(--ink-faint)",
              fontSize: "9px",
              fontFamily: "var(--font-mono)",
              border: "none",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "400px", overflowY: "auto" }}>
        {skills.map((skill) => (
          <div
            key={skill.name}
            style={{
              padding: "10px",
              borderRadius: "8px",
              background: "var(--surface-3)",
              border: "1px solid var(--border-soft)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: "bold", color: "var(--ink)", margin: 0 }}>
                  {skill.name}
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--ink-faint)", margin: 0 }}>
                  {skill.desc}
                </p>
              </div>
              <Badge tone={skill.status === "active" ? "done" : skill.status === "integrating" ? "running" : "queued"}>
                {skill.status}
              </Badge>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px" }}>
              <span
                style={{
                  padding: "2px 6px",
                  borderRadius: "4px",
                  background: "var(--surface)",
                  fontSize: "8px",
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink-dim)",
                }}
              >
                {skill.category}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--ink-faint)" }}>
                {skill.agents} agents
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddAgentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    vm: "",
    platform: [] as PlatformId[],
    skills: [] as string[],
  });

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "500px",
          maxHeight: "80vh",
          overflow: "auto",
          padding: "24px",
          borderRadius: "16px",
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          boxShadow: "0 0 40px rgba(255,46,196,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Plus size={20} style={{ color: "var(--pink)" }} />
            <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "16px", color: "var(--ink-strong)", margin: 0 }}>
              Add New Agent
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: "6px",
              borderRadius: "6px",
              background: "var(--surface-3)",
              border: "none",
              cursor: "pointer",
              color: "var(--ink)",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Name */}
          <div>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)", display: "block", marginBottom: "4px" }}>
              Agent Name
            </label>
            <input
              type="text"
              placeholder="e.g., New Trade Agent"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                background: "var(--surface-3)",
                border: "1px solid var(--border)",
                color: "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                outline: "none",
              }}
            />
          </div>

          {/* Role */}
          <div>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)", display: "block", marginBottom: "4px" }}>
              Role / Description
            </label>
            <input
              type="text"
              placeholder="e.g., International Trade Coordinator"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                background: "var(--surface-3)",
                border: "1px solid var(--border)",
                color: "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                outline: "none",
              }}
            />
          </div>

          {/* VM Selection */}
          <div>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)", display: "block", marginBottom: "4px" }}>
              Target VM
            </label>
            <select
              value={formData.vm}
              onChange={(e) => setFormData({ ...formData, vm: e.target.value })}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                background: "var(--surface-3)",
                border: "1px solid var(--border)",
                color: "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                outline: "none",
              }}
            >
              <option value="">Select VM...</option>
              {VMS.filter((v) => v.status === "online").map((vm) => (
                <option key={vm.id} value={vm.id}>
                  {vm.name} ({vm.region})
                </option>
              ))}
            </select>
          </div>

          {/* Platform Selection */}
          <div>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)", display: "block", marginBottom: "8px" }}>
              Platforms
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              {(["lark", "slack", "discord", "telegram"] as PlatformId[]).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    const newPlatforms = formData.platform.includes(p)
                      ? formData.platform.filter((x) => x !== p)
                      : [...formData.platform, p];
                    setFormData({ ...formData, platform: newPlatforms });
                  }}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: formData.platform.includes(p) ? `${PLATFORMS.find((pl) => pl.id === p)?.color}33` : "var(--surface-3)",
                    border: `1px solid ${formData.platform.includes(p) ? PLATFORMS.find((pl) => pl.id === p)?.color : "var(--border)"}`,
                    color: formData.platform.includes(p) ? PLATFORMS.find((pl) => pl.id === p)?.color : "var(--ink)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "8px",
                background: "var(--surface-3)",
                border: "1px solid var(--border)",
                color: "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "8px",
                background: "var(--pink)",
                border: "none",
                color: "#fff",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Create Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────────

export default function AgentsRegistryPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "vms" | "platforms" | "agents" | "skills">("overview");
  const [selectedVM, setSelectedVM] = useState<VMNode | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<AgentStatus | "all">("all");
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      // Simulate data refresh
      console.log("Refreshing agent status...");
    }, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: Box, count: null },
    { id: "vms" as const, label: "VMs", icon: Server, count: VMS.length },
    { id: "platforms" as const, label: "Platforms", icon: Network, count: 4 },
    { id: "agents" as const, label: "Agents", icon: Bot, count: AGENTS.length },
    { id: "skills" as const, label: "Skills", icon: Cpu4, count: SKILLS.length },
  ];

  const filteredAgents = AGENTS.filter((agent) => {
    const matchesSearch =
      searchQuery === "" ||
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || agent.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <style>{globalStyles}</style>
      <div>
        {/* Hero Section */}
        <div
          style={{
            position: "relative",
            padding: "32px 24px",
            marginBottom: "24px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(255,46,196,0.1) 0%, rgba(57,255,170,0.1) 100%)",
            border: "1px solid var(--border)",
            overflow: "hidden",
          }}
        >
          {/* Animated background elements */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: "radial-gradient(circle, rgba(255,46,196,0.1) 0%, transparent 50%)",
              animation: "rotate-slow 30s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "10%",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "2px solid var(--pink)",
              opacity: 0.2,
              animation: "pulse-glow 3s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              left: "5%",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "2px solid var(--green)",
              opacity: 0.2,
              animation: "pulse-glow 2s ease-in-out infinite 0.5s",
            }}
          />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <Cloud size={32} style={{ color: "var(--pink)" }} className="animate-float" />
              <h1
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "var(--ink-strong)",
                  textShadow: "0 0 20px var(--pink-glow)",
                  margin: 0,
                  letterSpacing: "2px",
                }}
                className="animate-pulse-glow"
              >
                AGENTS NEST CLOUD
              </h1>
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--ink-dim)",
                margin: 0,
                maxWidth: "600px",
              }}
            >
              Multi-channel AI agent mesh • 10 VMs • 4 platforms • 13 agents • 61% memory savings
            </p>

            {/* Quick stats */}
            <div
              style={{
                display: "flex",
                gap: "24px",
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: "1px solid var(--border-soft)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  className="animate-pulse-glow"
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--green)",
                    boxShadow: "0 0 8px var(--green-glow)",
                  }}
                />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--green)" }}>
                  {VMS.filter((v) => v.status === "online").length} VMs Online
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--pink)",
                    boxShadow: "0 0 8px var(--pink-glow)",
                  }}
                />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--pink)" }}>
                  {AGENTS.filter((a) => a.status === "active").length} Agents Active
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Network size={12} style={{ color: "var(--ink)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink)" }}>
                  {PLATFORMS.filter((p) => p.status === "connected").length} Platforms Connected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "20px",
            padding: "6px",
            borderRadius: "12px",
            background: "var(--surface-2)",
            border: "1px solid var(--border-soft)",
            overflowX: "auto",
          }}
        >
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                borderRadius: "8px",
                background: activeTab === id ? "var(--surface-3)" : "transparent",
                color: activeTab === id ? "var(--ink-strong)" : "var(--ink-dim)",
                boxShadow: activeTab === id ? "0 0 12px rgba(255,46,196,0.15)" : "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              <Icon size={14} />
              {label}
              {count !== null && (
                <span
                  style={{
                    padding: "2px 6px",
                    borderRadius: "10px",
                    background: activeTab === id ? "var(--pink)" : "var(--border)",
                    color: activeTab === id ? "#fff" : "var(--ink-faint)",
                    fontSize: "9px",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Connection Diagram */}
            <ConnectionDiagram />

            {/* Quick Links */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
              <PlatformCard platform={PLATFORMS[0]} />
              <PlatformCard platform={PLATFORMS[1]} />
              <PlatformCard platform={PLATFORMS[2]} />
              <PlatformCard platform={PLATFORMS[3]} />
            </div>

            {/* Featured Agents */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--ink-strong)", margin: 0 }}>
                  Featured Agents
                </h2>
                <button
                  onClick={() => setActiveTab("agents")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    color: "var(--ink-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                >
                  View All <ArrowRight size={12} />
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                {AGENTS.slice(0, 4).map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </div>

            {/* Memory & Storage */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
              <MemorySection />
              <StorageSection />
            </div>
          </div>
        )}

        {/* VMs Tab */}
        {activeTab === "vms" && (
          <div>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--ink)", margin: 0 }}>
                  Virtual Machines
                </h2>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)", margin: 0 }}>
                  {VMS.length} VMs across {VMS.filter((v) => v.status === "online").length} regions
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    color: "var(--ink)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                >
                  <Settings size={12} />
                  Configure
                </button>
              </div>
            </div>

            {/* VM Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
              {VMS.map((vm) => (
                <VMCard
                  key={vm.id}
                  vm={vm}
                  onSelect={() => setSelectedVM(selectedVM?.id === vm.id ? null : vm)}
                  isSelected={selectedVM?.id === vm.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Platforms Tab */}
        {activeTab === "platforms" && (
          <div>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--ink)", margin: 0 }}>
                  Platform Connections
                </h2>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)", margin: 0 }}>
                  Multi-channel integration across Lark, Slack, Discord, and Telegram
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: autoRefresh ? "var(--green)" : "var(--surface-2)",
                    border: "none",
                    color: autoRefresh ? "#000" : "var(--ink)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                >
                  <RefreshCw size={12} className={autoRefresh ? "animate-spin" : ""} />
                  Auto-refresh
                </button>
              </div>
            </div>

            {/* Connection Diagram */}
            <ConnectionDiagram />

            {/* Platform Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginTop: "20px" }}>
              {PLATFORMS.map((platform) => (
                <PlatformCard key={platform.id} platform={platform} />
              ))}
            </div>
          </div>
        )}

        {/* Agents Tab */}
        {activeTab === "agents" && (
          <div>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--ink)", margin: 0 }}>
                  Registered Agents
                </h2>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)", margin: 0 }}>
                  {filteredAgents.length} of {AGENTS.length} agents
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {/* Search */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Search size={12} style={{ color: "var(--ink-faint)" }} />
                  <input
                    type="text"
                    placeholder="Search agents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--ink)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      outline: "none",
                      width: "120px",
                    }}
                  />
                </div>

                {/* Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as AgentStatus | "all")}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    color: "var(--ink)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="idle">Idle</option>
                  <option value="training">Training</option>
                </select>

                {/* Add Button */}
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: "var(--pink)",
                    border: "none",
                    color: "#fff",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  <Plus size={12} />
                  Add Agent
                </button>
              </div>
            </div>

            {/* Agent Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "16px" }}>
            {/* Skill Inventory */}
            <SkillInventoryPanel skills={SKILLS} />

            {/* Skill Details */}
            <div>
              <div
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border-soft)",
                  marginBottom: "16px",
                }}
              >
                <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--ink)", margin: "0 0 12px 0" }}>
                  CashClaw v1.7.0 — Agent Economy
                </h3>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)", margin: "0 0 12px 0" }}>
                  13 skill packs including SEO auditor, content writer, lead generator, WhatsApp manager, social media, Stripe invoicer, email outreach, competitor analyzer, landing page, data scraper, reputation manager, Guard, and core orchestrator.
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <Badge tone="done">HYRVE Marketplace</Badge>
                  <Badge tone="done">Stripe MPP</Badge>
                  <Badge tone="done">Guard Runtime</Badge>
                </div>
              </div>

              <div
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border-soft)",
                  marginBottom: "16px",
                }}
              >
                <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--ink)", margin: "0 0 12px 0" }}>
                  QwenPaw v2.0 — Multi-Channel
                </h3>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)", margin: "0 0 12px 0" }}>
                  Built on Qwen-Agent. Handles Lark, Slack, Discord, Telegram, WeChat Work, DingTalk, QQ, and iMessage. Language detection for Chinese, Russian, and English.
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <Badge tone="done">8 Channels</Badge>
                  <Badge tone="done">3 Languages</Badge>
                  <Badge tone="active">Obsidian Sync</Badge>
                </div>
              </div>

              <div
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border-soft)",
                }}
              >
                <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--ink)", margin: "0 0 12px 0" }}>
                  TencentDB Progressive Memory
                </h3>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)", margin: "0 0 12px 0" }}>
                  4-tier memory architecture with 61% token reduction. Working Memory → Episodic Buffer → Semantic Memory → Procedural Memory.
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <Badge tone="done">4 Tiers</Badge>
                  <Badge tone="done">61% Savings</Badge>
                  <Badge tone="integrating">Integrating</Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Agent Modal */}
        <AddAgentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      </div>
    </>
  );
}
