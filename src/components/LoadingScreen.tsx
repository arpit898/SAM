'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const duration = 1800;
    const start = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOutCubic(t) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            document.body.style.overflow = '';
            setVisible(false);
          }, 900);
        }, 200);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden" style={{ background: '#000' }}>
      {/* Top half */}
      <motion.div
        className="absolute left-0 right-0 top-0 h-1/2"
        style={{ background: '#000' }}
        animate={{ y: exiting ? '-100%' : '0%' }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute top-8 left-8">
          <span
            className="text-white uppercase font-black"
            style={{ fontSize: '11px', letterSpacing: '0.5em', fontFamily: 'var(--font-geist-mono, monospace)' }}
          >
            SAM INDIA
          </span>
        </div>
      </motion.div>

      {/* Bottom half */}
      <motion.div
        className="absolute left-0 right-0 bottom-0 h-1/2"
        style={{ background: '#000' }}
        animate={{ y: exiting ? '100%' : '0%' }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <span
            className="uppercase text-white/30"
            style={{ fontSize: '9px', letterSpacing: '0.5em', fontFamily: 'var(--font-geist-mono, monospace)' }}
          >
            BUILDING INDIA&apos;S INFRASTRUCTURE
          </span>
        </div>
      </motion.div>

      {/* Center: counter + progress */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <span
          className="font-black text-white tabular-nums leading-none select-none"
          style={{ fontSize: 'clamp(100px, 18vw, 200px)', letterSpacing: '-0.04em' }}
        >
          {String(count).padStart(3, '0')}
        </span>

        {/* Gold progress bar */}
        <div className="w-48 h-px bg-white/10 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 transition-none"
            style={{ width: `${count}%`, background: '#FFD700' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
