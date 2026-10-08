/**
 * Lydia Chebet — Industrial & Textile Engineering Portfolio
 * Central content model. Values marked [EXAMPLE] / [PLACEHOLDER] follow the
 * spec's honesty policy: nothing invented is presented as verified fact.
 */

export type Proficiency = "strong" | "working" | "academic" | "learning";

export const profile = {
  fullName: "Lydia Chebet",
  professionalTitle: "Industrial & Textile Engineer",
  eyebrow: "Moi University · B.Eng. Industrial & Textile Engineering",
  headline:
    "Industrial & Textile Engineering graduate focused on Manufacturing Systems, Quality & Sustainable Textile Production.",
  supporting:
    "I am interested in how materials, machines, people and processes come together to create consistent products at scale. My engineering background spans textile materials, yarn and fabric production, quality testing, garment systems, industrial engineering, production planning and continuous improvement.",
  availability:
    "Open to graduate textile, industrial, manufacturing, production, quality and operations opportunities.",
  location: "Kenya",
  graduationYear: "2026",
  email: "lydia.chebet@example.com", // [PLACEHOLDER]
  linkedin: "https://www.linkedin.com/", // [PLACEHOLDER]
  cvUrl: "", // [PLACEHOLDER — attach real CV PDF]
} as const;

export const snapshot = [
  { label: "Degree", value: "B.Eng. Industrial & Textile Engineering", mono: false },
  { label: "University", value: "Moi University", mono: false },
  { label: "Graduation", value: "2026", mono: true, note: "placeholder" },
  { label: "Focus", value: "Manufacturing · Quality · Textile Systems", mono: false },
  { label: "Projects", value: "6 documented", mono: true, note: "sample count" },
  { label: "Industrial Attachment", value: "12 weeks", mono: true, note: "placeholder" },
  { label: "Core Tools", value: "Excel · Minitab · AutoCAD · Power BI", mono: false, note: "placeholder" },
  { label: "Location", value: "Kenya", mono: false },
  { label: "Availability", value: "Graduate opportunities", mono: false },
];

export const heroStats = [
  { value: 6, suffix: "", label: "Engineering projects", sub: "academic + laboratory" },
  { value: 5, suffix: "", label: "Textile process stages", sub: "fiber → product" },
  { value: 8, suffix: "", label: "Lab test methods", sub: "GSM → color fastness" },
  { value: 12, suffix: " wks", label: "Industrial attachment", sub: "production + quality" },
];

/** Hero process sequence — fiber to product */
export const processFlow = [
  { id: "fiber", label: "Fiber", note: "natural & synthetic" },
  { id: "yarn", label: "Yarn", note: "spinning · twist · count" },
  { id: "fabric", label: "Fabric", note: "weaving · knitting" },
  { id: "wet", label: "Wet Processing", note: "scouring · dyeing" },
  { id: "finishing", label: "Finishing", note: "stenter · calendering" },
  { id: "product", label: "Product", note: "garment systems" },
];

export const heroMetricChips = ["Quality", "GSM", "Cycle Time", "Efficiency", "Waste", "Output"];

/* ------------------------------------------------------------------ */
/* Flagship project — sewing line balancing                            */
/* ------------------------------------------------------------------ */

export interface LineBalanceStation {
  station: string;
  current: number; // seconds
  proposed: number; // seconds
}

/** [EXAMPLE] Time-study based line balance for a garment sewing line. */
export const lineBalanceData: LineBalanceStation[] = [
  { station: "Shoulder seam", current: 48, proposed: 48 },
  { station: "Sleeve attach", current: 85, proposed: 44 },
  { station: "Sleeve attach B", current: 0, proposed: 41 },
  { station: "Side seam", current: 52, proposed: 52 },
  { station: "Hemming", current: 40, proposed: 40 },
  { station: "Collar attach", current: 78, proposed: 58 },
  { station: "Cuff attach", current: 45, proposed: 45 },
  { station: "Buttonhole", current: 60, proposed: 60 },
  { station: "Button sew", current: 55, proposed: 55 },
  { station: "Topstitch", current: 70, proposed: 36 },
  { station: "Topstitch B", current: 0, proposed: 34 },
  { station: "Inspect & fold", current: 35, proposed: 35 },
];

