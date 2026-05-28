'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Activity, FileCheck, Shield, BarChart3, Wrench, FileText, Camera, Workflow } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const systems = [
  { icon: BarChart3, title: 'Planning Control', desc: 'Master schedule management, baseline tracking, and schedule risk analysis across all active projects.', status: 'ACTIVE', color: '#00d4ff' },
  { icon: FileCheck, title: 'Quality Control', desc: 'ITPs, hold-and-witness points, NCR management, and third-party inspection coordination.', status: 'ACTIVE', color: '#10b981' },
  { icon: Shield, title: 'Safety Monitoring', desc: 'Real-time safety incident reporting, daily toolbox talks, near-miss tracking, and compliance monitoring.', status: 'ACTIVE', color: '#f0a020' },
  { icon: FileText, title: 'Document Control', desc: 'Drawings, submittals, RFIs, and correspondence management with version control and audit trail.', status: 'ACTIVE', color: '#00d4ff' },
  { icon: Wrench, title: 'Plant & Machinery', desc: 'Equipment deployment tracking, maintenance scheduling, and asset utilization monitoring.', status: 'ACTIVE', color: '#1e6fff' },
  { icon: Activity, title: 'Billing & Claims', desc: 'RA bill preparation, variation management, interim payment certificates, and cash flow forecasting.', status: 'ACTIVE', color: '#00d4ff' },
  { icon: Camera, title: 'Site Visibility', desc: 'Daily progress photography, drone surveys, time-lapse documentation, and site condition records.', status: 'ACTIVE', color: '#10b981' },
  { icon: Workflow, title: 'Digital Workflows', desc: 'Approval workflows, checklist management, permit-to-work systems, and audit-ready digital records.', status: 'ACTIVE', color: '#00d4ff' },
];

const metrics = [
  { label: 'Live Projects', value: 4, suffix: '' },
  { label: 'Active Sites', value: 12, suffix: '+' },
  { label: 'QC Inspections', value: 200, suffix: '+/mo' },
];

function LiveCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(Math.floor(current));
            if (current >= target) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="text-2xl font-black gradient-text-cyan">{count}{suffix}</div>;
}

export default function CommandCenterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scanY = useTransform(scrollYProgress, [0, 1], ['-10%', '110%']);
  const [activeSystem, setActiveSystem] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-24 bg-[#050a1a] overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-30" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)' }} />

      {/* Scroll-driven vertical scan line */}
      <motion.div
        style={{ top: scanY, background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.25), transparent)' }}
        className="absolute left-0 right-0 h-px pointer-events-none z-5"
      />

      {/* Corner HUD brackets */}
      <div className="absolute top-8 left-8 w-10 h-10 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-cyan-400" />
        <div className="absolute top-0 left-0 h-full w-px bg-cyan-400" />
      </div>
      <div className="absolute top-8 right-8 w-10 h-10 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-px bg-cyan-400" />
        <div className="absolute top-0 right-0 h-full w-px bg-cyan-400" />
      </div>
      <div className="absolute bottom-8 left-8 w-10 h-10 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-px bg-cyan-400" />
        <div className="absolute bottom-0 left-0 h-full w-px bg-cyan-400" />
      </div>
      <div className="absolute bottom-8 right-8 w-10 h-10 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-px bg-cyan-400" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-cyan-400" />
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <SectionHeader
              tag="Execution Command Center"
              title="Systems-Driven Project Execution"
              subtitle="Every SAM India project runs through structured execution systems — delivering real-time visibility, quality discipline, and full audit trail across planning, quality, safety, and documentation."
            />

            {/* Metrics */}
            <div className="flex flex-wrap gap-4 mt-8">
              {metrics.map((m) => (
                <div key={m.label} className="glass rounded-xl px-5 py-4 border border-cyan-400/10 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at top left, rgba(0,212,255,0.06), transparent 60%)' }} />
                  <LiveCounter target={m.value} suffix={m.suffix} />
                  <div className="text-[10px] font-bold text-[#8899bb] uppercase tracking-wider mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            {/* System detail panel — shows when a system card is hovered */}
            <AnimatePresence mode="wait">
              {activeSystem !== null && (
                <motion.div
                  key={activeSystem}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="mt-8 glass rounded-2xl p-5 border border-white/8"
                  style={{ borderColor: `${systems[activeSystem].color}25` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {(() => {
                      const Icon = systems[activeSystem].icon;
                      return (
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ background: `${systems[activeSystem].color}15`, border: `1px solid ${systems[activeSystem].color}30` }}>
                          <Icon className="w-4 h-4" style={{ color: systems[activeSystem].color }} />
                        </div>
                      );
                    })()}
                    <div>
                      <div className="text-white font-bold text-sm">{systems[activeSystem].title}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <motion.span
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="w-1.5 h-1.5 rounded-full bg-[#10b981]"
                        />
                        <span className="text-[9px] font-bold text-[#10b981] tracking-widest">SYSTEM ONLINE</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#8899bb] leading-relaxed">{systems[activeSystem].desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: System grid */}
          <div className="grid grid-cols-2 gap-3">
            {systems.map((sys, i) => {
              const Icon = sys.icon;
              return (
                <motion.div
                  key={sys.title}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onHoverStart={() => setActiveSystem(i)}
                  onHoverEnd={() => setActiveSystem(null)}
                  className="glass rounded-xl p-4 border transition-all duration-300 group cursor-default relative overflow-hidden"
                  style={{
                    borderColor: activeSystem === i ? `${sys.color}30` : 'rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Hover background */}
                  <motion.div
                    animate={{ opacity: activeSystem === i ? 1 : 0 }}
                    className="absolute inset-0 rounded-xl"
                    style={{ background: `radial-gradient(ellipse at top left, ${sys.color}08, transparent 70%)` }}
                  />

                  {/* Top glow line on hover */}
                  <motion.div
                    animate={{ opacity: activeSystem === i ? 1 : 0 }}
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${sys.color}60, transparent)` }}
                  />

                  <div className="relative flex items-start justify-between mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${sys.color}15`, border: `1px solid ${sys.color}25` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: sys.color }} />
                    </div>
                    <div className="flex items-center gap-1">
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: '#10b981' }}
                      />
                      <span className="text-[9px] font-bold text-[#10b981] tracking-widest">{sys.status}</span>
                    </div>
                  </div>
                  <h4 className="relative text-white font-bold text-xs mb-1.5 uppercase tracking-wide">{sys.title}</h4>
                  <p className="relative text-[11px] leading-relaxed text-[#8899bb] line-clamp-2">{sys.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
