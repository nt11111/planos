/**
 * Planos — single source of truth for all site copy and figures.
 * Edit numbers here; components only render what this file exports.
 */

export const site = {
  name: "Planos",
  tagline: "Revolutionizing Infrastructure",
  title: "Planos — Turn 2D blueprints into editable 3D CAD models",
  description:
    "Planos converts the 2D blueprints and PDFs your firm already has into editable, parametric 3D CAD models — STL and STEP export, no laser scanner. Built for architecture and engineering firms.",
};

export const nav = {
  links: [
    { label: "Problem", href: "/problem" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Compare", href: "/compare" },
    { label: "Pricing", href: "/pricing" },
  ],
  cta: { label: "Early access", href: "/early-access" },
};

export const hero = {
  kicker: "For architecture & engineering firms",
  // Headline built on the actual pitch line: 2D blueprint → editable 3D CAD, no laser scanner.
  headline: "Turn a 2D blueprint into an editable 3D CAD model.",
  emphasis: "No laser scanner.",
  subhead:
    "Planos reads the drawings your firm already has and returns parametric, export-ready geometry — STL and STEP — in minutes, not weeks.",
  cta: { label: "See how it works", href: "#how-it-works" },
  secondary: { label: "View pricing", href: "/pricing" },
  annotations: {
    sheet: "SHEET A-101 · SCALE 1 : 100",
    extrude: "EXTRUDE · PLAN → VOLUME",
    export: "OUT · STL / STEP",
  },
};

/** Marquee ticker between hero and pipeline. */
export const ticker = [
  "No laser scanner",
  "Editable output",
  "STL / STEP export",
  "Human-reviewed",
  "Minutes, not weeks",
  "Parametric geometry",
];

export const problem = {
  id: "problem",
  kicker: "The problem",
  headline: "Inaccurate drawings carry real costs.",
  intro:
    "When project data is wrong or out of date, the consequences range from budget overruns to structural failure. The numbers below are why blueprint accuracy is not a back-office concern.",
  stats: [
    {
      value: 7,
      prefix: "",
      suffix: "",
      label: "structural collapses per day, on average, in India",
      source: "India’s National Crime Records Bureau",
    },
    {
      value: 28,
      prefix: "",
      suffix: "",
      label: "deaths from building collapse in India in a single recent week",
      source: "India’s National Crime Records Bureau",
    },
    {
      value: 177,
      prefix: "$",
      suffix: "B",
      label:
        "lost annually by the U.S. construction industry to miscommunication tied to inaccurate project data",
      source: "Hardline",
    },
  ],
  caseNote: {
    title: "Not only an emerging-market problem",
    body: "In Manhattan, a structural column at the former Pfizer headquarters collapsed during redevelopment work. Accurate, current documentation of what is actually built remains a first-order safety problem in mature markets too.",
  },
};

export const bottleneck = {
  id: "bottleneck",
  kicker: "The bottleneck",
  headline: ["The building isn’t the bottleneck.", "The blueprint is."],
  body: "Firms still draft plans by hand — then redraw them, manually, as 3D CAD models before any real engineering can start. That redraw step is where weeks disappear and errors creep in.",
  before: {
    label: "Today",
    steps: ["Paper blueprint", "Manual redraw", "CAD model"],
    duration: "2–6 weeks · error-prone",
  },
  after: {
    label: "With Planos",
    steps: ["Paper blueprint", "Planos", "CAD model"],
    duration: "Minutes · reviewed by your team",
  },
};

export const pipeline = {
  id: "how-it-works",
  kicker: "How it works",
  headline: "From sheet to solid, in three steps.",
  steps: [
    {
      n: "01",
      name: "Segment",
      tech: "COMPUTER VISION · SEMANTIC SEGMENTATION",
      body: "A vision model reads the blueprint the way a drafter would — identifying walls, doors, windows and fixtures directly on the sheet.",
    },
    {
      n: "02",
      name: "Vectorize",
      tech: "RASTER → VECTOR",
      body: "The raster sheet becomes clean, layered 2D geometry: true lines and arcs with real coordinates, not pixels.",
    },
    {
      n: "03",
      name: "Extrude",
      tech: "PARAMETRIC SOLIDS · OPENCASCADE KERNEL",
      body: "A parametric solid-modeling kernel lifts the plan into an editable 3D model — geometry you can revise, not a frozen mesh.",
    },
  ],
  exportFormats: ["STL", "STEP"],
  humanInLoop: {
    title: "Human-in-the-loop, by design",
    body: "Planos flags low-confidence geometry for review instead of pretending to be perfect. The model ships when your reviewer signs off — not before.",
  },
  aiStance:
    "The AI does the repetitive modeling. The judgment stays with your architects.",
  featureCards: [
    {
      title: "Flagged for review",
      body: "Low-confidence elements are marked on the model for a human decision — validation is a feature, not a caveat.",
    },
    {
      title: "Editable, parametric output",
      body: "Every model is real CAD geometry. Move a wall, and the model updates — no frozen scan meshes.",
    },
    {
      title: "STL & STEP export",
      body: "Standard formats that drop into the tools your firm already runs.",
    },
  ],
};

/** Home-page cards linking out to the sub-pages. */
export const explore = {
  kicker: "Go deeper",
  headline: "The rest of the story.",
  cards: [
    {
      title: "Why drawings fail",
      body: "The human and financial cost of inaccurate project data — and where the real bottleneck sits.",
      href: "/problem",
      label: "The problem",
    },
    {
      title: "Planos vs. the field",
      body: "Scan-to-BIM rigs, consumer visualizers, and the one thing none of them return: editable CAD.",
      href: "/compare",
      label: "Compare",
    },
    {
      title: "Pay per conversion",
      body: "Five plans sized by how many sheets you turn into solids each month. No seat licenses.",
      href: "/pricing",
      label: "Pricing",
    },
  ],
};

export const comparison = {
  id: "comparison",
  kicker: "Head to head",
  headline: "Editable CAD, without the laser scanner.",
  body: "How Planos stacks up against scan-to-BIM tools and consumer visualizers, on the four things that decide a purchase.",
  columns: ["Efficient", "Editable", "Cost-effective", "Easy to use"],
  rows: [
    { name: "Planos", marks: [true, true, true, true], highlight: true },
    {
      name: "Scan-to-BIM tools",
      sub: "ArchiLabs · OpalAi · nCircle Tech",
      marks: [false, true, false, false],
    },
    {
      name: "Consumer visualization tools",
      sub: "Floor-plan & interior apps",
      marks: [true, false, true, true],
    },
  ],
};

export const pricing = {
  id: "pricing",
  kicker: "Plans",
  headline: "Pay per conversion, not per seat.",
  intro:
    "Every plan runs the full pipeline — segment, vectorize, extrude — with human-review flagging and STL/STEP export. Plans differ only in how many blueprint conversions you run each month.",
  annualNote: "Annual billing saves ~8%",
  tiers: [
    {
      name: "Basic",
      audience: "For individuals",
      monthly: 20.99,
      yearly: 230.89,
      conversions: 4,
    },
    {
      name: "Pro",
      audience: "For small teams",
      monthly: 41.89,
      yearly: 460.79,
      conversions: 8,
    },
    {
      name: "Premium",
      audience: "For growing firms",
      monthly: 83.49,
      yearly: 918.39,
      conversions: 16,
      featured: true,
    },
    {
      name: "Elite",
      audience: "For busy practices",
      monthly: 124.99,
      yearly: 1374.89,
      conversions: 24,
    },
    {
      // TODO(pricing): this top tier is unnamed in the pricing model doc
      // (the row only shows its 15% mix). "Max" is a placeholder — rename here.
      name: "Max",
      audience: "For heavy pipelines",
      monthly: 165.99,
      yearly: 1825.89,
      conversions: 32,
    },
  ],
  enterprise: {
    name: "Enterprise",
    note: "Custom pricing — contact us",
  },
};

export const testimonial = {
  quote:
    "This tool could save architects hours of repetitive modeling work and allow us to focus more on design.",
  name: "Kevin Li",
  role: "Senior Architect, Cooper Robertson & Partners",
};

export const earlyAccess = {
  id: "early-access",
  kicker: "Early access",
  headline: "Be first off the sheet.",
  body: "We’re onboarding a limited number of architecture and engineering firms ahead of launch. Bring a blueprint; leave with an editable model.",
  form: {
    placeholder: "you@yourfirm.com",
    button: "Request early access",
    success: "Thanks — you’re on the list. We’ll be in touch.",
  },
  closing: "Planos — Revolutionizing Infrastructure.",
};
