"use client";

import { useState, useEffect, useRef } from "react";
import { PageHeader } from "@/components/ui";
import { Badge } from "@/components/ui";
import {
  Cpu, Globe, Shield, Zap, Snowflake, Star, Radio,
  Activity, Users, TrendingUp, Clock, Server, Wifi,
  ChevronRight, AlertTriangle, CheckCircle2, Loader2,
  Eye, Lock, Database, Bot, Layers,
} from "lucide-react";

// ─── Glitch Text Effect ───────────────────────────────────────────────────────

function GlitchText({ children, className }: { children: string; className?: string }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.08) {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 150);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`relative inline-block ${className ?? ""}`}
      style={{ color: glitching ? "var(--pink)" : undefined }}
    >
      {children}
      {glitching && (
        <>
          <span
            className="absolute inset-0"
            style={{
              color: "var(--green)",
              clipPath: "inset(30% 0 50% 0)",
              transform: "translateX(3px)",
              opacity: 0.7,
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}

// ─── Matrix Rain Background ──────────────────────────────────────────────────

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cols = Math.floor(canvas.width / 16);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(7, 10, 12, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#39ffaa";
      ctx.font = "12px JetBrains Mono, monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = String.fromCharCode(0x30a0 + Math.random() * 96);
        ctx.fillText(char, i * 16, drops[i] * 16);
        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.25 }}
    />
  );
}

// ─── Renaissance Painting Layer ──────────────────────────────────────────────

