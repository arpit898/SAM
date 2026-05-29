'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import InfraSceneClient from '@/components/3d/InfraSceneClient';

const tickerItems = [
  'DMRC', '·', '₹222 CR', '·',
  'MMRDA', '·', '₹547 CR', '·',
  'CMRL', '·', '₹665 CR', '·',
  '27 YEARS', '·', '1,400+ WORKFORCE', '·',
  '10+ METRO CORPS', '·',
];

function Ticker() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div className="relative overflow-hidden bg-black border-t border-white/8 py-3">
      <div className="marquee flex gap-6" style={{ animationDuration: '30s' }}>
        {doubled.map((t, i) => (
          <span
            key={i}
            className="flex-shrink-0 text-[10px] font-black uppercase"
            style={{
              letterSpacing: '0.3em',
              color: t === '·' ? 'rgba(255,255,255,0.15)' : '#FFD700',
              fontFamily: 'var(--font-geist-mono, monospace)',
            }}
          >
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

        {/* 3D scene: right ~45% on desktop, full BG on mobile */}
        <motion.div
          style={{ scale: sceneScale }}
          className="absolute inset-0 lg:left-[55%] z-0"
        >
          <InfraSceneClient />
          {/* Fade edge on desktop */}
          <div
            className="hidden lg:block absolute inset-y-0 left-0 w-40 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #000 0%, transparent 100%)' }}
          />
        </motion.div>

        {/* Mobile overlay */}
        <div className="lg:hidden absolute inset-0 bg-black/60 z-[1] pointer-events-none" />

        {/* Left text panel ~55% */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 lg:w-[55%]"
        >
          {/* Location label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8 lg:mb-10"
          >
            <span
              className="text-white/40 uppercase"
              style={{ fontSize: '10px', letterSpacing: '0.4em', fontFamily: 'var(--font-geist-mono, monospace)' }}
            >
              DELHI, INDIA · EST. 1998
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-1">
            <motion.div
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.0, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
              className="font-black text-white leading-[0.85] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(60px, 11vw, 150px)' }}
            >
              BUILDING
            </motion.div>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.div
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.0, delay: 0.18, ease: [0.76, 0, 0.24, 1] }}
              className="font-black leading-[0.85] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(60px, 11vw, 150px)', color: '#FFD700' }}
            >
              INDIA&apos;S
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.0, delay: 0.32, ease: [0.76, 0, 0.24, 1] }}
              className="font-black text-white leading-[0.85] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(60px, 11vw, 150px)' }}
            >
              FUTURE.
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-7 text-[13px] text-white/50 leading-relaxed max-w-[420px]"
          >
            ₹1,230 Crore in active infrastructure. Metro, industrial, institutional, power — since 1998.
          </motion.p>

          {/* Inline stats */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.82 }}
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1"
          >
            {['27 YRS', '₹1,230 CR', '1,400+ PEOPLE', '10+ METRO CORPS'].map((stat, i) => (
              <span key={i} className="flex items-center gap-4">
                {i > 0 && <span className="text-white/15 text-[10px]">|</span>}
                <span
                  className="text-white/40 uppercase"
                  style={{ fontSize: '10px', letterSpacing: '0.15em', fontFamily: 'var(--font-geist-mono, monospace)' }}
                >
                  {stat}
                </span>
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-black rounded transition-all duration-200 hover:opacity-90"
              style={{ background: '#FF4D00' }}
            >
              View Projects
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] border border-white/20 text-white rounded hover:border-white/50 transition-colors duration-200"
            >
              Our Story
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-6 sm:left-10 lg:left-16 z-20 flex items-center gap-3"
        >
          <div className="relative h-10 w-px bg-white/10 overflow-hidden">
            <motion.div
              className="absolute top-0 w-full"
              style={{ height: '35%', background: '#FFD700' }}
              animate={{ y: ['0%', '300%'] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
          </div>
          <span
            className="uppercase text-white/40"
            style={{ fontSize: '9px', letterSpacing: '0.4em', fontFamily: 'var(--font-geist-mono, monospace)' }}
          >
            Scroll
          </span>
        </motion.div>
      </div>

      {/* Ticker at bottom of sticky area */}
      <div className="sticky top-[calc(100vh-46px)] z-20">
        <Ticker />
      </div>
    </section>
  );
}
