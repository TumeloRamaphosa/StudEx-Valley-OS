"use client";

import { useState, useEffect, useRef } from "react";

type Tier = "founder" | "strategic" | "standard";
type Size = "startup" | "smb" | "enterprise";
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
  size: Size;
  focusAreas: FocusArea[];
  vmNeeds: string;
  revenue: string;
  message: string;
  agreedToTerms: boolean;
}

interface RussianClient {
  id: string;
  name: string;
  location: string;
  products: string[];
  vmId: string;
  status: "active" | "provisioning" | "pending";
  focus: string;
  established: number;
  employees: string;
  website: string;
}

interface SAClient {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  location: string;
  type: string;
  productLines: string;
  status: "partner" | "prospect" | "new";
  tier: Tier;
  focusAreas: string[];
  notes: string;
  website: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  endDate?: string;
  city: string;
  country: string;
  flag: string;
  type: "conference" | "exhibition" | "tour" | "vm-launch" | "roadshow";
  status: "upcoming" | "this-month" | "completed";
  description: string;
  attendees: number;
  theme: string;
}

interface AfricaPartner {
  id: string;
  name: string;
  country: string;
  flag: string;
  type: "distribution" | "government" | "university" | "manufacturer" | "cold-chain" | "research";
  status: "active" | "in-negotiation" | "exploring";
  focus: string;
  vmStatus: "deployed" | "provisioning" | "planned";
}

// ─────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────

const RUSSIAN_CLIENTS: RussianClient[] = [
  {
    id: "pharmasyntez",
    name: "Pharmasyntez",
    location: "Moscow, Russia",
    products: ["TB medicines", "HIV antiretrovirals", "Oncology drugs", "Diabetes medications", "Antibiotics", "COVID treatments", "Cardiology", "Hepatitis B"],
    vmId: "vm-ru-pharmasyntez-01",
    status: "active",
    focus: "Biopharmaceutical manufacturing + Africa distribution corridor",
    established: 2007,
    employees: "4,000+",
    website: "pharmasyntez.com",
  },
  {
    id: "valenta-farm",
    name: "Valenta Farm",
    location: "Moscow, Russia",
    products: ["Generic pharmaceuticals", "Cardiovascular drugs", "CNS medications", "Dermatology", "Gastroenterology"],
    vmId: "vm-ru-valenta-01",
    status: "active",
    focus: "Generic drug supply + SA + Southern Africa distribution",
    established: 1999,
    employees: "2,500+",
    website: "valenta-farm.ru",
  },
  {
    id: "otc-pharm",
    name: "OTC Pharm",
    location: "Moscow, Russia",
    products: ["Over-the-counter medicines", "Vitamins", "Dietary supplements", "Baby care", "Oral care", "Pain relief"],
    vmId: "vm-ru-otcpharm-01",
    status: "provisioning",
    focus: "Supplement distribution — SA + Botswana + Eswatini pilot",
    established: 1997,
    employees: "3,000+",
    website: "otcpharm.ru",
  },
  {
    id: "protek",
    name: "Protek",
    location: "Moscow, Russia",
    products: ["Medical equipment", "Pharmaceutical distribution", "Laboratory supplies", "Hospital furniture", "Diagnostic devices"],
    vmId: "vm-ru-protek-01",
    status: "provisioning",
    focus: "Medical equipment distribution — Africa government tenders",
    established: 1990,
    employees: "5,000+",
    website: "protek.group",
  },
  {
    id: "art-engineer",
    name: "Art Engineer",
    location: "Russia",
    products: ["Medical devices", "Surgical instruments", "Engineering solutions", "Laboratory equipment"],
    vmId: "vm-ru-arteng-01",
    status: "pending",
    focus: "Medical engineering + Africa hospital infrastructure",
    established: 2010,
    employees: "500+",
    website: "art-engineer.ru",
  },
  {
    id: "geropharm",
    name: "Geropharm",
    location: "St. Petersburg, Russia",
    products: ["Diabetes care", "Neurology", "Oncology", "Endocrinology", "Insulin analogues"],
    vmId: "vm-ru-geropharm-01",
    status: "pending",
    focus: "Diabetes + neurology — Africa chronic disease management",
    established: 2001,
    employees: "1,200+",
    website: "geropharm.ru",
  },
];

const SA_CLIENTS: SAClient[] = [
  {
    id: "medwell-sa",
    name: "Medwell SA",
    contact: "Partnerships Team",
    email: "info@medwell.co.za",
    phone: "010 006 5538",
    location: "Centurion (HQ) + Cape Town + 8 branches",
    type: "Healthcare + Distribution",
    productLines: "Home nursing, IV clinics, medical products, dementia care",
    status: "prospect",
    tier: "strategic",
    focusAreas: ["distribution", "digital-health"],
    notes: "National network. Strong fit for AI VM — patient monitoring + logistics.",
    website: "medwell.co.za",
  },
  {
    id: "cj-distribution",
    name: "CJ Distribution (CJDSA)",
    contact: "Sales Team",
    email: "sales@cjmarketing.co",
    phone: "013 010 0091",
    location: "Delmas, Mpumalanga + Limpopo",
    type: "Pharma Wholesaler",
    productLines: "20,000+ prescription + OTC products",
    status: "prospect",
    tier: "founder",
    focusAreas: ["distribution", "wholesale"],
    notes: "Largest independent wholesaler in Mpumalanga. WhatsApp ordering active.",
    website: "cjdsa.com",
  },
  {
    id: "evohealth",
    name: "EvoHealth (Pty) Ltd",
    contact: "Enquiries",
    email: "enquiries@evohealth.co.za",
    phone: "+27 11 656 3338",
    location: "Johannesburg, Gauteng",
    type: "Manufacturer + Distributor",
    productLines: "SAHPRA licensed: vitamins, minerals, CBD oils, supplements",
    status: "prospect",
    tier: "strategic",
    focusAreas: ["manufacturing", "distribution", "wholesale"],
    notes: "SAHPRA licensed. Manufacturing + importing + exporting. Key partner for supplements.",
    website: "evohealth.co.za",
  },
  {
    id: "asnika-intl",
    name: "Asnika International",
    contact: "Partnerships",
    email: "info@asnikainternational.com",
    phone: "+27 79 969 9231",
    location: "India + Africa + EU + GCC",
    type: "Global Merchant + Distributor",
    productLines: "APIs, excipients, surgical consumables, hospital products, lab supplies",
    status: "prospect",
    tier: "strategic",
    focusAreas: ["distribution", "manufacturing", "wholesale"],
    notes: "Global supply chain. Africa + India + EU + GCC. Key for sourcing supplements.",
    website: "asnikainternational.com",
  },
  {
    id: "city-medical",
    name: "City Medical Wholesalers",
    contact: "Unknown",
    email: "",
    phone: "",
    location: "National — South Africa",
    type: "Pharma Wholesaler",
    productLines: "20,000+ pharma + surgical + dental products",
    status: "prospect",
    tier: "strategic",
    focusAreas: ["distribution", "wholesale"],
    notes: "National doorstep delivery. Independent + corporate pharmacies + hospitals.",
    website: "citymedical.co.za",
  },
  {
    id: "jehu-industries",
    name: "Jehu Industries",
    contact: "Partnerships",
    email: "",
    phone: "+27 83 678 0800 (JHB)",
    location: "Durban HQ + Cape Town + JHB + Harrismith",
    type: "Medical Device Distributor",
    productLines: "BD products, surgical instruments, hospital consumables, tender management",
    status: "prospect",
    tier: "standard",
    focusAreas: ["manufacturing", "distribution"],
    notes: "4 branches. Tender management. Jehu Infection Prevention University (CPD).",
    website: "jehuindustries.com",
  },
  {
    id: "zetalabs",
    name: "Zeta Laboratories",
    contact: "Info",
    email: "info@zetalabs.co.za",
    phone: "031 701 9858",
    location: "Pinetown, KwaZulu-Natal",
    type: "Manufacturer",
    productLines: "Health + beauty: creams, lotions, fragrances, private label",
    status: "prospect",
    tier: "standard",
    focusAreas: ["manufacturing", "research"],
    notes: "R&D + private label + in-house packaging. Good for own-brand supplements.",
    website: "zetalabs.co.za",
  },
  {
    id: "bioclin",
    name: "BioClin Solutions CC",
    contact: "Enquiries",
    email: "",
    phone: "(012) 326 7771",
    location: "Pretoria, Gauteng",
    type: "Medical Equipment + Repair",
    productLines: "Hospital equipment, surgical instruments, repair + calibration services",
    status: "prospect",
    tier: "standard",
    focusAreas: ["manufacturing", "distribution"],
    notes: "Exclusive Welch Allyn + Bionix distributor. Repair + calibration + preventive maintenance.",
    website: "bioclin.co.za",
  },
];

