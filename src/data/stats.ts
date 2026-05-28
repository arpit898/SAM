export interface Stat {
  value: string;
  suffix?: string;
  label: string;
  sublabel?: string;
  icon?: string;
}

export const heroStats: Stat[] = [
  {
    value: '1998',
    label: 'Year Founded',
    sublabel: '25+ years of execution',
    icon: 'Calendar',
  },
  {
    value: '25',
    suffix: '+',
    label: 'Years of Infrastructure',
    sublabel: 'Proven execution track record',
    icon: 'Award',
  },
  {
    value: '8',
    suffix: '+',
    label: 'Business Sectors',
    sublabel: 'Multi-domain capability',
    icon: 'LayoutGrid',
  },
  {
    value: '100',
    suffix: '+',
    label: 'Projects Executed',
    sublabel: '[Placeholder — confirm count]',
    icon: 'Building2',
  },
];

export const commandCenterStats: Stat[] = [
  {
    value: '500',
    suffix: '+',
    label: 'Skilled Workforce',
    sublabel: '[Confirm headcount]',
    icon: 'Users',
  },
  {
    value: '50',
    suffix: '+',
    label: 'Equipment Fleet',
    sublabel: '[Confirm equipment count]',
    icon: 'Truck',
  },
  {
    value: '15',
    suffix: '+',
    label: 'States Executed',
    sublabel: 'Pan-India presence',
    icon: 'MapPin',
  },
  {
    value: '0',
    label: 'Zero Compromise',
    sublabel: 'On quality and safety',
    icon: 'Shield',
  },
];
