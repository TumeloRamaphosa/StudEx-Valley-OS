"use client";

import { useState, useEffect, useRef } from "react";
import { PageHeader } from "@/components/ui";
import { Badge } from "@/components/ui";
import {
  Cpu, Globe, Shield, Zap, Snowflake, Star, Radio,
  Activity, Users, TrendingUp, Clock, Server, Wifi,
  ChevronRight, AlertTriangle, CheckCircle2, Loader2,
  Eye, Lock, Database, Bot, Layers, Send, Play, Network,
  LineChart, RadioTower, Package, Building2, Thermometer,
  ArrowRight, ZapOff, Scan, Broadcast,
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

  return (
    <div className="relative">
      <svg viewBox="0 0 120 100" width="120" height="100">
        <ellipse cx="60" cy="55" rx="35" ry="30" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.8" />
        <ellipse cx="28" cy="35" rx="10" ry="7" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.6" />
        <ellipse cx="92" cy="35" rx="10" ry="7" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.6" />
        <path d="M 25 30 Q 15 20 20 10" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.8" />
        <path d="M 95 30 Q 105 20 100 10" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.8" />
        {[[35,45],[75,50],[50,60],[65,40],[40,65]].map(([cx,cy], i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={8 + Math.sin(frame * 0.1 + i) * 2}
            fill="#ff2ec4" opacity={0.3 + Math.sin(frame * 0.1 + i) * 0.15}
          />
        ))}
        <circle cx="48" cy="50" r={3 + Math.sin(frame * 0.15) * 0.5} fill="#ff2ec4" opacity="0.9" />
        <circle cx="72" cy="50" r={3 + Math.cos(frame * 0.15) * 0.5} fill="#ff2ec4" opacity="0.9" />
        <circle cx="48" cy="50" r="1" fill="white" />
        <circle cx="72" cy="50" r="1" fill="white" />
        <ellipse cx="52" cy="72" rx="4" ry="3" fill="none" stroke="#ff2ec4" strokeWidth="1" opacity="0.7" />
        <ellipse cx="68" cy="72" rx="4" ry="3" fill="none" stroke="#ff2ec4" strokeWidth="1" opacity="0.7" />
        <ellipse cx="60" cy="55" rx="40" ry="35" fill="none" stroke="#ff2ec4" strokeWidth="0.5" opacity="0.3"
          style={{ filter: "blur(3px)" }} />
        <line
          x1="25" y1={25 + (frame % 50)}
          x2="95" y2={25 + (frame % 50)}
          stroke="#39ffaa" strokeWidth="0.5" opacity="0.5"
        />
      </svg>
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

// ─── Africa Map Component ───────────────────────────────────────────────────

const AFRICA_HUBS = [
  { name: "JHB", city: "Johannesburg", country: "South Africa", x: 52, y: 75, size: 12, pulse: 1.5 },
  { name: "CPT", city: "Cape Town", country: "South Africa", x: 50, y: 82, size: 7, pulse: 1.0 },
  { name: "GBE", city: "Gaborone", country: "Botswana", x: 51, y: 72, size: 6, pulse: 0.8 },
  { name: "HRE", city: "Harare", country: "Zimbabwe", x: 57, y: 58, size: 6, pulse: 0.8 },
  { name: "MPM", city: "Maputo", country: "Mozambique", x: 59, y: 66, size: 6, pulse: 0.8 },
  { name: "MBS", city: "Mbabane", country: "Eswatini", x: 54, y: 73, size: 5, pulse: 0.7 },
  { name: "WDH", city: "Windhoek", country: "Namibia", x: 48, y: 70, size: 5, pulse: 0.7 },
  { name: "KGL", city: "Kigali", country: "Rwanda", x: 61, y: 48, size: 6, pulse: 0.8 },
  { name: "LOS", city: "Lagos", country: "Nigeria", x: 43, y: 42, size: 8, pulse: 1.2 },
  { name: "NBO", city: "Nairobi", country: "Kenya", x: 65, y: 44, size: 7, pulse: 1.0 },
  { name: "LUN", city: "Lusaka", country: "Zambia", x: 55, y: 56, size: 6, pulse: 0.8 },
  { name: "LLW", city: "Lilongwe", country: "Malawi", x: 59, y: 54, size: 5, pulse: 0.7 },
  { name: "KMP", city: "Kampala", country: "Uganda", x: 63, y: 46, size: 5, pulse: 0.7 },
  { name: "ACC", city: "Accra", country: "Ghana", x: 41, y: 38, size: 6, pulse: 0.8 },
  { name: "ADD", city: "Addis Ababa", country: "Ethiopia", x: 68, y: 38, size: 6, pulse: 0.8 },
  { name: "CAI", city: "Cairo", country: "Egypt", x: 62, y: 22, size: 6, pulse: 0.8 },
  { name: "CAS", city: "Casablanca", country: "Morocco", x: 38, y: 26, size: 5, pulse: 0.7 },
  { name: "TUN", city: "Tunis", country: "Tunisia", x: 42, y: 22, size: 5, pulse: 0.7 },
  { name: "RAI", city: "Praia", country: "Cape Verde", x: 30, y: 36, size: 4, pulse: 0.6 },
];

function AfricaMap() {
  const [pulseFrame, setPulseFrame] = useState(0);
  const jhb = AFRICA_HUBS[0];

  useEffect(() => {
    const interval = setInterval(() => setPulseFrame((f) => (f + 1) % 60), 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: 280 }}>
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--pink)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--pink)" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Connection lines from JHB to all nodes */}
        {AFRICA_HUBS.slice(1).map((hub) => (
          <line
            key={`line-${hub.name}`}
            x1={jhb.x}
            y1={jhb.y}
            x2={hub.x}
            y2={hub.y}
            stroke="var(--pink)"
            strokeWidth="0.2"
            strokeOpacity="0.3"
            strokeDasharray="1,1"
          />
        ))}
        
        {/* Hub nodes */}
        {AFRICA_HUBS.map((hub, i) => {
          const pulseScale = 1 + Math.sin(pulseFrame * 0.1 + i * 0.5) * 0.3 * hub.pulse;
          const glowOpacity = 0.3 + Math.sin(pulseFrame * 0.1 + i * 0.5) * 0.2;
          
          return (
            <g key={hub.name} filter="url(#glow)">
              {/* Pulse ring */}
              <circle
                cx={hub.x}
                cy={hub.y}
                r={hub.size * pulseScale * 2}
                fill="none"
                stroke="var(--pink)"
                strokeWidth="0.3"
                opacity={glowOpacity * 0.5}
              />
              {/* Glow */}
              <circle
                cx={hub.x}
                cy={hub.y}
                r={hub.size * 1.5}
                fill="url(#nodeGlow)"
                opacity={glowOpacity}
              />
              {/* Core */}
              <circle
                cx={hub.x}
                cy={hub.y}
                r={hub.size}
                fill={i === 0 ? "var(--pink)" : "var(--green)"}
                opacity="0.9"
              />
              {/* Label for JHB */}
              {i === 0 && (
                <text
                  x={hub.x}
                  y={hub.y + hub.size + 3}
                  textAnchor="middle"
                  fill="var(--pink)"
                  fontSize="2"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                >
                  {hub.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Legend */}
      <div style={{
        position: "absolute",
        bottom: 8,
        right: 8,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        fontSize: 9,
        fontFamily: "JetBrains Mono, monospace",
        color: "var(--ink-faint)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--pink)", boxShadow: "0 0 4px var(--pink)" }} />
          <span>HQ (JHB)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 4px var(--green)" }} />
          <span>Hub {AFRICA_HUBS.length - 1}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Russia Trade Ticker ───────────────────────────────────────────────────

const RUSSIA_CLIENTS = [
  { id: "RU-001", name: "Pharmasyntez", products: ["Ledipasvir 90mg", "Sofosbuvir 400mg"], volume: "$2.4M", tenders: 3 },
  { id: "RU-002", name: "R-Pharm", products: ["Abciximab", "Trastuzumab"], volume: "$1.8M", tenders: 2 },
  { id: "RU-003", name: "Pharmstandard", products: ["Insulin Glargine", "Dapagliflozin"], volume: "$3.1M", tenders: 4 },
  { id: "RU-004", name: "Stada CIS", products: ["Atorvastatin", "Rosuvastatin"], volume: "$890K", tenders: 1 },
];

function RussiaTradeTicker() {
  const [ticks, setTicks] = useState<{ id: string; text: string; type: string; time: string }[]>([]);
  const tickRef = useRef<HTMLDivElement>(null);

  const addTick = () => {
    const messages = [
      { type: "order", text: "New order confirmed — Pharmasyntez" },
      { type: "tender", text: "Tender update — R-Pharm active" },
      { type: "volume", text: "Volume milestone — $8.2M reached" },
      { type: "alert", text: "Customs clearance — Stada CIS" },
      { type: "order", text: "Bulk order — Pharmstandard" },
      { type: "volume", text: "Trade volume +12% MoM" },
      { type: "tender", text: "New tender — Pharmasyntez" },
      { type: "alert", text: "Quote sent — R-Pharm" },
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const time = new Date().toLocaleTimeString("en-ZA", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    
    setTicks((prev) => [...prev.slice(-15), { id: `${Date.now()}-${Math.random()}`, text: msg.text, type: msg.type, time }]);
  };

  useEffect(() => {
    const interval = setInterval(addTick, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <RadioTower size={14} style={{ color: "#ff4444", animation: "pulse 1s infinite" }} />
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#ff4444", fontWeight: "bold" }}>
          RUSSIA BRIDGE — LIVE FEED
        </span>
        <div style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#ff4444",
          animation: "blink 0.8s infinite",
          boxShadow: "0 0 6px #ff4444",
        }} />
      </div>
      
      {/* Client panels */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginBottom: 12 }}>
        {RUSSIA_CLIENTS.map((client) => (
          <div key={client.id} style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid var(--border-soft)",
            background: "var(--surface-2)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--ink)", fontWeight: "bold" }}>
                {client.name}
              </span>
              <Badge tone="done" style={{ fontSize: 8 }}>{client.tenders} tenders</Badge>
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--ink-faint)", marginBottom: 4 }}>
              {client.products.join(", ")}
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#ff4444", fontWeight: "bold" }}>
              {client.volume}
            </div>
          </div>
        ))}
      </div>
      
      {/* Ticker feed */}
      <div ref={tickRef} style={{
        height: 100,
        overflow: "hidden",
        borderRadius: 8,
        border: "1px solid rgba(255,68,68,0.3)",
        background: "rgba(255,68,68,0.05)",
        padding: 8,
      }}>
        <style>{`
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        `}</style>
        {ticks.map((tick) => (
          <div key={tick.id} style={{
            display: "flex",
            gap: 8,
            padding: "4px 0",
            borderBottom: "1px solid rgba(255,68,68,0.1)",
            animation: "fadeIn 0.3s ease-out",
          }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--ink-faint)" }}>
              [{tick.time}]
            </span>
            <span style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              color: tick.type === "order" ? "#39ffaa" : tick.type === "volume" ? "var(--gold)" : tick.type === "alert" ? "#ff4444" : "var(--pink)",
            }}>
              {tick.text}
            </span>
          </div>
        ))}
        {ticks.length === 0 && (
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--ink-faint)", textAlign: "center", paddingTop: 30 }}>
            AWAITING FEED...
          </div>
        )}
      </div>
    </div>
  );
}

// ─── China Partner Status ──────────────────────────────────────────────────

const CHINA_PARTNERS = [
  { id: "CN-001", name: "Tencent Cloud", icon: "🐧", apiCalls: 24847, response: 98, status: "connected", lastContact: "2m ago" },
  { id: "CN-002", name: "ByteDance AI", icon: "🎵", apiCalls: 18234, response: 94, status: "connected", lastContact: "5m ago" },
  { id: "CN-003", name: "MiniMax", icon: "🧠", apiCalls: 8956, response: 99, status: "connected", lastContact: "12m ago" },
  { id: "CN-004", name: "Kimi AI", icon: "💬", apiCalls: 15234, response: 97, status: "connected", lastContact: "8m ago" },
];

function ChinaPartnerStatus() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <Network size={14} style={{ color: "#ff6b35" }} />
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--ink-strong)", fontWeight: "bold" }}>
          CHINA PARTNER STATUS
        </span>
        <Badge tone="done"><GlitchText className="inline">4 CONNECTED</GlitchText></Badge>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {CHINA_PARTNERS.map((partner) => (
          <div key={partner.id} style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--surface-2)",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Status indicator */}
            <div style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--green)",
              boxShadow: "0 0 8px var(--green)",
              animation: "pulse 2s infinite",
            }} />
            
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>{partner.icon}</span>
              <div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--ink)", fontWeight: "bold" }}>
                  {partner.name}
                </div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8, color: "var(--ink-faint)" }}>
                  {partner.lastContact}
                </div>
              </div>
            </div>
            
            {/* API Calls */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8, color: "var(--ink-faint)" }}>API Calls</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#ff6b35", fontWeight: "bold" }}>
                  {partner.apiCalls.toLocaleString()}
                </span>
              </div>
              <div style={{ height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{
                  width: `${Math.min(100, partner.apiCalls / 300)}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, var(--pink), #ff6b35)",
                  borderRadius: 2,
                }} />
              </div>
            </div>
            
            {/* Response time */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8, color: "var(--ink-faint)" }}>Response</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--green)" }}>
                  {partner.response}%
                </span>
              </div>
              <div style={{ height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{
                  width: `${partner.response}%`,
                  height: "100%",
                  background: "var(--green)",
                  borderRadius: 2,
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Quick Actions Grid ────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { id: "deploy", name: "Deploy Agent", icon: Bot, color: "var(--pink)", shortcut: "⌘D" },
  { id: "broadcast", name: "Global Broadcast", icon: Broadcast, color: "#8a6bff", shortcut: "⌘B" },
  { id: "russia", name: "Russia Bridge", icon: RadioTower, color: "#ff4444", shortcut: "⌘R" },
  { id: "coldchain", name: "Africa Cold Chain", icon: Thermometer, color: "#39ffaa", shortcut: "⌘C" },
  { id: "research", name: "Research Brief", icon: Scan, color: "var(--gold)", shortcut: "⌘⇧R" },
  { id: "outreach", name: "Partner Outreach", icon: Send, color: "#00A3E0", shortcut: "⌘O" },
];

function QuickActionsGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <Zap size={14} style={{ color: "var(--gold)" }} />
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--ink-strong)", fontWeight: "bold" }}>
          QUICK ACTIONS
        </span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--ink-faint)", marginLeft: "auto" }}>
          2077 SYSTEM
        </span>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          const isHovered = hoveredId === action.id;
          
          return (
            <button
              key={action.id}
              onMouseEnter={() => setHoveredId(action.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                padding: "14px 10px",
                borderRadius: 10,
                border: `1px solid ${isHovered ? action.color : "var(--border)"}`,
                background: isHovered ? `rgba(${action.color === "var(--pink)" ? "255,46,196" : action.color === "#8a6bff" ? "138,107,255" : action.color === "#ff4444" ? "255,68,68" : "57,255,170" }, 0.1)` : "var(--surface-2)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s ease",
                transform: isHovered ? "translateY(-2px)" : "none",
                boxShadow: isHovered ? `0 4px 12px rgba(${action.color === "var(--pink)" ? "255,46,196" : action.color === "#8a6bff" ? "138,107,255" : action.color === "#ff4444" ? "255,68,68" : "57,255,170" }, 0.3)` : "none",
              }}
            >
              <Icon size={20} style={{ color: action.color }} />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--ink)", fontWeight: 500 }}>
                {action.name}
              </span>
              <span style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 8,
                color: "var(--ink-faint)",
                padding: "2px 4px",
                borderRadius: 3,
                background: "var(--border)",
              }}>
                {action.shortcut}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Live Clock & System Metrics ───────────────────────────────────────────

function ArcGauge({ value, max, label, color, unit }: { value: number; max: number; label: string; color: string; unit: string }) {
  const [animated, setAnimated] = useState(0);
  const percentage = Math.min(100, (animated / max) * 100);
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75;

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimated((a) => {
        const target = value + (Math.random() - 0.5) * 5;
        return Math.max(0, Math.min(max, a + (target - a) * 0.1));
      });
    }, 500);
    return () => clearInterval(interval);
  }, [value, max]);

  return (
    <div style={{ position: "relative", width: 80, height: 80 }}>
      <svg viewBox="0 0 80 80" style={{ transform: "rotate(-135deg)" }}>
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="var(--border)"
          strokeWidth="6"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
        />
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
      </svg>
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, fontWeight: "bold", color: "var(--ink-strong)" }}>
          {Math.round(percentage)}%
        </span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 7, color: "var(--ink-faint)" }}>
          {label}
        </span>
      </div>
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState(new Date());
  const [metrics, setMetrics] = useState({ cpu: 34, memory: 67, network: 45 });

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((m) => ({
        cpu: Math.max(10, Math.min(90, m.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(40, Math.min(95, m.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(20, Math.min(80, m.network + (Math.random() - 0.5) * 15)),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = time.toLocaleTimeString("en-ZA", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = time.toLocaleDateString("en-ZA", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {/* Clock */}
      <div style={{
        textAlign: "center",
        padding: "16px 20px",
        borderRadius: 12,
        border: "1px solid var(--border)",
        background: "var(--surface-2)",
      }}>
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 28,
          fontWeight: "bold",
          color: "var(--pink)",
          textShadow: "0 0 10px var(--pink-glow)",
          letterSpacing: 2,
        }}>
          {timeStr}
        </div>
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          color: "var(--ink-faint)",
          marginTop: 4,
        }}>
          SAST · JOHANNESBURG
        </div>
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 8,
          color: "var(--ink-faint)",
        }}>
          {dateStr}
        </div>
      </div>

      {/* Arc Gauges */}
      <div style={{ display: "flex", gap: 8 }}>
        <ArcGauge value={metrics.cpu} max={100} label="CPU" color="var(--pink)" unit="%" />
        <ArcGauge value={metrics.memory} max={100} label="RAM" color="#8a6bff" unit="%" />
        <ArcGauge value={metrics.network} max={100} label="NET" color="var(--green)" unit="Mbps" />
      </div>
    </div>
  );
}

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

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* NEW SECTIONS — 2077 ENHANCEMENTS */}
        {/* ═══════════════════════════════════════════════════════════════════ */}

        {/* Live Clock & System Metrics */}
        <div className="mt-6 rounded-2xl border p-5" style={{ borderColor: "var(--green)", background: "var(--surface)" }}>
          <LiveClock />
        </div>

        {/* Three-column: Africa Map | Russia Ticker | China Partners */}
        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          {/* Africa Map */}
          <div className="rounded-2xl border p-5" style={{ borderColor: "var(--pink)", background: "var(--surface)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Globe size={14} style={{ color: "var(--pink)" }} />
              <span className="font-mono text-sm font-bold" style={{ color: "var(--ink-strong)" }}>
                AFRICA NETWORK
              </span>
              <Badge tone="done">19 HUBS</Badge>
            </div>
            <AfricaMap />
          </div>

          {/* Russia Trade Ticker */}
          <div className="rounded-2xl border p-5" style={{ borderColor: "#ff4444", background: "var(--surface)" }}>
            <RussiaTradeTicker />
          </div>

          {/* China Partner Status */}
          <div className="rounded-2xl border p-5" style={{ borderColor: "#ff6b35", background: "var(--surface)" }}>
            <ChinaPartnerStatus />
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mt-6 rounded-2xl border p-5" style={{ borderColor: "var(--gold)", background: "var(--surface)" }}>
          <QuickActionsGrid />
        </div>

        {/* Footer System Status Bar */}
        <div className="mt-6 flex items-center justify-between px-4 py-3 rounded-xl border" style={{
          borderColor: "var(--border)",
          background: "var(--surface)",
        }}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--green)",
                boxShadow: "0 0 8px var(--green)",
                animation: "pulse 2s infinite",
              }} />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--ink-faint)" }}>
                CORE SYSTEMS ONLINE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Network size={12} style={{ color: "var(--green)" }} />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--ink-faint)" }}>
                LATENCY: 23ms
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={12} style={{ color: "var(--green)" }} />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--ink-faint)" }}>
                SECURITY: SECURE
              </span>
            </div>
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--ink-faint)" }}>
            STUDEx VALLEY OS v2.0.7 · 2077.07.05
          </div>
        </div>

      </div>
    </div>
  );
}
