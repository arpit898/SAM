'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Block scroll while loading
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const duration = 1800;
    const start = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(t);
      setCount(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // 200ms delay then start exit
        setTimeout(() => {
          setExiting(true);
          // Remove from DOM after exit animation (900ms)
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
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden" style={{ background: '#050a1a' }}>
      {/* Top half panel */}
      <motion.div
        className="absolute left-0 right-0 top-0 h-1/2 flex flex-col"
        style={{ background: '#050a1a' }}
        animate={{ y: exiting ? '-100%' : '0%' }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Top-left brand */}
        <div className="absolute top-8 left-8">
          <span className="text-[9px] uppercase tracking-[0.5em] text-[#8899bb] font-semibold">
            SAM INDIA BUILTWELL
          </span>
        </div>
      </motion.div>

      {/* Bottom half panel */}
      <motion.div
        className="absolute left-0 right-0 bottom-0 h-1/2 flex flex-col justify-end"
        style={{ background: '#050a1a' }}
        animate={{ y: exiting ? '100%' : '0%' }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Bottom center text */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <span className="text-[9px] uppercase tracking-[0.5em] text-[#8899bb] font-semibold">
            ENGINEERING INDIA&apos;S INFRASTRUCTURE
          </span>
        </div>
      </motion.div>

      {/* Center content — counter + progress */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <span
          className="font-black text-white tabular-nums tracking-[-0.04em] leading-none select-none"
          style={{ fontSize: 'clamp(80px, 12vw, 160px)' }}
        >
          {count}
        </span>

        {/* Progress bar */}
        <div className="w-64 h-px bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-cyan-400"
            style={{ width: `${count}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
}
