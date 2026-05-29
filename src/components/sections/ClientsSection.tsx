'use client';

import { motion } from 'framer-motion';
import { clients } from '@/data/clients';
import Container from '@/components/ui/Container';

function MarqueeRow({ items, speed = 40, reverse = false }: {
  items: typeof clients;
  speed?: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  const cls = reverse ? 'marquee-reverse' : 'marquee';
  return (
    <div className="relative overflow-hidden">
      <div className={`flex gap-3 ${cls}`} style={{ animationDuration: `${speed}s` }}>
        {doubled.map((client, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-xl px-5 py-3 border flex items-center gap-3 group cursor-default transition-colors duration-300"
            style={{
              background: '#0A0A0A',
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <span
                className="font-black text-white/40"
                style={{ fontSize: '9px', letterSpacing: '0.05em' }}
              >
                {client.logoPlaceholder}
              </span>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-white/80 whitespace-nowrap">{client.name}</div>
              <div
                className="uppercase text-white/30"
                style={{ fontSize: '9px', letterSpacing: '0.1em', fontFamily: 'var(--font-geist-mono, monospace)' }}
              >
                {client.sector}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #000, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, #000, transparent)' }} />
    </div>
  );
}

const sectorTags = [
  'Metro Rail',
  'Central Govt / CPWD',
  'Airports (AAI)',
  'Indian Railways',
  'Defence / MES',
  'State PWD',
  'Healthcare',
  'Industrial',
  'Real Estate',
];

export default function ClientsSection() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <Container className="relative z-10">
        {/* Header — left-aligned editorial */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span
            className="uppercase text-white/30 block mb-4 font-mono"
            style={{ fontSize: '9px', letterSpacing: '0.45em' }}
          >
            Our Clients
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="font-black text-white leading-[1.0] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              Trusted by India&apos;s<br />
              <span style={{ color: '#FFD700' }}>Leading Institutions</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/40 max-w-lg text-sm leading-relaxed mt-4"
          >
            From metro rail corporations and central government agencies to defence establishments and industrial leaders.
          </motion.p>
        </motion.div>

        {/* Marquee rows */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MarqueeRow items={clients} speed={35} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <MarqueeRow items={[...clients].reverse()} speed={28} reverse />
          </motion.div>
        </div>

        {/* Sector tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mt-12"
        >
          {sectorTags.map((s) => (
            <span
              key={s}
              className="uppercase px-3 py-1.5 border text-white/40 hover:text-white/70 hover:border-[#FFD700]/30 transition-all duration-200 cursor-default"
              style={{
                fontSize: '9px',
                letterSpacing: '0.25em',
                fontFamily: 'var(--font-geist-mono, monospace)',
                borderColor: 'rgba(255,255,255,0.10)',
              }}
            >
              {s}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-[10px] text-white/20 mt-8 italic"
          style={{ fontFamily: 'var(--font-geist-mono, monospace)' }}
        >
          Client logos to be added after verification and approval.
        </motion.p>
      </Container>
    </section>
  );
}
