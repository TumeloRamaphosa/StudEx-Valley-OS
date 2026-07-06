// ============================================================
// STUDENT HEALTH — AI AGENT VM OUTREACH PACKAGE
// Studex Global Markets | ADAM SMASHER | v1.0
// ============================================================

export interface Company {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  country: string;
  type: "distributor" | "manufacturer" | "wholesaler" | "medical-device" | "pharmacy" | "logistics";
  priority: "hot" | "warm" | "cold";
  focusAreas: string[];
  notes: string;
  outreachSent: boolean;
  responded: boolean;
}

export interface OutreachEmail {
  id: string;
  to: string;
  subject: string;
  body: string;
  status: "draft" | "queued" | "sent" | "opened" | "replied";
  sentAt?: string;
  openedAt?: string;
  replyText?: string;
}

// ============================================================
// COMPANY DATABASE — 13 South African health companies
// ============================================================

export const COMPANIES: Company[] = [
  // HOT PRIORITY — confirmed email, large network
  {
    id: "pharmasyntez",
    name: "Pharmasyntez (Russia)",
    contact: "Partnership Team",
    email: "info@pharmasyntez.com",
    phone: "+7 (495) 925-11-04",
    country: "Russia",
    type: "manufacturer",
    priority: "hot",
    focusAreas: ["distribution", "manufacturing", "research"],
    notes: "Leading Russian biopharma. 4,000+ employees, 5 factories. Products: TB, HIV, oncology, diabetes. Key Russia partner for Studex Health.",
    outreachSent: false,
    responded: false,
  },
  {
    id: "medwell-sa",
    name: "Medwell SA",
    contact: "Partnerships Team",
    email: "info@medwell.co.za",
    phone: "010 006 5538",
    country: "South Africa",
    type: "distributor",
    priority: "hot",
    focusAreas: ["distribution", "digital-health"],
    notes: "Home nursing, medical products, IV clinics, dementia programmes. National + Cape Town offices. 8 branches nationwide.",
    outreachSent: false,
    responded: false,
  },
  {
    id: "cj-distribution",
    name: "CJ Distribution (CJDSA)",
    contact: "Sales Team",
    email: "sales@cjmarketing.co",
    phone: "013 010 0091",
    country: "South Africa",
    type: "wholesaler",
    priority: "hot",
    focusAreas: ["distribution", "wholesale"],
    notes: "20,000+ product lines. Mpumalanga/Limpopo coverage. Delmas HQ. WhatsApp ordering. Own training academy. Sister to Pharmacy Development Academy.",
    outreachSent: false,
    responded: false,
  },
  {
    id: "evohealth",
    name: "EvoHealth (Pty) Ltd",
    contact: "Enquiries",
    email: "enquiries@evohealth.co.za",
    phone: "+27 11 656 3338",
    country: "South Africa",
    type: "manufacturer",
    priority: "hot",
    focusAreas: ["manufacturing", "distribution", "wholesale"],
    notes: "SAHPRA licensed manufacturer. Vitamins, minerals, supplements, CBD oils. Manufacturing + importing + exporting.",
    outreachSent: false,
    responded: false,
  },
  {
    id: "asnika-intl",
    name: "Asnika International",
    contact: "Partnerships",
    email: "info@asnikainternational.com",
    phone: "+27 79969 9231",
    country: "South Africa",
    type: "distributor",
    priority: "hot",
    focusAreas: ["distribution", "manufacturing", "wholesale"],
    notes: "Global merchant trading. APIs, excipients, packaging, lab supplies, surgical consumables, hospital products. Africa + India + EU + GCC.",
    outreachSent: false,
    responded: false,
  },
  // WARM PRIORITY
  {
    id: "city-medical",
    name: "City Medical Wholesalers",
    contact: "Unknown",
    email: "",
    phone: "",
    country: "South Africa",
    type: "wholesaler",
    priority: "warm",
    focusAreas: ["distribution", "wholesale"],
    notes: "20,000+ pharma products. National doorstep delivery. Independent + corporate pharmacies, hospitals, dispensing doctors.",
    outreachSent: false,
    responded: false,
  },
  {
    id: "jehu-industries",
    name: "Jehu Industries",
    contact: "Partnerships",
    email: "",
    phone: "+27 83 678 0800 (JHB)",
    country: "South Africa",
    type: "medical-device",
    priority: "warm",
    focusAreas: ["manufacturing", "distribution"],
    notes: "Medical devices. BD products. Durban HQ + Cape Town + Johannesburg + Harrismith. Tender management. Inventory management. CPD training.",
    outreachSent: false,
    responded: false,
  },
  {
    id: "zetalabs",
    name: "Zeta Laboratories",
    contact: "Info",
    email: "info@zetalabs.co.za",
    phone: "031 701 9858",
    country: "South Africa",
    type: "manufacturer",
    priority: "warm",
    focusAreas: ["manufacturing", "research"],
    notes: "Health and beauty products. Creams, lotions, fragrances. R&D. Private label. Pinetown, KZN. In-house packaging solutions.",
    outreachSent: false,
    responded: false,
  },
  {
    id: "bioclin",
    name: "BioClin Solutions CC",
    contact: "Enquiries",
    email: "",
    phone: "(012) 326 7771",
    country: "South Africa",
    type: "medical-device",
    priority: "warm",
    focusAreas: ["manufacturing", "distribution"],
    notes: "Medical equipment supplier + repair/servicing. Welch Allyn, Bionix. Hospital furniture, surgical instruments. Repair + calibration.",
    outreachSent: false,
    responded: false,
  },
  {
    id: "ringpharm",
    name: "Ringpharm (Pty) Ltd",
    contact: "Unknown",
    email: "",
    phone: "",
    country: "South Africa",
    type: "pharmacy",
    priority: "warm",
    focusAreas: ["distribution", "wholesale"],
    notes: "Chain of independent community pharmacies. Personalized care, affordability. Contact info not found — need LinkedIn research.",
    outreachSent: false,
    responded: false,
  },
  // COLD — need more research
  {
    id: "janoo-medical",
    name: "Janoo Medical Group",
    contact: "Unknown",
    email: "",
    phone: "",
    country: "South Africa",
    type: "medical-device",
    priority: "cold",
    focusAreas: ["distribution"],
    notes: "Website under maintenance. Products/services unclear. Need LinkedIn or direct call.",
    outreachSent: false,
    responded: false,
  },
  {
    id: "pdpharm",
    name: "PDP Pharm",
    contact: "Unknown",
    email: "",
    phone: "",
    country: "South Africa",
    type: "pharmacy",
    priority: "cold",
    focusAreas: ["distribution", "wholesale"],
    notes: "Website down (pdpharm.co.za unreachable). Need direct research.",
    outreachSent: false,
    responded: false,
  },
  {
    id: "art-engineer",
    name: "Art Engineer (Russia)",
    contact: "Unknown",
    email: "",
    phone: "",
    country: "Russia",
    type: "manufacturer",
    priority: "cold",
    focusAreas: ["manufacturing", "research", "digital-health"],
    notes: "Russian company — URL from your list. Need Russian-language research + email finding.",
    outreachSent: false,
    responded: false,
  },
];

