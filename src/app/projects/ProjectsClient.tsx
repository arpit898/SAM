'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MapPin, ExternalLink, Search } from 'lucide-react';
import { projects } from '@/data/projects';
import Container from '@/components/ui/Container';

const filters = ['All', 'Metro', 'Underground', 'Healthcare', 'Airport', 'Power', 'Real Estate', 'Industrial', 'Institutional'];

const statusColor: Record<string, string> = {
  Completed: '#10b981',
  Ongoing: '#00d4ff',
  Upcoming: '#f0a020',
};

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) => {
    const matchFilter = activeFilter === 'All' || p.category === activeFilter;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <section className="pb-24">
      <Container>
        {/* Search + Filters */}
        <div className="mb-10 space-y-5">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8899bb]" />
            <input
              type="text"
              placeholder="Search by project name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 glass rounded-xl border border-white/10 focus:border-cyan-400/30 outline-none text-white text-sm placeholder:text-[#8899bb] bg-transparent transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
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

          <div className="text-xs text-[#8899bb]">
            Showing {filtered.length} of {projects.length} projects
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
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
                      className="h-52 relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #0a1628, #162a52, #0f2040)' }}
                    >
                      <div className="absolute inset-0 blueprint-grid-dense opacity-40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-5xl font-black text-white/5 uppercase tracking-widest">{project.category}</div>
                      </div>

                      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050a1a]/80 backdrop-blur-sm border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[project.status] }} />
                        <span className="text-xs font-medium text-white">{project.status}</span>
                      </div>

                      <div className="absolute top-4 left-4 px-2 py-1 rounded bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-xs font-semibold uppercase tracking-wider">
                        {project.category}
                      </div>

                      <div className="absolute bottom-4 right-4 text-xs font-bold text-white/40 uppercase tracking-widest">{project.year}</div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-cyan-400 transition-colors">
                        {project.name}
                      </h3>

                      <div className="flex items-center gap-1.5 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-sm text-[#8899bb]">{project.location}</span>
                      </div>

                      <p className="text-sm leading-relaxed mb-4 flex-1 text-[#8899bb] line-clamp-2">{project.scope}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-xs font-semibold text-[#8899bb]">
                          {project.client.length > 30 ? `${project.client.substring(0, 30)}…` : project.client}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-cyan-400">
                          View Details
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

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#8899bb]">
            <p className="text-lg font-semibold text-white mb-2">No projects found</p>
            <p className="text-sm">Try adjusting your filters or search term.</p>
          </div>
        )}
      </Container>
    </section>
  );
}
