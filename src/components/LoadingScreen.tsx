'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  'INITIALIZING SAM INFRASTRUCTURE PLATFORM v4.2...',
  'LOADING CONSTRUCTION MANAGEMENT SYSTEMS...',
  'CONNECTING TO PROJECT DATABASE [27 YRS DATA]...',
  'CALIBRATING INFRASTRUCTURE SENSORS...',
  'LOADING 3D ENVIRONMENT RENDERER...',
  'SYSTEM READY.',
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const lineIndex = useRef(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Stagger boot lines
  useEffect(() => {
    const addLine = () => {
      if (lineIndex.current < BOOT_LINES.length) {
        setBootLines(prev => [...prev, BOOT_LINES[lineIndex.current] ?? '']);
        lineIndex.current++;
        setTimeout(addLine, 200 + Math.random() * 150);
      }
    };
    setTimeout(addLine, 300);
  }, []);

  // Progress counter
  useEffect(() => {
    const duration = 2200;
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
          }, 1000);
        }, 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] overflow-hidden"
        style={{ background: '#000', fontFamily: 'var(--font-geist-mono, monospace)' }}
      >
        {/* Wire grid background */}
        <div className="absolute inset-0 wire-grid opacity-30" />

        {/* Scan line */}
        <div className="scan-line opacity-20" />

        {/* Top bar */}
        <motion.div
          className="absolute left-0 right-0 top-0 h-1/2 overflow-hidden"
          style={{ background: '#000' }}
          animate={{ y: exiting ? '-100%' : '0%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* HUD corners */}
          <div className="absolute top-5 left-5 w-6 h-6 border-t border-l border-[#FFD700]/60" />
          <div className="absolute top-5 right-5 w-6 h-6 border-t border-r border-[#FFD700]/60" />

          {/* Top header */}
          <div className="absolute top-6 left-10 right-10 flex items-center justify-between">
            <span className="text-[9px] tracking-[0.5em] text-[#FFD700] uppercase">
              SAM INDIA BUILTWELL PVT. LTD.
            </span>
            <span className="text-[9px] tracking-[0.3em] text-white/30 uppercase">
              EST. 1998 · DELHI
            </span>
          </div>

          {/* Boot lines - top half */}
          <div className="absolute bottom-8 left-10 right-10 flex flex-col gap-1">
            {bootLines.slice(0, 3).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <span className="text-[#FFD700]/60 text-[8px]">▶</span>
                <span className="text-[8px] tracking-[0.15em] text-white/40 uppercase">{line}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="absolute left-0 right-0 bottom-0 h-1/2 overflow-hidden"
          style={{ background: '#000' }}
          animate={{ y: exiting ? '100%' : '0%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* HUD corners */}
          <div className="absolute bottom-5 left-5 w-6 h-6 border-b border-l border-[#FFD700]/60" />
          <div className="absolute bottom-5 right-5 w-6 h-6 border-b border-r border-[#FFD700]/60" />

          {/* Boot lines - bottom half */}
          <div className="absolute top-8 left-10 right-10 flex flex-col gap-1">
            {bootLines.slice(3).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <span className="text-[#FFD700]/60 text-[8px]">▶</span>
                <span className="text-[8px] tracking-[0.15em] text-white/40 uppercase">{line}</span>
              </motion.div>
            ))}
          </div>

          {/* Bottom: progress info */}
          <div className="absolute bottom-6 left-10 right-10 flex items-center justify-between">
            <span className="text-[8px] tracking-[0.3em] text-white/20 uppercase">
              LOADING INFRASTRUCTURE ENGINE
            </span>
            <span className="text-[8px] tracking-[0.2em] text-[#FF4D00]/60">◉ LIVE</span>
          </div>
        </motion.div>

        {/* Center content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-8 pointer-events-none"
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Circular ring decorations */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-40 h-40 rounded-full border border-[#FFD700]/8 spin-slow" />
            <div className="absolute w-56 h-56 rounded-full border border-[#FFD700]/4 spin-reverse" />

            {/* Counter */}
            <motion.span
              className="font-black text-white tabular-nums leading-none select-none"
              style={{
                fontSize: 'clamp(80px, 14vw, 160px)',
                letterSpacing: '-0.04em',
                fontFamily: 'var(--font-geist-sans, system-ui)',
              }}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {String(count).padStart(3, '0')}
            </motion.span>
          </div>

          {/* Progress bar */}
          <div className="w-64 flex flex-col gap-2">
            <div className="w-full h-px bg-white/8 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{
                  background: 'linear-gradient(90deg, #FFD700, #FF4D00)',
                  boxShadow: '0 0 10px rgba(255,215,0,0.4)',
                }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.05 }}
              />
              {/* Glow dot */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FFD700]"
                style={{ boxShadow: '0 0 8px #FFD700' }}
                animate={{ left: `calc(${count}% - 4px)` }}
                transition={{ duration: 0.05 }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-[8px] tracking-[0.3em] text-white/20 uppercase">INITIALIZING</span>
              <span className="text-[8px] tracking-[0.2em] text-[#FFD700]/50">{count}%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
