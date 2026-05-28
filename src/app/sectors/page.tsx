import type { Metadata } from 'next';
import type { LucideProps } from 'lucide-react';
import { Train, Layers, Building2, Heart, Factory, Zap, Home, MapPin, CheckCircle2 } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { sectors } from '@/data/sectors';

type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
import PageHero from '@/components/ui/PageHero';
import Container from '@/components/ui/Container';
import CTASection from '@/components/ui/CTASection';
import MotionWrapper from '@/components/ui/MotionWrapper';

export const metadata: Metadata = {
  title: 'Our Sectors — Infrastructure Capabilities',
  description:
    'SAM India Builtwell delivers infrastructure across 8+ sectors: Metro & Transportation, Underground Metro, Institutional, Healthcare, Industrial, Power & Energy, Real Estate, and Roads & Urban Infrastructure.',
};

const iconMap: Record<string, LucideIcon> = {
  Train, Layers, Building2, Heart, Factory, Zap, Home, MapPin,
};

export default function SectorsPage() {
  return (
    <>
      <PageHero
        tag="Business Sectors"
        title="Multi-Sector Infrastructure Capability"
        subtitle="Eight distinct infrastructure sectors, one unifying execution standard. SAM India delivers complex, high-stakes infrastructure across India's most critical domains."
      />

      <section className="py-8 bg-[#0a1628] border-b border-white/5">
        <Container>
          <div className="flex flex-wrap gap-3">
            {sectors.map((s) => {
              const Icon = iconMap[s.icon] || Building2;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm font-medium text-[#a8b8d0] hover:text-white border border-white/5 hover:border-white/20 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                  {s.shortTitle}
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      <div className="bg-[#050a1a]">
        {sectors.map((sector, i) => {
          const Icon = iconMap[sector.icon] || Building2;
          const isEven = i % 2 === 0;
          return (
            <section
              key={sector.id}
              id={sector.id}
              className={`relative py-20 border-b border-white/5 ${isEven ? 'bg-[#050a1a]' : 'bg-[#0a1628]'}`}
            >
              <div className="absolute inset-0 blueprint-grid opacity-20" />
              <Container>
                <div className={`grid lg:grid-cols-2 gap-16 items-start ${!isEven ? 'direction-rtl' : ''}`}>
                  {/* Info */}
                  <MotionWrapper direction={isEven ? 'left' : 'right'}>
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center"
                          style={{ background: `${sector.color}15`, border: `1px solid ${sector.color}30` }}
                        >
                          <Icon className="w-7 h-7" style={{ color: sector.color }} />
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: sector.color }}>
                            Sector {String(i + 1).padStart(2, '0')}
                          </div>
                          <h2 className="text-2xl font-bold text-white">{sector.title}</h2>
                        </div>
                      </div>

                      <p className="text-[#a8b8d0] leading-relaxed mb-6">{sector.description}</p>

                      <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4" style={{ color: sector.color }}>
                        Our Capabilities
                      </h3>
                      <div className="space-y-2 mb-6">
                        {sector.capabilities.map((cap) => (
                          <div key={cap} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: sector.color }} />
                            <span className="text-sm text-[#a8b8d0]">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </MotionWrapper>

                  {/* Project types */}
                  <MotionWrapper direction={isEven ? 'right' : 'left'} delay={0.15}>
                    <div>
                      <div className="glass rounded-2xl p-8 border border-white/5" style={{ borderColor: `${sector.color}15` }}>
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Project Types</h3>
                        <div className="flex flex-wrap gap-3">
                          {sector.projectTypes.map((pt) => (
                            <span
                              key={pt}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold border"
                              style={{
                                color: sector.color,
                                background: `${sector.color}08`,
                                borderColor: `${sector.color}25`,
                              }}
                            >
                              {pt}
                            </span>
                          ))}
                        </div>

                        {/* Placeholder visual */}
                        <div
                          className="mt-8 rounded-xl h-40 flex items-center justify-center"
                          style={{ background: `linear-gradient(135deg, ${sector.color}08, transparent)`, border: `1px dashed ${sector.color}20` }}
                        >
                          <div className="text-center">
                            <Icon className="w-10 h-10 mx-auto mb-2 opacity-20" style={{ color: sector.color }} />
                            <span className="text-xs text-[#8899bb] italic">[Sector image / project photo placeholder]</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MotionWrapper>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <CTASection
        tag="Start a Project"
        title="Looking for an Infrastructure Execution Partner?"
        subtitle="Tell us about your project requirements. We specialize in complex, large-scale infrastructure across all our sectors."
        primaryCTA={{ label: 'Contact Us', href: '/contact' }}
        secondaryCTA={{ label: 'View Projects', href: '/projects' }}
      />
    </>
  );
}
