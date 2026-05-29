'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Container from '@/components/ui/Container';

const MorphCanvas = dynamic(() => import('@/components/3d/MorphCanvas'), { ssr: false });

type Win = Window & { __morphProgress?: number };

const stages = [
  {
    num: '01',
    tag: 'Vision',
    heading: 'Raw Potential',
    body: 'Every landmark structure begins as scattered ambition — thousands of decisions converging into one engineering vision.',
    stat: '27 Years',
    statLabel: 'of infrastructure execution',
    color: '#00d4ff',
  },
  {
    num: '02',
    tag: 'Underground',
    heading: 'Tunnel Vision',
    body: 'SAM India engineers metro tunnels beneath India\'s most complex urban environments — boring through rock, time, and budget pressure.',
    stat: '₹1,400 Cr+',
    statLabel: 'in active metro contracts',
    color: '#1e6fff',
  },
  {
    num: '03',
    tag: 'Skyline',
    heading: 'Cities Rising',
    body: 'From individual columns to connected skylines — our work shapes the infrastructure that moves, heals, powers, and defines Indian cities.',
    stat: '1,400+',
    statLabel: 'workforce on active sites',
    color: '#f0a020',
  },
];

export default function MorphSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const [stage, setStage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const clamped = Math.max(0, Math.min(1, v));
      (window as Win).__morphProgress = clamped;
      if (v < 0.38) setStage(0);
      else if (v < 0.68) setStage(1);
      else setStage(2);
    });
  }, [scrollYProgress]);

  const current = stages[stage];

  return (
    <section ref={ref} className="relative bg-black" style={{ height: '280vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Canvas background */}
        <div className="absolute inset-0">
          <MorphCanvas />
        </div>

        {/* Dark vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, #000000 85%)' }} />
        <div className="absolute left-0 top-0 bottom-0 w-64"
          style={{ background: 'linear-gradient(90deg, #000000 0%, transparent 100%)' }} />

        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-xl">
            {/* Stage indicator */}
            <div className="flex items-center gap-3 mb-8">
              {stages.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === stage ? 32 : 8,
                    opacity: i === stage ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.4 }}
                  className="h-0.5 rounded-full"
                  style={{ background: i === stage ? current.color : '#8899bb' }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                {/* Number + tag */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[11px] font-black uppercase tracking-[0.35em]"
                    style={{ color: current.color }}
                  >
                    {current.num} / {current.tag}
                  </span>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 40 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="h-px"
                    style={{ background: current.color }}
                  />
                </div>

                {/* Heading */}
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
                  {current.heading}
                </h2>

                {/* Body */}
                <p className="text-base sm:text-lg leading-relaxed text-[#8899bb] mb-8 max-w-md">
                  {current.body}
                </p>

                {/* Stat */}
                <div
                  className="inline-flex flex-col gap-0.5 px-5 py-3 rounded-xl border"
                  style={{
                    background: `${current.color}08`,
                    borderColor: `${current.color}25`,
                  }}
                >
                  <span className="text-2xl font-black" style={{ color: current.color }}>
                    {current.stat}
                  </span>
                  <span className="text-[11px] text-[#8899bb] uppercase tracking-wider font-semibold">
                    {current.statLabel}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage < 2 ? 0.5 : 0 }}
          className="absolute bottom-8 right-8 text-[10px] text-[#8899bb] uppercase tracking-[0.3em] writing-mode-vertical flex flex-col items-center gap-2"
        >
          <span>Scroll</span>
          <motion.div
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8"
            style={{ background: `linear-gradient(to bottom, ${current.color}60, transparent)` }}
          />
        </motion.div>
      </div>
    </section>
  );
}
