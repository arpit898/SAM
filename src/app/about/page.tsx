import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import TimelineSection from '@/components/sections/TimelineSection';
import CTASection from '@/components/ui/CTASection';
import { Target, Eye, Users, Award, Shield, Zap } from 'lucide-react';
import MotionWrapper from '@/components/ui/MotionWrapper';

export const metadata: Metadata = {
  title: 'About SAM India — Infrastructure Execution Company Since 1998',
  description:
    'Founded in 1998, SAM India Builtwell Pvt. Ltd. has grown into a multi-sector infrastructure execution company delivering metro, civil, institutional, healthcare, industrial, and power infrastructure across India.',
};

const values = [
  { icon: Target, title: 'Engineering Discipline', desc: 'Every project is planned and executed with rigorous engineering discipline — from design coordination to site execution.' },
  { icon: Shield, title: 'Quality First', desc: 'Quality systems, third-party inspections, and zero-compromise inspection protocols at every stage.' },
  { icon: Zap, title: 'Execution Strength', desc: 'We mobilize fast, execute with intensity, and deliver on schedule across complex, multi-activity projects.' },
  { icon: Users, title: 'People & Safety', desc: 'Our workforce is our greatest asset. Their safety, growth, and wellbeing are central to how we operate.' },
  { icon: Award, title: 'Client Trust', desc: 'Long-term client relationships built on transparent communication, honest reporting, and delivery integrity.' },
  { icon: Eye, title: 'Forward Vision', desc: 'We invest in systems, technology, and people to stay ahead of India\'s infrastructure demands.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="About SAM India"
        title="Engineering India's Infrastructure Since 1998"
        subtitle="A quarter-century of building complex infrastructure across metros, institutions, industries, and national projects — with engineering discipline and delivery integrity."
      />

      {/* Company Overview */}
      <section className="relative py-20 bg-[#0a1628]">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <MotionWrapper direction="left">
              <div className="glass rounded-2xl p-8 border border-cyan-400/10 hud-border">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-px w-6 bg-cyan-400" />
                  <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">Company Profile</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-6">SAM India Builtwell Pvt. Ltd.</h2>
                <div className="space-y-4 text-[#a8b8d0] leading-relaxed">
                  <p>
                    SAM India Builtwell Pvt. Ltd. is a leading Indian infrastructure and construction company founded in 1998. Over 25+ years, we have grown from a focused civil construction company into a multi-sector infrastructure enterprise delivering complex projects across India.
                  </p>
                  <p>
                    Our project portfolio spans metro and transportation infrastructure, underground metro construction, institutional and government facilities, hospitals and healthcare complexes, industrial civil works, power sector infrastructure, real estate development, and roads and urban infrastructure.
                  </p>
                  <p>
                    We work with central and state government agencies, PSUs, metro rail corporations, airport authorities, power companies, industrial conglomerates, and real estate developers — bringing engineering depth, execution discipline, and delivery integrity to every project.
                  </p>
                </div>
              </div>
            </MotionWrapper>

            <MotionWrapper direction="right" delay={0.15}>
              <div className="space-y-6">
                {[
                  { label: 'Incorporated', value: '1998', sub: 'New Delhi, India' },
                  { label: 'Sectors', value: '8+', sub: 'Multi-domain infrastructure' },
                  { label: 'Experience', value: '25+ Years', sub: 'Proven track record' },
                  { label: 'CIN', value: '[Placeholder]', sub: 'Ministry of Corporate Affairs' },
                  { label: 'Registered Office', value: '[Address Placeholder]', sub: 'New Delhi' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-6 glass rounded-xl p-4 border border-white/5">
                    <div className="text-xs font-bold text-[#8899bb] uppercase tracking-wider w-32 shrink-0">{item.label}</div>
                    <div>
                      <div className="text-white font-bold">{item.value}</div>
                      <div className="text-xs text-[#8899bb]">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </MotionWrapper>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="relative py-20 bg-[#050a1a]">
        <div className="absolute inset-0 blueprint-grid opacity-25" />
        <Container>
          <SectionHeader
            tag="Our Values"
            title="The Principles That Drive Us"
            subtitle="These values are not aspirational — they are operational. They shape how we plan, execute, and deliver every project."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <MotionWrapper key={v.title} delay={i * 0.08}>
                  <div className="glass rounded-2xl p-6 border border-white/5 hover:border-cyan-400/15 transition-all duration-300 h-full">
                    <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">{v.title}</h3>
                    <p className="text-sm text-[#8899bb] leading-relaxed">{v.desc}</p>
                  </div>
                </MotionWrapper>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Leadership placeholder */}
      <section className="relative py-20 bg-[#0a1628]">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <Container>
          <SectionHeader
            tag="Leadership"
            title="Experienced Leadership Team"
            subtitle="Guided by seasoned infrastructure professionals with decades of project execution experience across India's most complex construction assignments."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { role: 'Chairman & Managing Director', name: '[Name Placeholder]', exp: '[Experience Placeholder]' },
              { role: 'Director — Operations', name: '[Name Placeholder]', exp: '[Experience Placeholder]' },
              { role: 'Director — Business Development', name: '[Name Placeholder]', exp: '[Experience Placeholder]' },
            ].map((leader, i) => (
              <MotionWrapper key={i} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 border border-white/5 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1e6fff]/20 to-[#00d4ff]/20 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[#8899bb]" />
                  </div>
                  <p className="text-white font-bold text-base">{leader.name}</p>
                  <p className="text-cyan-400 text-sm font-semibold mt-1">{leader.role}</p>
                  <p className="text-[#8899bb] text-xs mt-2">{leader.exp}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
          <p className="text-center text-xs text-[#8899bb] mt-8 italic">* Leadership profiles to be updated with photographs and detailed biographies.</p>
        </Container>
      </section>

      <TimelineSection />

      <CTASection
        tag="Work With Us"
        title="Partner With SAM India for Complex Infrastructure"
        subtitle="Whether you are a government agency, developer, industrial company, or EPC player — we bring the execution capability your project demands."
        primaryCTA={{ label: 'Contact Us', href: '/contact' }}
        secondaryCTA={{ label: 'View Projects', href: '/projects' }}
      />
    </>
  );
}
