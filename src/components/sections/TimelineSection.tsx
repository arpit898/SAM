'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/data/timeline';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

export default function TimelineSection() {
  return (
    <section className="relative py-24 bg-[#050a1a] overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-25" />

      <Container>
        <SectionHeader
          tag="Our Journey"
          title="25+ Years of Building India"
          subtitle="From a focused civil construction company to a multi-sector infrastructure enterprise — the SAM India story of growth, execution, and national contribution."
          center
          className="text-center"
        />

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto mt-16">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />

          <div className="flex flex-col gap-8">
            {timeline.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-8 pl-4"
              >
                {/* Dot */}
                <div className="relative flex-shrink-0 flex items-start">
                  <div className="relative z-10 mt-1">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        event.milestone
                          ? 'border-cyan-400 bg-cyan-400/20 shadow-[0_0_12px_rgba(0,212,255,0.4)]'
                          : 'border-white/20 bg-white/5'
                      }`}
                    >
                      {event.milestone && (
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`glass rounded-2xl p-6 flex-1 border transition-all duration-300 ${
                  event.milestone ? 'border-cyan-400/15' : 'border-white/5'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-black text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20 uppercase tracking-wider">
                      {event.year}
                    </span>
                    {event.milestone && (
                      <span className="text-[9px] font-bold text-[#f0a020] uppercase tracking-[0.2em] border border-[#f0a020]/20 px-2 py-0.5 rounded bg-[#f0a020]/5">
                        MILESTONE
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{event.title}</h3>
                  <p className="text-sm text-[#8899bb] leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
