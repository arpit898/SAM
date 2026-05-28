'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const filters = ['All', 'Metro', 'Underground', 'Healthcare', 'Airport', 'Power', 'Real Estate', 'Industrial', 'Institutional'];

const statusColor: Record<string, string> = {
  Completed: '#10b981',
  Ongoing: '#00d4ff',
  Upcoming: '#f0a020',
};

export default function ProjectsPreviewSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="relative py-24 bg-[#0a1628] overflow-hidden">
      <div className="absolute inset-0 blueprint-grid-dense opacity-20" />

      <Container>
        <SectionHeader
          tag="Project Portfolio"
          title="Landmark Infrastructure Projects"
          subtitle="Delivered across metros, institutions, industries, healthcare, power, and real estate — each project a testament to engineering discipline."
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-[#00d4ff] text-[#050a1a]'
                  : 'glass text-[#8899bb] hover:text-white border border-white/5 hover:border-cyan-400/20'
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.slice(0, 6).map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-400/20 transition-all duration-400 cursor-pointer h-full flex flex-col">
                    {/* Image placeholder */}
                    <div
                      className="h-48 relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #0a1628 0%, #162a52 50%, #0f2040 100%)',
                      }}
                    >
                      <div className="absolute inset-0 blueprint-grid-dense opacity-60" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl font-black text-white/10 uppercase tracking-widest">
                            {project.category}
                          </div>
                          <div className="text-[#00d4ff]/20 text-xs uppercase tracking-[0.3em] mt-1">
                            [Image Placeholder]
                          </div>
                        </div>
                      </div>

                      {/* Status badge */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050a1a]/80 backdrop-blur-sm border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[project.status] }} />
                        <span className="text-xs font-medium text-white">{project.status}</span>
                      </div>

                      {/* Sector tag */}
                      <div className="absolute top-4 left-4 px-2 py-1 rounded bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-xs font-semibold uppercase tracking-wider">
                        {project.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-cyan-400 transition-colors">
                        {project.name}
                      </h3>

                      <div className="flex items-center gap-1.5 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-sm" style={{ color: '#8899bb' }}>{project.location}</span>
                      </div>

                      <p className="text-sm leading-relaxed mb-4 flex-1 line-clamp-2" style={{ color: '#8899bb' }}>
                        {project.scope}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#8899bb' }}>
                          {project.year}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:gap-2 transition-all">
                          View Project
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white border border-white/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
