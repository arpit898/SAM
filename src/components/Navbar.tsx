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
          'fixed top-0 left-0 right-0 z-50 h-14 flex items-center transition-all duration-500',
          scrolled
            ? 'border-b border-[rgba(255,215,0,0.08)] bg-black/85 backdrop-blur-xl'
            : 'bg-transparent'
        )}
      >
        {/* Gold accent line at top */}
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute top-0 left-0 right-0 h-px origin-left"
            style={{ background: 'linear-gradient(90deg, transparent, #FFD700, #FF4D00, transparent)' }}
          />
        )}

        <div className="w-full flex items-center justify-between px-8 md:px-16">
          {/* Logo with HUD brackets */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -top-1 -left-2 w-3 h-3 border-t border-l border-[#FFD700]/50 group-hover:border-[#FFD700] transition-colors duration-300" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#FFD700]/30 group-hover:border-[#FFD700]/60 transition-colors duration-300" />
              <span className="text-[12px] font-black tracking-[0.25em] text-white group-hover:text-[#FFD700] transition-colors duration-300 uppercase">
                SAM INDIA
              </span>
            </div>
            <div className="hidden md:block h-3 w-px bg-white/15" />
            <span className="hidden md:block text-[8px] text-white/30 tracking-[0.3em] uppercase font-mono">
              BUILTWELL
            </span>
          </Link>

          {/* Live status indicator */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] pulse" />
            <span className="text-[7px] tracking-[0.3em] text-white/25 uppercase font-mono">ACTIVE PROJECTS: 3</span>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {desktopLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-[9px] uppercase tracking-[0.15em] transition-colors duration-200 font-mono py-1',
                  pathname.startsWith(item.href)
                    ? 'text-[#FFD700]'
                    : 'text-white/40 hover:text-white'
                )}
              >
                {item.label}
                {pathname.startsWith(item.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#FFD700]"
                    style={{ boxShadow: '0 0 6px #FFD700' }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Contact CTA */}
          <Link
            href="/contact"
            className="hidden lg:flex items-center gap-2 px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.2em] border border-[#FFD700]/25 text-[#FFD700]/70 hover:border-[#FFD700] hover:text-[#FFD700] transition-all duration-200 font-mono"
          >
            <span className="w-1 h-1 rounded-full bg-[#FF4D00]" />
            Get In Touch
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white hover:text-[#FFD700] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: mobileOpen ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-40 bg-black flex flex-col lg:hidden"
      >
        <div className="wire-grid absolute inset-0 opacity-20" />
        <div className="relative z-10 flex flex-col justify-center h-full px-10 pb-16">
          <nav className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : -24 }}
                transition={{
                  delay: mobileOpen ? 0.08 + i * 0.05 : 0,
                  duration: 0.4,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-4 py-4 border-b border-white/5 transition-colors duration-200 group',
                    pathname.startsWith(item.href)
                      ? 'text-[#FFD700]'
                      : 'text-white hover:text-[#FFD700]'
                  )}
                >
                  <span className="text-[8px] font-mono text-[#FFD700]/30 w-6 group-hover:text-[#FFD700]/60">
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
            className="mt-10 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] pulse" />
              <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-mono">SYSTEM ACTIVE</span>
            </div>
            <span className="text-[8px] uppercase tracking-[0.3em] text-white/20 font-mono">
              SAM INDIA BUILTWELL · EST. 1998 · DELHI
            </span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
