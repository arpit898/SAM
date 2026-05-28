import type { Metadata } from 'next';
import { Wrench, Truck, Building2, Zap, Settings, Shield } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/ui/CTASection';
import MotionWrapper from '@/components/ui/MotionWrapper';

export const metadata: Metadata = {
  title: 'Plant & Machinery — Construction Equipment Capability',
  description:
    'SAM India maintains a substantial fleet of construction equipment — cranes, batching plants, excavators, earth-moving machinery, and specialist metro and underground infrastructure equipment.',
};

const equipmentCategories = [
  {
    icon: Building2,
    title: 'Lifting Equipment',
    items: ['Tower Cranes (various capacities)', 'Mobile Cranes (lattice boom & hydraulic)', 'Crawler Cranes', 'Pick-and-Carry Cranes', 'Electric Hoists & Chain Pulley Blocks'],
    color: '#00d4ff',
  },
  {
    icon: Wrench,
    title: 'Concrete Equipment',
    items: ['Batching Plants (transit & stationary)', 'Concrete Transit Mixers', 'Concrete Pumps (boom & line)', 'Shotcrete Machines', 'Bar Bending and Cutting Machines'],
    color: '#1e6fff',
  },
  {
    icon: Truck,
    title: 'Earth-Moving & Haulage',
    items: ['Excavators (multiple sizes)', 'Backhoe Loaders', 'Bulldozers', 'Motor Graders', 'Dumper Trucks (all capacities)', 'Vibratory Rollers'],
    color: '#f0a020',
  },
  {
    icon: Zap,
    title: 'Specialist Metro Equipment',
    items: ['Diaphragm Wall Grab Machines', 'Hydraulic Piling Rigs', 'Ground Anchoring Equipment', 'Dewatering Systems', 'Grout Plants', 'Shotcrete Robotic Arms'],
    color: '#10b981',
  },
  {
    icon: Settings,
    title: 'General Site Equipment',
    items: ['Generators (all KVA ranges)', 'Compressors', 'Welding Machines', 'Survey Instruments', 'Safety Monitoring Equipment', 'Dewatering Pumps'],
    color: '#8b5cf6',
  },
  {
    icon: Shield,
    title: 'Specialized Civil Equipment',
    items: ['Slip Form Platforms', 'Trench Cutters', 'Hydromill Equipment', 'Tunnel Formwork Systems', 'Precast Segment Handling Beams'],
    color: '#06b6d4',
  },
];

export default function PlantMachineryPage() {
  return (
    <>
      <PageHero
        tag="Plant & Machinery"
        title="Equipment Capability for Complex Infrastructure"
        subtitle="SAM India maintains and deploys a substantial fleet of construction plant and machinery — ensuring projects are never equipment-constrained and execution stays on schedule."
        gradient="radial-gradient(ellipse 80% 50% at 50% -20%, rgba(30,111,255,0.08) 0%, transparent 70%)"
      />

      {/* Equipment categories */}
      <section className="py-20 bg-[#0a1628] relative">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <Container>
          <SectionHeader
            tag="Equipment Fleet"
            title="Construction Plant & Equipment"
            subtitle="Our equipment fleet is maintained to high standards of readiness — deployed based on project needs with preventive maintenance protocols ensuring uptime."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {equipmentCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <MotionWrapper key={cat.title} delay={i * 0.08}>
                  <div className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 h-full">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${cat.color}12`, border: `1px solid ${cat.color}25` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: cat.color }} />
                    </div>
                    <h3 className="text-white font-bold text-base mb-4">{cat.title}</h3>
                    <ul className="space-y-2">
                      {cat.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[#8899bb]">
                          <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: cat.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </MotionWrapper>
              );
            })}
          </div>

          <p className="text-center text-xs text-[#8899bb] mt-8 italic">
            * Exact equipment count, model details, and capacity specifics to be added. List above is indicative of capability categories.
          </p>
        </Container>
      </section>

      {/* Maintenance */}
      <section className="py-20 bg-[#050a1a] relative">
        <div className="absolute inset-0 blueprint-grid opacity-25" />
        <Container>
          <SectionHeader
            tag="Asset Management"
            title="Equipment Maintenance & Readiness"
            subtitle="Our preventive maintenance program ensures maximum equipment uptime, safety compliance, and cost-efficient deployment across all active sites."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { label: 'Maintenance Schedule', desc: 'Scheduled preventive maintenance program for all equipment with logbook records and service history.', icon: Settings },
              { label: 'Safety Certification', desc: 'All lifting equipment tested and certified by third-party inspection agencies as per DGFASLI requirements.', icon: Shield },
              { label: 'Operator Competency', desc: 'Certified, trained equipment operators for all major plant items with competency records maintained.', icon: Wrench },
              { label: 'Deployment Planning', desc: 'Equipment deployment scheduled aligned with project program to ensure availability at right time and location.', icon: Truck },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <MotionWrapper key={item.label} delay={i * 0.1}>
                  <div className="glass rounded-2xl p-6 border border-white/5 text-center h-full">
                    <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-4 mx-auto">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-white font-bold text-sm mb-2">{item.label}</h3>
                    <p className="text-xs text-[#8899bb] leading-relaxed">{item.desc}</p>
                  </div>
                </MotionWrapper>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection
        tag="Equipment Enquiry"
        title="Need Equipment Capability for Your Project?"
        subtitle="Contact our team to discuss equipment availability and deployment for your infrastructure project."
        primaryCTA={{ label: 'Contact Us', href: '/contact' }}
        secondaryCTA={{ label: 'Our Projects', href: '/projects' }}
      />
    </>
  );
}