export const lineBalanceMetrics = {
  currentEfficiency: 66.8,
  proposedEfficiency: 77.7,
  currentBottleneck: "Sleeve attach — 85 s",
  proposedBottleneck: "Buttonhole — 60 s",
  outputChange: "+41%",
  wipReduction: "smoother flow, fewer waiting bundles",
  formula: "Line Efficiency = Total Work Content ÷ (Stations × Cycle Time) × 100%",
};

/** [EXAMPLE] Standard time build-up table. */
export const timeStudy = [
  { operation: "Shoulder seam", observed: "42 s", rating: "1.05", basic: "44.1 s", standard: "50.7 s" },
  { operation: "Sleeve attach", observed: "74 s", rating: "1.00", basic: "74.0 s", standard: "85.1 s" },
  { operation: "Side seam", observed: "45 s", rating: "1.02", basic: "45.9 s", standard: "52.8 s" },
  { operation: "Hemming", observed: "35 s", rating: "1.00", basic: "35.0 s", standard: "40.3 s" },
];

export const productionFlow = [
  "Fabric Preparation",
  "Cutting",
  "Bundle / Feed",
  "Sewing Operations",
  "In-Line Quality",
  "Finishing",
  "Final Inspection",
  "Packing",
];

export const featuredProject = {
  title: "Optimization of Sewing-Line Performance Using Line Balancing and Work Study",
  type: "Final-Year Engineering Project",
  role: "Industrial analysis · time study · line balancing · improvement design",
  summary:
    "This project evaluates a garment production line to identify bottlenecks, uneven workload distribution and productivity losses. Using time-study data, process mapping and line-balancing techniques, it develops a revised workstation allocation intended to improve flow, reduce idle time and increase line efficiency.",
  problem: [
    "Uneven work distribution across stations",
    "Bottlenecks at sleeve attach and topstitch operations",
    "Waiting and high work-in-progress between stations",
    "Overloaded stations next to under-utilized ones",
    "Quality rework interrupting flow",
    "Inconsistent hourly output",
  ],
  objectives: [
    "Map the production process",
    "Record operation times",
    "Calculate observed and standard cycle times",
    "Identify bottlenecks",
    "Determine current line efficiency",
    "Compare workstation load",
    "Develop an improved line balance",
    "Evaluate ergonomic issues",
    "Review quality implications",
    "Recommend practical changes",
  ],
  improvements: [
    "Redistribute tasks across stations",
    "Split the bottleneck sleeve-attach operation",
    "Combine short operations where sensible",
    "Cross-train operators for flexibility",
    "Improve material feeding and bundle size",
    "Reduce unnecessary motion at each station",
    "Introduce in-line quality checks",
  ],
  quality: [
    "Track defect rate and rework",
    "Protect first-pass quality while raising output",
    "Locate inspection points before value-adding steps",
    "Explicit principle: output must not compromise quality",
  ],
  ergonomics: [
    "Chair height and posture",
    "Repetitive reach zones",
    "Pedal position",
    "Task lighting",
    "Material placement around the machine",
  ],
  lessons:
    "Productivity problems are rarely caused by one workstation alone. Material flow, operator workload, quality, ergonomics and sequencing interact across the full production line. Reliable improvement therefore depends on measuring the actual process before proposing changes.",
};

/* ------------------------------------------------------------------ */
/* Projects                                                           */
/* ------------------------------------------------------------------ */

export interface Project {
  slug: string;
  index: string;
  title: string;
  category: string;
  categoryKey: "industrial" | "textile-testing" | "spinning" | "layout" | "wet-processing" | "quality";
  type: string;
  image: string;
  imageAlt: string;
  tagline: string;
  summary: string;
  problem: string;
  method: string[];
  evidence: string[];
  results: string[];
  lessons: string;
}

