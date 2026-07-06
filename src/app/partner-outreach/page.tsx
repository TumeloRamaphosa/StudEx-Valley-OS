"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Send, Mail, Loader2, CheckCircle2, Clock, AlertTriangle,
  Users, MessageSquare, Globe, ChevronRight, Bot, Zap,
  ArrowRight, Star, MapPin, Linkedin, Twitter, Bell,
  Inbox, Archive, Trash2, Eye, EyeOff, RefreshCw,
  Terminal, Activity, Cpu, Network, Server, Cloud,
  MessageCircle, MailOpen, Clock3, Filter, Search,
  ChevronDown, ChevronUp, ExternalLink, Copy, Check,
  Radio, Signal, Zap as ZapIcon, Cog, Workflow,
  SlackIcon, MessageSquareDot, User, Briefcase, Calendar,
  TrendingUp, TrendingDown, Minus, GripVertical,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type OutreachStatus = "pending" | "researching" | "email_sent" | "responded" | "negotiating" | "declined";
type Priority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
type Channel = "email" | "linkedin" | "twitter" | "lark" | "slack";
type TemplateType = "china_ai" | "western_ai" | "hardware_infra" | "social_ai";

interface Partner {
  id: string;
  name: string;
  icon: string;
  website: string;
  sector: string;
  product: string;
  target_email: string;
  cc_email: string;
  linkedin_url: string;
  twitter_handle: string;
  status: OutreachStatus;
  priority: Priority;
  channel: Channel;
  template_type: TemplateType;
  subject: string;
  body: string;
  lastContact: string;
  lastContactDate: Date;
  nextStep: string;
  responseScore: number;
  responseIntent: "hot" | "warm" | "cold" | null;
  notes: string;
  region: "china" | "usa" | "eu";
}

interface SubAgent {
  id: string;
  name: string;
  icon: string;
  company: string;
  taskStatus: "idle" | "researching" | "drafting" | "sending" | "following_up" | "waiting_response";
  emailSentAt: Date | null;
  responseTracked: boolean;
  followUpScheduled: Date | null;
  progress: number;
  currentAction: string;
  log: string[];
}

interface MailItem {
  id: string;
  from: string;
  fromName: string;
  company: string;
  subject: string;
  preview: string;
  body: string;
  receivedAt: Date;
  isRead: boolean;
  replyIntent: "high" | "medium" | "low" | null;
  sentiment: "positive" | "neutral" | "negative";
  actionRequired: string;
}

interface EmailTemplate {
  id: string;
  type: TemplateType;
  name: string;
  description: string;
  subject: string;
  body: string;
}

// ─── Matrix Rain Effect ──────────────────────────────────────────────────────

