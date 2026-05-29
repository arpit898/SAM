'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '@/data/navigation';
import { cn } from '@/lib/utils';

const desktopLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        if (y > 200) {
          setHidden(y > lastScrollY.current && y > 300);
        } else {
          setHidden(false);
        }
        lastScrollY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        animate={{ y: hidden && !mobileOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-12 flex items-center transition-colors duration-500',
          scrolled ? 'border-b border-white/5 bg-black/92 backdrop-blur-xl' : 'bg-transparent'
        )}
      >
        <div className="w-full flex items-center justify-between px-8 md:px-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-[13px] font-black tracking-[0.15em] text-white hover:opacity-80 transition-opacity"
          >
            SAM INDIA
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {desktopLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-[10px] uppercase tracking-[0.12em] transition-colors duration-200 font-mono',
                  pathname.startsWith(item.href)
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white hover:text-[#FFD700] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: mobileOpen ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-40 bg-[#000000] flex flex-col lg:hidden"
      >
        <div className="relative z-10 flex flex-col justify-center h-full px-10 pb-16">
          <nav className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : -24 }}
                transition={{ delay: mobileOpen ? 0.1 + i * 0.05 : 0, duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 py-4 border-b border-white/5 transition-colors duration-200',
                    pathname.startsWith(item.href)
                      ? 'text-[#FFD700]'
                      : 'text-white hover:text-[#FFD700]'
                  )}
                >
                  <span className="text-[10px] font-mono text-white/30 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-3xl font-black tracking-[-0.02em]">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mobileOpen ? 1 : 0 }}
            transition={{ delay: mobileOpen ? 0.5 : 0, duration: 0.3 }}
            className="mt-10"
          >
            <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-mono">
              SAM INDIA BUILTWELL · EST. 1998 · DELHI
            </span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
