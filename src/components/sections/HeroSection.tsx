'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import InfraSceneClient from '@/components/3d/InfraSceneClient';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.45], ['0%', '-12%']);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      (window as Window & { __heroScrollProgress?: number }).__heroScrollProgress = v;
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050a1a]"
      style={{ height: '190vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D scene — full behind everything */}
        <div className="absolute inset-0 z-0">
          <InfraSceneClient />
        </div>

        {/* Very subtle vignette / depth fade */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 110% 80% at 50% 120%, #050a1a 20%, transparent 60%)',
          }}
        />

        {/* Top strip */}
        <div className="absolute top-6 left-0 right-0 z-20 flex justify-between px-8 md:px-16">
          <span className="text-[9px] uppercase tracking-[0.5em] text-[#8899bb] font-semibold">
            SAM INDIA BUILTWELL · EST. 1998
          </span>
          <span className="text-[9px] uppercase tracking-[0.5em] text-[#8899bb] flex items-center gap-2">
            <motion.span
              className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
            ACTIVE OPERATIONS
          </span>
        </div>

        {/* Main content */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 z-10"
        >
          {/* Line 1 */}
          <div className="overflow-hidden">
            <motion.span
              className="block text-white uppercase leading-[0.9] font-black tracking-[-0.04em]"
              style={{ fontSize: 'clamp(48px, 13vw, 160px)' }}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            >
              ENGINEERING
            </motion.span>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden">
            <motion.span
              className="block gradient-text-cyan uppercase leading-[0.9] font-black tracking-[-0.04em]"
              style={{ fontSize: 'clamp(48px, 13vw, 160px)' }}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.76, 0, 0.24, 1] }}
            >
              INDIA&apos;S
            </motion.span>
          </div>

          {/* Line 3 */}
          <div className="overflow-hidden">
            <motion.span
              className="block text-white uppercase leading-[0.9] font-black tracking-[-0.04em]"
              style={{ fontSize: 'clamp(48px, 13vw, 160px)' }}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.34, ease: [0.76, 0, 0.24, 1] }}
            >
              FUTURE
            </motion.span>
          </div>

          {/* Sub-label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-6"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#8899bb]">
              Metro · Underground · Industrial · Power · Civil
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom strip */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-between items-end px-8 md:px-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-[9px] uppercase tracking-[0.5em] text-[#8899bb]"
          >
            DMRC · MMRDA · CMRL · LMRC · RITES
          </motion.span>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="relative h-12 w-px bg-white/10 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 right-0 bg-cyan-400 w-full"
                style={{ height: '40%' }}
                animate={{ y: ['0%', '250%'] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              />
            </div>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#8899bb]">SCROLL</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
