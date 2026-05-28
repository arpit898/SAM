'use client';

import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function SplitText({ text, className = '', delay = 0, stagger = 0.03 }: SplitTextProps) {
  const words = text.split(' ');

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: delay + wi * stagger,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
