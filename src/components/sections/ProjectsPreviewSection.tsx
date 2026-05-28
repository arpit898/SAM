'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/data/projects';

export default function ProjectsPreviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Horizontal scroll: slides right panel from 0 to -(projects.length - 1.8) * 460
  const xRange = -(projects.length - 1.8) * 460;
  const x = useTransform(scrollYProgress, [0, 1], [0, xRange]);

  // Progress bar fill
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050a1a]"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Left panel */}
        <div className="absolute left-16 top-0 bottom-0 w-[28vw] flex flex-col justify-center z-10 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.4em] text-cyan-400 font-bold mb-5">
            ACTIVE PORTFOLIO
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-[-0.03em] leading-none mb-4 whitespace-pre-line">
            {`Our\nWork`}
          </h2>
          <p className="text-[12px] text-[#8899bb] mb-8 leading-relaxed">
            Real contracts. Real scale. Real infrastructure.
          </p>

          {/* Progress bar */}
          <div className="w-32 h-px bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 right-0 bg-cyan-400 origin-left"
              style={{ scaleX: progressScaleX }}
            />
          </div>
        </div>

        {/* Right scrolling area */}
        <div className="absolute left-[30vw] right-0 top-0 bottom-0 overflow-hidden flex items-center">
          <motion.div
            style={{ x }}
            className="flex items-stretch gap-8 pl-12 h-[70vh]"
          >
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className="w-[420px] flex-shrink-0 h-full"
              >
                <Link href={`/projects/${project.slug}`} className="block h-full">
                  <div className="relative h-full glass rounded-2xl border border-white/5 hover:border-cyan-400/20 transition-all duration-500 overflow-hidden group flex flex-col p-8">

                    {/* Top: index + status */}
                    <div className="flex justify-between items-start mb-auto">
                      <span className="text-[10px] font-black text-[#8899bb] uppercase tracking-[0.3em]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] px-2 py-1 rounded-full border text-[#10b981] border-[#10b981]/30 bg-[#10b981]/5 uppercase tracking-wider font-bold">
                        {project.status}
                      </span>
                    </div>

                    {/* Middle: category + name */}
                    <div className="my-8">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#8899bb] mb-3">
                        {project.category}
                      </div>
                      <h3 className="text-2xl font-black text-white leading-tight line-clamp-3 group-hover:text-cyan-400 transition-colors duration-300">
                        {project.name}
                      </h3>
                    </div>

                    {/* Bottom: value + client */}
                    <div className="mt-auto pt-6 border-t border-white/5">
                      <div className="text-3xl font-black text-cyan-400 mb-1">
                        {project.value.replace('₹', '₹ ')}
                      </div>
                      <div className="text-[11px] text-[#8899bb] uppercase tracking-wider">
                        {project.client.split('(')[0].trim()}
                      </div>
                    </div>

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(ellipse at bottom left, rgba(0,212,255,0.06), transparent 60%)',
                      }}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
