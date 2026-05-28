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
    slug: 'metro-underground-corridor-phase1',
    name: 'Metro Underground Corridor — Phase 1',
    sector: 'Metro & Transportation',
    category: 'Metro',
    location: 'Delhi NCR, India',
    client: '[Client Name — PSU / Metro Rail Corporation]',
    status: 'Completed',
    year: '2021',
    scope: 'Cut-and-cover and NATM tunneling, station box excavation, underground structure construction, waterproofing, and MEP integration for metro stations.',
    value: '[Contract Value Placeholder]',
    description: 'A landmark underground metro infrastructure project executed for a major metropolitan rail corporation, involving complex station box excavation, tunneling, and structural works in dense urban conditions.',
    highlights: [
      'Completed station box excavation in active urban zone with zero adjacent structure impact',
      'Deployed specialized ground improvement and dewatering systems',
      'Integrated advanced waterproofing membranes for deep underground structures',
      'Achieved milestone completion within contracted program',
    ],
    challenges: [
      'Excavation in high water-table zone required continuous dewatering',
      'Coordination with multiple utility agencies for underground services diversion',
      'Traffic management and public safety in dense urban corridor',
    ],
    stats: [
      { label: 'Tunnel Length', value: '[X] km' },
      { label: 'Stations', value: '[X] Nos.' },
      { label: 'Excavation Depth', value: 'Up to [X]m' },
      { label: 'Duration', value: '[X] Months' },
    ],
    images: ['/placeholders/project-metro-1.jpg', '/placeholders/project-metro-2.jpg'],
  },
  {
    slug: 'institutional-hospital-complex',
    name: 'Multi-Specialty Hospital & Medical College Complex',
    sector: 'Hospitals & Healthcare',
    category: 'Healthcare',
    location: 'North India',
    client: '[Government Health Authority / Trust]',
    status: 'Completed',
    year: '2020',
    scope: 'Full civil, structural, MEP, and finishing works for a multi-specialty hospital, medical college, and residential campus.',
    value: '[Contract Value Placeholder]',
    description: 'A comprehensive healthcare infrastructure project encompassing hospital blocks, OT suites, ICU wings, medical college, and staff residential facilities.',
    highlights: [
      'Delivered complex OT and ICU-grade MEP coordination',
      'Implemented infection-control construction protocols',
      'Coordinated with specialist consultants for medical gas piping and specialized equipment',
      'Achieved Green Building compliance for healthcare infrastructure',
    ],
    challenges: [
      'Maintaining sterile construction zones within phased hospital areas',
      'Coordinating specialized medical equipment installation with civil structure',
      'Meeting NABH-aligned construction and finishing standards',
    ],
    stats: [
      { label: 'Built-up Area', value: '[X] Lakh Sq.Ft.' },
      { label: 'Hospital Beds', value: '[X] Beds' },
      { label: 'OT Suites', value: '[X] Nos.' },
      { label: 'Duration', value: '[X] Months' },
    ],
    images: ['/placeholders/project-hospital-1.jpg'],
  },
  {
    slug: 'airport-infrastructure-works',
    name: 'Airport Infrastructure Expansion',
    sector: 'Transport Infrastructure',
    category: 'Airport',
    location: 'Pan India',
    client: '[Airport Authority]',
    status: 'Completed',
    year: '2022',
    scope: 'Airside pavement works, terminal building civil works, utility infrastructure, and landside development.',
    value: '[Contract Value Placeholder]',
    description: 'Execution of airside and landside civil infrastructure for airport capacity expansion, including high-strength pavement, terminal buildings, and service infrastructure.',
    highlights: [
      'High-precision rigid pavement laid to airport authority specifications',
      'Completed terminal civil works with full aviation compliance',
      'Night works and restricted-hour operations managed efficiently',
      'Zero FOD incidents during entire construction phase',
    ],
    challenges: [
      'Working in active airside zone with strict aviation authority protocols',
      'Coordinating with multiple agencies including AAI, security, and airlines',
      'Night-only work windows for certain airside activities',
    ],
    stats: [
      { label: 'Pavement Area', value: '[X] Sq.m' },
      { label: 'Terminal BUA', value: '[X] Sq.m' },
      { label: 'FOD Incidents', value: 'Zero' },
      { label: 'Duration', value: '[X] Months' },
    ],
    images: ['/placeholders/project-airport-1.jpg'],
  },
  {
    slug: 'power-plant-civil-works',
    name: 'Thermal Power Plant Civil & Structural Works',
    sector: 'Power & Energy',
    category: 'Power',
    location: 'Central India',
    client: '[Power Sector PSU]',
    status: 'Completed',
    year: '2019',
    scope: 'Civil, structural, and foundation works for power plant — including turbine hall, boiler foundations, cooling towers, and ancillary structures.',
    value: '[Contract Value Placeholder]',
    description: 'Large-scale civil and structural execution for a thermal power generation facility, encompassing heavy foundations, industrial structures, and infrastructure for power plant machinery.',
    highlights: [
      'Executed complex turbine foundation with precision tolerance requirements',
      'Constructed natural draft cooling towers using slip-form technology',
      'Completed coal handling plant structural works within tight timeline',
      'Achieved high concrete pour rates with quality certified by third-party',
    ],
    challenges: [
      'Extremely precise foundation tolerances for rotating machinery',
      'Remote site logistics for material and equipment',
      'Continuous 24×7 operations during critical path activities',
    ],
    stats: [
      { label: 'Power Capacity', value: '[X] MW' },
      { label: 'Concrete Volume', value: '[X] Cum' },
      { label: 'Structural Steel', value: '[X] MT' },
      { label: 'Duration', value: '[X] Months' },
    ],
    images: ['/placeholders/project-power-1.jpg'],
  },
  {
    slug: 'residential-township',
    name: 'Integrated Residential Township',
    sector: 'Real Estate & Development',
    category: 'Real Estate',
    location: 'NCR / Tier-1 City',
    client: '[Real Estate Developer]',
    status: 'Ongoing',
    year: '2023',
    scope: 'Multi-tower residential complex with basements, podium, towers, clubhouse, and infrastructure.',
    value: '[Contract Value Placeholder]',
    description: 'Construction of a large integrated residential township comprising multiple high-rise towers, podium-level amenities, basement parking, and complete site development.',
    highlights: [
      'Slip-form and jump-form technology for high-rise tower construction',
      'High-quality facade and finishing works',
      'Integrated MEP and smart home ready infrastructure',
      'RERA-compliant construction documentation and progress tracking',
    ],
    challenges: [
      'Managing multiple concurrent tower construction activities',
      'High-quality finishing in large volume',
      'Coordination with customer modification requests during construction',
    ],
    stats: [
      { label: 'Towers', value: '[X] Nos.' },
      { label: 'Units', value: '[X] Apartments' },
      { label: 'Total BUA', value: '[X] Lakh Sq.Ft.' },
      { label: 'Completion', value: '[Year]' },
    ],
    images: ['/placeholders/project-residential-1.jpg'],
  },
  {
    slug: 'industrial-facility-civil',
    name: 'Greenfield Industrial Facility',
    sector: 'Industrial & Specialized Civil',
    category: 'Industrial',
    location: 'Industrial Corridor, India',
    client: '[Industrial Conglomerate]',
    status: 'Completed',
    year: '2021',
    scope: 'Civil, structural, foundation, and industrial building works for a greenfield manufacturing facility.',
    value: '[Contract Value Placeholder]',
    description: 'Complete civil and structural execution for a large-scale greenfield industrial facility including heavy foundations, industrial sheds, utility buildings, and site infrastructure.',
    highlights: [
      'Heavy equipment foundations with precision machined anchor bolt setting',
      'Large-span pre-engineered building with crane girders',
      'Industrial grade flooring with high flatness specification',
      'Completed within aggressive 18-month schedule',
    ],
    challenges: [
      'Coordination with equipment suppliers for foundation design',
      'Industrial flooring in large area to tight flatness tolerance',
      'Aggressive schedule requiring parallel construction activities',
    ],
    stats: [
      { label: 'Plot Area', value: '[X] Acres' },
      { label: 'Built-up Area', value: '[X] Sq.m' },
      { label: 'Crane Capacity', value: 'Up to [X]T' },
      { label: 'Duration', value: '[X] Months' },
    ],
    images: ['/placeholders/project-industrial-1.jpg'],
  },
  {
    slug: 'underground-metro-station',
    name: 'Underground Metro Station Complex',
    sector: 'Underground Metro Works',
    category: 'Underground',
    location: 'Major Indian City',
    client: '[Metro Rail Corporation]',
    status: 'Completed',
    year: '2022',
    scope: 'Deep excavation, diaphragm wall, station box construction, tunnel connections, and architectural finishing for an underground metro station.',
    value: '[Contract Value Placeholder]',
    description: 'Construction of a complex underground metro station involving deep diaphragm wall construction, station box excavation, structural works, and integration with running tunnels.',
    highlights: [
      'Diaphragm wall panels to 30m+ depth with full verticality control',
      'Station box excavation in stages with propped system',
      'Seamless integration with TBM tunnel drives from both sides',
      'Architectural finishing to metro brand standards',
    ],
    challenges: [
      'Dense underground utilities requiring constant survey and diversion',
      'Adjacent high-rise building monitoring throughout excavation',
      'Ground anchoring in urban environment with restricted zones',
    ],
    stats: [
      { label: 'Excavation Depth', value: '[X]m' },
      { label: 'D-Wall Area', value: '[X] Sq.m' },
      { label: 'Concourse Area', value: '[X] Sq.m' },
      { label: 'Duration', value: '[X] Months' },
    ],
    images: ['/placeholders/project-underground-1.jpg'],
  },
  {
    slug: 'institutional-campus',
    name: 'Government Institutional Campus',
    sector: 'Institutional & Public Infrastructure',
    category: 'Institutional',
    location: 'India',
    client: '[Central / State Government Body]',
    status: 'Completed',
    year: '2020',
    scope: 'Master plan civil and structural works for a government institutional campus including administrative blocks, academic facilities, and support buildings.',
    value: '[Contract Value Placeholder]',
    description: 'Construction of a large-scale government institutional campus with multiple building typologies, central services, landscaping, and site infrastructure.',
    highlights: [
      'Delivered complex multi-building project under single package',
      'Integrated central utility systems across campus',
      'High-quality external facade and landscaping',
      'Completed per CPWD and BIS standards',
    ],
    challenges: [
      'Sequential handover requirements for phased occupation',
      'CPWD quality control and inspection compliance',
      'Coordinating multiple specialized agencies on campus',
    ],
    stats: [
      { label: 'Campus Area', value: '[X] Acres' },
      { label: 'Built-up Area', value: '[X] Lakh Sq.Ft.' },
      { label: 'Buildings', value: '[X] Nos.' },
      { label: 'Duration', value: '[X] Months' },
    ],
    images: ['/placeholders/project-institutional-1.jpg'],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const getRelatedProjects = (slug: string, category: string): Project[] => {
  return projects.filter((p) => p.slug !== slug && p.category === category).slice(0, 3);
};
