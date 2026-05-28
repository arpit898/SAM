import type { Metadata } from 'next';
import { clients, clientSectors, testimonials } from '@/data/clients';
import PageHero from '@/components/ui/PageHero';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/ui/CTASection';
import MotionWrapper from '@/components/ui/MotionWrapper';
import { Quote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Clients — Government, PSU & Industry Partners',
  description:
    'SAM India serves India\'s leading infrastructure clients — metro rail corporations, central and state government agencies, PSUs, airport authorities, power companies, and industrial conglomerates.',
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        tag="Our Clients"
        title="Trusted by India's Infrastructure Leaders"
        subtitle="SAM India has earned the trust of central government agencies, PSUs, metro corporations, airport authorities, power companies, and industrial clients through consistent delivery, quality, and professionalism."
      />

      {/* Client logo grid */}
      <section className="py-20 bg-[#0a1628] relative">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <Container>
          <SectionHeader
            tag="Client Portfolio"
            title="Organizations We Have Served"
            subtitle="Our client relationships span decades — built on delivery integrity, transparent communication, and professional conduct on every project."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12">
            {clients.map((client, i) => (
              <MotionWrapper key={i} delay={i * 0.04}>
                <div className="glass rounded-xl p-5 border border-white/5 hover:border-cyan-400/20 transition-all duration-300 flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center">
                    <span className="text-xs font-black text-[#8899bb] tracking-wider">{client.logoPlaceholder}</span>
                  </div>
                  <span className="text-[11px] text-[#8899bb] leading-tight">{client.name}</span>
                </div>
              </MotionWrapper>
            ))}
          </div>

          <p className="text-center text-xs text-[#8899bb] mt-8 italic">
            * Actual client logos to be added after formal approval from respective organizations.
          </p>
        </Container>
      </section>

      {/* Sectors served */}
      <section className="py-20 bg-[#050a1a] relative">
        <div className="absolute inset-0 blueprint-grid opacity-25" />
        <Container>
          <SectionHeader
            tag="Client Sectors"
            title="Industries and Agencies We Serve"
            subtitle="Our client base represents the full breadth of India's infrastructure ecosystem."
            center
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
            {clientSectors.map((sector, i) => (
              <MotionWrapper key={sector} delay={i * 0.06}>
                <div className="glass rounded-xl p-4 border border-white/5 text-center hover:border-cyan-400/20 transition-all">
                  <span className="text-sm text-white font-semibold">{sector}</span>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#0a1628] relative">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <Container>
          <SectionHeader
            tag="Testimonials"
            title="What Our Clients Say"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {testimonials.map((t, i) => (
              <MotionWrapper key={i} delay={i * 0.15}>
                <div className="glass rounded-2xl p-8 border border-white/5 h-full">
                  <Quote className="w-8 h-8 text-cyan-400/40 mb-4" />
                  <p className="text-[#a8b8d0] leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-white font-bold text-sm">{t.author}</p>
                    <p className="text-[#8899bb] text-xs mt-0.5">{t.title}</p>
                    <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider mt-1 inline-block">{t.sector}</span>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
          <p className="text-xs text-[#8899bb] mt-6 italic text-center">* Testimonials to be confirmed and approved before publication.</p>
        </Container>
      </section>

      <CTASection
        tag="Become Our Client"
        title="Join SAM India's Growing Client Portfolio"
        subtitle="Looking for a reliable, quality-focused infrastructure execution partner? Let's discuss how we can deliver your project."
        primaryCTA={{ label: 'Contact Us', href: '/contact' }}
        secondaryCTA={{ label: 'View Projects', href: '/projects' }}
      />
    </>
  );
}
