'use client';

import { motion } from 'framer-motion';
import { Calendar, Award, LayoutGrid, Building2, Users, MapPin, Truck, Shield } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Container from '@/components/ui/Container';

const stats = [
  { value: '1998', label: 'Year Founded', sublabel: 'Infrastructure since inception', icon: Calendar, color: '#00d4ff' },
  { value: '25', suffix: '+', label: 'Years of Execution', sublabel: 'Proven delivery track record', icon: Award, color: '#1e6fff' },
  { value: '8', suffix: '+', label: 'Business Sectors', sublabel: 'Multi-domain capability', icon: LayoutGrid, color: '#00d4ff' },
  { value: '100', suffix: '+', label: 'Projects Executed', sublabel: '[Confirm exact count]', icon: Building2, color: '#1e6fff' },
  { value: '500', suffix: '+', label: 'Skilled Workforce', sublabel: '[Confirm headcount]', icon: Users, color: '#00d4ff' },
  { value: '15', suffix: '+', label: 'States Covered', sublabel: 'Pan-India presence', icon: MapPin, color: '#1e6fff' },
  { value: '50', suffix: '+', label: 'Equipment Fleet', sublabel: '[Confirm count]', icon: Truck, color: '#00d4ff' },
  { value: '0', suffix: '', label: 'Zero Compromise', sublabel: 'On quality & safety', icon: Shield, color: '#f0a020' },
];

export default function StatsSection() {
  return (
    <section className="relative py-24 bg-[#0a1628] overflow-hidden">
      <div className="absolute inset-0 blueprint-grid-dense opacity-40" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)' }} />

      <Container>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-cyan-400/40" />
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em]">Performance Indicators</span>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-cyan-400/40" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="relative p-8 group"
              >
                {/* Grid lines */}
                <div className="absolute inset-0 border-r border-b border-white/5" />

                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>

                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    sublabel={stat.sublabel}
                    delay={i * 0.07}
                    className="text-left"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
