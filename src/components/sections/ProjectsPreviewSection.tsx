'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';

export default function ProjectsPreviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const xRange = -(projects.length - 1.6) * 500;
  const x = useTransform(scrollYProgress, [0, 1], [0, xRange]);
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative bg-black" style={{ height: '450vh' }}>
      <div className="h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />

      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Left fixed panel */}
        <div className="absolute left-8 sm:left-14 top-0 bottom-0 w-[240px] flex flex-col justify-center z-10 pointer-events-none">
          <span
            className="uppercase text-white/30 mb-5"
            style={{ fontSize: '9px', letterSpacing: '0.4em', fontFamily: 'var(--font-geist-mono, monospace)' }}
          >
            OUR WORK
          </span>
          <div className="overflow-hidden mb-1">
            <motion.div
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="font-black text-white tracking-[-0.03em] leading-none"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
            >
              Active
            </motion.div>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.div
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-black tracking-[-0.03em] leading-none"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: '#FFD700' }}
            >
              Portfolio
            </motion.div>
          </div>
          <p className="text-[12px] text-white/40 leading-relaxed mb-8">
            Real contracts. Real scale.<br />Real infrastructure.
          </p>

          {/* Progress bar */}
          <div className="w-20 h-px overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="absolute inset-y-0 left-0 right-0 origin-left"
              style={{ scaleX: progressScaleX, background: '#FFD700' }}
            />
          </div>
          <div
            className="mt-2 uppercase text-white/30 font-mono"
            style={{ fontSize: '9px', letterSpacing: '0.15em' }}
          >
            {projects.length} Projects
          </div>
        </div>

        {/* Scrolling card strip */}
        <div className="absolute left-[280px] sm:left-[320px] right-0 top-0 bottom-0 overflow-hidden flex items-center">
          <motion.div style={{ x }} className="flex items-stretch gap-4 pl-8 h-[72vh]">
            {projects.map((project, index) => (
              <div key={project.slug} className="w-[460px] flex-shrink-0 h-full">
                <Link href={`/projects/${project.slug}`} className="block h-full group">
                  <div
                    className="relative h-full rounded-2xl overflow-hidden flex flex-col p-7 transition-all duration-300 hover:scale-[1.01]"
                    style={{ background: index % 2 === 0 ? '#0A0A0A' : '#111' }}
                  >
                    {/* Orange top border on hover */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: '#FF4D00' }}
                    />

                    {/* Index */}
                    <div className="mb-auto">
                      <span
                        className="text-white/20 font-mono uppercase"
                        style={{ fontSize: '10px', letterSpacing: '0.2em' }}
                      >
                        {String(index + 1).padStart(2, '0')} /
                      </span>
                    </div>

                    {/* Project name */}
                    <div className="my-6">
                      <div
                        className="uppercase text-white/30 mb-3 font-mono"
                        style={{ fontSize: '9px', letterSpacing: '0.35em' }}
                      >
                        {project.category}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight group-hover:text-white transition-colors duration-300">
                        {project.name}
                      </h3>
                    </div>

                    {/* Value + client + arrow */}
                    <div className="mt-auto pt-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-4xl font-black mb-1" style={{ color: '#FFD700' }}>
                            {project.value}
                          </div>
                          <div
                            className="uppercase text-white/40 font-mono"
                            style={{ fontSize: '11px', letterSpacing: '0.1em' }}
                          >
                            {project.client.split('(')[0].trim()}
                          </div>
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center">
                          <ArrowUpRight
                            className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ color: '#FF4D00' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
    </section>
  );
}
