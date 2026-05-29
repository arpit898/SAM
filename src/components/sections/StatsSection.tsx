'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Container from '@/components/ui/Container';

const megaStats = [
  { value: '1230', prefix: '₹', suffix: 'Cr', label: 'REVENUE FY2025', note: 'Turnover' },
  { value: '27', prefix: '', suffix: 'Yrs', label: 'FOUNDED 1998', note: 'In operation' },
  { value: '1400', prefix: '', suffix: '+', label: 'WORKFORCE', note: 'Direct employees' },
  { value: '10', prefix: '', suffix: '+', label: 'METRO CORPS', note: 'DMRC, MMRDA, CMRL+' },
];

const contracts = [
  { code: 'EC-01', client: 'DMRC Phase V', value: '₹222.76 Cr', desc: 'Delhi Metro Station, 2026' },
  { code: 'L-6',   client: 'MMRDA Mumbai', value: '₹547.45 Cr', desc: 'Kanjurmarg Depot' },
  { code: 'UG-05', client: 'CMRL Chennai', value: '₹665.99 Cr', desc: 'Corridor 3 Underground' },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section ref={ref} className="relative bg-black overflow-hidden py-0">
      {/* Top divider */}
      <div className="h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />

      {/* Big number grid */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          {megaStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="py-16 px-8 group"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div
                className="uppercase mb-3 text-white/30"
                style={{ fontSize: '9px', letterSpacing: '0.4em', fontFamily: 'var(--font-geist-mono, monospace)' }}
              >
                {s.label}
              </div>
              <div
                className="font-black text-white leading-none tracking-[-0.03em]"
                style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
              >
                {s.prefix && (
                  <span className="text-[0.5em]" style={{ color: '#FFD700' }}>{s.prefix}</span>
                )}
                <AnimatedCounter value={s.value} suffix="" label="" delay={i * 0.1} className="inline" />
                <span className="text-[0.55em] ml-0.5" style={{ color: '#FFD700' }}>{s.suffix}</span>
              </div>
              <div className="text-[11px] text-white/30 mt-2">{s.note}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active contracts */}
      <Container className="py-16">
        <div className="flex items-center gap-4 mb-10">
          <span
            className="uppercase text-white/30 flex-shrink-0"
            style={{ fontSize: '9px', letterSpacing: '0.4em', fontFamily: 'var(--font-geist-mono, monospace)' }}
          >
            Active Contract Portfolio
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          {contracts.map((c, i) => (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group pt-6 pb-6 sm:px-8 first:pl-0"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="border-t pt-6 group-hover:border-[#FFD700] transition-colors duration-300" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <span
                  className="text-white/30 uppercase"
                  style={{ fontSize: '9px', fontFamily: 'var(--font-geist-mono, monospace)', letterSpacing: '0.2em' }}
                >
                  {c.code}
                </span>
                <div className="text-3xl font-black text-white mt-3 mb-1">{c.value}</div>
                <div className="text-[12px] font-bold text-white/60 mb-1">{c.client}</div>
                <div className="text-[11px] text-white/30">{c.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CIN strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center gap-4 mt-10 pt-8 border-t text-[10px] text-white/25"
          style={{ borderColor: 'rgba(255,255,255,0.08)', fontFamily: 'var(--font-geist-mono, monospace)' }}
        >
          <span>CIN: U70101DL1998PTC091859</span>
          <span>·</span>
          <span>435 Jagriti Enclave, Vikas Marg Extn., Delhi – 110092</span>
          <span>·</span>
          <a href="tel:+911149981307" className="hover:text-[#FFD700] transition-colors">+91 11 4998 1307</a>
          <span>·</span>
          <a href="mailto:info@samindia.com" className="hover:text-[#FFD700] transition-colors">info@samindia.com</a>
        </motion.div>
      </Container>
    </section>
  );
}
