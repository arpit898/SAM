'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';

const FluidCanvas = dynamic(() => import('@/components/3d/FluidCanvas'), { ssr: false });

function BlueprintSVG() {
  const L = { stroke: '#00d4ff', fill: 'none', strokeWidth: '1.5', strokeLinecap: 'round' as const };
  const D = { stroke: '#888899', fill: 'none', strokeWidth: '0.8', strokeDasharray: '4 3', strokeLinecap: 'round' as const };
  const dur = (d: number, delay = 0) => ({ duration: d, ease: [0.4, 0, 0.2, 1] as [number,number,number,number], delay });
  const vp = { once: true, margin: '-60px' };

  return (
    <svg viewBox="0 0 440 460" className="w-full max-w-sm" style={{ filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.15))' }}>
      <motion.path d="M 400,220 A 180,180 0 1,0 40,220 A 180,180 0 1,0 400,220"
        {...L} initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={dur(2.2, 0.1)} viewport={vp} />
      <motion.path d="M 388,220 A 168,168 0 1,0 52,220 A 168,168 0 1,0 388,220"
        {...L} strokeWidth="0.6" style={{ opacity: 0.2 }} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(2.2, 0.2)} viewport={vp} />
      <motion.line x1="90" y1="222" x2="350" y2="222" {...L} strokeWidth="2.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(1, 1.8)} viewport={vp} />
      <motion.line x1="90" y1="232" x2="350" y2="232" {...L} strokeWidth="0.6" style={{ opacity: 0.25 }} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(1, 1.9)} viewport={vp} />
      <motion.line x1="155" y1="232" x2="155" y2="330" {...L} strokeWidth="1.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.7, 2.5)} viewport={vp} />
      <motion.line x1="285" y1="232" x2="285" y2="330" {...L} strokeWidth="1.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.7, 2.6)} viewport={vp} />
      <motion.line x1="220" y1="232" x2="220" y2="340" {...L} strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.8, 2.7)} viewport={vp} />
      <motion.path d="M 155,232 L 220,290 L 285,232" {...L} strokeWidth="0.6" style={{ opacity: 0.35 }} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.8, 2.9)} viewport={vp} />
      <motion.path d="M 90,340 Q 220,375 350,340" {...L} strokeWidth="1.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(1, 3.1)} viewport={vp} />
      <motion.path d="M 183,368 A 35,18 0 1,0 113,368 A 35,18 0 1,0 183,368" {...L} strokeWidth="1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.8, 3.4)} viewport={vp} />
      <motion.path d="M 327,368 A 35,18 0 1,0 257,368 A 35,18 0 1,0 327,368" {...L} strokeWidth="1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.8, 3.5)} viewport={vp} />
      <motion.line x1="40" y1="50" x2="400" y2="50" {...D} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(1, 3.8)} viewport={vp} />
      <motion.line x1="40" y1="44" x2="40" y2="56" {...D} strokeDasharray="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.3, 3.8)} viewport={vp} />
      <motion.line x1="400" y1="44" x2="400" y2="56" {...D} strokeDasharray="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.3, 3.8)} viewport={vp} />
      <motion.text x="220" y="44" textAnchor="middle" fill="#888899" fontSize="11" fontFamily="monospace" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 4.1 }} viewport={vp}>⌀ 9.8 m</motion.text>
      <motion.text x="80" y="215" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 4.3 }} viewport={vp}>PLATFORM</motion.text>
      <motion.text x="220" y="400" textAnchor="middle" fill="#888899" fontSize="9" fontFamily="monospace" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 4.5 }} viewport={vp}>TRACK INVERT</motion.text>
      <motion.text x="220" y="120" textAnchor="middle" fill="#888899" fontSize="10" fontFamily="monospace" letterSpacing="3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 4.6 }} viewport={vp}>CUTL / UG STATION</motion.text>
      <motion.rect x="10" y="420" width="200" height="32" stroke="#888899" strokeWidth="0.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={dur(0.6, 4.7)} viewport={vp} />
      <motion.text x="20" y="432" fill="#888899" fontSize="7" fontFamily="monospace" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.4, delay: 5.0 }} viewport={vp}>SAM INDIA BUILTWELL PVT. LTD.</motion.text>
      <motion.text x="20" y="444" fill="#00d4ff" fontSize="7" fontFamily="monospace" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.4, delay: 5.1 }} viewport={vp}>DWG: METRO-CUTL-XS-001 REV.A</motion.text>
    </svg>
  );
}

export default function ShaderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <FluidCanvas />
      </motion.div>

      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)' }} />

      <Container className="relative z-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span className="text-[9px] font-black uppercase tracking-[0.45em] text-cyan-400 block mb-6">
              Est. 1998 · Delhi · Pan-India
            </span>
            <div className="overflow-hidden mb-1">
              <motion.div initial={{ y: '105%' }} whileInView={{ y: '0%' }} viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="text-5xl sm:text-6xl lg:text-[62px] font-black text-white leading-[1.0] tracking-[-0.02em]">
                Engineering
              </motion.div>
            </div>
            <div className="overflow-hidden mb-1">
              <motion.div initial={{ y: '105%' }} whileInView={{ y: '0%' }} viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="text-5xl sm:text-6xl lg:text-[62px] font-black gradient-text-cyan leading-[1.0] tracking-[-0.02em]">
                India&apos;s Next
              </motion.div>
            </div>
            <div className="overflow-hidden mb-7">
              <motion.div initial={{ y: '105%' }} whileInView={{ y: '0%' }} viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="text-5xl sm:text-6xl lg:text-[62px] font-black text-white leading-[1.0] tracking-[-0.02em]">
                Generation
              </motion.div>
            </div>

            <p className="text-base text-[#888899] leading-relaxed max-w-lg mb-10">
              From a Delhi civil contractor to executing ₹1,400+ Crore of metro infrastructure. 27 years of boring through rock, beating deadlines, and building the systems that move Indian cities.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/projects"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[11px] font-black uppercase tracking-[0.15em] text-black bg-[#00d4ff] hover:bg-white transition-all duration-300">
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/about"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[11px] font-black uppercase tracking-[0.15em] text-white border border-white/12 hover:border-white/30 transition-all duration-300">
                Our Story
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 pt-8 border-t border-white/8">
              {[{ v: '₹1,230 Cr', l: 'Revenue FY2025' }, { v: '10+', l: 'Metro Corps' }, { v: '1,400+', l: 'Workforce' }].map((s) => (
                <div key={s.l}>
                  <div className="text-lg font-black text-white">{s.v}</div>
                  <div className="text-[9px] text-[#888899] uppercase tracking-[0.3em] mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-3xl opacity-[0.08] pointer-events-none"
                style={{ background: 'radial-gradient(circle, #00d4ff, transparent 70%)' }} />
              <BlueprintSVG />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
