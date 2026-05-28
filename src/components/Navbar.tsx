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
  { label: 'Quality', href: '/quality-safety' },
  { label: 'Careers', href: '/careers' },
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
        // Hide on scroll-down > 120px, show on scroll-up
        if (y > 120) {
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
          'fixed top-0 left-0 right-0 z-50 h-[52px] flex items-center transition-colors duration-500',
          scrolled
            ? 'border-b border-white/5 bg-[#050a1a]/92 backdrop-blur-xl'
            : 'bg-transparent'
        )}
      >
        <div className="w-full flex items-center justify-between px-8 md:px-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[13px] font-black tracking-[0.1em] text-white hover:opacity-80 transition-opacity"
          >
            <span className="w-5 h-5 rounded border border-cyan-400/40 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 block" />
            </span>
            SAM<span className="text-cyan-400"> INDIA</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {desktopLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 group',
                  pathname.startsWith(item.href)
                    ? 'text-white'
                    : 'text-[#a8b8d0] hover:text-white'
                )}
              >
                {item.label}
                {/* Underline on active */}
                {pathname.startsWith(item.href) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-cyan-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className={cn(
                'text-[11px] font-semibold uppercase tracking-[0.12em] px-4 py-1.5 border rounded-md transition-all duration-200',
                pathname === '/contact'
                  ? 'border-cyan-400/50 text-cyan-400 bg-cyan-400/5'
                  : 'border-white/15 text-[#a8b8d0] hover:border-cyan-400/40 hover:text-cyan-400'
              )}
            >
              Contact
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white hover:text-cyan-400 transition-colors"
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
        className="fixed inset-0 z-40 bg-[#050a1a] flex flex-col lg:hidden"
      >
        {/* Blueprint grid overlay in menu */}
        <div className="absolute inset-0 blueprint-grid opacity-[0.08]" />

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
                    'flex items-center gap-3 py-3 text-3xl font-black tracking-[-0.02em] transition-colors duration-200 border-b border-white/5',
                    pathname.startsWith(item.href)
                      ? 'text-cyan-400'
                      : 'text-white hover:text-cyan-400'
                  )}
                >
                  <span className="text-[10px] font-mono text-[#8899bb] w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.label}
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
            <span className="text-[9px] uppercase tracking-[0.5em] text-[#8899bb]">
              SAM INDIA BUILTWELL · EST. 1998 · DELHI
            </span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