function RenaissanceLayer() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((o) => (o + 0.3) % 100);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: 0.08 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% ${50 + Math.sin(offset * 0.02) * 10}%,
            rgba(201,168,76,0.4) 0%,
            rgba(255,46,196,0.2) 40%,
            transparent 70%)`,
          animation: `breathe 12s ease-in-out infinite alternate`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${offset}deg,
            transparent 0%,
            rgba(57,255,170,0.05) 30%,
            transparent 60%)`,
        }}
      />
      <style>{`
        @keyframes breathe {
          0% { transform: scale(1) translateY(0); }
          100% { transform: scale(1.03) translateY(-10px); }
        }
        @keyframes drift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

// ─── Algorithmic Cow Logo ───────────────────────────────────────────────────

function AlgorithmicCow() {
  const [frame, setFrame] = useState(0);
  const [particles, setParticles] = useState<
    { x: number; y: number; vx: number; vy: number; life: number; color: string }[]
  >([]);

  useEffect(() => {
    const interval = setInterval(() => setFrame((f) => (f + 1) % 60), 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Math.random() < 0.3) {
      setParticles((p) => [
        ...p.slice(-20),
        {
          x: 50 + Math.random() * 20,
          y: 50 + Math.random() * 20,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 2,
          life: 1,
          color: Math.random() < 0.5 ? "#ff2ec4" : "#c9a84c",
        },
      ]);
    }
    setParticles((p) =>
      p
        .map((pt) => ({ ...pt, x: pt.x + pt.vx, y: pt.y + pt.vy, life: pt.life - 0.02 }))
        .filter((pt) => pt.life > 0)
    );
  }, [frame]);

  const cowPattern = [
    [0,0,1,1,0,0,0,0,1,1,0,0],
    [0,1,2,2,1,0,0,1,2,2,1,0],
    [0,1,2,2,1,0,0,1,2,2,1,0],
    [0,0,1,1,0,1,1,0,1,1,0,0],
    [0,0,0,0,1,1,1,1,0,0,0,0],
    [0,1,1,0,1,1,1,1,0,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1],
  ];

  return (
    <div className="relative">
      {/* SVG cow head */}
      <svg viewBox="0 0 120 100" width="120" height="100">
        {/* Head base */}
        <ellipse cx="60" cy="55" rx="35" ry="30" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.8" />
        {/* Ears */}
        <ellipse cx="28" cy="35" rx="10" ry="7" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.6" />
        <ellipse cx="92" cy="35" rx="10" ry="7" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.6" />
        {/* Horns */}
        <path d="M 25 30 Q 15 20 20 10" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.8" />
        <path d="M 95 30 Q 105 20 100 10" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.8" />
        {/* Spots (algorithmic) */}
        {[[35,45],[75,50],[50,60],[65,40],[40,65]].map(([cx,cy], i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={8 + Math.sin(frame * 0.1 + i) * 2}
            fill="#ff2ec4" opacity={0.3 + Math.sin(frame * 0.1 + i) * 0.15}
          />
        ))}
        {/* Eyes */}
        <circle cx="48" cy="50" r={3 + Math.sin(frame * 0.15) * 0.5} fill="#ff2ec4" opacity="0.9" />
        <circle cx="72" cy="50" r={3 + Math.cos(frame * 0.15) * 0.5} fill="#ff2ec4" opacity="0.9" />
        <circle cx="48" cy="50" r="1" fill="white" />
        <circle cx="72" cy="50" r="1" fill="white" />
        {/* Nostrils */}
        <ellipse cx="52" cy="72" rx="4" ry="3" fill="none" stroke="#ff2ec4" strokeWidth="1" opacity="0.7" />
        <ellipse cx="68" cy="72" rx="4" ry="3" fill="none" stroke="#ff2ec4" strokeWidth="1" opacity="0.7" />
        {/* Glow */}
        <ellipse cx="60" cy="55" rx="40" ry="35" fill="none" stroke="#ff2ec4" strokeWidth="0.5" opacity="0.3"
          style={{ filter: "blur(3px)" }} />
        {/* Scan line */}
        <line
          x1="25" y1={25 + (frame % 50)}
          x2="95" y2={25 + (frame % 50)}
          stroke="#39ffaa" strokeWidth="0.5" opacity="0.5"
        />
      </svg>
      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
            opacity: p.life,
            boxShadow: `0 0 4px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

// ─── System Status Cards ────────────────────────────────────────────────────

const SYSTEMS = [
  { name: "ADAM SMASHER", status: "online" as const, icon: Cpu, color: "var(--pink)", uptime: "99.7%", load: "23%" },
  { name: "QwenPaw Agent", status: "online" as const, icon: Bot, color: "#8a6bff", uptime: "98.1%", load: "41%" },
  { name: "Agent-Reach", status: "online" as const, icon: Globe, color: "var(--green)", uptime: "100%", load: "12%" },
  { name: "Lark Bridge", status: "online" as const, icon: Server, color: "#00A3E0", uptime: "97.4%", load: "34%" },
  { name: "Slack Bridge", status: "online" as const, icon: Server, color: "#4A154B", uptime: "99.9%", load: "8%" },
  { name: "Discord Bridge", status: "warn" as const, icon: Server, color: "#5865F2", uptime: "94.2%", load: "67%" },
  { name: "Obsidian Brain", status: "online" as const, icon: Database, color: "#c9a84c", uptime: "99.1%", load: "18%" },
  { name: "Cold Chain IoT", status: "online" as const, icon: Snowflake, color: "#39ffaa", uptime: "98.8%", load: "6%" },
];

const DEALS = [
  { id: "SA-RU-001", name: "Pharmasyntez Distribution", stage: "Active", value: "$4.2M", country: "🇿🇦" },
  { id: "SA-RU-002", name: "African Cold Chain Expansion", stage: "Negotiation", value: "$1.8M", country: "🇷🇼" },
  { id: "AF-GL-001", name: "Botswana Pharma Tender", stage: "Submitted", value: "$890K", country: "🇧🇼" },
  { id: "AF-GL-002", name: "Rwanda Government VM", stage: "Active", value: "$1.2M", country: "🇷🇼" },
  { id: "AI-001", name: "Tencent AI Partnership", stage: "Outreach", value: "TBD", country: "🇨🇳" },
];

const AGENTS_ACTIVE = [
  { name: "Research Agent", task: "Monitoring Russia pharma tenders", status: "running" },
  { name: "Outreach Agent", task: "Reaching Tencent / ByteDance", status: "running" },
  { name: "Pipeline Tracker", task: "SA-Russia deal pipeline sync", status: "running" },
  { name: "Cold Chain Monitor", task: "Rwanda storage temp check", status: "idle" },
];

// ─── Main Command Center ───────────────────────────────────────────────────

export default function CommandCenter() {
  const [scanline, setScanline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setScanline((s) => (s + 1) % 100), 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Layers */}
      <MatrixRain />
      <RenaissanceLayer />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom,
            transparent ${scanline - 2}%,
            rgba(57,255,170,0.015) ${scanline}%,
            transparent ${scanline + 2}%)`,
          zIndex: 1,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(7,10,12,0.7) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Hero — 10 Year Anniversary */}
        <div className="text-center py-10 mb-10">
          <div className="flex justify-center mb-6">
            <AlgorithmicCow />
          </div>
          <GlitchText className="font-mono text-4xl font-bold block" style={{ color: "var(--gold)" }}>
            10 YEARS
          </GlitchText>
          <GlitchText className="font-mono text-xl block mt-1" style={{ color: "var(--pink)" }}>
            FOUNDING VISION
          </GlitchText>
          <p className="font-mono text-sm mt-3 max-w-xl mx-auto" style={{ color: "var(--ink-dim)" }}>
            Tumelo Ramaphosa — AI · Blockchain · Cloud Computing · Global Trade
          </p>
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {["2016", "→", "2026"].map((t, i) => (
              <span key={i} className="font-mono text-xs px-3 py-1 rounded-full border" style={{
                borderColor: i === 1 ? "var(--pink)" : "var(--border)",
                color: i === 1 ? "var(--pink)" : "var(--ink-dim)",
              }}>{t}</span>
            ))}
          </div>
          <div className="flex justify-center gap-3 mt-3">
            {["AI AGENT OS", "BLOCKCHAIN", "CLOUD COMPUTING", "GLOBAL MARKETS"].map((tag) => (
              <Badge key={tag} tone="muted">{tag}</Badge>
            ))}
          </div>
        </div>

        {/* Global Markets Backdrop */}
        <div
          className="rounded-2xl border p-6 mb-6"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Radio size={16} style={{ color: "var(--green)" }} className="animate-pulse" />
            <span className="font-mono text-sm" style={{ color: "var(--ink-strong)" }}>
              STUDEx GLOBAL MARKETS — LIVE
            </span>
            <Badge tone="done"><CheckCircle2 size={10} /> Live</Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Globe, label: "Markets", value: "18", unit: "Countries" },
              { icon: Users, label: "Partners", value: "47", unit: "Active" },
              { icon: TrendingUp, label: "Pipeline", value: "$8.1M", unit: "Opportunity" },
              { icon: Activity, label: "Agents", value: "24", unit: "Active" },
            ].map(({ icon: Icon, label, value, unit }) => (
              <div key={label} className="text-center">
                <Icon size={20} style={{ color: "var(--pink)" }} className="mx-auto mb-2" />
                <p className="font-mono text-2xl font-bold" style={{ color: "var(--ink-strong)" }}>{value}</p>
                <p className="font-mono text-xs" style={{ color: "var(--ink-dim)" }}>{unit}</p>
                <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: System Status */}
          <div className="lg:col-span-2 space-y-6">
            <div
              className="rounded-2xl border p-5"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Layers size={16} style={{ color: "var(--pink)" }} />
                  <span className="font-mono text-sm font-bold" style={{ color: "var(--ink-strong)" }}>
                    SYSTEM STATUS
                  </span>
                </div>
                <Badge tone="done"><Wifi size={10} /> All Systems Nominal</Badge>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {SYSTEMS.map((sys) => {
                  const Icon = sys.icon;
                  return (
                    <div
                      key={sys.name}
                      className="flex items-center gap-3 p-3 rounded-xl border"
                      style={{
                        borderColor: sys.status === "warn" ? "#ffcf4a" : "var(--border-soft)",
                        background: "var(--surface-2)",
                      }}
                    >
                      <Icon size={16} style={{ color: sys.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-xs truncate" style={{ color: "var(--ink)" }}>{sys.name}</p>
                        <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>
                          {sys.uptime} · {sys.load} load
                        </p>
                      </div>
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: sys.status === "online" ? "var(--green)" : "#ffcf4a",
                          boxShadow: sys.status === "online"
                            ? "0 0 6px var(--green-glow)"
                            : "0 0 6px rgba(255,207,74,0.5)",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Agents */}
            <div
              className="rounded-2xl border p-5"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bot size={16} style={{ color: "var(--pink)" }} />
                  <span className="font-mono text-sm font-bold" style={{ color: "var(--ink-strong)" }}>
                    ACTIVE AGENTS
                  </span>
                </div>
                <span className="font-mono text-xs" style={{ color: "var(--ink-faint)" }}>
                  {AGENTS_ACTIVE.filter((a) => a.status === "running").length} running
                </span>
              </div>
              <div className="space-y-2">
                {AGENTS_ACTIVE.map((agent) => (
                  <div
                    key={agent.name}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl border"
                    style={{
                      borderColor: "var(--border-soft)",
                      background: "var(--surface-2)",
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: agent.status === "running" ? "var(--pink)" : "var(--border)",
                        boxShadow: agent.status === "running" ? "0 0 8px var(--pink-glow)" : "none",
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-mono text-xs" style={{ color: "var(--ink)" }}>{agent.name}</p>
                      <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{agent.task}</p>
                    </div>
                    <Badge tone={agent.status === "running" ? "running" : "muted"}>
                      {agent.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Deal Pipeline */}
          <div className="space-y-6">
            <div
              className="rounded-2xl border p-5"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} style={{ color: "var(--gold)" }} />
                  <span className="font-mono text-sm font-bold" style={{ color: "var(--gold)" }}>
                    DEAL PIPELINE
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {DEALS.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-3 rounded-xl border cursor-pointer transition-all hover:-translate-y-0.5"
                    style={{
                      borderColor: "var(--border-soft)",
                      background: "var(--surface-2)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs" style={{ color: "var(--ink-faint)" }}>
                        {deal.id}
                      </span>
                      <span className="text-sm">{deal.country}</span>
                    </div>
                    <p className="font-mono text-xs mt-1" style={{ color: "var(--ink)" }}>{deal.name}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge
                        tone={
                          deal.stage === "Active"
                            ? "done"
                            : deal.stage === "Negotiation"
                            ? "running"
                            : "queued"
                        }
                      >
                        {deal.stage}
                      </Badge>
                      <span className="font-mono text-xs font-bold" style={{ color: "var(--gold)" }}>
                        {deal.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clock / Events */}
            <div
              className="rounded-2xl border p-5"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} style={{ color: "var(--pink)" }} />
                <span className="font-mono text-xs" style={{ color: "var(--ink)" }}>NEXT EVENTS</span>
              </div>
              {[
                { day: "TODAY", event: "SA-Russia Trade Week Brief", time: "09:00 SAST" },
                { day: "TOMORROW", event: "Pharma Tender — Botswana", time: "10:00 SAST" },
                { day: "JUL 05", event: "Lark Integration Review", time: "14:00 SAST" },
                { day: "JUL 08", event: "Tencent Outreach Follow-up", time: "11:00 SAST" },
              ].map((e) => (
                <div key={e.event} className="flex items-center gap-3 py-2 border-b border-dashed" style={{ borderColor: "var(--border-soft)" }}>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded border" style={{
                    borderColor: "var(--border)",
                    color: "var(--ink-faint)",
                  }}>{e.day}</span>
                  <div>
                    <p className="font-mono text-xs" style={{ color: "var(--ink)" }}>{e.event}</p>
                    <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partner Outreach Status */}
        <div
          className="mt-6 rounded-2xl border p-5"
          style={{ borderColor: "var(--pink)", background: "rgba(255,46,196,0.05)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} style={{ color: "var(--pink)" }} />
            <span className="font-mono text-sm font-bold" style={{ color: "var(--ink-strong)" }}>
              PARTNER OUTREACH — ACTIVE
            </span>
            <Badge tone="running"><Loader2 size={10} className="animate-spin" /> In Progress</Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: "Tencent", icon: "🐧", status: "Email Sent" },
              { name: "ByteDance", icon: "🎵", status: "Contacting" },
              { name: "MiniMax", icon: "🧠", status: "Researching" },
              { name: "Kimi AI", icon: "💬", status: "Pending" },
              { name: "NVIDIA", icon: "🎮", status: "Email Sent" },
              { name: "Anthropic", icon: "🧬", status: "Researching" },
            ].map((p) => (
              <div key={p.name} className="text-center p-3 rounded-xl border" style={{
                borderColor: "var(--border)",
                background: "var(--surface-2)",
              }}>
                <span className="text-2xl">{p.icon}</span>
                <p className="font-mono text-xs mt-1" style={{ color: "var(--ink)" }}>{p.name}</p>
                <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{p.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
