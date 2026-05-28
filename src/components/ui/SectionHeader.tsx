'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export default function SectionHeader({ tag, title, subtitle, center = false, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', center && 'text-center', className)}>
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <div className="h-px w-8 bg-cyan-400" />
          <span className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em]">{tag}</span>
          <div className="h-px w-8 bg-cyan-400" />
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-steel-300 text-lg max-w-2xl leading-relaxed"
          style={{ color: '#a8b8d0' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
