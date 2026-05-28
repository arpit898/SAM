'use client';

import { motion } from 'framer-motion';
import { Activity, FileCheck, Shield, BarChart3, Wrench, FileText, Camera, Workflow } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const systems = [
  {
    icon: BarChart3,
    title: 'Planning Control',
    desc: 'Master schedule management, baseline tracking, and schedule risk analysis across all active projects.',
    status: 'ACTIVE',
    color: '#00d4ff',
  },
  {
    icon: FileCheck,
    title: 'Quality Control',
    desc: 'ITPs, hold-and-witness points, NCR management, and third-party inspection coordination.',
    status: 'ACTIVE',
    color: '#10b981',
  },
  {
    icon: Shield,
    title: 'Safety Monitoring',
    desc: 'Real-time safety incident reporting, daily toolbox talks, near-miss tracking, and compliance monitoring.',
    status: 'ACTIVE',
    color: '#f0a020',
  },
  {
    icon: FileText,
    title: 'Document Control',
    desc: 'Drawings, submittals, RFIs, and correspondence management with version control and audit trail.',
    status: 'ACTIVE',
    color: '#00d4ff',
  },
  {
    icon: Wrench,
    title: 'Plant & Machinery',
    desc: 'Equipment deployment tracking, maintenance scheduling, and asset utilization monitoring.',
    status: 'ACTIVE',
    color: '#1e6fff',
  },
  {
    icon: Activity,
    title: 'Billing & Claims',
    desc: 'RA bill preparation, variation management, interim payment certificates, and cash flow forecasting.',
    status: 'ACTIVE',
    color: '#00d4ff',
  },
  {
    icon: Camera,
    title: 'Site Visibility',
    desc: 'Daily progress photography, drone surveys, time-lapse documentation, and site condition records.',
    status: 'ACTIVE',
    color: '#10b981',
  },
  {
    icon: Workflow,
    title: 'Digital Workflows',
    desc: 'Approval workflows, checklist management, permit-to-work systems, and audit-ready digital records.',
    status: 'ACTIVE',
    color: '#00d4ff',
  },
];

export default function CommandCenterSection() {
  return (
    <section className="relative py-24 bg-[#050a1a] overflow-hidden">
      {/* HUD background */}
      <div className="absolute inset-0 blueprint-grid opacity-30" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)' }} />

      {/* Animated scan line */}
      <div className="absolute left-0 right-0 h-px overflow-hidden" style={{ top: '40%', background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent)' }}>
        <motion.div
          className="w-full h-full"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
          style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)' }}
        />
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Header + intro */}
          <div>
            <SectionHeader
              tag="Execution Command Center"
              title="Systems-Driven Project Execution"
              subtitle="Every SAM India project is managed through structured execution systems — delivering real-time visibility, quality discipline, and full audit trail across planning, quality, safety, and documentation."
            />

            {/* Metrics row */}
            <div className="flex flex-wrap gap-6 mt-8">
              {[
                { label: 'Live Projects', value: '[X]' },
                { label: 'Active Sites', value: '[X]' },
                { label: 'QC Inspections/Month', value: '[X]+' },
              ].map((m) => (
                <div key={m.label} className="glass rounded-xl px-5 py-4 hud-border">
                  <div className="text-2xl font-black gradient-text-cyan">{m.value}</div>
                  <div className="text-xs font-semibold text-[#8899bb] uppercase tracking-wider mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: System panels grid */}
          <div className="grid grid-cols-2 gap-4">
            {systems.map((sys, i) => {
              const Icon = sys.icon;
              return (
                <motion.div
                  key={sys.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${sys.color}15`, border: `1px solid ${sys.color}25` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: sys.color }} />
                    </div>
                    <div className="flex items-center gap-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full pulse-glow"
                        style={{ background: '#10b981' }}
                      />
                      <span className="text-[9px] font-bold text-[#10b981] tracking-widest">{sys.status}</span>
                    </div>
                  </div>
                  <h4 className="text-white font-bold text-xs mb-1.5 uppercase tracking-wide">{sys.title}</h4>
                  <p className="text-[11px] leading-relaxed text-[#8899bb] line-clamp-2">{sys.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
