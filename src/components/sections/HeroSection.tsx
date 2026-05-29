'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import InfraSceneClient from '@/components/3d/InfraSceneClient';

const ticker = [
  'DMRC PHASE V', '₹ 222 Cr', '·',
  'MMRDA L-6', '₹ 547 Cr', '·',
  'CMRL CORRIDOR 3', '₹ 665 Cr', '·',
  'METRO · UNDERGROUND', 'INSTITUTIONAL', '·',
  'INDUSTRIAL · POWER', 'REAL ESTATE', '·',
];

function Ticker() {
  const doubled = [...ticker, ...ticker];
  return (
    <div className="relative overflow-hidden border-t border-b border-white/8 py-2.5">
      <div className="marquee flex gap-8" style={{ animationDuration: '28s' }}>
        {doubled.map((t, i) => (
          <span key={i}
            className={`flex-shrink-0 text-[10px] font-black uppercase tracking-[0.3em] ${t === '·' ? 'text-white/20' : 'text-[#888899]'}`}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-8%']);
  const sceneScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.06]);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      (window as Window & { __heroScrollProgress?: number }).__heroScrollProgress = v;
    });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative bg-black" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── 3D scene: full-right panel on desktop, full BG on mobile ── */}
        <motion.div
          style={{ scale: sceneScale }}
          className="absolute inset-0 lg:left-[46%] z-0"
        >
          <InfraSceneClient />
          {/* Right-side gradient fade into black on desktop */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-32 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #000 0%, transparent 100%)' }} />
        </motion.div>

        {/* Dark overlay for mobile readability */}
        <div className="lg:hidden absolute inset-0 bg-black/55 z-[1] pointer-events-none" />

        {/* ── Left text panel ── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 lg:w-[52%]"
        >
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mb-8 lg:mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
            <span className="text-[9px] font-black uppercase tracking-[0.45em] text-[#888899]">
              Est. 1998 · Delhi · Pan-India
            </span>
          </motion.div>

          {/* Headline — staggered word reveal */}
          <div className="overflow-hidden mb-1">
            <motion.div
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.0, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
              className="font-black text-white leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(52px, 10vw, 130px)' }}
            >
              ENGINEERING
            </motion.div>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.div
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.0, delay: 0.18, ease: [0.76, 0, 0.24, 1] }}
              className="gradient-text-cyan font-black leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(52px, 10vw, 130px)' }}
            >
              INDIA&apos;S
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.0, delay: 0.32, ease: [0.76, 0, 0.24, 1] }}
              className="font-black text-white leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(52px, 10vw, 130px)' }}
            >
              FUTURE
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-7 text-[13px] sm:text-sm text-[#888899] leading-relaxed max-w-[400px]"
          >
            SAM India Builtwell Pvt. Ltd. — delivering ₹1,230+ Crore of metro, institutional,
            industrial, and civil infrastructure since 1998.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-8 flex items-center gap-6 sm:gap-8"
          >
            {[
              { v: '₹1,230 Cr', l: 'Revenue FY25' },
              { v: '27 Yrs', l: 'In Operation' },
              { v: '1,400+', l: 'Workforce' },
            ].map((s, i) => (
              <div key={i} className={i > 0 ? 'pl-6 sm:pl-8 border-l border-white/10' : ''}>
                <div className="text-xl font-black text-white">{s.v}</div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-[#888899] mt-0.5">{s.l}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-8 flex items-center gap-4"
          >
            <a href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] bg-[#00d4ff] text-black rounded hover:bg-white transition-colors duration-200">
              View Projects
            </a>
            <a href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] border border-white/15 text-white rounded hover:border-white/40 transition-colors duration-200">
              Our Story
            </a>
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-6 sm:left-10 lg:left-16 z-20 flex items-center gap-3"
        >
          <div className="relative h-10 w-px bg-white/10 overflow-hidden">
            <motion.div
              className="absolute top-0 w-full bg-cyan-400"
              style={{ height: '35%' }}
              animate={{ y: ['0%', '300%'] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
          </div>
          <span className="text-[9px] uppercase tracking-[0.4em] text-[#888899]">Scroll</span>
        </motion.div>

        {/* ── HUD top-right label ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute top-6 right-8 z-20 hidden lg:flex items-center gap-2"
        >
          <span className="text-[8px] font-mono uppercase tracking-[0.35em] text-[#888899]">
            CIN: U70101DL1998PTC091859
          </span>
        </motion.div>
      </div>

      {/* ── Ticker — appears at bottom of sticky area ── */}
      <div className="sticky top-[calc(100vh-42px)] z-20 bg-black">
        <Ticker />
      </div>
    </section>
  );
}
