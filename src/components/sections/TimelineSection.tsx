'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timeline } from '@/data/timeline';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.9], ['0%', '100%']);

  return (
    <section ref={ref} className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-20" />

      <Container>
        <SectionHeader
          tag="Our Journey"
          title="25+ Years of Building India"
          subtitle="From a Delhi civil contractor in 1998 to executing ₹1,400+ Crore of metro infrastructure — the SAM India story."
          center
          className="text-center"
        />

        <div className="relative max-w-3xl mx-auto mt-16">
          {/* Animated vertical line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-white/5">
            <motion.div
              style={{ height: lineHeight, background: 'linear-gradient(to bottom, #00d4ff, #1e6fff)' }}
              className="w-full origin-top"
            />
          </div>

          <div className="flex flex-col gap-6">
            {timeline.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="flex gap-6"
              >
                {/* Dot */}
                <div className="relative flex-shrink-0 flex items-start pt-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 + 0.2, type: 'spring' }}
                    className={`relative z-10 w-[14px] h-[14px] rounded-full border-2 flex items-center justify-center ${
                      event.milestone
                        ? 'border-cyan-400 bg-cyan-400/20 shadow-[0_0_15px_rgba(0,212,255,0.5)]'
                        : 'border-white/15 bg-white/5'
                    }`}
                  >
                    {event.milestone && (
                      <div className="w-[5px] h-[5px] rounded-full bg-cyan-400" />
                    )}
                  </motion.div>
                </div>

                {/* Card */}
                <div className={`flex-1 rounded-2xl p-5 border transition-all duration-300 hover:border-cyan-400/15 ${
                  event.milestone
                    ? 'glass border-cyan-400/10'
                    : 'bg-white/[0.02] border-white/5'
                }`}>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[11px] font-black text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-full border border-cyan-400/20 uppercase tracking-wider">
                      {event.year}
                    </span>
                    {event.metric && (
                      <span className="text-[10px] font-bold text-[#f0a020] bg-[#f0a020]/10 px-2.5 py-1 rounded-full border border-[#f0a020]/20">
                        {event.metric}
                      </span>
                    )}
                    {event.milestone && (
                      <span className="text-[9px] font-bold text-[#10b981] uppercase tracking-[0.2em] border border-[#10b981]/20 px-2 py-0.5 rounded bg-[#10b981]/5">
                        Milestone
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1.5">{event.title}</h3>
                  <p className="text-[13px] text-[#8899bb] leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
