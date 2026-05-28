'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { LucideProps } from 'lucide-react';
import { Train, Layers, Building2, Heart, Factory, Zap, Home, MapPin, ArrowRight } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { sectors } from '@/data/sectors';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;

const iconMap: Record<string, LucideIcon> = {
  Train, Layers, Building2, Heart, Factory, Zap, Home, MapPin,
};

export default function SectorsSection() {
  return (
    <section className="relative py-24 bg-[#050a1a] overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-30" />

      <Container>
        <SectionHeader
          tag="Our Sectors"
          title="Multi-Sector Infrastructure Capability"
          subtitle="From metro tunnels to power plants — SAM India delivers complex infrastructure across India's most critical sectors with engineering depth and execution strength."
          className="max-w-2xl"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sectors.map((sector, i) => {
            const Icon = iconMap[sector.icon] || Building2;
            return (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link href={`/sectors#${sector.id}`}>
                  <div className="group relative h-full glass rounded-2xl p-6 border border-white/5 hover:border-opacity-30 transition-all duration-400 cursor-pointer overflow-hidden"
                    style={{ '--hover-color': sector.color } as React.CSSProperties}
                  >
                    {/* Background glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                      style={{ background: `radial-gradient(ellipse at top left, ${sector.color}08, transparent 70%)` }}
                    />

                    {/* Top border glow */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${sector.color}60, transparent)` }}
                    />

                    <div className="relative">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${sector.color}15`,
                          border: `1px solid ${sector.color}30`,
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: sector.color }} />
                      </div>

                      {/* Title */}
                      <h3 className="text-white font-bold text-base mb-2 leading-snug group-hover:text-white transition-colors">
                        {sector.shortTitle}
                      </h3>

                      {/* Description */}
                      <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: '#8899bb' }}>
                        {sector.description}
                      </p>

                      {/* Arrow CTA */}
                      <div
                        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
                        style={{ color: sector.color }}
                      >
                        Learn More
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/sectors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-cyan-400 border border-cyan-400/20 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all duration-300 uppercase tracking-wider"
          >
            Explore All Sectors
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