function MatrixRain() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 0,
      opacity: 0.03,
      overflow: "hidden",
    }}>
      <svg width="100%" height="100%">
        <defs>
          <linearGradient id="matrixGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff2ec4" />
            <stop offset="100%" stopColor="#39ffaa" />
          </linearGradient>
        </defs>
        {Array.from({ length: 50 }).map((_, i) => (
          <text
            key={i}
            x={i * 40 + 20}
            y={Math.random() * 100 + "%"}
            fill="url(#matrixGrad)"
            fontSize="14"
            fontFamily="monospace"
          >
            {String.fromCharCode(0x30A0 + Math.random() * 96)}
          </text>
        ))}
      </svg>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PARTNERS: Partner[] = [
  {
    id: "tencent",
    name: "Tencent",
    icon: "🐧",
    website: "hunyuan.tencent.com",
    sector: "Cloud + Enterprise AI",
    product: "Hunyuan / WeChat AI",
    target_email: "partnerships@tencent.com",
    cc_email: "ai-platform@tencent.com",
    linkedin_url: "https://linkedin.com/company/tencent",
    twitter_handle: "@Tencent",
    status: "responded",
    priority: "CRITICAL",
    channel: "email",
    template_type: "china_ai",
    subject: "Strategic AI Agent Partnership — Africa + Russia Market Expansion",
    body: `Dear Tencent Partnerships Team,

My name is Tumelo Ramaphosa, Founder of StudEx Global Markets — a South African pharmaceutical distribution company with active Russian partnerships and AI agent infrastructure across Africa.

We're building an AI Agent OS on Orgo AI cloud infrastructure, serving 18 African countries with Government VM structures. We already operate in China through ByteDance and are exploring Tencent's Hunyuan platform for:

1. Multi-channel AI agents — WeChat + Lark integration for China/Russia/Africa markets
2. Enterprise agent deployment — StudEx agent mesh across Africa
3. Research partnership — Africa pharma + China AI capabilities

Tencent's existing ByteDance/Tencent footprint in Africa makes this a natural partnership. Hunyuan's enterprise capabilities align perfectly with our Government VM requirements.

I'd like to schedule a 30-minute call this week. Available times:
- Tuesday 14:00 CST
- Wednesday 10:00 CST
- Thursday 16:00 CST

Best regards,
Tumelo Ramaphosa
Founder, StudEx Global Markets
+27 (0)11 XXX XXXX
www.studexmeat.com`,
    lastContact: "2026-07-05",
    lastContactDate: new Date("2026-07-05T09:30:00"),
    nextStep: "Schedule call, discuss API pricing",
    responseScore: 9,
    responseIntent: "hot",
    notes: "They responded positively, interested in Africa expansion. Requested product demo.",
    region: "china",
  },
  {
    id: "bytedance",
    name: "ByteDance / Coze",
    icon: "🎵",
    website: "coze.cn",
    sector: "AI Agent Platform",
    product: "Coze.cn / Doubao",
    target_email: "enterprise@bytedance.com",
    cc_email: "ai-partnerships@bytedance.com",
    linkedin_url: "https://linkedin.com/company/bytedance",
    twitter_handle: "@ByteDance",
    status: "email_sent",
    priority: "CRITICAL",
    channel: "email",
    template_type: "china_ai",
    subject: "Coze Global Partnership — African AI Agent Network",
    body: `Dear ByteDance Enterprise Team,

I'm Tumelo Ramaphosa, Founder of StudEx Global Markets, operating pharmaceutical distribution across 18 African countries with active partnerships in Russia.

We're expanding our AI Agent OS — currently built on QwenPaw for multi-channel support (Lark, Slack, Discord, WeChat). We'd like to explore Coze Global as our enterprise agent builder platform:

- Coze's bot-building infrastructure for African government VMs
- TikTok ecosystem integration for youth engagement campaigns
- Multi-language support (English, Russian, French, Portuguese, Arabic)
- Doubao API integration for Chinese language processing

ByteDance's existing African presence aligns perfectly with our distribution expansion. Our combined reach could transform pharmaceutical access across the continent.

Available for call: Wed/Thu 15:00 CST.

Tumelo Ramaphosa
StudEx Global Markets
+27 (0)11 XXX XXXX`,
    lastContact: "2026-07-04",
    lastContactDate: new Date("2026-07-04T14:22:00"),
    nextStep: "Follow up July 8, check if email reached right team",
    responseScore: 8,
    responseIntent: null,
    notes: "Used Coze before, very familiar with platform. Strong fit.",
    region: "china",
  },
  {
    id: "minimax",
    name: "MiniMax",
    icon: "🧠",
    website: "minimaxi.com",
    sector: "LLM + Agent API",
    product: "abab models / Hailuo Video",
    target_email: "bd@minimaxi.com",
    cc_email: "api-support@minimaxi.com",
    linkedin_url: "https://linkedin.com/company/minimax-ai",
    twitter_handle: "@MiniMaxAI",
    status: "negotiating",
    priority: "HIGH",
    channel: "email",
    template_type: "china_ai",
    subject: "API Partnership — African AI Agent Infrastructure + Hailuo Video",
    body: `Dear MiniMax Business Development,

Tumelo Ramaphosa here — StudEx Global Markets, South Africa. We run AI agents on Orgo VM infrastructure across 18 African countries.

MiniMax's API-first approach and competitive pricing make you ideal for our next integration:

- LLM API for our Research Agent (China AI intelligence gathering)
- abab model fine-tuning on African pharma regulatory data
- Hailuo Video API for pharmaceutical product visualization
- Competitive pricing for 24/7 agent operations at scale

Your API-first approach means we can deploy globally without lengthy enterprise negotiation cycles. We're already running pilots on competitor APIs and MiniMax pricing would significantly improve our unit economics.

Can we get on a call this week to discuss volume pricing?

Tumelo Ramaphosa
StudEx Global Markets
+27 (0)11 XXX XXXX`,
    lastContact: "2026-07-03",
    lastContactDate: new Date("2026-07-03T11:45:00"),
    nextStep: "Discussing pricing tiers, waiting for enterprise quote",
    responseScore: 9,
    responseIntent: "warm",
    notes: "Very responsive. Discussing volume pricing.向他们展示我们在中国有业务.",
    region: "china",
  },
  {
    id: "kimi",
    name: "Kimi AI / Moonshot",
    icon: "💬",
    website: "moonshot.cn",
    sector: "LLM API + Long Context",
    product: "k1.5 / 128K context",
    target_email: "partnership@moonshot.cn",
    cc_email: "",
    linkedin_url: "https://linkedin.com/company/moonshotai",
    twitter_handle: "@MoonshotAI",
    status: "email_sent",
    priority: "HIGH",
    channel: "email",
    template_type: "china_ai",
    subject: "Kimi API Partnership — Long-Context Africa Trade Intelligence",
    body: `Dear Moonshot AI Team,

Tumelo Ramaphosa, StudEx Global Markets — South Africa.

Kimi's 1M token context window is exactly what we need for Africa trade intelligence:

- Analyzing long pharmaceutical trade contracts (AfCFTA agreements spanning decades)
- Russia-SA trade week documentation and analysis
- Government VM tender documentation (often 50K+ word RFPs)
- Multi-document synthesis for regulatory compliance across 18 countries

Your fast growth and technical excellence are exactly what an emerging market leader needs. We'd like to explore a partnership for API credits + co-marketing in Africa.

Available for call: anytime SAST mornings work (14:00-18:00 CST).

Tumelo Ramaphosa
StudEx Global Markets
+27 (0)11 XXX XXXX`,
    lastContact: "2026-07-02",
    lastContactDate: new Date("2026-07-02T16:00:00"),
    nextStep: "Follow up July 7, emphasize AfCFTA use case",
    responseScore: 9,
    responseIntent: null,
    notes: "Strong technical fit. Long context is perfect for contract analysis.",
    region: "china",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    icon: "🔍",
    website: "deepseek.com",
    sector: "Open-Source LLM",
    product: "DeepSeek Coder / V2",
    target_email: "business@deepseek.com",
    cc_email: "research@deepseek.com",
    linkedin_url: "https://linkedin.com/company/deepseek",
    twitter_handle: "@deepseek_ai",
    status: "researching",
    priority: "HIGH",
    channel: "email",
    template_type: "china_ai",
    subject: "DeepSeek Partnership — Ultra-Low Cost AI for African Scale",
    body: `Dear DeepSeek Team,

Tumelo Ramaphosa, StudEx Global Markets — South Africa.

DeepSeek's open-source models and ultra-low pricing are exactly what African-scale AI deployment requires:

- DeepSeek Coder for our pharmaceutical code generation agents
- V2 model for research synthesis at continent scale
- Self-hosted deployment options for Government VM compliance
- Open-source partnership for Africa-focused model fine-tuning

At 18 countries, 1.4B people, and constrained budgets, DeepSeek's economics are transformative. We'd like to discuss:

1. Enterprise API pricing for high-volume usage
2. Open-source partnership for Africa-specific fine-tuning
3. Co-marketing for African market expansion

Available this week.

Tumelo Ramaphosa
StudEx Global Markets
+27 (0)11 XXX XXXX`,
    lastContact: "2026-07-01",
    lastContactDate: new Date("2026-07-01T10:00:00"),
    nextStep: "Research their enterprise offerings, prepare custom pitch",
    responseScore: 8,
    responseIntent: null,
    notes: "Just learned about them. Very excited about pricing model.",
    region: "china",
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    icon: "🎮",
    website: "nvidia.com/nim",
    sector: "AI Infrastructure",
    product: "NIM Agent Blueprints",
    target_email: "enterprise@nvidia.com",
    cc_email: "ai-agents@nvidia.com",
    linkedin_url: "https://linkedin.com/company/nvidia",
    twitter_handle: "@NVIDIAAIDev",
    status: "email_sent",
    priority: "CRITICAL",
    channel: "email",
    template_type: "hardware_infra",
    subject: "NVIDIA NIM Partnership — African AI Agent Infrastructure at Scale",
    body: `Dear NVIDIA Enterprise Team,

Tumelo Ramaphosa, StudEx Global Markets — South Africa.

We operate AI agents across 18 African countries on Orgo VM infrastructure. We're exploring NVIDIA NIM Agent Blueprints for:

- Pre-built agent containers for pharmaceutical compliance monitoring
- GPU-accelerated inference for our Research Agent (running 24/7)
- Enterprise deployment patterns for Government VM structures
- African datacenter partnerships for low-latency inference

NVIDIA's announced African datacenter expansion makes this particularly strategic. StudEx could be your launch partner for Government AI infrastructure across the continent.

Looking for 30 min to discuss NIM microservices for our agent OS and potential GPU allocation for our growing agent fleet.

Tumelo Ramaphosa
StudEx Global Markets
+27 (0)11 XXX XXXX
www.studexmeat.com`,
    lastContact: "2026-07-04",
    lastContactDate: new Date("2026-07-04T08:15:00"),
    nextStep: "Awaiting response, follow up July 9",
    responseScore: 8,
    responseIntent: null,
    notes: "Infrastructure is critical. Need GPU capacity for agent scaling.",
    region: "usa",
  },
  {
    id: "google",
    name: "Google",
    icon: "🔍",
    website: "cloud.google.com",
    sector: "Cloud + AI",
    product: "Gemini / Vertex AI",
    target_email: "partnerships@google.com",
    cc_email: "enterprise@google.com",
    linkedin_url: "https://linkedin.com/company/google",
    twitter_handle: "@GoogleCloud",
    status: "pending",
    priority: "MEDIUM",
    channel: "email",
    template_type: "western_ai",
    subject: "Google Cloud Partnership — African AI Agent Expansion via Vertex AI",
    body: `Dear Google Cloud Partnerships,

Tumelo Ramaphosa, StudEx Global Markets — South Africa.

We operate AI agents across 18 African countries. Google Cloud's African datacenter expansion + Gemini API would strengthen our agent OS significantly:

- Vertex AI Agents for enterprise deployment at Government scale
- Gemini 1.5 Pro for multi-modal Africa trade intelligence
- Google Workspace integration for government VM coordination
- Looker for real-time agent performance analytics

Your African infrastructure investment aligns with our expansion timeline. We'd like to explore:

1. Startup/NGO pricing for emerging market deployment
2. Government VM partnership frameworks
3. Gemini API integration for our research pipeline

Available for a call this month.

Tumelo Ramaphosa
StudEx Global Markets
+27 (0)11 XXX XXXX`,
    lastContact: "Not contacted",
    lastContactDate: new Date(),
    nextStep: "Send outreach July 7",
    responseScore: 7,
    responseIntent: null,
    notes: "Lower priority than China AI companies. Good for multi-modal.",
    region: "usa",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    icon: "🧬",
    website: "anthropic.com",
    sector: "AI Safety + Agents",
    product: "Claude API / MCP",
    target_email: "partnerships@anthropic.com",
    cc_email: "enterprise@anthropic.com",
    linkedin_url: "https://linkedin.com/company/anthropic",
    twitter_handle: "@AnthropicAI",
    status: "researching",
    priority: "MEDIUM",
    channel: "linkedin",
    template_type: "western_ai",
    subject: "Anthropic Partnership — African AI Safety + Constitutional AI for Pharma",
    body: `Dear Anthropic Partnerships,

I'm Tumelo Ramaphosa, Founder of StudEx Global Markets — a South African pharmaceutical distribution company operating AI agents across Africa with government partnerships.

We use Claude for our ADAM SMASHER agent (Global Markets AI) and are exploring:

- Claude MCP for our multi-VM agent orchestrator
- Enterprise tier for 24/7 agent operations across 18 countries
- AI safety frameworks for regulated pharma environments
- Constitutional AI principles for Government VM compliance

Africa's pharmaceutical sector requires the highest safety standards. Constitutional AI aligns perfectly with our compliance requirements.

Would love to discuss a partnership or enterprise trial.

Tumelo Ramaphosa
StudEx Global Markets
+27 (0)11 XXX XXXX`,
    lastContact: "2026-06-30",
    lastContactDate: new Date("2026-06-30T15:30:00"),
    nextStep: "Research Anthropic Africa initiatives, LinkedIn outreach",
    responseScore: 7,
    responseIntent: null,
    notes: "Already using Claude. Want enterprise tier and safety partnership.",
    region: "usa",
  },
];

