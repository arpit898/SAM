'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Cpu, BarChart3, Globe, Database, GitBranch, Sparkles, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const techItems = [
  { icon: BarChart3, title: 'Digital Project Controls', desc: 'Primavera / MS Project integrated schedule management with baseline tracking and variance analysis.' },
  { icon: Globe, title: 'Site Reporting', desc: 'Mobile-based daily progress reporting, photographic evidence capture, and site condition monitoring.' },
  { icon: GitBranch, title: 'Workflow Automation', desc: 'Approval workflows, checklist automation, permit-to-work, and NCR management digitally tracked.' },
  { icon: Database, title: 'Document Control', desc: 'Centralized drawing and document management with version control, revision tracking, and audit trail.' },
  { icon: Cpu, title: 'Real-Time Visibility', desc: 'Dashboard-based project health monitoring for client, PMC, and internal management teams.' },
  { icon: Sparkles, title: 'AI-Ready Future', desc: 'Building data infrastructure for AI-assisted scheduling, predictive risk alerts, and performance analytics.' },
];

export default function TechnologySection() {
  return (
    <section className="relative py-24 bg-[#0a1628] overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-25" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              tag="Technology & Systems"
              title="Building a Systems-Driven Construction Enterprise"
              subtitle="SAM India is transitioning from traditional construction to a data-driven, system-managed infrastructure enterprise — where every project is controlled, documented, and optimized through technology."
            />

            <Link
              href="/technology"
              className="group inline-flex items-center gap-2 mt-6 text-cyan-400 text-sm font-bold uppercase tracking-wider hover:gap-3 transition-all"
            >
              Explore Technology Vision
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {techItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass rounded-xl p-5 border border-white/5 hover:border-cyan-400/15 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-4 group-hover:bg-cyan-400/20 transition-colors">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">{item.title}</h4>
                  <p className="text-[12px] text-[#8899bb] leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
