"use client";

import { useState, useEffect, useRef } from "react";

const COUNTRIES = [
  // Phase 1: South Africa (core)
  {
    code: "ZA", name: "South Africa", flag: "🇿🇦", capital: "Johannesburg / Cape Town",
    status: "active" as const, type: "core" as const, vmCount: 3, partners: 8,
    focus: ["Research", "Manufacturing", "Cold chain", "Distribution hub"],
    facilities: [
      { name: "Studex Health HQ", city: "Johannesburg", type: "Command + Distribution" },
      { name: "Cape Town Cold Chain", city: "Cape Town", type: "Cold storage + Manufacturing" },
      { name: "Tygerberg Research Lab", city: "Cape Town", type: "R&D + Quality control" },
    ],
    universities: ["University of Witwatersrand", "University of Cape Town", "UKZN", "Stellenbosch University"],
    timeline: "Active — Q3 2026: 3rd facility opens",
    contacts: { ministry: "National Department of Health", email: "info@health.gov.za", sahpra: "SAHPRA", sahpraEmail: "info@sahpra.org.za" },
    afcfta: "Full member — preferential tariffs active",
    population: "60M", gdpPerCapita: "$6,000", pharmaMarket: "$3.5B", notes: "Primary hub. SAHPRA regulated. 8 partner companies in network."
  },
  // Phase 2: SADC
  {
    code: "BW", name: "Botswana", flag: "🇧🇼", capital: "Gaborone",
    status: "in-negotiation" as const, type: "sadc" as const, vmCount: 1, partners: 2,
    focus: ["Government VM", "Pharma distribution", "Tender management"],
    facilities: [
      { name: "Botswana Health VM Node", city: "Gaborone", type: "Government AI + Distribution" },
    ],
    universities: ["University of Botswana"],
    timeline: "Negotiation: Q4 2026 — Government VM signing + SADC Forum (Sep 2026)",
    contacts: { ministry: "Ministry of Health & Wellness", email: "prmd@gov.bw", sahpra: "PPB", sahpraEmail: "info@ppbbw.com" },
    afcfta: "Full member — Botswana hub for SADC corridor",
    population: "2.4M", gdpPerCapita: "$7,200", pharmaMarket: "$180M", notes: "Government VM priority. SADC hub. Sep 2026 Gaborone conference."
  },
  {
    code: "SZ", name: "Eswatini", flag: "🇸🇿", capital: "Mbabane",
    status: "exploring" as const, type: "sadc" as const, vmCount: 1, partners: 1,
    focus: ["SADC corridor entry", "Distribution", "Healthcare access"],
    facilities: [],
    universities: ["University of Swaziland"],
    timeline: "Exploring: 2027 — SADC expansion",
    contacts: { ministry: "Ministry of Health", email: "info@swazihealth.co.sz", sahpra: "SWAZIMED", sahpraEmail: "" },
    afcfta: "Full member",
    population: "1.2M", gdpPerCapita: "$4,000", pharmaMarket: "$60M", notes: "Small market. SADC gateway. Supplement distribution pilot with OTC Pharm."
  },
  {
    code: "MZ", name: "Mozambique", flag: "🇲🇿", capital: "Maputo",
    status: "exploring" as const, type: "sadc" as const, vmCount: 1, partners: 1,
    focus: ["Port logistics", "Distribution hub", "Cold chain"],
    facilities: [
      { name: "Maputo Port Pharma Hub", city: "Maputo", type: "Import + Distribution" },
    ],
    universities: ["Universidade Eduardo Mondlane"],
    timeline: "Exploring: 2027 — Port logistics facility",
    contacts: { ministry: "Ministry of Health", email: "misaude@misaude.gov.mz", sahpra: "CPHAR", sahpraEmail: "" },
    afcfta: "Full member — Maputo port critical for imports",
    population: "33M", gdpPerCapita: "$500", pharmaMarket: "$220M", notes: "Port access for Russia + India imports. AfCFTA logistics corridor."
  },
  {
    code: "ZW", name: "Zimbabwe", flag: "🇿🇼", capital: "Harare",
    status: "exploring" as const, type: "sadc" as const, vmCount: 1, partners: 1,
    focus: ["Regional pharma", "Chronic disease", "Distribution"],
    facilities: [
      { name: "Harare Pharma Hub", city: "Harare", type: "Distribution + Chronic disease management" },
    ],
    universities: ["University of Zimbabwe"],
    timeline: "Exploring: 2027 — Harare hub + Geropharm chronic disease program",
    contacts: { ministry: "Ministry of Health & Child Care", email: "mohcc@gov.zw", sahpra: "MCAZ", sahpraEmail: "info@mcaz.co.zw" },
    afcfta: "Full member",
    population: "16M", gdpPerCapita: "$1,200", pharmaMarket: "$350M", notes: "Chronic disease focus (diabetes, HIV). Geropharm partnership opportunity."
  },
  {
    code: "NA", name: "Namibia", flag: "🇳🇦", capital: "Windhoek",
    status: "exploring" as const, type: "sadc" as const, vmCount: 1, partners: 1,
    focus: ["SADC corridor", "Walvis Bay port", "Distribution"],
    facilities: [
      { name: "Walvis Bay Logistics Hub", city: "Walvis Bay", type: "Port cold chain + Distribution" },
    ],
    universities: ["Namibia University of Science & Technology"],
    timeline: "Exploring: 2027 — Walvis Bay port cold chain",
    contacts: { ministry: "Ministry of Health & Social Services", email: "info@mhss.gov.na", sahpra: "N Namibia Pharmacy Board", sahpraEmail: "" },
    afcfta: "Full member — Walvis Bay critical for Atlantic imports",
    population: "2.6M", gdpPerCapita: "$5,000", pharmaMarket: "$120M", notes: "Walvis Bay port for Atlantic shipping routes. Cold chain hub."
  },
  // Phase 3: East Africa
  {
    code: "RW", name: "Rwanda", flag: "🇷🇼", capital: "Kigali",
    status: "in-negotiation" as const, type: "east-africa" as const, vmCount: 2, partners: 3,
    focus: ["EAC cold chain hub", "Research", "AI health tech"],
    facilities: [
      { name: "Kigali Cold Chain Facility", city: "Kigali", type: "Temperature-controlled storage + EAC hub" },
      { name: "EAC Health AI Centre", city: "Kigali", type: "AI research + VM network" },
    ],
    universities: ["Kigali Medical University", "University of Rwanda"],
    timeline: "Aug 12-14: Rwanda Health AI Expo | Dec 5: Cold chain opening",
    contacts: { ministry: "Ministry of Health", email: "info@moh.gov.rw", sahpra: "Rwanda FDA", sahpraEmail: "info@rwandafda.gov.rw" },
    afcfta: "Full member — EAC hub priority",
    population: "13M", gdpPerCapita: "$900", pharmaMarket: "$140M", notes: "PRIORITY: Cold chain hub for EAC. Rwanda FDA fast-tracks approvals. EAC ministers conference."
  },
  {
    code: "UG", name: "Uganda", flag: "🇺🇬", capital: "Kampala",
    status: "exploring" as const, type: "east-africa" as const, vmCount: 1, partners: 1,
    focus: ["EAC network", "Kampala distribution", "Chronic disease"],
    facilities: [
      { name: "Kampala Pharma Hub", city: "Kampala", type: "EAC distribution + Research" },
    ],
    universities: ["Makerere University"],
    timeline: "Exploring: 2027 — EAC expansion",
    contacts: { ministry: "Ministry of Health", email: "info@health.go.ug", sahpra: "NDA Uganda", sahpraEmail: "info@nda.or.ug" },
    afcfta: "Full member — EAC trade bloc",
    population: "48M", gdpPerCapita: "$950", pharmaMarket: "$280M", notes: "Large market. Makerere University research partnership."
  },
  {
    code: "KE", name: "Kenya", flag: "🇰🇪", capital: "Nairobi",
    status: "in-negotiation" as const, type: "east-africa" as const, vmCount: 2, partners: 2,
    focus: ["East Africa tech hub", "Pharma corridor", "AI health"],
    facilities: [
      { name: "Nairobi Health Tech Hub", city: "Nairobi", type: "Tech + Distribution + AI" },
    ],
    universities: ["University of Nairobi", "Kenya Medical Research Institute"],
    timeline: "Oct 8-10: Nairobi Health Tech AI Expo | Kenya VM partner signing",
    contacts: { ministry: "Ministry of Health", email: "ps@health.go.ke", sahpra: "PPB Kenya", sahpraEmail: "info@pbpb.go.ke" },
    afcfta: "Full member — Kenya leading EAC pharmaceutical market",
    population: "55M", gdpPerCapita: "$1,800", pharmaMarket: "$600M", notes: "Oct 2026 Nairobi Expo. Kenya Pharma Board meetings. Tech hub for East Africa."
  },
  {
    code: "ET", name: "Ethiopia", flag: "🇪🇹", capital: "Addis Ababa",
    status: "exploring" as const, type: "east-africa" as const, vmCount: 1, partners: 1,
    focus: ["Emerging market", "Addis Ababa hub", "Growth potential"],
    facilities: [
      { name: "Addis Pharma Hub", city: "Addis Ababa", type: "Distribution + Manufacturing" },
    ],
    universities: ["Addis Ababa University"],
    timeline: "Exploring: 2027 — Ethiopia expansion",
    contacts: { ministry: "Ministry of Health", email: "info@moh.gov.et", sahpra: "EFDA", sahpraEmail: "" },
    afcfta: "Full member",
    population: "130M", gdpPerCapita: "$1,000", pharmaMarket: "$250M", notes: "Largest East African population. Rapidly growing market. Geropharm diabetes program opportunity."
  },
  // Phase 3: West Africa
  {
    code: "GH", name: "Ghana", flag: "🇬🇭", capital: "Accra",
    status: "exploring" as const, type: "west-africa" as const, vmCount: 1, partners: 2,
    focus: ["West Africa gateway", "Accra hub", "Manufacturing"],
    facilities: [
      { name: "Accra West Africa Hub", city: "Accra", type: "Distribution + Manufacturing" },
    ],
    universities: ["University of Ghana", "Kwame Nkrumah University"],
    timeline: "Nov 20: Accra West Africa Summit — Ghana VM partner signing",
    contacts: { ministry: "Ministry of Health", email: "moh@moh.gov.gh", sahpra: "FDA Ghana", sahpraEmail: "info@fdaghana.gov.gh" },
    afcfta: "Full member — AfCFTA headquarters",
    population: "34M", gdpPerCapita: "$2,200", pharmaMarket: "$400M", notes: "AfCFTA HQ in Accra. Nov 2026 West Africa Summit. Ghana FDA straightforward."
  },
  {
    code: "NG", name: "Nigeria", flag: "🇳🇬", capital: "Lagos / Abuja",
    status: "exploring" as const, type: "west-africa" as const, vmCount: 2, partners: 2,
    focus: ["Largest market", "Lagos + Abuja", "Manufacturing"],
    facilities: [
      { name: "Lagos Pharma Hub", city: "Lagos", type: "Distribution + Manufacturing" },
      { name: "Abuja Health Centre", city: "Abuja", type: "Government + Research" },
    ],
    universities: ["University of Lagos", "Ahmadu Bello University"],
    timeline: "Exploring: 2027 — Nigeria largest market entry",
    contacts: { ministry: "Ministry of Health", email: "info@health.gov.ng", sahpra: "NAFDAC", sahpraEmail: "office@/nafdc.gov.ng" },
    afcfta: "Full member — 200M+ population, largest pharma market in Africa",
    population: "220M", gdpPerCapita: "$2,100", pharmaMarket: "$1.2B", notes: "CRITICAL: Largest pharma market in Africa. NAFDAC strict but navigable."
  },
  {
    code: "ZM", name: "Zambia", flag: "🇿🇲", capital: "Lusaka",
    status: "exploring" as const, type: "sadc" as const, vmCount: 1, partners: 1,
    focus: ["Copperbelt route", "Trade corridor", "Lusaka hub"],
    facilities: [
      { name: "Lusaka Pharma Hub", city: "Lusaka", type: "Trade corridor + Distribution" },
    ],
    universities: ["University of Zambia"],
    timeline: "Exploring: 2027 — Zambia copperbelt trade route",
    contacts: { ministry: "Ministry of Health", email: "moh@moh.gov.zm", sahpra: "ZAMRA", sahpraEmail: "info@zamra.co.zm" },
    afcfta: "Full member",
    population: "20M", gdpPerCapita: "$1,500", pharmaMarket: "$200M", notes: "Copperbelt trade route. ZAMRA regulatory body."
  },
  {
    code: "MW", name: "Malawi", flag: "🇲🇼", capital: "Lilongwe",
    status: "exploring" as const, type: "sadc" as const, vmCount: 1, partners: 1,
    focus: ["Lake distribution", "Lilongwe + Blantyre", "Healthcare access"],
    facilities: [
      { name: "Lilongwe Distribution Hub", city: "Lilongwe", type: "Distribution + Lake access" },
    ],
    universities: ["University of Malawi"],
    timeline: "Exploring: 2027 — Malawi pharma network",
    contacts: { ministry: "Ministry of Health", email: "info@health.gov.mw", sahpra: "PPB Malawi", sahpraEmail: "" },
    afcfta: "Full member",
    population: "21M", gdpPerCapita: "$400", pharmaMarket: "$80M", notes: "Lake Malawi access. Small market. Healthcare access focus."
  },
  // North Africa
  {
    code: "EG", name: "Egypt", flag: "🇪🇬", capital: "Cairo",
    status: "exploring" as const, type: "north-africa" as const, vmCount: 1, partners: 1,
    focus: ["Cairo hub", "Alexandria port", "North Africa gateway"],
    facilities: [
      { name: "Cairo Pharma Hub", city: "Cairo", type: "Distribution + North Africa HQ" },
    ],
    universities: ["Cairo University", "American University in Cairo"],
    timeline: "Exploring: 2027-2028 — North Africa entry",
    contacts: { ministry: "Ministry of Health", email: "info@mohealth.gov.eg", sahpra: "EDA", sahpraEmail: "" },
    afcfta: "Full member",
    population: "110M", gdpPerCapita: "$3,500", pharmaMarket: "$2.5B", notes: "Largest North African pharma market. EDA regulatory authority."
  },
  {
    code: "MA", name: "Morocco", flag: "🇲🇦", capital: "Rabat",
    status: "exploring" as const, type: "north-africa" as const, vmCount: 1, partners: 1,
    focus: ["Casablanca pharma hub", "Africa export", "Manufacturing"],
    facilities: [
      { name: "Casablanca Pharma Hub", city: "Casablanca", type: "Manufacturing + Export hub" },
    ],
    universities: ["University of Rabat", "Mohammed V University"],
    timeline: "Exploring: 2027-2028 — Morocco manufacturing hub",
    contacts: { ministry: "Ministry of Health", email: "contact@sante.gov.ma", sahpra: "MAPRIM", sahpraEmail: "" },
    afcfta: "Full member",
    population: "37M", gdpPerCapita: "$3,800", pharmaMarket: "$1.8B", notes: "Morocco-EU trade agreements. Strong manufacturing base."
  },
  {
    code: "TN", name: "Tunisia", flag: "🇹🇳", capital: "Tunis",
    status: "exploring" as const, type: "north-africa" as const, vmCount: 1, partners: 1,
    focus: ["Med tech manufacturing", "Tunis hub", "EU export"],
    facilities: [
      { name: "Tunis Med Tech Hub", city: "Tunis", type: "Medical device manufacturing" },
    ],
    universities: ["University of Tunis"],
    timeline: "Exploring: 2027-2028 — Tunisia med tech",
    contacts: { ministry: "Ministry of Health", email: "contact@gnm.tn", sahpra: "DNPM", sahpraEmail: "" },
    afcfta: "Full member",
    population: "12M", gdpPerCapita: "$3,500", pharmaMarket: "$600M", notes: "Medical device manufacturing hub. Tunisia-France connections."
  },
  {
    code: "CV", name: "Cape Verde", flag: "🇨🇻", capital: "Praia",
    status: "exploring" as const, type: "west-africa" as const, vmCount: 1, partners: 1,
    focus: ["Island cold chain", "Atlantic gateway", "Port distribution"],
    facilities: [
      { name: "Praia Island Cold Chain", city: "Praia", type: "Island cold chain + Atlantic gateway" },
    ],
    universities: ["University of Cape Verde"],
    timeline: "Exploring: 2027-2028 — Cape Verde island hub",
    contacts: { ministry: "Ministry of Health", email: "ms@ms.gov.cv", sahpra: "INFARMED CV", sahpraEmail: "" },
    afcfta: "Full member",
    population: "0.6M", gdpPerCapita: "$3,500", pharmaMarket: "$30M", notes: "Atlantic island gateway. Cold chain for island supply. Strategic maritime position."
  },
  {
    code: "TZ", name: "Zanzibar", flag: "🇿🇯", capital: "Zanzibar City",
    status: "exploring" as const, type: "east-africa" as const, vmCount: 1, partners: 1,
    focus: ["Island market", "Indian Ocean hub", "Tourism health"],
    facilities: [
      { name: "Zanzibar Island Health Hub", city: "Zanzibar City", type: "Island distribution + Tourism health" },
    ],
    universities: ["State University of Zanzibar"],
    timeline: "Exploring: 2027 — Zanzibar island expansion",
    contacts: { ministry: "Ministry of Health Zanzibar", email: "info@whiz.go.tz", sahpra: "TFDA", sahpraEmail: "" },
    afcfta: "Full member (part of Tanzania)",
    population: "1.9M", gdpPerCapita: "$1,000", pharmaMarket: "$40M", notes: "Island tourism health. Indian Ocean trade hub."
  },
];

