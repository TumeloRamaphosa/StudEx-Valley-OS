"use client";

import { useState, useEffect, useRef } from "react";

const RUSSIAN_CLIENTS = [
  {
    id: "pharmasyntez",
    name: "Pharmasyntez",
    location: "Moscow, Russia",
    founded: 2007,
    employees: "4,000+",
    products: ["TB medicines", "HIV antiretrovirals", "Oncology", "Diabetes", "Antibiotics", "COVID treatments", "Cardiology", "Hepatitis B"],
    vmId: "vm-ru-pharmasyntez-01",
    status: "active" as const,
    focus: "Biopharma manufacturing + Africa distribution corridor",
    exportMarkets: ["South Africa", "Botswana", "Kenya", "Zimbabwe", "Ethiopia", "Mozambique"],
    vmSpecs: { cores: 16, ram: "64GB", gpu: "NVIDIA A100", storage: "500GB SSD" },
    contact: { email: "export@pharmasyntez.com", phone: "+7 495 789-45-67", website: "pharmasyntez.com" },
    annualRevenue: "$420M",
    certifications: ["GMP (Russia)", "WHO Prequalified", "ISO 9001", "ISO 14001"],
    keyPeople: ["Alexey Tretiakov (CEO)", "Maria Sokolova (Export Dir.)"],
    tourDay: "Day 1-3",
  },
  {
    id: "valenta-farm",
    name: "Valenta Farm",
    location: "Moscow, Russia",
    founded: 1999,
    employees: "2,500+",
    products: ["Generic pharmaceuticals", "Cardiovascular drugs", "CNS medications", "Dermatology", "Gastroenterology", "Pain management"],
    vmId: "vm-ru-valenta-01",
    status: "active" as const,
    focus: "Generic drug supply — SA + Southern Africa distribution",
    exportMarkets: ["South Africa", "Botswana", "Namibia", "Zambia"],
    vmSpecs: { cores: 12, ram: "48GB", gpu: "NVIDIA T4", storage: "300GB SSD" },
    contact: { email: "international@valenta-farm.ru", phone: "+7 495 956-12-34", website: "valenta-farm.ru" },
    annualRevenue: "$280M",
    certifications: ["GMP (EU)", "ISO 13485", "WHO GMP"],
    keyPeople: ["Oleg Kolesnikov (CEO)", "Anna Volkova (Int'l Trade)"],
    tourDay: "Day 1-3",
  },
  {
    id: "otc-pharm",
    name: "OTC Pharm",
    location: "Moscow, Russia",
    founded: 1997,
    employees: "3,000+",
    products: ["OTC medicines", "Vitamins", "Dietary supplements", "Baby care", "Oral care", "Pain relief", "Cough & cold", "Dermatology"],
    vmId: "vm-ru-otcpharm-01",
    status: "provisioning" as const,
    focus: "Supplement distribution — SA + Botswana + Eswatini pilot",
    exportMarkets: ["South Africa", "Botswana", "Eswatini"],
    vmSpecs: { cores: 8, ram: "32GB", gpu: "NVIDIA T4", storage: "200GB SSD" },
    contact: { email: "export@otcpharm.ru", phone: "+7 495 925-55-00", website: "otcpharm.ru" },
    annualRevenue: "$310M",
    certifications: ["GMP", "ISO 22000", "Halal Certified", "ISO 9001"],
    keyPeople: ["Viktor Kharlamov (CEO)", "Elena Pavlova (Africa Dir.)"],
    tourDay: "Day 3-5",
  },
  {
    id: "protek",
    name: "Protek",
    location: "Moscow, Russia",
    founded: 1990,
    employees: "5,000+",
    products: ["Medical equipment", "Pharma distribution", "Laboratory supplies", "Hospital furniture", "Diagnostic devices", "Surgical instruments"],
    vmId: "vm-ru-protek-01",
    status: "provisioning" as const,
    focus: "Medical equipment distribution — Africa government tenders",
    exportMarkets: ["South Africa", "Botswana", "Zimbabwe", "Mozambique", "Namibia", "Kenya", "Ghana"],
    vmSpecs: { cores: 16, ram: "64GB", gpu: "NVIDIA A100", storage: "500GB SSD" },
    contact: { email: "africa@protek.group", phone: "+7 495 721-15-00", website: "protek.group" },
    annualRevenue: "$950M",
    certifications: ["ISO 9001", "ISO 13485", "CE Mark", "FDA Registered"],
    keyPeople: ["Dmitry Krivenko (CEO)", "Sergei Orlov (Africa Div.)"],
    tourDay: "Day 3-5",
  },
  {
    id: "art-engineer",
    name: "Art Engineer",
    location: "Russia",
    founded: 2010,
    employees: "500+",
    products: ["Medical devices", "Surgical instruments", "Engineering solutions", "Laboratory equipment", "Hospital infrastructure"],
    vmId: "vm-ru-arteng-01",
    status: "pending" as const,
    focus: "Medical engineering + Africa hospital infrastructure",
    exportMarkets: ["South Africa", "Botswana", "Kenya", "Rwanda"],
    vmSpecs: { cores: 8, ram: "32GB", gpu: "NVIDIA T4", storage: "200GB SSD" },
    contact: { email: "info@art-engineer.ru", phone: "+7 495 123-45-67", website: "art-engineer.ru" },
    annualRevenue: "$80M",
    certifications: ["ISO 9001", "CE Mark"],
    keyPeople: ["Artem Volkov (CEO)"],
    tourDay: "Day 5-7",
  },
  {
    id: "geropharm",
    name: "Geropharm",
    location: "St. Petersburg, Russia",
    founded: 2001,
    employees: "1,200+",
    products: ["Diabetes care", "Neurology", "Oncology", "Endocrinology", "Insulin analogues", "GLP-1 analogues", "Monoclonal antibodies"],
    vmId: "vm-ru-geropharm-01",
    status: "pending" as const,
    focus: "Diabetes + neurology — Africa chronic disease management",
    exportMarkets: ["South Africa", "Kenya", "Nigeria", "Ghana", "Ethiopia"],
    vmSpecs: { cores: 12, ram: "48GB", gpu: "NVIDIA A100", storage: "400GB SSD" },
    contact: { email: "export@geropharm.ru", phone: "+7 812 703-00-00", website: "geropharm.ru" },
    annualRevenue: "$180M",
    certifications: ["GMP (EU)", "ISO 9001", "WHO GMP", "ICH Q7"],
    keyPeople: ["Pavel Malakhov (CEO)", "Natalia Morozova (Int'l)"],
    tourDay: "Day 7-10 (St. Petersburg)",
  },
];

