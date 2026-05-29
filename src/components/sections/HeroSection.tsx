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

function HUDBrackets() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[2]" style={{ padding: '20px' }}>
      {/* Top-left */}
      <svg className="absolute top-5 left-5" width="28" height="28" fill="none">
        <path d="M0 28 L0 0 L28 0" stroke="#FFD700" strokeWidth="1" opacity="0.35" />
      </svg>
      {/* Top-right */}
      <svg className="absolute top-5 right-5" width="28" height="28" fill="none">
        <path d="M28 28 L28 0 L0 0" stroke="#FFD700" strokeWidth="1" opacity="0.35" />
      </svg>
      {/* Bottom-left */}
      <svg className="absolute bottom-5 left-5" width="28" height="28" fill="none">
        <path d="M0 0 L0 28 L28 28" stroke="#FFD700" strokeWidth="1" opacity="0.35" />
      </svg>
      {/* Bottom-right */}
      <svg className="absolute bottom-5 right-5" width="28" height="28" fill="none">
        <path d="M28 0 L28 28 L0 28" stroke="#FFD700" strokeWidth="1" opacity="0.35" />
      </svg>
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-6%']);
  const sceneScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.05]);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      (window as Window & { __heroScrollProgress?: number }).__heroScrollProgress = v;
    });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative bg-black" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* 3D scene: full viewport */}
        <motion.div style={{ scale: sceneScale }} className="absolute inset-0 z-0">
          <InfraSceneClient />
        </motion.div>

        {/* Radial vignette for text readability */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 90% 110% at 20% 55%, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, transparent 100%),
              linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 30%)
            `,
          }}
        />

        {/* HUD corner brackets */}
        <HUDBrackets />

        {/* Top HUD strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-0 left-0 right-0 z-[3] flex items-center justify-between px-10 sm:px-16 pointer-events-none"
          style={{ paddingTop: '88px' }}
        >
          <span className="font-mono uppercase text-white/30" style={{ fontSize: '9px', letterSpacing: '0.45em' }}>
            DELHI · INDIA
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] pulse" />
            <span className="font-mono uppercase text-white/30" style={{ fontSize: '9px', letterSpacing: '0.45em' }}>
              LIVE TELEMETRY
            </span>
          </div>
          <span className="font-mono uppercase text-white/30" style={{ fontSize: '9px', letterSpacing: '0.45em' }}>
            EST. 1998
          </span>
        </motion.div>

        {/* Main overlay: headline + CTAs */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-[3] flex flex-col justify-center px-8 sm:px-14 lg:px-20 max-w-[900px]"
        >
          {/* Staggered diagonal headline */}
          <div className="select-none">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '108%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.05, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
                className="font-black text-white leading-[0.87] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(68px, 13vw, 168px)' }}
              >
                BUILDING
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '108%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.05, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="font-black leading-[0.87] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(68px, 13vw, 168px)', color: '#FFD700', marginLeft: '7%' }}
              >
                INDIA&apos;S
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '108%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.05, delay: 0.34, ease: [0.76, 0, 0.24, 1] }}
                className="font-black text-white leading-[0.87] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(68px, 13vw, 168px)', marginLeft: '3%' }}
              >
                FUTURE.
              </motion.div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68 }}
            className="mt-7 text-[13px] text-white/45 leading-relaxed max-w-[400px]"
          >
            ₹1,230 Crore in active infrastructure. Metro, industrial, institutional, power — since 1998.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.88 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-black transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: '#FFD700' }}
            >
              View Projects
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] border border-white/20 text-white hover:border-[#FFD700]/50 hover:text-[#FFD700] transition-all duration-200"
            >
              Our Story
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom HUD strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-14 left-8 sm:left-14 right-8 sm:right-14 z-[3] flex items-end justify-between pointer-events-none"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-px bg-white/10 overflow-hidden">
              <motion.div
                className="absolute top-0 w-full"
                style={{ height: '35%', background: '#FFD700' }}
                animate={{ y: ['0%', '300%'] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              />
            </div>
            <span className="font-mono uppercase text-white/25" style={{ fontSize: '9px', letterSpacing: '0.4em' }}>
              SCROLL
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            {['₹1,230 CR', '1,400+ PEOPLE', '27 YEARS'].map((s, i) => (
              <span key={i} className="font-mono uppercase text-white/20" style={{ fontSize: '9px', letterSpacing: '0.2em' }}>
                {s}
              </span>
            ))}
          </div>

          <span className="font-mono uppercase text-white/20" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
            28.6139°N · 77.2090°E
          </span>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="sticky top-[calc(100vh-46px)] z-20">
        <Ticker />
      </div>
    </section>
  );
}
