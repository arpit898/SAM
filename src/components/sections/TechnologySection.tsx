'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Cpu, BarChart3, Globe, Database, GitBranch, Sparkles, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const WireframeCity = dynamic(() => import('@/components/3d/WireframeCity'), { ssr: false });

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
    <section ref={ref} className="relative bg-[#0a1628] overflow-hidden">
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

          {/* Right: 3D wireframe city */}
          <motion.div
            style={{ opacity: cityOpacity, y: cityY }}
            className="relative h-[480px] lg:h-[560px] rounded-2xl overflow-hidden"
          >
            {/* HUD overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {[
                'top-3 left-3 border-t border-l',
                'top-3 right-3 border-t border-r',
                'bottom-3 left-3 border-b border-l',
                'bottom-3 right-3 border-b border-r',
              ].map((cls, i) => (
                <div key={i} className={`absolute w-5 h-5 border-cyan-400/30 ${cls}`} />
              ))}

              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-cyan-400/60">
                  INFRA · DIGITAL TWIN · LIVE
                </span>
              </div>

              {/* Data readouts */}
              <div className="absolute bottom-4 left-4">
                <div className="text-[8px] font-mono text-[#8899bb] space-y-1">
                  <div>PROJECTS ACTIVE: 12</div>
                  <div>SITES MONITORED: 8</div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="text-[8px] font-mono text-[#8899bb] text-right space-y-1">
                  <div>CONTRACT VALUE: ₹1,436 Cr</div>
                  <div>WORKFORCE: 1,400+</div>
                </div>
              </div>
            </div>

            {/* Subtle frame */}
            <div className="absolute inset-0 rounded-2xl border border-cyan-400/10 z-10 pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl"
              style={{ background: 'linear-gradient(180deg, rgba(5,10,26,0.3) 0%, transparent 30%, transparent 70%, rgba(5,10,26,0.5) 100%)' }} />

            <WireframeCity />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
