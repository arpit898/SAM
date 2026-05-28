export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  milestone?: boolean;
}

export const timeline: TimelineEvent[] = [
  {
    year: '1998',
    title: 'Foundation of SAM India',
    description: 'SAM India Builtwell Pvt. Ltd. was established with a vision to deliver quality infrastructure for India\'s growth. The company begins operations in civil construction.',
    milestone: true,
  },
  {
    year: 'Early 2000s',
    title: 'Building Institutional Credibility',
    description: 'Secured and delivered early-phase institutional and civil infrastructure projects, establishing relationships with government agencies and public sector clients.',
    milestone: false,
  },
  {
    year: '2005–2010',
    title: 'Expanding Sector Footprint',
    description: 'Diversified into industrial, power sector, and large-scale institutional works. Developed deep execution capability across civil engineering domains.',
    milestone: false,
  },
  {
    year: '2010–2015',
    title: 'Major Civil Infrastructure Projects',
    description: 'Executed landmark civil and infrastructure projects across India. Invested in plant, machinery, and quality systems to support complex project delivery.',
    milestone: true,
  },
  {
    year: '2016–2019',
    title: 'Metro & Transportation Entry',
    description: 'Entered the metro rail and transportation infrastructure space, executing both elevated and underground works. Built specialized expertise in metro station construction.',
    milestone: true,
  },
  {
    year: '2019–2020',
    title: 'Recognition & Awards Phase',
    description: '[Recognition / Award milestone — to be confirmed and added by company]. Delivered complex healthcare and institutional infrastructure projects at national scale.',
    milestone: false,
  },
  {
    year: '2020–2023',
    title: 'Diversification & Digital Evolution',
    description: 'Expanded into airport infrastructure, power energy, and real estate construction. Began adoption of digital project controls and site monitoring systems.',
    milestone: true,
  },
  {
    year: '2024+',
    title: 'Technology-Led Infrastructure',
    description: 'Investing in advanced project management systems, real-time site reporting, and AI-ready data infrastructure to deliver next-generation construction performance.',
    milestone: true,
  },
];
