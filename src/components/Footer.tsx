'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone, Mail, ExternalLink, Globe, ArrowRight } from 'lucide-react';
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
    <footer className="relative bg-[#050a1a] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-20" />

      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)' }} />

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
                <Link href="/" className="inline-flex flex-col leading-none group mb-6">
                  <span className="text-2xl font-black text-white tracking-tight">
                    SAM<span className="text-cyan-400"> INDIA</span>
                  </span>
                  <span className="text-[10px] text-[#8899bb] uppercase tracking-[0.15em] font-medium mt-1">
                    Builtwell Pvt. Ltd.
                  </span>
                </Link>

                <p className="text-[#8899bb] text-sm leading-relaxed mb-6 max-w-xs">
                  Engineering India&apos;s next generation of infrastructure. Founded 1998, delivering metro, institutional, industrial, power, and civil projects with precision.
                </p>

                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-[#8899bb] text-sm">
                      435 Jagriti Enclave, Vikas Marg Extn.<br />Delhi – 110092, India
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <a href="tel:+911149981307" className="text-[#8899bb] text-sm hover:text-cyan-400 transition-colors">
                      +91 11 4998 1307
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <a href="mailto:info@samindia.com" className="text-[#8899bb] text-sm hover:text-cyan-400 transition-colors">
                      info@samindia.com
                    </a>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 mt-8 text-sm font-bold text-cyan-400 uppercase tracking-wider hover:gap-3 transition-all duration-200"
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
                <h4 className="text-white text-sm font-semibold uppercase tracking-[0.15em] mb-5">{heading}</h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[#8899bb] text-sm hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1 group"
                      >
                        <span className="h-px w-0 group-hover:w-3 bg-cyan-400 transition-all duration-200 shrink-0" />
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
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8899bb] text-xs">
            &copy; {new Date().getFullYear()} SAM India Builtwell Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="https://samindia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8899bb] hover:text-cyan-400 transition-colors"
              aria-label="Website"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="https://samindia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8899bb] hover:text-cyan-400 transition-colors"
              aria-label="External Link"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <span className="text-[#8899bb] text-xs opacity-60">CIN: U70101DL1998PTC091859</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