export const projects: Project[] = [
  {
    slug: "sewing-line-balancing",
    index: "01",
    title: "Sewing-Line Balancing & Productivity Study",
    category: "Industrial Engineering / Apparel Production",
    categoryKey: "industrial",
    type: "Final-Year Project",
    image: "/images/sewing-line.jpg",
    imageAlt: "Organized garment assembly line with operators at sewing stations",
    tagline: "Bottleneck analysis, time study and a revised line balance.",
    summary:
      "A full work-study treatment of a garment sewing line: process mapping, time-study data, workload charting and a proposed rebalance to lift line efficiency while protecting first-pass quality.",
    problem:
      "The line suffered from uneven workload distribution, a hard bottleneck at sleeve attach (85 s cycle) and high WIP between stations, producing waiting, idle time and inconsistent output.",
    method: [
      "Process mapping of all 8 production stages",
      "Stopwatch time study with performance rating",
      "Standard-time build-up with allowances",
      "Workload chart and bottleneck identification",
      "Line-efficiency calculation",
      "Revised allocation with task splitting and combining",
    ],
    evidence: [
      "Process map",
      "Time-study data",
      "Workload chart",
      "Proposed line balance",
      "Quality observations",
    ],
    results: [
      "Modeled line efficiency 66.8% → 77.7%",
      "Cycle time constrained by 85 s → 60 s",
      "Estimated potential output +41% at unchanged manpower",
      "Ergonomic review of chair, reach, pedal and lighting",
    ],
    lessons:
      "Measure the real process first — improvement follows evidence, not intuition.",
  },
  {
    slug: "fabric-quality-evaluation",
    index: "02",
    title: "Fabric Quality Evaluation",
    category: "Textile Testing",
    categoryKey: "textile-testing",
    type: "Laboratory Study",
    image: "/images/testing-tech.jpg",
    imageAlt: "Technician operating a textile testing machine in a laboratory",
    tagline: "A full fabric test battery, interpreted against end-use.",
    summary:
      "Systematic evaluation of a selected fabric across GSM, tensile and tear strength, shrinkage, abrasion and color fastness — with an engineering interpretation of what each result means for the garment's end use.",
    problem:
      "A fabric lot must be judged fit-for-purpose before cutting: too often single-value specs hide performance failures like dimensional instability or poor fastness.",
    method: [
      "Conditioning of specimens",
      "GSM determination (circular samples)",
      "Tensile & tear strength (strip method)",
      "Dimensional stability to washing",
      "Abrasion resistance (Martindale)",
      "Color fastness to washing and rubbing",
    ],
    evidence: ["Test table", "Comparison chart", "Engineering interpretation", "Quality recommendation"],
    results: [
      "Full test table with methods and units [EXAMPLE]",
      "Warp/weft strength comparison chart",
      "Pass/fail recommendation against end-use criteria",
    ],
    lessons:
      "Testing is translation: numbers only matter when read against what the product must survive.",
  },
  {
    slug: "spinning-process-analysis",
    index: "03",
    title: "Spinning Process Analysis",
    category: "Yarn Manufacturing",
    categoryKey: "spinning",
    type: "Process Study",
    image: "/images/spinning.jpg",
    imageAlt: "Modern spinning machinery with yarn packages",
    tagline: "From fiber preparation to yarn quality metrics.",
    summary:
      "Stage-by-stage analysis of the ring-spinning route — opening and cleaning, carding, drawing, roving and spinning — linking machine settings at each stage to yarn count, twist and quality.",
    problem:
      "Yarn quality faults are created upstream but only become visible after spinning, so each stage's settings and draft must be understood as part of one system.",
    method: [
      "Machine sequence mapping",
      "Draft and twist calculations",
      "Yarn count verification",
      "Yarn imperfection and hairiness review",
      "Linking carding quality to final yarn",
    ],
    evidence: ["Process route map", "Count & twist table", "Stage-wise quality notes"],
    results: [
      "Documented fiber-to-yarn route with key settings",
      "Yarn count and twist analysis [EXAMPLE]",
      "Stage-by-stage fault origins",
    ],
    lessons:
      "A spinning mill is a chain: the weakest stage sets the ceiling on yarn quality.",
  },
  {
    slug: "plant-layout-improvement",
    index: "04",
    title: "Plant Layout Improvement",
    category: "Industrial Engineering",
    categoryKey: "layout",
    type: "Design Study",
    image: "/images/cutting-cad.jpg",
    imageAlt: "High-tech fabric cutting table with CAD pattern monitors",
    tagline: "Travel-distance analysis and a re-sequenced floor.",
    summary:
      "Layout study for a production area using spaghetti diagrams and travel-distance analysis, then an adjacency-based proposal that shortens material movement and separates flows.",
    problem:
      "Long, crossing material paths created transport waste, congestion at shared equipment and avoidable handling damage.",
    method: [
      "Process mapping and activity relationships",
      "Spaghetti diagram over the floor plan",
      "Travel-distance measurement per batch",
      "Adjacency analysis of work areas",
      "Proposed layout with flow separation",
    ],
    evidence: ["Current vs proposed layout", "Spaghetti diagram", "Travel-distance table", "Adjacency chart"],
    results: [
      "Material travel distance reduced in the proposal [EXAMPLE]",
      "Clearer separation of cut / sew / finish flows",
      "Reduced congestion at shared machines",
    ],
    lessons:
      "Layout is strategy drawn on the floor — every extra meter a bundle walks is a cost with no value.",
  },
  {
    slug: "dyeing-process-study",
    index: "05",
    title: "Dyeing Process Study",
    category: "Wet Processing",
    categoryKey: "wet-processing",
    type: "Laboratory Study",
    image: "/images/dyeing-macro.jpg",
    imageAlt: "Macro shot of green fabric submerged in water during wet processing",
    tagline: "Dye–fiber compatibility, process curves and fastness.",
    summary:
      "Study of a dyeing route: pretreatment, dye–fiber compatibility, liquor ratio, temperature and time curves, pH control, shade consistency and color-fastness verification — with effluent awareness throughout.",
    problem:
      "Shade variation and poor fastness usually trace back to process parameters: liquor ratio, temperature ramp, time at temperature and pH — not the dyestuff alone.",
    method: [
      "Pretreatment verification (scouring, bleaching)",
      "Dye class ↔ fiber matching",
      "Process curve construction (temp vs time)",
      "Liquor ratio and pH control review",
      "Fastness testing after dyeing",
    ],
    evidence: ["Process curve", "Parameter table", "Fastness results", "Shade assessment"],
    results: [
      "Documented dyeing curve with critical control points",
      "Fastness ratings for wash and rub [EXAMPLE]",
      "Effluent-aware process notes",
    ],
    lessons:
      "Color is a process outcome: control the curve, the ratio and the chemistry, and shade consistency follows.",
  },
  {
    slug: "quality-improvement",
    index: "06",
    title: "Production Quality Improvement Study",
    category: "Quality Engineering",
    categoryKey: "quality",
    type: "Quality Study",
    image: "/images/quality-inspect.jpg",
    imageAlt: "Operator inspecting bright red fabric on an inspection machine",
    tagline: "Pareto, fishbone and root-cause corrective action.",
    summary:
      "A defect-reduction study: defect collection over defined shifts, Pareto analysis to isolate the vital few, fishbone and 5-Whys root-cause work, then corrective-action proposals with verification.",
    problem:
      "A high total defect count hid the fact that a small number of defect types — led by skipped stitches and seam pucker — caused most of the rework.",
    method: [
      "Check-sheet defect collection",
      "Defect classification and coding",
      "Pareto analysis of defect types",
      "Fishbone diagram + 5 Whys on vital few",
      "Corrective-action proposals and verification plan",
    ],
    evidence: ["Check sheet", "Pareto chart", "Fishbone diagram", "Corrective action table"],
    results: [
      "Vital-few defect families isolated (≈73% of total) [EXAMPLE]",
      "Root causes traced to machine tension and feeding practice",
      "Corrective actions with responsibilities and re-check plan",
    ],
    lessons:
      "Fix the vital few, not the trivial many — then verify and standardize so the fix survives the next shift.",
  },
];