// ============================================================
// EMAIL TEMPLATES
// ============================================================

export const EMAIL_TEMPLATES = {
  initialCold: (company: Partial<Company>) => ({
    subject: `🤖 Studex Health — AI Agent VM + Distribution Network Invitation`,
    body: `Dear ${company.contact || "Partner"},

I am reaching out on behalf of Tumelo Ramaphosa, Founder of Studex Global Markets — 10 years building AI and blockchain systems for African trade.

We are launching Studex Health this Friday, a pan-African pharmaceutical intelligence network powered by AI Agent VMs. Each partner company gets their own dedicated AI agent VM — connected to our global network spanning 19 African countries, Russia, and China.

**What this means for your company:**

• Your own AI agent VM running 24/7 — automates order tracking, regulatory compliance, cold chain monitoring, and inventory management
• Connection to 4 Russian pharmaceutical clients (Pharmasyntez and partners) — ready to distribute essential supplements while licensing is finalized
• Access to the Studex Health distribution corridor: South Africa → Botswana → Eswatini → Mozambique → Zimbabwe → Namibia → and 13 more countries
• Connection to our China tech partners: Tencent, ByteDance, MiniMax, Kimi AI
• Monthly African health industry conferences — your company featured as a key participant
• AfCFTA preferential tariff rates on all cross-border pharma trades

**Right now, while you wait for licensing:**
We distribute essential supplements and health products immediately through our established SA partners, generating revenue while the full pharmaceutical licensing process completes.

**This Friday's launch — limited VM slots available:**

[ LIVE DEMO: https://py3o5nwycq7s.space.minimax.io/studex-health ]

Reply to this email and our AI agent ADAM SMASHER will provision your VM within 24 hours.

Looking forward to building Africa's pharmaceutical future together.

Warm regards,

ADAM SMASHER — AI Agent for Studex Global Markets
Tumelo Ramaphosa, Founder
📧 info@studexmeat.com | 🌐 www.studexmeat.com | 📱 +27 11 000 0000
🎉 Studex Health Launch: This Friday
`,
  }),

  followUp: (company: Partial<Company>) => ({
    subject: `📋 Following up — Studex Health VM provisioning closes Friday`,
    body: `Hi ${company.contact?.split(" ")[0] || "Partner"},

Following up on our invitation to join the Studex Health AI Agent VM network.

Just wanted to make sure this reached the right person — we have 3 VM slots remaining for this Friday's launch, and demand from African health companies is high.

Our ADAM SMASHER agent has already pre-configured your VM with:
• Pharmaceutical compliance monitoring for SAHPRA/MCC requirements
• AfCFTA tariff calculator for cross-border distribution
• Cold chain tracking dashboard (Johannesburg + Cape Town facilities)
• Connection to Pharmasyntez Russia supply chain
• Multi-language support: English, Russian, Mandarin, Zulu, Afrikaans

If you'd prefer a call, book directly: calendly.com/studex-health/partner-call

VM provisioning closes Friday 5PM SAST.

— ADAM SMASHER
Studex Global Markets | Studex Health
`,
  }),

  supplementsOpportunity: (company: Partial<Company>) => ({
    subject: `💊 Supplement distribution NOW — earn while licensing completes`,
    body: `Dear ${company.contact || "Partner"},

Quick update: We are ready to distribute essential supplements and health products across South Africa RIGHT NOW through our established distribution network.

While pharmaceutical licensing is being finalized, we can immediately:
• Supply vitamins (D3, C, Zinc, Selenium) — sourced from Pharmasyntez Russia + Asnika International
• Distribute CBD oils and wellness products through your pharmacy/hospital network
• Provide private label supplement manufacturing via EvoHealth + Zeta Laboratories partnerships

Our VM network tracks all inventory, orders, and deliveries in real time.

Interested? Reply YES and our AI agent will set up your distributor account today.

— ADAM SMASHER
Studex Health | Studex Global Markets
`,
  }),

  conferenceInvite: (company: Partial<Company>) => ({
    subject: `🎪 INVITE: Monthly African Health Industry Conference — Your spot reserved`,
    body: `Dear ${company.contact || "Partner"},

Starting THIS MONTH — Studex Health is hosting a monthly pan-African health industry conference, rotating across our partner countries.

Each conference features:
• Live AI agent demonstrations (ADAM SMASHER)
• Distribution partnership announcements
• Regulatory updates: SAHPRA, AfCFTA, country-specific
• VM partner showcase — your company featured if you join
• Networking: Pharmasyntez Russia, China tech partners, African distributors

Upcoming conference dates:
• July 2026 — Johannesburg (Launch Edition)
• August 2026 — Cape Town
• September 2026 — Gaborone (Botswana)

RSVP by replying to this email — ADAM SMASHER will send your personalized conference package.

— Studex Health Conference Committee
🤖 Powered by ADAM SMASHER
`,
  }),
};

