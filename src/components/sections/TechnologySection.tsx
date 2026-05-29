'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Cpu, BarChart3, Globe, Database, GitBranch, Sparkles, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const techItems = [
  { icon: BarChart3, title: 'Digital Project Controls', desc: 'Primavera / MS Project schedule management with baseline tracking and variance analysis.' },
  { icon: Globe, title: 'Site Reporting', desc: 'Mobile-based daily progress reporting, photographic evidence capture, and site monitoring.' },
  { icon: GitBranch, title: 'Workflow Automation', desc: 'Approval workflows, NCR management, permit-to-work — digitally tracked end-to-end.' },
  { icon: Database, title: 'Document Control', desc: 'Centralized drawing management with version control, revision tracking, and full audit trail.' },
  { icon: Cpu, title: 'Real-Time Visibility', desc: 'Dashboard-based project health monitoring for client, PMC, and management teams.' },
  { icon: Sparkles, title: 'AI-Ready Future', desc: 'Building data infrastructure for AI-assisted scheduling, predictive risk, and analytics.' },
];

export default function TechnologySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const cityOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1], [0, 1, 1, 0.5]);
  const cityY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <section ref={ref} className="relative bg-[#050505] overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-20" />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(0,212,255,0.04), transparent 70%)' }} />

      <Container className="relative z-10 py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text + tech grid */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <SectionHeader
              tag="Technology & Systems"
              title="Building a Systems-Driven Construction Enterprise"
              subtitle="SAM India is transitioning from traditional construction to a data-driven, system-managed infrastructure enterprise — where every project is controlled, documented, and optimised through technology."
            />

            <div className="grid grid-cols-2 gap-3 mt-10">
              {techItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="glass rounded-xl p-4 border border-white/5 hover:border-cyan-400/15 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/15 flex items-center justify-center mb-3 group-hover:bg-cyan-400/20 transition-colors">
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h4 className="text-white font-bold text-[12px] mb-1.5">{item.title}</h4>
                    <p className="text-[11px] text-[#8899bb] leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <Link
                href="/technology"
                className="group inline-flex items-center gap-2 text-cyan-400 text-[11px] font-black uppercase tracking-wider hover:gap-3 transition-all"
              >
                Explore Technology Vision
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: data panel */}
          <motion.div
            style={{ opacity: cityOpacity, y: cityY }}
            className="relative h-[480px] lg:h-[560px] rounded-2xl overflow-hidden border"
          >
            <div
              className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-8 p-10"
              style={{ background: '#0A0A0A', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {[
                { label: 'CONTRACT VALUE', value: '₹1,436 Cr', color: '#FFD700' },
                { label: 'PROJECTS ACTIVE', value: '12', color: '#ffffff' },
                { label: 'SITES MONITORED', value: '8', color: '#ffffff' },
                { label: 'WORKFORCE', value: '1,400+', color: '#ffffff' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="font-black leading-none"
                    style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: stat.color, letterSpacing: '-0.03em' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="uppercase text-white/30 mt-1 font-mono"
                    style={{ fontSize: '9px', letterSpacing: '0.4em' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
