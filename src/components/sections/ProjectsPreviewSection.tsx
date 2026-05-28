'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MapPin, ArrowRight, IndianRupee } from 'lucide-react';
import { projects } from '@/data/projects';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import TiltCard from '@/components/ui/TiltCard';

const filters = ['All', 'Metro', 'Underground', 'Healthcare', 'Real Estate'];

const statusColor: Record<string, string> = {
  Completed: '#10b981',
  Ongoing: '#00d4ff',
  Upcoming: '#f0a020',
};

const categoryColor: Record<string, string> = {
  Metro: '#00d4ff',
  Underground: '#1e6fff',
  Healthcare: '#10b981',
  Airport: '#f0a020',
  Power: '#eab308',
  'Real Estate': '#8b5cf6',
  Industrial: '#f0a020',
  Institutional: '#8899bb',
};

export default function ProjectsPreviewSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = (activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)).slice(0, 6);

  return (
    <section className="relative py-24 bg-[#0a1628] overflow-hidden">
      <div className="absolute inset-0 blueprint-grid-dense opacity-15" />

      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHeader
            tag="Active Portfolio"
            title="Landmark Infrastructure Projects"
            subtitle="Real contracts. Real clients. Real scale."
            className="mb-0"
          />

          {/* Filters */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {filters.map(f => (
              <motion.button
                key={f}
                onClick={() => setActiveFilter(f)}
                whileTap={{ scale: 0.96 }}
                className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all duration-200 ${
                  activeFilter === f
                    ? 'bg-[#00d4ff] text-[#050a1a]'
                    : 'glass text-[#8899bb] hover:text-white border border-white/5 hover:border-cyan-400/20'
                }`}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const accentColor = categoryColor[project.category] || '#00d4ff';
              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <TiltCard
                      className="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/12 transition-all duration-400 cursor-pointer h-full flex flex-col"
                      intensity={5}
                    >
                      {/* Visual header */}
                      <div
                        className="h-44 relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, #0a1628 0%, ${accentColor}12 100%)` }}
                      >
                        <div className="absolute inset-0 blueprint-grid-dense opacity-30" />

                        {/* Large category watermark */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl font-black uppercase tracking-widest" style={{ color: `${accentColor}08` }}>
                            {project.category}
                          </span>
                        </div>

                        {/* Top bar glow */}
                        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }} />

                        {/* Status badge */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#050a1a]/80 backdrop-blur-sm border border-white/10">
                          <motion.span
                            animate={{ opacity: project.status === 'Ongoing' ? [0.5, 1, 0.5] : 1 }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: statusColor[project.status] }}
                          />
                          <span className="text-[10px] font-bold text-white">{project.status}</span>
                        </div>

                        {/* Category pill */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border"
                          style={{ color: accentColor, background: `${accentColor}12`, borderColor: `${accentColor}30` }}
                        >
                          {project.category}
                        </div>

                        {/* Value overlay */}
                        {project.value !== 'Confidential' && (
                          <div className="absolute bottom-3 left-3 flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" style={{ color: accentColor }} />
                            <span className="text-xs font-black text-white">{project.value.replace('₹', '')}</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-white font-bold text-[14px] leading-snug mb-2 group-hover:text-cyan-400 transition-colors duration-200 line-clamp-2">
                          {project.name}
                        </h3>

                        <div className="flex items-center gap-1.5 mb-3">
                          <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="text-[12px] text-[#8899bb]">{project.location}</span>
                        </div>

                        <p className="text-[12px] leading-relaxed flex-1 text-[#8899bb] line-clamp-2 mb-4">{project.scope}</p>

                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                          <span className="text-[11px] font-semibold text-[#8899bb] line-clamp-1 max-w-[60%]">{project.client.split('(')[0].trim()}</span>
                          <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider group-hover:gap-2 transition-all"
                            style={{ color: accentColor }}>
                            View
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white border border-white/10 hover:border-cyan-400/30 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
