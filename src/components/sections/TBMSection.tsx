'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Container from '@/components/ui/Container';

const TBMScene = dynamic(() => import('@/components/3d/TBMScene'), { ssr: false });

const specs = [
  { label: 'Tunnel Diameter', value: '9.8 m', sub: 'Internal bore' },
  { label: 'Excavation Depth', value: '18–32 m', sub: 'Below ground level' },
  { label: 'Advance Rate', value: '8–14 m/day', sub: 'Optimised TBM progress' },
  { label: 'Lining Segments', value: '6+1', sub: 'Per ring assembly' },
];

const tags = ['DMRC', 'MMRDA', 'CMRL', 'LMRC', 'RITES', 'L&T-Metro'];

export default function TBMSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const sceneScale = useTransform(scrollYProgress, [0.1, 0.5], [0.9, 1.0]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.6]);
  const textX = useTransform(scrollYProgress, [0.1, 0.4], [-30, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#050a1a] overflow-hidden flex items-center">
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.06]" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,212,255,0.04), transparent 70%)' }} />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050a1a] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050a1a] to-transparent pointer-events-none" />

      <Container className="relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left: 3D scene */}
          <motion.div
            style={{ scale: sceneScale, opacity: sceneOpacity }}
            className="relative h-[420px] lg:h-[540px] rounded-2xl overflow-hidden order-2 lg:order-1"
          >
            {/* HUD frame */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* Corner brackets */}
              {[
                'top-3 left-3 border-t border-l',
                'top-3 right-3 border-t border-r',
                'bottom-3 left-3 border-b border-l',
                'bottom-3 right-3 border-b border-r',
              ].map((cls, i) => (
                <div key={i} className={`absolute w-6 h-6 border-cyan-400/40 ${cls}`} />
              ))}

              {/* Top HUD label */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-cyan-400/70">
                  TBM LIVE · UG-METRO · ACTIVE
                </span>
              </div>

              {/* Bottom data strip */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <span className="text-[8px] font-mono text-[#8899bb] uppercase tracking-wider">
                  CW: 12.4 RPM
                </span>
                <span className="text-[8px] font-mono text-[#8899bb] uppercase tracking-wider">
                  THRUST: 42,000 kN
                </span>
                <span className="text-[8px] font-mono text-[#8899bb] uppercase tracking-wider">
                  TORQUE: 8,900 kN·m
                </span>
              </div>
            </div>

            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-2xl border border-cyan-400/10 z-10 pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.03), rgba(30,111,255,0.02))' }} />

            <TBMScene />
          </motion.div>

          {/* Right: Text content */}
          <motion.div style={{ x: textX, opacity: textOpacity }} className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-400">
                Underground Construction
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/40 to-transparent max-w-[80px]" />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white leading-[1.0] tracking-[-0.02em] mb-6">
              Boring Through<br />
              <span className="gradient-text-cyan">India&apos;s Ground</span>
            </h2>

            <p className="text-base text-[#8899bb] leading-relaxed mb-8 max-w-md">
              From soft alluvial soils beneath Delhi to hard basalt rock under Mumbai — SAM India has engineered underground metro systems across India&apos;s most complex geological and urban environments.
            </p>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {specs.map((s) => (
                <div key={s.label}
                  className="glass rounded-xl p-4 border border-white/5 hover:border-cyan-400/15 transition-colors duration-300">
                  <div className="text-xl font-black text-cyan-400 mb-0.5">{s.value}</div>
                  <div className="text-[11px] font-bold text-white mb-0.5">{s.label}</div>
                  <div className="text-[10px] text-[#8899bb]">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Client tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t}
                  className="text-[9px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full border border-white/10 text-[#8899bb] hover:border-cyan-400/30 hover:text-cyan-400 transition-all duration-200">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
