'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  label: string;
  sublabel?: string;
  className?: string;
  delay?: number;
}

export default function AnimatedCounter({ value, suffix = '', label, sublabel, className, delay = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');
  const isNumeric = /^\d+$/.test(value);

  useEffect(() => {
    if (!isInView) return;
    if (!isNumeric) {
      const timer = setTimeout(() => setDisplayValue(value), delay * 1000);
      return () => clearTimeout(timer);
    }

    const targetNum = parseInt(value, 10);
    const duration = 1800;
    const startTime = performance.now() + delay * 1000;
    let animFrame: number;

    const animate = (currentTime: number) => {
      if (currentTime < startTime) {
        animFrame = requestAnimationFrame(animate);
        return;
      }
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * targetNum);
      setDisplayValue(current.toString());
      if (progress < 1) animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, value, isNumeric, delay]);

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className="text-4xl sm:text-5xl font-bold gradient-text-cyan tabular-nums">
        {displayValue}{suffix}
      </div>
      <div className="mt-2 text-white font-semibold text-sm uppercase tracking-wider">{label}</div>
      {sublabel && <div className="mt-1 text-xs" style={{ color: '#8899bb' }}>{sublabel}</div>}
    </div>
  );
}
