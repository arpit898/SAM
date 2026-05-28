export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  {
    label: 'Sectors',
    href: '/sectors',
    children: [
      { label: 'Metro & Transportation', href: '/sectors#metro-transport' },
      { label: 'Underground Metro', href: '/sectors#underground-metro' },
      { label: 'Institutional', href: '/sectors#institutional' },
      { label: 'Healthcare', href: '/sectors#healthcare' },
      { label: 'Industrial', href: '/sectors#industrial' },
      { label: 'Power & Energy', href: '/sectors#power-energy' },
      { label: 'Real Estate', href: '/sectors#real-estate' },
      { label: 'Roads & Urban', href: '/sectors#roads-urban' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Technology', href: '/technology' },
  { label: 'Quality & Safety', href: '/quality-safety' },
  { label: 'Plant & Machinery', href: '/plant-machinery' },
  { label: 'Clients', href: '/clients' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];