const PHASES = [
  { id: "all", label: "All Countries", color: "#94a3b8", countries: 19 },
  { id: "core", label: "Phase 1: South Africa", color: "#ff2ec4", countries: 1 },
  { id: "sadc", label: "Phase 2: SADC Neighbours", color: "#5bf4a6", countries: 6 },
  { id: "east-africa", label: "Phase 3: East Africa", color: "#D97706", countries: 4 },
  { id: "west-africa", label: "Phase 3: West Africa", color: "#D97706", countries: 3 },
  { id: "north-africa", label: "Phase 4: North Africa", color: "#5bf4a6", countries: 3 },
];

const STATUS_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  active: { color: "#5bf4a6", bg: "#5bf4a618", label: "● ACTIVE" },
  "in-negotiation": { color: "#D97706", bg: "#D9770620", label: "◐ IN NEGOTIATION" },
  exploring: { color: "#64748b", bg: "#334155", label: "○ EXPLORING" },
};

const EXHIBITIONS = [
  { name: "East Africa Health AI Expo", city: "Kigali", country: "Rwanda", flag: "🇷🇼", date: "Aug 12-14, 2026", type: "Exhibition", theme: "AI-powered healthcare for East Africa", priority: 3 },
  { name: "AHIS Cape Town Cold Chain Summit", city: "Cape Town", country: "South Africa", flag: "🇿🇦", date: "Aug 28, 2026", type: "Conference", theme: "Cold chain innovation + local manufacturing", priority: 2 },
  { name: "AHIS Gaborone SADC Pharma Forum", city: "Gaborone", country: "Botswana", flag: "🇧🇼", date: "Sep 18, 2026", type: "Conference", theme: "AfCFTA + SADC trade routes for pharma", priority: 2 },
  { name: "Nairobi Health Tech & AI Expo", city: "Nairobi", country: "Kenya", flag: "🇰🇪", date: "Oct 8-10, 2026", type: "Exhibition", theme: "East Africa pharma corridor — Kenya gateway", priority: 3 },
  { name: "AHIS Accra West Africa Summit", city: "Accra", country: "Ghana", flag: "🇬🇭", date: "Nov 20, 2026", type: "Conference", theme: "West Africa pharmaceutical market entry", priority: 2 },
  { name: "Kigali Cold Chain Facility Opening", city: "Kigali", country: "Rwanda", flag: "🇷🇼", date: "Dec 5, 2026", type: "Facility Opening", theme: "East Africa's pharmaceutical cold chain hub", priority: 3 },
  { name: "AHIS Lagos Nigeria Forum", city: "Lagos", country: "Nigeria", flag: "🇳🇬", date: "Jan 2027", type: "Conference", theme: "Nigeria — Africa's largest pharma market", priority: 2 },
  { name: "AHIS Cairo North Africa Summit", city: "Cairo", country: "Egypt", flag: "🇪🇬", date: "Mar 2027", type: "Conference", theme: "North Africa entry — Egypt + Morocco", priority: 1 },
];

