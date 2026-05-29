'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const coarse = useRef(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Fast: crosshair
  const fastCfg = { damping: 28, stiffness: 240 };
  const fx = useSpring(mx, fastCfg);
  const fy = useSpring(my, fastCfg);

  // Slow: ring lag
  const slowCfg = { damping: 42, stiffness: 110 };
  const rx = useSpring(mx, slowCfg);
  const ry = useSpring(my, slowCfg);

  useEffect(() => {
    setMounted(true);
    coarse.current = window.matchMedia('(pointer: coarse)').matches;
  }, []);

  useEffect(() => {
    if (!mounted || coarse.current) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    const targets = document.querySelectorAll('a, button, [data-cursor="hover"]');
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    return () => {
      window.removeEventListener('mousemove', onMove);
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [mounted, mx, my, visible]);

  if (!mounted || coarse.current) return null;

  return (
    <>
      {/* Lagging outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: rx, y: ry, marginLeft: -20, marginTop: -20 }}
        animate={{ opacity: visible ? 0.55 : 0, scale: hovering ? 2.2 : 1 }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.18 } }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" overflow="visible">
          <circle cx="20" cy="20" r="19" fill="none" stroke="#FFD700" strokeWidth="0.8" />
          {/* Arms */}
          <line x1="20" y1="12" x2="20" y2="6"  stroke="#FFD700" strokeWidth="0.9" />
          <line x1="20" y1="28" x2="20" y2="34" stroke="#FFD700" strokeWidth="0.9" />
          <line x1="12" y1="20" x2="6"  y2="20" stroke="#FFD700" strokeWidth="0.9" />
          <line x1="28" y1="20" x2="34" y2="20" stroke="#FFD700" strokeWidth="0.9" />
        </svg>
      </motion.div>

      {/* Fast center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: fx,
          y: fy,
          marginLeft: -2,
          marginTop: -2,
          width: 4,
          height: 4,
          background: '#FFD700',
        }}
        animate={{ opacity: visible && !hovering ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
