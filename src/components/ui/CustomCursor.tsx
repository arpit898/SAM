'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
      if (!isVisible) setIsVisible(true);
    };

    const handleHoverIn = () => setIsHovering(true);
    const handleHoverOut = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);

    const interactables = document.querySelectorAll('a, button, [data-cursor="hover"]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverIn);
        el.removeEventListener('mouseleave', handleHoverOut);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{ scale: isHovering ? 0 : 1, opacity: isVisible ? 1 : 0 }}
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-cyan-400 pointer-events-none z-[9999] mix-blend-difference"
      />
      {/* Ring */}
      <motion.div
        style={{
          x: useSpring(cursorX, { damping: 35, stiffness: 120 }),
          y: useSpring(cursorY, { damping: 35, stiffness: 120 }),
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? 0.4 : 0,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-4 h-4 rounded-full border border-cyan-400 pointer-events-none z-[9998]"
      />
    </>
  );
}
