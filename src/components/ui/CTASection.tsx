'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from './Container';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  tag?: string;
  title: string;
  subtitle?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  dark?: boolean;
}

export default function CTASection({ tag, title, subtitle, primaryCTA, secondaryCTA, dark = true }: CTASectionProps) {
  return (
    <section className={`relative py-24 overflow-hidden ${dark ? 'bg-[#000000]' : 'bg-[#050505]'}`}>
      <div className="absolute inset-0 blueprint-grid opacity-30" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          {tag && (
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-cyan-400" />
              <span className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em]">{tag}</span>
              <div className="h-px w-8 bg-cyan-400" />
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">{title}</h2>
          {subtitle && <p className="text-lg leading-relaxed mb-10" style={{ color: '#a8b8d0' }}>{subtitle}</p>}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={primaryCTA.href}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider text-[#000000] bg-[#00d4ff] hover:bg-white transition-all duration-300"
            >
              {primaryCTA.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider text-white border border-white/20 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300"
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
