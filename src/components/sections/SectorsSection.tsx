'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { LucideProps } from 'lucide-react';
import { Train, Layers, Building2, Heart, Factory, Zap, Home, MapPin, ArrowUpRight } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { sectors } from '@/data/sectors';
import Container from '@/components/ui/Container';

type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;

const iconMap: Record<string, LucideIcon> = {
  Train, Layers, Building2, Heart, Factory, Zap, Home, MapPin,
};

const accentColors = ['#00d4ff','#1e6fff','#10b981','#f0a020','#00d4ff','#1e6fff','#10b981','#f0a020'];

export default function SectorsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#050505' }}>
      <motion.div style={{ y: bgY }}
        className="absolute inset-0 blueprint-grid-fine pointer-events-none" />
      <div className="h-px bg-white/5" />

      <Container className="py-20 lg:py-28">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[9px] font-black uppercase tracking-[0.45em] text-cyan-400 block mb-3"
            >
              Our Sectors
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.0] tracking-[-0.025em]"
              >
                Eight Sectors.<br />
                <span className="gradient-text-cyan">One Capability.</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[13px] text-[#888899] max-w-xs leading-relaxed flex-shrink-0"
          >
            From metro tunnels to power substations — SAM India executes across India&apos;s
            most critical infrastructure sectors.
          </motion.p>
        </div>

        {/* Row list */}
        <div className="divide-y divide-white/5">
          {sectors.map((sector, i) => {
            const Icon = iconMap[sector.icon] || Building2;
            const color = accentColors[i];
            const active = hovered === i;
            return (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.055, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <Link href={`/sectors#${sector.id}`}>
                  <div
                    className="group relative flex items-center gap-5 sm:gap-8 py-5 sm:py-6 cursor-pointer"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Left accent */}
                    <motion.div
                      animate={{ scaleY: active ? 1 : 0, opacity: active ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full origin-top"
                      style={{ background: color }}
                    />

                    <span className="text-[11px] font-mono text-white/20 w-5 flex-shrink-0 group-hover:text-[#888899] transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <motion.div
                      animate={{ scale: active ? 1.1 : 1 }}
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: active ? `${color}18` : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${active ? color + '40' : 'rgba(255,255,255,0.06)'}`,
                      }}
                    >
                      <Icon className="w-4 h-4 transition-colors duration-300"
                        style={{ color: active ? color : '#888899' }} />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-black text-white/80 group-hover:text-white transition-colors duration-200">
                        {sector.shortTitle}
                      </h3>
                      <AnimatePresence>
                        {active && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.22 }}
                            className="text-[12px] text-[#888899] leading-relaxed overflow-hidden"
                          >
                            {sector.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <span className="hidden sm:block text-[10px] font-bold uppercase tracking-wider text-[#888899] flex-shrink-0">
                      {sector.capabilities.length} Capabilities
                    </span>

                    <motion.div
                      animate={{ x: active ? 0 : -4, opacity: active ? 1 : 0.2 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
      <div className="h-px bg-white/5" />
    </section>
  );
}