export default function AfricaExpansionPage() {
  const [activePhase, setActivePhase] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState<typeof COUNTRIES[0] | null>(null);
  const [canvasTime, setCanvasTime] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const update = () => {
      const jnb = new Date().toLocaleTimeString("en-ZA", { timeZone: "Africa/Johannesburg", hour: "2-digit", minute: "2-digit", hour12: false });
      setCanvasTime(`JNB ${jnb}`);
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const drops: number[] = Array(Math.floor(canvas.width / 14)).fill(1);
    const chars = "🌍🇿🇦🇧🇼🇸🇿🇲🇿🇿🇼🇳🇦🇷🇼🇺🇬🇰🇪🇪🇹🇬🇭🇳🇬🇿🇲🇲🇼🇪🇬🇲🇦🇹🇳🇨🇻".split("");
    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px monospace";
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = `rgba(91, 244, 166, ${Math.random() * 0.5 + 0.3})`;
        ctx.fillText(ch, i * 14, drops[i] * 14);
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const filtered = activePhase === "all" ? COUNTRIES : COUNTRIES.filter(c => c.type === activePhase);
  const totalPartners = COUNTRIES.reduce((acc, c) => acc + c.partners, 0);
  const totalVMs = COUNTRIES.reduce((acc, c) => acc + c.vmCount, 0);
  const totalPopulation = COUNTRIES.reduce((acc, c) => acc + c.population, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#0F172A", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0 }} />

      {/* HEADER */}
      <div style={{ position: "relative", zIndex: 10, borderBottom: "1px solid rgba(91,244,166,0.1)", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(10px)", background: "rgba(15,23,42,0.9)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 32 }}>🌍</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>AFRICA <span style={{ color: "#5bf4a6" }}>EXPANSION</span></div>
            <div style={{ fontSize: 10, color: "#5bf4a6", letterSpacing: 3 }}>19 COUNTRIES · 4 PHASES · PHARMACEUTICAL DISTRIBUTION NETWORK</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "monospace", fontSize: 14, color: "#5bf4a6" }}>{canvasTime}</div>
            <div style={{ fontSize: 10, color: "#64748b" }}>South Africa Time</div>
          </div>
          <div style={{ width: 1, height: 32, background: "#1e293b" }} />
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { val: "19", label: "Countries", color: "#5bf4a6" },
              { val: String(totalPartners), label: "Partners", color: "#D97706" },
              { val: String(totalVMs), label: "VM Nodes", color: "#ff2ec4" },
              { val: "4", label: "Phases", color: "#5bf4a6" },
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
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.1, marginBottom: 12, background: "linear-gradient(90deg, #5bf4a6, #fff, #D97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            AFRICAN PHARMACEUTICAL<br />DISTRIBUTION EMPIRE
          </h1>
          <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.7, maxWidth: 750, margin: "0 auto" }}>
            From Johannesburg to Cairo, Lagos to Nairobi — <strong style={{ color: "#ff2ec4" }}>19 countries</strong>,{" "}
            <strong style={{ color: "#D97706" }}>{totalPartners} partners</strong>,{" "}
            <strong style={{ color: "#5bf4a6" }}>{totalVMs} VM nodes</strong>.
            Research facilities in Cape Town. Cold chain hub in Kigali.
            Built on AfCFTA trade agreements. Powered by ADAM SMASHER.
          </p>
        </div>

        {/* Phase filter */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
          {PHASES.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePhase(p.id)}
              style={{
                padding: "8px 16px", borderRadius: 100, border: `1px solid ${activePhase === p.id ? p.color : "#1e293b"}`,
                background: activePhase === p.id ? `${p.color}20` : "transparent",
                color: activePhase === p.id ? p.color : "#64748b",
                fontWeight: 700, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap",
                boxShadow: activePhase === p.id ? `0 0 15px ${p.color}33` : "none",
              }}
            >
              {p.label} ({p.countries})
            </button>
          ))}
        </div>

        {/* Country grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
          {filtered.map(c => {
            const cfg = STATUS_CONFIG[c.status];
            return (
              <div
                key={c.code}
                onClick={() => setSelectedCountry(selectedCountry?.code === c.code ? null : c)}
                style={{
                  background: "rgba(30,30,46,0.9)",
                  border: `2px solid ${selectedCountry?.code === c.code ? "#5bf4a6" : cfg.color + "33"}`,
                  borderRadius: 14, padding: "16px", cursor: "pointer",
                  boxShadow: selectedCountry?.code === c.code ? "0 0 25px #5bf4a644" : "none",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 24 }}>{c.flag}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{c.name}</div>
                      <div style={{ fontSize: 10, color: "#64748b" }}>{c.capital}</div>
                    </div>
                  </div>
                  <span style={{ background: cfg.bg, color: cfg.color, padding: "3px 8px", borderRadius: 100, fontSize: 9, fontWeight: 800, letterSpacing: 1 }}>{cfg.label}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, marginBottom: 8 }}>
                  <div style={{ textAlign: "center", background: "#1e293b", borderRadius: 8, padding: "6px 4px" }}>
                    <div style={{ fontSize: 13, fontWeight: 900, color: "#D97706" }}>{c.vmCount}</div>
                    <div style={{ fontSize: 8, color: "#64748b" }}>VMs</div>
                  </div>
                  <div style={{ textAlign: "center", background: "#1e293b", borderRadius: 8, padding: "6px 4px" }}>
                    <div style={{ fontSize: 13, fontWeight: 900, color: "#ff2ec4" }}>{c.partners}</div>
                    <div style={{ fontSize: 8, color: "#64748b" }}>Partners</div>
                  </div>
                  <div style={{ textAlign: "center", background: "#1e293b", borderRadius: 8, padding: "6px 4px" }}>
                    <div style={{ fontSize: 13, fontWeight: 900, color: "#5bf4a6" }}>{(c.population / 1000000).toFixed(1)}M</div>
                    <div style={{ fontSize: 8, color: "#64748b" }}>Pop (M)</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {c.focus.map(f => (
                    <span key={f} style={{ background: "#1e293b", borderRadius: 100, padding: "2px 7px", fontSize: 9, color: "#94a3b8" }}>{f}</span>
                  ))}
                </div>
                {selectedCountry?.code === c.code && (
                  <div style={{ marginTop: 10, borderTop: "1px solid #1e293b", paddingTop: 10 }}>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>💰 Market: {c.pharmaMarket}</div>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>💵 GDP/capita: {c.gdpPerCapita}</div>
                    <div style={{ fontSize: 11, color: "#5bf4a6" }}>🏛️ {c.afcfta}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Country Detail */}
        {selectedCountry && (
          <div style={{ background: "rgba(30,30,46,0.95)", border: "2px solid #5bf4a655", borderRadius: 20, padding: 32, marginBottom: 28, boxShadow: "0 0 40px #5bf4a620" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 56 }}>{selectedCountry.flag}</span>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: "#fff" }}>{selectedCountry.name}</div>
                  <div style={{ fontSize: 14, color: "#94a3b8" }}>Capital: {selectedCountry.capital}</div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>Phase: {selectedCountry.type.replace("-", " ").toUpperCase()}</div>
                </div>
              </div>
              <span style={{ background: STATUS_CONFIG[selectedCountry.status].bg, color: STATUS_CONFIG[selectedCountry.status].color, padding: "5px 14px", borderRadius: 100, fontSize: 11, fontWeight: 800 }}>
                {STATUS_CONFIG[selectedCountry.status].label}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Population", val: `${selectedCountry.population}M` },
                { label: "Pharma Market", val: selectedCountry.pharmaMarket },
                { label: "GDP per capita", val: selectedCountry.gdpPerCapita },
                { label: "VM Nodes", val: String(selectedCountry.vmCount) },
              ].map(s => (
                <div key={s.label} style={{ background: "#1e293b", borderRadius: 12, padding: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#5bf4a6" }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
              {/* Facilities */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#D97706", marginBottom: 10 }}>🏢 PLANNED FACILITIES</div>
                {selectedCountry.facilities.length > 0 ? selectedCountry.facilities.map(f => (
                  <div key={f.name} style={{ background: "#1e293b", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{f.name}</div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>{f.city}</div>
                    <div style={{ fontSize: 10, color: "#D97706" }}>{f.type}</div>
                  </div>
                )) : (
                  <div style={{ fontSize: 11, color: "#64748b", fontStyle: "italic" }}>No facilities planned yet</div>
                )}
              </div>
              {/* Contacts */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#ff2ec4", marginBottom: 10 }}>📧 CONTACTS</div>
                <div style={{ background: "#1e293b", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
                  <div style={{ fontSize: 11, color: "#64748b" }}>Ministry</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{selectedCountry.contacts.ministry}</div>
                </div>
                <div style={{ background: "#1e293b", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
                  <div style={{ fontSize: 11, color: "#64748b" }}>Regulator</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{selectedCountry.contacts.sahpra}</div>
                </div>
                <div style={{ background: "#1e293b", borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: "#64748b" }}>AfCFTA</div>
                  <div style={{ fontSize: 11, color: "#5bf4a6" }}>{selectedCountry.afcfta}</div>
                </div>
              </div>
              {/* Universities + Timeline */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#5bf4a6", marginBottom: 10 }}>🎓 UNIVERSITY PARTNERS</div>
                {selectedCountry.universities.map(u => (
                  <div key={u} style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>• {u}</div>
                ))}
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#D97706", marginBottom: 6 }}>📅 TIMELINE</div>
                  <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.6 }}>{selectedCountry.timeline}</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16, padding: "12px 16px", background: "#1e293b", borderRadius: 10, fontSize: 12, color: "#94a3b8" }}>
              <strong style={{ color: "#5bf4a6" }}>📝 Notes:</strong> {selectedCountry.notes}
            </div>
          </div>
        )}

        {/* Exhibition Calendar */}
        <div>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#D97706", textShadow: "0 0 15px #D97706" }}>
              📅 AFRICA EXHIBITION & CONFERENCE CALENDAR 2026-2027
            </h2>
            <p style={{ color: "#64748b", fontSize: 13 }}>8 events across 7 countries — all targeted for Studex Health VM partner outreach</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {EXHIBITIONS.map(ex => (
              <div key={ex.name} style={{ background: "rgba(30,30,46,0.9)", border: `2px solid ${ex.priority === 3 ? "#ff2ec4" : "#1e293b"}`, borderRadius: 14, padding: "18px", boxShadow: ex.priority === 3 ? "0 0 20px #ff2ec433" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ fontSize: 28 }}>{ex.flag}</div>
                  {ex.priority === 3 && (
                    <span style={{ background: "#ff2ec420", color: "#ff2ec4", padding: "2px 10px", borderRadius: 100, fontSize: 9, fontWeight: 800 }}>🔥 PRIORITY</span>
                  )}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{ex.name}</div>
                <div style={{ fontSize: 12, color: "#5bf4a6", marginBottom: 4 }}>{ex.city}, {ex.country}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>{ex.date}</div>
                <div style={{ fontSize: 11, color: "#D97706", fontStyle: "italic" }}>"{ex.theme}"</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(91,244,166,0.1)", padding: "20px 32px", textAlign: "center" }}>
        <p style={{ color: "#475569", fontSize: 12 }}>
          🤖 Powered by ADAM SMASHER | 🌍 19 Countries | 🇿🇦 Phase 1 Core → 🇧🇼🇸🇿🇲🇿🇳🇦 Phase 2 SADC → 🇷🇼🇰🇪🇺🇬🇪🇹 Phase 3 E+W Africa → 🇪🇬🇲🇦🇹🇳 Phase 4 North Africa
        </p>
      </div>
    </div>
  );
}
