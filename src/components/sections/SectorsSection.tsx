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
    <section className="relative overflow-hidden bg-[#030303]">
      <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,215,0,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,215,0,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <Container className="relative z-10 py-20 lg:py-28">
        <div className="mb-14">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="font-black text-white leading-[1.0] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
            >
              What We Build
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/35 text-sm mt-3 max-w-xs"
          >
            Seven domains of infrastructure expertise.
          </motion.p>
        </div>

        {/* Sector list */}
        <div className="relative">
          {sectors.map((sector, i) => {
            const active = hovered === i;
            return (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.055, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="border-b relative"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <Link href={`/sectors#${sector.id}`}>
                  <div
                    className="group relative flex items-center gap-6 py-7 cursor-pointer overflow-hidden"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Gold fill on hover */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: active ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                      style={{
                        transformOrigin: 'left',
                        background: 'linear-gradient(90deg, rgba(255,215,0,0.05) 0%, transparent 100%)',
                      }}
                    />

                    {/* Giant watermark number */}
                    <span
                      className="absolute select-none pointer-events-none font-black leading-none transition-colors duration-300"
                      style={{
                        fontSize: 'clamp(80px, 13vw, 140px)',
                        color: active ? 'rgba(255,215,0,0.1)' : 'rgba(255,255,255,0.04)',
                        lineHeight: 1,
                        top: '50%',
                        left: '-0.04em',
                        transform: 'translateY(-50%)',
                        letterSpacing: '-0.05em',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Content row */}
                    <div className="flex-1 min-w-0 pl-[5rem] sm:pl-[7rem] lg:pl-[9rem]">
                      <div className="flex items-baseline gap-4">
                        <motion.h3
                          animate={{ x: active ? 6 : 0 }}
                          transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                          className="text-xl sm:text-2xl font-black transition-colors duration-200"
                          style={{ color: active ? '#FFD700' : 'rgba(255,255,255,0.82)' }}
                        >
                          {sector.shortTitle}
                        </motion.h3>
                      </div>

                      <AnimatePresence>
                        {active && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-[12px] text-white/40 leading-relaxed overflow-hidden max-w-[520px]"
                          >
                            {sector.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right: capability count */}
                    <span
                      className="hidden sm:block text-white/25 uppercase flex-shrink-0 font-mono transition-colors duration-200"
                      style={{
                        fontSize: '9px',
                        letterSpacing: '0.15em',
                        color: active ? 'rgba(255,215,0,0.5)' : undefined,
                      }}
                    >
                      {sector.capabilities.length} Capabilities
                    </span>

                    {/* Arrow */}
                    <motion.div
                      animate={{ x: active ? 0 : -5, opacity: active ? 1 : 0.2 }}
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

      <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
    </section>
  );
}
