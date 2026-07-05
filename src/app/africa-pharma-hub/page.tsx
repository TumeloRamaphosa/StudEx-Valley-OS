"use client";

import { useState } from "react";
import {
  MapPin, Building2, Warehouse, Thermometer, Users, GraduationCap,
  Truck, Globe, CheckCircle2, Clock, AlertTriangle, ChevronRight,
  ArrowRight, Package, Pill, BarChart3, Star, ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui";

// ─── Country VM Status ─────────────────────────────────────────────────────────

interface CountryVM {
  country: string;
  flag: string;
  region: string;
  type: "HQ" | "Gov VM" | "Dist" | "Cold Hub" | "Watch";
  status: "active" | "provisioning" | "pending" | "watch";
  facilities: string[];
  university: string;
  govtMinistry: string;
  registration: string;
  notes: string;
  afcftaPriority: number; // 1-5
}

const COUNTRY_VMS: CountryVM[] = [
  {
    country: "South Africa",
    flag: "🇿🇦",
    region: "HQ",
    type: "HQ",
    status: "active",
    facilities: [
      "Research & Manufacturing Lab — Johannesburg, JHB CBD",
      "National Distribution Hub — Johannesburg, City Deep",
      "Cold Storage Facility — Cape Town, Montague Park",
      "Head Office — Sandton",
    ],
    university: "Wits University · UCT · UP",
    govtMinistry: "National Department of Health · SAHPRA · DoT",
    registration: "SAHPRA · MCC · SAPHRA",
    notes: "HQ operations, primary research lab, 3PL partnerships with Unitrans/Crown Logistics",
    afcftaPriority: 5,
  },
  {
    country: "Botswana",
    flag: "🇧🇼",
    region: "SADC",
    type: "Gov VM",
    status: "provisioning",
    facilities: ["Gaborone Distribution Hub"],
    university: "Botswana International University of Science & Technology",
    govtMinistry: "Ministry of Health & Wellness BW",
    registration: "PPB Botswana",
    notes: "SADC compliant, citizen economic empowerment, AfCFTA gateway north",
    afcftaPriority: 5,
  },
  {
    country: "Eswatini",
    flag: "🇸🇿",
    region: "SADC",
    type: "Gov VM",
    status: "pending",
    facilities: ["Mbabane Distribution Point"],
    university: "University of Swaziland",
    govtMinistry: "Ministry of Health ES",
    registration: "Swaziland Medicines Regulatory Authority",
    notes: "Small market, government tender focus, SA同胞",
    afcftaPriority: 3,
  },
  {
    country: "Mozambique",
    flag: "🇲🇿",
    region: "SADC",
    type: "Gov VM",
    status: "pending",
    facilities: ["Maputo Central Hub"],
    university: "Universidade Eduardo Mondlane",
    govtMinistry: "Ministry of Health MZ",
    registration: "ARMUZ — Autoridade Nacional",
    notes: "Port logistics via Maputo Port, Portuguese-speaking, Nacala corridor",
    afcftaPriority: 4,
  },
  {
    country: "Zimbabwe",
    flag: "🇿🇼",
    region: "SADC",
    type: "Gov VM",
    status: "pending",
    facilities: ["Harare Distribution Hub"],
    university: "University of Zimbabwe",
    govtMinistry: "Ministry of Health ZW",
    registration: "MCAZ — Medicines Control Authority",
    notes: "USD pricing, MCAZ approval, skilled pharma workforce, SA同胞",
    afcftaPriority: 4,
  },
  {
    country: "Namibia",
    flag: "🇳🇦",
    region: "SADC",
    type: "Gov VM",
    status: "pending",
    facilities: ["Windhoek Distribution Point"],
    university: "Namibia University of Science & Technology",
    govtMinistry: "Ministry of Health NA",
    registration: "NMC — Namibia Medicines Council",
    notes: "SADC hub, uranium mining pharma needs, Walvis Bay port",
    afcftaPriority: 3,
  },
  {
    country: "Rwanda",
    flag: "🇷🇼",
    region: "EAC",
    type: "Cold Hub",
    status: "active",
    facilities: ["Kigali Cold Storage Facility", "East Africa Logistics Hub"],
    university: "University of Rwanda · Carnegie Mellon Africa",
    govtMinistry: "RDB · Ministry of Health RW",
    registration: "Rwanda FDA",
    notes: "Cold chain priority, EAC hub, RDB investment incentives, ICT-ready",
    afcftaPriority: 5,
  },
  {
    country: "Malawi",
    flag: "🇲🇼",
    region: "SADC",
    type: "Dist",
    status: "watch",
    facilities: ["Lilongwe Distribution Point"],
    university: "University of Malawi · Lilongwe University",
    govtMinistry: "Ministry of Health MW",
    registration: "PPB Malawi — Pharmacy & Poisons Board",
    notes: "New market, DGHS approval needed, Lake Malawi logistics",
    afcftaPriority: 3,
  },
  {
    country: "Zambia",
    flag: "🇿🇲",
    region: "SADC",
    type: "Dist",
    status: "watch",
    facilities: ["Lusaka Distribution Hub"],
    university: "University of Zambia · Copperbelt University",
    govtMinistry: "Ministry of Health ZM",
    registration: "ZAMRA — Zambia Medicines Regulatory Authority",
    notes: "Copper belt industrial pharma needs, Kafue waterway logistics",
    afcftaPriority: 3,
  },
  {
    country: "Uganda",
    flag: "🇺🇬",
    region: "EAC",
    type: "Dist",
    status: "watch",
    facilities: ["Kampala Distribution Hub"],
    university: "Makerere University · Mbarara University",
    govtMinistry: "NDA Uganda — National Drug Authority",
    registration: "NDA Uganda",
    notes: "Strong English-speaking market, NDA approval, Lake Victoria hub",
    afcftaPriority: 4,
  },
  {
    country: "Ghana",
    flag: "🇬🇭",
    region: "ECOWAS",
    type: "Dist",
    status: "watch",
    facilities: ["Accra Distribution Hub"],
    university: "University of Ghana · KNUST",
    govtMinistry: "FDA Ghana",
    registration: "FDA Ghana",
    notes: "English-speaking West Africa gateway, FDA Ghana approval",
    afcftaPriority: 4,
  },
  {
    country: "Ethiopia",
    flag: "🇪🇹",
    region: "EAC",
    type: "Dist",
    status: "watch",
    facilities: ["Addis Ababa Distribution Hub"],
    university: "Addis Ababa University · Addis Ababa Science & Tech",
    govtMinistry: "EFDA Ethiopia — Food & Drug Authority",
    registration: "EFDA Ethiopia",
    notes: "Largest population in Africa (120M+), EFDA approval, Addis hub",
    afcftaPriority: 4,
  },
  {
    country: "Kenya",
    flag: "🇰🇪",
    region: "EAC",
    type: "Dist",
    status: "watch",
    facilities: ["Nairobi Regional Hub", "Mombasa Port Distribution"],
    university: "University of Nairobi · Strathmore",
    govtMinistry: "PPB Kenya — Pharmacy & Poisons Board",
    registration: "PPB Kenya",
    notes: "EAC hub, PPB Kenya approval, strong private pharma sector, port logistics",
    afcftaPriority: 5,
  },
  {
    country: "Nigeria",
    flag: "🇳🇬",
    region: "ECOWAS",
    type: "Dist",
    status: "watch",
    facilities: ["Lagos Mega Hub", "Abuja Distribution Point"],
    university: "University of Lagos · UI Ibadan · UNIBEN",
    govtMinistry: "NAFDAC Nigeria — National Agency",
    registration: "NAFDAC Nigeria",
    notes: "Largest African market (200M+), NAFDAC approval, Lagos port, largest pharma market",
    afcftaPriority: 5,
  },
  {
    country: "Egypt",
    flag: "🇪🇬",
    region: "North Africa",
    type: "Dist",
    status: "watch",
    facilities: ["Cairo Hub", "Alexandria Port Distribution"],
    university: "Cairo University · AUC",
    govtMinistry: "EDA Egypt — Egyptian Drug Authority",
    registration: "EDA Egypt",
    notes: "Arabic-speaking, Suez Canal logistics, EDA approval, largest North Africa market",
    afcftaPriority: 3,
  },
  {
    country: "Morocco",
    flag: "🇲🇦",
    region: "North Africa",
    type: "Dist",
    status: "watch",
    facilities: ["Casablanca Distribution Hub"],
    university: "Université Mohammed V · Al Akhawayn",
    govtMinistry: "MSDA Morocco — Medicines & Pharmacy Authority",
    registration: "MSDA Morocco",
    notes: "Gateway to Maghreb, French-speaking, MSDA approval, Tangier Med port",
    afcftaPriority: 3,
  },
  {
    country: "Tunisia",
    flag: "🇹🇳",
    region: "North Africa",
    type: "Dist",
    status: "watch",
    facilities: ["Tunis Hub"],
    university: "Université de Tunis El Manar",
    govtMinistry: "MOPH Tunisia — Ministry of Public Health",
    registration: "MOPH Tunisia",
    notes: "French-speaking, MOPH approval, Mediterranean gateway",
    afcftaPriority: 2,
  },
  {
    country: "Cape Verde",
    flag: "🇨🇻",
    region: "West Africa",
    type: "Dist",
    status: "watch",
    facilities: ["Praia Atlantic Hub"],
    university: "Universidade de Cabo Verde",
    govtMinistry: "Ministry of Health CV",
    registration: "Ministry of Health CV",
    notes: "Portuguese-speaking, Atlantic gateway, strategic maritime position",
    afcftaPriority: 2,
  },
  {
    country: "Zanzibar",
    flag: "🇿🇲",
    region: "EAC",
    type: "Dist",
    status: "watch",
    facilities: ["Stone Town Distribution Point"],
    university: "State University of Zanzibar",
    govtMinistry: "TFDA Zanzibar — Tanzania Food & Drug Authority",
    registration: "TFDA Zanzibar",
    notes: "Tourism pharma, Swahili-speaking, TFDA approval, Indian Ocean hub",
    afcftaPriority: 2,
  },
];

// ─── AfCFTA Corridor ───────────────────────────────────────────────────────────

const AFCFTA_CORRIDORS = [
  { name: "Maputo Corridor", route: "Johannesburg → Maputo → Beira → Zambia/Malawi/Zimbabwe", type: "Port + Rail", priority: "HIGH" },
  { name: "North-South Corridor", route: "Cape Town → Johannesburg → Zambia → Tanzania → Kenya", type: "Rail + Road", priority: "HIGH" },
  { name: "Beira Corridor", route: "Johannesburg → Beitbridge → Harare → Beira Port", type: "Road + Rail", priority: "HIGH" },
  { name: "Dar es Salaam Corridor", route: "Johannesburg → Nakonde → Tanzania → Rwanda/Uganda", type: "Road + Port", priority: "HIGH" },
  { name: "Lobito Corridor", route: "Lobito (Angola) → Zambia → DRC → Tanzania", type: "Rail (new)", priority: "MEDIUM" },
  { name: "Mombasa Corridor", route: "Mombasa → Nairobi → Kampala → Kigali", type: "Road + Rail", priority: "HIGH" },
  { name: "Dakar Corridor", route: "Dakar → Bamako → Ouagadougou → Niamey → Lagos", type: "Road", priority: "MEDIUM" },
  { name: "Nairobi → Kigali Express", route: "Nairobi → Kampala → Kigali (cold chain priority)", type: "Road", priority: "HIGH" },
];

// ─── University Partnerships ─────────────────────────────────────────────────────

const UNIVERSITY_PARTNERSHIPS = [
  { uni: "Wits University", country: "🇿🇦", focus: "Pharmaceutical research, clinical trials, drug development", status: "Active" },
  { uni: "University of Cape Town", country: "🇿🇦", focus: "Biomedical engineering, cold chain research", status: "Active" },
  { uni: "University of Pretoria", country: "🇿🇦", focus: "Veterinary pharma, agriculture medicine", status: "Active" },
  { uni: "Carnegie Mellon Africa", country: "🇷🇼", focus: "AI, data science, healthcare tech", status: "Negotiating" },
  { uni: "University of Rwanda", country: "🇷🇼", focus: "Public health, epidemiology", status: "Negotiating" },
  { uni: "Makerere University", country: "🇺🇬", focus: "Tropical medicine, clinical research", status: "Watch" },
  { uni: "University of Nairobi", country: "🇰🇪", focus: "Pharmaceutical chemistry, regulatory science", status: "Watch" },
  { uni: "University of Lagos", country: "🇳🇬", focus: "Drug formulation, biotechnology", status: "Watch" },
  { uni: "Addis Ababa Science & Tech", country: "🇪🇹", focus: "Supply chain AI, logistics tech", status: "Watch" },
];

// ─── Component ─────────────────────────────────────────────────────────────────

function CountryCard({ vm, expanded, onToggle }: { vm: CountryVM; expanded: boolean; onToggle: () => void }) {
  const statusMap = {
    active: { tone: "done" as const, label: "Active", color: "var(--green)" },
    provisioning: { tone: "running" as const, label: "Provisioning", color: "var(--pink)" },
    pending: { tone: "queued" as const, label: "Pending", color: "var(--ink-faint)" },
    watch: { tone: "muted" as const, label: "Watch", color: "var(--ink-faint)" },
  };
  const s = statusMap[vm.status];

  return (
    <div
      onClick={onToggle}
      className="rounded-xl border cursor-pointer transition-all"
      style={{
        borderColor: expanded ? "var(--gold)" : "var(--border-soft)",
        background: "var(--surface-2)",
        boxShadow: expanded ? "0 0 20px rgba(201,168,76,0.2)" : "none",
      }}
    >
      <div className="flex items-center gap-3 p-4">
        <span className="text-2xl">{vm.flag}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>{vm.country}</p>
            <Badge tone={s.tone}>{s.label}</Badge>
            <Badge tone="muted">{vm.region}</Badge>
            <Badge tone="muted">{vm.type}</Badge>
          </div>
          <p className="font-mono text-[10px] mt-0.5" style={{ color: "var(--ink-faint)" }}>
            {vm.govtMinistry}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>AfCFTA</p>
            <p className="font-mono text-sm font-bold" style={{ color: "var(--gold)" }}>
              {"★".repeat(vm.afcftaPriority)}
            </p>
          </div>
          <ChevronRight size={14} style={{ color: "var(--ink-faint)", transform: expanded ? "rotate(90deg)" : "none", transition: "all 0.2s" }} />
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t pt-3" style={{ borderColor: "var(--border-soft)" }}>
          {/* Facilities */}
          <div>
            <p className="font-mono text-[10px] font-bold mb-1" style={{ color: "var(--ink-dim)" }}>FACILITIES</p>
            {vm.facilities.map((f) => (
              <div key={f} className="flex items-center gap-1.5 mb-1">
                <Warehouse size={10} style={{ color: "var(--gold)" }} />
                <span className="font-mono text-[11px]" style={{ color: "var(--ink)" }}>{f}</span>
              </div>
            ))}
          </div>

          {/* University */}
          <div className="flex items-center gap-2">
            <GraduationCap size={12} style={{ color: "var(--green)" }} />
            <span className="font-mono text-[11px]" style={{ color: "var(--ink)" }}>{vm.university}</span>
          </div>

          {/* Registration */}
          <div className="flex items-center gap-2">
            <Pill size={12} style={{ color: "var(--pink)" }} />
            <span className="font-mono text-[11px]" style={{ color: "var(--ink)" }}>{vm.registration}</span>
          </div>

          {/* Notes */}
          <p className="font-mono text-[11px]" style={{ color: "var(--ink-dim)" }}>{vm.notes}</p>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AfricaPharmaHubPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<string>("all");

  const regions = ["all", "HQ", "SADC", "EAC", "ECOWAS", "North Africa", "West Africa"];
  const filtered = COUNTRY_VMS.filter((c) => regionFilter === "all" || c.region === regionFilter);

  const statusCounts = COUNTRY_VMS.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-mono text-2xl" style={{ color: "var(--ink-strong)" }}>Africa Pharma Distribution Hub</h1>
        <p className="text-sm mt-1" style={{ color: "var(--ink-dim)" }}>
          Research + manufacturing · 19 countries · AfCFTA corridors · University partnerships · Government VM structures
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: "Countries", value: COUNTRY_VMS.length, color: "var(--ink)" },
          { label: "Active", value: statusCounts.active || 0, color: "var(--green)" },
          { label: "Provisioning", value: statusCounts.provisioning || 0, color: "var(--pink)" },
          { label: "Pending", value: statusCounts.pending || 0, color: "var(--ink-faint)" },
          { label: "Watch", value: statusCounts.watch || 0, color: "var(--ink-faint)" },
          { label: "Facilities", value: COUNTRY_VMS.reduce((a, c) => a + c.facilities.length, 0), color: "var(--gold)" },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-4 rounded-xl border text-center" style={{ borderColor: "var(--border-soft)", background: "var(--surface-2)" }}>
            <p className="font-mono text-xl font-bold" style={{ color }}>{value}</p>
            <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* SA Facilities Highlight */}
      <div className="mb-6 p-4 rounded-xl border" style={{ borderColor: "var(--gold)", background: "rgba(201,168,76,0.05)" }}>
        <div className="flex items-center gap-2 mb-3">
          <Building2 size={16} style={{ color: "var(--gold)" }} />
          <p className="font-mono text-sm font-bold" style={{ color: "var(--gold)" }}>South Africa — HQ & Manufacturing</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: "🔬", name: "Research Lab", loc: "Johannesburg CBD", note: "Drug research, clinical trials" },
            { icon: "📦", name: "Distribution Hub", loc: "Johannesburg City Deep", note: "National 3PL, cold chain" },
            { icon: "❄️", name: "Cold Storage", loc: "Cape Town Montague", note: "Temperature-controlled, Cape Town port" },
            { icon: "🏢", name: "Head Office", loc: "Sandton, JHB", note: "Corporate HQ + Orgo VM main" },
          ].map((f) => (
            <div key={f.name} className="p-3 rounded-lg border" style={{ borderColor: "var(--border-soft)", background: "var(--surface-2)" }}>
              <span className="text-xl">{f.icon}</span>
              <p className="font-mono text-xs font-bold mt-1" style={{ color: "var(--ink)" }}>{f.name}</p>
              <p className="font-mono text-[10px]" style={{ color: "var(--gold)" }}>{f.loc}</p>
              <p className="font-mono text-[10px]" style={{ color: "var(--ink-faint)" }}>{f.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Region Filter */}
      <div className="flex gap-1 mb-4 p-1 rounded-xl inline-flex" style={{ background: "var(--surface-2)", border: "1px solid var(--border-soft)" }}>
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => setRegionFilter(r)}
            className="px-3 py-1.5 rounded-lg font-mono text-xs transition-all"
            style={{
              background: regionFilter === r ? "var(--surface-3)" : "transparent",
              color: regionFilter === r ? "var(--ink)" : "var(--ink-faint)",
            }}
          >
            {r === "all" ? "All" : r}
          </button>
        ))}
      </div>

      {/* Country Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {filtered.map((vm) => (
          <CountryCard
            key={vm.country}
            vm={vm}
            expanded={expanded === vm.country}
            onToggle={() => setExpanded(expanded === vm.country ? null : vm.country)}
          />
        ))}
      </div>

      {/* AfCFTA Corridors */}
      <div className="p-5 rounded-2xl border mb-6" style={{ borderColor: "var(--green)", background: "rgba(57,255,170,0.03)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Truck size={16} style={{ color: "var(--green)" }} />
          <p className="font-mono text-sm font-bold" style={{ color: "var(--green)" }}>AfCFTA Trade Corridors</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {AFCFTA_CORRIDORS.map((c) => (
            <div key={c.name} className="p-3 rounded-lg border" style={{ borderColor: "var(--border-soft)", background: "var(--surface-2)" }}>
              <div className="flex items-center justify-between mb-1">
                <p className="font-mono text-xs font-bold" style={{ color: "var(--ink)" }}>{c.name}</p>
                <Badge tone={c.priority === "HIGH" ? "done" : "queued"}>{c.priority}</Badge>
              </div>
              <p className="font-mono text-[10px]" style={{ color: "var(--ink-dim)" }}>{c.type}</p>
              <p className="font-mono text-[10px] mt-1" style={{ color: "var(--ink-faint)" }}>{c.route}</p>
            </div>
          ))}
        </div>
      </div>

      {/* University Partnerships */}
      <div className="p-5 rounded-2xl border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap size={16} style={{ color: "var(--green)" }} />
          <p className="font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>University Research Partnerships</p>
        </div>
        <div className="space-y-2">
          {UNIVERSITY_PARTNERSHIPS.map((p) => (
            <div key={p.uni} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "var(--surface-2)" }}>
              <span className="text-lg">{p.country}</span>
              <div className="flex-1">
                <p className="font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>{p.uni}</p>
                <p className="font-mono text-[10px]" style={{ color: "var(--ink-dim)" }}>{p.focus}</p>
              </div>
              <Badge tone={p.status === "Active" ? "done" : p.status === "Negotiating" ? "running" : "queued"}>{p.status}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Russia Partnership Note */}
      <div className="mt-6 p-4 rounded-xl border" style={{ borderColor: "#c41230", background: "rgba(196,18,48,0.05)" }}>
        <div className="flex items-center gap-3">
          <Globe size={16} style={{ color: "#c41230" }} />
          <div>
            <p className="font-mono text-sm font-bold" style={{ color: "#c41230" }}>Russia Bridge — Pharmasyntez Partnership</p>
            <p className="font-mono text-xs" style={{ color: "var(--ink-dim)" }}>
              SA-Russia trade corridor via Orgo AI Russia VM. Cold chain pharma imports from Russia, distributed across Africa via AfCFTA corridors.
              Trade Week events (June 9-11) driving initial volume.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