const TOUR_DAYS = [
  { day: 1, city: "Moscow Arrival", activities: ["Airport pickup", "Hotel check-in", "Welcome dinner — Pharmasyntez team", "ADAM SMASHER VM provisioning demo"], location: "Moscow" },
  { day: 2, city: "Pharmasyntez HQ", activities: ["Factory tour — production lines 1-5", "R&D centre visit", "Export documentation meeting", "AfCFTA compliance agent demo"], location: "Moscow" },
  { day: 3, city: "Valenta Farm + OTC Pharm", activities: ["Valenta Farm manufacturing tour", "OTC Pharm supplement line visit", "Joint partnership meeting", "VM provisioning: vm-ru-valenta-01 + vm-ru-otcpharm-01"], location: "Moscow" },
  { day: 4, city: "Protek + Art Engineer", activities: ["Protek medical equipment showroom", "Government tender process workshop", "Art Engineer engineering review", "VM provisioning: vm-ru-protek-01"], location: "Moscow" },
  { day: 5, city: "Trade Office + Wrap-up", activities: ["Russia-Africa Trade Office meetings", "Pharmasyntez Africa distribution agreement signing", "Russia Pharma AI Conference", "VM full network test — all 4 active VMs"], location: "Moscow" },
  { day: 6, city: "Travel to St. Petersburg", activities: ["High-speed Sapsan train", "Geropharm facility tour", "Diabetes + chronic disease strategy session", "VM provisioning: vm-ru-geropharm-01"], location: "St. Petersburg" },
  { day: 7, city: "Geropharm R&D + Cultural", activities: ["Geropharm clinical trials centre", "Neurology + diabetes Africa briefing", "VM provisioning: vm-ru-arteng-01 (remote)", "Evening: St. Petersburg cultural tour"], location: "St. Petersburg" },
  { day: 8, city: "Final Meetings + Departure", activities: ["Russia-Africa Chamber of Commerce meetings", "VM final integration test", "Partnership agreements review", "Departure"], location: "St. Petersburg" },
];

