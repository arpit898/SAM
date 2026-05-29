'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Container from '@/components/ui/Container';

const megaStats = [
  { value: '1230', prefix: '₹', suffix: 'Cr', label: 'Revenue FY2025', note: 'Turnover' },
  { value: '27', prefix: '', suffix: 'Yrs', label: 'Founded 1998', note: 'In operation' },
  { value: '1400', prefix: '', suffix: '+', label: 'Workforce', note: 'Direct employees' },
  { value: '10', prefix: '', suffix: '+', label: 'Metro Corps', note: 'DMRC, MMRDA, CMRL+' },
];

const contracts = [
  { code: 'EC-01', client: 'DMRC Phase V', value: '₹222.76 Cr', desc: 'Delhi Metro Station, 2026' },
  { code: 'L-6',   client: 'MMRDA Mumbai', value: '₹547.45 Cr', desc: 'Kanjurmarg Depot' },
  { code: 'UG-05', client: 'CMRL Chennai', value: '₹665.99 Cr', desc: 'Corridor 3 Underground' },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%']);

  return (
    <section ref={ref} className="relative bg-black overflow-hidden">
      {/* Top divider */}
      <div className="h-px bg-white/5" />

      {/* ── Big number strip ── */}
      <div className="border-b border-white/5">
        <Container className="py-16 sm:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
            {megaStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="px-6 py-6 lg:py-0 group"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.35em] text-[#888899] mb-3">
                  {s.label}
                </div>
                <div className="font-black text-white leading-none tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
                  <span className="text-[0.55em] text-[#888899]">{s.prefix}</span>
                  <AnimatedCounter value={s.value} suffix="" label="" delay={i * 0.1} className="inline" />
                  <span className="gradient-text-cyan text-[0.6em] ml-0.5">{s.suffix}</span>
                </div>
                <div className="text-[11px] text-[#888899] mt-2">{s.note}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Active contracts ── */}
      <Container className="py-16">
        <div className="flex items-center gap-4 mb-10">
          <motion.div style={{ width: lineWidth }} className="h-px bg-gradient-to-r from-cyan-400/50 to-transparent origin-left" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#888899] flex-shrink-0">
            Active Contract Portfolio
          </span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contracts.map((c, i) => (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group relative overflow-hidden rounded-xl border border-white/5 hover:border-cyan-400/15 transition-all duration-400 p-5"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              {/* Top glow on hover */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)' }} />

              <div className="flex items-start justify-between mb-4">
                <span className="text-[9px] font-mono text-[#888899] uppercase tracking-[0.2em] px-2 py-0.5 border border-white/8 rounded">
                  {c.code}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
              </div>
              <div className="text-2xl font-black text-white mb-1">{c.value}</div>
              <div className="text-[12px] font-bold text-white/60 mb-1">{c.client}</div>
              <div className="text-[11px] text-[#888899]">{c.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* CIN strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center gap-4 mt-10 pt-8 border-t border-white/5 text-[10px] text-[#888899]/50"
        >
          <span>CIN: U70101DL1998PTC091859</span>
          <span>·</span>
          <span>435 Jagriti Enclave, Vikas Marg Extn., Delhi – 110092</span>
          <span>·</span>
          <a href="tel:+911149981307" className="hover:text-cyan-400 transition-colors">+91 11 4998 1307</a>
          <span>·</span>
          <a href="mailto:info@samindia.com" className="hover:text-cyan-400 transition-colors">info@samindia.com</a>
        </motion.div>
      </Container>
    </section>
  );
}