/* ------------------------------------------------------------------ */
/* Capabilities                                                        */
/* ------------------------------------------------------------------ */

export interface FocusArea {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  caption: string;
  items: string[];
  quote: string;
}

export const textileFocusAreas: FocusArea[] = [
  {
    id: "fiber",
    title: "Textile Materials",
    image: "/images/yarn-skeins.jpg",
    imageAlt: "Skeins of natural yarn showing fiber structure",
    caption: "Natural & synthetic fibers",
    items: [
      "Natural & synthetic fibers",
      "Fiber identification",
      "Fiber fineness & strength",
      "Moisture behavior",
      "Blend behavior",
    ],
    quote: "How raw-material properties influence downstream processing and final product performance.",
  },
  {
    id: "yarn",
    title: "Yarn Manufacturing",
    image: "/images/spinning.jpg",
    imageAlt: "Spinning machinery with yarn packages",
    caption: "Opening → spinning",
    items: [
      "Opening & cleaning",
      "Carding, drawing, roving",
      "Spinning",
      "Yarn count & twist",
      "Yarn quality",
    ],
    quote: "Every yarn property is set by the stage that made it — not the stage that measured it.",
  },
  {
    id: "fabric",
    title: "Fabric Production",
    image: "/images/loom-warp.jpg",
    imageAlt: "Close-up of warp yarns on an industrial weaving loom",
    caption: "Weaving & knitting",
    items: [
      "Weaving",
      "Knitting",
      "Weave & knit structures",
      "Fabric density",
      "Fabric defects",
    ],
    quote: "Construction decides performance — density, hand, strength and defect behavior all follow structure.",
  },
  {
    id: "wet",
    title: "Wet Processing & Finishing",
    image: "/images/dyeing-macro.jpg",
    imageAlt: "Green fabric submerged during dyeing and wet processing",
    caption: "Pretreatment → finishing",
    items: [
      "Scouring & bleaching",
      "Dyeing & printing",
      "Finishing",
      "Color fastness",
      "Effluent awareness",
    ],
    quote: "Chemistry, temperature, time and water — controlled together, or not at all.",
  },
  {
    id: "testing",
    title: "Textile Testing & Quality",
    image: "/images/testing-tech.jpg",
    imageAlt: "Fabric testing instrument operated by a technician",
    caption: "Lab-grade measurement",
    items: [
      "Tensile & tear strength",
      "GSM",
      "Shrinkage & abrasion",
      "Color fastness",
      "Defect analysis",
    ],
    quote: "A test result is only as good as its sampling, conditioning and the standard it follows.",
  },
];

