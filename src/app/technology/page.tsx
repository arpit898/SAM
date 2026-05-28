import type { Metadata } from 'next';
import { BarChart3, Globe, GitBranch, Database, Cpu, Sparkles, FileSearch, MonitorDot, Layers, ArrowRight } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/ui/CTASection';
import MotionWrapper from '@/components/ui/MotionWrapper';

export const metadata: Metadata = {
  title: 'Technology & Systems — Digital Project Controls',
  description:
    'SAM India is building a systems-driven construction enterprise with digital project controls, real-time site visibility, document management, and AI-ready infrastructure for next-generation infrastructure delivery.',
};

const techSystems = [
  {
    icon: BarChart3,
    title: 'Digital Project Controls',
    desc: 'Primavera P6 and MS Project-integrated master schedule management. Baseline tracking, earned value analysis, critical path monitoring, and schedule risk management across all projects.',
    tags: ['Primavera P6', 'MS Project', 'EVM', 'Risk Analysis'],
    color: '#00d4ff',
  },
  {
    icon: Globe,
    title: 'Site Reporting & Visibility',
    desc: 'Mobile-first daily progress reporting with photographic evidence, geo-tagged activity tracking, and real-time dashboard for client, PMC, and management visibility.',
    tags: ['Mobile App', 'Geo-tagging', 'Progress Photos', 'Real-time Dashboard'],
    color: '#1e6fff',
  },
  {
    icon: GitBranch,
    title: 'Workflow Automation',
    desc: 'Structured approval workflows for submittals, RFIs, variation orders, and NCRs. Permit-to-work digital systems, checklist automation, and audit-trail documentation.',
    tags: ['Workflow Engine', 'Permit-to-Work', 'NCR Management', 'Audit Trail'],
    color: '#10b981',
  },
  {
    icon: Database,
    title: 'Document Control',
    desc: 'Centralized drawing and document management with version control, revision history, transmittal records, and direct link to site execution activities.',
    tags: ['Version Control', 'Transmittals', 'Drawing Register', 'Revision Tracking'],
    color: '#00d4ff',
  },
  {
    icon: FileSearch,
    title: 'Quality Management System',
    desc: 'Digital ITPs, hold-and-witness point notifications, NCR lifecycle management, and third-party inspection coordination — all documented and audit-ready.',
    tags: ['ITP Management', 'Hold/Witness', 'NCR Lifecycle', 'Third-party Coordination'],
    color: '#f0a020',
  },
  {
    icon: MonitorDot,
    title: 'Safety Monitoring',
    desc: 'Digital toolbox talks, incident and near-miss reporting, safety observation cards, and PPE compliance monitoring — with instant escalation protocols.',
    tags: ['Toolbox Talks', 'Incident Reporting', 'Safety Observations', 'Compliance'],
    color: '#ef4444',
  },
  {
    icon: Layers,
    title: 'BIM Readiness',
    desc: 'Building Information Modeling coordination readiness for complex projects — coordinating with design consultants on clash detection, model-based scheduling, and 4D simulation.',
    tags: ['BIM Coordination', 'Clash Detection', '4D Simulation', 'Model Integration'],
    color: '#8b5cf6',
  },
  {
    icon: Cpu,
    title: 'Plant & Asset Tracking',
    desc: 'Equipment deployment scheduling, preventive maintenance tracking, fuel consumption monitoring, and asset utilization reporting across all project sites.',
    tags: ['Asset Tracking', 'Maintenance Schedule', 'Fuel Monitoring', 'Utilization Reports'],
    color: '#1e6fff',
  },
];