const statusConfig: Record<string, { color: string; bg: string; label: string; glow: string }> = {
  active: { color: "#5bf4a6", bg: "#5bf4a618", label: "● ACTIVE", glow: "0 0 12px #5bf4a655" },
  provisioning: { color: "#D97706", bg: "#D9770620", label: "◐ PROVISIONING", glow: "0 0 12px #D9770655" },
  pending: { color: "#64748b", bg: "#334155", label: "○ PENDING", glow: "none" },
};

export default function RussiaVMsPage() {
  const [activeClient, setActiveClient] = useState(RUSSIAN_CLIENTS[0]);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [canvasTime, setCanvasTime] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const t = now.toLocaleTimeString("en-ZA", { timeZone: "Europe/Moscow", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
      setCanvasTime(`MSK ${t} | ${now.toLocaleDateString("en-GB", { timeZone: "Europe/Moscow", day: "numeric", month: "short" })}`);
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  // Matrix rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ🇷🇺ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = `rgba(255, 46, 196, ${Math.random() * 0.6 + 0.2})`;
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const vmTotal = RUSSIAN_CLIENTS.length;
  const vmActive = RUSSIAN_CLIENTS.filter(c => c.status === "active").length;
  const vmProvisioning = RUSSIAN_CLIENTS.filter(c => c.status === "provisioning").length;
  const vmPending = RUSSIAN_CLIENTS.filter(c => c.status === "pending").length;

  return (
    <div style={{ minHeight: "100vh", background: "#0F172A", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0 }} />

      {/* HEADER */}
      <div style={{ position: "relative", zIndex: 10, borderBottom: "1px solid rgba(255,46,196,0.15)", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(10px)", background: "rgba(15,23,42,0.9)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 32 }}>🇷🇺</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>RUSSIA PHARMA <span style={{ color: "#ff2ec4" }}>VM NETWORK</span></div>
            <div style={{ fontSize: 10, color: "#ff2ec4", letterSpacing: 3 }}>6 AI AGENT VMs — RUSSIAN PHARMACEUTICAL CLIENTS</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "monospace", fontSize: 14, color: "#ff2ec4" }}>{canvasTime}</div>
            <div style={{ fontSize: 10, color: "#64748b" }}>Moscow Standard Time</div>
          </div>
          <div style={{ width: 1, height: 32, background: "#1e293b" }} />
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { val: String(vmActive), label: "Active", color: "#5bf4a6" },
              { val: String(vmProvisioning), label: "Provisioning", color: "#D97706" },
              { val: String(vmPending), label: "Pending", color: "#64748b" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: s.color, textShadow: `0 0 10px ${s.color}` }}>{s.val}</div>
                <div style={{ fontSize: 9, color: "#64748b" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "24px 32px 60px" }}>

        {/* HERO */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-block", padding: "5px 18px", border: "1px solid #ff2ec4", borderRadius: 100, color: "#ff2ec4", fontSize: 11, fontWeight: 700, letterSpacing: 3, marginBottom: 16, textShadow: "0 0 20px #ff2ec4" }}>
            🇷🇺 RUSSIA PHARMA TECH TOUR 2026 — JULY 20-30
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 900, lineHeight: 1.1, marginBottom: 12, background: "linear-gradient(90deg, #ff2ec4, #fff, #ff2ec4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            6 RUSSIAN PHARMA CLIENTS<br />ONE AI VM NETWORK
          </h1>
          <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.7, maxWidth: 700, margin: "0 auto" }}>
            Pharmasyntez, Valenta Farm, OTC Pharm, Protek, Art Engineer, Geropharm — each on their own AI Agent VM.
            Russia → Africa corridor running through ADAM SMASHER. Tour: Moscow + St. Petersburg, July 20-30, 2026.
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 32 }}>
          {RUSSIAN_CLIENTS.map(c => {
            const cfg = statusConfig[c.status];
            return (
              <div
                key={c.id}
                onClick={() => setActiveClient(c)}
                style={{
                  background: "rgba(30,30,46,0.9)",
                  border: `2px solid ${activeClient.id === c.id ? "#ff2ec4" : cfg.color + "33"}`,
                  borderRadius: 14, padding: "18px 12px", textAlign: "center",
                  cursor: "pointer", boxShadow: activeClient.id === c.id ? "0 0 30px #ff2ec444" : `0 0 15px ${cfg.color}15`,
                  transition: "all 0.3s",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>🇷🇺</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                <div style={{ fontSize: 9, color: "#64748b", marginBottom: 6 }}>{c.location.split(",")[0]}</div>
                <span style={{ background: cfg.bg, color: cfg.color, padding: "2px 8px", borderRadius: 100, fontSize: 9, fontWeight: 800, letterSpacing: 1, boxShadow: cfg.glow }}>{cfg.label}</span>
              </div>
            );
          })}
        </div>

        {/* Selected Client Detail */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 32 }}>
          {/* Left: Company Info */}
          <div style={{ background: "rgba(30,30,46,0.95)", border: "2px solid #ff2ec455", borderRadius: 16, padding: 24, boxShadow: "0 0 40px #ff2ec420" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>{activeClient.name}</div>
                <div style={{ fontSize: 13, color: "#94a3b8" }}>📍 {activeClient.location}</div>
              </div>
              <span style={{ background: statusConfig[activeClient.status].bg, color: statusConfig[activeClient.status].color, padding: "5px 14px", borderRadius: 100, fontSize: 11, fontWeight: 800, letterSpacing: 1, boxShadow: statusConfig[activeClient.status].glow }}>
                {statusConfig[activeClient.status].label}
              </span>
            </div>
            <div style={{ fontSize: 10, fontFamily: "monospace", color: "#475569", marginBottom: 12 }}>VM: {activeClient.vmId}</div>
            <div style={{ fontSize: 13, color: "#5bf4a6", marginBottom: 8, fontWeight: 600 }}>🎯 {activeClient.focus}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px", fontSize: 12, marginBottom: 16 }}>
              <><span style={{ color: "#64748b" }}>Founded:</span> <span style={{ color: "#e2e8f0" }}>{activeClient.founded}</span></>
              <><span style={{ color: "#64748b" }}>Employees:</span> <span style={{ color: "#e2e8f0" }}>{activeClient.employees}</span></>
              <><span style={{ color: "#64748b" }}>Revenue:</span> <span style={{ color: "#D97706" }}>{activeClient.annualRevenue}</span></>
              <><span style={{ color: "#64748b" }}>Tour Day:</span> <span style={{ color: "#ff2ec4" }}>{activeClient.tourDay}</span></>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#ff2ec4", marginBottom: 8 }}>📧 CONTACT</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>{activeClient.contact.email}</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>{activeClient.contact.phone}</div>
            <div style={{ fontSize: 11, color: "#5bf4a6" }}>{activeClient.contact.website}</div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#D97706", marginBottom: 8 }}>👔 KEY PEOPLE</div>
              {activeClient.keyPeople.map(p => (
                <div key={p} style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3 }}>{p}</div>
              ))}
            </div>
          </div>

          {/* Middle: Products + Africa Markets */}
          <div>
            <div style={{ background: "rgba(30,30,46,0.95)", border: "1px solid #ff2ec433", borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#ff2ec4", marginBottom: 12 }}>💊 PRODUCT PORTFOLIO</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {activeClient.products.map(p => (
                  <span key={p} style={{ background: "#ff2ec415", border: "1px solid #ff2ec433", borderRadius: 100, padding: "3px 10px", fontSize: 11, color: "#cbd5e1" }}>{p}</span>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(30,30,46,0.95)", border: "1px solid #5bf4a633", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#5bf4a6", marginBottom: 12 }}>🌍 AFRICA EXPORT MARKETS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {activeClient.exportMarkets.map(m => (
                  <span key={m} style={{ background: "#5bf4a618", border: "1px solid #5bf4a644", borderRadius: 8, padding: "5px 12px", fontSize: 12, color: "#5bf4a6", fontWeight: 600 }}>
                    {m}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: "10px", background: "#5bf4a610", borderRadius: 8, fontSize: 11, color: "#94a3b8", lineHeight: 1.6 }}>
                AfCFTA preferential tariffs applied via ADAM SMASHER compliance agent on {activeClient.vmId}
              </div>
            </div>
          </div>

          {/* Right: VM Specs + Certifications */}
          <div>
            <div style={{ background: "rgba(30,30,46,0.95)", border: "1px solid #D9770644", borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#D97706", marginBottom: 12 }}>🤖 VM CONFIGURATION</div>
              {[
                ["VM ID", activeClient.vmId],
                ["CPU Cores", String(activeClient.vmSpecs.cores)],
                ["RAM", activeClient.vmSpecs.ram],
                ["GPU", activeClient.vmSpecs.gpu],
                ["Storage", activeClient.vmSpecs.storage],
                ["OS", "Linux + QwenPaw"],
                ["Status", activeClient.status === "active" ? "✅ Running" : activeClient.status === "provisioning" ? "⚙️ Deploying..." : "⏳ Pending"],
                ["Agents Active", activeClient.status === "active" ? "3 agents running" : activeClient.status === "provisioning" ? "2 agents deploying" : "0 — pending"],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginBottom: 5, paddingBottom: 5, borderBottom: "1px solid #1e293b" }}>
                  <span>{label}:</span>
                  <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(30,30,46,0.95)", border: "1px solid #5bf4a633", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#5bf4a6", marginBottom: 10 }}>✅ CERTIFICATIONS</div>
              {activeClient.certifications.map(cert => (
                <div key={cert} style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#5bf4a6" }}>✓</span>{cert}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Russia Tour Itinerary */}
        <div>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#ff2ec4", textShadow: "0 0 20px #ff2ec4", marginBottom: 4 }}>
              ✈️ RUSSIA PHARMA TECH TOUR 2026
            </h2>
            <p style={{ color: "#64748b", fontSize: 13 }}>July 20-30 · Moscow + St. Petersburg · 10 days · 8-person delegation</p>
          </div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 12 }}>
            {TOUR_DAYS.map(day => (
              <div
                key={day.day}
                onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                style={{
                  minWidth: 200,
                  background: activeDay === day.day ? "#ff2ec420" : "rgba(30,30,46,0.9)",
                  border: `2px solid ${activeDay === day.day ? "#ff2ec4" : "#1e293b"}`,
                  borderRadius: 16, padding: 18, cursor: "pointer",
                  boxShadow: activeDay === day.day ? "0 0 25px #ff2ec433" : "none",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 11, color: "#64748b" }}>DAY {day.day}</div>
                  <div style={{ fontSize: 12, color: "#ff2ec4", fontWeight: 700 }}>{day.location.split(" ")[0]}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{day.city}</div>
                <div style={{ fontSize: 10, color: "#64748b" }}>{day.activities.length} activities</div>
                {activeDay === day.day && (
                  <div style={{ marginTop: 10, borderTop: "1px solid #1e293b", paddingTop: 10 }}>
                    {day.activities.map(a => (
                      <div key={a} style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4, display: "flex", alignItems: "flex-start", gap: 5 }}>
                        <span style={{ color: "#ff2ec4", flexShrink: 0 }}>→</span>{a}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Network diagram */}
        <div style={{ marginTop: 24 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#5bf4a6", textShadow: "0 0 15px #5bf4a6" }}>
              THE RUSSIA → AFRICA PHARMA CORRIDOR
            </h2>
          </div>
          <div style={{ background: "rgba(30,30,46,0.95)", border: "1px solid #ff2ec433", borderRadius: 16, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
              {/* Russia side */}
              <div style={{ background: "#ff2ec415", border: "2px solid #ff2ec455", borderRadius: 14, padding: "16px 20px", textAlign: "center", minWidth: 180 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🇷🇺</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#ff2ec4" }}>RUSSIA</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>6 Pharma Clients</div>
                <div style={{ fontSize: 10, color: "#64748b" }}>Moscow + St. Petersburg</div>
              </div>
              <div style={{ fontSize: 28, color: "#ff2ec4", padding: "0 16px" }}>→</div>
              {/* ADAM SMASHER */}
              <div style={{ background: "#5bf4a618", border: "2px solid #5bf4a655", borderRadius: 14, padding: "16px 20px", textAlign: "center", minWidth: 200, boxShadow: "0 0 30px #5bf4a633" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🤖</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#5bf4a6" }}>ADAM SMASHER</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>Studex Valley OS</div>
                <div style={{ fontSize: 10, color: "#5bf4a6" }}>VM Network Command</div>
              </div>
              <div style={{ fontSize: 28, color: "#5bf4a6", padding: "0 16px" }}>→</div>
              {/* SA Hub */}
              <div style={{ background: "#D9770620", border: "2px solid #D9770666", borderRadius: 14, padding: "16px 20px", textAlign: "center", minWidth: 180 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🇿🇦</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#D97706" }}>SOUTH AFRICA</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>JHB + Cape Town</div>
                <div style={{ fontSize: 10, color: "#64748b" }}>Research + Manufacturing</div>
              </div>
              <div style={{ fontSize: 28, color: "#D97706", padding: "0 16px" }}>→</div>
              {/* Africa */}
              <div style={{ background: "#334155", border: "2px solid #5bf4a644", borderRadius: 14, padding: "16px 20px", textAlign: "center", minWidth: 180 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🌍</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#5bf4a6" }}>PAN-AFRICA</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>23 Countries</div>
                <div style={{ fontSize: 10, color: "#64748b" }}>AfCFTA corridors</div>
              </div>
            </div>
            <div style={{ marginTop: 16, padding: "12px 16px", background: "#1e293b", borderRadius: 10, fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
              🇷🇺 Russian pharma products → 🇿🇦 SA hub (research + manufacturing + cold chain) → 🌍 Africa distribution (Botswana, Eswatini, Mozambique, Zimbabwe, Namibia, Kenya, Rwanda, Nigeria, Ghana, Ethiopia)
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,46,196,0.1)", padding: "20px 32px", textAlign: "center" }}>
        <p style={{ color: "#475569", fontSize: 12 }}>
          🤖 Powered by ADAM SMASHER | 🇷🇺 6 Russian Pharma VMs | 🇿🇦 Studex Health Command — Johannesburg + Cape Town
        </p>
      </div>
    </div>
  );
}