export interface IndustrialArea {
  id: string;
  title: string;
  blurb: string;
  items: string[];
}

export const industrialFocusAreas: IndustrialArea[] = [
  {
    id: "work-study",
    title: "Work Study",
    blurb: "Method study, time study and work measurement as the base for standard times.",
    items: ["Method study", "Time study", "Motion analysis", "Work measurement", "Standard-time concepts", "Productivity analysis"],
  },
  {
    id: "planning",
    title: "Production Planning",
    blurb: "Capacity, scheduling and line balancing against real constraints.",
    items: ["Capacity", "Scheduling", "Line balancing", "Work-in-progress", "Bottleneck analysis", "Resource allocation"],
  },
  {
    id: "quality-eng",
    title: "Quality Engineering",
    blurb: "From inspection to root cause to corrective action.",
    items: ["Inspection", "Defect classification", "Pareto analysis", "Root-cause analysis", "Basic SPC", "Corrective action"],
  },
  {
    id: "or",
    title: "Operations Research",
    blurb: "Quantitative decision tools for production problems.",
    items: ["Optimization", "Linear programming", "Inventory models", "Queuing fundamentals", "Decision analysis"],
  },
  {
    id: "ergonomics",
    title: "Ergonomics",
    blurb: "Workstations designed around people, not the other way round.",
    items: ["Workstation layout", "Reach & posture", "Repetitive movement", "Operator safety", "Human factors"],
  },
];

export const qualityLoop = [
  { id: "measure", title: "Measure", desc: "Check sheets, sampling and defined metrics" },
  { id: "classify", title: "Classify Defect", desc: "Defect codes and families" },
  { id: "root-cause", title: "Find Root Cause", desc: "Fishbone, 5 Whys, data" },
  { id: "correct", title: "Correct Process", desc: "Action on the process, not the symptom" },
  { id: "verify", title: "Verify Result", desc: "Re-measure and compare" },
  { id: "standardize", title: "Standardize", desc: "Lock the gain into standard work" },
];

export const qualityTools = ["Pareto chart", "Fishbone diagram", "Check sheet", "Control chart", "Defect map", "5 Whys"];

