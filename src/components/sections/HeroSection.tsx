'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import InfraSceneClient from '@/components/3d/InfraSceneClient';
import Container from '@/components/ui/Container';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#050a1a]">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <InfraSceneClient />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 120%, #050a1a 30%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,212,255,0.06) 0%, transparent 60%)' }} />
        <div className="absolute left-0 right-0 bottom-0 h-64 bg-gradient-to-t from-[#050a1a] to-transparent" />
      </div>

      {/* Blueprint grid */}
      <div className="absolute inset-0 z-1 blueprint-grid opacity-30 pointer-events-none" />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px z-1 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)',
          animation: 'scanline 6s linear infinite',
          top: 0,
        }}
      />

      {/* HUD corner decorations */}
      <div className="absolute top-24 left-6 z-10 w-16 h-16 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-cyan-400/40" />
        <div className="absolute top-0 left-0 h-full w-px bg-cyan-400/40" />
      </div>
      <div className="absolute top-24 right-6 z-10 w-16 h-16 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-px bg-cyan-400/40" />
        <div className="absolute top-0 right-0 h-full w-px bg-cyan-400/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 justify-center pt-24">
        <Container>
          <div className="max-w-4xl">
            {/* Tag line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em]">
                  Infrastructure Excellence Since 1998
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.02] tracking-tight text-white mb-6"
            >
              Engineering{' '}
              <span className="gradient-text-cyan text-glow-cyan">India&apos;s</span>
              <br />
              Next Generation
              <br />
              <span className="text-white/80">of Infrastructure</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-lg sm:text-xl leading-relaxed max-w-2xl mb-10"
              style={{ color: '#a8b8d0' }}
            >
              SAM India Builtwell Pvt. Ltd. delivers complex civil, metro, institutional, industrial, power, and real estate infrastructure with engineering discipline, execution strength, and future-ready systems.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-[#050a1a] bg-[#00d4ff] hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,212,255,0.3)]"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white border border-white/20 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 backdrop-blur-sm bg-white/5"
              >
                <Download className="w-4 h-4" />
                Company Profile
              </a>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-16 flex flex-wrap gap-x-10 gap-y-4"
            >
              {[
                { v: '1998', l: 'Founded' },
                { v: '25+', l: 'Years' },
                { v: '8+', l: 'Sectors' },
                { v: '100+', l: 'Projects' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  {i > 0 && <div className="h-8 w-px bg-white/10" />}
                  <div>
                    <div className="text-2xl font-black gradient-text-cyan">{s.v}</div>
                    <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#8899bb' }}>{s.l}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 pb-8 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#8899bb] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4 text-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
