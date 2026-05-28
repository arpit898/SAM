'use client';

import { useState, useEffect } from 'react';
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-[52px] flex items-center',
          scrolled
            ? 'border-b border-white/5 bg-[#050a1a]/90 backdrop-blur-xl'
            : 'bg-transparent'
        )}
      >
        <div className="w-full flex items-center justify-between px-8 md:px-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-[13px] font-black tracking-[0.1em] text-white hover:opacity-80 transition-opacity"
          >
            SAM<span className="text-cyan-400"> INDIA</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {desktopLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200',
                  pathname.startsWith(item.href)
                    ? 'text-white'
                    : 'text-[#a8b8d0] hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={cn(
                'text-[11px] font-semibold uppercase tracking-[0.12em] px-4 py-1.5 border rounded-md transition-colors duration-200',
                pathname === '/contact'
                  ? 'border-cyan-400/40 text-cyan-400'
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
      </nav>

      {/* Mobile full-screen overlay */}
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: mobileOpen ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-40 bg-[#050a1a] flex flex-col lg:hidden"
      >
        <div className="flex flex-col justify-center h-full px-10 pb-16">
          <nav className="flex flex-col gap-2">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : -24 }}
                transition={{ delay: mobileOpen ? 0.1 + i * 0.05 : 0, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'text-3xl font-black tracking-[-0.02em] transition-colors duration-200',
                    pathname.startsWith(item.href)
                      ? 'text-cyan-400'
                      : 'text-white hover:text-cyan-400'
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mobileOpen ? 1 : 0 }}
            transition={{ delay: mobileOpen ? 0.5 : 0, duration: 0.3 }}
            className="mt-12"
          >
            <div className="h-px bg-white/10 mb-6" />
            <span className="text-[9px] uppercase tracking-[0.5em] text-[#8899bb]">
              SAM INDIA BUILTWELL · EST. 1998
            </span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
