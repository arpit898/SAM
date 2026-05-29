'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import Container from './ui/Container';

const footerLinks = {
  Company: [
    { label: 'About SAM India', href: '/about' },
    { label: 'Our Sectors', href: '/sectors' },
    { label: 'Projects', href: '/projects' },
    { label: 'Technology', href: '/technology' },
    { label: 'Careers', href: '/careers' },
  ],
  Sectors: [
    { label: 'Metro & Transportation', href: '/sectors#metro-transport' },
    { label: 'Underground Metro', href: '/sectors#underground-metro' },
    { label: 'Healthcare Infrastructure', href: '/sectors#healthcare' },
    { label: 'Power & Energy', href: '/sectors#power-energy' },
    { label: 'Industrial Civil Works', href: '/sectors#industrial' },
  ],
  Resources: [
    { label: 'Quality & Safety', href: '/quality-safety' },
    { label: 'Plant & Machinery', href: '/plant-machinery' },
    { label: 'Clients', href: '/clients' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <Container className="relative">
        <div className="pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link href="/" className="inline-flex flex-col leading-none mb-6">
                  <span className="text-2xl font-black text-white tracking-[0.08em]">
                    SAM INDIA
                  </span>
                  <span
                    className="uppercase text-white/30 mt-1"
                    style={{ fontSize: '10px', letterSpacing: '0.15em', fontFamily: 'var(--font-geist-mono, monospace)' }}
                  >
                    Builtwell Pvt. Ltd.
                  </span>
                </Link>

                <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
                  Building India&apos;s infrastructure since 1998. Metro, institutional, industrial, power, and civil projects.
                </p>

                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#FFD700' }} />
                    <span className="text-white/40 text-sm">
                      435 Jagriti Enclave, Vikas Marg Extn.<br />Delhi – 110092, India
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 shrink-0" style={{ color: '#FFD700' }} />
                    <a href="tel:+911149981307" className="text-white/40 text-sm hover:text-white transition-colors">
                      +91 11 4998 1307
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 shrink-0" style={{ color: '#FFD700' }} />
                    <a href="mailto:info@samindia.com" className="text-white/40 text-sm hover:text-white transition-colors">
                      info@samindia.com
                    </a>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 mt-8 text-sm font-bold uppercase tracking-wider hover:gap-3 transition-all duration-200"
                  style={{ color: '#FFD700', letterSpacing: '0.15em' }}
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([heading, links], colIdx) => (
              <motion.div
                key={heading}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: colIdx * 0.08 }}
              >
                <h4
                  className="text-white text-sm font-black uppercase mb-5"
                  style={{ letterSpacing: '0.15em' }}
                >
                  {heading}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/40 text-sm hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                      >
                        <span
                          className="h-px w-0 group-hover:w-3 transition-all duration-200 shrink-0"
                          style={{ background: '#FFD700' }}
                        />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <p className="text-white/25 text-xs" style={{ fontFamily: 'var(--font-geist-mono, monospace)' }}>
            &copy; {new Date().getFullYear()} SAM India Builtwell Pvt. Ltd. All rights reserved.
          </p>
          <span className="text-white/20 text-xs" style={{ fontFamily: 'var(--font-geist-mono, monospace)' }}>
            CIN: U70101DL1998PTC091859
          </span>
        </div>
      </Container>
    </footer>
  );
}
