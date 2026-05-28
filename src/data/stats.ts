export interface Stat {
  value: string;
  suffix?: string;
  label: string;
  sublabel?: string;
  icon?: string;
}

export const heroStats: Stat[] = [
  { value: '1998', label: 'Year Founded', sublabel: 'Incorporated Jan 22, 1998', icon: 'Calendar' },
  { value: '1230', suffix: 'Cr+', label: 'Revenue FY2025', sublabel: '₹1,230 Crore turnover', icon: 'TrendingUp' },
  { value: '1400', suffix: '+', label: 'Workforce', sublabel: 'Direct employees', icon: 'Users' },
  { value: '8', suffix: '+', label: 'Sectors', sublabel: 'Multi-domain capability', icon: 'LayoutGrid' },
];

export const commandCenterStats: Stat[] = [
  { value: '222', suffix: 'Cr', label: 'DMRC Phase V Contract', sublabel: 'Delhi Metro — 2026', icon: 'Train' },
  { value: '547', suffix: 'Cr', label: 'Mumbai Metro Depot', sublabel: 'MMRDA Line-6 — 2024', icon: 'Building2' },
  { value: '665', suffix: 'Cr', label: 'Chennai Metro UG', sublabel: 'CMRL Corridor 3', icon: 'Layers' },
  { value: '10', suffix: '+', label: 'Metro Corporations', sublabel: 'DMRC, MMRDA, CMRL, LMRC+', icon: 'MapPin' },
];
