export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  milestone?: boolean;
  metric?: string;
}

export const timeline: TimelineEvent[] = [
  {
    year: '1998',
    title: 'SAM India Founded',
    description: 'SAM India Builtwell Pvt. Ltd. incorporated on January 22, 1998 in Delhi. CIN: U70101DL1998PTC091859. The company begins civil and construction operations.',
    milestone: true,
    metric: 'Inception',
  },
  {
    year: 'Early 2000s',
    title: 'Building Institutional Credibility',
    description: 'Early-phase partnerships with CPWD, MES, and government agencies. Delivered institutional and civil infrastructure projects establishing quality and delivery reputation.',
    milestone: false,
  },
  {
    year: '2010–2015',
    title: 'Major Civil & Infrastructure Growth',
    description: 'Significant expansion into large-scale civil infrastructure. Developed deep project execution capability — growing fleet, workforce, and multi-sector delivery capacity.',
    milestone: true,
    metric: 'Scale-up',
  },
  {
    year: '2017',
    title: 'Mumbai Metro Entry — Aarey Depot',
    description: 'Awarded metro depot and station civil works on Mumbai Metro Line 1 (Aarey Depot). Marked SAM India\'s entry into the prestigious Mumbai Metro ecosystem.',
    milestone: true,
    metric: 'Metro',
  },
  {
    year: '2020',
    title: 'Kanpur Metro — ₹150 Crore',
    description: 'Awarded ₹150 crore contract by LMRC for civil and architectural finishing of nine elevated stations on Kanpur Metro priority corridor.',
    milestone: true,
    metric: '₹150 Cr',
  },
  {
    year: '2023–2024',
    title: 'Mumbai Metro Line-6 — ₹547 Crore',
    description: 'MMRDA awards ₹547.45 crore Kanjurmarg Depot contract (CA-209). Chennai Metro Corridor 3 Package UG05 (₹665.99 Cr) commenced.',
    milestone: true,
    metric: '₹1,200 Cr+',
  },
  {
    year: '2026',
    title: 'Delhi Metro Phase V — First DMRC Contract',
    description: 'DMRC issues Letter of Acceptance for Contract EC-01 (₹222.76 Crore) — design and construction of Yuge Yugeen Bharat underground metro station under Phase V(A).',
    milestone: true,
    metric: '₹222.76 Cr',
  },
  {
    year: 'Future',
    title: 'Technology-Led Infrastructure Enterprise',
    description: 'Building toward ₹2,000 Crore+ scale with expanded metro, underground, institutional, and power infrastructure portfolio. Investing in digital project controls and AI-ready systems.',
    milestone: true,
    metric: 'Vision 2030',
  },
];
