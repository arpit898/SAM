'use client';

import { motion } from 'framer-motion';
import Container from './Container';

interface PageHeroProps {
  tag?: string;
  title: string;
  subtitle?: string;
  gradient?: string;
}

export default function PageHero({ tag, title, subtitle, gradient }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-50" />
      <div
        className="absolute inset-0"
        style={{
          background: gradient || 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,212,255,0.08) 0%, transparent 70%)',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <Container>
        <div className="max-w-4xl">
          {tag && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="h-px w-8 bg-cyan-400" />
              <span className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em]">{tag}</span>
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg leading-relaxed max-w-2xl"
              style={{ color: '#a8b8d0' }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </Container>
    </section>
  );
}
