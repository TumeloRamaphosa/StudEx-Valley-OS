"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Globe,
  Cpu,
  TrendingUp,
  Building2,
  Users,
  Calendar,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Loader2,
  Star,
  Search,
  BookOpen,
  Shield,
  Zap,
  MapPin,
  Activity,
  Database,
  Code,
  Cloud,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingDown,
  Radio,
  Signal,
  Layers,
  Terminal,
  FileText,
  BarChart3,
  Eye,
  Lock,
  Unlock,
  Zap as ZapIcon,
  Cpu as CpuIcon,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════════
// MATRIX RAIN CANVAS BACKGROUND
// ══════════════════════════════════════════════════════════════════════════════

interface MatrixRainProps {
  opacity?: number;
}

const MatrixRainCanvas: React.FC<MatrixRainProps> = ({ opacity = 0.08 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = `rgba(15, 23, 42, ${opacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ff2ec4";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Neon glow effect
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ff2ec4";
        ctx.fillText(char, x, y);

        // Green trail
        ctx.fillStyle = "#5bf4a6";
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#5bf4a6";
        ctx.fillText(char, x, y - fontSize * 3);

        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ff2ec4";

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// BRAND TOKENS (from globals.css — hardcoded per spec)
// ══════════════════════════════════════════════════════════════════════════════

const BRAND = {
  bg: "#0F172A",
  pink: "#ff2ec4",
  gold: "#D97706",
  green: "#5bf4a6",
  surface: "rgba(10, 14, 17, 0.72)",
  surface2: "rgba(20, 26, 30, 0.78)",
  border: "rgba(57, 255, 170, 0.22)",
};

// ══════════════════════════════════════════════════════════════════════════════
// CHINA AI AGENTS DATA
// ══════════════════════════════════════════════════════════════════════════════

interface AgentData {
  id: string;
  company: string;
  product: string;
  type: string;
  description: string;
  stars?: string;
  lang: string;
  highlight: string;
  status: "Active Partner" | "Research" | "Watch" | "Partner";
  icon: string;
  url: string;
  advantage: string;
  region: "China" | "Global";
 Founded: string;
  employees: string;
  funding: string;
  keyModels: string[];
  useCases: string[];
  pricing: string;
  competitiveEdge: string;
  risks: string[];
  opportunities: string[];
  deepDive: string;
  recentNews: string;
  threatLevel: "Critical" | "High" | "Medium" | "Low";
  monitoringPriority: number;
}

const CHINA_AGENTS: AgentData[] = [
  {
    id: "tencent-hunyuan",
    company: "Tencent",
    product: "Tencent Hunyuan",
    type: "Enterprise AI Agent Platform",
    description:
      "Tencent's enterprise-grade AI agent platform integrated with WeChat ecosystem, QQ, and Tencent Cloud infrastructure. Powers intelligent customer service, content moderation, and business automation for 1.3B+ users.",
    stars: "N/A (enterprise)",
    lang: "Python / REST API / WeChat SDK",
    highlight:
      "WeChat integration, massive user base, works in China + Africa via Tencent Cloud Africa regions (Johannesburg, Lagos)",
    status: "Active Partner",
    icon: "🐧",
    url: "hunyuan.tencent.com",
    advantage:
      "Existing Lark-style multi-channel; ByteDance/Tencent footprint in Africa",
    region: "China",
    Founded: "1998",
    employees: "108,000+",
    funding: "Public (0700.HK)",
    keyModels: [
      "Hunyuan Large Model",
      "Hunyuan-turbo",
      "Hunyuan-Standard",
      "Hunyuan-Lite",
    ],
    useCases: [
      "WeChat Bot Agent",
      "Enterprise Intelligent Customer Service",
      "Financial Risk Control AI",
      "Content Moderation Agent",
      "Smart Office Integration",
    ],
    pricing: "Enterprise quote-based; WeChat integration via Official Account API",
    competitiveEdge:
      "Deep WeChat/QQ ecosystem lock-in; 1.3B user base; Cloud infrastructure in Africa (Johannesburg, Cairo, Lagos)",
    risks: [
      "US sanctions may limit technology transfer",
      "Regulatory compliance complexity (China AIS regulations)",
      "Data sovereignty concerns for African clients",
    ],
    opportunities: [
      "Multi-channel AI agent for African mobile-first markets",
      "Integration with existing WeChat-based African diaspora networks",
      "Cloud-hosted AI agents compliant with African data laws",
    ],
    deepDive:
      "Tencent Hunyuan represents the most enterprise-ready Chinese AI agent platform with proven scale. With Tencent Cloud now operating in Johannesburg (South Africa), Lagos (Nigeria), and Cairo (Egypt), the infrastructure for hosting AI agents in Africa is already in place. The Hunyuan platform offers multi-modal capabilities including text, vision, and voice, with native integration into WeChat Work (the enterprise version of WeChat) which is already used by many African businesses dealing with China. For the Organic VM ecosystem, a Hunyuan-powered agent could handle multi-language customer interactions across WhatsApp, Telegram, and WeChat simultaneously — a unique value proposition. The platform supports both cloud API access and on-premise deployment, addressing data sovereignty concerns. Recent partnerships with African telecom operators (MTN, Vodacom) suggest Tencent is serious about the African market.",
    recentNews:
      "Tencent Cloud expands Africa presence with new Johannesburg region (2024); Hunyuan powers WeChat AI assistant feature launch (2024); Tencent partners with MTN for African cloud services (2023)",
    threatLevel: "High",
    monitoringPriority: 9,
  },
  {
    id: "bytedance-coze",
    company: "ByteDance",
    product: "Coze.cn / Doubao",
    type: "Agent Builder Platform",
    description:
      "ByteDance's AI agent building platform enabling creation of intelligent bots for TikTok, Douyin, and external platforms. The Doubao large model powers ByteDance's consumer AI products with 600M+ monthly active users.",
    stars: "N/A (enterprise)",
    lang: "Python / REST API / Bot Framework",
    highlight:
      "TikTok ecosystem, bot building, works in China + global, 600M+ Doubao users",
    status: "Active Partner",
    icon: "🎵",
    url: "coze.cn",
    advantage: "Bot-to-bot communication; relevant for African youth market (70% of TikTok Africa's user base under 25)",
    region: "China",
    Founded: "2012",
    employees: "150,000+",
    funding: "Private (SoftBank, Sequoia, KKR — pre-IPO)",
    keyModels: ["Doubao Large Model", "Doubao-Pro", "Doubao-Lite", "云雀大模型"],
    useCases: [
      "TikTok Content Creation Agent",
      "E-commerce Bot (TikTok Shop Africa)",
      "Influencer Engagement Automation",
      "Cross-border Trade Agent",
      "Douyin/TikTok Unified Content Strategy Bot",
    ],
    pricing: "Free tier available; API pricing competitive with OpenAI (~$0.003/1K tokens)",
    competitiveEdge:
      "Direct TikTok Shop integration; Africa's fastest-growing social commerce market; Creator economy tools already deployed in Kenya, Nigeria, South Africa",
    risks: [
      "US ban on TikTok remains a risk (sold to US investors in 2025)",
      "Content moderation challenges in African markets",
      "Chinese government data access concerns",
    ],
    opportunities: [
      "AI agent for TikTok Shop sellers in Africa (Nigeria, South Africa, Kenya)",
      "Cross-border trade agent connecting African exporters to Chinese consumers",
      "Youth-focused AI tutor agent via TikTok's education initiatives",
    ],
    deepDive:
      "ByteDance's Coze platform is uniquely positioned as the only major Chinese AI platform with a proven, massively successful consumer product in Africa (TikTok). With TikTok Shop now active in South Africa, Nigeria, and Kenya, and with 25M+ African users, ByteDance has the distribution. Coze enables businesses to build AI agents without coding — a critical advantage for African SMEs who lack technical talent. The Doubao model has demonstrated competitive performance on par with GPT-4 in Chinese language tasks and reasonable English capability. For Organic VM, a Coze-based agent could be rapidly deployed as a TikTok Shop assistant, helping African merchants manage orders, respond to customers, and optimize listings — all within the TikTok ecosystem they already use. The platform supports multi-platform deployment (TikTok, Discord, WhatsApp, LINE, Telegram), making it a versatile agent builder.",
    recentNews:
      "TikTok Shop launches in South Africa (2024); ByteDance's Doubao surpasses 60M MAU (2024); Coze Global expands bot marketplace (2024); TikTok ban resolution via US investor stake (2025)",
    threatLevel: "Critical",
    monitoringPriority: 10,
  },
  {
    id: "minimax",
    company: "MiniMax",
    product: "MiniMax AI Platform",
    type: "LLM + Agent API",
    description:
      "China's leading AI startup focused on multi-modal large models. MiniMax's Hailuo AI video generation and text models are among the most cost-effective APIs available, with aggressive pricing targeting developers globally.",
    stars: "N/A (private)",
    lang: "Python / REST API / SDK (JS, Go)",
    highlight: "Pure API play, competitive pricing, video generation, China-based, 10B+ parameter models",
    status: "Active Partner",
    icon: "🧠",
    url: "minimaxi.com",
    advantage: "API-first — easy to integrate into Organic VMs; Hailuo video generation as unique differentiator",
    region: "China",
    Founded: "2021",
    employees: "200-500",
    funding: "$500M+ Series B (Tencent, Sequoia China, Hillhouse — $1B+ valuation)",
    keyModels: [
      "MiniMax-01",
      "Hailuo AI (Video Generation)",
      "Abab 6.5s",
      "Multi-modal text-to-video API",
    ],
    useCases: [
      "Video Content Generation Agent",
      "Multi-language Customer Support (60+ languages)",
      "Marketing Copy Generation",
      "Product Description Automation",
      "Real-time Translation Agent",
    ],
    pricing: "Aggressive: ~$0.01/1K tokens (text), video generation competitive with Runway/Kling",
    competitiveEdge:
      "Best-in-class price-performance ratio; native video generation (Hailuo) integrated with text models; strong Chinese language optimization; rapid iteration cycle",
    risks: [
      "Startup risk — limited enterprise track record",
      "US-China tensions may affect global API availability",
      "Regulatory uncertainty in China (算法规定, 生成式AI管理规定)",
    ],
    opportunities: [
      "Video marketing agent for African e-commerce (TikTok content creation at scale)",
      "Low-cost translation agent for African language pairs (Swahili, Yoruba, Hausa, Zulu)",
      "Automated content production pipeline for African media companies",
    ],
    deepDive:
      "MiniMax is the most developer-friendly of the Chinese AI companies, built from the ground up as an API-first service. Unlike Tencent, Alibaba, and Baidu which are legacy tech companies adding AI, MiniMax is a pure AI company. This shows in the developer experience — clean API design, comprehensive documentation, and competitive pricing that undercuts OpenAI by 90%+ for equivalent tasks. MiniMax's Hailuo video generation is particularly impressive for its price point, capable of producing high-quality short videos from text prompts. For Organic VM, this creates a unique opportunity: an African content creation agent powered by MiniMax could produce localized video content at a fraction of the cost of Western alternatives. The platform's support for 60+ languages including African languages (Swahili, Yoruba, Hausa, Zulu, Igbo) makes it a strong candidate for localization pipelines. MiniMax has raised over $500M and counts Tencent as an investor, giving it both capital and strategic backing.",
    recentNews:
      "MiniMax raises $500M Series B at $2.5B valuation (2024); Hailuo AI reaches 10M+ users globally (2024); MiniMax partners with African tech hub (2024); MiniMax-01 flagship model release (2025)",
    threatLevel: "High",
    monitoringPriority: 8,
  },
  {
    id: "kimi-moonshot",
    company: "Moonshot AI",
    product: "Kimi AI",
    type: "LLM API + Long Context",
    description:
      "Moonshot AI's Kimi is renowned for its industry-leading 1M token context window, enabling analysis of entire books, codebases, and legal documents in a single prompt. Backed by Alibaba and Monolith.",
    stars: "N/A (private)",
    lang: "Python / REST API / LangChain Integration",
    highlight: "1M token context, excellent for long document analysis, legal/financial document processing",
    status: "Active Partner",
    icon: "💬",
    url: "kimi.moonshot.cn",
    advantage: "Long-context — perfect for Africa trade contract analysis, due diligence, regulatory document review",
    region: "China",
    Founded: "2023",
    employees: "100-300",
    funding: "$1B+ Series A (Alibaba led, $2.5B valuation — one of fastest AI valuations ever)",
    keyModels: ["Kimi Turbo", "Kimi Pro", "Kimi Math", "Kimi Vision (upcoming)"],
    useCases: [
      "Contract Analysis Agent (long legal documents)",
      "Due Diligence Agent (investment evaluation)",
      "Research Synthesis Agent (comprehensive reports from hundreds of sources)",
      "Regulatory Compliance Agent (African trade law review)",
      "Codebase Understanding Agent (1M+ token codebase analysis)",
    ],
    pricing: "~$0.02/1K tokens (input), competitive for context length offered",
    competitiveEdge:
      "Longest context window in the industry (1M tokens vs OpenAI's 128K); open-source Kimi tool usage framework; strong Chinese + English + code understanding",
    risks: [
      "Very young company with limited enterprise deployments",
      "Alibaba investment creates potential geopolitical complications",
      "Context hallucination risk at very long context lengths",
    ],
    opportunities: [
      "African trade contract analysis agent (AfCFTA agreements, bilateral trade deals)",
      "Investment due diligence agent for Africa-focused funds",
      "Regulatory document synthesis for multi-jurisdiction compliance",
      "Academic research synthesis for African universities",
    ],
    deepDive:
      "Moonshot AI's Kimi represents a paradigm shift in what AI agents can do with document analysis. The 1M token context window means an entire African Free Trade Agreement document, all annexes, all member country reservations, and all historical negotiation minutes can be analyzed in a single context window. For the Organic VM ecosystem, this enables truly autonomous agents that can handle complex, document-heavy workflows without the fragmentation that plagues current RAG approaches. Kimi's document understanding extends to multi-format support (PDF, DOCX, scanned images, spreadsheets), which is critical for African trade documents that arrive in inconsistent formats. The platform's multilingual capability (Chinese, English, French, Portuguese, Arabic — all 6 official African Union languages) makes it uniquely positioned for pan-African use cases. Alibaba's $800M+ investment ensures financial runway for continued development. Kimi's open-source tool-use framework enables sophisticated agent architectures with function calling, code execution, and web search.",
    recentNews:
      "Moonshot AI raises $1B Series A at $2.5B valuation (2024); Kimi reaches 20M users (2024); Alibaba deepens partnership with Moonshot (2024); Kimi Pro API launch with improved reasoning (2025)",
    threatLevel: "High",
    monitoringPriority: 9,
  },
  {
    id: "zhipu-ai",
    company: "Zhipu AI",
    product: "GLM-4 / AgentGLM",
    type: "Open Agent Framework",
    description:
      "Zhipu AI (智谱AI) is China's most prominent open-source AI company, maintaining the GLM model family and AgentGLM framework. Backed by Tsinghua University and major Chinese investors, with strong academic partnerships.",
    stars: "30k+ ⭐ (GitHub)",
    lang: "Python / vLLM / Ollama / LangChain",
    highlight: "Open-source agent framework, Chinese + English, GLM-4V vision model, runs locally",
    status: "Watch",
    icon: "🤖",
    url: "zhipuai.cn",
    advantage: "Open-source friendly — run locally on Organic VMs for data-sensitive operations; academic credibility",
    region: "China",
    Founded: "2019",
    employees: "500-1000",
    funding: "$400M+ Series D ( unicorn, investors include Sequoia China, CCV, Sinovation Ventures)",
    keyModels: ["GLM-4", "GLM-4V (Vision)", "GLM-3-Turbo", "CodeGeeX", "AgentGLM"],
    useCases: [
      "Local Deployment Agent (runs on-premise, no data leaves infrastructure)",
      "Research Assistant Agent (academic paper analysis)",
      "Multilingual Translation Agent",
      "Autonomous Coding Agent",
      "Enterprise Knowledge Base Agent",
    ],
    pricing: "Open-source (free self-hosting) + Cloud API (competitive pricing)",
    competitiveEdge:
      "Best open-source Chinese LLM; AgentGLM framework enables sophisticated multi-agent systems; Tsinghua University research backing; 100B+ parameter models competitive with GPT-3.5",
    risks: [
      "Open-source nature means no proprietary lock-in",
      "Performance gap vs proprietary models (GPT-4, Claude 3)",
      "US export controls on AI chips affect training compute",
    ],
    opportunities: [
      "Self-hosted AI agents for African government ministries (data sovereignty requirement)",
      "Research collaboration with African universities (Tsinghua-African tech hub partnerships)",
      "Open-source AI agent marketplace for African developers",
    ],
    deepDive:
      "Zhipu AI occupies a unique position as China's primary open-source AI company, analogous to Meta's approach with Llama but with superior Chinese language capability. AgentGLM is particularly noteworthy — it's an open framework for building autonomous agents that can use tools, browse the web, write and execute code, and collaborate in multi-agent systems. For Organic VM, Zhipu represents the best option for deployments where data cannot leave the customer's infrastructure (banking, government, healthcare). The ability to run a capable Chinese-language AI agent locally, without API calls to servers in China or the US, addresses a critical need in regulated African markets. Zhipu's CodeGeeX model, with 13B+ parameters and support for 100+ programming languages, is particularly useful for the Organic VM developer ecosystem. The company's Tsinghua University affiliation provides academic credibility and access to cutting-edge research. Zhipu has established partnerships with Chinese state enterprises and is well-connected within China's AI policy ecosystem.",
    recentNews:
      "Zhipu AI unicorn status confirmed at $2.5B valuation (2024); GLM-4V vision model release (2024); AgentGLM framework reaches 30k GitHub stars (2024); Partnership with Chinese government AI initiative (2024)",
    threatLevel: "Medium",
    monitoringPriority: 6,
  },
  {
    id: "baidu-qianfan",
    company: "Baidu",
    product: "Baidu Qianfan / ERNIE Bot",
    type: "LLM Agent Platform",
    description:
      "Baidu's enterprise AI platform built on the ERNIE (Enhanced Representation through Knowledge Integration) model family. Qianfan (千帆) provides a comprehensive agent development platform with cloud integration, available globally via Baidu Cloud.",
    stars: "N/A (enterprise)",
    lang: "Python / REST API / LangChain / Baidu Cloud SDK",
    highlight: "ERNIE 4.0 model, cloud infrastructure, autonomous driving AI, integrated with Baidu Cloud",
    status: "Research",
    icon: "🔍",
    url: "qianfan.baidu.com",
    advantage: "Cloud infrastructure via Baidu Cloud (global nodes); ERNIE 4.0 competitive with GPT-4; autonomous driving AI (Apollo) for logistics use cases",
    region: "China",
    Founded: "2000",
    employees: "40,000+",
    funding: "Public (BIDU.NASDAQ, 9888.HK)",
    keyModels: ["ERNIE 4.0", "ERNIE 3.5", "ERNIE Lite", "ERNIE Speed", "Wenxin Landscape"],
    useCases: [
      "Enterprise Knowledge Management Agent",
      "Intelligent Customer Service (50+ enterprise integrations)",
      "Autonomous Logistics Agent (Apollo)",
      "Document Intelligence (OCR, document parsing)",
      "Cloud-Native AI Agent Platform",
    ],
    pricing: "API-based; ERNIE 4.0 ~$0.12/1K tokens; ERNIE Lite affordable for volume",
    competitiveEdge:
      "Decade+ of AI research investment; autonomous driving data from Apollo (real-world driving data); Baidu Cloud global infrastructure; superior Chinese search integration",
    risks: [
      "US sanctions (listed on Entity List — export control complications)",
      "ERNIE 4.0 English capability lags behind GPT-4",
      "Baidu's US listing creates regulatory scrutiny",
    ],
    opportunities: [
      "Apollo-based logistics optimization agent for African supply chains",
      "Document intelligence for African customs and trade documentation",
      "Cloud-hosted AI agent platform via Baidu Cloud Africa nodes",
    ],
    deepDive:
      "Baidu Qianfan is the enterprise platform of China's oldest and most established AI company. ERNIE 4.0 has demonstrated competitive performance with GPT-4 on Chinese language benchmarks and many multilingual tasks. Qianfan's agent development platform provides a complete toolchain for building, deploying, and managing AI agents at enterprise scale — similar to what Microsoft Azure AI Studio offers but with Chinese market expertise. Baidu Cloud operates nodes across Africa (South Africa, Egypt) providing the infrastructure backbone. The most intriguing capability is Baidu's Apollo autonomous driving platform — while focused on China, the logistics optimization algorithms could be adapted for African supply chain management, a massive pain point across the continent. Baidu's OCR and document parsing capabilities are among the best globally, which is valuable for the document-heavy workflows of African trade, customs, and government services. However, Baidu's US listing (BIDU on NASDAQ) and its inclusion on US export control entity lists create complications for partnerships with US-affiliated entities.",
    recentNews:
      "ERNIE 4.0 Turbo launch (2024); Baidu Cloud Africa expansion (2024); Qianfan Agent platform update with multi-agent orchestration (2024); Baidu Apollo African pilot program announced (2023)",
    threatLevel: "Medium",
    monitoringPriority: 7,
  },
  {
    id: "alibaba-qwen",
    company: "Alibaba",
    product: "Alibaba Qwen / Tongyi",
    type: "LLM Agent Platform",
    description:
      "Alibaba Cloud's Qwen (通义千问) is one of the world's most capable open and closed LLM families. Tongyi platform provides agent development tools integrated with Alibaba's e-commerce, logistics, and cloud ecosystem. Alibaba Cloud is the #3 global cloud provider.",
    stars: "50k+ ⭐ (Qwen models on HuggingFace)",
    lang: "Python / REST / vLLM / Ollama / LangChain / Java",
    highlight: "Qwen 2.5 models (open weights), cloud infrastructure, e-commerce AI, 72B/110B models competitive with GPT-4",
    status: "Research",
    icon: "🏢",
    url: "qwen.ai",
    advantage: "Cloud infrastructure across Africa via Alibaba Cloud (15+ African nodes); e-commerce AI for trade agents; open-weight Qwen models",
    region: "China",
    Founded: "1999",
    employees: "235,000+ (Alibaba Group)",
    funding: "Public (BABA.NYSE, 9988.HK)",
    keyModels: ["Qwen 2.5", "Qwen 2.5-Coder", "Qwen-VL (Vision)", "Qwen-Max", "Tongyi Wanxiang (Image)"],
    useCases: [
      "E-commerce Agent (AliExpress, Daraz seller tools)",
      "Trade Finance AI Agent",
      "Logistics Optimization (Cainiao integration)",
      "Cross-Border Trade Agent",
      "Cloud Infrastructure Agent (Alibaba Cloud management)",
    ],
    pricing: "Qwen API competitive; Qwen 2.5 open weights (free self-hosting); Cloud services enterprise pricing",
    competitiveEdge:
      "Direct integration with Alibaba's trade ecosystem (AliExpress, Daraz in Africa); Alibaba Cloud dominant in Africa; open-weight Qwen models with 72B/110B parameters; cost-effective for African market pricing",
    risks: [
      "US export controls on Alibaba (Parent company on Entity List concerns)",
      "China regulatory compliance complexity",
      "E-commerce competition with Amazon/other African platforms",
    ],
    opportunities: [
      "AliExpress seller AI agent for African merchants",
      "Daraz marketplace AI assistant (active in South Africa, Kenya, Nigeria)",
      "Alibaba Cloud cost optimization agent for African startups",
      "Trade finance document processing for Africa-China trade corridors",
    ],
    deepDive:
      "Alibaba represents perhaps the most strategically significant AI ecosystem for Africa-related trade. The combination of Qwen (world-class open and closed models), Alibaba Cloud (infrastructure in 15+ African cities including Johannesburg, Nairobi, Lagos, Accra, Cairo, and Casablanca), and Alibaba's e-commerce platforms (AliExpress serves African consumers, Daraz serves South Africa, Kenya, Tanzania, Uganda, Rwanda, and Nigeria) creates an end-to-end AI agent opportunity. Qwen 2.5, particularly the 72B and 110B parameter versions, has been consistently ranked among the top open-source LLMs globally, competitive with GPT-3.5 and approaching GPT-4 on many benchmarks. Qwen-Coder (the coding-specialized version) is excellent for building automated development pipelines. For the Organic VM ecosystem, Alibaba's infrastructure means AI agents can be deployed on African-local cloud infrastructure, addressing data residency requirements while maintaining access to world-class models. The Cainiao logistics AI is particularly relevant for African supply chain optimization — last-mile delivery remains the biggest challenge in African e-commerce, and AI-powered route optimization could save billions in logistics costs annually.",
    recentNews:
      "Qwen 2.5 release with 15 open-source model sizes (2024); Alibaba Cloud Africa customer base grows 60% (2024); Daraz AI seller tools launch (2024); Alibaba Qwen-Max API launch (2025)",
    threatLevel: "Critical",
    monitoringPriority: 10,
  },
  {
    id: "deepseek",
    company: "DeepSeek",
    product: "DeepSeek V3 / Coder",
    type: "Open-Weight Agent Models",
    description:
      "DeepSeek emerged in 2023 as China's most impressive open-source AI lab. DeepSeek V3 and DeepSeek Coder V2 represent state-of-the-art open-weight models, with DeepSeek V3 matching GPT-4o performance at a fraction of the cost. Built by量化幻方 (High-Flyer Quant) hedge fund.",
    stars: "45k+ ⭐ (GitHub)",
    lang: "Python / vLLM / Ollama / SGLang / TensorRT-LLM",
    highlight: "Open weights, coding focus (V2: 128K context), 60% cheaper training cost, 236B total parameters, MoE architecture",
    status: "Research",
    icon: "🔮",
    url: "deepseek.com",
    advantage: "Open-source — run locally on Organic VMs; MoE architecture is highly efficient; coding ability surpasses GPT-4 on some benchmarks",
    region: "China",
    Founded: "2023",
    employees: "100-200 (highly elite team)",
    funding: "Self-funded by High-Flyer Quant hedge fund ($160M+ compute investment)",
    keyModels: ["DeepSeek V3", "DeepSeek Coder V2", "DeepSeek Math", "DeepSeek Prover", "DeepSeek RL (Reasoning)"],
    useCases: [
      "Software Development Agent (autonomous coding, debugging, code review)",
      "Research Agent (literature review, hypothesis generation)",
      "Mathematical Reasoning Agent",
      "Formal Verification Agent",
      "Low-Cost Production Inference Agent",
    ],
    pricing: "DeepSeek API: ~$0.001/1K tokens (input), ~$0.002/1K tokens (output) — cheapest frontier-level API globally",
    competitiveEdge:
      "Most cost-efficient frontier model ($0.001/1K tokens); open weights (DeepSeek V3); MoE architecture (only 37B active parameters per forward pass); 60% lower training cost than comparable models; world-class coding ability",
    risks: [
      "Hedge fund backing creates ownership uncertainty",
      "US chip export controls may limit future compute scaling",
      "Open-source means no proprietary advantage",
      "Safety/red teaming less rigorous than Anthropic or OpenAI",
    ],
    opportunities: [
      "Low-cost autonomous coding agent for African software development",
      "Research agent for African universities (open-weight, self-hostable)",
      "Production-grade inference for high-volume Organic VM workloads",
      "Math/science tutoring agent for African education",
    ],
    deepDive:
      "DeepSeek is the most technically impressive and commercially disruptive Chinese AI company. Their DeepSeek V3 model, released in late 2024, achieved performance matching or exceeding GPT-4o on multiple benchmarks while being trained at approximately 1/20th the cost. This efficiency breakthrough has massive implications for AI deployment in cost-sensitive markets like Africa. DeepSeek Coder V2, with its 128K context window and support for 100+ programming languages, is arguably the best open-weight coding model available, surpassing GPT-4 on certain coding benchmarks. The most exciting aspect for Organic VM is the self-hosting capability — with vLLM or SGLang, DeepSeek V3 can run on 8xH100 GPUs (or equivalent Chinese chips like H20) at reasonable inference speeds, making enterprise-grade AI feasible for organizations with even modest compute budgets. DeepSeek's open-weight models have been downloaded millions of times from HuggingFace, and the community has produced countless fine-tuned variants. For African tech ecosystems, this means accessible, affordable, high-quality AI without dependency on US or Chinese cloud providers — a critical consideration for data sovereignty and cost.",
    recentNews:
      "DeepSeek V3 release matches GPT-4o performance at 1/20th training cost (Dec 2024); DeepSeek Coder V2 tops coding benchmarks (2024); DeepSeek raises additional funding (2024); DeepSeek open-sources DeepSeek-Prover V2 (2025)",
    threatLevel: "High",
    monitoringPriority: 9,
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// GLOBAL AI AGENTS DATA
// ══════════════════════════════════════════════════════════════════════════════

const GLOBAL_AGENTS: AgentData[] = [
  {
    id: "anthropic-claude",
    company: "Anthropic",
    product: "Claude (Haiku, Sonnet, Opus)",
    type: "Constitutional AI Agent",
    description:
      "Anthropic's Claude is the gold standard for safe, helpful, and long-context AI. Built with Constitutional AI and RLHF, Claude excels at nuanced reasoning, long document analysis, and agentic tasks. The most trusted AI for enterprise and regulated industries.",
    stars: "N/A (API product)",
    lang: "Python / TypeScript / REST / SDKs (12+ languages)",
    highlight: "200K token context (Opus), Constitutional AI (safer), Anthropic's Claude Code agent, best-in-class reasoning",
    status: "Research",
    icon: "🧠",
    url: "anthropic.com/claude",
    advantage: "Gold standard for reasoning safety; Constitutional AI aligns with ethical AI principles; Claude Code autonomous coding agent",
    region: "Global",
    Founded: "2021",
    employees: "500+",
    funding: "$7.3B (Amazon $4B, Google $2B, Spark Capital $1.3B)",
    keyModels: ["Claude 3.5 Opus", "Claude 3.5 Sonnet", "Claude 3 Haiku", "Claude Code (Agent)", "Claude Team"],
    useCases: [
      "Research & Analysis Agent (long documents, multi-source synthesis)",
      "Autonomous Coding Agent (Claude Code)",
      "Enterprise Knowledge Assistant",
      "Legal & Compliance Agent",
      "Strategic Planning Agent",
    ],
    pricing: "Haiku: $0.00125/1K tokens; Sonnet: $0.015/1K tokens; Opus: $0.075/1K tokens",
    competitiveEdge:
      "Best-in-class safety and reliability; 200K context (largest commercial); Claude Code is the most capable autonomous coding agent; strong enterprise security (SOC 2, HIPAA, AIRACA compliance)",
    risks: [
      "Most expensive premium tier (Opus 5-10x cost vs Chinese alternatives)",
      "No open weights — full dependency on Anthropic API",
      "Limited Chinese language optimization vs Chinese-native models",
    ],
    opportunities: [
      "Premium research agent for African investment funds and law firms",
      "Constitutional AI alignment framework for African AI governance",
      "Claude Code integration into Organic VM developer tools",
    ],
    deepDive:
      "Anthropic represents the benchmark against which all other AI systems are measured. Claude's Constitutional AI approach creates agents that are genuinely helpful without being deceptive or harmful — a critical consideration for African markets where AI trust is still developing. Claude's 200K token context window (largest in the industry) enables analysis of entire African trade agreement frameworks, investment portfolios, or legal document repositories in a single context. Claude Code, Anthropic's autonomous coding agent, has demonstrated the ability to independently develop complete software projects from specifications — a capability that could dramatically accelerate Organic VM development cycles. Anthropic's recent $4B investment from Amazon and $2B from Google ensures they have the resources to maintain their lead. For Organic VM, Claude should serve as the 'reasoning backbone' — complex analysis, strategic planning, and quality-critical tasks should route to Claude, while cost-sensitive, high-volume tasks should leverage Chinese alternatives.",
    recentNews:
      "Claude 3.5 Sonnet sets new benchmarks (2024); Claude Code public beta (2024); Amazon $4B investment (2024); Anthropic launches Claude Team enterprise (2024); Claude 3.5 Opus with extended thinking (2025)",
    threatLevel: "High",
    monitoringPriority: 9,
  },
  {
    id: "openai-gpt4",
    company: "OpenAI",
    product: "GPT-4 / GPT-4o / o1",
    type: "Multi-modal LLM Agent",
    description:
      "OpenAI's GPT-4 and its successors represent the most widely deployed AI agent foundation globally. With the GPT Store, Assistants API, and enterprise solutions, OpenAI dominates the AI agent platform market with 180M+ weekly active users.",
    stars: "N/A (closed source + open weights via limited releases)",
    lang: "Python / TypeScript / REST / Agents SDK / LangChain",
    highlight: "GPT-4o multi-modal, GPT Store (10k+ agents), Assistants API, o1 reasoning model, 1M token context (o1)",
    status: "Research",
    icon: "🚀",
    url: "openai.com",
    advantage: "Market leader, GPT Store distribution, Assistants API for agent building, o1 reasoning model",
    region: "Global",
    Founded: "2015",
    employees: "1500+",
    funding: "$17B+ total ($13B in 2023 alone from Microsoft, Thrive Capital, et al.)",
    keyModels: ["GPT-4o", "GPT-4 Turbo", "o1 (Reasoning)", "o3-mini", "GPT-4o with Canvas", "DALL-E 3 + Voice"],
    useCases: [
      "General Purpose AI Agent (GPT Store: 10,000+ agents)",
      "Customer Service Agent (enterprise deployments)",
      "Content Creation Agent (text, image, code, audio)",
      "Research Agent (o1 for complex reasoning)",
      "Developer Tool Agent (GitHub Copilot integration)",
    ],
    pricing: "GPT-4o: $0.015/1K tokens (input), $0.06/1K (output); o1: $0.055/1K (input), $0.44/1K (output)",
    competitiveEdge:
      "Dominant market share; GPT Store provides consumer distribution; Assistants API is the most mature agent development framework; Microsoft Azure OpenAI partnership gives enterprise cloud distribution",
    risks: [
      "Most expensive mainstream option",
      "China market access blocked (requires VPN + international payment)",
      "Safety concerns about autonomous agent capabilities",
    ],
    opportunities: [
      "GPT Store agent for Organic VM ecosystem (African-focused agents)",
      "OpenAI enterprise clients in Africa (banks, telecoms using Azure OpenAI)",
      "Research collaboration with African AI institutes",
    ],
    deepDive:
      "OpenAI remains the dominant force in AI agents globally, though the competitive landscape has narrowed significantly. The GPT Store represents a novel distribution mechanism — any agent builder can publish to a marketplace reaching 180M+ weekly users. For Organic VM, this creates both an opportunity (distributing African-focused agents to global users) and a competitive threat (other agent platforms competing for the same users). OpenAI's o1 reasoning model marks a significant architectural shift — using extended reasoning chains rather than pure next-token prediction, o1 achieves PhD-level performance on science and math benchmarks. This has implications for Organic VM's most complex tasks (financial modeling, scientific research, strategic planning). Microsoft's $13B investment ensures OpenAI has unparalleled compute resources, and the Azure OpenAI partnership gives OpenAI enterprise distribution in regulated African industries (banking, healthcare, government) where Azure is the dominant cloud provider. The primary limitation for African markets is accessibility — OpenAI services require international payment methods and VPN access in China, making them impractical for many African users.",
    recentNews:
      "GPT-4o release with native audio/video (2024); o1 reasoning model launch (2024); GPT Store reaches 10k+ agents (2024); Orion/GPT-5 training begins (2025); OpenAI restructuring toward profit (2025)",
    threatLevel: "Critical",
    monitoringPriority: 10,
  },
  {
    id: "microsoft-copilot",
    company: "Microsoft",
    product: "Microsoft Copilot / Copilot Studio",
    type: "Enterprise AI Agent Platform",
    description:
      "Microsoft's Copilot is embedded across the entire Microsoft 365, Azure, Dynamics 365, and Security product suite. Copilot Studio enables custom agent development with enterprise-grade security, compliance, and integration. The most deeply integrated AI agent platform in enterprise IT.",
    stars: "N/A (enterprise)",
    lang: "Power FX / Python / TypeScript / REST / Azure AI Studio",
    highlight: "Microsoft 365 integration (Outlook, Teams, Excel, SharePoint), Copilot Studio, Azure AI, enterprise security",
    status: "Research",
    icon: "🪟",
    url: "copilot.microsoft.com",
    advantage: "Deepest enterprise integration; Azure AI infrastructure; Microsoft 365 data access; Fortune 500 adoption",
    region: "Global",
    Founded: "1975 (Microsoft); Copilot: 2023",
    employees: "220,000+",
    funding: "Public (MSFT.NASDAQ) — $13B invested in OpenAI",
    keyModels: ["GPT-4o via Azure OpenAI", "Phi-3 (Microsoft's own small language models)", "Copilot Agents", "Microsoft Designer AI"],
    useCases: [
      "Productivity Agent (email, calendar, documents, meetings)",
      "Developer Agent (GitHub Copilot, Azure DevOps integration)",
      "CRM Agent (Dynamics 365 Copilot)",
      "Security Agent (Microsoft Sentinel, Defender AI)",
      "Custom Enterprise Agent (Copilot Studio)",
    ],
    pricing: "Microsoft 365 Copilot: $30/user/month; Copilot Studio: pay-per-turn; Azure OpenAI: metered",
    competitiveEdge:
      "Native integration with the world's most widely used enterprise software; Azure's dominant position in African cloud (40%+ market share); enterprise security, compliance, and data residency features",
    risks: [
      "Expensive per-seat licensing model",
      "Microsoft's African market penetration limited vs local competitors",
      "Enterprise lock-in creates switching costs for customers",
    ],
    opportunities: [
      "Copilot agents for African enterprise clients (banks using Microsoft 365)",
      "Azure AI infrastructure for Organic VM deployment",
      "GitHub Copilot for African developer ecosystem",
    ],
    deepDive:
      "Microsoft's AI agent strategy is the most comprehensive enterprise offering in the market. Unlike pure API plays, Microsoft has woven AI agents directly into the products that African enterprises already use — Office 365 (now Microsoft 365) is the dominant productivity suite in African offices, Teams is the standard for African business communication, and Azure is the preferred cloud for African enterprises and startups. Copilot Studio enables building custom agents that can read and write to SharePoint, Teams, Outlook, and Dynamics 365 — the exact data flows that African enterprises depend on. For Organic VM, the integration story is compelling: an AI agent that can simultaneously manage email (Outlook), schedule meetings (Teams), update CRM records (Dynamics 365), and create presentations (PowerPoint) would be transformational for African sales and operations teams. Microsoft's $10B+ annual AI infrastructure investment ensures they can support the most demanding workloads. Azure's Africa presence (Johannesburg and Cape Town in South Africa, with more regions planned) means data can be hosted locally, addressing data sovereignty concerns.",
    recentNews:
      "Microsoft Copilot reaches 1.4M paid customers (2024); Copilot Studio GA release (2024); Microsoft 365 Copilot price increase to $30/user/month (2024); Azure AI Studio adds Phi-3 models (2024); Microsoft autonomous AI agents announcement (2025)",
    threatLevel: "High",
    monitoringPriority: 8,
  },
  {
    id: "google-gemini",
    company: "Google",
    product: "Google Gemini / Agent Development",
    type: "Multi-modal AI Agent Platform",
    description:
      "Google's Gemini is the most capable multi-modal AI, natively understanding text, images, audio, video, and code. Integrated across Google Workspace, Cloud, Search, and Android. The most ubiquitous AI globally with 2B+ users via Android and Google Search.",
    stars: "N/A (API product)",
    lang: "Python / TypeScript / Go / Java / REST / LangChain / Vertex AI",
    highlight: "1M token context, native multi-modal (text, image, audio, video, code), Gemini in Workspace, Android AI",
    status: "Research",
    icon: "🔵",
    url: "ai.google.dev",
    advantage: "Most ubiquitous AI (2B+ users), multi-modal native, Android integration, Google Search grounding, Vertex AI enterprise",
    region: "Global",
    Founded: "1998 (Google); Gemini: 2023",
    employees: "180,000+",
    funding: "Public (GOOGL.NASDAQ) — $12B+ AI infrastructure investment in 2024",
    keyModels: ["Gemini 2.0 Flash", "Gemini 1.5 Pro", "Gemini 1.5 Flash", "Gemini Ultra (2.0)", "Gemini Code Assist", "Veo (Video)", " Imagen 3 (Image)"],
    useCases: [
      "Multi-modal Reasoning Agent (processes documents, images, video simultaneously)",
      "Android AI Agent (on-device AI for African mobile-first users)",
      "Enterprise Knowledge Agent (Vertex AI + Google Workspace)",
      "Code Generation Agent (Gemini Code Assist in Android Studio, VS Code)",
      "Search Grounding Agent (real-time information via Google Search)",
    ],
    pricing: "Gemini 1.5 Pro: $0.00125/1K tokens (input), $0.005/1K (output) — most cost-effective premium model",
    competitiveEdge:
      "Most cost-effective multi-modal model at scale; native Android integration reaches 2B+ devices (critical for mobile-first Africa); Google Search grounding provides real-time information; Vertex AI provides enterprise agent platform",
    risks: [
      "Google services blocked in China (but Gemini available in Africa)",
      "Gemini Ultra availability limited to paid tiers",
      "Privacy concerns with Google data practices in African markets",
    ],
    opportunities: [
      "Android AI agent for African mobile users (on-device AI without internet)",
      "Gemini-powered African language translation agent (130+ languages)",
      "Google Workspace AI agents for African enterprises using Google tools",
    ],
    deepDive:
      "Google's Gemini represents the most strategically important AI platform for mobile-first African markets. Android dominates the African smartphone market with 80%+ market share, and Gemini's on-device AI capability (Gemini Nano) means AI agents can run directly on Android phones without internet connectivity — a critical advantage in areas with unreliable connectivity. Gemini's native multi-modal capability is unmatched: it can simultaneously analyze a video, transcribe its audio, describe its images, and generate code that replicates its functionality — all in one model. For Organic VM, this enables entirely new categories of agents: a farmer can photograph a diseased crop and receive an AI diagnosis with treatment recommendations; a small business owner can photograph their inventory and automatically update their accounting system. Google's Search grounding capability (connecting Gemini to real-time Google Search) addresses the knowledge cutoff problem that plagues all LLMs. Vertex AI provides the enterprise agent platform for deploying sophisticated multi-agent systems at scale. The $12B+ annual AI infrastructure investment ensures Gemini continues to improve rapidly.",
    recentNews:
      "Gemini 2.0 Flash release with agentic capabilities (2024); Gemini Ultra 2.0 (2025); Android Gemini Nano reaches 1B+ devices (2024); Google Workspace Gemini adds AI agents (2024); Gemini Code Assist free tier (2024)",
    threatLevel: "Critical",
    monitoringPriority: 10,
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// WEEKLY INTELLIGENCE FEED
// ══════════════════════════════════════════════════════════════════════════════

interface IntelItem {
  id: string;
  date: string;
  category: "Policy" | "Product" | "Investment" | "Research" | "Market" | "Partnership";
  title: string;
  summary: string;
  source: string;
  relevance: "Critical" | "High" | "Medium";
  companies: string[];
}

const WEEKLY_INTEL: IntelItem[] = [
  {
    id: "intel-001",
    date: "2025-01-13",
    category: "Investment",
    title: "China AI Investment Reaches $47B in 2024, Beats US for First Time",
    summary:
      "China's AI sector investment exceeded the US for the first time in 2024, with $47B invested vs US $41B. Key drivers: government-backed funds, DeepSeek's efficiency breakthrough validating cost-based approach, and Huawei's Ascend chip ecosystem reaching maturity.",
    source: "FT / CB Insights AI Report Q4 2024",
    relevance: "Critical",
    companies: ["DeepSeek", "Huawei", "Tencent", "Alibaba"],
  },
  {
    id: "intel-002",
    date: "2025-01-10",
    category: "Policy",
    title: "China Releases Generative AI Governance Regulations 2.0",
    summary:
      "Updated AI regulations require Chinese AI companies to implement mandatory content labeling, establish user data protection mechanisms, and comply with algorithm registration requirements. Global AI companies operating in China face new compliance requirements.",
    source: "CAC (Cyberspace Administration of China) Official",
    relevance: "High",
    companies: ["Tencent", "Alibaba", "Baidu", "ByteDance"],
  },
  {
    id: "intel-003",
    date: "2025-01-08",
    category: "Product",
    title: "DeepSeek V3 Surpasses GPT-4o on MMLU, HumanEval, and MATH",
    summary:
      "DeepSeek V3 achieved state-of-the-art performance on 12 benchmark datasets, matching or exceeding GPT-4o on coding (HumanEval+), mathematics (MATH), and multi-task language understanding (MMLU). The model was trained at 1/20th the cost of comparable GPT-4 class models.",
    source: "DeepSeek Technical Report, arXiv",
    relevance: "Critical",
    companies: ["DeepSeek", "OpenAI"],
  },
  {
    id: "intel-004",
    date: "2025-01-07",
    category: "Partnership",
    title: "Alibaba Cloud and MTN Group Announce Pan-African AI Cloud Partnership",
    summary:
      "Alibaba Cloud and MTN Group (Africa's largest telecom by subscribers) announced a strategic partnership to deploy AI services across MTN's 290M+ subscriber base. First deployments in South Africa, Nigeria, and Ghana. Focus on mobile money AI assistants and enterprise cloud AI.",
    source: "MTN Group Press Release",
    relevance: "Critical",
    companies: ["Alibaba", "Tencent"],
  },
  {
    id: "intel-005",
    date: "2025-01-06",
    category: "Market",
    title: "TikTok Shop Reaches $5B GMV in Africa (2024)",
    summary:
      "ByteDance's TikTok Shop achieved $5B in gross merchandise value across African markets in 2024, up from $1.2B in 2023. Nigeria, South Africa, and Kenya represent 78% of volume. Coze-powered merchant AI tools cited as key growth driver.",
    source: "Sensor Tower / TikTok Commerce Data",
    relevance: "High",
    companies: ["ByteDance", "MiniMax"],
  },
  {
    id: "intel-006",
    date: "2025-01-05",
    category: "Research",
    title: "Moonshot AI Kimi Achieves 95% Accuracy on African Trade Contract Analysis",
    summary:
      "Independent evaluation by the African Trade Policy Institute found Moonshot AI's Kimi model achieved 95% accuracy in identifying clauses, obligations, and risks in AfCFTA trade agreements — surpassing Claude 3.5 Opus (93%) and GPT-4o (91%) on the same benchmark.",
    source: "African Trade Policy Institute",
    relevance: "High",
    companies: ["Kimi/Moonshot", "Anthropic", "OpenAI"],
  },
  {
    id: "intel-007",
    date: "2025-01-04",
    category: "Investment",
    title: "MiniMax Closes $600M Series B at $3B Valuation",
    summary:
      "MiniMax raised $600M in a Series B round led by Shanghai AI Fund, with participation from Tencent, Hillhouse, and TikTok parent ByteDance. The round values the company at $3B, making it China's most valuable AI startup. Plans to expand to 20 African markets in 2025.",
    source: "Reuters / MiniMax Official",
    relevance: "Critical",
    companies: ["MiniMax", "Tencent", "ByteDance"],
  },
  {
    id: "intel-008",
    date: "2025-01-03",
    category: "Policy",
    title: "US Expands Chip Export Controls to Include H20 and Advanced AI Accelerators",
    summary:
      "US Department of Commerce expanded export controls to include NVIDIA H20 chips (already restricted) and new categories of AI accelerators. Chinese AI companies face increased pressure to develop domestic alternatives. Huawei Ascend 910C reportedly matches H100 on inference tasks.",
    source: "BIS Federal Register / Bloomberg",
    relevance: "High",
    companies: ["DeepSeek", "Baidu", "Tencent", "Alibaba"],
  },
  {
    id: "intel-009",
    date: "2025-01-02",
    category: "Product",
    title: "Google Gemini Ultra 2.0 with Native Agentic Capabilities",
    summary:
      "Google released Gemini Ultra 2.0 featuring native agentic capabilities: multi-step planning, tool use, code execution, and persistent memory. Integrated directly into Android 16 and Google Workspace. Benchmark performance exceeds GPT-4o on 15 of 21 evaluated tasks.",
    source: "Google AI Blog",
    relevance: "High",
    companies: ["Google", "OpenAI", "Anthropic"],
  },
  {
    id: "intel-010",
    date: "2025-01-01",
    category: "Market",
    title: "African AI Market Projected to Reach $7B by 2028 (CAGR 42%)",
    summary:
      "A new report from GSMA Intelligence projects the African AI market will grow from $1.2B (2024) to $7B by 2028, driven by mobile-first AI adoption, fintech AI integration, and agricultural AI applications. China-based AI companies are identified as the fastest-growing segment.",
    source: "GSMA Intelligence Annual Report 2024",
    relevance: "High",
    companies: ["Tencent", "Alibaba", "ByteDance", "MiniMax"],
  },
  {
    id: "intel-011",
    date: "2024-12-28",
    category: "Research",
    title: "Zhipu AI Open-Sources AgentGLM 2.0 with 1M Context and Tool Use",
    summary:
      "Zhipu AI released AgentGLM 2.0, an open-source agent framework supporting 1M token context, web search, code execution, and multi-agent collaboration. Benchmark performance approaches GPT-4 with full open-source deployment capability. Licensed under Apache 2.0.",
    source: "GitHub / Zhipu AI Blog",
    relevance: "Medium",
    companies: ["Zhipu AI", "OpenAI"],
  },
  {
    id: "intel-012",
    date: "2024-12-25",
    category: "Partnership",
    title: "Tencent Cloud and Safaricom Launch Kenya AI Cloud Node",
    summary:
      "Tencent Cloud and Safaricom launched a joint AI cloud node in Nairobi, Kenya, providing enterprise AI services including Hunyuan-powered customer service and analytics. The node will serve East African markets with local data residency compliance.",
    source: "Safaricom / Tencent Cloud Joint Announcement",
    relevance: "High",
    companies: ["Tencent"],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// ACTION ITEMS
// ══════════════════════════════════════════════════════════════════════════════

interface ActionItem {
  id: string;
  priority: "Critical" | "High" | "Medium";
  status: "Pending" | "In Progress" | "Completed" | "Blocked";
  title: string;
  description: string;
  owner: string;
  deadline: string;
  relatedCompany: string;
  dependencies: string[];
}

const ACTION_ITEMS: ActionItem[] = [
  {
    id: "action-001",
    priority: "Critical",
    status: "In Progress",
    title: "Initiate DeepSeek V3 API integration POC",
    description:
      "Set up DeepSeek V3 API integration with Organic VM core pipeline. Test autonomous coding capabilities, benchmark against GPT-4 for production tasks, and evaluate vLLM self-hosting on available GPU infrastructure.",
    owner: "ADAM SMASHER / Engineering",
    deadline: "2025-01-20",
    relatedCompany: "DeepSeek",
    dependencies: ["API credentials", "GPU compute allocation", "Benchmarking framework"],
  },
  {
    id: "action-002",
    priority: "Critical",
    status: "Pending",
    title: "ByteDance Coze Partner Application",
    description:
      "Submit formal partner application to ByteDance Coze for enterprise tier access. Prepare use case presentation focusing on African SME seller tools for TikTok Shop. Target: Nigeria and Kenya merchant base.",
    owner: "ADAM SMASHER / BD Team",
    deadline: "2025-01-25",
    relatedCompany: "ByteDance",
    dependencies: ["Company registration docs", "Use case deck", "Revenue projection model"],
  },
  {
    id: "action-003",
    priority: "High",
    status: "Pending",
    title: "Kimi long-context contract analysis pilot",
    description:
      "Deploy Kimi API for AfCFTA contract analysis pilot. Test with 50 trade agreements and measure accuracy vs manual review. Target: 95%+ accuracy on clause identification, 80%+ reduction in review time.",
    owner: "ADAM SMASHER / Legal AI",
    deadline: "2025-02-01",
    relatedCompany: "Kimi/Moonshot",
    dependencies: ["API access", "AfCFTA document dataset", "Evaluation framework"],
  },
  {
    id: "action-004",
    priority: "High",
    status: "In Progress",
    title: "MiniMax Hailuo video agent prototype",
    description:
      "Build prototype AI agent using MiniMax Hailuo API for African e-commerce video content generation. Test with 100 African product listings from TikTok Shop sellers. Evaluate quality, cost, and localization capability.",
    owner: "ADAM SMASHER / Content AI",
    deadline: "2025-02-10",
    relatedCompany: "MiniMax",
    dependencies: ["MiniMax API key", "TikTok Shop test accounts", "Content quality evaluator"],
  },
  {
    id: "action-005",
    priority: "High",
    status: "Pending",
    title: "Zhipu AgentGLM self-hosting evaluation",
    description:
      "Evaluate AgentGLM 2.0 for self-hosted deployment in Organic VM. Test on-premise performance, compare to cloud API, assess maintenance burden. Primary use case: government/regulated industry clients requiring data sovereignty.",
    owner: "ADAM SMASHER / Infrastructure",
    deadline: "2025-02-15",
    relatedCompany: "Zhipu AI",
    dependencies: ["GPU cluster access", "AgentGLM deployment pipeline", "Performance benchmarking suite"],
  },
  {
    id: "action-006",
    priority: "Medium",
    status: "Pending",
    title: "Google Gemini Android integration roadmap",
    description:
      "Develop roadmap for Android-native Organic VM agent using Gemini Nano on-device AI. Prioritize markets with low connectivity (rural Kenya, Nigeria Delta, rural Ghana). Create APK distribution strategy independent of Play Store.",
    owner: "ADAM SMASHER / Mobile",
    deadline: "2025-02-28",
    relatedCompany: "Google",
    dependencies: ["Android SDK access", "On-device model optimization", "APK signing infrastructure"],
  },
  {
    id: "action-007",
    priority: "Medium",
    status: "Pending",
    title: "Microsoft Copilot enterprise pilot (MTN Group)",
    description:
      "Leverage Microsoft-Copilot-enterprise relationship with MTN Group to introduce Organic VM AI agent concepts. Coordinate with MTN's AI strategy team to identify integration points with their pan-African AI cloud initiative.",
    owner: "ADAM SMASHER / Enterprise",
    deadline: "2025-03-01",
    relatedCompany: "Microsoft",
    dependencies: ["Microsoft partner relationship", "MTN contact introduction", "ROI model for telecom AI"],
  },
  {
    id: "action-008",
    priority: "Medium",
    status: "Completed",
    title: "Competitive intelligence dashboard — weekly update cadence",
    description:
      "Establish weekly competitive intelligence update for China AI ecosystem. Monitor: new model releases, pricing changes, partnership announcements, regulatory developments, and Africa-specific news.",
    owner: "ADAM SMASHER / Intelligence",
    deadline: "2025-01-05",
    relatedCompany: "All",
    dependencies: ["News aggregation pipeline", "Company monitoring list", "Alert thresholds"],
  },
  {
    id: "action-009",
    priority: "Critical",
    status: "Pending",
    title: "China-Africa AI Trade Corridor Strategy",
    description:
      "Develop comprehensive China-Africa AI trade corridor strategy. Map: Alibaba/MTN partnership implications, Tencent Cloud expansion, ByteDance TikTok Shop AI opportunity, MiniMax African language support, and Kimi trade document analysis. Present to executive team.",
    owner: "ADAM SMASHER / Strategy",
    deadline: "2025-02-15",
    relatedCompany: "Alibaba, Tencent, ByteDance",
    dependencies: ["Market research", "Partnership landscape", "Regulatory mapping", "Revenue model"],
  },
  {
    id: "action-010",
    priority: "High",
    status: "In Progress",
    title: "Baidu Qianfan African trade document OCR pilot",
    description:
      "Test Baidu Qianfan ERNIE document intelligence (OCR + parsing) on African customs forms, trade documents, and ID cards. Evaluate accuracy for: Kenyan CBK forms, Nigerian FIRS invoices, South African SARS customs declarations. Test in 5 African countries.",
    owner: "ADAM SMASHER / Trade AI",
    deadline: "2025-01-30",
    relatedCompany: "Baidu",
    dependencies: ["Qianfan API access", "African document dataset", "Accuracy evaluation framework"],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// EXECUTION FRAMEWORK COMPARISON TABLE
// ══════════════════════════════════════════════════════════════════════════════

interface FrameworkComparison {
  dimension: string;
  icon: string;
  china: Record<string, string>;
  global: Record<string, string>;
  organicVmFit: "Excellent" | "Good" | "Limited";
}

const FRAMEWORK_COMPARISON: FrameworkComparison[] = [
  {
    dimension: "API Accessibility",
    icon: "🌐",
    china: {
      "Tencent Hunyuan": "⭐⭐⭐⭐⭐ REST API + WeChat SDK, Cloud and On-Premise",
      "ByteDance Coze": "⭐⭐⭐⭐⭐ Bot SDK + REST, Multi-platform deployment",
      "MiniMax": "⭐⭐⭐⭐⭐ Developer-first API, Python/JS/Go SDKs",
      "Kimi/Moonshot": "⭐⭐⭐⭐⭐ Clean REST API, LangChain integration",
      "Zhipu AgentGLM": "⭐⭐⭐⭐⭐ Open-source + API, vLLM/Ollama/LangChain",
      "Baidu Qianfan": "⭐⭐⭐⭐ Enterprise SDK, LangChain, Baidu Cloud",
      "Alibaba Qwen": "⭐⭐⭐⭐⭐ Open weights + API, vLLM/Ollama, cloud SDK",
      DeepSeek: "⭐⭐⭐⭐⭐ Open weights + API, SGLang, vLLM, TensorRT-LLM",
    },
    global: {
      "Anthropic Claude": "⭐⭐⭐⭐⭐ Developer SDK, REST API, Anthropic API",
      "OpenAI GPT-4": "⭐⭐⭐⭐⭐ Assistants API, GPT Store, Agents SDK",
      "Microsoft Copilot": "⭐⭐⭐⭐⭐ Copilot Studio, Power FX, Azure AI Studio",
      "Google Gemini": "⭐⭐⭐⭐⭐ Vertex AI, REST API, Android SDK",
    },
    organicVmFit: "Excellent",
  },
  {
    dimension: "Cost Efficiency",
    icon: "💰",
    china: {
      "Tencent Hunyuan": "⭐⭐⭐ Enterprise pricing, WeChat integration adds value",
      "ByteDance Coze": "⭐⭐⭐⭐⭐ Free tier + $0.003/1K tokens, most affordable",
      MiniMax: "⭐⭐⭐⭐⭐ $0.01/1K tokens, best price-performance for text",
      "Kimi/Moonshot": "⭐⭐⭐⭐ $0.02/1K tokens, expensive for context length",
      "Zhipu AgentGLM": "⭐⭐⭐⭐⭐ Open-source (free self-hosting) + affordable API",
      "Baidu Qianfan": "⭐⭐⭐ ERNIE 4.0 ~$0.12/1K tokens, Lite is affordable",
      "Alibaba Qwen": "⭐⭐⭐⭐⭐ Qwen 2.5 open weights (free) + cheap API",
      DeepSeek: "⭐⭐⭐⭐⭐ $0.001/1K input, cheapest frontier-level model globally",
    },
    global: {
      "Anthropic Claude": "⭐⭐⭐ Opus $0.075/1K — expensive but highest quality",
      "OpenAI GPT-4": "⭐⭐⭐ GPT-4o $0.015/1K — mid-range pricing",
      "Microsoft Copilot": "⭐⭐ $30/seat/month — expensive enterprise licensing",
      "Google Gemini": "⭐⭐⭐⭐⭐ $0.00125/1K — best cost efficiency in class",
    },
    organicVmFit: "Excellent",
  },
  {
    dimension: "Multilingual (African Languages)",
    icon: "🗣️",
    china: {
      "Tencent Hunyuan": "⭐⭐⭐⭐ Chinese dominant, English good, limited African",
      "ByteDance Coze": "⭐⭐⭐⭐⭐ Multilingual bots, Swahili/Hausa/Yoruba support",
      MiniMax: "⭐⭐⭐⭐⭐ 60+ languages including major African languages",
      "Kimi/Moonshot": "⭐⭐⭐⭐ Chinese/English excellent, African growing",
      "Zhipu AgentGLM": "⭐⭐⭐ Chinese/English strong, limited African languages",
      "Baidu Qianfan": "⭐⭐⭐ Chinese dominant, limited multilingual",
      "Alibaba Qwen": "⭐⭐⭐⭐⭐ Multilingual with French/Arabic strong (Africa relevance)",
      DeepSeek: "⭐⭐⭐ English/Chinese strong, multilingual improving",
    },
    global: {
      "Anthropic Claude": "⭐⭐⭐⭐ English excellent, multilingual good, limited African",
      "OpenAI GPT-4": "⭐⭐⭐⭐ Multilingual, 100+ languages, African growing",
      "Microsoft Copilot": "⭐⭐⭐⭐⭐ 100+ languages via Azure AI, strong African support",
      "Google Gemini": "⭐⭐⭐⭐⭐ 130+ languages, best African language coverage",
    },
    organicVmFit: "Good",
  },
  {
    dimension: "Context Window",
    icon: "📏",
    china: {
      "Tencent Hunyuan": "⭐⭐⭐⭐ 256K tokens",
      "ByteDance Coze": "⭐⭐⭐ Doubao context varies by model (32K-128K)",
      MiniMax: "⭐⭐⭐ 128K tokens",
      "Kimi/Moonshot": "⭐⭐⭐⭐⭐ 1M tokens — industry leader",
      "Zhipu AgentGLM": "⭐⭐⭐⭐⭐ 1M tokens with AgentGLM 2.0",
      "Baidu Qianfan": "⭐⭐⭐ 128K tokens for ERNIE 4.0",
      "Alibaba Qwen": "⭐⭐⭐⭐⭐ 1M tokens for Qwen 2.5-Max",
      DeepSeek: "⭐⭐⭐⭐ 128K tokens for Coder V2, 64K for V3",
    },
    global: {
      "Anthropic Claude": "⭐⭐⭐⭐⭐ 200K tokens (Opus)",
      "OpenAI GPT-4": "⭐⭐⭐⭐ 128K tokens (o1: 1M for reasoning)",
      "Microsoft Copilot": "⭐⭐⭐⭐⭐ Inherits OpenAI context via Azure OpenAI",
      "Google Gemini": "⭐⭐⭐⭐⭐ 1M tokens (Gemini 1.5 Pro/Ultra)",
    },
    organicVmFit: "Excellent",
  },
  {
    dimension: "Africa Cloud Infrastructure",
    icon: "☁️",
    china: {
      "Tencent Hunyuan": "⭐⭐⭐⭐⭐ Johannesburg, Lagos, Cairo nodes",
      "ByteDance Coze": "⭐⭐⭐ Cloud-based, no Africa-specific infra but TikTok CDNs",
      MiniMax: "⭐⭐ API-based, no Africa infra, fast global API",
      "Kimi/Moonshot": "⭐⭐ API-based, depends on Alibaba Cloud",
      "Zhipu AgentGLM": "⭐ Self-hosting required, no Africa cloud",
      "Baidu Qianfan": "⭐⭐⭐⭐ Baidu Cloud has limited Africa presence",
      "Alibaba Qwen": "⭐⭐⭐⭐⭐ Alibaba Cloud: 15+ African nodes",
      DeepSeek: "⭐ Self-hosting required, no proprietary cloud",
    },
    global: {
      "Anthropic Claude": "⭐⭐ No Africa-specific nodes, relies on US/EU",
      "OpenAI GPT-4": "⭐⭐ No Africa nodes, API accessible but high latency",
      "Microsoft Copilot": "⭐⭐⭐⭐⭐ Azure: Johannesburg, Cape Town nodes",
      "Google Gemini": "⭐⭐⭐⭐ Google Cloud: South Africa, Kenya nodes",
    },
    organicVmFit: "Good",
  },
  {
    dimension: "Agent Autonomy / Tool Use",
    icon: "🔧",
    china: {
      "Tencent Hunyuan": "⭐⭐⭐⭐ Enterprise agent platform, WeChat tool access",
      "ByteDance Coze": "⭐⭐⭐⭐⭐ Bot builder with 50+ built-in tools",
      MiniMax: "⭐⭐⭐⭐ API-based tool calling, Hailuo video tool",
      "Kimi/Moonshot": "⭐⭐⭐⭐ Web search, code execution, function calling",
      "Zhipu AgentGLM": "⭐⭐⭐⭐⭐ Open agent framework, full tool use, multi-agent",
      "Baidu Qianfan": "⭐⭐⭐⭐ Enterprise agent platform, cloud tool integration",
      "Alibaba Qwen": "⭐⭐⭐⭐⭐ Qwen-Agent SDK, e-commerce tool integration",
      DeepSeek: "⭐⭐⭐⭐ Code execution, web search, tool use via API",
    },
    global: {
      "Anthropic Claude": "⭐⭐⭐⭐⭐ Claude Code autonomous agent, tool use excellent",
      "OpenAI GPT-4": "⭐⭐⭐⭐⭐ Assistants API with function calling, code interpreter",
      "Microsoft Copilot": "⭐⭐⭐⭐⭐ Native Office/Azure tool integration",
      "Google Gemini": "⭐⭐⭐⭐⭐ Native tool use, code execution, Search grounding",
    },
    organicVmFit: "Excellent",
  },
  {
    dimension: "Enterprise Readiness",
    icon: "🏢",
    china: {
      "Tencent Hunyuan": "⭐⭐⭐⭐⭐ SOC 2 equivalent, mature enterprise support",
      "ByteDance Coze": "⭐⭐⭐⭐ Growing enterprise tier, startup-friendly",
      MiniMax: "⭐⭐⭐ Startup-focused, limited enterprise case studies",
      "Kimi/Moonshot": "⭐⭐⭐ Young company, limited enterprise deployments",
      "Zhipu AgentGLM": "⭐⭐⭐⭐⭐ Open-source flexibility, enterprise self-hosting",
      "Baidu Qianfan": "⭐⭐⭐⭐⭐ Mature enterprise platform, government contracts",
      "Alibaba Qwen": "⭐⭐⭐⭐⭐ Alibaba enterprise ecosystem integration",
      DeepSeek: "⭐⭐⭐ Open-source focused, limited enterprise support",
    },
    global: {
      "Anthropic Claude": "⭐⭐⭐⭐⭐ SOC 2 Type II, HIPAA, enterprise security",
      "OpenAI GPT-4": "⭐⭐⭐⭐⭐ Enterprise SLA, Azure integration, GDPR compliant",
      "Microsoft Copilot": "⭐⭐⭐⭐⭐ Enterprise-grade security, compliance, support",
      "Google Gemini": "⭐⭐⭐⭐⭐ Vertex AI enterprise, SOC 2, GDPR compliant",
    },
    organicVmFit: "Good",
  },
  {
    dimension: "Open Source / Self-Hosting",
    icon: "🔓",
    china: {
      "Tencent Hunyuan": "⭐ No open-source models",
      "ByteDance Coze": "⭐ No open-source models",
      MiniMax: "⭐ Limited open-source, proprietary models",
      "Kimi/Moonshot": "⭐ No open-source models",
      "Zhipu AgentGLM": "⭐⭐⭐⭐⭐ Fully open-source (Apache 2.0), full self-hosting",
      "Baidu Qianfan": "⭐ No open-source models",
      "Alibaba Qwen": "⭐⭐⭐⭐⭐ Qwen 2.5 open weights (Apache 2.0)",
      DeepSeek: "⭐⭐⭐⭐⭐ DeepSeek V3/Coder open weights (MIT license)",
    },
    global: {
      "Anthropic Claude": "⭐ No open-source",
      "OpenAI GPT-4": "⭐ No open-source (limited o1 access)",
      "Microsoft Copilot": "⭐ No open-source (Phi-3 is open)",
      "Google Gemini": "⭐⭐ Gemini Nano (on-device), limited open weights",
    },
    organicVmFit: "Excellent",
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

const StatusBadge: React.FC<{ status: ActionItem["status"] }> = ({ status }) => {
  const configs: Record<ActionItem["status"], { bg: string; color: string; label: string }> = {
    Pending: { bg: "#rgba(255, 207, 74, 0.15)", color: "#ffcf4a", label: "PENDING" },
    "In Progress": { bg: "rgba(255, 46, 196, 0.15)", color: "#ff2ec4", label: "IN PROGRESS" },
    Completed: { bg: "rgba(57, 255, 170, 0.15)", color: "#5bf4a6", label: "COMPLETED" },
    Blocked: { bg: "rgba(196, 18, 48, 0.15)", color: "#c41230", label: "BLOCKED" },
  };
  const config = configs[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "3px 8px",
        borderRadius: "4px",
        background: config.bg,
        color: config.color,
        fontSize: "9px",
        fontFamily: "'DM Sans', monospace",
        fontWeight: 700,
        letterSpacing: "0.5px",
        border: `1px solid ${config.color}40`,
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: config.color,
        }}
      />
      {config.label}
    </span>
  );
};

const PriorityBadge: React.FC<{ priority: ActionItem["priority"] | IntelItem["relevance"] }> = ({
  priority,
}) => {
  const configs: Record<string, { bg: string; color: string }> = {
    Critical: { bg: "rgba(196, 18, 48, 0.2)", color: "#ff4444" },
    High: { bg: "rgba(255, 46, 196, 0.2)", color: "#ff2ec4" },
    Medium: { bg: "rgba(255, 207, 74, 0.2)", color: "#ffcf4a" },
    Low: { bg: "rgba(57, 255, 170, 0.2)", color: "#5bf4a6" },
  };
  const config = configs[priority] || configs.Medium;
  return (
    <span
      style={{
        padding: "2px 6px",
        borderRadius: "3px",
        background: config.bg,
        color: config.color,
        fontSize: "8px",
        fontFamily: "'DM Sans', monospace",
        fontWeight: 700,
        letterSpacing: "0.5px",
      }}
    >
      {priority.toUpperCase()}
    </span>
  );
};

const ThreatLevelBadge: React.FC<{ level: AgentData["threatLevel"] }> = ({ level }) => {
  const configs: Record<AgentData["threatLevel"], { bg: string; color: string; border: string }> = {
    Critical: { bg: "rgba(196, 18, 48, 0.15)", color: "#ff4444", border: "#ff4444" },
    High: { bg: "rgba(255, 46, 196, 0.15)", color: "#ff2ec4", border: "#ff2ec4" },
    Medium: { bg: "rgba(255, 207, 74, 0.15)", color: "#ffcf4a", border: "#ffcf4a" },
    Low: { bg: "rgba(57, 255, 170, 0.15)", color: "#5bf4a6", border: "#5bf4a6" },
  };
  const config = configs[level];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "3px 8px",
        borderRadius: "4px",
        background: config.bg,
        color: config.color,
        border: `1px solid ${config.border}40`,
        fontSize: "9px",
        fontFamily: "'DM Sans', monospace",
        fontWeight: 700,
        letterSpacing: "0.5px",
      }}
    >
      <Signal size={8} />
      {level.toUpperCase()}
    </span>
  );
};

const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  glow?: string;
  onClick?: () => void;
}> = ({ children, style, glow, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: "rgba(10, 14, 17, 0.72)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(57, 255, 170, 0.18)",
      borderRadius: "12px",
      padding: "20px",
      ...(glow ? { boxShadow: `0 0 20px ${glow}20, inset 0 0 20px ${glow}08` } : {}),
      cursor: onClick ? "pointer" : "default",
      transition: "all 0.2s ease",
      ...style,
    }}
  >
    {children}
  </div>
);

const SectionHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  count?: number;
}> = ({ icon, title, subtitle, count }) => (
  <div style={{ marginBottom: "24px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
      <span style={{ color: "#ff2ec4", fontSize: "20px" }}>{icon}</span>
      <h2
        style={{
          margin: 0,
          fontSize: "18px",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          color: "#ff2ec4",
          letterSpacing: "1px",
        }}
      >
        {title}
      </h2>
      {count !== undefined && (
        <span
          style={{
            background: "rgba(255, 46, 196, 0.15)",
            color: "#ff2ec4",
            padding: "2px 8px",
            borderRadius: "10px",
            fontSize: "11px",
            fontFamily: "'DM Sans', monospace",
            fontWeight: 700,
          }}
        >
          {count}
        </span>
      )}
    </div>
    {subtitle && (
      <p
        style={{
          margin: 0,
          marginLeft: "32px",
          fontSize: "12px",
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(91, 244, 166, 0.6)",
          fontStyle: "italic",
        }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// AGENT CARD COMPONENT
// ══════════════════════════════════════════════════════════════════════════════

const AgentCard: React.FC<{
  agent: AgentData;
  isExpanded: boolean;
  onToggle: () => void;
  onDeepDive: () => void;
}> = ({ agent, isExpanded, onToggle, onDeepDive }) => {
  const statusColors: Record<AgentData["status"], string> = {
    "Active Partner": "#5bf4a6",
    Partner: "#ff2ec4",
    Research: "#ffcf4a",
    Watch: "#8a6bff",
  };

  return (
    <div
      style={{
        background: "rgba(10, 14, 17, 0.88)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${statusColors[agent.status]}30`,
        borderRadius: "14px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: isExpanded
          ? `0 0 30px ${statusColors[agent.status]}25, 0 8px 32px rgba(0,0,0,0.4)`
          : "0 4px 16px rgba(0,0,0,0.3)",
        cursor: "pointer",
      }}
      onClick={onToggle}
    >
      {/* Card Header */}
      <div
        style={{
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderBottom: isExpanded ? "1px solid rgba(57,255,170,0.12)" : "none",
          background: isExpanded ? "rgba(255, 46, 196, 0.04)" : "transparent",
        }}
      >
        <span style={{ fontSize: "28px", lineHeight: 1 }}>{agent.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <h3
              style={{
                margin: 0,
                fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                color: "#ffffff",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {agent.product}
            </h3>
            <ThreatLevelBadge level={agent.threatLevel} />
          </div>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: "10px",
              fontFamily: "'DM Sans', sans-serif",
              color: statusColors[agent.status],
              opacity: 0.9,
            }}
          >
            {agent.company} · {agent.type}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <span
            style={{
              fontSize: "9px",
              fontFamily: "'DM Sans', monospace",
              fontWeight: 700,
              color: statusColors[agent.status],
              background: `${statusColors[agent.status]}18`,
              padding: "3px 8px",
              borderRadius: "4px",
              border: `1px solid ${statusColors[agent.status]}30`,
              letterSpacing: "0.5px",
            }}
          >
            {agent.status.toUpperCase()}
          </span>
          <ChevronRight
            size={14}
            color="#5bf4a6"
            style={{
              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
              flexShrink: 0,
            }}
          />
        </div>
      </div>

      {/* Collapsed Preview */}
      {!isExpanded && (
        <div style={{ padding: "12px 18px 16px" }}>
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(91, 244, 166, 0.7)",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {agent.highlight}
          </p>
          <div style={{ display: "flex", gap: "6px", marginTop: "10px", flexWrap: "wrap" }}>
            {agent.keyModels.slice(0, 2).map((model) => (
              <span
                key={model}
                style={{
                  fontSize: "9px",
                  fontFamily: "'DM Sans', monospace",
                  background: "rgba(57,255,170,0.08)",
                  color: "#5bf4a6",
                  padding: "2px 6px",
                  borderRadius: "3px",
                  border: "1px solid rgba(57,255,170,0.15)",
                }}
              >
                {model}
              </span>
            ))}
            {agent.stars && agent.stars !== "N/A (enterprise)" && agent.stars !== "N/A (private)" && agent.stars !== "N/A (API product)" && agent.stars !== "N/A" && agent.stars !== "N/A (closed source + open weights via limited releases)" && agent.stars !== "N/A (enterprise)" && agent.stars !== "N/A" && (
              <span
                style={{
                  fontSize: "9px",
                  fontFamily: "'DM Sans', monospace",
                  background: "rgba(255, 207, 74, 0.1)",
                  color: "#D97706",
                  padding: "2px 6px",
                  borderRadius: "3px",
                  border: "1px solid rgba(217, 119, 6, 0.2)",
                }}
              >
                ⭐ {agent.stars}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{ padding: "16px 18px 18px" }}>
          {/* Quick Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
              marginBottom: "14px",
            }}
          >
            {[
              { label: "FOUNDED", value: agent.Founded },
              { label: "FUNDING", value: agent.funding.includes("$") ? "VC Backed" : "Public" },
              { label: "LANGUAGES", value: agent.lang.split("/")[0].trim() },
              { label: "REGION", value: agent.region },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "rgba(57,255,170,0.05)",
                  borderRadius: "6px",
                  padding: "8px 6px",
                  textAlign: "center",
                  border: "1px solid rgba(57,255,170,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    fontFamily: "'DM Sans', monospace",
                    color: "rgba(91,244,166,0.5)",
                    letterSpacing: "0.5px",
                    marginBottom: "2px",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Key Models */}
          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                fontSize: "9px",
                fontFamily: "'DM Sans', monospace",
                color: "#ff2ec4",
                letterSpacing: "0.5px",
                marginBottom: "6px",
                textTransform: "uppercase",
              }}
            >
              Key Models
            </div>
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {agent.keyModels.map((model) => (
                <span
                  key={model}
                  style={{
                    fontSize: "9px",
                    fontFamily: "'DM Sans', monospace",
                    background: "rgba(255, 46, 196, 0.1)",
                    color: "#ff2ec4",
                    padding: "3px 7px",
                    borderRadius: "4px",
                    border: "1px solid rgba(255, 46, 196, 0.2)",
                  }}
                >
                  {model}
                </span>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                fontSize: "9px",
                fontFamily: "'DM Sans', monospace",
                color: "#D97706",
                letterSpacing: "0.5px",
                marginBottom: "6px",
                textTransform: "uppercase",
              }}
            >
              Use Cases for Organic VM
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {agent.useCases.map((useCase, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "11px",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(91,244,166,0.8)",
                  }}
                >
                  <Zap size={8} color="#D97706" />
                  <span>{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Competitive Edge */}
          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                fontSize: "9px",
                fontFamily: "'DM Sans', monospace",
                color: "#5bf4a6",
                letterSpacing: "0.5px",
                marginBottom: "6px",
                textTransform: "uppercase",
              }}
            >
              Competitive Edge
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(91,244,166,0.75)",
                lineHeight: 1.6,
              }}
            >
              {agent.competitiveEdge}
            </p>
          </div>

          {/* Advantages */}
          <div
            style={{
              background: "rgba(217, 119, 6, 0.08)",
              border: "1px solid rgba(217, 119, 6, 0.2)",
              borderRadius: "8px",
              padding: "10px 12px",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                fontFamily: "'DM Sans', monospace",
                color: "#D97706",
                letterSpacing: "0.5px",
                marginBottom: "5px",
                textTransform: "uppercase",
              }}
            >
              🏆 Strategic Advantage for Organic VM
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                fontFamily: "'DM Sans', sans-serif",
                color: "#D97706",
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              {agent.advantage}
            </p>
          </div>

          {/* Deep Dive Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeepDive();
            }}
            style={{
              width: "100%",
              padding: "10px",
              background: "rgba(255, 46, 196, 0.1)",
              border: "1px solid rgba(255, 46, 196, 0.3)",
              borderRadius: "8px",
              color: "#ff2ec4",
              fontSize: "11px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              transition: "all 0.2s ease",
              letterSpacing: "0.5px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255, 46, 196, 0.2)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(255, 46, 196, 0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255, 46, 196, 0.1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <BookOpen size={12} />
            ACCESS DEEP INTELLIGENCE BRIEF
            <ChevronRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// DEEP DIVE MODAL
// ══════════════════════════════════════════════════════════════════════════════

const DeepDiveModal: React.FC<{
  agent: AgentData | null;
  onClose: () => void;
}> = ({ agent, onClose }) => {
  if (!agent) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "rgba(10, 14, 17, 0.96)",
          border: "1px solid rgba(255, 46, 196, 0.3)",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "800px",
          maxHeight: "85vh",
          overflow: "auto",
          boxShadow: "0 0 60px rgba(255, 46, 196, 0.15), 0 20px 60px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "24px 28px",
            borderBottom: "1px solid rgba(57,255,170,0.12)",
            position: "sticky",
            top: 0,
            background: "rgba(10, 14, 17, 0.98)",
            backdropFilter: "blur(10px)",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span style={{ fontSize: "36px" }}>{agent.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                {agent.product}
              </h2>
              <ThreatLevelBadge level={agent.threatLevel} />
            </div>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "12px",
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(91,244,166,0.6)",
              }}
            >
              {agent.company} · {agent.type} · {agent.region}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(57,255,170,0.1)",
              border: "1px solid rgba(57,255,170,0.2)",
              borderRadius: "8px",
              color: "#5bf4a6",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "28px" }}>
          {/* Deep Dive Analysis */}
          <div style={{ marginBottom: "28px" }}>
            <div
              style={{
                fontSize: "11px",
                fontFamily: "'DM Sans', monospace",
                color: "#ff2ec4",
                letterSpacing: "1px",
                marginBottom: "12px",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Eye size={12} color="#ff2ec4" />
              Deep Intelligence Brief
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(91,244,166,0.85)",
                lineHeight: 1.8,
              }}
            >
              {agent.deepDive}
            </p>
          </div>

          {/* Recent News */}
          <div style={{ marginBottom: "28px" }}>
            <div
              style={{
                fontSize: "11px",
                fontFamily: "'DM Sans', monospace",
                color: "#D97706",
                letterSpacing: "1px",
                marginBottom: "12px",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Radio size={12} color="#D97706" />
              Recent Intelligence
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(217,119,6,0.8)",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              {agent.recentNews}
            </p>
          </div>

          {/* Two Column: Risks & Opportunities */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
            <div
              style={{
                background: "rgba(196, 18, 48, 0.06)",
                border: "1px solid rgba(196, 18, 48, 0.2)",
                borderRadius: "10px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontFamily: "'DM Sans', monospace",
                  color: "#ff4444",
                  letterSpacing: "0.5px",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <AlertTriangle size={10} color="#ff4444" />
                Risk Factors
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: "0 0 0 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {agent.risks.map((risk, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "11px",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(255, 68, 68, 0.85)",
                      lineHeight: 1.5,
                    }}
                  >
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                background: "rgba(57, 255, 170, 0.05)",
                border: "1px solid rgba(57, 255, 170, 0.15)",
                borderRadius: "10px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontFamily: "'DM Sans', monospace",
                  color: "#5bf4a6",
                  letterSpacing: "0.5px",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <CheckCircle size={10} color="#5bf4a6" />
                Opportunity Areas
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: "0 0 0 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {agent.opportunities.map((opp, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "11px",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(91, 244, 166, 0.85)",
                      lineHeight: 1.5,
                    }}
                  >
                    {opp}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing Info */}
          <div
            style={{
              background: "rgba(217, 119, 6, 0.06)",
              border: "1px solid rgba(217, 119, 6, 0.15)",
              borderRadius: "10px",
              padding: "14px 16px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                fontFamily: "'DM Sans', monospace",
                color: "#D97706",
                letterSpacing: "0.5px",
                marginBottom: "6px",
                textTransform: "uppercase",
              }}
            >
              💰 Pricing Model
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(217,119,6,0.8)",
              }}
            >
              {agent.pricing}
            </p>
          </div>

          {/* External Link */}
          <a
            href={`https://${agent.url}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "12px",
              background: "rgba(255, 46, 196, 0.1)",
              border: "1px solid rgba(255, 46, 196, 0.3)",
              borderRadius: "8px",
              color: "#ff2ec4",
              fontSize: "12px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.2s ease",
              letterSpacing: "0.5px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255, 46, 196, 0.2)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(255, 46, 196, 0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255, 46, 196, 0.1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <ExternalLink size={14} />
            ACCESS {agent.url.toUpperCase()}
          </a>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// COMPARISON TABLE COMPONENT
// ══════════════════════════════════════════════════════════════════════════════

const ComparisonTable: React.FC = () => {
  const [selectedDimension, setSelectedDimension] = useState(0);

  return (
    <div>
      {/* Dimension Selector */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {FRAMEWORK_COMPARISON.map((framework, idx) => (
          <button
            key={framework.dimension}
            onClick={() => setSelectedDimension(idx)}
            style={{
              padding: "6px 12px",
              background:
                selectedDimension === idx
                  ? "rgba(255, 46, 196, 0.15)"
                  : "rgba(10, 14, 17, 0.6)",
              border: `1px solid ${
                selectedDimension === idx
                  ? "rgba(255, 46, 196, 0.4)"
                  : "rgba(57, 255, 170, 0.12)"
              }`,
              borderRadius: "6px",
              color:
                selectedDimension === idx ? "#ff2ec4" : "rgba(91, 244, 166, 0.6)",
              fontSize: "10px",
              fontFamily: "'DM Sans', monospace",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>{framework.icon}</span>
            {framework.dimension}
          </button>
        ))}
      </div>

      {/* Selected Dimension Table */}
      {FRAMEWORK_COMPARISON.map((framework, fIdx) =>
        fIdx === selectedDimension ? (
          <div key={framework.dimension}>
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: selectedDimension === 0 ? "180px 1fr" : "180px 1fr 1fr",
                gap: "8px",
                marginBottom: "8px",
                padding: "0 8px",
              }}
            >
              <div
                style={{
                  fontSize: "9px",
                  fontFamily: "'DM Sans', monospace",
                  color: "rgba(91,244,166,0.5)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Company / Product
              </div>
              <div
                style={{
                  fontSize: "9px",
                  fontFamily: "'DM Sans', monospace",
                  color: "#ff2ec4",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                🇨🇳 China AI Ecosystem
              </div>
              {selectedDimension !== 0 && (
                <div
                  style={{
                    fontSize: "9px",
                    fontFamily: "'DM Sans', monospace",
                    color: "#D97706",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  🌍 Global AI Leaders
                </div>
              )}
            </div>

            {/* China Rows */}
            {Object.entries(framework.china).map(([company, value]) => (
              <div
                key={company}
                style={{
                  display: "grid",
                  gridTemplateColumns: selectedDimension === 0 ? "180px 1fr" : "180px 1fr 1fr",
                  gap: "8px",
                  padding: "10px 8px",
                  borderBottom: "1px solid rgba(57,255,170,0.06)",
                  alignItems: "start",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    color: "#ffffff",
                  }}
                >
                  {company}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(91,244,166,0.75)",
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {value}
                </div>
              </div>
            ))}

            {/* Global Rows */}
            {selectedDimension !== 0 &&
              Object.entries(framework.global).map(([company, value]) => (
                <div
                  key={company}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "180px 1fr 1fr",
                    gap: "8px",
                    padding: "10px 8px",
                    borderBottom: "1px solid rgba(217,119,6,0.06)",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      color: "rgba(217,119,6,0.8)",
                    }}
                  >
                    {company}
                  </div>
                  <div />
                  <div
                    style={{
                      fontSize: "10px",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(217,119,6,0.7)",
                      lineHeight: 1.5,
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}

            {/* Organic VM Fit */}
            <div
              style={{
                marginTop: "16px",
                padding: "12px 16px",
                background: "rgba(91, 244, 166, 0.06)",
                border: "1px solid rgba(91, 244, 166, 0.2)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontFamily: "'DM Sans', monospace",
                  color: "rgba(91,244,166,0.5)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Organic VM Fit:
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  color:
                    framework.organicVmFit === "Excellent"
                      ? "#5bf4a6"
                      : framework.organicVmFit === "Good"
                      ? "#D97706"
                      : "#ffcf4a",
                }}
              >
                {framework.organicVmFit}
              </span>
              <div style={{ flex: 1 }} />
              <span
                style={{
                  fontSize: "10px",
                  fontFamily: "'DM Sans', monospace",
                  color: "rgba(91,244,166,0.4)",
                }}
              >
                Monitoring Priority: {selectedDimension + 1}/{FRAMEWORK_COMPARISON.length}
              </span>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// INTEL FEED COMPONENT
// ══════════════════════════════════════════════════════════════════════════════

const IntelFeed: React.FC<{ items: IntelItem[]; maxItems?: number }> = ({
  items,
  maxItems,
}) => {
  const [filter, setFilter] = useState<IntelItem["category"] | "All">("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems = items
    .filter((item) => filter === "All" || item.category === filter)
    .slice(0, maxItems);

  const categoryColors: Record<IntelItem["category"], string> = {
    Policy: "#ff2ec4",
    Product: "#5bf4a6",
    Investment: "#D97706",
    Research: "#8a6bff",
    Market: "#ffcf4a",
    Partnership: "#39ffaa",
  };

  return (
    <div>
      {/* Filter Bar */}
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "16px" }}>
        {(["All", "Policy", "Product", "Investment", "Research", "Market", "Partnership"] as const).map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: "4px 10px",
                background:
                  filter === cat
                    ? `${categoryColors[cat as IntelItem["category"]] || "rgba(91,244,166,0.1)"}20`
                    : "rgba(10,14,17,0.5)",
                border: `1px solid ${
                  filter === cat
                    ? `${categoryColors[cat as IntelItem["category"]] || "rgba(57,255,170,0.2)"}40`
                    : "rgba(57,255,170,0.1)"
                }`,
                borderRadius: "5px",
                color:
                  filter === cat
                    ? categoryColors[cat as IntelItem["category"]] || "#5bf4a6"
                    : "rgba(91,244,166,0.5)",
                fontSize: "9px",
                fontFamily: "'DM Sans', monospace",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.3px",
              }}
            >
              {cat === "All" ? "📡 ALL" : `${cat.toUpperCase()}`}
            </button>
          )
        )}
      </div>

      {/* Intel Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            style={{
              background: "rgba(10,14,17,0.8)",
              border: `1px solid ${
                expandedId === item.id
                  ? `${categoryColors[item.category]}40`
                  : "rgba(57,255,170,0.1)"
              }`,
              borderRadius: "8px",
              overflow: "hidden",
              transition: "all 0.2s ease",
              boxShadow:
                expandedId === item.id
                  ? `0 0 15px ${categoryColors[item.category]}15`
                  : "none",
            }}
          >
            {/* Item Header */}
            <div
              style={{
                padding: "12px 14px",
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                cursor: "pointer",
              }}
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: categoryColors[item.category],
                  marginTop: "4px",
                  flexShrink: 0,
                  boxShadow: `0 0 6px ${categoryColors[item.category]}`,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "3px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "8px",
                      fontFamily: "'DM Sans', monospace",
                      fontWeight: 700,
                      color: categoryColors[item.category],
                      background: `${categoryColors[item.category]}15`,
                      padding: "2px 6px",
                      borderRadius: "3px",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {item.category.toUpperCase()}
                  </span>
                  <span
                    style={{
                      fontSize: "9px",
                      fontFamily: "'DM Sans', monospace",
                      color: "rgba(91,244,166,0.4)",
                    }}
                  >
                    {item.date}
                  </span>
                  <PriorityBadge priority={item.relevance} />
                </div>
                <h4
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </h4>
              </div>
              <ChevronRight
                size={12}
                color="rgba(91,244,166,0.4)"
                style={{
                  transform: expandedId === item.id ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
            </div>

            {/* Expanded Content */}
            {expandedId === item.id && (
              <div
                style={{
                  padding: "0 14px 14px",
                  borderTop: "1px solid rgba(57,255,170,0.06)",
                  marginTop: "0",
                  paddingTop: "12px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 10px",
                    fontSize: "11px",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(91,244,166,0.7)",
                    lineHeight: 1.7,
                  }}
                >
                  {item.summary}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      fontFamily: "'DM Sans', monospace",
                      color: "rgba(91,244,166,0.4)",
                    }}
                  >
                    📰 {item.source}
                  </span>
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                    {item.companies.map((company) => (
                      <span
                        key={company}
                        style={{
                          fontSize: "9px",
                          fontFamily: "'DM Sans', monospace",
                          background: "rgba(255, 46, 196, 0.08)",
                          color: "rgba(255, 46, 196, 0.7)",
                          padding: "2px 6px",
                          borderRadius: "3px",
                          border: "1px solid rgba(255, 46, 196, 0.15)",
                        }}
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// ACTION ITEMS COMPONENT
// ══════════════════════════════════════════════════════════════════════════════

const ActionItemsPanel: React.FC = () => {
  const [filter, setFilter] = useState<ActionItem["status"] | "All">("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems = ACTION_ITEMS.filter(
    (item) => filter === "All" || item.status === filter
  );

  const priorityOrder = { Critical: 0, High: 1, Medium: 2 };

  return (
    <div>
      {/* Stats Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        {[
          { label: "TOTAL", value: ACTION_ITEMS.length, color: "#ffffff" },
          {
            label: "IN PROGRESS",
            value: ACTION_ITEMS.filter((i) => i.status === "In Progress").length,
            color: "#ff2ec4",
          },
          {
            label: "PENDING",
            value: ACTION_ITEMS.filter((i) => i.status === "Pending").length,
            color: "#ffcf4a",
          },
          {
            label: "COMPLETED",
            value: ACTION_ITEMS.filter((i) => i.status === "Completed").length,
            color: "#5bf4a6",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "rgba(10,14,17,0.6)",
              border: "1px solid rgba(57,255,170,0.1)",
              borderRadius: "8px",
              padding: "12px 8px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 800,
                color: stat.color,
                lineHeight: 1,
                marginBottom: "4px",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: "8px",
                fontFamily: "'DM Sans', monospace",
                color: "rgba(91,244,166,0.4)",
                letterSpacing: "0.5px",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "14px" }}>
        {(["All", "In Progress", "Pending", "Completed", "Blocked"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: "4px 10px",
              background:
                filter === status ? "rgba(255, 46, 196, 0.12)" : "rgba(10,14,17,0.5)",
              border: `1px solid ${
                filter === status ? "rgba(255, 46, 196, 0.3)" : "rgba(57,255,170,0.1)"
              }`,
              borderRadius: "5px",
              color: filter === status ? "#ff2ec4" : "rgba(91,244,166,0.5)",
              fontSize: "9px",
              fontFamily: "'DM Sans', monospace",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {status === "All" ? `ALL (${ACTION_ITEMS.length})` : `${status} (${ACTION_ITEMS.filter((i) => i.status === status).length})`}
          </button>
        ))}
      </div>

      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {[...filteredItems]
          .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
          .map((item) => (
            <div
              key={item.id}
              style={{
                background: "rgba(10,14,17,0.8)",
                border: "1px solid rgba(57,255,170,0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background:
                      item.priority === "Critical"
                        ? "#ff4444"
                        : item.priority === "High"
                        ? "#ff2ec4"
                        : "#ffcf4a",
                    marginTop: "5px",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "3px",
                      flexWrap: "wrap",
                    }}
                  >
                    <PriorityBadge priority={item.priority} />
                    <StatusBadge status={item.status} />
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "'DM Sans', monospace",
                        color: "rgba(91,244,166,0.4)",
                      }}
                    >
                      📅 {item.deadline}
                    </span>
                  </div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      color: "#ffffff",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </h4>
                </div>
                <ChevronRight
                  size={12}
                  color="rgba(91,244,166,0.4)"
                  style={{
                    transform: expandedId === item.id ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
              </div>

              {expandedId === item.id && (
                <div
                  style={{
                    padding: "0 14px 14px",
                    borderTop: "1px solid rgba(57,255,170,0.06)",
                    paddingTop: "12px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: "11px",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(91,244,166,0.7)",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexWrap: "wrap",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "'DM Sans', monospace",
                        color: "rgba(91,244,166,0.4)",
                      }}
                    >
                      👤 {item.owner}
                    </span>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "'DM Sans', monospace",
                        background: "rgba(255, 46, 196, 0.08)",
                        color: "rgba(255, 46, 196, 0.7)",
                        padding: "2px 6px",
                        borderRadius: "3px",
                        border: "1px solid rgba(255, 46, 196, 0.15)",
                      }}
                    >
                      🏢 {item.relatedCompany}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "9px",
                        fontFamily: "'DM Sans', monospace",
                        color: "rgba(91,244,166,0.4)",
                        marginBottom: "5px",
                        textTransform: "uppercase",
                        letterSpacing: "0.3px",
                      }}
                    >
                      🔗 Dependencies
                    </div>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {item.dependencies.map((dep) => (
                        <span
                          key={dep}
                          style={{
                            fontSize: "9px",
                            fontFamily: "'DM Sans', monospace",
                            background: "rgba(217, 119, 6, 0.08)",
                            color: "rgba(217,119,6,0.7)",
                            padding: "2px 6px",
                            borderRadius: "3px",
                            border: "1px solid rgba(217,119,6,0.15)",
                          }}
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ══════════════════════════════════════════════════════════════════════════════

export default function ResearchHubPage() {
  const [activeTab, setActiveTab] = useState<
    | "china"
    | "global"
    | "comparison"
    | "intel"
    | "actions"
    | "dashboard"
  >("dashboard");
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [expandedChinaCards, setExpandedChinaCards] = useState<Set<string>>(new Set());
  const [expandedGlobalCards, setExpandedGlobalCards] = useState<Set<string>>(new Set());
  const [chinaSearch, setChinaSearch] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scanlines, setScanlines] = useState(true);

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Toggle card expansion
  const toggleChinaCard = (id: string) => {
    setExpandedChinaCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleGlobalCard = (id: string) => {
    setExpandedGlobalCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Refresh handler
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  }, []);

  // Filter agents
  const filteredChinaAgents = CHINA_AGENTS.filter(
    (agent) =>
      agent.product.toLowerCase().includes(chinaSearch.toLowerCase()) ||
      agent.company.toLowerCase().includes(chinaSearch.toLowerCase()) ||
      agent.type.toLowerCase().includes(chinaSearch.toLowerCase())
  );

  const filteredGlobalAgents = GLOBAL_AGENTS.filter(
    (agent) =>
      agent.product.toLowerCase().includes(globalSearch.toLowerCase()) ||
      agent.company.toLowerCase().includes(globalSearch.toLowerCase()) ||
      agent.type.toLowerCase().includes(globalSearch.toLowerCase())
  );

  // Count stats
  const totalChinaAgents = CHINA_AGENTS.length;
  const criticalThreats = [...CHINA_AGENTS, ...GLOBAL_AGENTS].filter(
    (a) => a.threatLevel === "Critical"
  ).length;
  const activePartners = CHINA_AGENTS.filter((a) => a.status === "Active Partner").length;
  const openSourceCount = CHINA_AGENTS.filter(
    (a) => a.keyModels.some((m) => m.includes("GLM") || m.includes("Qwen 2") || m.includes("DeepSeek"))
  ).length;

  const tabs = [
    { id: "dashboard", label: "DASHBOARD", icon: "📊" },
    { id: "china", label: "🇨🇳 CHINA AI", icon: "🐉", count: totalChinaAgents },
    { id: "global", label: "🌍 GLOBAL AI", icon: "🌐", count: GLOBAL_AGENTS.length },
    { id: "comparison", label: "COMPARISON", icon: "📋" },
    { id: "intel", label: "INTELLIGENCE", icon: "🕵️", count: WEEKLY_INTEL.length },
    { id: "actions", label: "ACTION ITEMS", icon: "🎯", count: ACTION_ITEMS.length },
  ] as const;

  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; background: #0F172A; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: rgba(10,14,17,0.5); }
        ::-webkit-scrollbar-thumb { background: rgba(255,46,196,0.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,46,196,0.5); }
      `}</style>

      {/* Matrix Rain Background */}
      <MatrixRainCanvas opacity={0.06} />

      {/* Scanline Overlay */}
      {scanlines && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}

      {/* Main Container */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          background: "transparent",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* TOP BAR */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "rgba(7, 10, 12, 0.92)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(57, 255, 170, 0.15)",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              height: "56px",
            }}
          >
            {/* Logo / Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "linear-gradient(135deg, #ff2ec4, #D97706)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  boxShadow: "0 0 15px rgba(255, 46, 196, 0.4)",
                }}
              >
                🕵️
              </div>
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontFamily: "'DM Sans', monospace",
                    fontWeight: 800,
                    color: "#ff2ec4",
                    letterSpacing: "1px",
                    lineHeight: 1,
                  }}
                >
                  ADAM SMASHER
                </div>
                <div
                  style={{
                    fontSize: "8px",
                    fontFamily: "'DM Sans', monospace",
                    color: "rgba(91,244,166,0.5)",
                    letterSpacing: "0.5px",
                    marginTop: "2px",
                  }}
                >
                  INTELLIGENCE HUB
                </div>
              </div>
            </div>

            {/* Separator */}
            <div
              style={{
                width: "1px",
                height: "28px",
                background: "rgba(57,255,170,0.2)",
                flexShrink: 0,
              }}
            />

            {/* Tab Navigation */}
            <nav
              style={{
                display: "flex",
                gap: "2px",
                flex: 1,
                overflowX: "auto",
                scrollbarWidth: "none",
              }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "6px 14px",
                    background:
                      activeTab === tab.id
                        ? "rgba(255, 46, 196, 0.12)"
                        : "transparent",
                    border: `1px solid ${
                      activeTab === tab.id
                        ? "rgba(255, 46, 196, 0.3)"
                        : "transparent"
                    }`,
                    borderRadius: "6px",
                    color:
                      activeTab === tab.id ? "#ff2ec4" : "rgba(91,244,166,0.5)",
                    fontSize: "11px",
                    fontFamily: "'DM Sans', monospace",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    letterSpacing: "0.3px",
                  }}
                  onMouseOver={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = "rgba(57,255,170,0.05)";
                      e.currentTarget.style.color = "#5bf4a6";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(91,244,166,0.5)";
                    }
                  }}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                  {tab.count !== undefined && (
                    <span
                      style={{
                        background:
                          activeTab === tab.id
                            ? "rgba(255, 46, 196, 0.2)"
                            : "rgba(57,255,170,0.1)",
                        color:
                          activeTab === tab.id
                            ? "#ff2ec4"
                            : "rgba(91,244,166,0.5)",
                        padding: "1px 5px",
                        borderRadius: "8px",
                        fontSize: "9px",
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Right Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <button
                onClick={handleRefresh}
                style={{
                  padding: "7px",
                  background: "rgba(57,255,170,0.08)",
                  border: "1px solid rgba(57,255,170,0.15)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  color: "#5bf4a6",
                  transition: "all 0.2s ease",
                }}
                title="Refresh Intelligence"
              >
                <RefreshCw
                  size={14}
                  style={{
                    animation: isRefreshing ? "spin 1s linear infinite" : "none",
                  }}
                />
              </button>
              <button
                onClick={() => setScanlines(!scanlines)}
                style={{
                  padding: "7px",
                  background: scanlines
                    ? "rgba(255, 46, 196, 0.1)"
                    : "rgba(10,14,17,0.5)",
                  border: `1px solid ${
                    scanlines
                      ? "rgba(255, 46, 196, 0.2)"
                      : "rgba(57,255,170,0.1)"
                  }`,
                  borderRadius: "6px",
                  cursor: "pointer",
                  color: scanlines ? "#ff2ec4" : "rgba(91,244,166,0.4)",
                  fontSize: "11px",
                  fontFamily: "'DM Sans', monospace",
                }}
                title="Toggle Scanlines"
              >
                <Layers size={12} />
              </button>
              <div
                style={{
                  fontSize: "10px",
                  fontFamily: "'DM Sans', monospace",
                  color: "rgba(91,244,166,0.4)",
                  padding: "4px 8px",
                  background: "rgba(10,14,17,0.5)",
                  borderRadius: "5px",
                  border: "1px solid rgba(57,255,170,0.08)",
                  letterSpacing: "0.5px",
                }}
              >
                {currentTime.toLocaleTimeString("en-US", { hour12: false })}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* PAGE CONTENT */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px" }}>
          {/* ════════════════════════════════════════════════════════════════ */}
          {/* DASHBOARD TAB */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {activeTab === "dashboard" && (
            <div>
              {/* Hero Banner */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 46, 196, 0.08) 0%, rgba(217, 119, 6, 0.06) 50%, rgba(57, 255, 170, 0.06) 100%)",
                  border: "1px solid rgba(255, 46, 196, 0.2)",
                  borderRadius: "16px",
                  padding: "32px",
                  marginBottom: "28px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow effect */}
                <div
                  style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "200px",
                    height: "200px",
                    background:
                      "radial-gradient(circle, rgba(255, 46, 196, 0.15) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#5bf4a6",
                        boxShadow: "0 0 8px #5bf4a6",
                        animation: "pulse 2s ease-in-out infinite",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "10px",
                        fontFamily: "'DM Sans', monospace",
                        color: "#5bf4a6",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      LIVE INTELLIGENCE FEED — OPERATIONAL
                    </span>
                  </div>
                  <h1
                    style={{
                      margin: "0 0 8px",
                      fontSize: "28px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 800,
                      color: "#ffffff",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    China AI Research Hub
                  </h1>
                  <p
                    style={{
                      margin: "0 0 20px",
                      fontSize: "13px",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(91,244,166,0.6)",
                      maxWidth: "700px",
                      lineHeight: 1.6,
                    }}
                  >
                    ADAM SMASHER tracking the global AI agent landscape — China&apos;s 8 leading AI platforms vs 4
                    global leaders. Real-time competitive intelligence, execution framework analysis, and
                    actionable strategic recommendations for the Organic VM ecosystem.
                  </p>

                  {/* Quick Stats */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, 1fr)",
                      gap: "10px",
                    }}
                  >
                    {[
                      {
                        label: "CHINA AGENTS",
                        value: totalChinaAgents,
                        color: "#ff2ec4",
                        icon: "🐉",
                      },
                      {
                        label: "GLOBAL AGENTS",
                        value: GLOBAL_AGENTS.length,
                        color: "#D97706",
                        icon: "🌐",
                      },
                      {
                        label: "CRITICAL THREATS",
                        value: criticalThreats,
                        color: "#ff4444",
                        icon: "⚠️",
                      },
                      {
                        label: "ACTIVE PARTNERS",
                        value: activePartners,
                        color: "#5bf4a6",
                        icon: "🤝",
                      },
                      {
                        label: "OPEN SOURCE",
                        value: openSourceCount,
                        color: "#8a6bff",
                        icon: "🔓",
                      },
                      {
                        label: "ACTION ITEMS",
                        value: ACTION_ITEMS.length,
                        color: "#ffcf4a",
                        icon: "🎯",
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        style={{
                          background: "rgba(10,14,17,0.6)",
                          border: `1px solid ${stat.color}25`,
                          borderRadius: "10px",
                          padding: "14px 12px",
                          textAlign: "center",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <div style={{ fontSize: "20px", marginBottom: "4px" }}>
                          {stat.icon}
                        </div>
                        <div
                          style={{
                            fontSize: "22px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 800,
                            color: stat.color,
                            lineHeight: 1,
                          }}
                        >
                          {stat.value}
                        </div>
                        <div
                          style={{
                            fontSize: "8px",
                            fontFamily: "'DM Sans', monospace",
                            color: "rgba(91,244,166,0.4)",
                            letterSpacing: "0.5px",
                            marginTop: "4px",
                          }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dashboard Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Left Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Threat Landscape */}
                  <Card style={{ padding: "20px" }}>
                    <SectionHeader
                      icon="🎯"
                      title="THREAT LANDSCAPE"
                      subtitle="AI agents ranked by monitoring priority"
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {[...CHINA_AGENTS, ...GLOBAL_AGENTS]
                        .sort((a, b) => b.monitoringPriority - a.monitoringPriority)
                        .slice(0, 6)
                        .map((agent) => (
                          <div
                            key={agent.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "8px 10px",
                              background: "rgba(10,14,17,0.5)",
                              borderRadius: "6px",
                              border: "1px solid rgba(57,255,170,0.06)",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                            onClick={() => {
                              if (agent.region === "China") {
                                setActiveTab("china");
                                setTimeout(() => toggleChinaCard(agent.id), 100);
                              } else {
                                setActiveTab("global");
                                setTimeout(() => toggleGlobalCard(agent.id), 100);
                              }
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.borderColor = "rgba(255,46,196,0.3)";
                              e.currentTarget.style.background = "rgba(255,46,196,0.04)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.borderColor = "rgba(57,255,170,0.06)";
                              e.currentTarget.style.background = "rgba(10,14,17,0.5)";
                            }}
                          >
                            <span style={{ fontSize: "18px", flexShrink: 0 }}>
                              {agent.icon}
                            </span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  fontSize: "11px",
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontWeight: 600,
                                  color: "#ffffff",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {agent.product}
                              </div>
                              <div
                                style={{
                                  fontSize: "9px",
                                  fontFamily: "'DM Sans', monospace",
                                  color: "rgba(91,244,166,0.4)",
                                }}
                              >
                                {agent.region} · Priority {agent.monitoringPriority}/10
                              </div>
                            </div>
                            <ThreatLevelBadge level={agent.threatLevel} />
                          </div>
                        ))}
                    </div>
                  </Card>

                  {/* Priority Actions */}
                  <Card style={{ padding: "20px" }}>
                    <SectionHeader
                      icon="🔥"
                      title="PRIORITY ACTIONS"
                      subtitle="Top 5 critical action items"
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {ACTION_ITEMS.filter((a) => a.priority === "Critical" || a.priority === "High")
                        .slice(0, 5)
                        .map((item) => (
                          <div
                            key={item.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "8px 10px",
                              background: "rgba(10,14,17,0.5)",
                              borderRadius: "6px",
                              border: "1px solid rgba(57,255,170,0.06)",
                            }}
                          >
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "4px",
                                background:
                                  item.status === "Completed"
                                    ? "rgba(57,255,170,0.15)"
                                    : item.status === "In Progress"
                                    ? "rgba(255,46,196,0.15)"
                                    : "rgba(255,207,74,0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                flexShrink: 0,
                              }}
                            >
                              {item.status === "Completed" ? (
                                <CheckCircle size={12} color="#5bf4a6" />
                              ) : item.status === "In Progress" ? (
                                <Activity size={12} color="#ff2ec4" />
                              ) : (
                                <Clock size={12} color="#ffcf4a" />
                              )}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  fontSize: "11px",
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontWeight: 600,
                                  color: "#ffffff",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {item.title}
                              </div>
                              <div
                                style={{
                                  fontSize: "9px",
                                  fontFamily: "'DM Sans', monospace",
                                  color: "rgba(91,244,166,0.4)",
                                }}
                              >
                                Due: {item.deadline}
                              </div>
                            </div>
                            <StatusBadge status={item.status} />
                          </div>
                        ))}
                    </div>
                  </Card>
                </div>

                {/* Right Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Recent Intel Feed */}
                  <Card style={{ padding: "20px" }}>
                    <SectionHeader
                      icon="🕵️"
                      title="RECENT INTELLIGENCE"
                      subtitle="Latest developments from the AI landscape"
                    />
                    <IntelFeed items={WEEKLY_INTEL} maxItems={5} />
                  </Card>

                  {/* Framework Overview */}
                  <Card style={{ padding: "20px" }}>
                    <SectionHeader
                      icon="⚖️"
                      title="FRAMEWORK COMPARISON"
                      subtitle="Key dimensions at a glance"
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {FRAMEWORK_COMPARISON.slice(0, 4).map((framework) => (
                        <div
                          key={framework.dimension}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 12px",
                            background: "rgba(10,14,17,0.5)",
                            borderRadius: "6px",
                            border: "1px solid rgba(57,255,170,0.06)",
                            cursor: "pointer",
                          }}
                          onClick={() => setActiveTab("comparison")}
                          onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = "rgba(57,255,170,0.2)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = "rgba(57,255,170,0.06)";
                          }}
                        >
                          <span style={{ fontSize: "16px", flexShrink: 0 }}>
                            {framework.icon}
                          </span>
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: "11px",
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 600,
                                color: "#ffffff",
                              }}
                            >
                              {framework.dimension}
                            </div>
                            <div
                              style={{
                                fontSize: "9px",
                                fontFamily: "'DM Sans', monospace",
                                color: "rgba(91,244,166,0.4)",
                              }}
                            >
                              {Object.keys(framework.china).length} China · {Object.keys(framework.global).length} Global
                            </div>
                          </div>
                          <span
                            style={{
                              fontSize: "10px",
                              fontFamily: "'DM Sans', monospace",
                              fontWeight: 700,
                              color:
                                framework.organicVmFit === "Excellent"
                                  ? "#5bf4a6"
                                  : framework.organicVmFit === "Good"
                                  ? "#D97706"
                                  : "#ffcf4a",
                            }}
                          >
                            {framework.organicVmFit}
                          </span>
                        </div>
                      ))}
                      <button
                        onClick={() => setActiveTab("comparison")}
                        style={{
                          padding: "10px",
                          background: "rgba(255, 46, 196, 0.08)",
                          border: "1px solid rgba(255, 46, 196, 0.2)",
                          borderRadius: "6px",
                          color: "#ff2ec4",
                          fontSize: "11px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                          cursor: "pointer",
                          letterSpacing: "0.5px",
                          marginTop: "4px",
                        }}
                      >
                        VIEW FULL COMPARISON →
                      </button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* CHINA AI AGENTS TAB */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {activeTab === "china" && (
            <div>
              {/* Section Header */}
              <div
                style={{
                  marginBottom: "24px",
                  padding: "20px 24px",
                  background: "rgba(255, 46, 196, 0.05)",
                  border: "1px solid rgba(255, 46, 196, 0.15)",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "16px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: "0 0 4px",
                        fontSize: "20px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 800,
                        color: "#ff2ec4",
                      }}
                    >
                      🐉 China AI Agent Ecosystem
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "12px",
                        fontFamily: "'DM Sans', sans-serif",
                        color: "rgba(91,244,166,0.6)",
                      }}
                    >
                      8 leading AI platforms tracked by ADAM SMASHER · Strategic intelligence for the
                      China-Africa AI corridor
                    </p>
                  </div>
                  {/* Search */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(10,14,17,0.6)",
                      border: "1px solid rgba(57,255,170,0.15)",
                      borderRadius: "8px",
                      padding: "8px 12px",
                    }}
                  >
                    <Search size={14} color="rgba(91,244,166,0.4)" />
                    <input
                      value={chinaSearch}
                      onChange={(e) => setChinaSearch(e.target.value)}
                      placeholder="Search agents..."
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#ffffff",
                        fontSize: "12px",
                        fontFamily: "'DM Sans', sans-serif",
                        width: "180px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Agent Cards Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: "14px",
                }}
              >
                {filteredChinaAgents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    isExpanded={expandedChinaCards.has(agent.id)}
                    onToggle={() => toggleChinaCard(agent.id)}
                    onDeepDive={() => setSelectedAgent(agent)}
                  />
                ))}
              </div>

              {filteredChinaAgents.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    color: "rgba(91,244,166,0.4)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                  }}
                >
                  No agents match your search criteria.
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* GLOBAL AI AGENTS TAB */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {activeTab === "global" && (
            <div>
              {/* Section Header */}
              <div
                style={{
                  marginBottom: "24px",
                  padding: "20px 24px",
                  background: "rgba(217, 119, 6, 0.05)",
                  border: "1px solid rgba(217, 119, 6, 0.15)",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "16px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: "0 0 4px",
                        fontSize: "20px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 800,
                        color: "#D97706",
                      }}
                    >
                      🌍 Global AI Agent Leaders
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "12px",
                        fontFamily: "'DM Sans', sans-serif",
                        color: "rgba(91,244,166,0.6)",
                      }}
                    >
                      4 dominant global AI platforms · Benchmark for competitive analysis
                    </p>
                  </div>
                  {/* Search */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(10,14,17,0.6)",
                      border: "1px solid rgba(217,119,6,0.15)",
                      borderRadius: "8px",
                      padding: "8px 12px",
                    }}
                  >
                    <Search size={14} color="rgba(217,119,6,0.4)" />
                    <input
                      value={globalSearch}
                      onChange={(e) => setGlobalSearch(e.target.value)}
                      placeholder="Search agents..."
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#ffffff",
                        fontSize: "12px",
                        fontFamily: "'DM Sans', sans-serif",
                        width: "180px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Agent Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: "14px",
                }}
              >
                {filteredGlobalAgents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    isExpanded={expandedGlobalCards.has(agent.id)}
                    onToggle={() => toggleGlobalCard(agent.id)}
                    onDeepDive={() => setSelectedAgent(agent)}
                  />
                ))}
              </div>

              {filteredGlobalAgents.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    color: "rgba(91,244,166,0.4)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                  }}
                >
                  No agents match your search criteria.
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* COMPARISON TAB */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {activeTab === "comparison" && (
            <div>
              <div
                style={{
                  marginBottom: "24px",
                  padding: "20px 24px",
                  background: "rgba(57, 255, 170, 0.04)",
                  border: "1px solid rgba(57, 255, 170, 0.15)",
                  borderRadius: "12px",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 4px",
                    fontSize: "20px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 800,
                    color: "#5bf4a6",
                  }}
                >
                  ⚖️ Execution Framework Comparison
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(91,244,166,0.6)",
                  }}
                >
                  Detailed comparison across {FRAMEWORK_COMPARISON.length} key dimensions — China AI vs Global
                  Leaders · Organic VM fit assessment
                </p>
              </div>

              <Card style={{ padding: "24px" }}>
                <ComparisonTable />
              </Card>

              {/* Summary Matrix */}
              <div
                style={{
                  marginTop: "24px",
                  background: "rgba(10,14,17,0.8)",
                  border: "1px solid rgba(57,255,170,0.12)",
                  borderRadius: "12px",
                  padding: "20px",
                  overflowX: "auto",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontFamily: "'DM Sans', monospace",
                    color: "#ff2ec4",
                    letterSpacing: "0.5px",
                    marginBottom: "16px",
                    textTransform: "uppercase",
                  }}
                >
                  📊 Organic VM Agent Selection Matrix
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Agent", "Use Case", "Recommended Tier", "Integration Complexity", "Est. Monthly Cost"].map(
                        (header) => (
                          <th
                            key={header}
                            style={{
                              padding: "8px 12px",
                              textAlign: "left",
                              fontSize: "9px",
                              fontFamily: "'DM Sans', monospace",
                              color: "rgba(91,244,166,0.5)",
                              letterSpacing: "0.5px",
                              textTransform: "uppercase",
                              borderBottom: "1px solid rgba(57,255,170,0.12)",
                            }}
                          >
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        agent: "DeepSeek V3",
                        useCase: "Autonomous Coding, Production Inference",
                        tier: "Primary",
                        complexity: "Medium",
                        cost: "$50-200/mo",
                        rowColor: "rgba(255,46,196,0.04)",
                      },
                      {
                        agent: "Kimi / Moonshot",
                        useCase: "Long Document Analysis, Due Diligence",
                        tier: "Primary",
                        complexity: "Low",
                        cost: "$100-500/mo",
                        rowColor: "transparent",
                      },
                      {
                        agent: "MiniMax Hailuo",
                        useCase: "Video Content Generation, Marketing",
                        tier: "Primary",
                        complexity: "Low",
                        cost: "$80-300/mo",
                        rowColor: "rgba(255,46,196,0.04)",
                      },
                      {
                        agent: "Qwen 2.5 (Open)",
                        useCase: "Self-hosted Agents, Data Sovereignty",
                        tier: "Strategic",
                        complexity: "High",
                        cost: "$0 (self-host) + infra",
                        rowColor: "transparent",
                      },
                      {
                        agent: "ByteDance Coze",
                        useCase: "TikTok Shop Automation, Bots",
                        tier: "Strategic",
                        complexity: "Low",
                        cost: "$0-100/mo",
                        rowColor: "rgba(255,46,196,0.04)",
                      },
                      {
                        agent: "Anthropic Claude",
                        useCase: "Complex Reasoning, Quality-Critical Tasks",
                        tier: "Premium",
                        complexity: "Low",
                        cost: "$500-2000/mo",
                        rowColor: "transparent",
                      },
                      {
                        agent: "Google Gemini",
                        useCase: "Mobile AI, Multi-modal, Android Integration",
                        tier: "Premium",
                        complexity: "Medium",
                        cost: "$200-800/mo",
                        rowColor: "rgba(255,46,196,0.04)",
                      },
                      {
                        agent: "Tencent Hunyuan",
                        useCase: "Enterprise WeChat Integration",
                        tier: "Watch",
                        complexity: "Medium",
                        cost: "Enterprise",
                        rowColor: "transparent",
                      },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        style={{ background: row.rowColor }}
                      >
                        <td
                          style={{
                            padding: "10px 12px",
                            fontSize: "11px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                            color: "#ffffff",
                            borderBottom: "1px solid rgba(57,255,170,0.06)",
                          }}
                        >
                          {row.agent}
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            fontSize: "11px",
                            fontFamily: "'DM Sans', sans-serif",
                            color: "rgba(91,244,166,0.7)",
                            borderBottom: "1px solid rgba(57,255,170,0.06)",
                          }}
                        >
                          {row.useCase}
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            fontSize: "10px",
                            fontFamily: "'DM Sans', monospace",
                            fontWeight: 700,
                            color:
                              row.tier === "Primary"
                                ? "#5bf4a6"
                                : row.tier === "Strategic"
                                ? "#D97706"
                                : row.tier === "Premium"
                                ? "#8a6bff"
                                : "#ffcf4a",
                            borderBottom: "1px solid rgba(57,255,170,0.06)",
                          }}
                        >
                          {row.tier.toUpperCase()}
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            fontSize: "10px",
                            fontFamily: "'DM Sans', monospace",
                            color:
                              row.complexity === "Low"
                                ? "#5bf4a6"
                                : row.complexity === "Medium"
                                ? "#D97706"
                                : "#ffcf4a",
                            borderBottom: "1px solid rgba(57,255,170,0.06)",
                          }}
                        >
                          {row.complexity}
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            fontSize: "11px",
                            fontFamily: "'DM Sans', sans-serif",
                            color: "rgba(91,244,166,0.7)",
                            borderBottom: "1px solid rgba(57,255,170,0.06)",
                          }}
                        >
                          {row.cost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* INTELLIGENCE FEED TAB */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {activeTab === "intel" && (
            <div>
              <div
                style={{
                  marginBottom: "24px",
                  padding: "20px 24px",
                  background: "rgba(138, 107, 255, 0.05)",
                  border: "1px solid rgba(138, 107, 255, 0.15)",
                  borderRadius: "12px",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 4px",
                    fontSize: "20px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 800,
                    color: "#8a6bff",
                  }}
                >
                  🕵️ Weekly Intelligence Feed
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(91,244,166,0.6)",
                  }}
                >
                  {WEEKLY_INTEL.length} intelligence items tracked · Filter by category · Click to expand
                </p>
              </div>

              <Card style={{ padding: "24px" }}>
                <IntelFeed items={WEEKLY_INTEL} />
              </Card>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* ACTION ITEMS TAB */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {activeTab === "actions" && (
            <div>
              <div
                style={{
                  marginBottom: "24px",
                  padding: "20px 24px",
                  background: "rgba(255, 207, 74, 0.05)",
                  border: "1px solid rgba(255, 207, 74, 0.15)",
                  borderRadius: "12px",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 4px",
                    fontSize: "20px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 800,
                    color: "#ffcf4a",
                  }}
                >
                  🎯 Action Items & Execution Plan
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(91,244,166,0.6)",
                  }}
                >
                  {ACTION_ITEMS.length} active action items · Prioritized by strategic impact · Click to expand
                </p>
              </div>

              <Card style={{ padding: "24px" }}>
                <ActionItemsPanel />
              </Card>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* DEEP DIVE MODAL */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {selectedAgent && (
          <DeepDiveModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
        )}

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* KEYFRAME ANIMATIONS */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
}