const futureRoadmap = [
  { title: 'AI-Assisted Schedule Optimization', desc: 'Machine learning models to predict schedule delays and recommend resource optimization actions based on site activity data.', status: 'Roadmap' },
  { title: 'Predictive Risk Alerts', desc: 'AI-powered risk identification using project data patterns, weather integration, and historical project performance analytics.', status: 'Roadmap' },
  { title: 'Real-Time Progress Quantification', desc: 'Computer vision and IoT sensors for automated progress measurement — reducing reliance on manual site reporting.', status: 'Exploring' },
  { title: 'Integrated Finance & Contract Analytics', desc: 'End-to-end project financial intelligence — RA bills, variations, claims, and profitability — integrated with project schedule and progress data.', status: 'Roadmap' },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        tag="Technology & Systems"
        title="Building a Systems-Driven Construction Enterprise"
        subtitle="SAM India is transforming from a traditional construction company to a data-driven, technology-managed infrastructure enterprise — where every project is controlled, documented, and optimized through integrated systems."
      />

      {/* Core Systems */}
      <section className="py-20 bg-[#0a1628] relative">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <Container>
          <SectionHeader
            tag="Core Systems"
            title="Integrated Project Management Ecosystem"
            subtitle="Our technology stack covers every dimension of project execution — from planning to quality to safety to documentation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {techSystems.map((sys, i) => {
              const Icon = sys.icon;
              return (
                <MotionWrapper key={sys.title} delay={i * 0.07}>
                  <div className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${sys.color}12`, border: `1px solid ${sys.color}25` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: sys.color }} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base">{sys.title}</h3>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {sys.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-semibold text-[#8899bb] bg-white/5 px-2 py-0.5 rounded border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-[#8899bb] leading-relaxed">{sys.desc}</p>
                  </div>
                </MotionWrapper>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Command Center Concept */}
      <section className="py-20 bg-[#050a1a] relative">
        <div className="absolute inset-0 blueprint-grid opacity-25" />
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <MotionWrapper direction="left">
              <SectionHeader
                tag="Command Center Concept"
                title="Real-Time Project Intelligence"
                subtitle="Our vision is a centralized project intelligence center — providing management, clients, and site teams with a single view of all active projects, live performance metrics, and automated alerts."
              />
              <div className="mt-8 space-y-4">
                {[
                  'Live project health dashboard for all active sites',
                  'Automated daily progress summary reports',
                  'Schedule variance alerts and critical path changes',
                  'Quality and safety metrics in real time',
                  'Client-access portal for project visibility',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-[#a8b8d0] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </MotionWrapper>

            <MotionWrapper direction="right" delay={0.15}>
              <div className="glass rounded-2xl p-8 border border-cyan-400/10 hud-border">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] pulse-glow" />
                  <span className="text-xs font-bold text-[#10b981] uppercase tracking-widest">Command Center — Live</span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Active Projects', val: '[X]', color: '#00d4ff' },
                    { label: 'Sites Operational', val: '[X]', color: '#10b981' },
                    { label: 'Monthly QC Inspections', val: '[X]+', color: '#1e6fff' },
                    { label: 'Open NCRs', val: '[X]', color: '#f0a020' },
                    { label: 'Safety Observations MTD', val: '[X]', color: '#10b981' },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center justify-between py-3 border-b border-white/5">
                      <span className="text-sm text-[#8899bb]">{m.label}</span>
                      <span className="text-lg font-black" style={{ color: m.color }}>{m.val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[#8899bb] mt-4 italic">* Live data — updated in real time from site reporting systems</p>
              </div>
            </MotionWrapper>
          </div>
        </Container>
      </section>

      {/* Future Roadmap */}
      <section className="py-20 bg-[#0a1628] relative">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <Container>
          <SectionHeader
            tag="Future Roadmap"
            title="AI-Ready Infrastructure Enterprise"
            subtitle="SAM India is investing in the data infrastructure needed to deploy advanced analytics and AI-assisted project management in the next phase of our technology evolution."
            center
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            {futureRoadmap.map((item, i) => (
              <MotionWrapper key={item.title} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 border border-white/5 hover:border-purple-400/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full border border-purple-400/20 uppercase tracking-wider">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-[#8899bb] leading-relaxed">{item.desc}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        tag="Learn More"
        title="Want to Know More About Our Project Systems?"
        subtitle="Contact our team to understand how our digital project controls and quality systems benefit your infrastructure project."
        primaryCTA={{ label: 'Contact Our Team', href: '/contact' }}
        secondaryCTA={{ label: 'View Quality & Safety', href: '/quality-safety' }}
      />
    </>
  );
}