const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "china_ai",
    type: "china_ai",
    name: "China AI Companies",
    description: "Template for Tencent, ByteDance, MiniMax, Kimi, DeepSeek",
    subject: "[COMPANY] Partnership — African AI Agent Network + Market Expansion",
    body: `Subject: [COMPANY] Partnership — African AI Agent Network + Market Expansion

Dear [COMPANY] Partnerships Team,

My name is Tumelo Ramaphosa, Founder of StudEx Global Markets — a South African pharmaceutical distribution company with AI agent infrastructure serving 18 African countries through Government VM structures.

We're building the African AI Agent Powerhouse and [COMPANY]'s [SPECIFIC_PRODUCT] aligns perfectly with our expansion:

KEY PARTNERSHIP OPPORTUNITIES:
1. API Integration — [SPECIFIC_USE_CASE] for our agent mesh
2. Enterprise Deployment — Government VM structures across Africa
3. Market Entry — Your gateway to 1.4B people, 54 countries
4. Co-Marketing — Africa-focused AI initiatives

WHY PARTNER WITH STUDEx:
• Active presence in 18 African countries
• Government VM infrastructure ready
• Existing China partnerships (ByteDance, QwenPaw)
• Russian market bridge (STUDEx Russia Operations)
• Pharmaceutical compliance expertise

I'd like to schedule a 30-minute call to discuss:

[PREFERRED_TIMES]

Looking forward to exploring this partnership.

Best regards,
Tumelo Ramaphosa
Founder, StudEx Global Markets
+27 (0)11 XXX XXXX
www.studexmeat.com`,
  },
  {
    id: "western_ai",
    type: "western_ai",
    name: "Western AI Companies",
    description: "Template for Google, Anthropic, OpenAI",
    subject: "[COMPANY] Enterprise Partnership — African AI Scale + Government Networks",
    body: `Subject: [COMPANY] Enterprise Partnership — African AI Scale + Government Networks

Dear [COMPANY] Partnerships Team,

I'm Tumelo Ramaphosa, Founder of StudEx Global Markets — South Africa's leading pharmaceutical distribution company, now operating AI agents across 18 African countries through Government VM structures.

[COMPANY]'s [SPECIFIC_PRODUCT] represents the cutting edge of enterprise AI, and we're seeking a strategic partner for African market deployment:

PARTNERSHIP FRAMEWORK:
1. Enterprise API Access — Volume pricing for 24/7 agent operations
2. Government VM Integration — Compliance-first deployment patterns
3. Market Development — Co-investment in African AI infrastructure
4. Technical Partnership — Fine-tuning on Africa-specific data

STUDEX VALUE PROPOSITION:
• 18-country distribution network operational
• Government relationships established
• Existing AI infrastructure (Orgo VM + QwenPaw)
• Pharmaceutical compliance expertise (FDA-equivalent standards)
• Bridge to Russian markets via STUDEx Russia

We're seeking enterprise tier pricing and technical partnership for this scale deployment. Available for a 30-minute call this week.

Best regards,
Tumelo Ramaphosa
Founder, StudEx Global Markets
+27 (0)11 XXX XXXX
www.studexmeat.com`,
  },
  {
    id: "hardware_infra",
    type: "hardware_infra",
    name: "Hardware & Infrastructure",
    description: "Template for NVIDIA, AMD, Intel, cloud providers",
    subject: "[COMPANY] Infrastructure Partnership — GPU/Cloud for African AI Scale",
    body: `Subject: [COMPANY] Infrastructure Partnership — GPU/Cloud for African AI Scale

Dear [COMPANY] Enterprise Team,

Tumelo Ramaphosa, StudEx Global Markets — South Africa.

We operate AI agents across 18 African countries, processing pharmaceutical data 24/7. Our agent OS requires enterprise-grade infrastructure:

INFRASTRUCTURE REQUIREMENTS:
1. GPU Compute — [SPECIFIC_NVIDIA_PRODUCT] for inference at scale
2. Agent Blueprints — Pre-built containers for pharma compliance
3. Low-Latency Edge — African datacenter presence for 50ms response
4. Government Compliance — Data residency requirements

WHY THIS PARTNERSHIP MATTERS:
• Africa = next 1B internet users, massive AI demand
• Government VMs require local compliance
• Pharmaceutical AI = life-critical applications
• 18 countries × 24/7 = significant compute needs

We're exploring NVIDIA NIM Agent Blueprints and GPU allocation for our agent fleet. Looking for 30 minutes to discuss:

• NIM microservices for our agent orchestrator
• GPU allocation for research + inference workloads
• African datacenter partnerships
• Enterprise pricing for 1000+ GPU hours/month

Tumelo Ramaphosa
StudEx Global Markets
+27 (0)11 XXX XXXX
www.studexmeat.com`,
  },
  {
    id: "social_ai",
    type: "social_ai",
    name: "Social AI Platforms",
    description: "Template for social/consumer AI companies",
    subject: "[COMPANY] Consumer AI Partnership — African Youth Engagement",
    body: `Subject: [COMPANY] Consumer AI Partnership — African Youth Engagement

Dear [COMPANY] Team,

Tumelo Ramaphosa, StudEx Global Markets — South Africa.

Africa has the youngest population on Earth, with 60% under 25. [COMPANY]'s social AI platform could transform how African youth engage with health and education:

MARKET OPPORTUNITY:
• 1.4 billion people, median age 18
• Fastest mobile internet growth globally
• WhatsApp/ TikTok/Instagram native population
• Massive demand for health information

STUDEX PROPOSAL:
1. API Access — Integrate [PRODUCT] into health distribution
2. Youth Campaigns — AI-powered health awareness
3. Localized Content — Multi-language AI agents
4. Distribution Network — Physical + digital reach

This partnership could establish [COMPANY] as the dominant health AI platform in Africa.

Available for call this week.

Tumelo Ramaphosa
StudEx Global Markets
+27 (0)11 XXX XXXX`,
  },
];

const INITIAL_SUBAGENTS: SubAgent[] = [
  {
    id: "agent-tencent",
    name: "AGENT-TERN-01",
    icon: "🐧",
    company: "Tencent",
    taskStatus: "waiting_response",
    emailSentAt: new Date("2026-07-05T09:30:00"),
    responseTracked: true,
    followUpScheduled: new Date("2026-07-08T09:30:00"),
    progress: 100,
    currentAction: "Monitoring for response...",
    log: [
      "[09:15] Researching Tencent Hunyuan capabilities",
      "[09:18] Compiling partnership pitch deck",
      "[09:22] Drafting personalized email template",
      "[09:28] Reviewing email content for accuracy",
      "[09:30] SENDING EMAIL via QwenPaw Lark connector...",
      "[09:30:05] ✓ Email delivered to partnerships@tencent.com",
      "[09:30:05] ✓ CC sent to ai-platform@tencent.com",
      "[09:31] Email opened by recipient (Tencent tracker pixel)",
      "[09:45] Response received: Positive interest, requesting demo",
      "[09:46] Updating CRM, scheduling follow-up call",
      "[10:00] Monitoring mailbox for detailed response...",
    ],
  },
  {
    id: "agent-bydance",
    name: "AGENT-BD-02",
    icon: "🎵",
    company: "ByteDance",
    taskStatus: "following_up",
    emailSentAt: new Date("2026-07-04T14:22:00"),
    responseTracked: false,
    followUpScheduled: new Date("2026-07-07T14:22:00"),
    progress: 75,
    currentAction: "Preparing follow-up message...",
    log: [
      "[14:00] Researching ByteDance Coze platform",
      "[14:10] Analyzing Coze API documentation",
      "[14:15] Drafting partnership proposal",
      "[14:22] SENDING EMAIL via QwenPaw Lark connector...",
      "[14:22:08] ✓ Email delivered to enterprise@bytedance.com",
      "[14:22:09] ✓ CC sent to ai-partnerships@bytedance.com",
      "[14:30] Tracking email delivery status...",
      "[16:00] Email not yet opened - rescheduling follow-up",
      "[16:05] Setting reminder for follow-up in 72 hours",
      "[16:06] Agent entering standby mode...",
    ],
  },
  {
    id: "agent-minimax",
    name: "AGENT-MM-03",
    icon: "🧠",
    company: "MiniMax",
    taskStatus: "waiting_response",
    emailSentAt: new Date("2026-07-03T11:45:00"),
    responseTracked: true,
    followUpScheduled: new Date("2026-07-06T11:45:00"),
    progress: 100,
    currentAction: "Active negotiation in progress",
    log: [
      "[11:30] Researching MiniMax API capabilities",
      "[11:35] Comparing pricing with OpenAI/Anthropic",
      "[11:40] Drafting volume pricing proposal",
      "[11:45] SENDING EMAIL via QwenPaw Lark connector...",
      "[11:45:03] ✓ Email delivered to bd@minimaxi.com",
      "[11:50] Response received: Interested in call",
      "[12:00] Scheduling video conference",
      "[12:30] Call scheduled for July 5, 15:00 CST",
      "[15:00] Video call: Discussing API pricing tiers",
      "[15:25] MiniMax team: 'Will send enterprise quote'",
      "[15:30] Awaiting pricing documentation...",
    ],
  },
  {
    id: "agent-kimi",
    name: "AGENT-KIM-04",
    icon: "💬",
    company: "Kimi AI",
    taskStatus: "following_up",
    emailSentAt: new Date("2026-07-02T16:00:00"),
    responseTracked: false,
    followUpScheduled: new Date("2026-07-05T16:00:00"),
    progress: 60,
    currentAction: "Analyzing Kimi long-context use cases",
    log: [
      "[15:45] Researching Kimi Moonshot AI",
      "[15:50] Identifying long-context use cases",
      "[15:55] Drafting technical partnership proposal",
      "[16:00] SENDING EMAIL via QwenPaw Lark connector...",
      "[16:00:02] ✓ Email delivered to partnership@moonshot.cn",
      "[16:15] Tracking delivery...",
      "[08:00] Email status: Delivered, not opened",
      "[08:05] Preparing follow-up with enhanced pitch",
      "[08:10] Agent standby, awaiting follow-up window",
    ],
  },
  {
    id: "agent-nvidia",
    name: "AGENT-NVD-05",
    icon: "🎮",
    company: "NVIDIA",
    taskStatus: "sending",
    emailSentAt: new Date("2026-07-04T08:15:00"),
    responseTracked: false,
    followUpScheduled: new Date("2026-07-09T08:15:00"),
    progress: 90,
    currentAction: "Sending email via SMTP...",
    log: [
      "[08:00] Researching NVIDIA NIM microservices",
      "[08:05] Analyzing GPU requirements for agent fleet",
      "[08:10] Compiling infrastructure specifications",
      "[08:15] SENDING EMAIL via QwenPaw SMTP relay...",
      "[08:15:00] Connecting to SMTP server...",
      "[08:15:02] Authenticating with OAuth2...",
      "[08:15:05] ✓ Email delivered to enterprise@nvidia.com",
      "[08:15:06] ✓ CC sent to ai-agents@nvidia.com",
      "[08:20] Verifying delivery receipt...",
      "[08:21] Email confirmed delivered",
      "[08:22] Scheduling follow-up for July 9",
      "[08:25] Agent entering monitoring mode...",
    ],
  },
  {
    id: "agent-google",
    name: "AGENT-GGL-06",
    icon: "🔍",
    company: "Google",
    taskStatus: "drafting",
    emailSentAt: null,
    responseTracked: false,
    followUpScheduled: new Date("2026-07-07T10:00:00"),
    progress: 40,
    currentAction: "Drafting Vertex AI partnership pitch",
    log: [
      "[09:30] Researching Google Cloud Africa initiatives",
      "[09:35] Analyzing Gemini API capabilities",
      "[09:40] Identifying Vertex AI use cases for pharma",
      "[09:50] Drafting partnership proposal...",
      "[10:15] Refining email template for Google style",
      "[10:30] Awaiting approval before sending...",
    ],
  },
  {
    id: "agent-anthropic",
    name: "AGENT-ANT-07",
    icon: "🧬",
    company: "Anthropic",
    taskStatus: "researching",
    emailSentAt: null,
    responseTracked: false,
    followUpScheduled: new Date("2026-07-08T15:30:00"),
    progress: 25,
    currentAction: "Researching Anthropic enterprise programs",
    log: [
      "[14:00] Starting Anthropic partnership research",
      "[14:15] Analyzing Claude API enterprise features",
      "[14:30] Identifying AI safety partnership opportunities",
      "[14:45] Researching Anthropic's Africa initiatives",
      "[15:00] Comparing enterprise vs API pricing",
      "[15:15] Drafting LinkedIn outreach strategy...",
    ],
  },
  {
    id: "agent-deepseek",
    name: "AGENT-DS-08",
    icon: "🔍",
    company: "DeepSeek",
    taskStatus: "researching",
    emailSentAt: null,
    responseTracked: false,
    followUpScheduled: new Date("2026-07-10T10:00:00"),
    progress: 15,
    currentAction: "Investigating DeepSeek open-source models",
    log: [
      "[13:00] Initial research on DeepSeek models",
      "[13:15] Analyzing DeepSeek Coder capabilities",
      "[13:30] Comparing open-source vs API deployment",
      "[13:45] Evaluating self-hosting requirements",
      "[14:00] Researching enterprise support options...",
    ],
  },
];

