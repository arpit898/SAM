'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import type { LucideProps } from 'lucide-react';
import { Train, Layers, Building2, Heart, Factory, Zap, Home, MapPin, ArrowRight } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { sectors } from '@/data/sectors';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import TiltCard from '@/components/ui/TiltCard';

type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;

const iconMap: Record<string, LucideIcon> = {
  Train, Layers, Building2, Heart, Factory, Zap, Home, MapPin,
};

export default function SectorsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  return (
    <section ref={ref} className="relative py-24 bg-[#050a1a] overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 blueprint-grid opacity-30" />

      {/* Ambient radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(30,111,255,0.05), transparent 70%)' }}
      />

      <Container>
        <SectionHeader
          tag="Our Sectors"
          title="Multi-Sector Infrastructure Capability"
          subtitle="From metro tunnels to power plants — SAM India delivers complex infrastructure across India's most critical sectors with engineering depth and execution strength."
          className="max-w-2xl"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {sectors.map((sector, i) => {
            const Icon = iconMap[sector.icon] || Building2;
            return (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <Link href={`/sectors#${sector.id}`}>
                  <TiltCard
                    className="group relative h-full glass rounded-2xl p-6 border border-white/5 hover:border-white/12 transition-all duration-400 cursor-pointer overflow-hidden"
                    intensity={7}
                  >
                    {/* Background glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{ background: `radial-gradient(ellipse at top left, ${sector.color}10, transparent 65%)` }}
                    />

                    {/* Top edge glow line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${sector.color}70, transparent)` }}
                    />

                    {/* Corner accent */}
                    <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute bottom-2 right-2 w-4 h-px" style={{ background: sector.color }} />
                      <div className="absolute bottom-2 right-2 h-4 w-px" style={{ background: sector.color }} />
                    </div>

                    <div className="relative">
                      {/* Icon container */}
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                        style={{
                          background: `${sector.color}15`,
                          border: `1px solid ${sector.color}35`,
                          boxShadow: `0 0 20px ${sector.color}10`,
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: sector.color }} />
                      </motion.div>

                      {/* Category number */}
                      <div
                        className="absolute top-0 right-0 text-[40px] font-black opacity-[0.04] leading-none pointer-events-none select-none"
                        style={{ color: sector.color }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>

                      <h3 className="text-white font-bold text-base mb-2 leading-snug group-hover:text-white transition-colors">
                        {sector.shortTitle}
                      </h3>

                      <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: '#8899bb' }}>
                        {sector.description}
                      </p>

                      <div
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 group-hover:gap-2.5"
                        style={{ color: sector.color }}
                      >
                        Learn More
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/sectors"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white border border-white/10 hover:border-cyan-400/30 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all duration-300"
          >
            Explore All Sectors
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
