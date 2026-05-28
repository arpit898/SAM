export interface Client {
  name: string;
  sector: string;
  logoPlaceholder: string;
}

export const clients: Client[] = [
  { name: 'Delhi Metro Rail Corporation', sector: 'Metro', logoPlaceholder: 'DMRC' },
  { name: 'Mumbai Metropolitan Region Development Authority', sector: 'Metro', logoPlaceholder: 'MMRDA' },
  { name: 'Chennai Metro Rail Limited', sector: 'Metro', logoPlaceholder: 'CMRL' },
  { name: 'Lucknow Metro Rail Corporation', sector: 'Metro', logoPlaceholder: 'LMRC' },
  { name: 'Jaipur Metro Rail Corporation', sector: 'Metro', logoPlaceholder: 'JMRC' },
  { name: 'Airport Authority of India', sector: 'Transport', logoPlaceholder: 'AAI' },
  { name: 'Indian Railways / RITES', sector: 'Transport', logoPlaceholder: 'RITES' },
  { name: 'CPWD', sector: 'Institutional', logoPlaceholder: 'CPWD' },
  { name: 'Military Engineering Services', sector: 'Defence', logoPlaceholder: 'MES' },
  { name: 'Ceigall India Ltd (JV)', sector: 'Infrastructure', logoPlaceholder: 'CEI' },
  { name: 'Mumbai Metro One Pvt. Ltd.', sector: 'Metro', logoPlaceholder: 'MM1' },
  { name: 'Government Hospitals & Healthcare', sector: 'Healthcare', logoPlaceholder: 'HLTH' },
];

export const clientSectors = [
  'Metro Rail Corporations',
  'Central Government / CPWD',
  'Airport Authority of India',
  'Indian Railways / RITES',
  'Military Engineering Services',
  'State PWD Authorities',
  'Government Hospitals',
  'Defence Establishments',
  'Real Estate Developers',
  'Industrial Conglomerates',
];

export const testimonials = [
  {
    quote: 'SAM India Builtwell has consistently demonstrated strong execution capability and quality discipline across our metro projects. Their site management and engineering teams bring the professionalism required for complex underground works.',
    author: '[Senior Executive Name]',
    title: '[Designation], Delhi Metro Rail Corporation',
    sector: 'Metro Infrastructure',
  },
  {
    quote: 'The team at SAM India brings strong technical depth and a genuine commitment to schedule and quality. Their handling of complex civil works on our corridor has been exemplary.',
    author: '[Client Representative Name]',
    title: '[Designation], Mumbai Metropolitan Region Development Authority',
    sector: 'Metro Infrastructure',
  },
];
