'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const capabilities = [
  {
    code: 'SYS.01',
    label: 'BIM & Digital Twin',
    desc: 'Building Information Modelling for complex underground and elevated infrastructure.',
  },
  {
    code: 'SYS.02',
    label: 'Project Controls',
    desc: 'Earned value, schedule intelligence, and real-time site progress monitoring.',
  },
  {
    code: 'SYS.03',
    label: 'QA/QC Systems',
    desc: 'ISO 9001:2015 certified quality management with digital inspection workflows.',
  },
  {
    code: 'SYS.04',
    label: 'Safety Management',
    desc: 'OHSAS 18001 aligned safety protocols with digital permit-to-work systems.',
  },
  {
    code: 'SYS.05',
    label: 'Plant & Machinery',
    desc: 'Advanced fleet management for 100+ heavy equipment assets across sites.',
  },
  {
    code: 'SYS.06',
    label: 'ERP Integration',
    desc: 'End-to-end enterprise resource planning for project financials, HR, and procurement.',
  },
];

export default function TechPlatformSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-28 lg:py-36 bg-black overflow-hidden">
      {/* Wire grid bg */}
      <div className="absolute inset-0 wire-grid opacity-20" />

      {/* Gold glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #FFD700, transparent)' }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#FFD700]" />
            <span className="text-[8px] tracking-[0.4em] text-[#FFD700] uppercase font-mono">
              TECHNOLOGY PLATFORM
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 items-end">
            <div>
              <h2
                className="font-black text-white tracking-[-0.03em] leading-[0.9]"
                style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
              >
                BUILT ON DATA.<br />
                <span className="text-[#FFD700]">DELIVERED WITH</span><br />
                PRECISION.
              </h2>
            </div>
            <p className="text-[12px] text-white/35 leading-relaxed font-mono max-w-md lg:ml-auto">
              SAM India combines 27 years of field expertise with digital construction management
              systems to deliver complex infrastructure projects with measurable outcomes.
            </p>
          </div>
        </div>

        {/* Capabilities grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="hud-panel group hover:border-[rgba(255,215,0,0.25)] transition-all duration-300"
            >
              <div className="text-[7px] tracking-[0.3em] text-[#FFD700]/50 font-mono mb-3">
                {cap.code}
              </div>
              <div className="text-[14px] font-black text-white mb-2 tracking-[-0.01em] group-hover:text-[#FFD700] transition-colors duration-300">
                {cap.label}
              </div>
              <div className="text-[11px] text-white/30 leading-relaxed font-mono">{cap.desc}</div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#00FF88]" />
                <span className="text-[7px] tracking-[0.2em] text-white/20 uppercase font-mono">
                  OPERATIONAL
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stat row */}
        <div className="mt-16 border-t border-white/5 pt-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { v: 'ISO 9001:2015', l: 'Quality Certified' },
            { v: 'OHSAS 18001', l: 'Safety Certified' },
            { v: '100+', l: 'Heavy Equipment' },
            { v: '6', l: 'Digital Systems' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-1"
            >
              <div className="text-[20px] font-black text-white">{s.v}</div>
              <div className="text-[8px] tracking-[0.2em] text-white/25 uppercase font-mono">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