const EVENTS: Event[] = [
  {
    id: "russia-tour",
    name: "Russia Pharma Tech Tour",
    date: "2026-07-20",
    endDate: "2026-07-30",
    city: "Moscow / St. Petersburg",
    country: "Russia",
    flag: "🇷🇺",
    type: "tour",
    status: "upcoming",
    description: "Factory visits to Pharmasyntez, Geropharm, Valenta Farm. Partnership meetings. VM provisioning for all 6 Russian clients. Government trade office visits.",
    attendees: 8,
    theme: "Deepening Russia-Africa pharma corridor",
  },
  {
    id: "rwanda-expo",
    name: "East Africa Health AI Expo",
    date: "2026-08-12",
    endDate: "2026-08-14",
    city: "Kigali",
    country: "Rwanda",
    flag: "🇷🇼",
    type: "exhibition",
    status: "upcoming",
    description: "Studex Health exhibition booth. Cold chain facility announcement. Rwanda VM partner signing. EAC health ministers conference. AI agent demonstrations.",
    attendees: 500,
    theme: "AI-powered healthcare for East Africa",
  },
  {
    id: "sa-launch",
    name: "Studex Health VM Network Launch",
    date: "2026-07-11",
    city: "Johannesburg",
    country: "South Africa",
    flag: "🇿🇦",
    type: "vm-launch",
    status: "this-month",
    description: "LIVE launch event. First 5 VM partners announced. ADAM SMASHER provisions VMs in real time. Pharmasyntez Africa partnership announcement. Supplement distribution begins.",
    attendees: 50,
    theme: "Africa's pharmaceutical future, powered by AI",
  },
  {
    id: "cape-town-conf",
    name: "AHIS — Cape Town Cold Chain Summit",
    date: "2026-08-28",
    city: "Cape Town",
    country: "South Africa",
    flag: "🇿🇦",
    type: "conference",
    status: "upcoming",
    description: "Monthly African Health Intelligence Summit. Cold chain facility tours (Tygerberg). Manufacturing masterclass with EvoHealth + Zeta Laboratories. AfCFTA tariff workshop.",
    attendees: 120,
    theme: "Cold chain innovation + local manufacturing",
  },
  {
    id: "gaborone-conf",
    name: "AHIS — Gaborone SADC Pharma Forum",
    date: "2026-09-18",
    city: "Gaborone",
    country: "Botswana",
    flag: "🇧🇼",
    type: "conference",
    status: "upcoming",
    description: "SADC health ministers + pharma distributors. AfCFTA SADC tariff protocols. Botswana Government VM signing. VM partner showcase. Zimbabwe + Namibia + Eswatini introductions.",
    attendees: 80,
    theme: "AfCFTA + SADC trade routes for pharma",
  },
  {
    id: "nairobi-expo",
    name: "Nairobi Health Tech & AI Expo",
    date: "2026-10-08",
    endDate: "2026-10-10",
    city: "Nairobi",
    country: "Kenya",
    flag: "🇰🇪",
    type: "exhibition",
    status: "upcoming",
    description: "East Africa expansion kickoff. Kenya + Uganda + Tanzania VM partners announced. Cold chain Kigali facility tour (link from Rwanda expo). Kenya pharmaceutical board meetings.",
    attendees: 300,
    theme: "East Africa pharma corridor — Kenya gateway",
  },
  {
    id: "accra-summit",
    name: "AHIS — Accra West Africa Summit",
    date: "2026-11-20",
    city: "Accra",
    country: "Ghana",
    flag: "🇬🇭",
    type: "conference",
    status: "upcoming",
    description: "West Africa expansion. Ghana Health Ministry VM partnership. Nigeria + Cape Verde connections. African Development Bank meetings. Ghana pharmaceutical board introductions.",
    attendees: 100,
    theme: "West Africa pharmaceutical market entry",
  },
  {
    id: "kigali-cold",
    name: "Kigali Cold Chain Facility Opening",
    date: "2026-12-05",
    city: "Kigali",
    country: "Rwanda",
    flag: "🇷🇼",
    type: "exhibition",
    status: "upcoming",
    description: "Official opening of Studex Health Rwanda cold chain facility. Temperature-controlled storage for vaccines + supplements. EAC distribution hub launch. Regional health ministers ribbon cutting.",
    attendees: 150,
    theme: "East Africa's pharmaceutical cold chain hub",
  },
];

