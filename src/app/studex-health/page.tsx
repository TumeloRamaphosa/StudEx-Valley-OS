"use client";

import { useState, useEffect, useRef } from "react";

type PartnerTier = "founder" | "strategic" | "standard";
type CompanySize = "startup" | "smb" | "enterprise";
type FocusArea =
  | "distribution"
  | "manufacturing"
  | "research"
  | "cold-chain"
  | "regulatory"
  | "digital-health"
  | "wholesale";

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  website: string;
  size: CompanySize;
  focusAreas: FocusArea[];
  vmNeeds: string;
  revenue: string;
  message: string;
  agreedToTerms: boolean;
}

const COUNTRIES = [
  "South Africa",
  "Botswana",
  "Eswatini",
  "Mozambique",
  "Zimbabwe",
  "Namibia",
  "Malawi",
  "Zambia",
  "Rwanda",
  "Uganda",
  "Ghana",
  "Nigeria",
  "Kenya",
  "Ethiopia",
  "Egypt",
  "Morocco",
  "Tunisia",
  "Cape Verde",
  "Zanzibar",
  "Other",
];

const FOCUS_AREAS: { id: FocusArea; label: string; icon: string }[] = [
  { id: "distribution", label: "Distribution & Logistics", icon: "🚚" },
  { id: "manufacturing", label: "Research & Manufacturing", icon: "🏭" },
  { id: "cold-chain", label: "Cold Chain Storage", icon: "❄️" },
  { id: "regulatory", label: "Regulatory & Compliance", icon: "📋" },
  { id: "digital-health", label: "Digital Health & AI", icon: "🤖" },
  { id: "wholesale", label: "Wholesale Trading", icon: "📦" },
];

const PARTNER_TIERS = [
  {
    id: "founder" as PartnerTier,
    name: "FOUNDER PARTNER",
    price: "Equity",
    tagline: "Co-build the African pharma future",
    color: "#ff2ec4",
    perks: [
      "VM with 50GB GPU compute",
      "Co-brand on all Africa ops",
      "Board seat in country hub",
      "Revenue share on local trades",
      "Access to Russia + China corridors",
      "Dedicated ADAM SMASHER agent",
    ],
  },
  {
    id: "strategic" as PartnerTier,
    name: "STRATEGIC PARTNER",
    price: "$2,500/mo",
    tagline: "Full-stack VM + agent network",
    color: "#5bf4a6",
    perks: [
      "Dedicated VM (20GB RAM)",
      "QwenPaw multi-channel bot",
      "Lark/Slack/Discord integration",
      "Access to 10 VM nodes",
      "AfCFTA preferential tariff rates",
      "Cold chain facility access (JHB/CPT)",
      "University research partnership",
    ],
  },
  {
    id: "standard" as PartnerTier,
    name: "STANDARD PARTNER",
    price: "$499/mo",
    tagline: "Your own AI agent VM",
    color: "#D97706",
    perks: [
      "Shared VM (8GB RAM)",
      "ADAM SMASHER base agent",
      "Studex network directory",
      "Africa distribution listing",
      "Trade week participation",
      "Monthly intelligence report",
    ],
  },
];

const LAUNCH_COUNTRIES = [
  { name: "South Africa", flag: "🇿🇦", role: "HQ & Distribution Hub" },
  { name: "Botswana", flag: "🇧🇼", role: "Government VM Partner" },
  { name: "Eswatini", flag: "🇸🇿", role: "SADC Gateway" },
  { name: "Mozambique", flag: "🇲🇿", role: "Port & Logistics Hub" },
  { name: "Zimbabwe", flag: "🇿🇼", role: "Regional Pharma Market" },
  { name: "Namibia", flag: "🇳🇦", role: "SADC Corridor" },
  { name: "Malawi", flag: "🇲🇼", role: "Lake Malawi Distribution" },
  { name: "Zambia", flag: "🇿🇲", role: "Copperbelt Trade Route" },
  { name: "Rwanda", flag: "🇷🇼", role: "Cold Chain + EAC Hub" },
  { name: "Uganda", flag: "🇺🇬", role: "East Africa Network" },
  { name: "Ghana", flag: "🇬🇭", role: "West Africa Gateway" },
  { name: "Kenya", flag: "🇰🇪", role: "East Africa Tech Hub" },
];

