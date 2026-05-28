'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, ExternalLink, Globe } from 'lucide-react';
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

      <Container className="relative">
        <div className="pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex flex-col leading-none group mb-6">
                <span className="text-2xl font-black text-white tracking-tight">
                  SAM<span className="text-cyan-400"> INDIA</span>
                </span>
                <span className="text-[10px] text-[#8899bb] uppercase tracking-[0.15em] font-medium mt-1">
                  Builtwell Pvt. Ltd.
                </span>
              </Link>
              <p className="text-[#8899bb] text-sm leading-relaxed mb-6 max-w-xs">
                Engineering India&apos;s next generation of infrastructure. Founded in 1998, delivering complex metro, institutional, industrial, power, and civil infrastructure with discipline and precision.
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span className="text-[#8899bb] text-sm">[Registered Office Address — Placeholder]<br />New Delhi, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-[#8899bb] text-sm">[Phone Number Placeholder]</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-[#8899bb] text-sm">[Email Placeholder]</span>
                </div>
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-white text-sm font-semibold uppercase tracking-[0.15em] mb-5">{heading}</h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[#8899bb] text-sm hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1 group"
                      >
                        <span className="h-px w-0 group-hover:w-3 bg-cyan-400 transition-all duration-200" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8899bb] text-xs">
            &copy; {new Date().getFullYear()} SAM India Builtwell Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-[#8899bb] hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-[#8899bb] hover:text-cyan-400 transition-colors"
              aria-label="Website"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <span className="text-[#8899bb] text-xs">CIN: [PLACEHOLDER]</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
