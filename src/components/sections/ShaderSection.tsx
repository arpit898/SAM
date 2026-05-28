'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';

const FluidCanvas = dynamic(() => import('@/components/3d/FluidCanvas'), { ssr: false });

// Animated SVG: metro tunnel cross-section drawing itself
function BlueprintSVG() {
  const LINE = { stroke: '#00d4ff', fill: 'none', strokeWidth: '1.5', strokeLinecap: 'round' as const };
  const DIM = { stroke: '#8899bb', fill: 'none', strokeWidth: '0.8', strokeDasharray: '4 3', strokeLinecap: 'round' as const };
  const dur = (d: number, delay = 0) => ({ duration: d, ease: [0.4, 0, 0.2, 1] as [number,number,number,number], delay });
  const vp = { once: true, margin: '-60px' };

  return (
    <svg viewBox="0 0 440 460" className="w-full max-w-sm" style={{ filter: 'drop-shadow(0 0 18px rgba(0,212,255,0.18))' }}>
      {/* ── Outer tunnel lining ── */}
      <motion.path
        d="M 400,220 A 180,180 0 1,0 40,220 A 180,180 0 1,0 400,220"
        {...LINE}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={dur(2.2, 0.1)}
        viewport={vp}
      />
      {/* Inner lining ring */}
      <motion.path
        d="M 388,220 A 168,168 0 1,0 52,220 A 168,168 0 1,0 388,220"
        {...LINE}
        strokeWidth="0.6"
        style={{ opacity: 0.25 }}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={dur(2.2, 0.2)}
        viewport={vp}
      />

      {/* ── Platform slab ── */}
      <motion.line
        x1="90" y1="222" x2="350" y2="222"
        {...LINE}
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={dur(1, 1.8)}
        viewport={vp}
      />
      {/* Platform soffit */}
      <motion.line
        x1="90" y1="232" x2="350" y2="232"
        {...LINE}
        strokeWidth="0.6"
        style={{ opacity: 0.3 }}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={dur(1, 1.9)}
        viewport={vp}
      />

      {/* ── Support columns ── */}
      <motion.line x1="155" y1="232" x2="155" y2="330" {...LINE} strokeWidth="1.2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.7, 2.5)} viewport={vp} />
      <motion.line x1="285" y1="232" x2="285" y2="330" {...LINE} strokeWidth="1.2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.7, 2.6)} viewport={vp} />
      <motion.line x1="220" y1="232" x2="220" y2="340" {...LINE} strokeWidth="1.5"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.8, 2.7)} viewport={vp} />

      {/* ── Cross bracing ── */}
      <motion.path d="M 155,232 L 220,290 L 285,232" {...LINE} strokeWidth="0.6" style={{ opacity: 0.4 }}
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.8, 2.9)} viewport={vp} />

      {/* ── Track invert curve ── */}
      <motion.path d="M 90,340 Q 220,375 350,340" {...LINE} strokeWidth="1.2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(1, 3.1)} viewport={vp} />

      {/* ── Track ovals ── */}
      <motion.path d="M 183,368 A 35,18 0 1,0 113,368 A 35,18 0 1,0 183,368"
        {...LINE} strokeWidth="1"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.8, 3.4)} viewport={vp} />
      <motion.path d="M 327,368 A 35,18 0 1,0 257,368 A 35,18 0 1,0 327,368"
        {...LINE} strokeWidth="1"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.8, 3.5)} viewport={vp} />

      {/* ── Dimension lines ── */}
      <motion.line x1="40" y1="50" x2="400" y2="50" {...DIM}
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(1, 3.8)} viewport={vp} />
      <motion.line x1="40" y1="44" x2="40" y2="56" {...DIM} strokeDasharray="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.3, 3.8)} viewport={vp} />
      <motion.line x1="400" y1="44" x2="400" y2="56" {...DIM} strokeDasharray="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.3, 3.8)} viewport={vp} />

      <motion.line x1="425" y1="40" x2="425" y2="400" {...DIM}
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(1, 3.9)} viewport={vp} />

      {/* ── Labels ── */}
      <motion.text x="220" y="44" textAnchor="middle" fill="#8899bb" fontSize="11" fontFamily="monospace"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 4.1 }} viewport={vp}>
        ⌀ 9.8 m
      </motion.text>
      <motion.text x="80" y="215" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 4.3 }} viewport={vp}>
        PLATFORM
      </motion.text>
      <motion.text x="220" y="400" textAnchor="middle" fill="#8899bb" fontSize="9" fontFamily="monospace"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 4.5 }} viewport={vp}>
        TRACK INVERT
      </motion.text>
      <motion.text x="220" y="120" textAnchor="middle" fill="#8899bb" fontSize="10" fontFamily="monospace" letterSpacing="3"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 4.6 }} viewport={vp}>
        CUTL / UG STATION
      </motion.text>

      {/* Title block */}
      <motion.rect x="10" y="420" width="200" height="32" stroke="#8899bb" strokeWidth="0.5" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.6, 4.7)} viewport={vp} />
      <motion.text x="20" y="432" fill="#8899bb" fontSize="7" fontFamily="monospace"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.4, delay: 5.0 }} viewport={vp}>
        SAM INDIA BUILTWELL PVT. LTD.
      </motion.text>
      <motion.text x="20" y="444" fill="#00d4ff" fontSize="7" fontFamily="monospace"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.4, delay: 5.1 }} viewport={vp}>
        DWG: METRO-CUTL-XS-001 REV.A
      </motion.text>
    </svg>
  );
}

export default function ShaderSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Living fluid GLSL background */}
      <div className="absolute inset-0">
        <FluidCanvas />
      </div>

      {/* Top edge fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a1628] to-transparent pointer-events-none" />
      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050a1a] to-transparent pointer-events-none" />

      <Container className="relative z-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-6">
              Est. 1998 · Delhi · Pan-India
            </span>

            <h2 className="text-5xl sm:text-6xl lg:text-[64px] font-black text-white leading-[1.0] tracking-[-0.02em] mb-6">
              Engineering<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #00d4ff 0%, #1e6fff 100%)' }}
              >
                India&apos;s Next
              </span><br />
              Generation
            </h2>

            <p className="text-lg text-[#8899bb] leading-relaxed max-w-lg mb-10">
              From a Delhi civil contractor to executing ₹1,400+ Crore of metro infrastructure. 27 years of boring through rock, beating deadlines, and building the systems that move Indian cities.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider text-[#050a1a] bg-[#00d4ff] hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(0,212,255,0.2)]"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white border border-white/15 hover:border-cyan-400/30 hover:text-cyan-400 transition-all duration-300"
              >
                Our Story
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 pt-8 border-t border-white/5">
              {[
                { v: '₹1,230 Cr', l: 'Revenue FY2025' },
                { v: '10+', l: 'Metro Corporations' },
                { v: '1,400+', l: 'Workforce' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-lg font-black text-white">{s.v}</div>
                  <div className="text-[10px] text-[#8899bb] uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Blueprint SVG */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              {/* Glow behind SVG */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #00d4ff, transparent 70%)' }}
              />
              <BlueprintSVG />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
