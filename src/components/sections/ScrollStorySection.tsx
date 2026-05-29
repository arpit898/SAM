'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const stories = [
  {
    id: 'metro',
    tag: '01 / METRO & UNDERGROUND',
    title: "Tunneling\nIndia's Cities",
    sub: 'Underground metro station boxes, diaphragm walls, and deep excavation in live urban environments.',
    stats: [
      { v: '10+', l: 'Metro Corps' },
      { v: '₹1,000+', l: 'CR Metro Value' },
      { v: '3', l: 'Active Metro Projects' },
    ],
    projects: [
      'DMRC Phase V — Yuge Yugeen Bharat',
      'MMRDA Mumbai Metro Line-6',
      'CMRL Chennai Corridor 3',
    ],
    color: '#FFD700',
    accent: '#FF4D00',
  },
  {
    id: 'industrial',
    tag: '02 / INDUSTRIAL & WAREHOUSES',
    title: 'Powering\nIndustrial India',
    sub: 'Large-span industrial facilities, logistics parks, manufacturing units, and power infrastructure nationwide.',
    stats: [
      { v: '500K+', l: 'SQM Built' },
      { v: '15+', l: 'Industrial Projects' },
      { v: '₹300+', l: 'CR Value' },
    ],
    projects: [
      'Power Substation Infrastructure',
      'Logistics Park Development',
      'Manufacturing Facilities',
    ],
    color: '#FF4D00',
    accent: '#FFD700',
  },
  {
    id: 'institutional',
    tag: '03 / INSTITUTIONAL & HEALTHCARE',
    title: 'Building\nPublic Infrastructure',
    sub: 'Government complexes, hospitals, educational institutions, and civic infrastructure with highest quality standards.',
    stats: [
      { v: '20+', l: 'Institutions Built' },
      { v: 'NABH', l: 'Healthcare Standards' },
      { v: '₹200+', l: 'CR Institutional' },
    ],
    projects: [
      'Government Hospital Complex',
      'DMRC Staff Quarters, Noida',
      'Civic & Administrative Buildings',
    ],
    color: '#4488FF',
    accent: '#FFD700',
  },
];

function StorySlide({ story, active }: { story: typeof stories[0]; active: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: active ? 1 : 0, x: active ? 0 : -60 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="w-full px-8 sm:px-12 lg:px-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: story.color }} />
            <span
              className="text-[8px] tracking-[0.4em] uppercase font-mono"
              style={{ color: story.color }}
            >
              {story.tag}
            </span>
          </div>

          <div>
            {story.title.split('\n').map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: active ? '0%' : '100%' }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + i * 0.1,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="text-white font-black leading-[0.9] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/40 text-[12px] leading-relaxed max-w-[400px] font-mono"
          >
            {story.sub}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex gap-6 flex-wrap"
          >
            {story.stats.map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span
                  className="text-[28px] font-black leading-none"
                  style={{ color: story.color }}
                >
                  {s.v}
                </span>
                <span className="text-[8px] tracking-[0.2em] text-white/30 uppercase font-mono">
                  {s.l}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Project list HUD panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: active ? 1 : 0, x: active ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:block"
        >
          <div className="hud-panel">
            <div className="text-[7px] tracking-[0.4em] text-white/20 uppercase font-mono mb-4">
              // FEATURED PROJECTS
            </div>
            <div className="flex flex-col gap-3">
              {story.projects.map((proj, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <span
                    className="text-[8px] font-mono mt-0.5"
                    style={{ color: story.color }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] text-white/60 group-hover:text-white transition-colors duration-200 leading-snug">
                    {proj}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[7px] tracking-[0.3em] text-white/20 uppercase font-mono">
                VIEW ALL →
              </span>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full" style={{ background: story.color }} />
                <span className="text-[7px] text-white/20 font-mono">ACTIVE</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ScrollStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStory, setActiveStory] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v * stories.length), stories.length - 1);
      setActiveStory(idx);
    });
  }, [scrollYProgress]);

  return (
    <section ref={sectionRef} style={{ height: `${stories.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* Wire grid background */}
        <div className="absolute inset-0 wire-grid opacity-15" />

        {/* Top section label */}
        <div className="absolute top-8 left-8 sm:left-12 lg:left-20 z-20 flex items-center gap-3">
          <div className="h-px w-6 bg-[#FFD700]/40" />
          <span className="text-[8px] tracking-[0.4em] text-white/25 uppercase font-mono">
            SAM INDIA — PROJECT SECTORS
          </span>
        </div>

        {/* Story slides */}
        <div className="relative h-full">
          {stories.map((story, i) => (
            <StorySlide key={story.id} story={story} active={i === activeStory} />
          ))}
        </div>

        {/* Bottom progress bar + navigation dots */}
        <div className="absolute bottom-8 left-8 sm:left-12 lg:left-20 right-8 z-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {stories.map((_, i) => (
              <div
                key={i}
                className="relative h-px transition-all duration-500"
                style={{
                  width: i === activeStory ? '32px' : '12px',
                  background: i === activeStory ? '#FFD700' : 'rgba(255,255,255,0.15)',
                  boxShadow: i === activeStory ? '0 0 8px #FFD700' : 'none',
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-48 h-px bg-white/8 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#FFD700]"
                style={{ width: progressWidth }}
              />
            </div>
            <span className="text-[7px] tracking-[0.3em] text-white/20 uppercase font-mono">
              {String(activeStory + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
