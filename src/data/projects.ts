export interface Project {
  slug: string;
  name: string;
  sector: string;
  category: string;
  location: string;
  client: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  year: string;
  scope: string;
  value: string;
  description: string;
  highlights: string[];
  challenges: string[];
  stats: { label: string; value: string }[];
  images: string[];
}

export const projects: Project[] = [
  {
    slug: 'delhi-metro-phase-v-ec01',
    name: 'Delhi Metro Phase V — Yuge Yugeen Bharat Underground Station',
    sector: 'Metro & Transportation',
    category: 'Metro',
    location: 'New Delhi',
    client: 'Delhi Metro Rail Corporation (DMRC)',
    status: 'Ongoing',
    year: '2026',
    scope: 'Design and construction of the Yuge Yugeen Bharat underground metro station under DMRC Phase V(A). Complex underground station box, diaphragm walls, structural works, and architectural finishing.',
    value: '₹222.76 Crore',
    description: 'SAM India Builtwell has been awarded Contract EC-01 by DMRC for the design and construction of the Yuge Yugeen Bharat underground metro station under Delhi Metro Phase V(A). This landmark project represents SAM India\'s first contract under the prestigious DMRC Phase V expansion.',
    highlights: [
      'First DMRC Phase V contract secured by SAM India Builtwell',
      'Complex underground station box construction in active urban zone',
      'Full design responsibility under design-build contract model',
      'Advanced diaphragm wall and deep excavation works',
    ],
    challenges: [
      'Underground construction in dense urban Delhi environment',
      'Complex utility diversions and traffic management',
      'Design-build delivery model requiring integrated engineering team',
    ],
    stats: [
      { label: 'Contract Value', value: '₹222.76 Crore' },
      { label: 'Client', value: 'DMRC' },
      { label: 'Type', value: 'Underground Metro Station' },
      { label: 'Delivery Model', value: 'Design & Build' },
    ],
    images: [],
  },
  {
    slug: 'mumbai-metro-line6-kanjurmarg-depot',
    name: 'Mumbai Metro Line-6 — Kanjurmarg Depot',
    sector: 'Metro & Transportation',
    category: 'Metro',
    location: 'Mumbai, Maharashtra',
    client: 'Mumbai Metropolitan Region Development Authority (MMRDA)',
    status: 'Ongoing',
    year: '2024',
    scope: 'Civil works for the Kanjurmarg Metro Depot on Mumbai Metro Line-6 (Pink Line). Depot buildings, stabling yards, maintenance facilities, and ancillary infrastructure.',
    value: '₹547.45 Crore',
    description: 'SAM India Builtwell was awarded Contract CA-209 by MMRDA for the civil works of the Kanjurmarg Depot on Mumbai Metro Line-6 (Pink Line) — one of the largest metro infrastructure projects in Mumbai.',
    highlights: [
      'One of the largest civil contracts on Mumbai Metro Line-6',
      'Complex depot layout with multi-level structures',
      'High-precision rail track bed and maintenance pit works',
      'Integrated depot infrastructure with all ancillary facilities',
    ],
    challenges: [
      'Complex site logistics in Mumbai\'s urban density',
      'Coordination with multiple agencies and rail systems integration',
      'High-precision civil works for maintenance facility',
    ],
    stats: [
      { label: 'Contract Value', value: '₹547.45 Crore' },
      { label: 'Client', value: 'MMRDA' },
      { label: 'Metro Line', value: 'Line-6 (Pink Line)' },
      { label: 'Year', value: '2024' },
    ],
    images: [],
  },
  {
    slug: 'chennai-metro-corridor3-ug05',
    name: 'Chennai Metro Corridor 3 — Package UG05',
    sector: 'Underground Metro Works',
    category: 'Underground',
    location: 'Chennai, Tamil Nadu',
    client: 'Chennai Metro Rail Limited (CMRL)',
    status: 'Ongoing',
    year: '2023',
    scope: 'Underground metro construction for Package UG05-RT01 on Chennai Metro Corridor 3. Tunnel works, station box excavation, and underground structure construction.',
    value: '₹665.99 Crore',
    description: 'SAM India Builtwell is executing underground metro construction works for Chennai Metro Corridor 3 Package UG05-RT01, one of the most technically demanding underground metro packages in South India.',
    highlights: [
      'Complex underground works in Chennai\'s challenging soil conditions',
      'Station box excavation to significant depths',
      'Advanced ground improvement for soft soil conditions',
      'Coordination with RVNL and CMRL on complex multi-package corridor',
    ],
    challenges: [
      'Soft soil and high water table in coastal Chennai',
      'Dense urban construction with significant utilities',
      'Multi-agency coordination across corridor packages',
    ],
    stats: [
      { label: 'Contract Value', value: '₹665.99 Crore' },
      { label: 'Client', value: 'CMRL' },
      { label: 'Corridor', value: 'Corridor 3' },
      { label: 'Type', value: 'Underground Metro' },
    ],
    images: [],
  },
  {
    slug: 'kanpur-metro-station-finishing',
    name: 'Kanpur Metro — Elevated Station Civil & Finishing Works',
    sector: 'Metro & Transportation',
    category: 'Metro',
    location: 'Kanpur, Uttar Pradesh',
    client: 'Lucknow Metro Rail Corporation (LMRC)',
    status: 'Completed',
    year: '2020',
    scope: 'Civil and architectural finishing works at nine elevated stations on the 8.728 km priority corridor of Kanpur Metro Line-1 between IIT Kanpur and Motijheel.',
    value: '₹150 Crore',
    description: 'SAM India Builtwell was awarded the contract for civil and architectural finishing works at nine elevated stations on the Kanpur Metro priority corridor. This project showcased SAM India\'s expertise in delivering metro station finishing to world-class standards.',
    highlights: [
      'Nine elevated metro stations delivered on priority corridor',
      'Architectural finishing to LMRC standards across all stations',
      'Coordinated with E&M and systems integration teams',
      'On-time delivery to support revenue operations',
    ],
    challenges: [
      'Concurrent work across nine stations simultaneously',
      'Schedule-critical delivery tied to revenue operations commencement',
      'High-quality architectural standards with rapid execution',
    ],
    stats: [
      { label: 'Contract Value', value: '₹150 Crore' },
      { label: 'Stations', value: '9 Elevated Stations' },
      { label: 'Corridor Length', value: '8.728 km' },
      { label: 'Client', value: 'LMRC' },
    ],
    images: [],
  },
  {
    slug: 'mumbai-metro-aarey-depot',
    name: 'Mumbai Metro — Aarey Depot & Station',
    sector: 'Metro & Transportation',
    category: 'Metro',
    location: 'Mumbai, Maharashtra',
    client: 'Mumbai Metro One Pvt. Ltd.',
    status: 'Completed',
    year: '2017',
    scope: 'Civil works for the Aarey Metro Depot and adjacent station on Mumbai Metro Line 1. Depot infrastructure, maintenance buildings, stabling lines, and station civil works.',
    value: 'Confidential',
    description: 'An early and landmark metro project for SAM India Builtwell, demonstrating the company\'s capability to deliver complex metro depot and station works in Mumbai\'s challenging urban environment.',
    highlights: [
      'Complex depot layout in constrained urban site',
      'High-quality station civil works to metro standards',
      'Successful delivery within tight Mumbai Metro schedule',
    ],
    challenges: [
      'Constrained site in sensitive ecological zone',
      'Coordination with Mumbai Metro operational timeline',
    ],
    stats: [
      { label: 'Client', value: 'Mumbai Metro One' },
      { label: 'Type', value: 'Metro Depot & Station' },
      { label: 'Year', value: '2017' },
      { label: 'City', value: 'Mumbai' },
    ],
    images: [],
  },
  {
    slug: 'dmrc-staff-quarters-noida',
    name: 'DMRC Staff Quarters — Sector 50, Noida',
    sector: 'Real Estate & Development',
    category: 'Real Estate',
    location: 'Sector 50, Noida, UP',
    client: 'Delhi Metro Rail Corporation (DMRC)',
    status: 'Completed',
    year: '2019',
    scope: 'Construction of staff residential quarters for DMRC at Sector 50, Noida. Multi-storey residential blocks with all amenities and site infrastructure.',
    value: 'Confidential',
    description: 'SAM India Builtwell delivered staff residential quarters for DMRC at Sector 50, Noida — reinforcing the company\'s long-standing relationship with India\'s premier metro operator.',
    highlights: [
      'Delivered to CPWD and DMRC quality standards',
      'Multi-storey residential construction with complete amenities',
      'Strengthened long-term DMRC client relationship',
    ],
    challenges: [
      'CPWD specification compliance across all finishes',
      'Coordination with DMRC site management teams',
    ],
    stats: [
      { label: 'Client', value: 'DMRC' },
      { label: 'Type', value: 'Staff Residential' },
      { label: 'Location', value: 'Sector 50, Noida' },
      { label: 'Year', value: '2019' },
    ],
    images: [],
  },
  {
    slug: 'jaipur-metro-phase2',
    name: 'Jaipur Metro Phase 1C & 1D',
    sector: 'Metro & Transportation',
    category: 'Metro',
    location: 'Jaipur, Rajasthan',
    client: 'Jaipur Metro Rail Corporation (JMRC)',
    status: 'Upcoming',
    year: '2024',
    scope: 'Metro civil works for Jaipur Metro Phase 1C and 1D in joint venture with Ceigall India Limited. SAM India holds 26% JV stake.',
    value: 'Confidential (JV)',
    description: 'SAM India Builtwell, in joint venture with Ceigall India Limited, was declared L-1 bidder for the Jaipur Metro Rail Corporation contract for Phase 1C & 1D expansion.',
    highlights: [
      'Strategic JV with Ceigall India for metro expansion',
      'Declared preferred bidder by JMRC',
      'Expansion of SAM India\'s metro portfolio to Rajasthan',
    ],
    challenges: [
      'Complex JV coordination between two infrastructure companies',
      'Heritage zone considerations in Jaipur',
    ],
    stats: [
      { label: 'Client', value: 'JMRC' },
      { label: 'JV Partner', value: 'Ceigall India Ltd' },
      { label: 'SAM India Stake', value: '26%' },
      { label: 'Type', value: 'Metro Civil Works' },
    ],
    images: [],
  },
  {
    slug: 'institutional-hospital-complex',
    name: 'Government Hospital & Healthcare Complex',
    sector: 'Hospitals & Healthcare',
    category: 'Healthcare',
    location: 'North India',
    client: 'Government Health Authority',
    status: 'Completed',
    year: '2020',
    scope: 'Full civil, structural, MEP, and finishing works for a government multi-specialty hospital complex.',
    value: 'Confidential',
    description: 'SAM India Builtwell has delivered government hospital infrastructure meeting the highest standards of healthcare construction — from OT suites to ICU infrastructure.',
    highlights: [
      'Specialist MEP coordination for medical gas, HVAC, and clean rooms',
      'NABH-aligned construction standards and documentation',
      'Infection-control construction protocols maintained throughout',
    ],
    challenges: [
      'Maintaining sterile construction zones during phased delivery',
      'Complex specialist MEP in OT and ICU areas',
    ],
    stats: [
      { label: 'Type', value: 'Government Hospital' },
      { label: 'Standards', value: 'NABH-aligned' },
      { label: 'Status', value: 'Completed' },
      { label: 'Year', value: '2020' },
    ],
    images: [],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const getRelatedProjects = (slug: string, category: string): Project[] => {
  return projects.filter((p) => p.slug !== slug && p.category === category).slice(0, 3);
};
