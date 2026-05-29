'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';

const categoryColors: Record<string, string> = {
  'Metro': '#00d4ff',
  'Underground': '#1e6fff',
  'Institutional': '#10b981',
  'Industrial': '#f0a020',
  'Power': '#f59e0b',
  'Real Estate': '#a78bfa',
};

export default function ProjectsPreviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const xRange = -(projects.length - 1.6) * 480;
  const x = useTransform(scrollYProgress, [0, 1], [0, xRange]);
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative bg-black" style={{ height: '420vh' }}>
      <div className="h-px bg-white/5" />

      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Blueprint grid */}
        <div className="absolute inset-0 blueprint-grid-fine opacity-50 pointer-events-none" />

        {/* Left fixed panel */}
        <div className="absolute left-8 sm:left-14 top-0 bottom-0 w-[220px] sm:w-[260px] flex flex-col justify-center z-10 pointer-events-none">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-4">
            Active Portfolio
          </span>
          <div className="overflow-hidden mb-1">
            <motion.div
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-5xl sm:text-6xl font-black text-white tracking-[-0.03em] leading-none"
            >
              Our
            </motion.div>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.div
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="text-5xl sm:text-6xl font-black gradient-text-cyan tracking-[-0.03em] leading-none"
            >
              Work.
            </motion.div>
          </div>
          <p className="text-[12px] text-[#888899] leading-relaxed mb-6">
            Real contracts. Real scale.<br />Real infrastructure.
          </p>

          {/* Progress */}
          <div className="w-20 h-px bg-white/8 relative overflow-hidden">
            <motion.div className="absolute inset-y-0 left-0 right-0 bg-cyan-400 origin-left"
              style={{ scaleX: progressScaleX }} />
          </div>
          <div className="mt-2 text-[9px] font-mono text-[#888899] uppercase tracking-wider">
            {projects.length} Projects
          </div>
        </div>

        {/* Scrolling card strip */}
        <div className="absolute left-[280px] sm:left-[320px] right-0 top-0 bottom-0 overflow-hidden flex items-center">
          <motion.div style={{ x }} className="flex items-stretch gap-5 pl-8 h-[68vh]">
            {projects.map((project, index) => {
              const color = categoryColors[project.category] || '#00d4ff';
              return (
                <div key={project.slug} className="w-[400px] sm:w-[440px] flex-shrink-0 h-full">
                  <Link href={`/projects/${project.slug}`} className="block h-full group">
                    <div className="relative h-full rounded-2xl border border-white/6 hover:border-white/12 transition-all duration-500 overflow-hidden flex flex-col p-7"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      {/* Top accent line */}
                      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />

                      {/* Corner HUD */}
                      {['top-3 left-3 border-t border-l', 'top-3 right-3 border-t border-r', 'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'].map((cls, ci) => (
                        <div key={ci} className={`absolute w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ${cls}`}
                          style={{ borderColor: `${color}50` }} />
                      ))}

                      {/* Index + status */}
                      <div className="flex justify-between items-center mb-auto">
                        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
                          {String(index + 1).padStart(2, '0')} /
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider"
                          style={{ color: '#10b981', borderColor: 'rgba(16,185,129,0.25)', background: 'rgba(16,185,129,0.06)' }}>
                          {project.status}
                        </span>
                      </div>

                      {/* Category + name */}
                      <div className="my-6">
                        <div className="text-[9px] uppercase tracking-[0.35em] font-bold mb-3"
                          style={{ color }}>
                          {project.category}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white/85 leading-tight group-hover:text-white transition-colors duration-300">
                          {project.name}
                        </h3>
                      </div>

                      {/* Value + client */}
                      <div className="mt-auto pt-5 border-t border-white/6">
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="text-2xl sm:text-3xl font-black mb-0.5" style={{ color }}>
                              {project.value}
                            </div>
                            <div className="text-[11px] text-[#888899] uppercase tracking-wider">
                              {project.client.split('(')[0].trim()}
                            </div>
                          </div>
                          <motion.div
                            animate={{ opacity: 0.3 }}
                            whileHover={{ opacity: 1 }}
                            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors"
                          >
                            <ArrowUpRight className="w-4 h-4 text-white" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Ambient glow on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at bottom left, ${color}08, transparent 60%)` }} />
                    </div>
                  </Link>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
      <div className="h-px bg-white/5" />
    </section>
  );
}
