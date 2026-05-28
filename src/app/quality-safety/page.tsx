import type { Metadata } from 'next';
import { Shield, FileCheck, Eye, BookOpen, Wrench, TrendingUp, AlertTriangle, Users, CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/ui/CTASection';
import MotionWrapper from '@/components/ui/MotionWrapper';

export const metadata: Metadata = {
  title: 'Quality & Safety — Engineering Standards & Safety Culture',
  description:
    'SAM India\'s quality management and safety systems ensure zero-compromise standards across all infrastructure projects — from inspection workflows to safety monitoring and continuous improvement.',
};

const qualitySystems = [
  { icon: FileCheck, title: 'Quality Management System', desc: 'ISO 9001-aligned QMS covering all project activities — from material approval to final handover. Structured ITPs, method statements, and inspection records.', color: '#10b981' },
  { icon: Eye, title: 'Inspection & Testing', desc: 'Comprehensive ITP with hold-point and witness-point management. Third-party inspection coordination. NABL-accredited lab testing for materials.', color: '#00d4ff' },
  { icon: BookOpen, title: 'Document Control', desc: 'All quality documents — drawings, specifications, inspection records, test certificates — controlled with version management and audit trail.', color: '#1e6fff' },
  { icon: AlertTriangle, title: 'Non-Conformance Management', desc: 'Structured NCR lifecycle — identification, investigation, root cause analysis, corrective action, and verification of closure. Preventive action tracking.', color: '#f0a020' },
  { icon: TrendingUp, title: 'Continuous Improvement', desc: 'Lessons learned program, periodic quality audits, quality performance metrics, and benchmarking against industry standards.', color: '#00d4ff' },
  { icon: Wrench, title: 'Materials & Procurement Quality', desc: 'Pre-qualification of vendors and suppliers. Material approval process with test certificates and third-party verification for critical materials.', color: '#10b981' },
];

const safetySystems = [
  { icon: Shield, title: 'Safety Management System', desc: 'Site-specific Safety Plans, method statement review, and safety risk assessment integrated into every project mobilization.', color: '#ef4444' },
  { icon: Users, title: 'Safety Culture & Training', desc: 'Daily toolbox talks, safety induction for all workers, specialized training for high-risk activities (height work, confined space, excavation).', color: '#f0a020' },
  { icon: Eye, title: 'Incident Reporting & Investigation', desc: 'Zero-tolerance near-miss reporting culture. Structured accident investigation with root cause analysis and corrective action closure.', color: '#ef4444' },
  { icon: CheckCircle2, title: 'Permit-to-Work', desc: 'Formal PTW system for high-risk activities including hot work, excavation, height work, confined space entry, and lifting operations.', color: '#10b981' },
];

export default function QualitySafetyPage() {
  return (
    <>
      <PageHero
        tag="Quality & Safety"
        title="Zero Compromise on Quality and Safety"
        subtitle="At SAM India, quality and safety are not compliance checkboxes — they are operational values embedded in every process, every inspection, and every site activity."
        gradient="radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16,185,129,0.08) 0%, transparent 70%)"
      />

      {/* Quality */}
      <section className="py-20 bg-[#0a1628] relative">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <Container>
          <SectionHeader
            tag="Quality Systems"
            title="Structured Quality Management"
            subtitle="Every project operated under a formal Quality Management System — ensuring consistency, auditability, and delivery to specification."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {qualitySystems.map((item, i) => {
              const Icon = item.icon;
              return (
                <MotionWrapper key={item.title} delay={i * 0.07}>
                  <div className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 h-full">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                    <p className="text-sm text-[#8899bb] leading-relaxed">{item.desc}</p>
                  </div>
                </MotionWrapper>
              );
            })}
          </div>
        </Container>
      </section>

      {/* QC Process */}
      <section className="py-20 bg-[#050a1a] relative">
        <div className="absolute inset-0 blueprint-grid opacity-25" />
        <Container>
          <SectionHeader
            tag="Inspection Process"
            title="Inspection & Test Plan Workflow"
            subtitle="Every construction activity follows a defined ITP — from pre-activity checks to in-process inspections and final acceptance."
          />

          <div className="mt-12 relative">
            <div className="flex flex-col sm:flex-row gap-0">
              {[
                { step: '01', title: 'Pre-Activity', desc: 'Method statement review. Material approvals. Workforce briefing. Equipment readiness.', color: '#00d4ff' },
                { step: '02', title: 'In-Process', desc: 'Hold and witness point inspections. Third-party testing. Non-conformance identification.', color: '#1e6fff' },
                { step: '03', title: 'Completion', desc: 'Final inspection. Test results review. Snag resolution. Handover documentation.', color: '#10b981' },
                { step: '04', title: 'Documentation', desc: 'All records uploaded to QMS. Certificate of compliance issued. Audit-ready file closure.', color: '#f0a020' },
              ].map((step, i) => (
                <MotionWrapper key={step.step} delay={i * 0.1} className="flex-1">
                  <div className="relative glass rounded-2xl p-6 border border-white/5 h-full m-1">
                    <div className="text-5xl font-black mb-4" style={{ color: `${step.color}20` }}>{step.step}</div>
                    <h3 className="text-white font-bold text-base mb-2" style={{ color: step.color }}>{step.title}</h3>
                    <p className="text-sm text-[#8899bb] leading-relaxed">{step.desc}</p>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Safety */}
      <section className="py-20 bg-[#0a1628] relative">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <Container>
          <SectionHeader
            tag="Safety Culture"
            title="Safety is Non-Negotiable"
            subtitle="Our safety culture starts at leadership and reaches every worker on every site. Safe execution is not a constraint — it is how we work."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {safetySystems.map((item, i) => {
              const Icon = item.icon;
              return (
                <MotionWrapper key={item.title} delay={i * 0.1}>
                  <div className="glass rounded-2xl p-6 border border-white/5 hover:border-red-400/15 transition-all duration-300 h-full flex gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                      <p className="text-sm text-[#8899bb] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </MotionWrapper>
              );
            })}
          </div>

          {/* Safety stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Daily Toolbox Talks', val: '100%', sub: 'Compliance rate' },
              { label: 'Safety Training', val: '[X]+', sub: 'Man-hours/year' },
              { label: 'Near-Miss Reports', val: '[X]', sub: 'Tracked & closed' },
              { label: 'LTI Rate', val: 'Zero Target', sub: 'Lost Time Injuries' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-5 border border-white/5 text-center">
                <div className="text-2xl font-black gradient-text-cyan mb-1">{stat.val}</div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">{stat.label}</div>
                <div className="text-[11px] text-[#8899bb] mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        tag="Our Standards"
        title="Quality and Safety — The SAM India Standard"
        subtitle="Every project. Every inspection. Every day."
        primaryCTA={{ label: 'View Our Projects', href: '/projects' }}
        secondaryCTA={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  );
}
