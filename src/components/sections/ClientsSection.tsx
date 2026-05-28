'use client';

import { motion } from 'framer-motion';
import { clients } from '@/data/clients';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ClientsSection() {
  return (
    <section className="relative py-24 bg-[#0a1628] overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-20" />

      <Container>
        <SectionHeader
          tag="Our Clients"
          title="Trusted by India's Leading Institutions"
          subtitle="From metro rail corporations and central government agencies to power sector PSUs and industrial leaders — SAM India is the contractor of choice for mission-critical infrastructure."
          center
        />

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12">
          {clients.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-xl p-4 border border-white/5 hover:border-cyan-400/15 transition-all duration-300 flex flex-col items-center justify-center text-center gap-2"
            >
              {/* Logo placeholder */}
              <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-xs font-black text-[#8899bb] tracking-wider">{client.logoPlaceholder}</span>
              </div>
              <span className="text-[11px] text-[#8899bb] leading-tight">{client.name}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-[#8899bb] mt-8 italic"
        >
          * Client logos to be added after verification and approval.
        </motion.p>
      </Container>
    </section>
  );
}
