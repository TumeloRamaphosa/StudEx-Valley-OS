"use client";

import { useState } from "react";
import {
  Globe, Cpu, TrendingUp, Building2, Users, Calendar,
  ChevronRight, ExternalLink, RefreshCw, Loader2,
  Star, Search, BookOpen, Shield, Zap, MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui";

// ─── China AI Agents Research ─────────────────────────────────────────────────

const CHINA_AGENTS = [
  {
    company: "Tencent",
    product: "Tencent Hunyuan",
    type: "Enterprise AI Agent Platform",
    stars: "N/A (enterprise)",
    lang: "Python / REST",
    highlight: "WeChat integration, massive user base, works in China + Africa",
    status: "Active Partner Target",
    icon: "🐧",
    url: "hunyuan.tencent.com",
    advantage: "Existing Lark-style multi-channel; ByteDance/Tencent footprint in Africa",
  },
  {
    company: "ByteDance",
    product: "Coze.cn / Coze Global",
    type: "Agent Builder Platform",
    stars: "N/A (enterprise)",
    lang: "Python / REST",
    highlight: "TikTok ecosystem, bot building, works in China + global",
    status: "Active Partner Target",
    icon: "🎵",
    url: "coze.cn",
    advantage: "Bot-to-bot communication; relevant for African youth market",
  },
  {
    company: "MiniMax",
    product: "MiniMax AI Platform",
    type: "LLM + Agent API",
    stars: "N/A",
    lang: "Python / REST",
    highlight: "Pure API play, competitive pricing, China-based",
    status: "Active Partner Target",
    icon: "🧠",
    url: "minimaxi.com",
    advantage: "API-first — easy to integrate into Orgo VMs",
  },
  {
    company: "Alibaba",
    product: "Druid AI / Qwen",
    type: "LLM Agent Platform",
    stars: "N/A (enterprise)",
    lang: "Python / REST",
    highlight: "DAMO platform, Qwen models, cloud integration",
    status: "Research",
    icon: "🏢",
    url: "qwen.ai",
    advantage: "Cloud infrastructure across Africa via Alibaba Cloud",
  },
  {
    company: "DeepSeek",
    product: "DeepSeek Coder / V3",
    type: "Open-weight Agent Models",
    stars: "40k+ ⭐",
    lang: "Python / vLLM",
    highlight: "Open weights, coding focus, 60% cheaper than GPT-4",
    status: "Research",
    icon: "🔍",
    url: "deepseek.com",
    advantage: "Open-source — run locally on Orgo VMs",
  },
  {
    company: "Kimi AI (Moonshot)",
    product: "Kimi API",
    type: "LLM API + Context",
    stars: "N/A",
    lang: "Python / REST",
    highlight: "1M token context, excellent for long document analysis",
    status: "Active Partner Target",
    icon: "💬",
    url: "kimi.moonshot.cn",
    advantage: "Long-context — perfect for Africa trade contract analysis",
  },
  {
    company: "Zhipu AI",
    product: "GLM-4 / AgentGLM",
    type: "Open Agent Framework",
    stars: "15k+ ⭐",
    lang: "Python",
    highlight: "Open-source agent framework, Chinese + English",
    status: "Watch",
    icon: "🤖",
    url: "zhipuai.cn",
    advantage: "Open-source friendly, good for academic partnerships",
  },
  {
    company: "StepFun",
    product: "Step-1 / Step-2 Models",
    type: "Multimodal Agent",
    stars: "N/A",
    lang: "Python / REST",
    highlight: "Multimodal, government-aligned, very large context",
    status: "Watch",
    icon: "⚡",
    url: "stepfun.com",
    advantage: "Government connections — useful for China-Africa government deals",
  },
];

// ─── Global AI Agent Frameworks ───────────────────────────────────────────────

const GLOBAL_AGENTS = [
  { name: "Anthropic Claude", type: "Claude API + MCP", highlight: "Claude computer use, tool use, enterprise — Anthropic directly", stars: "—", action: "Partner Outreach Active" },
  { name: "OpenAI GPT Agents", type: "Assistants API + Multi-Agent", highlight: "Market dominant, enterprise-grade, GPT-4o with vision", stars: "—", action: "Partner Outreach Active" },
  { name: "Microsoft Copilot Studio", type: "Azure AI Agent Service", highlight: "Enterprise agent runtime, Windows/Azure integration", stars: "—", action: "Watch" },
  { name: "Google Agent Space", type: "Gemini + Vertex AI Agents", highlight: "Jules coding agent, enterprise search, Google Workspace", stars: "—", action: "Partner Outreach Active" },
  { name: "NVIDIA NIM Agent Blueprints", type: "NIM Microservices", highlight: "Pre-built agent containers, enterprise deployment", stars: "—", action: "Partner Outreach Active" },
  { name: "AutoGen (Microsoft)", type: "Open-source multi-agent", stars: "22k+ ⭐", highlight: "Multi-agent conversation, .NET + Python", action: "Integrate" },
  { name: "CrewAI", type: "Open-source multi-agent", stars: "28k+ ⭐", highlight: "Role-based agents, easy onboarding, enterprise tier", action: "Integrate" },
  { name: "LangGraph (LangChain)", type: "Open-source agentic workflows", stars: "12k+ ⭐", highlight: "State machine for agents, LangSmith observability", action: "Integrate" },
  { name: "Agno AgentOS", type: "Python agent framework", stars: "12k+ ⭐", highlight: "BYOC, MCP 50+ endpoints, JWT RBAC — our blueprint", action: "Blueprint" },
  { name: "Phidata", type: "Open-source agent memory", stars: "8k+ ⭐", highlight: "Memory layer for agents, storage abstraction", action: "Integrate" },
];

// ─── Africa Pharma Distribution Research ─────────────────────────────────────

const AFRICA_COUNTRIES = [
  { country: "South Africa", flag: "🇿🇦", type: "HQ + JHB + Cape Town", facilities: ["Research Lab — JHB", "Distribution Hub — JHB", "Cold Storage — Cape Town"], status: "Active", vm: "Orgo AI — main", notes: "SAHPRA regulated, MCC approval" },
  { country: "Botswana", flag: "🇧🇼", type: "Government VM", facilities: ["Gaborone Distribution"], status: "Provisioning", vm: "Orgo AI — gov-bw", notes: "SADC compliant, citizen economic empowerment" },
  { country: "Eswatini", flag: "🇸🇿", type: "Government VM", facilities: ["Mbabane Distribution"], status: "Pending", vm: "Orgo AI — gov-sz", notes: "Small market, government tender focus" },
  { country: "Mozambique", flag: "🇲🇿", type: "Government VM", facilities: ["Maputo Hub"], status: "Pending", vm: "Orgo AI — gov-mz", notes: "Port logistics, Portuguese-speaking" },
  { country: "Zimbabwe", flag: "🇿🇼", type: "Government VM", facilities: ["Harare Hub"], status: "Pending", vm: "Orgo AI — gov-zw", notes: "Economic challenges, USD pricing" },
  { country: "Namibia", flag: "🇳🇦", type: "Government VM", facilities: ["Windhoek Distribution"], status: "Pending", vm: "Orgo AI — gov-na", notes: "SADC hub, uranium mining pharma needs" },
  { country: "Malawi", flag: "🇲🇼", type: "Distribution", facilities: ["Lilongwe Hub"], status: "Watch", vm: "—", notes: "New market, DGHS approval needed" },
  { country: "Zambia", flag: "🇿🇲", type: "Distribution", facilities: ["Lusaka Hub"], status: "Watch", vm: "—", notes: "ZAMRA regulated, copper belt" },
  { country: "Rwanda", flag: "🇷🇼", type: "Cold Storage Hub", facilities: ["Kigali Cold Storage", "Logistics Hub"], status: "Active", vm: "Orgo AI — Rwanda", notes: "RDB, hub for East Africa, cold chain priority" },
  { country: "Uganda", flag: "🇺🇬", type: "Distribution", facilities: ["Kampala Hub"], status: "Watch", vm: "—", notes: "NDA regulated, strong market" },
  { country: "Ghana", flag: "🇬🇭", type: "Distribution", facilities: ["Accra Hub"], status: "Watch", vm: "—", notes: "FDA Ghana, English-speaking West Africa" },
  { country: "Ethiopia", flag: "🇪🇹", type: "Distribution", facilities: ["Addis Ababa Hub"], status: "Watch", vm: "—", notes: "EFDA regulated, huge population" },
  { country: "Kenya", flag: "🇰🇪", type: "Distribution", facilities: ["Nairobi Hub"], status: "Priority", vm: "—", notes: "PPB Kenya, EAC hub, strong pharma" },
  { country: "Nigeria", flag: "🇳🇬", type: "Distribution", facilities: ["Lagos Hub", "Abuja"], status: "Priority", vm: "—", notes: "NAFDAC, largest African market, 200M+ people" },
  { country: "Egypt", flag: "🇪🇬", type: "Distribution", facilities: ["Cairo Hub"], status: "Watch", vm: "—", notes: "EDA, Arabic-speaking, North Africa" },
  { country: "Morocco", flag: "🇲🇦", type: "Distribution", facilities: ["Casablanca Hub"], status: "Watch", vm: "—", notes: "MSDA regulated, gateway to Maghreb" },
  { country: "Tunisia", flag: "🇹🇳", type: "Distribution", facilities: ["Tunis Hub"], status: "Watch", vm: "—", notes: "French-speaking, MOPH regulated" },
  { country: "Cape Verde", flag: "🇨🇻", type: "Distribution", facilities: ["Praia Hub"], status: "Watch", vm: "—", notes: "Portuguese-speaking, Atlantic gateway" },
  { country: "Zanzibar", flag: "🇿🇲", type: "Distribution", facilities: ["Stone Town Hub"], status: "Watch", vm: "—", notes: "TFDA regulated, tourism pharma" },
];

// ─── Africa Pharma Trade Shows 2025-2026 ─────────────────────────────────────

const TRADE_SHOWS = [
  { name: "Africa Health 2025", location: "Johannesburg, SA", date: "Oct 2025", type: "Exhibition", url: "africahealthexhibition.com", priority: "HIGH" },
  { name: "Pharmacotherapy Africa", location: "Nairobi, Kenya", date: "Sep 2025", type: "Conference", url: "pharmacotherapyafrica.com", priority: "HIGH" },
  { name: "World Pharma Summit", location: "Cape Town, SA", date: "Nov 2025", type: "Exhibition", url: "worldpharmasummit.com", priority: "MEDIUM" },
  { name: "African Pharma Expo", location: "Lagos, Nigeria", date: "Mar 2026", type: "Exhibition", url: "africanpharmaexpo.com", priority: "HIGH" },
  { name: "East Africa Pharma", location: "Kigali, Rwanda", date: "Jun 2026", type: "Exhibition", url: "eastafricapharma.com", priority: "HIGH" },
  { name: "Medica Africa", location: "Johannesburg, SA", date: "May 2026", type: "Exhibition", url: "medica africa", priority: "MEDIUM" },
  { name: "West Africa Health", location: "Accra, Ghana", date: "Jul 2026", type: "Conference", url: "westafricahealth.com", priority: "MEDIUM" },
  { name: "SADC Pharma Forum", location: "Gaborone, Botswana", date: "Aug 2026", type: "Government", url: "sadcpharmaforum", priority: "HIGH" },
];

// ─── Research Cards ───────────────────────────────────────────────────────────

function ResearchCard({ title, children, accent = "var(--pink)" }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <p className="font-mono text-sm font-bold mb-4" style={{ color: accent }}>{title}</p>
      {children}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ResearchHubPage() {
  const [tab, setTab] = useState<"china" | "global" | "africa" | "shows">("china");
  const [search, setSearch] = useState("");

  const filteredChina = CHINA_AGENTS.filter(
    (a) =>
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.product.toLowerCase().includes(search.toLowerCase()) ||
      a.highlight.toLowerCase().includes(search.toLowerCase())
  );

  const filteredGlobal = GLOBAL_AGENTS.filter(
    (a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.type.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAfrica = AFRICA_COUNTRIES.filter(
    (c) => c.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-mono text-2xl" style={{ color: "var(--ink-strong)" }}>Research Hub</h1>
        <p className="text-sm mt-1" style={{ color: "var(--ink-dim)" }}>
          China AI agents · Global frameworks · Africa pharma distribution · Trade shows
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--ink-faint)" }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search agents, companies..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border font-mono text-sm outline-none"
          style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--ink)" }}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl inline-flex" style={{ background: "var(--surface-2)", border: "1px solid var(--border-soft)" }}>
        {[
          { id: "china" as const, label: "China AI Agents", count: CHINA_AGENTS.length, accent: "#ff2ec4" },
          { id: "global" as const, label: "Global Frameworks", count: GLOBAL_AGENTS.length, accent: "var(--green)" },
          { id: "africa" as const, label: "Africa Distribution", count: AFRICA_COUNTRIES.length, accent: "var(--gold)" },
          { id: "shows" as const, label: "Trade Shows", count: TRADE_SHOWS.length, accent: "var(--pink)" },
        ].map(({ id, label, count, accent }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all"
            style={{
              background: tab === id ? "var(--surface-3)" : "transparent",
              color: tab === id ? accent : "var(--ink-dim)",
            }}
          >
            {label}
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full" style={{
              background: tab === id ? accent : "var(--border)",
              color: tab === id ? "white" : "var(--ink-faint)",
            }}>{count}</span>
          </button>
        ))}
      </div>

      {/* China AI Agents */}
      {tab === "china" && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredChina.map((agent) => (
              <div
                key={agent.company}
                className="rounded-xl border p-4 transition-all hover:-translate-y-0.5"
                style={{ borderColor: "var(--border-soft)", background: "var(--surface-2)" }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{agent.icon}</span>
                  <div className="flex-1">
                    <p className="font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>{agent.company}</p>
                    <p className="font-mono text-xs" style={{ color: "var(--ink-faint)" }}>{agent.product}</p>
                  </div>
                  <Badge tone={agent.status.includes("Active") ? "done" : agent.status === "Watch" ? "queued" : "muted"}>
                    {agent.status}
                  </Badge>
                </div>
                <p className="font-mono text-xs mb-2" style={{ color: "var(--ink-dim)" }}>{agent.highlight}</p>
                <p className="font-mono text-[10px] mb-3" style={{ color: "var(--green)" }}>★ {agent.advantage}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded border" style={{ borderColor: "var(--border)", color: "var(--ink-faint)" }}>{agent.type}</span>
                  <span className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{agent.url}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Global Frameworks */}
      {tab === "global" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredGlobal.map((agent) => (
            <div
              key={agent.name}
              className="rounded-xl border p-4"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface-2)" }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>{agent.name}</p>
                {agent.stars !== "—" && (
                  <Badge tone="done">{agent.stars}</Badge>
                )}
              </div>
              <p className="font-mono text-xs mb-2" style={{ color: "var(--ink-dim)" }}>{agent.type}</p>
              <p className="font-mono text-[10px] mb-3" style={{ color: "var(--ink-faint)" }}>{agent.highlight}</p>
              <Badge tone={
                agent.action.includes("Active") ? "done" :
                agent.action === "Integrate" ? "running" :
                agent.action === "Blueprint" ? "warn" : "queued"
              }>
                {agent.action}
              </Badge>
            </div>
          ))}
        </div>
      )}

      {/* Africa Distribution */}
      {tab === "africa" && (
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredAfrica.map((c) => (
              <div
                key={c.country}
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--border-soft)", background: "var(--surface-2)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{c.flag}</span>
                  <div>
                    <p className="font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>{c.country}</p>
                    <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{c.type}</p>
                  </div>
                  <Badge
                    tone={c.status === "Active" ? "done" : c.status === "Provisioning" ? "running" : c.status === "Priority" ? "warn" : "queued"}
                    className="ml-auto"
                  >
                    {c.status}
                  </Badge>
                </div>
                <div className="space-y-1 mb-2">
                  {c.facilities.map((f) => (
                    <p key={f} className="font-mono text-[10px] pl-2" style={{ color: "var(--ink-dim)" }}>• {f}</p>
                  ))}
                </div>
                <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{c.notes}</p>
                {c.vm !== "—" && (
                  <p className="font-mono text-[10px] mt-1" style={{ color: "var(--green)" }}>VM: {c.vm}</p>
                )}
              </div>
            ))}
          </div>
          {/* Facility Summary */}
          <div className="mt-6 p-4 rounded-xl border" style={{ borderColor: "var(--gold)", background: "rgba(201,168,76,0.05)" }}>
            <p className="font-mono text-sm font-bold mb-3" style={{ color: "var(--gold)" }}>Facility Network</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Research Lab", loc: "Johannesburg, SA", icon: "🔬" },
                { label: "Distribution HQ", loc: "Johannesburg, SA", icon: "📦" },
                { label: "Cold Storage", loc: "Cape Town, SA", icon: "❄️" },
                { label: "Cold Hub", loc: "Kigali, RW", icon: "🏔️" },
              ].map((f) => (
                <div key={f.label} className="text-center p-3 rounded-xl border" style={{ borderColor: "var(--border-soft)", background: "var(--surface-2)" }}>
                  <span className="text-xl">{f.icon}</span>
                  <p className="font-mono text-xs mt-1" style={{ color: "var(--ink)" }}>{f.label}</p>
                  <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{f.loc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trade Shows */}
      {tab === "shows" && (
        <div className="space-y-3">
          {TRADE_SHOWS.map((show) => (
            <div
              key={show.name}
              className="flex items-center gap-4 p-4 rounded-xl border"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface-2)" }}
            >
              <Calendar size={18} style={{ color: "var(--pink)" }} />
              <div className="flex-1">
                <p className="font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>{show.name}</p>
                <p className="font-mono text-xs" style={{ color: "var(--ink-dim)" }}>{show.location} · {show.date}</p>
              </div>
              <Badge tone={show.priority === "HIGH" ? "done" : "queued"}>{show.priority}</Badge>
              <Badge tone="muted">{show.type}</Badge>
              <a
                href={`https://${show.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] px-2 py-1 rounded border"
                style={{ borderColor: "var(--border)", color: "var(--ink-dim)" }}
              >
                <ExternalLink size={10} className="inline mr-1" />
                Link
              </a>
            </div>
          ))}
        </div>
      )}

      {/* AfCFTA Note */}
      <div className="mt-6 p-4 rounded-xl border" style={{ borderColor: "var(--green)", background: "rgba(57,255,170,0.05)" }}>
        <div className="flex items-center gap-3">
          <Shield size={16} style={{ color: "var(--green)" }} />
          <div>
            <p className="font-mono text-sm font-bold" style={{ color: "var(--green)" }}>AfCFTA Advantage</p>
            <p className="font-mono text-xs" style={{ color: "var(--ink-dim)" }}>
              Africa Continental Free Trade Area — pharmaceutical tariffs reduced across 54 signatory states.
              Government VM structures in each country tap into local procurement budgets and AfCFTA trade corridors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