const AFRICA_PARTNERS: AfricaPartner[] = [
  // Phase 1: South Africa
  { id: "sa-jhb", name: "Studex Health HQ", country: "South Africa", flag: "🇿🇦", type: "distribution", status: "active", focus: "Command centre + JHB cold chain hub", vmStatus: "deployed" },
  { id: "sa-cpt", name: "Cape Town Hub", country: "South Africa", flag: "🇿🇦", type: "cold-chain", status: "active", focus: "Tygerberg cold chain facility", vmStatus: "deployed" },
  // Phase 2: SADC
  { id: "bwa", name: "Botswana Government Health VM", country: "Botswana", flag: "🇧🇼", type: "government", status: "in-negotiation", focus: "Government VM + pharma distribution", vmStatus: "planned" },
  { id: "swz", name: "Eswatini SADC Gateway", country: "Eswatini", flag: "🇸🇿", type: "distribution", status: "exploring", focus: "SADC corridor entry point", vmStatus: "planned" },
  { id: "moz", name: "Mozambique Port Logistics", country: "Mozambique", flag: "🇲🇿", type: "distribution", status: "exploring", focus: "Port + logistics hub for imports", vmStatus: "planned" },
  { id: "zwe", name: "Zimbabwe Regional Pharma", country: "Zimbabwe", flag: "🇿🇼", type: "distribution", status: "exploring", focus: "Regional pharma market — Harare hub", vmStatus: "planned" },
  { id: "nam", name: "Namibia SADC Corridor", country: "Namibia", flag: "🇳🇦", type: "distribution", status: "exploring", focus: "Walvis Bay port + SADC north corridor", vmStatus: "planned" },
  // Phase 3: East Africa
  { id: "rwa", name: "Rwanda EAC Cold Chain Hub", country: "Rwanda", flag: "🇷🇼", type: "cold-chain", status: "in-negotiation", focus: "Kigali cold storage + EAC distribution", vmStatus: "provisioning" },
  { id: "uga", name: "Uganda EAC Network", country: "Uganda", flag: "🇺🇬", type: "distribution", status: "exploring", focus: "Kampala regional distribution", vmStatus: "planned" },
  { id: "ken", name: "Kenya East Africa Tech Hub", country: "Kenya", flag: "🇰🇪", type: "distribution", status: "in-negotiation", focus: "Nairobi pharma corridor + health tech", vmStatus: "planned" },
  { id: "eth", name: "Ethiopia Emerging Market", country: "Ethiopia", flag: "🇪🇹", type: "distribution", status: "exploring", focus: "Addis Ababa pharma growth market", vmStatus: "planned" },
  // Phase 3: West Africa
  { id: "gha", name: "Ghana West Africa Gateway", country: "Ghana", flag: "🇬🇭", type: "distribution", status: "exploring", focus: "Accra hub — West Africa entry", vmStatus: "planned" },
  { id: "nga", name: "Nigeria Largest Market", country: "Nigeria", flag: "🇳🇬", type: "distribution", status: "exploring", focus: "Lagos + Abuja — 200M+ population", vmStatus: "planned" },
  { id: "zmb", name: "Zambia Copperbelt Route", country: "Zambia", flag: "🇿🇲", type: "distribution", status: "exploring", focus: "Lusaka trade corridor + copperbelt", vmStatus: "planned" },
  { id: "mwi", name: "Malawi Lake Distribution", country: "Malawi", flag: "🇲🇼", type: "distribution", status: "exploring", focus: "Lilongwe + Blantyre pharma network", vmStatus: "planned" },
  // North Africa
  { id: "egy", name: "Egypt North Africa Hub", country: "Egypt", flag: "🇪🇬", type: "distribution", status: "exploring", focus: "Cairo + Alexandria pharma hub", vmStatus: "planned" },
  { id: "mar", name: "Morocco Africa Gateway", country: "Morocco", flag: "🇲🇦", type: "distribution", status: "exploring", focus: "Casablanca pharma + Africa export", vmStatus: "planned" },
  { id: "tun", name: "Tunisia Med Tech", country: "Tunisia", flag: "🇹🇳", type: "manufacturer", status: "exploring", focus: "Medical device manufacturing", vmStatus: "planned" },
  { id: "cpv", name: "Cape Verde Island Hub", country: "Cape Verde", flag: "🇨🇻", type: "cold-chain", status: "exploring", focus: "Island cold chain + Atlantic gateway", vmStatus: "planned" },
  // Research
  { id: "uni-wits", name: "Wits University Research", country: "South Africa", flag: "🇿🇦", type: "university", status: "in-negotiation", focus: "Pharma AI research + clinical trials", vmStatus: "planned" },
  { id: "uni-uct", name: "UCT Medical School", country: "South Africa", flag: "🇿🇦", type: "university", status: "exploring", focus: "TB + HIV research partnership", vmStatus: "planned" },
  { id: "uni-ukzn", name: "UKZN Pharma Sciences", country: "South Africa", flag: "🇿🇦", type: "university", status: "exploring", focus: "Supplement manufacturing R&D", vmStatus: "planned" },
  { id: "uni-kmu", name: "KMU Rwanda", country: "Rwanda", flag: "🇷🇼", type: "university", status: "exploring", focus: "EAC health AI research", vmStatus: "planned" },
];

const COUNTRIES = [
  "South Africa", "Botswana", "Eswatini", "Mozambique", "Zimbabwe", "Namibia",
  "Malawi", "Zambia", "Rwanda", "Uganda", "Ghana", "Nigeria", "Kenya",
  "Ethiopia", "Egypt", "Morocco", "Tunisia", "Cape Verde", "Zanzibar", "Other",
];

const FOCUS_AREAS: { id: FocusArea; label: string; icon: string }[] = [
  { id: "distribution", label: "Distribution & Logistics", icon: "🚚" },
  { id: "manufacturing", label: "Research & Manufacturing", icon: "🏭" },
  { id: "cold-chain", label: "Cold Chain Storage", icon: "❄️" },
  { id: "regulatory", label: "Regulatory & Compliance", icon: "📋" },
  { id: "digital-health", label: "Digital Health & AI", icon: "🤖" },
  { id: "wholesale", label: "Wholesale Trading", icon: "📦" },
];

const TIERS = [
  {
    id: "founder" as Tier,
    name: "FOUNDER PARTNER",
    price: "Equity",
    tagline: "Co-build the African pharma future",
    color: "#ff2ec4",
    perks: ["VM with 50GB GPU compute", "Co-brand on all Africa ops", "Board seat in country hub", "Revenue share on local trades", "Access to Russia + China corridors", "Dedicated ADAM SMASHER agent"],
  },
  {
    id: "strategic" as Tier,
    name: "STRATEGIC PARTNER",
    price: "$2,500/mo",
    tagline: "Full-stack VM + agent network",
    color: "#5bf4a6",
    perks: ["Dedicated VM (20GB RAM)", "QwenPaw multi-channel bot", "Lark/Slack/Discord integration", "Access to 10 VM nodes", "AfCFTA preferential tariffs", "Cold chain facility access", "University research partnership"],
  },
  {
    id: "standard" as Tier,
    name: "STANDARD PARTNER",
    price: "$499/mo",
    tagline: "Your own AI agent VM",
    color: "#D97706",
    perks: ["Shared VM (8GB RAM)", "ADAM SMASHER base agent", "Studex network directory", "Africa distribution listing", "Trade week participation", "Monthly intelligence report"],
  },
];

// ─────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────

const statusColor = (s: string) =>
  s === "active" || s === "deployed" ? "#5bf4a6"
  : s === "provisioning" ? "#D97706"
  : "#64748b";

const statusBg = (s: string) =>
  s === "active" || s === "deployed" ? "#5bf4a618"
  : s === "provisioning" ? "#D9770620"
  : "#1e293b";

const tierColor = (t: Tier) =>
  t === "founder" ? "#ff2ec4" : t === "strategic" ? "#5bf4a6" : "#D97706";

// ─────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────

function VMStatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string; glow: string; label: string }> = {
    active: { bg: "#5bf4a618", text: "#5bf4a6", glow: "0 0 12px #5bf4a655", label: "● ACTIVE" },
    provisioning: { bg: "#D9770620", text: "#D97706", glow: "0 0 12px #D9770655", label: "◐ PROVISIONING" },
    pending: { bg: "#334155", text: "#94a3b8", glow: "none", label: "○ PENDING" },
  };
  const c = colors[status] || colors.pending;
  return (
    <span style={{ background: c.bg, color: c.text, padding: "3px 10px", borderRadius: 100, fontSize: 10, fontWeight: 800, letterSpacing: 1, boxShadow: c.glow }}>
      {c.label}
    </span>
  );
}

function Card({ children, accent = "#5bf4a6", style: extra }: { children: React.ReactNode; accent?: string; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(30,30,46,0.95), rgba(15,23,42,0.9))",
      border: `1px solid ${accent}33`,
      boxShadow: `0 0 30px ${accent}15, 0 4px 20px rgba(0,0,0,0.5)`,
      borderRadius: 16,
      padding: 24,
      ...extra,
    }}>
      {children}
    </div>
  );
}

function GlowText({ children, color }: { children: React.ReactNode; color: string }) {
  return <span style={{ textShadow: `0 0 10px ${color}, 0 0 30px ${color}66` }}>{children}</span>;
}

// ─────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────