export const leanThemes = {
  themes: ["5S", "Waste reduction", "Standard work", "Visual management", "Line balancing", "WIP reduction", "Process flow", "Continuous improvement"],
  wastes: ["Transport", "Inventory", "Motion", "Waiting", "Overproduction", "Overprocessing", "Defects"],
};

/** [EXAMPLE] Pareto data for the quality-improvement study. */
export const paretoData = [
  { defect: "Skipped stitch", count: 34 },
  { defect: "Seam pucker", count: 22 },
  { defect: "Open seam", count: 15 },
  { defect: "Stain spot", count: 11 },
  { defect: "Uneven hem", count: 8 },
  { defect: "Other", count: 10 },
];

/* ------------------------------------------------------------------ */
/* Skills & tools (no percentage bars — spec rule)                     */
/* ------------------------------------------------------------------ */

export interface SkillGroup {
  id: string;
  title: string;
  skills: { name: string; level: Proficiency }[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "textile-tech",
    title: "Textile Technology",
    skills: [
      { name: "Fiber identification", level: "strong" },
      { name: "Yarn count", level: "strong" },
      { name: "Fabric construction", level: "strong" },
      { name: "Textile testing", level: "strong" },
      { name: "Yarn manufacturing", level: "working" },
      { name: "Weaving", level: "working" },
      { name: "Knitting", level: "working" },
      { name: "Dyeing fundamentals", level: "working" },
      { name: "Textile finishing", level: "working" },
    ],
  },
  {
    id: "quality",
    title: "Quality",
    skills: [
      { name: "Pareto analysis", level: "strong" },
      { name: "Defect identification", level: "strong" },
      { name: "Sampling fundamentals", level: "working" },
      { name: "Basic SPC", level: "working" },
      { name: "Root-cause analysis", level: "working" },
      { name: "Quality documentation", level: "working" },
    ],
  },
  {
    id: "production",
    title: "Production / Industrial",
    skills: [
      { name: "Process mapping", level: "strong" },
      { name: "Bottleneck analysis", level: "strong" },
      { name: "Time study", level: "working" },
      { name: "Line balancing", level: "working" },
      { name: "Production planning", level: "working" },
      { name: "Capacity analysis", level: "working" },
      { name: "5S", level: "working" },
      { name: "Lean principles", level: "working" },
    ],
  },
  {
    id: "sustainability",
    title: "Sustainability",
    skills: [
      { name: "Waste reduction", level: "working" },
      { name: "Water-use awareness", level: "working" },
      { name: "Textile effluent awareness", level: "working" },
      { name: "Cleaner production", level: "working" },
      { name: "Circular textile concepts", level: "academic" },
    ],
  },
];

export const proficiencyMeta: Record<Proficiency, { label: string; className: string }> = {
  strong: { label: "Strong", className: "text-green border-green/40 bg-green-soft" },
  working: { label: "Working Knowledge", className: "text-foreground border-border bg-surface" },
  academic: { label: "Academic Exposure", className: "text-indigo border-indigo/40 bg-indigo/10" },
  learning: { label: "Currently Learning", className: "text-amber border-amber/40 bg-amber/10" },
};

export interface Tool {
  name: string;
  level: Proficiency;
  note?: string;
}