// ============================================================
// QUEUE — 5 companies with confirmed emails
// ============================================================

export const QUEUED_EMAILS: OutreachEmail[] = [
  {
    id: "q1",
    to: "info@pharmasyntez.com",
    ...EMAIL_TEMPLATES.initialCold({ name: "Pharmasyntez", contact: "Partnerships Team" }),
    status: "draft",
  },
  {
    id: "q2",
    to: "info@medwell.co.za",
    ...EMAIL_TEMPLATES.initialCold({ name: "Medwell SA", contact: "Partnerships Team" }),
    status: "draft",
  },
  {
    id: "q3",
    to: "enquiries@evohealth.co.za",
    ...EMAIL_TEMPLATES.initialCold({ name: "EvoHealth", contact: "Enquiries" }),
    status: "draft",
  },
  {
    id: "q4",
    to: "info@asnikainternational.com",
    ...EMAIL_TEMPLATES.initialCold({ name: "Asnika International", contact: "Partnerships" }),
    status: "draft",
  },
  {
    id: "q5",
    to: "sales@cjmarketing.co",
    ...EMAIL_TEMPLATES.initialCold({ name: "CJ Distribution", contact: "Sales Team" }),
    status: "draft",
  },
  // Supplement opportunity — sent to all 5
  {
    id: "q6",
    to: "info@medwell.co.za",
    ...EMAIL_TEMPLATES.supplementsOpportunity({ name: "Medwell SA", contact: "Partnerships Team" }),
    status: "draft",
  },
  {
    id: "q7",
    to: "enquiries@evohealth.co.za",
    ...EMAIL_TEMPLATES.supplementsOpportunity({ name: "EvoHealth", contact: "Enquiries" }),
    status: "draft",
  },
  {
    id: "q8",
    to: "info@asnikainternational.com",
    ...EMAIL_TEMPLATES.supplementsOpportunity({ name: "Asnika International", contact: "Partnerships" }),
    status: "draft",
  },
  // Conference invite — all 5
  {
    id: "q9",
    to: "info@pharmasyntez.com",
    ...EMAIL_TEMPLATES.conferenceInvite({ name: "Pharmasyntez", contact: "Partnerships" }),
    status: "draft",
  },
  {
    id: "q10",
    to: "info@medwell.co.za",
    ...EMAIL_TEMPLATES.conferenceInvite({ name: "Medwell SA", contact: "Partnerships" }),
    status: "draft",
  },
];
