"use client";

import { useState } from "react";
import {
  Send, Mail, Loader2, CheckCircle2, Clock, AlertTriangle,
  Users, MessageSquare, Globe, ChevronRight, Bot, Zap,
  ArrowRight, Star, MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui";

// ─── Partner Data ──────────────────────────────────────────────────────────────

const PARTNERS = [
  {
    id: "tencent",
    name: "Tencent",
    icon: "🐧",
    sector: "Cloud + AI Agent",
    product: "Hunyuan / WeChat AI",
    target_email: "partnerships@tencent.com",
    cc_email: "ai-platform@tencent.com",
    subject: "Strategic AI Agent Partnership — Africa + Russia Market Expansion",
    status: "email_sent",
    priority: "HIGH",
    body: `Dear Tencent Partnerships Team,

My name is Tumelo Ramaphosa, Founder of StudEx Global Markets — a South African pharmaceutical distribution company with active Russian partnerships and AI agent infrastructure across Africa.

We're building an AI Agent OS on Orgo AI cloud infrastructure, serving 18 African countries with Government VM structures. We already operate in China through ByteDance and are exploring Tencent's Hunyuan platform for:

1. Multi-channel AI agents — WeChat + Lark integration for China/Russia/Africa markets
2. Enterprise agent deployment — StudEx agent mesh across Africa
3. Research partnership — Africa pharma + China AI capabilities

Tencent's existing ByteDance/Tencent footprint in Africa makes this a natural partnership.

I'd like to schedule a 30-minute call this week. Available times:
- Tuesday 14:00 CST
- Wednesday 10:00 CST
- Thursday 16:00 CST

Best regards,
Tumelo Ramaphosa
Founder, StudEx Global Markets
+27 (0)XX XXX XXXX
www.studexmeat.com`,
    lastContact: "Sent today",
    nextStep: "Follow up in 3 days",
    responseScore: 8,
  },
  {
    id: "bytedance",
    name: "ByteDance",
    icon: "🎵",
    sector: "AI Agent Platform",
    product: "Coze.cn / Coze Global",
    target_email: "enterprise@bytedance.com",
    cc_email: "ai-partnerships@bytedance.com",
    subject: "Coze Global Partnership — African AI Agent Network",
    status: "researching",
    priority: "HIGH",
    body: `Dear ByteDance Enterprise Team,

I'm Tumelo Ramaphosa, Founder of StudEx Global Markets, operating pharmaceutical distribution across 18 African countries with active partnerships in Russia.

We're expanding our AI Agent OS — currently built on QwenPaw for multi-channel support (Lark, Slack, Discord, WeChat). We'd like to explore Coze Global as our enterprise agent builder platform:

- Coze's bot-building infrastructure for African government VMs
- TikTok ecosystem integration for youth engagement campaigns
- Multi-language support (English, Russian, French, Portuguese, Arabic)

ByteDance's existing African presence aligns perfectly with our distribution expansion.

Available for call: Wed/Thu 15:00 CST.

Tumelo Ramaphosa
StudEx Global Markets`,
    lastContact: "Researching",
    nextStep: "Draft outreach",
    responseScore: 7,
  },
  {
    id: "minimax",
    name: "MiniMax",
    icon: "🧠",
    sector: "LLM + Agent API",
    product: "MiniMax API Platform",
    target_email: "bd@minimaxi.com",
    cc_email: "api-support@minimaxi.com",
    subject: "API Partnership — African AI Agent Infrastructure",
    status: "pending",
    priority: "HIGH",
    body: `Dear MiniMax Business Development,

Tumelo Ramaphosa here — StudEx Global Markets, South Africa. We run AI agents on Orgo VM infrastructure across 18 African countries.

MiniMax's API-first approach makes you ideal for our next integration:
- LLM API for our Research Agent (China AI intelligence)
- Agent fine-tuning on African pharma data
- Competitive pricing for 24/7 agent operations

API-first means we can deploy globally without enterprise negotiation cycles.

Can we get on a call this week?

Tumelo Ramaphosa
StudEx Global Markets`,
    lastContact: "Not contacted",
    nextStep: "Send outreach",
    responseScore: 9,
  },
  {
    id: "kimi",
    name: "Kimi AI (Moonshot)",
    icon: "💬",
    sector: "LLM API + Context",
    product: "Kimi API",
    target_email: "partnership@moonshot.cn",
    cc_email: "",
    subject: "Kimi API Partnership — Long-Context Africa Trade Intelligence",
    status: "pending",
    priority: "HIGH",
    body: `Dear Moonshot AI Team,

Tumelo Ramaphosa, StudEx Global Markets — South Africa.

Kimi's 1M token context window is exactly what we need for Africa trade intelligence:
- Analyzing long pharmaceutical trade contracts (AfCFTA agreements)
- Russia-SA trade week documentation
- Government VM tender documentation

We'd like to explore a partnership for API credits + co-marketing in Africa.

Available for call: anytime SAST mornings work.

Tumelo Ramaphosa
StudEx Global Markets`,
    lastContact: "Not contacted",
    nextStep: "Send outreach",
    responseScore: 9,
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    icon: "🎮",
    sector: "AI Infrastructure",
    product: "NIM Agent Blueprints",
    target_email: "enterprise@nvidia.com",
    cc_email: "ai-agents@nvidia.com",
    subject: "NVIDIA NIM Partnership — African AI Agent Infrastructure",
    status: "email_sent",
    priority: "HIGH",
    body: `Dear NVIDIA Enterprise Team,

Tumelo Ramaphosa, StudEx Global Markets — South Africa.

We operate AI agents across 18 African countries on Orgo VM infrastructure. We're exploring NVIDIA NIM Agent Blueprints for:

- Pre-built agent containers for pharmaceutical compliance
- GPU-accelerated inference for our Research Agent
- Enterprise deployment patterns for Government VM structures

NVIDIA's African datacenter expansion makes this particularly relevant.

Looking for 30 min to discuss NIM microservices for our agent OS.

Tumelo Ramaphosa
StudEx Global Markets`,
    lastContact: "Sent today",
    nextStep: "Follow up in 5 days",
    responseScore: 8,
  },
  {
    id: "anthropic",
    name: "Anthropic",
    icon: "🧬",
    sector: "AI Safety + Agents",
    product: "Claude API + MCP",
    target_email: "partnerships@anthropic.com",
    cc_email: "enterprise@anthropic.com",
    subject: "Anthropic Partnership — African AI Safety + Enterprise Agents",
    status: "researching",
    priority: "MEDIUM",
    body: `Dear Anthropic Partnerships,

I'm Tumelo Ramaphosa, Founder of StudEx Global Markets — a South African pharmaceutical distribution company operating AI agents across Africa.

We use Claude for our ADAM SMASHER agent (Global Markets AI) and are exploring:
- Claude MCP for our multi-VM agent orchestrator
- Enterprise tier for 24/7 agent operations
- AI safety frameworks for regulated pharma environments

Would love to discuss a partnership or enterprise trial.

Tumelo Ramaphosa
StudEx Global Markets`,
    lastContact: "Researching",
    nextStep: "Draft outreach",
    responseScore: 7,
  },
  {
    id: "google",
    name: "Google",
    icon: "🔍",
    sector: "Cloud + AI",
    product: "Gemini + Vertex AI Agents",
    target_email: "partnerships@google.com",
    cc_email: "enterprise@google.com",
    subject: "Google Cloud Partnership — African AI Agent Expansion",
    status: "pending",
    priority: "MEDIUM",
    body: `Dear Google Cloud Partnerships,

Tumelo Ramaphosa, StudEx Global Markets — South Africa.

We operate AI agents across 18 African countries. Google Cloud's African datacenter expansion + Gemini API would strengthen our agent OS:

- Vertex AI Agents for enterprise deployment
- Gemini for multi-modal Africa trade intelligence
- Google Workspace integration for government VM coordination

Available for a call this month.

Tumelo Ramaphosa
StudEx Global Markets`,
    lastContact: "Not contacted",
    nextStep: "Send outreach",
    responseScore: 8,
  },
];

// ─── Email Thread Component ───────────────────────────────────────────────────

function PartnerCard({ partner, onExpand }: { partner: typeof PARTNERS[0]; onExpand: () => void }) {
  const statusMap = {
    email_sent: { tone: "done" as const, icon: CheckCircle2, label: "Email Sent", color: "var(--green)" },
    researching: { tone: "running" as const, icon: Clock, label: "Researching", color: "var(--pink)" },
    pending: { tone: "queued" as const, icon: Loader2, label: "Pending", color: "var(--ink-faint)" },
    responded: { tone: "done" as const, icon: Star, label: "Responded", color: "var(--gold)" },
  };
  const s = statusMap[partner.status as keyof typeof statusMap];

  return (
    <div
      className="rounded-xl border p-5 transition-all hover:-translate-y-0.5"
      style={{ borderColor: "var(--border-soft)", background: "var(--surface-2)" }}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{partner.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>{partner.name}</p>
            <Badge tone={partner.priority === "HIGH" ? "done" : "muted"}>{partner.priority}</Badge>
            <Badge tone={s.tone}>
              <s.icon size={10} className={partner.status === "researching" ? "animate-pulse" : ""} />
              {s.label}
            </Badge>
          </div>
          <p className="font-mono text-xs mt-0.5" style={{ color: "var(--ink-faint)" }}>
            {partner.sector} · {partner.product}
          </p>
          <p className="font-mono text-[10px] mt-1" style={{ color: "var(--ink-dim)" }}>
            → {partner.target_email}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <span className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{partner.lastContact}</span>
            <span className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>Next: {partner.nextStep}</span>
          </div>
          {/* Response score bar */}
          <div className="mt-2 flex items-center gap-2">
            <span className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>Fit</span>
            <div className="flex-1 h-1 rounded-full" style={{ background: "var(--surface-3)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${partner.responseScore * 10}%`, background: "var(--pink)", boxShadow: "0 0 6px var(--pink-glow)" }}
              />
            </div>
            <span className="font-mono text-[10px]" style={{ color: "var(--pink)" }}>{partner.responseScore}/10</span>
          </div>
        </div>
        <button
          onClick={onExpand}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono text-xs transition-all hover:-translate-y-0.5"
          style={{
            background: "var(--surface-3)",
            color: "var(--ink)",
            border: "1px solid var(--border-soft)",
          }}
        >
          <Mail size={12} /> Outreach <ChevronRight size={10} />
        </button>
      </div>
    </div>
  );
}

function OutreachModal({ partner, onClose }: { partner: typeof PARTNERS[0]; onClose: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(7,10,12,0.8)", backdropFilter: "blur(8px)" }}>
      <div
        className="w-full max-w-2xl rounded-2xl border p-6 max-h-[85vh] overflow-y-auto"
        style={{ borderColor: "var(--pink)", background: "var(--surface)", boxShadow: "0 0 40px rgba(255,46,196,0.3)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{partner.icon}</span>
            <div>
              <p className="font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>Outreach: {partner.name}</p>
              <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{partner.subject}</p>
            </div>
          </div>
          <button onClick={onClose} className="font-mono text-sm" style={{ color: "var(--ink-faint)" }}>✕ Close</button>
        </div>

        {/* Email fields */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] w-8" style={{ color: "var(--ink-faint)" }}>To:</span>
            <span className="font-mono text-xs" style={{ color: "var(--ink)" }}>{partner.target_email}</span>
          </div>
          {partner.cc_email && (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] w-8" style={{ color: "var(--ink-faint)" }}>CC:</span>
              <span className="font-mono text-xs" style={{ color: "var(--ink)" }}>{partner.cc_email}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] w-8" style={{ color: "var(--ink-faint)" }}>Subj:</span>
            <span className="font-mono text-xs" style={{ color: "var(--ink)" }}>{partner.subject}</span>
          </div>
        </div>

        {/* Email body */}
        <textarea
          readOnly
          value={partner.body}
          className="w-full h-64 p-4 rounded-xl border font-mono text-xs outline-none resize-none"
          style={{ borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--ink)" }}
        />

        {/* Actions */}
        <div className="flex items-center justify-between mt-4">
          <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>
            📧 SMTP not configured yet — this shows what we'll send once email is set up.
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-mono text-sm"
              style={{ border: "1px solid var(--border)", color: "var(--ink-dim)" }}
            >
              Cancel
            </button>
            <button
              onClick={() => setSent(true)}
              disabled={sent}
              className="flex items-center gap-2 px-5 py-2 rounded-xl font-mono text-sm font-semibold transition-all"
              style={{
                background: sent ? "var(--green)" : "var(--pink)",
                color: "white",
                boxShadow: sent ? "0 0 20px var(--green-glow)" : "0 0 20px var(--pink-glow)",
              }}
            >
              {sent ? <><CheckCircle2 size={14} /> Sent!</> : <><Send size={14} /> Send Outreach</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PartnerOutreachPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "sent" | "researching">("all");

  const filtered = PARTNERS.filter((p) => {
    if (filter === "all") return true;
    if (filter === "pending") return p.status === "pending";
    if (filter === "sent") return p.status === "email_sent";
    if (filter === "researching") return p.status === "researching";
    return true;
  });

  const expandedPartner = PARTNERS.find((p) => p.id === expanded) ?? null;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-mono text-2xl" style={{ color: "var(--ink-strong)" }}>Partner Outreach</h1>
        <p className="text-sm mt-1" style={{ color: "var(--ink-dim)" }}>
          Subagent-powered outreach to Tencent · ByteDance · MiniMax · Kimi · NVIDIA · Google · Anthropic
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Targets", value: PARTNERS.length, icon: Globe, color: "var(--ink)" },
          { label: "Email Sent", value: PARTNERS.filter((p) => p.status === "email_sent").length, icon: Send, color: "var(--green)" },
          { label: "Researching", value: PARTNERS.filter((p) => p.status === "researching").length, icon: Clock, color: "var(--pink)" },
          { label: "Pending", value: PARTNERS.filter((p) => p.status === "pending").length, icon: Loader2, color: "var(--ink-faint)" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="p-4 rounded-xl border text-center" style={{ borderColor: "var(--border-soft)", background: "var(--surface-2)" }}>
            <Icon size={16} style={{ color }} className="mx-auto mb-1" />
            <p className="font-mono text-xl font-bold" style={{ color }}>{value}</p>
            <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-1 mb-4 p-1 rounded-xl inline-flex" style={{ background: "var(--surface-2)", border: "1px solid var(--border-soft)" }}>
        {(["all", "pending", "sent", "researching"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg font-mono text-xs transition-all capitalize"
            style={{
              background: filter === f ? "var(--surface-3)" : "transparent",
              color: filter === f ? "var(--ink)" : "var(--ink-faint)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Partner Cards */}
      <div className="space-y-3">
        {filtered.map((partner) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            onExpand={() => setExpanded(expanded === partner.id ? null : partner.id)}
          />
        ))}
      </div>

      {/* QwenPaw Email Note */}
      <div className="mt-6 p-4 rounded-xl border" style={{ borderColor: "#8a6bff", background: "rgba(138,107,255,0.05)" }}>
        <div className="flex items-center gap-3">
          <Bot size={16} style={{ color: "#8a6bff" }} />
          <div>
            <p className="font-mono text-sm font-bold" style={{ color: "#8a6bff" }}>QwenPaw Email Agent</p>
            <p className="font-mono text-xs" style={{ color: "var(--ink-dim)" }}>
              Once SMTP is configured (host/port/user/app-password), QwenPaw's native Lark email integration will automate outreach.
              Current state: preview mode — all emails shown but not yet sent.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {expandedPartner && (
        <OutreachModal partner={expandedPartner} onClose={() => setExpanded(null)} />
      )}
    </div>
  );
}
