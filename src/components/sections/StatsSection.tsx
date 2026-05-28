'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, TrendingUp, Users, LayoutGrid, Train, Building2, Layers, MapPin } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Container from '@/components/ui/Container';
import TiltCard from '@/components/ui/TiltCard';

const primaryStats = [
  { value: '1998', label: 'Year Founded', sublabel: 'Incorporated Jan 22, 1998', icon: Calendar, color: '#00d4ff', accent: true },
  { value: '1230', suffix: 'Cr+', label: 'Revenue FY2025', sublabel: '₹1,230 Crore turnover', icon: TrendingUp, color: '#f0a020', accent: true },
  { value: '1400', suffix: '+', label: 'Workforce', sublabel: 'Direct employees', icon: Users, color: '#10b981', accent: true },
  { value: '8', suffix: '+', label: 'Sectors', sublabel: 'Multi-domain infrastructure', icon: LayoutGrid, color: '#1e6fff', accent: true },
];

const contractStats = [
  { value: '222', suffix: '.76 Cr', label: 'DMRC Phase V', sublabel: 'Delhi Metro Station 2026', icon: Train, color: '#00d4ff' },
  { value: '547', suffix: '.45 Cr', label: 'Mumbai Metro L-6', sublabel: 'MMRDA Kanjurmarg Depot', icon: Building2, color: '#1e6fff' },
  { value: '665', suffix: '.99 Cr', label: 'Chennai Metro', sublabel: 'CMRL Corridor 3 UG05', icon: Layers, color: '#10b981' },
  { value: '10', suffix: '+', label: 'Metro Corps', sublabel: 'DMRC, MMRDA, CMRL, LMRC+', icon: MapPin, color: '#f0a020' },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section ref={ref} className="relative py-24 bg-[#0a1628] overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 blueprint-grid-dense opacity-30" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.04), transparent 70%)' }} />

      {/* Horizontal glowing line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)', top: '50%' }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />

      <Container>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <motion.div
            animate={{ width: ['0px', '60px'] }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent to-cyan-400/50"
          />
          <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.35em]">Company Performance</span>
          <motion.div
            animate={{ width: ['0px', '60px'] }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-px bg-gradient-to-l from-transparent to-cyan-400/50"
          />
        </motion.div>

        {/* Primary stats — large cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {primaryStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <TiltCard
                  className="glass rounded-2xl p-6 border border-white/5 h-full"
                  intensity={6}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <div className="w-2 h-2 rounded-full pulse-glow" style={{ background: stat.color }} />
                  </div>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    sublabel={stat.sublabel}
                    delay={i * 0.12}
                    className="text-left"
                  />
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Divider with label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 my-8"
        >
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[10px] font-black text-[#8899bb] uppercase tracking-[0.3em]">Active Contract Portfolio</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        {/* Contract stats — smaller row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {contractStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="glass rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: stat.color }} />
                  </div>
                  <span className="text-[11px] text-[#8899bb] uppercase tracking-wider font-semibold">{stat.label}</span>
                </div>
                <div className="text-2xl font-black" style={{ color: stat.color }}>
                  ₹<AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    label=""
                    delay={0.4 + i * 0.1}
                    className="inline"
                  />
                </div>
                <div className="text-[11px] text-[#8899bb] mt-1">{stat.sublabel}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CIN strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#8899bb]"
        >
          <span>CIN: U70101DL1998PTC091859</span>
          <span className="w-px h-3 bg-white/10" />
          <span>435 Jagriti Enclave, Vikas Marg Extn., Delhi – 110092</span>
          <span className="w-px h-3 bg-white/10" />
          <span>+91 11 4998 1307</span>
          <span className="w-px h-3 bg-white/10" />
          <a href="mailto:info@samindia.com" className="text-cyan-400/70 hover:text-cyan-400 transition-colors">info@samindia.com</a>
        </motion.div>
      </Container>
    </section>
  );
}
