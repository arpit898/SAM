'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Container from '@/components/ui/Container';

const contracts = [
  { code: 'EC-01', client: 'DMRC Phase V', value: '₹222.76 Cr', desc: 'Delhi Metro Station, 2026' },
  { code: 'L-6',   client: 'MMRDA Mumbai', value: '₹547.45 Cr', desc: 'Kanjurmarg Depot' },
  { code: 'UG-05', client: 'CMRL Chennai', value: '₹665.99 Cr', desc: 'Corridor 3 Underground' },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="relative bg-black overflow-hidden">
      <div className="h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />

      {/* Primary stat: full-bleed revenue number */}
      <div className="relative border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">

          {/* LEFT: MEGA revenue */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative overflow-hidden py-16 px-8 sm:px-14 lg:px-20 border-b lg:border-b-0 lg:border-r"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {/* Ghost watermark */}
            <div
              className="absolute inset-0 flex items-center pointer-events-none select-none"
              aria-hidden="true"
              style={{ paddingLeft: '1rem' }}
            >
              <span
                className="font-black leading-none"
                style={{
                  fontSize: 'clamp(180px, 30vw, 400px)',
                  color: 'rgba(255,215,0,0.04)',
                  letterSpacing: '-0.05em',
                }}
              >
                1230
              </span>
            </div>

            <div className="relative z-10">
              <div
                className="uppercase text-white/25 mb-6 font-mono"
                style={{ fontSize: '9px', letterSpacing: '0.5em' }}
              >
                Revenue FY2025
              </div>
              <div className="flex items-start gap-0">
                <span
                  className="font-black leading-none mt-2"
                  style={{ fontSize: 'clamp(18px, 3.5vw, 48px)', color: '#FFD700' }}
                >
                  ₹
                </span>
                <span
                  className="font-black text-white leading-none tracking-[-0.04em]"
                  style={{ fontSize: 'clamp(80px, 16vw, 220px)' }}
                >
                  <AnimatedCounter value="1230" suffix="" label="" className="inline" />
                </span>
              </div>
              <div
                className="font-black leading-none tracking-[-0.03em]"
                style={{ fontSize: 'clamp(28px, 5vw, 72px)', color: '#FFD700' }}
              >
                Crore
              </div>
              <div className="text-[11px] text-white/30 mt-4">Active infrastructure portfolio</div>
            </div>
          </motion.div>

          {/* RIGHT: three secondary stats stacked */}
          <div className="grid grid-rows-3 divide-y" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            {[
              { value: '27', suffix: ' Yrs', label: 'FOUNDED 1998', note: 'In operation' },
              { value: '1400', suffix: '+', label: 'WORKFORCE', note: 'Direct employees' },
              { value: '10', suffix: '+', label: 'METRO CORPS', note: 'DMRC · MMRDA · CMRL+' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="px-8 sm:px-12 py-8 flex flex-col justify-center group"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="uppercase text-white/25 mb-2 font-mono"
                  style={{ fontSize: '9px', letterSpacing: '0.4em' }}
                >
                  {s.label}
                </div>
                <div
                  className="font-black text-white leading-none tracking-[-0.04em]"
                  style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}
                >
                  <AnimatedCounter value={s.value} suffix="" label="" delay={i * 0.1} className="inline" />
                  <span style={{ color: '#FFD700', fontSize: '0.6em', marginLeft: '0.05em' }}>{s.suffix}</span>
                </div>
                <div className="text-[11px] text-white/30 mt-1">{s.note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Active contracts */}
      <Container className="py-16 lg:py-20">
        <div className="flex items-center gap-4 mb-10">
          <span
            className="uppercase text-white/30 flex-shrink-0 font-mono"
            style={{ fontSize: '9px', letterSpacing: '0.4em' }}
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
              <div
                className="border-t pt-6 group-hover:border-[#FFD700] transition-colors duration-300"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <span
                  className="text-white/30 uppercase font-mono"
                  style={{ fontSize: '9px', letterSpacing: '0.2em' }}
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center gap-4 mt-10 pt-8 border-t text-[10px] text-white/20"
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
