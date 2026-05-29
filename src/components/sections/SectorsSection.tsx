'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { sectors } from '@/data/sectors';
import Container from '@/components/ui/Container';

export default function SectorsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />

      <Container className="py-20 lg:py-28">
        {/* Header */}
        <div className="mb-16">
          <div className="overflow-hidden mb-2">
            <motion.h2
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="font-black text-white leading-[1.0] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
            >
              What We Build
            </motion.h2>
          </div>
        </div>

        {/* Numbered row list */}
        <div>
          {sectors.map((sector, i) => {
            const active = hovered === i;
            return (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="border-b"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <Link href={`/sectors#${sector.id}`}>
                  <div
                    className="group relative flex items-center gap-6 py-6 cursor-pointer overflow-hidden"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Watermark number */}
                    <span
                      className="absolute left-0 font-black leading-none select-none pointer-events-none transition-colors duration-300"
                      style={{
                        fontSize: 'clamp(60px, 8vw, 100px)',
                        color: active ? 'rgba(255,215,0,0.12)' : 'rgba(255,255,255,0.06)',
                        lineHeight: 1,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Sector title — offset to clear number */}
                    <div className="flex-1 min-w-0 pl-[4.5rem] sm:pl-[6rem] lg:pl-[8rem]">
                      <motion.h3
                        animate={{ x: active ? 4 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xl font-black text-white/80 group-hover:text-white transition-colors duration-200"
                      >
                        {sector.shortTitle}
                      </motion.h3>
                      <AnimatePresence>
                        {active && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.22 }}
                            className="text-[12px] text-white/40 leading-relaxed overflow-hidden"
                          >
                            {sector.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <span
                      className="hidden sm:block text-white/30 uppercase flex-shrink-0 font-mono"
                      style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                    >
                      {sector.capabilities.length} Capabilities
                    </span>

                    <motion.div
                      animate={{ x: active ? 0 : -4, opacity: active ? 1 : 0.2 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ArrowUpRight
                        className="w-4 h-4 transition-colors duration-200"
                        style={{ color: active ? '#FFD700' : 'white' }}
                      />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
      <div className="h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
    </section>
  );
}
