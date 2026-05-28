'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download, ChevronDown, TrendingUp } from 'lucide-react';
import InfraSceneClient from '@/components/3d/InfraSceneClient';
import Container from '@/components/ui/Container';
import SplitText from '@/components/ui/SplitText';
import MagneticButton from '@/components/ui/MagneticButton';

const ticker = [
  'DMRC Phase V — ₹222.76 Cr',
  'Mumbai Metro Line-6 — ₹547.45 Cr',
  'Chennai Metro Corridor 3 — ₹665.99 Cr',
  'Kanpur Metro — ₹150 Cr',
  'Revenue FY2025 — ₹1,230 Cr',
  '1,400+ Direct Employees',
  'Active since 1998 — 27 Years',
];

function GradientOrb() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: useTransform(springX, [-0.5, 0.5], ['-8%', '8%']),
        y: useTransform(springY, [-0.5, 0.5], ['-8%', '8%']),
      }}
      className="absolute inset-0 pointer-events-none"
    >
      {/* Primary orb */}
      <div
        className="absolute top-[-20%] left-[10%] w-[70vw] h-[70vw] rounded-full opacity-[0.035]"
        style={{ background: 'radial-gradient(circle, #00d4ff, transparent 70%)' }}
      />
      {/* Secondary orb */}
      <div
        className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-[0.025]"
        style={{ background: 'radial-gradient(circle, #1e6fff, transparent 70%)' }}
      />
    </motion.div>
  );
}

function TickerBar() {
  return (
    <div className="overflow-hidden border-y border-white/5 bg-white/[0.02] py-2">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap"
      >
        {[...ticker, ...ticker].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8 text-xs font-semibold text-[#8899bb] uppercase tracking-[0.15em]">
            <TrendingUp className="w-3 h-3 text-cyan-400 shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col overflow-hidden bg-[#050a1a]">
      {/* 3D scene with parallax */}
      <motion.div style={{ y: sceneY }} className="absolute inset-0 z-0">
        <InfraSceneClient />
      </motion.div>

      {/* Gradient orb that follows mouse */}
      <GradientOrb />

      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none z-1" />

      {/* Vertical gradient fades */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 110%, #050a1a 25%, transparent 65%)' }} />
        <div className="absolute left-0 right-0 bottom-0 h-56 bg-gradient-to-t from-[#050a1a] to-transparent" />
        <div className="absolute left-0 top-0 w-64 h-full bg-gradient-to-r from-[#050a1a]/50 to-transparent" />
      </div>

      {/* HUD corner decorations */}
      <div className="absolute top-24 left-6 z-10 w-20 h-20 pointer-events-none opacity-50">
        <div className="absolute top-0 left-0 w-6 h-px bg-cyan-400" />
        <div className="absolute top-0 left-0 h-6 w-px bg-cyan-400" />
      </div>
      <div className="absolute top-24 right-6 z-10 w-20 h-20 pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-6 h-px bg-cyan-400" />
        <div className="absolute top-0 right-0 h-6 w-px bg-cyan-400" />
      </div>

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent z-5 pointer-events-none"
        animate={{ y: ['-10vh', '110vh'] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
      />

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 flex flex-col flex-1 justify-center pt-24"
      >
        <Container>
          <div className="max-w-5xl">
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/5 backdrop-blur-sm">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                />
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.25em]">
                  Infrastructure Excellence Since 1998
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f0a020]/20 bg-[#f0a020]/5">
                <span className="text-[#f0a020] text-xs font-bold">₹1,230 Cr Revenue</span>
              </div>
            </motion.div>

            {/* Split text headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-black leading-[1.01] tracking-[-0.02em] text-white mb-6">
              <SplitText text="Engineering" className="block" delay={0.3} stagger={0.06} />
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.8, delay: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="block gradient-text-cyan text-glow-cyan"
                >
                  India&apos;s Next
                </motion.span>
              </span>
              <SplitText text="Generation of" className="block text-white/70" delay={0.75} stagger={0.05} />
              <SplitText text="Infrastructure" className="block" delay={0.95} stagger={0.06} />
            </h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="text-lg sm:text-xl leading-relaxed max-w-2xl mb-10"
              style={{ color: '#a8b8d0' }}
            >
              SAM India Builtwell Pvt. Ltd. — delivering metro, underground, institutional, industrial, power, and civil infrastructure since 1998. ₹1,230 Crore revenue. 1,400+ workforce. DMRC, MMRDA, CMRL & 10+ metro corporations.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.25 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton strength={0.25}>
                <Link
                  href="/projects"
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider text-[#050a1a] bg-[#00d4ff] hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(0,212,255,0.25)] hover:shadow-[0_0_60px_rgba(0,212,255,0.4)]"
                >
                  Explore Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider text-white border border-white/15 hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-300 backdrop-blur-sm bg-white/[0.04] hover:bg-cyan-400/5"
                >
                  <Download className="w-4 h-4" />
                  Company Profile
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Live project value badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-14 flex flex-wrap gap-3"
            >
              {[
                { label: 'DMRC Phase V', value: '₹222.76 Cr', status: 'Ongoing' },
                { label: 'Mumbai Metro L6', value: '₹547.45 Cr', status: 'Ongoing' },
                { label: 'Chennai Metro', value: '₹665.99 Cr', status: 'Ongoing' },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + i * 0.12 }}
                  className="glass rounded-lg px-4 py-2.5 border border-white/8 flex items-center gap-3"
                >
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"
                  />
                  <div>
                    <div className="text-[10px] text-[#8899bb] uppercase tracking-wider">{p.label}</div>
                    <div className="text-xs font-bold text-white">{p.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="relative z-10"
      >
        <TickerBar />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="relative z-10 pb-6 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-[#8899bb] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="w-4 h-4 text-cyan-400/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