export default function StudexHealthPage() {
  const [activeTab, setActiveTab] = useState<
    "network" | "events" | "russia" | "africa" | "apply"
  >("network");
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [vmCount, setVmCount] = useState(1);
  const [currentTime, setCurrentTime] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [form, setForm] = useState<FormData>({
    companyName: "", contactName: "", email: "", phone: "",
    country: "", website: "", size: "smb", focusAreas: [],
    vmNeeds: "", revenue: "", message: "", agreedToTerms: false,
  });

  // Matrix rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()".split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#5bf4a6";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;
        ctx.fillStyle = `rgba(91, 244, 166, ${Math.random() * 0.5 + 0.5})`;
        ctx.fillText(ch, i * fontSize, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const t = now.toLocaleTimeString("en-ZA", { timeZone: "Africa/Johannesburg", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
      const d = now.toLocaleDateString("en-ZA", { timeZone: "Africa/Johannesburg", weekday: "short", day: "numeric", month: "short", year: "numeric" });
      setCurrentTime(`${t} SAST  |  ${d}`);
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  const fmtDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
  };

  const typeIcon = (t: string) =>
    t === "conference" ? "🎪" : t === "exhibition" ? "🏛️" : t === "tour" ? "✈️" : t === "vm-launch" ? "💻" : "🛣️";

  const TABS = [
    { id: "network" as const, label: "NETWORK" },
    { id: "events" as const, label: "EVENTS" },
    { id: "russia" as const, label: "🇷🇺 RUSSIA VMs" },
    { id: "africa" as const, label: "🌍 AFRICA MAP" },
    { id: "apply" as const, label: "APPLY NOW" },
  ];

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#0F172A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", position: "relative" }}>
        <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 600, padding: "2rem" }}>
          <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: "#5bf4a6", ...GlowText({ children: "APPLICATION RECEIVED", color: "#5bf4a6" }), marginBottom: 16 }}>
            APPLICATION RECEIVED
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.7, marginBottom: 32 }}>
            Welcome to <strong style={{ color: "#ff2ec4" }}>Studex Health</strong>,{" "}
            <strong>{form.companyName}</strong>.
            <br />ADAM SMASHER will review your application and contact{" "}
            <strong style={{ color: "#5bf4a6" }}>{form.contactName}</strong> at{" "}
            <strong>{form.email}</strong> within 24 hours.
          </p>
          <div style={{ background: "rgba(30,30,46,0.95)", border: "1px solid #5bf4a633", padding: 24, borderRadius: 16, marginBottom: 24 }}>
            <p style={{ color: "#5bf4a6", fontWeight: 700, marginBottom: 12 }}>WHAT HAPPENS NEXT</p>
            {["📧 Confirmation email sent", "🤖 ADAM SMASHER reviewing...", "📋 Tier assigned within 4 hours", "💻 VM provisioning begins", "🌍 Africa network access activated"].map((item) => (
              <div key={item} style={{ color: "#94a3b8", fontSize: 14, marginBottom: 8 }}>{item}</div>
            ))}
          </div>
          <button onClick={() => { setSubmitted(false); setStep(0); }} style={{ background: "transparent", border: "1px solid #5bf4a6", color: "#5bf4a6", padding: "12px 32px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0F172A", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0 }} />

      {/* HEADER */}
      <div style={{ position: "relative", zIndex: 10, borderBottom: "1px solid rgba(91,244,166,0.1)", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(10px)", background: "rgba(15,23,42,0.85)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #ff2ec4, #5bf4a6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: "#0F172A" }}>S</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>STUD<span style={{ color: "#ff2ec4" }}>EX</span> HEALTH</div>
            <div style={{ fontSize: 10, color: "#5bf4a6", letterSpacing: 3 }}>AFRICAN PHARMA INTELLIGENCE NETWORK</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#5bf4a6" }}>{currentTime}</div>
          <div style={{ fontSize: 11, color: "#64748b" }}>🤖 ADAM SMASHER ACTIVE  |  🌍 19 Countries  |  🇷🇺 6 Russia VMs</div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ position: "relative", zIndex: 1, padding: "60px 32px 20px", textAlign: "center", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "inline-block", padding: "5px 18px", borderRadius: 100, border: "1px solid #ff2ec4", color: "#ff2ec4", fontSize: 11, fontWeight: 700, letterSpacing: 3, marginBottom: 20, ...GlowText({ children: "🎉 LAUNCHING THIS FRIDAY — LIMITED VM SLOTS", color: "#ff2ec4" }) }} />
        <h1 style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.1, marginBottom: 12, background: "linear-gradient(90deg, #fff 0%, #ff2ec4 50%, #5bf4a6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          THE AFRICAN PHARMA VM NETWORK
        </h1>
        <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.7, maxWidth: 750, margin: "0 auto 24px" }}>
          <strong style={{ color: "#D97706" }}>6 Russian pharmaceutical clients</strong> on AI Agent VMs.
          <strong style={{ color: "#5bf4a6" }}> 8 South African health companies</strong> in the network.
          <strong style={{ color: "#ff2ec4" }}> 23 Africa partners</strong> across 19 countries.
          <br />One intelligent network. Russia → Africa → China. <strong>10 years of Tumelo Ramaphosa.</strong>
        </p>

        {/* Top Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
          {[
            { val: "6", label: "Russia VMs Active", color: "#ff2ec4", icon: "🇷🇺" },
            { val: "8", label: "SA Partner Companies", color: "#5bf4a6", icon: "🇿🇦" },
            { val: "23", label: "Africa Partners", color: "#D97706", icon: "🌍" },
            { val: "8", label: "Events Planned", color: "#5bf4a6", icon: "📅" },
          ].map((s) => (
            <div key={s.label} style={{ background: "rgba(30,30,46,0.9)", border: `1px solid ${s.color}33`, borderRadius: 14, padding: "20px 12px", textAlign: "center", boxShadow: `0 0 20px ${s.color}15` }}>
              <div style={{ fontSize: 32, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: s.color, ...GlowText({ children: s.val, color: s.color }) }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, justifyContent: "center", background: "rgba(15,23,42,0.8)", padding: "6px", borderRadius: 14, maxWidth: 700, margin: "0 auto", border: "1px solid #1e293b" }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: "10px 8px",
                borderRadius: 10,
                border: "none",
                background: activeTab === tab.id ? "#ff2ec4" : "transparent",
                color: activeTab === tab.id ? "#0F172A" : "#94a3b8",
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: activeTab === tab.id ? "0 0 20px #ff2ec466" : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "24px 32px 60px" }}>

        {/* ─── NETWORK TAB ─── */}
        {activeTab === "network" && (
          <>
            <div style={{ marginBottom: 8, textAlign: "center" }}>
              <h2 style={{ fontSize: 28, fontWeight: 800 }}>
                THE <span style={{ color: "#ff2ec4", ...GlowText({ children: "STUDENT HEALTH NETWORK", color: "#ff2ec4" }) }}</span>
              </h2>
              <p style={{ color: "#64748b", fontSize: 14 }}>3 layers: Russia corridor → South Africa partners → Pan-Africa expansion</p>
            </div>

            {/* Russia Layer */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>🇷🇺</span>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#ff2ec4", ...GlowText({ children: "RUSSIAN PHARMA CLIENTS — 6 AI AGENT VMs", color: "#ff2ec4" }) }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {RUSSIAN_CLIENTS.map((client) => (
                  <Card key={client.id} accent="#ff2ec4" style={{ borderTop: "3px solid #ff2ec4" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{client.name}</div>
                        <div style={{ fontSize: 12, color: "#94a3b8" }}>{client.location}</div>
                      </div>
                      <VMStatusBadge status={client.status} />
                    </div>
                    <div style={{ fontSize: 10, fontFamily: "monospace", color: "#475569", marginBottom: 10 }}>{client.vmId}</div>
                    <div style={{ fontSize: 11, color: "#5bf4a6", marginBottom: 8, fontWeight: 600 }}>Focus: {client.focus}</div>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>
                      <strong>Products:</strong> {client.products.slice(0, 4).join(", ")}...
                    </div>
                    <div style={{ display: "flex", gap: 12, fontSize: 11, color: "#64748b" }}>
                      <span>Est. {client.established}</span>
                      <span>👥 {client.employees}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* SA Clients Layer */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>🇿🇦</span>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#5bf4a6", ...GlowText({ children: "SOUTH AFRICAN HEALTH PARTNERS", color: "#5bf4a6" }) }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                {SA_CLIENTS.map((client) => (
                  <Card key={client.id} accent={tierColor(client.tier)} style={{ borderTop: `3px solid ${tierColor(client.tier)}`, padding: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{client.name}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>{client.type} · {client.location}</div>
                      </div>
                      <span style={{ fontSize: 10, background: `${tierColor(client.tier)}20`, color: tierColor(client.tier), padding: "2px 8px", borderRadius: 100, fontWeight: 700 }}>
                        {client.tier.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}><strong>Products:</strong> {client.productLines}</div>
                    {client.email && (
                      <div style={{ fontSize: 11, color: "#5bf4a6" }}>✉ {client.email}</div>
                    )}
                    {client.phone && (
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>📞 {client.phone}</div>
                    )}
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 6, fontStyle: "italic" }}>"{client.notes}"</div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Africa Partners Quick View */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>🌍</span>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#D97706", ...GlowText({ children: "AFRICA EXPANSION — 23 PARTNERS", color: "#D97706" }) }} />
              </div>
              <Card accent="#D97706">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                  {AFRICA_PARTNERS.map((p) => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: statusBg(p.vmStatus), border: `1px solid ${statusColor(p.vmStatus)}33`, borderRadius: 8 }}>
                      <span style={{ fontSize: 16 }}>{p.flag}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#e2e8f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                        <div style={{ fontSize: 9, color: statusColor(p.vmStatus), textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>{p.vmStatus}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </>
        )}

        {/* ─── EVENTS TAB ─── */}
        {activeTab === "events" && (
          <>
            <div style={{ marginBottom: 8, textAlign: "center" }}>
              <h2 style={{ fontSize: 28, fontWeight: 800 }}>
                <span style={{ color: "#D97706", ...GlowText({ children: "UPCOMING EVENTS", color: "#D97706" }) }}> & </span>
                <span style={{ color: "#ff2ec4", ...GlowText({ children: "TOURS 2026", color: "#ff2ec4" }) }}
                </span>
              </h2>
              <p style={{ color: "#64748b", fontSize: 14 }}>Russia tour · Rwanda exhibition · East Africa expansion · Monthly conferences</p>
            </div>

            {/* Featured: Russia Tour */}
            <Card accent="#ff2ec4" style={{ border: "2px solid #ff2ec4", marginBottom: 24, padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 48 }}>🇷🇺</div>
                <div>
                  <div style={{ fontSize: 10, color: "#ff2ec4", fontWeight: 800, letterSpacing: 3, marginBottom: 4 }}>UPCOMING TOUR</div>
                  <h3 style={{ fontSize: 26, fontWeight: 900, color: "#fff", ...GlowText({ children: "RUSSIA PHARMA TECH TOUR 2026", color: "#ff2ec4" }) }} />
                  <div style={{ fontSize: 14, color: "#94a3b8" }}>
                    {fmtDate("2026-07-20")} — {fmtDate("2026-07-30")} · Moscow + St. Petersburg 🇷🇺
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                {[
                  { city: "Moscow", vm: "Pharmasyntez + Valenta Farm + OTC Pharm + Protek", days: "3 days" },
                  { city: "St. Petersburg", vm: "Geropharm factory + R&D labs", days: "2 days" },
                  { city: "Virtual VM Setup", vm: "All 6 Russian VMs provisioned + tested", days: "Remote" },
                ].map((item) => (
                  <div key={item.city} style={{ background: "#ff2ec418", border: "1px solid #ff2ec433", borderRadius: 12, padding: 16, textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#ff2ec4", marginBottom: 6 }}>{item.city}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>{item.vm}</div>
                    <div style={{ fontSize: 11, color: "#5bf4a6", fontWeight: 600 }}>{item.days}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: "12px 16px", background: "#ff2ec410", borderRadius: 10, fontSize: 13, color: "#94a3b8" }}>
                <strong style={{ color: "#ff2ec4" }}>Key outcomes:</strong> All 6 Russian VMs fully active and tested. Pharmasyntez Africa distribution agreement signed. Government trade office meetings. Supplement supply contracts confirmed.
              </div>
            </Card>

            {/* Featured: Rwanda Expo */}
            <Card accent="#5bf4a6" style={{ border: "2px solid #5bf4a6", marginBottom: 24, padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 48 }}>🇷🇼</div>
                <div>
                  <div style={{ fontSize: 10, color: "#5bf4a6", fontWeight: 800, letterSpacing: 3, marginBottom: 4 }}>EAST AFRICA EXPANSION</div>
                  <h3 style={{ fontSize: 26, fontWeight: 900, color: "#fff", ...GlowText({ children: "RWANDA HEALTH AI EXPO", color: "#5bf4a6" }) }} />
                  <div style={{ fontSize: 14, color: "#94a3b8" }}>
                    {fmtDate("2026-08-12")} — {fmtDate("2026-08-14")} · Kigali, Rwanda 🇷🇼
                  </div>
                </div>
                <div style={{ marginLeft: "auto", textAlign: "right" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#5bf4a6", ...GlowText({ children: "500+", color: "#5bf4a6" }) }}>attendees</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>Exhibition</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7, marginBottom: 16 }}>
                Studex Health exhibition booth. Cold chain facility announcement. Rwanda VM partner signing.
                EAC health ministers conference. AI agent demonstrations. Kigali Logistics Platform tours.
                Connection to Kenya, Uganda, Tanzania, Ethiopia expansion.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Kigali Cold Chain Announcement", "EAC Health Ministers Summit", "VM Partner Signing (Kenya + Uganda)", "ADAM SMASHER Demo", "AfCFTA EAC Tariff Workshop", "Rwanda University Research"].map((item) => (
                  <span key={item} style={{ background: "#5bf4a618", border: "1px solid #5bf4a633", borderRadius: 100, padding: "4px 12px", fontSize: 11, color: "#5bf4a6", fontWeight: 600 }}>{item}</span>
                ))}
              </div>
            </Card>

            {/* All Events Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
              {EVENTS.filter(e => e.id !== "russia-tour" && e.id !== "rwanda-expo").map((event) => (
                <Card key={event.id} accent={event.status === "this-month" ? "#ff2ec4" : "#334155"} style={{ borderTop: `3px solid ${event.status === "this-month" ? "#ff2ec4" : "#334155"}`, padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div style={{ fontSize: 28 }}>{event.flag}</div>
                    <div style={{ textAlign: "right" }}>
                      {event.status === "this-month" && (
                        <span style={{ background: "#ff2ec420", color: "#ff2ec4", padding: "2px 10px", borderRadius: 100, fontSize: 10, fontWeight: 800 }}>🔥 THIS MONTH</span>
                      )}
                      <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{typeIcon(event.type)} {event.type}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{event.name}</div>
                  <div style={{ fontSize: 12, color: "#5bf4a6", marginBottom: 6 }}>
                    {fmtDate(event.date)}{event.endDate ? ` — ${fmtDate(event.endDate)}` : ""} · {event.city}, {event.country}
                  </div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8 }}>{event.description}</div>
                  <div style={{ fontSize: 11, color: "#D97706", fontWeight: 600 }}>Theme: {event.theme}</div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>👥 {event.attendees}+ expected</div>
                </Card>
              ))}
            </div>

            {/* Monthly Conference Calendar */}
            <Card accent="#D97706" style={{ marginTop: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#D97706", marginBottom: 16, ...GlowText({ children: "📅 2026 MONTHLY CONFERENCE CALENDAR — AHIS", color: "#D97706" }) }} />
              <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
                {[
                  { month: "JUL", city: "Johannesburg", flag: "🇿🇦", theme: "VM Launch", color: "#ff2ec4" },
                  { month: "AUG", city: "Cape Town", flag: "🇿🇦", theme: "Cold Chain", color: "#5bf4a6" },
                  { month: "SEP", city: "Gaborone", flag: "🇧🇼", theme: "SADC Forum", color: "#D97706" },
                  { month: "OCT", city: "Nairobi", flag: "🇰🇪", theme: "E. Africa", color: "#5bf4a6" },
                  { month: "NOV", city: "Accra", flag: "🇬🇭", theme: "W. Africa", color: "#D97706" },
                  { month: "DEC", city: "Kigali", flag: "🇷🇼", theme: "Cold Chain", color: "#ff2ec4" },
                ].map((m, i) => (
                  <div key={m.month} style={{ flex: 1, minWidth: 120, textAlign: "center", padding: "16px 8px", borderRight: "1px solid #1e293b", position: "relative" }}>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>{i === 0 ? "▼ THIS MONTH" : ""}</div>
                    <div style={{ fontSize: 11, fontWeight: 900, color: m.color, ...GlowText({ children: m.month, color: m.color }) }}>{m.month}</div>
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{m.flag}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{m.city}</div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>{m.theme}</div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* ─── RUSSIA VMs TAB ─── */}
        {activeTab === "russia" && (
          <>
            <div style={{ marginBottom: 8, textAlign: "center" }}>
              <h2 style={{ fontSize: 28, fontWeight: 800 }}>
                <span style={{ color: "#ff2ec4", ...GlowText({ children: "🇷🇺 RUSSIAN PHARMA VM NETWORK", color: "#ff2ec4" }) }}
                </span>
              </h2>
              <p style={{ color: "#64748b", fontSize: 14 }}>6 dedicated AI Agent VMs connecting Russian pharma to the African market</p>
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { val: "6", label: "Russian VMs", color: "#ff2ec4" },
                { val: "4", label: "Active Now", color: "#5bf4a6" },
                { val: "2", label: "Provisioning", color: "#D97706" },
                { val: "5", label: "Factories Visited", color: "#5bf4a6" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(30,30,46,0.9)", border: `1px solid ${s.color}33`, borderRadius: 14, padding: "18px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: s.color, ...GlowText({ children: s.val, color: s.color }) }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Full Russia VM cards */}
            {RUSSIAN_CLIENTS.map((client) => (
              <Card key={client.id} accent="#ff2ec4" style={{ marginBottom: 16, borderTop: "3px solid #ff2ec4" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{client.name}</div>
                      <VMStatusBadge status={client.status} />
                    </div>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>📍 {client.location}</div>
                    <div style={{ fontSize: 10, fontFamily: "monospace", color: "#475569", marginBottom: 8 }}>{client.vmId}</div>
                    <div style={{ fontSize: 11, color: "#5bf4a6", marginBottom: 4 }}><strong>Focus:</strong> {client.focus}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>👥 {client.employees} employees · Est. {client.established}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#ff2ec4", marginBottom: 8 }}>💊 PRODUCT PORTFOLIO</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {client.products.map((p) => (
                        <span key={p} style={{ background: "#ff2ec415", border: "1px solid #ff2ec433", borderRadius: 100, padding: "2px 8px", fontSize: 10, color: "#cbd5e1" }}>{p}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#D97706", marginBottom: 8 }}>🤖 VM CONFIGURATION</div>
                    {[
                      ["VM ID", client.vmId],
                      ["Region", "Russia (Moscow)"],
                      ["OS", "Linux + QwenPaw"],
                      ["Agents", client.status === "active" ? "3 active" : client.status === "provisioning" ? "Deploying..." : "Pending"],
                      ["Memory", client.status === "active" ? "50GB GPU ready" : "32GB RAM"],
                    ].map(([label, val]) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b", marginBottom: 4 }}>
                        <span>{label}:</span>
                        <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Africa connection bar */}
                <div style={{ marginTop: 12, padding: "10px 14px", background: "#ff2ec410", borderRadius: 8, fontSize: 11, color: "#94a3b8" }}>
                  <strong style={{ color: "#ff2ec4" }}>→ Africa Corridor:</strong>{" "}
                  {client.name} products flowing to SA → Botswana → Eswatini → Mozambique → Zimbabwe → Namibia (AfCFTA preferential tariffs via ADAM SMASHER compliance agent)
                </div>
              </Card>
            ))}

            {/* Russia Tour Announcement */}
            <Card accent="#ff2ec4" style={{ border: "2px solid #ff2ec4", padding: 24, marginTop: 8 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 11, color: "#ff2ec4", fontWeight: 800, letterSpacing: 3, marginBottom: 4 }}>UPCOMING</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", ...GlowText({ children: "RUSSIA PHARMA TECH TOUR", color: "#ff2ec4" }) }} />
                  <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 4 }}>{fmtDate("2026-07-20")} — {fmtDate("2026-07-30")} · Moscow + St. Petersburg</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#ff2ec4", ...GlowText({ children: "10", color: "#ff2ec4" }) }}>days</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>8-person delegation</div>
                </div>
              </div>
              <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {["Factory visits — all 6 partners", "VM provisioning + testing", "Government trade meetings", "Supply contracts signed"].map((item) => (
                  <div key={item} style={{ background: "#ff2ec415", border: "1px solid #ff2ec433", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: "#cbd5e1", textAlign: "center" }}>✓ {item}</div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* ─── AFRICA MAP TAB ─── */}
        {activeTab === "africa" && (
          <>
            <div style={{ marginBottom: 8, textAlign: "center" }}>
              <h2 style={{ fontSize: 28, fontWeight: 800 }}>
                <span style={{ color: "#D97706", ...GlowText({ children: "🌍 AFRICA EXPANSION MAP", color: "#D97706" }) }}
                </span>
              </h2>
              <p style={{ color: "#64748b", fontSize: 14 }}>Phase 1 (SA) → Phase 2 (SADC) → Phase 3 (East + West Africa) → Phase 4 (North Africa)</p>
            </div>

            {/* Phase indicators */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
              {[
                { phase: "PHASE 1", label: "South Africa", color: "#ff2ec4", count: "2 hubs", status: "ACTIVE" },
                { phase: "PHASE 2", label: "SADC (5 countries)", color: "#5bf4a6", count: "5 partners", status: "IN NEGOTIATION" },
                { phase: "PHASE 3", label: "East + West Africa", color: "#D97706", count: "9 partners", status: "EXPLORING" },
                { phase: "PHASE 4", label: "North Africa", color: "#5bf4a6", count: "3 partners", status: "EXPLORING" },
              ].map(p => (
                <div key={p.phase} style={{ flex: 1, maxWidth: 200, background: `${p.color}15`, border: `1px solid ${p.color}44`, borderRadius: 12, padding: "12px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: p.color, letterSpacing: 2, marginBottom: 4 }}>{p.phase}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{p.label}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{p.count}</div>
                  <div style={{ fontSize: 9, color: p.color, fontWeight: 700, marginTop: 4 }}>{p.status}</div>
                </div>
              ))}
            </div>

            {/* Africa partners by type */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
              {/* SADC */}
              <Card accent="#5bf4a6">
                <div style={{ fontSize: 13, fontWeight: 800, color: "#5bf4a6", marginBottom: 12, ...GlowText({ children: "🇿🇦 PHASE 1 — SOUTH AFRICA CORE", color: "#5bf4a6" }) }} />
                {AFRICA_PARTNERS.filter(p => p.country === "South Africa").map(p => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #1e293b" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{p.flag}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{p.name}</div>
                        <div style={{ fontSize: 10, color: "#64748b", textTransform: "capitalize" }}>{p.type}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 10, color: "#5bf4a6", fontWeight: 700, textTransform: "uppercase" }}>{p.vmStatus}</div>
                  </div>
                ))}
              </Card>
              {/* SADC Neighbours */}
              <Card accent="#5bf4a6">
                <div style={{ fontSize: 13, fontWeight: 800, color: "#5bf4a6", marginBottom: 12, ...GlowText({ children: "🌐 PHASE 2 — SADC NEIGHBOURS", color: "#5bf4a6" }) }} />
                {AFRICA_PARTNERS.filter(p => ["Botswana", "Eswatini", "Mozambique", "Zimbabwe", "Namibia", "Zambia", "Malawi"].includes(p.country)).map(p => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #1e293b" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{p.flag}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{p.name}</div>
                        <div style={{ fontSize: 10, color: "#64748b" }}>{p.focus}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 10, color: statusColor(p.status), fontWeight: 700, textTransform: "uppercase" }}>{p.status}</span>
                  </div>
                ))}
              </Card>
              {/* East Africa */}
              <Card accent="#D97706">
                <div style={{ fontSize: 13, fontWeight: 800, color: "#D97706", marginBottom: 12, ...GlowText({ children: "🇰🇪 PHASE 3 — EAST AFRICA (Rwanda Priority)", color: "#D97706" }) }} />
                {AFRICA_PARTNERS.filter(p => ["Rwanda", "Kenya", "Uganda", "Ethiopia"].includes(p.country)).map(p => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #1e293b" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{p.flag}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{p.name}</div>
                        <div style={{ fontSize: 10, color: "#64748b" }}>{p.focus}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 10, color: statusColor(p.status), fontWeight: 700, textTransform: "uppercase" }}>{p.status}</div>
                      <div style={{ fontSize: 9, color: statusColor(p.vmStatus), textTransform: "uppercase" }}>VM: {p.vmStatus}</div>
                    </div>
                  </div>
                ))}
                {/* Rwanda Exhibition callout */}
                <div style={{ marginTop: 12, background: "#D9770620", border: "1px solid #D9770666", borderRadius: 10, padding: "12px" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#D97706", marginBottom: 4 }}>🇷🇼 RWANDA EXHIBITION</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{fmtDate("2026-08-12")} — {fmtDate("2026-08-14")} · Kigali</div>
                  <div style={{ fontSize: 11, color: "#5bf4a6" }}>Cold chain facility opening · EAC ministers</div>
                </div>
              </Card>
              {/* West + North Africa */}
              <Card accent="#5bf4a6">
                <div style={{ fontSize: 13, fontWeight: 800, color: "#5bf4a6", marginBottom: 12, ...GlowText({ children: "🌍 PHASE 3+4 — WEST + NORTH AFRICA", color: "#5bf4a6" }) }} />
                {AFRICA_PARTNERS.filter(p => ["Ghana", "Nigeria", "Egypt", "Morocco", "Tunisia", "Cape Verde"].includes(p.country)).map(p => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #1e293b" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{p.flag}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{p.name}</div>
                        <div style={{ fontSize: 10, color: "#64748b" }}>{p.focus}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 10, color: statusColor(p.status), fontWeight: 700, textTransform: "uppercase" }}>{p.status}</span>
                  </div>
                ))}
              </Card>
            </div>

            {/* University Research Partners */}
            <Card accent="#D97706">
              <div style={{ fontSize: 13, fontWeight: 800, color: "#D97706", marginBottom: 12, ...GlowText({ children: "🎓 UNIVERSITY RESEARCH PARTNERS", color: "#D97706" }) }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                {AFRICA_PARTNERS.filter(p => p.type === "university").map(p => (
                  <div key={p.id} style={{ background: "#D9770615", border: "1px solid #D9770644", borderRadius: 10, padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: 20, marginBottom: 6 }}>{p.flag}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>{p.focus}</div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* ─── APPLY TAB ─── */}
        {activeTab === "apply" && (
          <>
            {/* Partnership Tiers */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 4 }}>
                CHOOSE YOUR <span style={{ color: "#ff2ec4", ...GlowText({ children: "PARTNERSHIP TIER", color: "#ff2ec4" }) }}
                </span>
              </h2>
              <p style={{ textAlign: "center", color: "#64748b", fontSize: 13, marginBottom: 20 }}>All tiers include access to the full Studex Health network: 6 Russia VMs + 8 SA partners + 23 Africa partners</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => { setSelectedTier(tier.id); setStep(0); }}
                    style={{
                      background: "linear-gradient(135deg, rgba(30,30,46,0.95), rgba(15,23,42,0.9))",
                      border: `2px solid ${selectedTier === tier.id ? tier.color : tier.color + "33"}`,
                      borderRadius: 20, padding: 28, cursor: "pointer",
                      boxShadow: selectedTier === tier.id ? `0 0 40px ${tier.color}33` : "none",
                      transform: selectedTier === tier.id ? "scale(1.03)" : "scale(1)",
                      transition: "all 0.3s",
                    }}
                  >
                    {selectedTier === tier.id && (
                      <div style={{ position: "absolute", top: -14, left: 16, background: tier.color, color: "#0F172A", padding: "4px 14px", borderRadius: 100, fontSize: 11, fontWeight: 900 }}>✓ SELECTED</div>
                    )}
                    <div style={{ fontSize: 10, color: tier.color, letterSpacing: 3, fontWeight: 800, marginBottom: 8 }}>{tier.name}</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: tier.color, ...GlowText({ children: tier.price, color: tier.color }), marginBottom: 4 }}>{tier.price}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 16 }}>{tier.tagline}</div>
                    <div style={{ height: 1, background: `${tier.color}22`, marginBottom: 16 }} />
                    {tier.perks.map((perk) => (
                      <div key={perk} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 13, color: "#cbd5e1" }}>
                        <span style={{ color: tier.color }}>✓</span>{perk}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            {selectedTier && (
              <Card accent="#ff2ec4" style={{ maxWidth: 700, margin: "0 auto" }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 20 }}>
                  PARTNER APPLICATION <span style={{ color: "#ff2ec4", fontSize: 14, fontWeight: 400 }}>
                    — {TIERS.find(t => t.id === selectedTier)?.name}
                  </span>
                </h3>

                {/* Step progress */}
                <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
                  {[{ num: 1, label: "Company" }, { num: 2, label: "Focus" }, { num: 3, label: "VMs" }, { num: 4, label: "Submit" }].map((s) => (
                    <div key={s.num} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ height: 4, borderRadius: 2, marginBottom: 6, background: step >= s.num - 1 ? "#5bf4a6" : "#1e293b", boxShadow: step >= s.num - 1 ? "0 0 10px #5bf4a6" : "none", transition: "all 0.3s" }} />
                      <div style={{ fontSize: 10, color: step >= s.num - 1 ? "#5bf4a6" : "#475569", fontWeight: 600 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Step 0: Company */}
                {step === 0 && (
                  <div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      {[
                        { label: "COMPANY NAME *", key: "companyName", placeholder: "e.g. PharmaCare Botswana", type: "text" },
                        { label: "CONTACT NAME *", key: "contactName", placeholder: "Dr. Precious Molefe", type: "text" },
                        { label: "EMAIL *", key: "email", placeholder: "p.molefe@pharmacare.co.bw", type: "email" },
                        { label: "PHONE / WHATSAPP", key: "phone", placeholder: "+267 71 234 567", type: "text" },
                      ].map((field) => (
                        <div key={field.key}>
                          <label style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 5 }}>{field.label}</label>
                          <input
                            type={field.type}
                            value={(form as any)[field.key]}
                            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                            style={{ width: "100%", padding: "11px 13px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 13, boxSizing: "border-box" }}
                          />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
                      <div>
                        <label style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 5 }}>COUNTRY *</label>
                        <select
                          value={form.country}
                          onChange={(e) => setForm({ ...form, country: e.target.value })}
                          style={{ width: "100%", padding: "11px 13px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 13, boxSizing: "border-box" }}
                        >
                          <option value="">Select country...</option>
                          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 5 }}>COMPANY SIZE</label>
                        <div style={{ display: "flex", gap: 6 }}>
                          {(["startup", "smb", "enterprise"] as Size[]).map(s => (
                            <button
                              key={s}
                              onClick={() => setForm({ ...form, size: s })}
                              style={{ flex: 1, padding: "10px 4px", borderRadius: 8, border: `1px solid ${form.size === s ? "#5bf4a6" : "#334155"}`, background: form.size === s ? "#5bf4a618" : "transparent", color: form.size === s ? "#5bf4a6" : "#64748b", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "uppercase" }}
                            >
                              {s === "smb" ? "SMB" : s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Focus */}
                {step === 1 && (
                  <div>
                    <p style={{ color: "#94a3b8", marginBottom: 16, fontSize: 13 }}>Select all focus areas:</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                      {FOCUS_AREAS.map((area) => (
                        <div
                          key={area.id}
                          onClick={() => {
                            const areas = form.focusAreas.includes(area.id)
                              ? form.focusAreas.filter(a => a !== area.id)
                              : [...form.focusAreas, area.id];
                            setForm({ ...form, focusAreas: areas });
                          }}
                          style={{ padding: "14px", borderRadius: 12, border: `1px solid ${form.focusAreas.includes(area.id) ? "#5bf4a6" : "#334155"}`, background: form.focusAreas.includes(area.id) ? "#5bf4a618" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
                        >
                          <span style={{ fontSize: 20 }}>{area.icon}</span>
                          <div style={{ fontSize: 12, fontWeight: 600, color: form.focusAreas.includes(area.id) ? "#5bf4a6" : "#cbd5e1" }}>{area.label}</div>
                          {form.focusAreas.includes(area.id) && <span style={{ marginLeft: "auto", color: "#5bf4a6", fontSize: 16 }}>✓</span>}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 14 }}>
                      <label style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 5 }}>WEBSITE</label>
                      <input
                        value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                        placeholder="https://pharmacare.co.bw"
                        style={{ width: "100%", padding: "11px 13px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 13, boxSizing: "border-box" }}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: VMs */}
                {step === 2 && (
                  <div>
                    <p style={{ color: "#94a3b8", marginBottom: 16, fontSize: 13 }}>How many VMs for your team?</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                      <button onClick={() => setVmCount(Math.max(1, vmCount - 1))} style={{ width: 44, height: 44, borderRadius: "50%", background: "#1e293b", border: "1px solid #334155", color: "#5bf4a6", fontSize: 22, cursor: "pointer" }}>−</button>
                      <div style={{ fontSize: 56, fontWeight: 900, color: "#5bf4a6", ...GlowText({ children: String(vmCount), color: "#5bf4a6" }), minWidth: 80, textAlign: "center" }}>{vmCount}</div>
                      <button onClick={() => setVmCount(vmCount + 1)} style={{ width: 44, height: 44, borderRadius: "50%", background: "#1e293b", border: "1px solid #334155", color: "#5bf4a6", fontSize: 22, cursor: "pointer" }}>+</button>
                      <div style={{ color: "#94a3b8", fontSize: 13 }}>
                        {selectedTier === "founder" ? "FREE (Equity)" : selectedTier === "strategic" ? `$${vmCount * 2500}/mo` : `$${vmCount * 499}/mo`}
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 5 }}>DESCRIBE YOUR USE CASE</label>
                      <textarea
                        value={form.vmNeeds}
                        onChange={(e) => setForm({ ...form, vmNeeds: e.target.value })}
                        placeholder="e.g. Running 5 AI agents for order tracking, regulatory compliance, cold chain monitoring..."
                        rows={4}
                        style={{ width: "100%", padding: "11px 13px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 13, resize: "vertical", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Submit */}
                {step === 3 && (
                  <div>
                    <div style={{ background: "#5bf4a618", border: "1px solid #5bf4a633", borderRadius: 14, padding: 18, marginBottom: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: "#5bf4a6", marginBottom: 10, letterSpacing: 2 }}>APPLICATION REVIEW</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 20px", fontSize: 13 }}>
                        {[
                          ["Company", form.companyName], ["Contact", form.contactName],
                          ["Email", form.email], ["Country", form.country],
                          ["Tier", TIERS.find(t => t.id === selectedTier)?.name],
                          ["VMs", String(vmCount)],
                        ].map(([label, val]) => (
                          <div key={label} style={{ display: "contents" }}>
                            <span style={{ color: "#64748b" }}>{label}:</span>
                            <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 5 }}>ADDITIONAL MESSAGE</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Anything else..."
                        rows={3}
                        style={{ width: "100%", padding: "11px 13px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff", fontSize: 13, resize: "vertical", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
                      />
                    </div>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 16, cursor: "pointer" }}>
                      <input type="checkbox" checked={form.agreedToTerms} onChange={(e) => setForm({ ...form, agreedToTerms: e.target.checked })} style={{ marginTop: 3, accentColor: "#5bf4a6", width: 16, height: 16 }} />
                      <span style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>
                        I agree to the <strong style={{ color: "#ff2ec4" }}>Studex Health Partner Terms</strong> and authorize Studex Global Markets to contact me about partnership opportunities and VM provisioning.
                      </span>
                    </label>
                  </div>
                )}

                {/* Navigation */}
                <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                  {step > 0 && (
                    <button onClick={() => setStep(step - 1)} style={{ flex: 1, padding: "13px", borderRadius: 12, background: "transparent", border: "1px solid #334155", color: "#94a3b8", fontWeight: 600, cursor: "pointer" }}>
                      ← BACK
                    </button>
                  )}
                  <button
                    onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
                    disabled={step === 0 && (!form.companyName || !form.email || !form.country)}
                    style={{ flex: 2, padding: "13px", borderRadius: 12, background: step < 3 ? "#5bf4a6" : "#ff2ec4", border: "none", color: "#0F172A", fontWeight: 800, fontSize: 14, cursor: "pointer", opacity: step === 0 && (!form.companyName || !form.email || !form.country) ? 0.4 : 1, boxShadow: step < 3 ? "0 0 20px #5bf4a644" : "0 0 30px #ff2ec466" }}
                  >
                    {step < 3 ? "CONTINUE →" : "🚀 SUBMIT APPLICATION"}
                  </button>
                </div>
              </Card>
            )}
          </>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(91,244,166,0.1)", padding: "24px 32px", textAlign: "center" }}>
        <p style={{ color: "#475569", fontSize: 12 }}>
          🤖 Powered by ADAM SMASHER | Studex Global Markets | 10 Years of AI Innovation (2016–2026)
        </p>
        <p style={{ color: "#475569", fontSize: 11, marginTop: 4 }}>
          📧 info@studexmeat.com | 🌐 www.studexmeat.com | 🇿🇦 JHB + Cape Town | 🇷🇺 6 Russia VMs | 🇷🇼 Rwanda Kigali Hub
        </p>
      </div>
    </div>
  );
}

function handleSubmit() {
  // handled via state
}