const INITIAL_MAILBOX: MailItem[] = [
  {
    id: "mail-001",
    from: "tencent-partnerships@tencent.com",
    fromName: "Sarah Chen",
    company: "Tencent",
    subject: "RE: Strategic AI Agent Partnership — Africa + Russia Market Expansion",
    preview: "Hi Tumelo, Thank you for reaching out. We're very interested in...",
    body: `Hi Tumelo,

Thank you for reaching out regarding the partnership opportunity. We're very interested in discussing how Tencent's Hunyuan platform can support your African AI Agent initiatives.

Our team has reviewed your proposal and we believe there's strong alignment between our goals. A few questions:

1. What's your current agent deployment scale?
2. Do you have specific latency requirements per region?
3. Are you looking for API access or on-premise deployment?

Would you be available for a 30-minute video call this week? We're flexible on timing.

Best regards,
Sarah Chen
Tencent Partnerships Team
Hunyuan AI Division`,
    receivedAt: new Date("2026-07-05T09:45:00"),
    isRead: true,
    replyIntent: "high",
    sentiment: "positive",
    actionRequired: "Schedule call, prepare demo",
  },
  {
    id: "mail-002",
    from: "bd@minimaxi.com",
    fromName: "Michael Zhang",
    company: "MiniMax",
    subject: "RE: API Partnership — African AI Agent Infrastructure",
    preview: "Hello Tumelo, Thanks for your interest in MiniMax. We're excited...",
    body: `Hello Tumelo,

Thanks for your interest in MiniMax API. We're excited about the African market opportunity you described.

Our team has prepared the following enterprise pricing tiers for your review:

TIER 1 - STARTUP
- 10M tokens/month: $99/month
- API priority: Standard
- Support: Email

TIER 2 - GROWTH
- 100M tokens/month: $699/month
- API priority: High
- Support: Email + Chat

TIER 3 - ENTERPRISE
- 1B+ tokens/month: Custom pricing
- API priority: Dedicated
- Support: 24/7 dedicated manager

Given your scale requirements (18 countries, 24/7 operations), I'd recommend TIER 3. Would you like to schedule a call to discuss custom pricing?

Best,
Michael Zhang
Business Development
MiniMax`,
    receivedAt: new Date("2026-07-04T14:30:00"),
    isRead: true,
    replyIntent: "high",
    sentiment: "positive",
    actionRequired: "Negotiate pricing, schedule call",
  },
  {
    id: "mail-003",
    from: "noreply@nvidia.com",
    fromName: "NVIDIA Enterprise",
    company: "NVIDIA",
    subject: "Your inquiry has been received — Reference #NV-2024-78542",
    preview: "Thank you for contacting NVIDIA Enterprise. Your inquiry has been...",
    body: `Dear Tumelo Ramaphosa,

Thank you for contacting NVIDIA Enterprise.

Your inquiry has been received and assigned reference number NV-2024-78542.

A member of our Enterprise Partnerships team will review your submission and respond within 3-5 business days.

In the meantime, you may find the following resources helpful:

- NVIDIA NIM Agent Blueprints: nvidia.com/nim
- Enterprise GPU Solutions: nvidia.com/enterprise
- Partner Program: nvidia.com/partners

Best regards,
NVIDIA Enterprise Team`,
    receivedAt: new Date("2026-07-04T08:25:00"),
    isRead: false,
    replyIntent: null,
    sentiment: "neutral",
    actionRequired: "Wait for human response",
  },
  {
    id: "mail-004",
    from: "ai-newsletter@anthropic.com",
    fromName: "Anthropic",
    company: "Anthropic",
    subject: "Claude 3.5 Sonnet: New capabilities for agentic workflows",
    preview: "Today we're announcing Claude 3.5 Sonnet with improved agentic...",
    body: `Hi Tumelo,

Today we're announcing Claude 3.5 Sonnet — our most intelligent model yet, with significantly improved capabilities for agentic workflows.

KEY IMPROVEMENTS:
• 200K context window
• 95% on MAVEL benchmark
• 10x faster than Claude 3 Opus
• Native tool use improvements

This could be particularly relevant for your multi-country operations.

Learn more: anthropic.com/news/claude-35-sonnet

Best,
The Anthropic Team`,
    receivedAt: new Date("2026-07-03T18:00:00"),
    isRead: false,
    replyIntent: null,
    sentiment: "neutral",
    actionRequired: "Evaluate for enterprise upgrade",
  },
  {
    id: "mail-005",
    from: "linkedin@linkedin.com",
    fromName: "LinkedIn",
    company: "LinkedIn",
    subject: "You have 3 new connection requests",
    preview: "Tumelo, you have new connection requests from professionals...",
    body: `Hi Tumelo,

You have 3 new connection requests:

1. Zhang Wei — Business Development, Tencent AI
2. Lisa Park — Enterprise Sales, Google Cloud
3. David Chen — Partnerships, ByteDance

Accept or view all requests: linkedin.com/in/tumeloramaphosa

Best,
The LinkedIn Team`,
    receivedAt: new Date("2026-07-02T12:00:00"),
    isRead: false,
    replyIntent: null,
    sentiment: "neutral",
    actionRequired: "Review connection requests",
  },
];

// ─── Utility Functions ────────────────────────────────────────────────────────

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function getStatusColor(status: OutreachStatus): string {
  const colors: Record<OutreachStatus, string> = {
    pending: "#5e8c78",
    researching: "#ff2ec4",
    email_sent: "#39ffaa",
    responded: "#c9a84c",
    negotiating: "#ff9f43",
    declined: "#eb5757",
  };
  return colors[status];
}

function getStatusIcon(status: OutreachStatus) {
  switch (status) {
    case "pending": return <Clock size={12} />;
    case "researching": return <Search size={12} />;
    case "email_sent": return <Send size={12} />;
    case "responded": return <MailOpen size={12} />;
    case "negotiating": return <MessageSquare size={12} />;
    case "declined": return <Trash2 size={12} />;
  }
}

function getChannelIcon(channel: Channel) {
  switch (channel) {
    case "email": return <Mail size={12} />;
    case "linkedin": return <Linkedin size={12} />;
    case "twitter": return <Twitter size={12} />;
    case "lark": return <MessageSquareDot size={12} />;
    case "slack": return <SlackIcon size={12} />;
  }
}

function getPriorityColor(priority: Priority): string {
  const colors: Record<Priority, string> = {
    CRITICAL: "#ff2ec4",
    HIGH: "#c9a84c",
    MEDIUM: "#39ffaa",
    LOW: "#5e8c78",
  };
  return colors[priority];
}

function getSentimentColor(sentiment: "positive" | "neutral" | "negative"): string {
  const colors = {
    positive: "#39ffaa",
    neutral: "#c9a84c",
    negative: "#eb5757",
  };
  return colors[sentiment];
}

function getIntentColor(intent: "high" | "medium" | "low" | null): string {
  if (!intent) return "#5e8c78";
  const colors = { high: "#39ffaa", medium: "#c9a84c", low: "#ff9f43" };
  return colors[intent];
}

// ─── SubAgent Card Component ──────────────────────────────────────────────────

