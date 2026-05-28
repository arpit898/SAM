export interface Client {
  name: string;
  sector: string;
  logoPlaceholder: string;
}

export const clients: Client[] = [
  { name: 'Delhi Metro Rail Corporation', sector: 'Metro', logoPlaceholder: 'DMRC' },
  { name: '[Metro Rail Corporation]', sector: 'Metro', logoPlaceholder: 'MRC' },
  { name: '[Central Government Ministry]', sector: 'Institutional', logoPlaceholder: 'GOVT' },
  { name: '[State Government PWD]', sector: 'Institutional', logoPlaceholder: 'PWD' },
  { name: '[CPWD]', sector: 'Institutional', logoPlaceholder: 'CPWD' },
  { name: '[AIIMS / Government Hospital]', sector: 'Healthcare', logoPlaceholder: 'AIIMS' },
  { name: '[Airport Authority]', sector: 'Transport', logoPlaceholder: 'AAI' },
  { name: '[Power Sector PSU]', sector: 'Power', logoPlaceholder: 'PSU' },
  { name: '[NTPC / Power Company]', sector: 'Power', logoPlaceholder: 'NTPC' },
  { name: '[Industrial Conglomerate]', sector: 'Industrial', logoPlaceholder: 'IND' },
  { name: '[Real Estate Developer]', sector: 'Real Estate', logoPlaceholder: 'RE' },
  { name: '[Defense / Paramilitary]', sector: 'Institutional', logoPlaceholder: 'DEF' },
];

export const clientSectors = [
  'Metro Rail Corporations',
  'Central Government Ministries',
  'State PWD Authorities',
  'CPWD',
  'Airport Authorities',
  'Power Sector PSUs',
  'Government Hospitals & AIIMS',
  'Defense Establishments',
  'Industrial Conglomerates',
  'Real Estate Developers',
];

export const testimonials = [
  {
    quote: '[Testimonial from client representative to be added — describing SAM India\'s execution quality, schedule adherence, and engineering professionalism.]',
    author: '[Senior Executive Name]',
    title: '[Designation], [Organization]',
    sector: 'Metro Infrastructure',
  },
  {
    quote: '[Testimonial highlighting SAM India\'s quality systems, safety culture, and delivery capability on a complex institutional or hospital project.]',
    author: '[Client Representative Name]',
    title: '[Designation], [Government Body]',
    sector: 'Healthcare Infrastructure',
  },
];