export default function StudexHealthPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PartnerTier | null>(null);
  const [vmCount, setVmCount] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [form, setForm] = useState<FormData>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "",
    website: "",
    size: "smb",
    focusAreas: [],
    vmNeeds: "",
    revenue: "",
    message: "",
    agreedToTerms: false,
  });

  // Matrix rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()".split(
        ""
      );
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#5bf4a6";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = `rgba(91, 244, 166, ${Math.random() * 0.5 + 0.5})`;
        ctx.fillText(char, x, y);
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    return () => clearInterval(interval);
  }, []);

  // Clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const saTime = now.toLocaleTimeString("en-ZA", {
        timeZone: "Africa/Johannesburg",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const date = now.toLocaleDateString("en-ZA", {
        timeZone: "Africa/Johannesburg",
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      setCurrentTime(`${saTime} SAST  |  ${date}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const cardStyle = (accent: string) => ({
    background: "linear-gradient(135deg, rgba(30,30,46,0.95), rgba(15,23,42,0.9))",
    border: `1px solid ${accent}33`,
    boxShadow: `0 0 30px ${accent}18, 0 4px 20px rgba(0,0,0,0.5)`,
    transition: "all 0.3s ease",
  });

  const glowText = (color: string) => ({
    textShadow: `0 0 10px ${color}, 0 0 30px ${color}66, 0 0 60px ${color}33`,
  });

  const steps = [
    { label: "Company", num: 1 },
    { label: "Focus Areas", num: 2 },
    { label: "VM Needs", num: 3 },
    { label: "Review & Send", num: 4 },
  ];

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#0F172A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
        <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 600, padding: "2rem" }}>
          <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#5bf4a6", ...glowText("#5bf4a6"), marginBottom: 16 }}>
            APPLICATION RECEIVED
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.7, marginBottom: 32 }}>
            Welcome to <strong style={{ color: "#ff2ec4" }}>Studex Health</strong>,{" "}
            <strong>{form.companyName || "Future Partner"}</strong>.
            <br />
            Our team will review your application and contact{" "}
            <strong>{form.contactName}</strong> at{" "}
            <strong style={{ color: "#5bf4a6" }}>{form.email}</strong> within 24 hours.
          </p>
          <div style={{ ...cardStyle("#5bf4a6"), padding: 24, borderRadius: 16, marginBottom: 24 }}>
            <p style={{ color: "#5bf4a6", fontWeight: 700, marginBottom: 8 }}>
              WHAT HAPPENS NEXT
            </p>
            <div style={{ textAlign: "left", color: "#94a3b8", fontSize: 14, lineHeight: 2 }}>
              <div>📧 Confirmation email sent to your inbox</div>
              <div>🤖 ADAM SMASHER reviewing your application...</div>
              <div>📋 Partnership tier assigned within 4 hours</div>
              <div>💻 VM provisioning begins on Friday launch</div>
              <div>🌍 19-country network access activated</div>
            </div>
          </div>
          <button
            onClick={() => { setSubmitted(false); setStep(0); }}
            style={{ background: "transparent", border: "1px solid #5bf4a6", color: "#5bf4a6", padding: "12px 32px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0F172A", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0 }} />

      {/* Header */}
      <div style={{ position: "relative", zIndex: 10, borderBottom: "1px solid rgba(91,244,166,0.1)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(10px)", background: "rgba(15,23,42,0.8)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #ff2ec4, #5bf4a6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#0F172A" }}>S</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>STUD<span style={{ color: "#ff2ec4" }}>EX</span> HEALTH</div>
            <div style={{ fontSize: 11, color: "#5bf4a6", letterSpacing: 3 }}>AFRICAN PHARMA INTELLIGENCE NETWORK</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: "#5bf4a6" }}>{currentTime}</div>
          <div style={{ fontSize: 11, color: "#64748b" }}>🌍 {COUNTRIES.length} Countries  |  🤖 ADAM SMASHER ACTIVE</div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ position: "relative", zIndex: 1, padding: "80px 32px 40px", textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "inline-block", padding: "6px 20px", borderRadius: 100, border: "1px solid #ff2ec4", color: "#ff2ec4", fontSize: 12, fontWeight: 700, letterSpacing: 3, marginBottom: 24, ...glowText("#ff2ec4") }}>
          🎉 LAUNCHING THIS FRIDAY — LIMITED VM SLOTS AVAILABLE
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.1, marginBottom: 16, background: "linear-gradient(90deg, #fff 0%, #ff2ec4 50%, #5bf4a6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          BUILD YOUR PHARMA EMPIRE<br />ON OUR AI AGENT NETWORK
        </h1>
        <p style={{ fontSize: 20, color: "#94a3b8", lineHeight: 1.7, maxWidth: 700, margin: "0 auto 40px" }}>
          Get your own <strong style={{ color: "#5bf4a6" }}>AI Agent VM</strong> on the Studex Health network.
          Distributed across 19 African countries. Connected to Russia and China corridors.
          <br />
          <strong style={{ color: "#D97706" }}>10 years of Tumelo Ramaphosa in AI + Blockchain.</strong>
        </p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 48 }}>
          {[
            { val: "19", label: "African Countries", color: "#5bf4a6" },
            { val: "4", label: "Russian Pharma Clients", color: "#ff2ec4" },
            { val: "3", label: "VM Tiers Available", color: "#D97706" },
            { val: "24h", label: "VM Provisioning", color: "#5bf4a6" },
          ].map((s) => (
            <div key={s.label} style={{ ...cardStyle(s.color), padding: "24px 16px", borderRadius: 16, textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: s.color, ...glowText(s.color) }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner Tiers */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 32px 60px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 8, color: "#fff" }}>
          CHOOSE YOUR <span style={{ color: "#ff2ec4", ...glowText("#ff2ec4") }}>PARTNERSHIP TIER</span>
        </h2>
        <p style={{ textAlign: "center", color: "#64748b", marginBottom: 40 }}>
          All tiers include access to the Studex Health AI agent network. Launch this Friday.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {PARTNER_TIERS.map((tier) => (
            <div
              key={tier.id}
              onClick={() => { setSelectedTier(tier.id); setStep(1); }}
              style={{
                ...cardStyle(tier.color),
                padding: 32,
                borderRadius: 20,
                cursor: "pointer",
                transform: selectedTier === tier.id ? `scale(1.03)` : "scale(1)",
                border: selectedTier === tier.id ? `2px solid ${tier.color}` : `1px solid ${tier.color}33`,
              }}
            >
              {selectedTier === tier.id && (
                <div style={{ position: "absolute", top: -12, left: 20, background: tier.color, color: "#0F172A", padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 800 }}>SELECTED</div>
              )}
              <div style={{ fontSize: 11, color: tier.color, letterSpacing: 3, fontWeight: 700, marginBottom: 8 }}>{tier.name}</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: tier.color, ...glowText(tier.color) }}>{tier.price}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>{tier.tagline}</div>
              <div style={{ height: 1, background: `${tier.color}22`, marginBottom: 20 }} />
              {tier.perks.map((perk) => (
                <div key={perk} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 14, color: "#cbd5e1" }}>
                  <span style={{ color: tier.color, fontSize: 16 }}>✓</span>
                  {perk}
                </div>
              ))}
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedTier(tier.id); setStep(1); }}
                style={{ marginTop: 24, width: "100%", padding: "12px", borderRadius: 10, background: `${tier.color}20`, border: `1px solid ${tier.color}`, color: tier.color, fontWeight: 700, cursor: "pointer", fontSize: 14 }}
              >
                APPLY NOW →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Step Registration Form */}
      {selectedTier && (
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto 60px", padding: "0 32px" }}>
          <div style={{ ...cardStyle("#ff2ec4"), padding: 32, borderRadius: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
              PARTNER APPLICATION
              <span style={{ color: "#ff2ec4", marginLeft: 12, fontSize: 14, fontWeight: 400 }}>{PARTNER_TIERS.find((t) => t.id === selectedTier)?.name}</span>
            </h2>

            {/* Step indicator */}
            <div style={{ display: "flex", gap: 8, marginBottom: 32, marginTop: 20 }}>
              {steps.map((s) => (
                <div key={s.num} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{
                    height: 4, borderRadius: 2, marginBottom: 8,
                    background: step >= s.num ? "#5bf4a6" : "#1e293b",
                    transition: "all 0.3s",
                    boxShadow: step >= s.num ? "0 0 10px #5bf4a6" : "none"
                  }} />
                  <div style={{ fontSize: 11, color: step >= s.num ? "#5bf4a6" : "#475569", fontWeight: step === s.num - 1 ? 700 : 400 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Step 1: Company Info */}
            {step === 0 && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 6 }}>COMPANY NAME *</label>
                    <input
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      placeholder="e.g. PharmaCare Botswana"
                      style={{ width: "100%", padding: "12px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 14, boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 6 }}>CONTACT NAME *</label>
                    <input
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      placeholder="Dr. Precious Molefe"
                      style={{ width: "100%", padding: "12px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 14, boxSizing: "border-box" }}
                    />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 6 }}>EMAIL *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="p.molefe@pharmacare.co.bw"
                      style={{ width: "100%", padding: "12px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 14, boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 6 }}>PHONE / WHATSAPP</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+267 71 234 567"
                      style={{ width: "100%", padding: "12px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 14, boxSizing: "border-box" }}
                    />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 6 }}>COUNTRY *</label>
                    <select
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 14, boxSizing: "border-box" }}
                    >
                      <option value="">Select country...</option>
                      {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 6 }}>COMPANY SIZE</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {(["startup", "smb", "enterprise"] as CompanySize[]).map((size) => (
                        <button
                          key={size}
                          onClick={() => setForm({ ...form, size })}
                          style={{ flex: 1, padding: "10px 8px", borderRadius: 8, border: `1px solid ${form.size === size ? "#5bf4a6" : "#334155"}`, background: form.size === size ? "#5bf4a618" : "transparent", color: form.size === size ? "#5bf4a6" : "#64748b", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "uppercase" }}
                        >
                          {size === "smb" ? "SMB" : size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Focus Areas */}
            {step === 1 && (
              <div>
                <p style={{ color: "#94a3b8", marginBottom: 20, fontSize: 14 }}>Select all focus areas that apply to your business:</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                  {FOCUS_AREAS.map((area) => (
                    <div
                      key={area.id}
                      onClick={() => {
                        const areas = form.focusAreas.includes(area.id)
                          ? form.focusAreas.filter((a) => a !== area.id)
                          : [...form.focusAreas, area.id];
                        setForm({ ...form, focusAreas: areas });
                      }}
                      style={{
                        padding: "16px",
                        borderRadius: 12,
                        border: `1px solid ${form.focusAreas.includes(area.id) ? "#5bf4a6" : "#334155"}`,
                        background: form.focusAreas.includes(area.id) ? "#5bf4a618" : "transparent",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        transition: "all 0.2s",
                      }}
                    >
                      <span style={{ fontSize: 24 }}>{area.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: form.focusAreas.includes(area.id) ? "#5bf4a6" : "#cbd5e1" }}>{area.label}</div>
                      </div>
                      {form.focusAreas.includes(area.id) && (
                        <span style={{ marginLeft: "auto", color: "#5bf4a6", fontSize: 18 }}>✓</span>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 20 }}>
                  <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 6 }}>WEBSITE / LINKEDIN</label>
                  <input
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https://pharmacare.co.bw"
                    style={{ width: "100%", padding: "12px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 14, boxSizing: "border-box" }}
                  />
                </div>
              </div>
            )}

            {/* Step 3: VM Needs */}
            {step === 2 && (
              <div>
                <p style={{ color: "#94a3b8", marginBottom: 20, fontSize: 14 }}>How many VMs do you need for your team?</p>
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                  <button
                    onClick={() => setVmCount(Math.max(1, vmCount - 1))}
                    style={{ width: 48, height: 48, borderRadius: "50%", background: "#1e293b", border: "1px solid #334155", color: "#5bf4a6", fontSize: 24, cursor: "pointer" }}
                  >−</button>
                  <div style={{ fontSize: 64, fontWeight: 900, color: "#5bf4a6", ...glowText("#5bf4a6"), minWidth: 100, textAlign: "center" }}>{vmCount || 1}</div>
                  <button
                    onClick={() => setVmCount(vmCount + 1)}
                    style={{ width: 48, height: 48, borderRadius: "50%", background: "#1e293b", border: "1px solid #334155", color: "#5bf4a6", fontSize: 24, cursor: "pointer" }}
                  >+</button>
                  <div style={{ color: "#94a3b8", fontSize: 14 }}>
                    {(selectedTier === "founder" ? "FREE (Equity)" : selectedTier === "strategic" ? `$${(vmCount || 1) * 2500}/mo` : `$${(vmCount || 1) * 499}/mo`) + " estimated"}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 6 }}>DESCRIBE YOUR USE CASE</label>
                  <textarea
                    value={form.vmNeeds}
                    onChange={(e) => setForm({ ...form, vmNeeds: e.target.value })}
                    placeholder="e.g. Running 5 AI agents for order tracking, regulatory submissions, and cold chain monitoring across Botswana..."
                    rows={4}
                    style={{ width: "100%", padding: "12px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 14, resize: "vertical", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ marginTop: 16 }}>
                  <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 6 }}>ANNUAL REVENUE (USD)</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                    {["< $500K", "$500K - $5M", "$5M - $50M", "$50M+"].map((r) => (
                      <button
                        key={r}
                        onClick={() => setForm({ ...form, revenue: r })}
                        style={{ padding: "10px 4px", borderRadius: 8, border: `1px solid ${form.revenue === r ? "#D97706" : "#334155"}`, background: form.revenue === r ? "#D9770620" : "transparent", color: form.revenue === r ? "#D97706" : "#64748b", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 3 && (
              <div>
                <div style={{ ...cardStyle("#5bf4a6"), padding: 20, borderRadius: 16, marginBottom: 20 }}>
                  <p style={{ fontSize: 12, color: "#5bf4a6", fontWeight: 700, marginBottom: 12, letterSpacing: 2 }}>APPLICATION REVIEW</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", fontSize: 14 }}>
                    {[
                      ["Company", form.companyName],
                      ["Contact", form.contactName],
                      ["Email", form.email],
                      ["Phone", form.phone || "—"],
                      ["Country", form.country],
                      ["Size", form.size],
                      ["Tier", PARTNER_TIERS.find((t) => t.id === selectedTier)?.name],
                      ["VMs", String(vmCount || 1)],
                      ["Revenue", form.revenue || "—"],
                    ].map(([label, val]) => (
                      <div key={label} style={{ display: "contents" }}>
                        <span style={{ color: "#64748b" }}>{label}:</span>
                        <span style={{ color: "#e2e8f0", fontWeight: 500 }}>{val}</span>
                      </div>
                    ))}
                  </div>
                  {form.focusAreas.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                      <span style={{ color: "#64748b", fontSize: 14 }}>Focus Areas: </span>
                      {form.focusAreas.map((area) => (
                        <span key={area} style={{ display: "inline-block", margin: "2px 4px", padding: "2px 10px", background: "#5bf4a618", border: "1px solid #5bf4a633", borderRadius: 100, fontSize: 12, color: "#5bf4a6" }}>
                          {FOCUS_AREAS.find((f) => f.id === area)?.label}
                        </span>
                      ))}
                    </div>
                  )}
                  {form.vmNeeds && (
                    <div style={{ marginTop: 12, fontSize: 13, color: "#94a3b8" }}>
                      <span style={{ color: "#64748b" }}>Use Case: </span>{form.vmNeeds}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 6 }}>ADDITIONAL MESSAGE (OPTIONAL)</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Anything else you'd like us to know about your company or partnership goals..."
                    rows={3}
                    style={{ width: "100%", padding: "12px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 14, resize: "vertical", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
                  />
                </div>

                <label style={{ display: "flex", alignItems: "flex-start", gap: 12, marginTop: 20, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={form.agreedToTerms}
                    onChange={(e) => setForm({ ...form, agreedToTerms: e.target.checked })}
                    style={{ marginTop: 4, accentColor: "#5bf4a6", width: 18, height: 18 }}
                  />
                  <span style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>
                    I agree to the <strong style={{ color: "#ff2ec4" }}>Studex Health Partner Terms</strong> and authorize Studex Global Markets to contact me about partnership opportunities, VM provisioning, and the Friday launch event.
                  </span>
                </label>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  style={{ flex: 1, padding: "14px", borderRadius: 12, background: "transparent", border: "1px solid #334155", color: "#94a3b8", fontWeight: 600, cursor: "pointer" }}
                >
                  ← BACK
                </button>
              )}
              <button
                onClick={() => {
                  if (step < 3) setStep(step + 1);
                  else handleSubmit();
                }}
                disabled={step === 0 && (!form.companyName || !form.contactName || !form.email || !form.country)}
                style={{
                  flex: 2,
                  padding: "14px",
                  borderRadius: 12,
                  background: step < 3 ? "#5bf4a6" : "#ff2ec4",
                  border: "none",
                  color: "#0F172A",
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: step < 3 ? "pointer" : "pointer",
                  opacity: step === 0 && (!form.companyName || !form.contactName || !form.email || !form.country) ? 0.4 : 1,
                  ...(step === 3 ? glowText("#ff2ec4") : {}),
                  boxShadow: step < 3 ? "0 0 20px #5bf4a644" : "0 0 30px #ff2ec466",
                }}
              >
                {step < 3 ? `CONTINUE →` : "🚀 SUBMIT APPLICATION"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Africa Countries Launch Grid */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto 60px", padding: "0 32px" }}>
        <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, marginBottom: 8, color: "#fff" }}>
          <span style={{ color: "#ff2ec4", ...glowText("#ff2ec4") }}>12 COUNTRIES</span> LAUNCHING THIS FRIDAY
        </h2>
        <p style={{ textAlign: "center", color: "#64748b", marginBottom: 32 }}>
          Government VM partnerships. Cold chain. Research & manufacturing. All connected.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {LAUNCH_COUNTRIES.map((country) => (
            <div key={country.name} style={{ ...cardStyle("#D97706"), padding: "16px", borderRadius: 14, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{country.flag}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{country.name}</div>
              <div style={{ fontSize: 11, color: "#5bf4a6" }}>{country.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(91,244,166,0.1)", padding: "32px", textAlign: "center" }}>
        <p style={{ color: "#475569", fontSize: 13 }}>
          🤖 Powered by ADAM SMASHER | Studex Global Markets | 10 Years of AI Innovation (2016-2026)
        </p>
        <p style={{ color: "#475569", fontSize: 12, marginTop: 8 }}>
          📧 info@studexmeat.com | 🌐 www.studexmeat.com | 📱 +27 11 000 0000
        </p>
      </div>
    </div>
  );
}