function SubAgentCard({ agent, expanded, onToggle }: { agent: SubAgent; expanded: boolean; onToggle: () => void }) {
  const statusColors: Record<SubAgent["taskStatus"], string> = {
    idle: "#5e8c78",
    researching: "#ff2ec4",
    drafting: "#c9a84c",
    sending: "#39ffaa",
    following_up: "#ff9f43",
    waiting_response: "#8a6bff",
  };

  return (
    <div style={{
      background: "var(--surface-2)",
      border: `1px solid ${expanded ? statusColors[agent.taskStatus] : "var(--border-soft)"}`,
      borderRadius: "12px",
      padding: "16px",
      transition: "all 0.3s ease",
      boxShadow: expanded ? `0 0 20px ${statusColors[agent.taskStatus]}40` : "none",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "20px" }}>{agent.icon}</span>
          <div>
            <p style={{ 
              fontFamily: "var(--font-mono)", 
              fontSize: "13px", 
              fontWeight: "bold", 
              color: "var(--ink-strong)",
              margin: 0,
            }}>
              {agent.name}
            </p>
            <p style={{ 
              fontFamily: "var(--font-mono)", 
              fontSize: "11px", 
              color: "var(--ink-faint)",
              margin: 0,
            }}>
              Target: {agent.company}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 8px",
            borderRadius: "12px",
            background: `${statusColors[agent.taskStatus]}20`,
            border: `1px solid ${statusColors[agent.taskStatus]}60`,
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: statusColors[agent.taskStatus],
            textTransform: "uppercase",
          }}>
            {agent.taskStatus === "sending" && <span className="animate-pulse">●</span>}
            {agent.taskStatus.replace("_", " ")}
          </span>
          <button
            onClick={onToggle}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--ink-faint)",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: "12px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "4px",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
            Progress
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: statusColors[agent.taskStatus] }}>
            {agent.progress}%
          </span>
        </div>
        <div style={{
          height: "4px",
          background: "var(--surface-3)",
          borderRadius: "2px",
          overflow: "hidden",
        }}>
          <div style={{
            width: `${agent.progress}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${statusColors[agent.taskStatus]}80, ${statusColors[agent.taskStatus]})`,
            borderRadius: "2px",
            transition: "width 0.5s ease",
            boxShadow: `0 0 10px ${statusColors[agent.taskStatus]}80`,
          }} />
        </div>
      </div>

      {/* Current Action */}
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--ink)",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}>
        <Activity size={12} style={{ color: statusColors[agent.taskStatus] }} />
        {agent.currentAction}
      </p>

      {/* Email/Follow-up Info */}
      {agent.emailSentAt && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          marginBottom: "12px",
        }}>
          <div style={{
            padding: "8px",
            background: "var(--surface-3)",
            borderRadius: "6px",
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)", margin: 0 }}>
              EMAIL SENT
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--green)", margin: "2px 0 0 0" }}>
              {formatTime(agent.emailSentAt)}
            </p>
          </div>
          <div style={{
            padding: "8px",
            background: "var(--surface-3)",
            borderRadius: "6px",
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)", margin: 0 }}>
              FOLLOW-UP
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--gold)", margin: "2px 0 0 0" }}>
              {agent.followUpScheduled ? formatDate(agent.followUpScheduled) : "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Response Status */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: expanded ? "12px" : 0,
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
          Response Tracked:
        </span>
        {agent.responseTracked ? (
          <CheckCircle2 size={14} style={{ color: "var(--green)" }} />
        ) : (
          <Clock size={14} style={{ color: "var(--ink-faint)" }} />
        )}
      </div>

      {/* Expandable Log */}
      {expanded && (
        <div style={{
          marginTop: "12px",
          padding: "12px",
          background: "var(--bg)",
          borderRadius: "8px",
          border: "1px solid var(--border-soft)",
          maxHeight: "200px",
          overflowY: "auto",
        }}>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--ink-strong)",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            <Terminal size={12} /> ACTIVITY LOG
          </p>
          {agent.log.map((entry, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: i === agent.log.length - 1 ? "var(--green)" : "var(--ink-dim)",
                margin: "4px 0",
                paddingLeft: "8px",
                borderLeft: i === agent.log.length - 1 ? "2px solid var(--green)" : "none",
              }}
            >
              {entry}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Partner Card Component ───────────────────────────────────────────────────

function PartnerCard({ partner, expanded, onToggle, onExpand }: { 
  partner: Partner; 
  expanded: boolean;
  onToggle: () => void;
  onExpand: () => void;
}) {
  return (
    <div style={{
      background: "var(--surface-2)",
      border: `1px solid ${expanded ? getStatusColor(partner.status) : "var(--border-soft)"}`,
      borderRadius: "12px",
      padding: "16px",
      transition: "all 0.3s ease",
      cursor: "pointer",
      boxShadow: expanded ? `0 0 20px ${getStatusColor(partner.status)}40` : "none",
    }}>
      {/* Header Row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <span style={{ fontSize: "28px" }}>{partner.icon}</span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <h3 style={{
                fontFamily: "var(--font-mono)",
                fontSize: "15px",
                fontWeight: "bold",
                color: "var(--ink-strong)",
                margin: 0,
              }}>
                {partner.name}
              </h3>
              <span style={{
                padding: "2px 8px",
                borderRadius: "12px",
                background: `${getPriorityColor(partner.priority)}20`,
                border: `1px solid ${getPriorityColor(partner.priority)}60`,
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: getPriorityColor(partner.priority),
                fontWeight: "bold",
              }}>
                {partner.priority}
              </span>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "2px 8px",
                borderRadius: "12px",
                background: `${getStatusColor(partner.status)}20`,
                border: `1px solid ${getStatusColor(partner.status)}60`,
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: getStatusColor(partner.status),
              }}>
                {getStatusIcon(partner.status)}
                {partner.status.replace("_", " ").toUpperCase()}
              </span>
            </div>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--ink-faint)",
              margin: "4px 0 0 0",
            }}>
              {partner.sector} · {partner.product}
            </p>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--ink-dim)",
              margin: "4px 0 0 0",
            }}>
              {partner.website}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 8px",
            borderRadius: "6px",
            background: "var(--surface-3)",
            border: "1px solid var(--border-soft)",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--ink-faint)",
          }}>
            {getChannelIcon(partner.channel)}
            {partner.channel.toUpperCase()}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--ink-faint)",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "8px",
        marginTop: "16px",
      }}>
        <div style={{
          padding: "8px",
          background: "var(--surface-3)",
          borderRadius: "6px",
          textAlign: "center",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)", margin: 0 }}>
            FIT SCORE
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: "bold", color: "var(--pink)", margin: "2px 0 0 0" }}>
            {partner.responseScore}/10
          </p>
        </div>
        <div style={{
          padding: "8px",
          background: "var(--surface-3)",
          borderRadius: "6px",
          textAlign: "center",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)", margin: 0 }}>
            LAST CONTACT
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink)", margin: "2px 0 0 0" }}>
            {formatDate(partner.lastContactDate)}
          </p>
        </div>
        <div style={{
          padding: "8px",
          background: "var(--surface-3)",
          borderRadius: "6px",
          textAlign: "center",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)", margin: 0 }}>
            INTENT
          </p>
          <p style={{ 
            fontFamily: "var(--font-mono)", 
            fontSize: "11px", 
            color: getIntentColor(partner.responseIntent), 
            margin: "2px 0 0 0",
            fontWeight: partner.responseIntent ? "bold" : "normal",
          }}>
            {partner.responseIntent?.toUpperCase() || "N/A"}
          </p>
        </div>
        <div style={{
          padding: "8px",
          background: "var(--surface-3)",
          borderRadius: "6px",
          textAlign: "center",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)", margin: 0 }}>
            REGION
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--gold)", margin: "2px 0 0 0" }}>
            {partner.region.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Fit Score Bar */}
      <div style={{ marginTop: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)" }}>
            Partnership Fit
          </span>
        </div>
        <div style={{
          height: "4px",
          background: "var(--surface-3)",
          borderRadius: "2px",
          overflow: "hidden",
        }}>
          <div style={{
            width: `${partner.responseScore * 10}%`,
            height: "100%",
            background: `linear-gradient(90deg, var(--pink-dim), var(--pink))`,
            borderRadius: "2px",
            boxShadow: "0 0 10px var(--pink-glow)",
          }} />
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div style={{ marginTop: "16px" }}>
          <div style={{
            padding: "12px",
            background: "var(--surface-3)",
            borderRadius: "8px",
            marginBottom: "12px",
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)", marginBottom: "6px" }}>
              TARGET CONTACTS
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink)", margin: "2px 0" }}>
              To: {partner.target_email}
            </p>
            {partner.cc_email && (
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink-dim)", margin: "2px 0" }}>
                CC: {partner.cc_email}
              </p>
            )}
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink-dim)", margin: "2px 0" }}>
              {partner.linkedin_url}
            </p>
          </div>

          <div style={{
            padding: "12px",
            background: "var(--surface-3)",
            borderRadius: "8px",
            marginBottom: "12px",
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)", marginBottom: "6px" }}>
              NEXT STEPS
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink)" }}>
              {partner.nextStep}
            </p>
          </div>

          {partner.notes && (
            <div style={{
              padding: "12px",
              background: "var(--surface-3)",
              borderRadius: "8px",
              marginBottom: "12px",
            }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)", marginBottom: "6px" }}>
                NOTES
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink-dim)" }}>
                {partner.notes}
              </p>
            </div>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); onExpand(); }}
            style={{
              width: "100%",
              padding: "10px",
              background: "var(--pink)",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 0 20px var(--pink-glow)",
            }}
          >
            <Mail size={14} /> View Full Email Template
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Mail Item Component ──────────────────────────────────────────────────────

function MailItemComponent({ mail, onToggle }: { mail: MailItem; onToggle: () => void }) {
  return (
    <div style={{
      background: mail.isRead ? "var(--surface-2)" : "var(--surface)",
      border: `1px solid ${mail.isRead ? "var(--border-soft)" : "var(--pink)"}40`,
      borderRadius: "8px",
      padding: "12px",
      marginBottom: "8px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        {/* Unread Indicator */}
        <div style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: mail.isRead ? "transparent" : "var(--pink)",
          marginTop: "6px",
          boxShadow: mail.isRead ? "none" : "0 0 10px var(--pink-glow)",
        }} />

        {/* Company Icon */}
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "8px",
          background: "var(--surface-3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}>
          {PARTNERS.find(p => p.company === mail.company)?.icon || "📧"}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: mail.isRead ? "normal" : "bold",
              color: mail.isRead ? "var(--ink-faint)" : "var(--ink)",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              {mail.fromName}
              <span style={{ color: "var(--ink-dim)", fontWeight: "normal" }}>
                {" "}· {mail.company}
              </span>
            </p>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--ink-faint)",
              margin: 0,
              flexShrink: 0,
            }}>
              {formatDate(mail.receivedAt)}
            </p>
          </div>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            fontWeight: mail.isRead ? "normal" : "bold",
            color: mail.isRead ? "var(--ink-dim)" : "var(--ink)",
            margin: "4px 0",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
            {mail.subject}
          </p>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--ink-faint)",
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
            {mail.preview}
          </p>
        </div>

        {/* Intent Badge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
          {mail.replyIntent && (
            <span style={{
              padding: "2px 6px",
              borderRadius: "4px",
              background: `${getIntentColor(mail.replyIntent)}20`,
              border: `1px solid ${getIntentColor(mail.replyIntent)}60`,
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: getIntentColor(mail.replyIntent),
              fontWeight: "bold",
            }}>
              {mail.replyIntent.toUpperCase()} INTENT
            </span>
          )}
          <span style={{
            padding: "2px 6px",
            borderRadius: "4px",
            background: `${getSentimentColor(mail.sentiment)}20`,
            border: `1px solid ${getSentimentColor(mail.sentiment)}60`,
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            color: getSentimentColor(mail.sentiment),
          }}>
            {mail.sentiment.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── QwenPaw Integration Component ──────────────────────────────────────────

function QwenPawIntegration() {
  const [activeTab, setActiveTab] = useState<"lark" | "slack">("lark");

  return (
    <div style={{
      background: "var(--surface-2)",
      border: "1px solid #8a6bff40",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 0 30px #8a6bff20",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #8a6bff, #ff2ec4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 20px #8a6bff40",
        }}>
          <Bot size={20} color="white" />
        </div>
        <div>
          <h3 style={{
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#8a6bff",
            margin: 0,
          }}>
            QwenPaw Integration
          </h3>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--ink-faint)",
            margin: 0,
          }}>
            Multi-channel outreach automation
          </p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 8px",
            borderRadius: "12px",
            background: "#39ffaa20",
            border: "1px solid #39ffaa60",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            color: "#39ffaa",
          }}>
            <span className="animate-pulse">●</span> CONNECTED
          </span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{
        display: "flex",
        gap: "4px",
        marginBottom: "16px",
        padding: "4px",
        background: "var(--surface-3)",
        borderRadius: "8px",
      }}>
        <button
          onClick={() => setActiveTab("lark")}
          style={{
            flex: 1,
            padding: "8px 12px",
            background: activeTab === "lark" ? "var(--surface)" : "transparent",
            border: activeTab === "lark" ? "1px solid var(--border)" : "none",
            borderRadius: "6px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: activeTab === "lark" ? "var(--ink)" : "var(--ink-faint)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <MessageSquareDot size={14} style={{ color: activeTab === "lark" ? "#8a6bff" : "var(--ink-faint)" }} />
          Lark (China)
        </button>
        <button
          onClick={() => setActiveTab("slack")}
          style={{
            flex: 1,
            padding: "8px 12px",
            background: activeTab === "slack" ? "var(--surface)" : "transparent",
            border: activeTab === "slack" ? "1px solid var(--border)" : "none",
            borderRadius: "6px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: activeTab === "slack" ? "var(--ink)" : "var(--ink-faint)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <SlackIcon size={14} style={{ color: activeTab === "slack" ? "#39ffaa" : "var(--ink-faint)" }} />
          Slack (Western)
        </button>
      </div>

      {/* Content */}
      {activeTab === "lark" ? (
        <div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "8px",
            marginBottom: "16px",
          }}>
            <div style={{
              padding: "12px",
              background: "var(--surface-3)",
              borderRadius: "8px",
              textAlign: "center",
            }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)", margin: 0 }}>
                CHINA COMPANIES
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "20px", fontWeight: "bold", color: "#8a6bff", margin: "4px 0 0 0" }}>
                5
              </p>
            </div>
            <div style={{
              padding: "12px",
              background: "var(--surface-3)",
              borderRadius: "8px",
              textAlign: "center",
            }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)", margin: 0 }}>
                LARK EMAILS SENT
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "20px", fontWeight: "bold", color: "#39ffaa", margin: "4px 0 0 0" }}>
                4
              </p>
            </div>
          </div>

          <div style={{
            padding: "12px",
            background: "var(--bg)",
            borderRadius: "8px",
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)", marginBottom: "8px" }}>
              LARK EMAIL FLOW
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
              {["Draft Email", "QwenPaw Parse", "Lark Send", "Track Opens"].map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{
                    padding: "4px 8px",
                    background: i < 2 ? "#39ffaa20" : "var(--surface-3)",
                    border: `1px solid ${i < 2 ? "#39ffaa60" : "var(--border-soft)"}`,
                    borderRadius: "4px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    color: i < 2 ? "#39ffaa" : "var(--ink-faint)",
                  }}>
                    {step}
                  </span>
                  {i < 3 && <ArrowRight size={10} style={{ color: "var(--ink-faint)" }} />}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "12px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <span style={{
              padding: "4px 8px",
              borderRadius: "4px",
              background: "#8a6bff20",
              border: "1px solid #8a6bff60",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "#8a6bff",
            }}>
              ✓ Tencent
            </span>
            <span style={{
              padding: "4px 8px",
              borderRadius: "4px",
              background: "#8a6bff20",
              border: "1px solid #8a6bff60",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "#8a6bff",
            }}>
              ✓ ByteDance
            </span>
            <span style={{
              padding: "4px 8px",
              borderRadius: "4px",
              background: "#8a6bff20",
              border: "1px solid #8a6bff60",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "#8a6bff",
            }}>
              ✓ MiniMax
            </span>
            <span style={{
              padding: "4px 8px",
              borderRadius: "4px",
              background: "#8a6bff20",
              border: "1px solid #8a6bff60",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "#8a6bff",
            }}>
              ✓ Kimi AI
            </span>
            <span style={{
              padding: "4px 8px",
              borderRadius: "4px",
              background: "var(--surface-3)",
              border: "1px solid var(--border-soft)",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "var(--ink-faint)",
            }}>
              ○ DeepSeek
            </span>
          </div>
        </div>
      ) : (
        <div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "8px",
            marginBottom: "16px",
          }}>
            <div style={{
              padding: "12px",
              background: "var(--surface-3)",
              borderRadius: "8px",
              textAlign: "center",
            }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)", margin: 0 }}>
                WESTERN COMPANIES
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "20px", fontWeight: "bold", color: "#39ffaa", margin: "4px 0 0 0" }}>
                3
              </p>
            </div>
            <div style={{
              padding: "12px",
              background: "var(--surface-3)",
              borderRadius: "8px",
              textAlign: "center",
            }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-faint)", margin: 0 }}>
                SLACK MSGS SENT
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "20px", fontWeight: "bold", color: "#ff2ec4", margin: "4px 0 0 0" }}>
                0
              </p>
            </div>
          </div>

          <div style={{
            padding: "12px",
            background: "var(--bg)",
            borderRadius: "8px",
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)", marginBottom: "8px" }}>
              SLACK OUTREACH FLOW
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
              {["Research Contact", "LinkedIn DM", "Slack Connect", "Follow-up"].map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{
                    padding: "4px 8px",
                    background: i === 0 ? "#39ffaa20" : "var(--surface-3)",
                    border: `1px solid ${i === 0 ? "#39ffaa60" : "var(--border-soft)"}`,
                    borderRadius: "4px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    color: i === 0 ? "#39ffaa" : "var(--ink-faint)",
                  }}>
                    {step}
                  </span>
                  {i < 3 && <ArrowRight size={10} style={{ color: "var(--ink-faint)" }} />}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "12px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <span style={{
              padding: "4px 8px",
              borderRadius: "4px",
              background: "#39ffaa20",
              border: "1px solid #39ffaa60",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "#39ffaa",
            }}>
              ○ NVIDIA
            </span>
            <span style={{
              padding: "4px 8px",
              borderRadius: "4px",
              background: "#ff2ec420",
              border: "1px solid #ff2ec460",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "#ff2ec4",
            }}>
              ◐ Google
            </span>
            <span style={{
              padding: "4px 8px",
              borderRadius: "4px",
              background: "#c9a84c20",
              border: "1px solid #c9a84c60",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "#c9a84c",
            }}>
              ○ Anthropic
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Progress Tracker Component ───────────────────────────────────────────────

