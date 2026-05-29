'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InfraSceneClient from '@/components/3d/InfraSceneClient';

gsap.registerPlugin(ScrollTrigger);

const tickerItems = [
  'DMRC PHASE V', '·', '₹222 CR', '·',
  'MMRDA MUMBAI', '·', '₹547 CR', '·',
  'CMRL CHENNAI', '·', '₹665 CR', '·',
  '27 YEARS', '·', '1,400+ WORKFORCE', '·',
  '10+ METRO CORPS', '·', '₹1,230 CR ACTIVE', '·',
  'ISO 9001:2015', '·', 'METRO · INDUSTRIAL · INSTITUTIONAL', '·',
];

const hudData = [
  { label: 'Active Projects', value: '3', unit: 'ONGOING' },
  { label: 'Contract Value', value: '₹1,230', unit: 'CR ACTIVE' },
  { label: 'Workforce', value: '1,400+', unit: 'PEOPLE' },
  { label: 'Years Operating', value: '27', unit: 'SINCE 1998' },
];

function Ticker() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div className="relative overflow-hidden bg-black border-t border-[rgba(255,215,0,0.08)] py-3">
      <div
        className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #000, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, #000, transparent)' }}
      />
      <div className="marquee flex gap-8" style={{ animationDuration: '35s' }}>
        {doubled.map((t, i) => (
          <span
            key={i}
            className="flex-shrink-0 text-[9px] font-black uppercase"
            style={{
              letterSpacing: '0.35em',
              color: t === '·' ? 'rgba(255,255,255,0.12)' : '#FFD700',
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

function HUDPanel({ data, delay }: { data: typeof hudData[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="hud-panel min-w-[110px]"
    >
      <div className="text-[7px] tracking-[0.3em] text-white/30 uppercase mb-1 font-mono">{data.label}</div>
      <div className="text-[22px] font-black text-white leading-none tracking-[-0.02em]">{data.value}</div>
      <div className="text-[7px] tracking-[0.2em] text-[#FFD700]/60 uppercase mt-1 font-mono">{data.unit}</div>
    </motion.div>
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
  const sceneScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.08]);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      (window as Window & { __heroScrollProgress?: number }).__heroScrollProgress = v;
    });
  }, [scrollYProgress]);

  // GSAP: animate headline letters on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-char', {
        y: 120,
        opacity: 0,
        stagger: 0.025,
        duration: 0.9,
        ease: 'power4.out',
        delay: 0.5,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const headline = ['BUILDING', "INDIA'S", 'FUTURE.'];

  return (
    <section ref={containerRef} className="relative bg-black" style={{ height: '220vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* 3D scene */}
        <motion.div style={{ scale: sceneScale }} className="absolute inset-0 lg:left-[52%] z-0">
          <InfraSceneClient />
          {/* Fade left edge */}
          <div
            className="hidden lg:block absolute inset-y-0 left-0 w-48 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #000 0%, transparent 100%)' }}
          />
          {/* Grid overlay on 3D */}
          <div className="absolute inset-0 wire-grid opacity-20 pointer-events-none" />
        </motion.div>

        {/* Mobile overlay */}
        <div className="lg:hidden absolute inset-0 bg-black/65 z-[1] pointer-events-none" />

        {/* Left text panel */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 lg:w-[55%]"
        >
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 lg:mb-10 flex items-center gap-3"
          >
            <div className="h-px w-8 bg-[#FFD700]/40" />
            <span
              className="text-white/35 uppercase font-mono"
              style={{ fontSize: '9px', letterSpacing: '0.4em' }}
            >
              DELHI, INDIA · EST. 1998
            </span>
          </motion.div>

          {/* Headline — GSAP animated characters */}
          <div className="mb-6">
            {headline.map((word, wi) => (
              <div key={wi} className="overflow-hidden">
                <div className="flex" style={{ fontSize: 'clamp(52px, 9.5vw, 130px)' }}>
                  {word.split('').map((char, ci) => (
                    <span
                      key={ci}
                      className={`hero-char font-black leading-[0.88] tracking-[-0.04em] ${
                        wi === 1 ? 'text-[#FFD700]' : 'text-white'
                      }`}
                      style={{ display: 'inline-block' }}
                    >
                      {char === ' ' ? ' ' : char}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="text-[12px] text-white/40 leading-relaxed max-w-[380px] mb-8 font-mono"
          >
            ₹1,230 Crore in active infrastructure across metros, industrial, institutional and
            power projects. Delivering India&apos;s backbone since 1998.
          </motion.p>

          {/* HUD data panels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="hidden lg:flex flex-wrap gap-3 mb-8"
          >
            {hudData.map((d, i) => (
              <HUDPanel key={i} data={d} delay={1.1 + i * 0.1} />
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex items-center gap-4"
          >
            <a
              href="/projects"
              className="relative inline-flex items-center gap-3 px-7 py-3.5 text-[9px] font-black uppercase tracking-[0.25em] text-black overflow-hidden group"
              style={{ background: '#FFD700' }}
            >
              <span className="relative z-10">View Projects</span>
              <span className="relative z-10 text-[8px]">→</span>
              <div className="absolute inset-0 bg-[#FF4D00] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-3 px-7 py-3.5 text-[9px] font-black uppercase tracking-[0.25em] border border-white/15 text-white/70 hover:border-[#FFD700]/40 hover:text-white transition-all duration-300"
            >
              Our Story
            </a>
          </motion.div>
        </motion.div>

        {/* Right side HUD overlay — desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-3"
        >
          {/* Vertical status indicator */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-20 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,215,0,0.4), transparent)' }}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] pulse" />
            <div
              className="h-20 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,215,0,0.2), transparent)' }}
            />
          </div>
          <div className="-rotate-90 origin-center whitespace-nowrap">
            <span className="text-[7px] tracking-[0.4em] text-white/20 uppercase font-mono">
              RENDERING 3D ENGINE
            </span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-20 left-6 sm:left-10 lg:left-16 z-20 flex items-center gap-3"
        >
          <div className="relative h-12 w-px bg-white/8 overflow-hidden">
            <motion.div
              className="absolute top-0 w-full"
              style={{
                height: '40%',
                background: 'linear-gradient(180deg, transparent, #FFD700, transparent)',
              }}
              animate={{ y: ['0%', '250%'] }}
              transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
            />
          </div>
          <span
            className="uppercase text-white/30 font-mono"
            style={{ fontSize: '8px', letterSpacing: '0.4em' }}
          >
            SCROLL
          </span>
        </motion.div>

        {/* Corner HUD decorations */}
        <div className="hidden lg:block absolute bottom-20 right-8 z-20">
          <div className="relative w-24 h-12 border border-white/5">
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[#FFD700]/40" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#FFD700]/40" />
            <div className="p-2 flex flex-col gap-1">
              <div className="text-[6px] tracking-[0.3em] text-white/20 uppercase font-mono">COORD</div>
              <div className="text-[7px] text-[#FFD700]/50 font-mono">28.6139°N 77.2090°E</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="sticky top-[calc(100vh-46px)] z-20">
        <Ticker />
      </div>
    </section>
  );
}
