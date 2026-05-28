'use client';

import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hud?: boolean;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({ children, className, hud = false, hover = false, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-xl p-6',
        hud && 'hud-border',
        hover && 'transition-all duration-300 hover:border-cyan-400/30 hover:bg-[rgba(15,40,80,0.6)] hover:-translate-y-1',
        glow && 'glow-cyan',
        className
      )}
    >
      {children}
    </div>
  );
}