export const toolGroups: { id: string; title: string; tools: Tool[] }[] = [
  {
    id: "data",
    title: "Data / Industrial",
    tools: [
      { name: "Microsoft Excel", level: "strong" },
      { name: "Minitab", level: "working" },
      { name: "Power BI", level: "working", note: "optional" },
      { name: "Python", level: "academic", note: "optional" },
    ],
  },
  {
    id: "technical",
    title: "Layout / Technical",
    tools: [
      { name: "AutoCAD", level: "working" },
      { name: "Visio / Draw.io", level: "working" },
    ],
  },
  {
    id: "planning",
    title: "Planning",
    tools: [
      { name: "Microsoft Project", level: "working" },
      { name: "ERP exposure", level: "academic", note: "optional" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Education, lab, attachment, timeline                                */
/* ------------------------------------------------------------------ */

export const education = {
  institution: "Moi University",
  school: "School of Engineering",
  degree: "Bachelor of Engineering in Industrial & Textile Engineering",
  period: "2021 – 2026",
  periodNote: "placeholder",
  groups: [
    {
      id: "textile-science",
      title: "Textile Science",
      courses: [
        "Textile Fibers",
        "Yarn Technology",
        "Fabric Technology",
        "Textile Testing",
        "Textile Chemistry",
        "Dyeing & Finishing",
        "Knitting",
        "Weaving",
      ],
    },
    {
      id: "apparel",
      title: "Apparel / Product Systems",
      courses: ["Garment Technology", "Apparel Production"],
    },
    {
      id: "industrial",
      title: "Industrial Engineering",
      courses: [
        "Work Study",
        "Operations Research",
        "Production Planning",
        "Quality Control",
        "Facility Layout",
        "Industrial Management",
        "Engineering Economics",
        "Ergonomics",
      ],
    },
    {
      id: "foundations",
      title: "Engineering Foundations",
      courses: [
        "Engineering Mathematics",
        "Mechanics",
        "Thermodynamics",
        "Fluid Mechanics",
        "Materials Science",
        "Engineering Drawing",
        "Engineering Ethics",
      ],
    },
  ],
};

export const labExperience = [
  { id: "testing", title: "Textile Testing", items: ["GSM", "Yarn count", "Tensile strength", "Tear strength", "Abrasion", "Shrinkage", "Color fastness", "Moisture regain"] },
  { id: "spinning-lab", title: "Spinning", items: ["Fiber preparation", "Carding", "Drawing", "Spinning", "Yarn testing"] },
  { id: "weaving-lab", title: "Weaving / Knitting", items: ["Fabric formation", "Machine settings", "Fabric construction", "Defect identification"] },
  { id: "wet-lab", title: "Wet Processing", items: ["Scouring", "Bleaching", "Dyeing", "Printing", "Finishing", "Color testing"] },
  { id: "ie-lab", title: "Industrial Engineering Practical", items: ["Method study", "Time study", "Work sampling", "Plant layout", "Ergonomic assessment", "Line balancing", "Scheduling", "Operations research"] },
];

export const attachment = {
  role: "Industrial / Textile Engineering Intern",
  company: "Textile / Garment / Manufacturing Company", // [PLACEHOLDER]
  period: "12 weeks · [PLACEHOLDER]",
  responsibilities: [
    "Observed production flow across departments",
    "Assisted with production-data collection",
    "Participated in basic time studies",
    "Observed quality inspection routines",
    "Assisted with defect recording",
    "Supported daily output documentation",
    "Observed machine setup and maintenance",
    "Participated in 5S activities",
    "Assisted with textile / garment quality checks",
    "Observed production scheduling",
    "Participated in safety briefings",
  ],
  equipment: [
    "Carding machines",
    "Drawing frames",
    "Ring spinning machines",
    "Looms",
    "Knitting machines",
    "Dyeing machines",
    "Stenters",
    "Dryers",
    "Sewing machines",
    "Cutting equipment",
    "Pressing equipment",
    "Textile testing instruments",
  ],
  learning:
    "Industrial attachment showed me that textile manufacturing is a tightly connected production system. Material quality, machine condition, operator skill, process settings, workflow and inspection all affect final output. Small delays or defects can multiply quickly when production is scaled across many operations.",
};

export const timeline = [
  {
    year: "2021",
    title: "Engineering Foundations",
    desc: "Mathematics, engineering science, materials and technical drawing.",
  },
  {
    year: "2022",
    title: "Textile Materials & Manufacturing",
    desc: "Fibers, yarns, fabrics and manufacturing fundamentals.",
  },
  {
    year: "2023",
    title: "Textile Processing & Industrial Engineering",
    desc: "Wet processing, testing, operations research and work study.",
  },
  {
    year: "2024",
    title: "Production Systems & Quality",
    desc: "Production planning, quality control, apparel systems and process improvement.",
  },
  {
    year: "2025",
    title: "Industrial Attachment",
    desc: "Practical exposure to production, quality and factory systems.",
  },
  {
    year: "2026",
    title: "Final-Year Industrial / Textile Project",
    desc: "Completed an integrated production-improvement project.",
  },
];

export const currentlyLearning = [
  "Advanced quality tools",
  "Power BI",
  "Lean manufacturing",
  "Six Sigma fundamentals",
  "Production-data analysis",
  "ERP systems",
  "Textile sustainability",
  "Technical textiles",
  "CLO 3D",
  "Supply-chain analytics",
  "Python for industrial engineering",
];

export const philosophy = {
  mantra: [
    { text: "Understand the material.", accent: "green" },
    { text: "Measure the process.", accent: "indigo" },
    { text: "Control the quality.", accent: "green" },
    { text: "Improve the flow.", accent: "indigo" },
    { text: "Reduce waste.", accent: "green" },
  ],
  expanded:
    "I see industrial and textile engineering as the connection between material science and production systems. A successful manufacturing process must produce the right quality consistently while using people, machines, time, materials and energy efficiently.",
};

export const aboutLydia = {
  paragraphs: [
    "I am an Industrial & Textile Engineering graduate from Moi University with strong interest in textile manufacturing, industrial systems, quality engineering and process improvement.",
    "My degree has exposed me to textile fibers, spinning, weaving, knitting, textile chemistry, wet processing, apparel systems, textile testing, operations research, production planning, work study, ergonomics and quality control.",
    "I enjoy engineering problems where product quality and factory performance depend on several factors at once: material behavior, machine settings, workflow, labor, process time, quality standards and production constraints.",
    "I approach manufacturing problems by understanding the process, measuring current performance, identifying bottlenecks or defects, and then evaluating practical improvements based on evidence.",
  ],
};

export const sustainability = {
  topics: [
    "Water consumption",
    "Dyeing effluent",
    "Chemical use",
    "Energy use",
    "Textile waste",
    "Recycling",
    "Circular textiles",
    "Fiber selection",
    "Durable products",
    "Process efficiency",
  ],
  statement:
    "I am particularly interested in manufacturing improvements that reduce material loss, water use, energy consumption and defects while maintaining product quality.",
};

export const targetRoles = [
  "Graduate Industrial Engineer",
  "Graduate Textile Engineer",
  "Production Engineer",
  "Manufacturing Engineer",
  "Quality Engineer",
  "Textile Technologist",
  "Process Improvement Engineer",
  "Production Planner",
  "Operations Engineer",
  "Lean / CI Trainee",
  "Textile Testing Engineer",
  "Garment Production Engineer",
  "Manufacturing Graduate Trainee",
];

export const contactCopy = {
  heading: "Interested in better products, better quality and better production systems?",
  supporting:
    "I am open to graduate textile, industrial, manufacturing, quality, production and operations engineering opportunities.",
};

export const navItems = [
  { id: "profile", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "textiles", label: "Textiles" },
  { id: "industrial", label: "Industrial" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const marqueeTerms = [
  "Fiber → Yarn → Fabric → Product",
  "Line Balancing",
  "GSM",
  "Time Study",
  "Pareto",
  "5S",
  "Color Fastness",
  "Bottleneck Analysis",
  "Standard Time",
  "Tensile Strength",
  "Wet Processing",
  "Kaizen",
  "Yarn Count",
  "Ergonomics",
  "Quality Control",
  "Work Study",
];

/* ------------------------------------------------------------------ */
/* Editorial couture layer — manifesto, finale, boot sequence          */
/* ------------------------------------------------------------------ */

/** Scroll-scrub manifesto — words light up in sequence as you scroll. */
export const manifesto = [
  { text: "Understand", accent: null },
  { text: "the material.", accent: "green" },
  { text: "Measure", accent: null },
  { text: "the process.", accent: "indigo" },
  { text: "Control", accent: null },
  { text: "the quality.", accent: "green" },
  { text: "Improve", accent: null },
  { text: "the flow.", accent: "indigo" },
] as const;

/** Contact finale headline lines. */
export const finaleLines = [
  { text: "Let's make quality", accent: null },
  { text: "measurable.", accent: "green" },
] as const;

/** Giant marquee wall above the footer. */
export const finaleMarquee = [
  "Open to graduate opportunities",
  "Quality",
  "Production",
  "Textile systems",
  "Industrial engineering",
] as const;

/** Preloader machine boot sequence. */
export const bootLines = [
  "Loading fiber library",
  "Threading warp beams",
  "Calibrating line speed",
  "Zeroing gauges",
  "Raising quality gates",
] as const;