function ProgressTracker({ partners }: { partners: Partner[] }) {
  const statuses = [
    { key: "pending", label: "Pending", color: "#5e8c78" },
    { key: "researching", label: "Researching", color: "#ff2ec4" },
    { key: "email_sent", label: "Email Sent", color: "#39ffaa" },
    { key: "responded", label: "Responded", color: "#c9a84c" },
    { key: "negotiating", label: "Negotiating", color: "#ff9f43" },
  ] as const;

  return (
    <div style={{
      background: "var(--surface-2)",
      border: "1px solid var(--border-soft)",
      borderRadius: "12px",
      padding: "16px",
    }}>
      <h3 style={{
        fontFamily: "var(--font-mono)",
        fontSize: "13px",
        fontWeight: "bold",
        color: "var(--ink-strong)",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <TrendingUp size={14} /> Partnership Progress Pipeline
      </h3>

      {/* Pipeline */}
      <div style={{
        display: "flex",
        gap: "4px",
        marginBottom: "16px",
      }}>
        {statuses.map((status, i) => {
          const count = partners.filter(p => p.status === status.key).length;
          const width = (count / partners.length) * 100;
          return (
            <div key={status.key} style={{ flex: 1, position: "relative" }}>
              <div style={{
                height: "8px",
                background: "var(--surface-3)",
                borderRadius: "4px",
                overflow: "hidden",
              }}>
                <div style={{
                  width: `${width}%`,
                  height: "100%",
                  background: status.color,
                  boxShadow: `0 0 10px ${status.color}80`,
                  transition: "width 0.5s ease",
                }} />
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "4px",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "8px",
                  color: "var(--ink-faint)",
                }}>
                  {status.label}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  fontWeight: "bold",
                  color: status.color,
                }}>
                  {count}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Company Status List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {partners.map(partner => (
          <div key={partner.id} style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px",
            background: "var(--surface-3)",
            borderRadius: "6px",
          }}>
            <span style={{ fontSize: "14px" }}>{partner.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--ink)",
                margin: 0,
              }}>
                {partner.name}
              </p>
            </div>
            <span style={{
              padding: "2px 6px",
              borderRadius: "4px",
              background: `${getStatusColor(partner.status)}20`,
              border: `1px solid ${getStatusColor(partner.status)}60`,
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: getStatusColor(partner.status),
            }}>
              {partner.status.replace("_", " ").toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Email Template Modal ─────────────────────────────────────────────────────

function EmailTemplateModal({ partner, onClose }: { partner: Partner; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `To: ${partner.target_email}\nCC: ${partner.cc_email}\nSubject: ${partner.subject}\n\n${partner.body}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "rgba(7,10,12,0.9)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "800px",
        maxHeight: "90vh",
        background: "var(--surface)",
        border: "1px solid var(--pink)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 60px var(--pink-glow)",
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--border-soft)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "24px" }}>{partner.icon}</span>
            <div>
              <h2 style={{
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                fontWeight: "bold",
                color: "var(--ink-strong)",
                margin: 0,
              }}>
                Email Template: {partner.name}
              </h2>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--ink-faint)",
                margin: "2px 0 0 0",
              }}>
                {partner.template_type.replace("_", " ").toUpperCase()} TEMPLATE
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--ink-faint)",
              cursor: "pointer",
              fontSize: "20px",
              padding: "4px 8px",
            }}
          >
            ✕
          </button>
        </div>

        {/* Email Fields */}
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--border-soft)",
          background: "var(--surface-2)",
        }}>
          <div style={{ display: "flex", gap: "16px", marginBottom: "8px" }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--ink-faint)",
              width: "30px",
            }}>
              TO:
            </span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--ink)",
            }}>
              {partner.target_email}
            </span>
          </div>
          {partner.cc_email && (
            <div style={{ display: "flex", gap: "16px", marginBottom: "8px" }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--ink-faint)",
                width: "30px",
              }}>
                CC:
              </span>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--ink-dim)",
              }}>
                {partner.cc_email}
              </span>
            </div>
          )}
          <div style={{ display: "flex", gap: "16px" }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--ink-faint)",
              width: "30px",
            }}>
              SUBJ:
            </span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--gold)",
            }}>
              {partner.subject}
            </span>
          </div>
        </div>

        {/* Email Body */}
        <div style={{
          flex: 1,
          overflow: "auto",
          padding: "20px",
        }}>
          <pre style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--ink)",
            whiteSpace: "pre-wrap",
            margin: 0,
            lineHeight: "1.6",
          }}>
            {partner.body}
          </pre>
        </div>

        {/* Actions */}
        <div style={{
          padding: "16px 20px",
          borderTop: "1px solid var(--border-soft)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <span style={{
              padding: "4px 8px",
              borderRadius: "4px",
              background: "var(--surface-3)",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "var(--ink-faint)",
            }}>
              Channel: {partner.channel.toUpperCase()}
            </span>
            <span style={{
              padding: "4px 8px",
              borderRadius: "4px",
              background: "var(--surface-3)",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "var(--ink-faint)",
            }}>
              Priority: {partner.priority}
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleCopy}
              style={{
                padding: "10px 16px",
                background: copied ? "#39ffaa" : "var(--surface-3)",
                border: `1px solid ${copied ? "#39ffaa" : "var(--border-soft)"}`,
                borderRadius: "8px",
                color: copied ? "white" : "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy Template"}
            </button>
            <button
              onClick={onClose}
              style={{
                padding: "10px 20px",
                background: "var(--pink)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 0 20px var(--pink-glow)",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Template Library Modal ───────────────────────────────────────────────────

function TemplateLibraryModal({ onClose }: { onClose: () => void }) {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "rgba(7,10,12,0.9)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "900px",
        maxHeight: "90vh",
        background: "var(--surface)",
        border: "1px solid var(--gold)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 60px var(--gold-glow)",
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--border-soft)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, var(--gold), var(--gold-dim))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Mail size={16} color="white" />
            </div>
            <div>
              <h2 style={{
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                fontWeight: "bold",
                color: "var(--gold)",
                margin: 0,
              }}>
                Email Template Library
              </h2>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--ink-faint)",
                margin: "2px 0 0 0",
              }}>
                B2B OUTREACH TEMPLATES BY COMPANY TYPE
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--ink-faint)",
              cursor: "pointer",
              fontSize: "20px",
              padding: "4px 8px",
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
          {selectedTemplate ? (
            <div>
              <button
                onClick={() => setSelectedTemplate(null)}
                style={{
                  background: "var(--surface-3)",
                  border: "1px solid var(--border-soft)",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  color: "var(--ink-faint)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  cursor: "pointer",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                ← Back to templates
              </button>
              <div style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border-soft)",
                borderRadius: "8px",
                padding: "16px",
              }}>
                <h3 style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "var(--ink-strong)",
                  marginBottom: "8px",
                }}>
                  {selectedTemplate.name}
                </h3>
                <p style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--ink-faint)",
                  marginBottom: "16px",
                }}>
                  {selectedTemplate.description}
                </p>
                <pre style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--ink)",
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.6",
                  margin: 0,
                }}>
                  {selectedTemplate.body}
                </pre>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "12px" }}>
              {EMAIL_TEMPLATES.map(template => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border-soft)",
                    borderRadius: "8px",
                    padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--gold)";
                    e.currentTarget.style.boxShadow = "0 0 20px var(--gold-glow)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-soft)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <h4 style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "var(--ink)",
                        margin: 0,
                      }}>
                        {template.name}
                      </h4>
                      <p style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        color: "var(--ink-faint)",
                        margin: "4px 0 0 0",
                      }}>
                        {template.description}
                      </p>
                    </div>
                    <ChevronRight size={16} style={{ color: "var(--ink-faint)" }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Adam Smasher Header ──────────────────────────────────────────────────────

function AdamSmasherHeader() {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(255,46,196,0.1), rgba(201,168,76,0.1))",
      border: "1px solid var(--pink)40",
      borderRadius: "12px",
      padding: "16px 20px",
      marginBottom: "24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Matrix rain decoration */}
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "200px",
        height: "100%",
        opacity: 0.05,
        pointerEvents: "none",
      }}>
        <svg width="100%" height="100%">
          {Array.from({ length: 20 }).map((_, i) => (
            <text
              key={i}
              x={i * 20 + 10}
              y={Math.random() * 100 + "%"}
              fill="#ff2ec4"
              fontSize="12"
              fontFamily="monospace"
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </text>
          ))}
        </svg>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px", position: "relative" }}>
        <div style={{
          width: "60px",
          height: "60px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, var(--pink), var(--gold))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 30px var(--pink-glow)",
        }}>
          <Bot size={30} color="white" />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h1 style={{
              fontFamily: "var(--font-mono)",
              fontSize: "20px",
              fontWeight: "bold",
              color: "var(--ink-strong)",
              margin: 0,
              textShadow: "0 0 20px var(--pink-glow)",
            }}>
              ADAM SMASHER
            </h1>
            <span style={{
              padding: "4px 10px",
              borderRadius: "12px",
              background: "#ff2ec420",
              border: "1px solid #ff2ec460",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "#ff2ec4",
              fontWeight: "bold",
            }}>
              GLOBAL MARKETS AI
            </span>
          </div>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--ink-dim)",
            margin: "4px 0 0 0",
          }}>
            Building the African AI Agent Powerhouse — Subagent Orchestration System
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "#39ffaa",
            }}>
              <span className="animate-pulse">●</span> OPERATIONS CENTER ONLINE
            </span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--ink-faint)",
            }}>
              Target: 8 Partners · China AI + Western AI + Hardware
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stats Bar ───────────────────────────────────────────────────────────────

function StatsBar({ partners, subagents }: { partners: Partner[]; subagents: SubAgent[] }) {
  const stats = [
    {
      label: "TARGETS",
      value: partners.length,
      icon: <Globe size={16} />,
      color: "var(--ink)",
    },
    {
      label: "EMAIL SENT",
      value: partners.filter(p => p.status === "email_sent" || p.status === "responded" || p.status === "negotiating").length,
      icon: <Send size={16} />,
      color: "var(--green)",
    },
    {
      label: "RESPONSES",
      value: partners.filter(p => p.responseIntent !== null).length,
      icon: <MailOpen size={16} />,
      color: "var(--gold)",
    },
    {
      label: "ACTIVE AGENTS",
      value: subagents.filter(s => s.taskStatus !== "idle").length,
      icon: <Bot size={16} />,
      color: "#ff2ec4",
    },
    {
      label: "HOT LEADS",
      value: partners.filter(p => p.responseIntent === "hot").length,
      icon: <ZapIcon size={16} />,
      color: "#ff9f43",
    },
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: "12px",
      marginBottom: "24px",
    }}>
      {stats.map((stat, i) => (
        <div
          key={i}
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border-soft)",
            borderRadius: "10px",
            padding: "14px",
            textAlign: "center",
          }}
        >
          <div style={{ color: stat.color, marginBottom: "6px", display: "flex", justifyContent: "center" }}>
            {stat.icon}
          </div>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "22px",
            fontWeight: "bold",
            color: stat.color,
            margin: 0,
            textShadow: `0 0 15px ${stat.color}60`,
          }}>
            {stat.value}
          </p>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            color: "var(--ink-faint)",
            margin: "4px 0 0 0",
            letterSpacing: "0.1em",
          }}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function PartnerOutreachPage() {
  const [partners] = useState<Partner[]>(PARTNERS);
  const [subagents] = useState<SubAgent[]>(INITIAL_SUBAGENTS);
  const [mailbox, setMailbox] = useState<MailItem[]>(INITIAL_MAILBOX);
  const [expandedPartners, setExpandedPartners] = useState<Set<string>>(new Set());
  const [expandedSubagents, setExpandedSubagents] = useState<Set<string>>(new Set(["agent-tencent", "agent-nvidia"]));
  const [expandedMail, setExpandedMail] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [activeTab, setActiveTab] = useState<"partners" | "subagents" | "mailbox">("partners");
  const [mailboxFilter, setMailboxFilter] = useState<"all" | "unread" | "hot">("all");

  const togglePartner = (id: string) => {
    setExpandedPartners(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSubagent = (id: string) => {
    setExpandedSubagents(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleMailRead = (id: string) => {
    setMailbox(prev => prev.map(m => m.id === id ? { ...m, isRead: !m.isRead } : m)));
  };

  const filteredMail = mailboxFilter === "all"
    ? mailbox
    : mailboxFilter === "unread"
    ? mailbox.filter(m => !m.isRead)
    : mailbox.filter(m => m.replyIntent === "high");

  return (
    <div style={{ position: "relative" }}>
      <MatrixRain />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Adam Smasher Header */}
        <AdamSmasherHeader />

        {/* Stats Bar */}
        <StatsBar partners={partners} subagents={subagents} />

        {/* Main Content Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "20px",
        }}>
          {/* Left Column */}
          <div>
            {/* Tab Navigation */}
            <div style={{
              display: "flex",
              gap: "4px",
              marginBottom: "16px",
              padding: "4px",
              background: "var(--surface-2)",
              borderRadius: "10px",
              width: "fit-content",
            }}>
              {[
                { key: "partners", label: "Partner Targets", icon: <Globe size={14} /> },
                { key: "subagents", label: "Subagent Simulation", icon: <Bot size={14} /> },
                { key: "mailbox", label: "Agent Mailbox", icon: <Inbox size={14} /> },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  style={{
                    padding: "10px 16px",
                    background: activeTab === tab.key ? "var(--surface-3)" : "transparent",
                    border: activeTab === tab.key ? "1px solid var(--border-soft)" : "none",
                    borderRadius: "8px",
                    color: activeTab === tab.key ? "var(--ink)" : "var(--ink-faint)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Partner Targets */}
            {activeTab === "partners" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h2 style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "var(--ink-strong)",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <Users size={14} /> Outreach Targets
                  </h2>
                  <button
                    onClick={() => setShowTemplateLibrary(true)}
                    style={{
                      padding: "8px 14px",
                      background: "var(--surface-3)",
                      border: "1px solid var(--border-soft)",
                      borderRadius: "6px",
                      color: "var(--gold)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Mail size={12} /> Template Library
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {partners.map(partner => (
                    <PartnerCard
                      key={partner.id}
                      partner={partner}
                      expanded={expandedPartners.has(partner.id)}
                      onToggle={() => togglePartner(partner.id)}
                      onExpand={() => setSelectedPartner(partner)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Subagent Simulation */}
            {activeTab === "subagents" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h2 style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "var(--ink-strong)",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <Terminal size={14} /> Subagent Operations
                  </h2>
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: "12px",
                    background: "#39ffaa20",
                    border: "1px solid #39ffaa60",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "#39ffaa",
                  }}>
                    {subagents.filter(s => s.taskStatus !== "idle" && s.taskStatus !== "waiting_response").length} ACTIVE
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                  {subagents.map(agent => (
                    <SubAgentCard
                      key={agent.id}
                      agent={agent}
                      expanded={expandedSubagents.has(agent.id)}
                      onToggle={() => toggleSubagent(agent.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Mailbox */}
            {activeTab === "mailbox" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h2 style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "var(--ink-strong)",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <Inbox size={14} /> Agent Mailbox
                    <span style={{
                      padding: "2px 8px",
                      borderRadius: "10px",
                      background: "var(--pink)",
                      fontSize: "10px",
                      color: "white",
                    }}>
                      {mailbox.filter(m => !m.isRead).length} NEW
                    </span>
                  </h2>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {(["all", "unread", "hot"] as const).map(filter => (
                      <button
                        key={filter}
                        onClick={() => setMailboxFilter(filter)}
                        style={{
                          padding: "6px 12px",
                          background: mailboxFilter === filter ? "var(--surface-3)" : "transparent",
                          border: mailboxFilter === filter ? "1px solid var(--border-soft)" : "none",
                          borderRadius: "6px",
                          color: mailboxFilter === filter ? "var(--ink)" : "var(--ink-faint)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          cursor: "pointer",
                          textTransform: "capitalize",
                        }}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {filteredMail.map(mail => (
                    <div
                      key={mail.id}
                      onClick={() => setExpandedMail(expandedMail === mail.id ? null : mail.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <MailItemComponent mail={mail} onToggle={() => toggleMailRead(mail.id)} />
                      {expandedMail === mail.id && (
                        <div style={{
                          background: "var(--surface-2)",
                          border: "1px solid var(--border)",
                          borderTop: "none",
                          borderRadius: "0 0 8px 8px",
                          padding: "16px",
                          marginTop: "-8px",
                        }}>
                          <pre style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "var(--ink)",
                            whiteSpace: "pre-wrap",
                            margin: 0,
                            lineHeight: "1.6",
                          }}>
                            {mail.body}
                          </pre>
                          <div style={{
                            display: "flex",
                            gap: "8px",
                            marginTop: "16px",
                            paddingTop: "12px",
                            borderTop: "1px solid var(--border-soft)",
                          }}>
                            <span style={{
                              padding: "4px 8px",
                              borderRadius: "4px",
                              background: "var(--surface-3)",
                              fontFamily: "var(--font-mono)",
                              fontSize: "9px",
                              color: "var(--ink-faint)",
                            }}>
                              Action: {mail.actionRequired}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* QwenPaw Integration */}
            <QwenPawIntegration />

            {/* Progress Tracker */}
            <ProgressTracker partners={partners} />

            {/* Quick Stats */}
            <div style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border-soft)",
              borderRadius: "12px",
              padding: "16px",
            }}>
              <h3 style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: "bold",
                color: "var(--ink-strong)",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                <Activity size={14} /> Real-time Metrics
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px",
                  background: "var(--surface-3)",
                  borderRadius: "6px",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
                    Avg Response Time
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--green)", fontWeight: "bold" }}>
                    24h
                  </span>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px",
                  background: "var(--surface-3)",
                  borderRadius: "6px",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
                    Open Rate
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--gold)", fontWeight: "bold" }}>
                    75%
                  </span>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px",
                  background: "var(--surface-3)",
                  borderRadius: "6px",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
                    Reply Rate
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#ff2ec4", fontWeight: "bold" }}>
                    50%
                  </span>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px",
                  background: "var(--surface-3)",
                  borderRadius: "6px",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
                    Hot Leads
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#ff9f43", fontWeight: "bold" }}>
                    2
                  </span>
                </div>
              </div>
            </div>

            {/* China vs Western Split */}
            <div style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border-soft)",
              borderRadius: "12px",
              padding: "16px",
            }}>
              <h3 style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: "bold",
                color: "var(--ink-strong)",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                <Globe size={14} /> Partner Distribution
              </h3>

              <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                <div style={{
                  flex: 1,
                  padding: "12px",
                  background: "#8a6bff20",
                  border: "1px solid #8a6bff40",
                  borderRadius: "8px",
                  textAlign: "center",
                }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: "bold", color: "#8a6bff", margin: 0 }}>
                    5
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#8a6bff", margin: "4px 0 0 0" }}>
                    CHINA AI
                  </p>
                </div>
                <div style={{
                  flex: 1,
                  padding: "12px",
                  background: "#39ffaa20",
                  border: "1px solid #39ffaa40",
                  borderRadius: "8px",
                  textAlign: "center",
                }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: "bold", color: "#39ffaa", margin: 0 }}>
                    3
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#39ffaa", margin: "4px 0 0 0" }}>
                    WESTERN
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
                    China Pipeline Value
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#8a6bff" }}>
                    $2.4M ARR
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-faint)" }}>
                    Western Pipeline Value
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#39ffaa" }}>
                    $1.8M ARR
                  </span>
                </div>
              </div>
            </div>

            {/* ADAM SMASHER Status */}
            <div style={{
              background: "linear-gradient(135deg, rgba(255,46,196,0.1), rgba(201,168,76,0.1))",
              border: "1px solid #ff2ec440",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 0 30px #ff2ec420",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #ff2ec4, #c9a84c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Bot size={18} color="white" />
                </div>
                <div>
                  <p style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#ff2ec4",
                    margin: 0,
                  }}>
                    ADAM SMASHER
                  </p>
                  <p style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    color: "var(--ink-faint)",
                    margin: 0,
                  }}>
                    Primary Agent
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 8px",
                  background: "var(--surface-3)",
                  borderRadius: "4px",
                }}>
                  <Cpu size={12} style={{ color: "#39ffaa" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink)" }}>
                    CPU: 47%
                  </span>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 8px",
                  background: "var(--surface-3)",
                  borderRadius: "4px",
                }}>
                  <Network size={12} style={{ color: "#ff2ec4" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink)" }}>
                    Network: Active
                  </span>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 8px",
                  background: "var(--surface-3)",
                  borderRadius: "4px",
                }}>
                  <Server size={12} style={{ color: "#c9a84c" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink)" }}>
                    Memory: 2.4GB / 8GB
                  </span>
                </div>
              </div>

              <div style={{
                marginTop: "12px",
                padding: "8px",
                background: "var(--bg)",
                borderRadius: "6px",
                border: "1px solid var(--border-soft)",
              }}>
                <p style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  color: "#39ffaa",
                  margin: 0,
                }}>
                  <span className="animate-pulse">▶</span> Current Task: Managing 8 partner outreach operations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedPartner && (
        <EmailTemplateModal partner={selectedPartner} onClose={() => setSelectedPartner(null)} />
      )}

      {showTemplateLibrary && (
        <TemplateLibraryModal onClose={() => setShowTemplateLibrary(false)} />
      )}
    </div>
  );
}
