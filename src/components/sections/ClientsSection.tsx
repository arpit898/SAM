'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { clients } from '@/data/clients';
import Container from '@/components/ui/Container';

// Infinite horizontal marquee for client logos
function Marquee({ items, speed = 40, reverse = false }: {
  items: typeof clients;
  speed?: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  const dir = reverse ? 'marquee-reverse' : 'marquee';
  return (
    <div className="relative overflow-hidden">
      <div className={`flex gap-4 ${dir}`} style={{ animationDuration: `${speed}s` }}>
        {doubled.map((client, i) => (
          <div
            key={i}
            className="flex-shrink-0 glass rounded-xl px-5 py-3 border border-white/5 hover:border-cyan-400/20 transition-colors duration-300 flex items-center gap-3 group cursor-default"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-400/20 transition-colors">
              <span className="text-[9px] font-black text-[#8899bb] group-hover:text-cyan-400 transition-colors tracking-wider">
                {client.logoPlaceholder}
              </span>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-white/80 whitespace-nowrap">{client.name}</div>
              <div className="text-[9px] text-[#8899bb] uppercase tracking-wider">{client.sector}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #0a1628, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, #0a1628, transparent)' }} />
    </div>
  );
}

const sectors = [
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  return (
    <section ref={ref} className="relative py-24 bg-[#0a1628] overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 blueprint-grid opacity-15" />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.03), transparent 70%)' }} />

      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.45em] text-cyan-400">
            Our Clients
          </span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.0] tracking-[-0.02em] mt-4 mb-5"
          >
            Trusted by India&apos;s<br />
            <span className="gradient-text-cyan">Leading Institutions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[#8899bb] max-w-lg mx-auto text-base leading-relaxed"
          >
            From metro rail corporations and central government agencies to defence establishments and industrial leaders — SAM India is the contractor of choice for mission-critical infrastructure.
          </motion.p>
        </motion.div>

        {/* Marquee rows */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Marquee items={clients} speed={35} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Marquee items={[...clients].reverse()} speed={28} reverse />
          </motion.div>
        </div>

        {/* Sector tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mt-12"
        >
          {sectors.map((s) => (
            <span key={s}
              className="text-[9px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full border border-white/8 text-[#8899bb] hover:border-cyan-400/25 hover:text-cyan-400 transition-all duration-200 cursor-default">
              {s}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-[10px] text-[#8899bb]/50 mt-8 italic"
        >
          Client logos to be added after verification and approval.
        </motion.p>
      </Container>
    </section>
  );
}
