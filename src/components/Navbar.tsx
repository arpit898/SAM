'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navItems } from '@/data/navigation';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[rgba(5,10,26,0.95)] backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none group">
              <span className="text-lg font-black text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                SAM<span className="text-cyan-400 group-hover:text-white transition-colors"> INDIA</span>
              </span>
              <span className="text-[9px] text-[#8899bb] uppercase tracking-[0.15em] font-medium">
                Builtwell Pvt. Ltd.
              </span>
            </Link>

            {/* Desktop Nav */}
            <div ref={dropdownRef} className="hidden lg:flex items-center gap-1">
              {navItems.slice(0, 6).map((item) => (
                <div key={item.href} className="relative">
                  {item.children ? (
                    <button
                      onMouseEnter={() => setActiveDropdown(item.href)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                        pathname.startsWith(item.href)
                          ? 'text-cyan-400'
                          : 'text-[#a8b8d0] hover:text-white'
                      )}
                    >
                      {item.label}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                        pathname === item.href
                          ? 'text-cyan-400'
                          : 'text-[#a8b8d0] hover:text-white'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {item.children && activeDropdown === item.href && (
                    <div
                      onMouseEnter={() => setActiveDropdown(item.href)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full left-0 pt-2 w-56"
                    >
                      <div className="glass rounded-xl py-2 border border-cyan-400/10">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-[#a8b8d0] hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="px-5 py-2.5 text-sm font-semibold rounded-lg text-[#050a1a] bg-[#00d4ff] hover:bg-white transition-all duration-300 uppercase tracking-wider"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed inset-0 z-40 bg-[rgba(5,10,26,0.98)] backdrop-blur-xl"
          >
            <div className="flex flex-col h-full pt-20 pb-8 px-6 overflow-y-auto">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200',
                        pathname === item.href
                          ? 'text-cyan-400 bg-cyan-400/10'
                          : 'text-white hover:text-cyan-400 hover:bg-white/5'
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-1 flex flex-col gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-[#8899bb] hover:text-white transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-auto">
                <div className="h-px bg-white/10 my-6" />
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-4 text-sm font-semibold rounded-xl text-[#050a1a] bg-[#00d4ff] uppercase tracking-wider"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
