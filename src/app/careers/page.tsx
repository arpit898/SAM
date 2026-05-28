import type { Metadata } from 'next';
import { Users, TrendingUp, Shield, Award, Briefcase, HardHat, ArrowRight, ChevronRight } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/ui/CTASection';
import MotionWrapper from '@/components/ui/MotionWrapper';

export const metadata: Metadata = {
  title: 'Careers at SAM India — Build the Infrastructure That Builds India',
  description:
    'Join SAM India Builtwell Pvt. Ltd. and work on landmark national infrastructure projects — metro, hospital, industrial, power, and civil construction. We hire engineers, project managers, and construction professionals.',
};

const whyJoinUs = [
  { icon: Award, title: 'Landmark Projects', desc: 'Work on large-scale, nationally significant infrastructure projects — metro stations, hospitals, power plants, and more.', color: '#00d4ff' },
  { icon: TrendingUp, title: 'Career Growth', desc: 'Fast-track growth opportunities for high-performing engineers and professionals. Meritocracy-driven advancement.', color: '#10b981' },
  { icon: Users, title: 'Experienced Teams', desc: 'Work alongside seasoned infrastructure professionals who bring deep domain knowledge and execution experience.', color: '#1e6fff' },
  { icon: Shield, title: 'Safety First', desc: 'We invest in worker safety, training, and wellbeing — because our people are our most important asset.', color: '#f0a020' },
];

const departments = [
  { name: 'Civil & Structural Engineering', icon: HardHat },
  { name: 'MEP Engineering', icon: Briefcase },
  { name: 'Project Planning & Controls', icon: TrendingUp },
  { name: 'Quality Management', icon: Shield },
  { name: 'Safety (HSE)', icon: Shield },
  { name: 'Quantity Surveying & Billing', icon: Briefcase },
  { name: 'Business Development & Tendering', icon: Award },
  { name: 'Accounts & Finance', icon: Briefcase },
  { name: 'HR & Administration', icon: Users },
  { name: 'Plant & Equipment', icon: HardHat },
];

const openRoles = [
  { title: 'Site Engineer — Civil', dept: 'Engineering', exp: '3–7 Years', location: 'Multiple Sites', type: 'Full-time' },
  { title: 'Senior Engineer — Planning', dept: 'Project Controls', exp: '5–10 Years', location: 'Delhi NCR', type: 'Full-time' },
  { title: 'Project Manager', dept: 'Operations', exp: '10–15 Years', location: 'Multiple Locations', type: 'Full-time' },
  { title: 'Quality Engineer', dept: 'QA/QC', exp: '4–8 Years', location: 'Active Projects', type: 'Full-time' },
  { title: 'HSE Officer', dept: 'Safety', exp: '3–6 Years', location: 'Active Sites', type: 'Full-time' },
  { title: 'Quantity Surveyor', dept: 'Commercial', exp: '4–8 Years', location: 'Delhi', type: 'Full-time' },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        tag="Careers"
        title="Build the Infrastructure That Builds India"
        subtitle="Join SAM India and be part of the team delivering metro stations, hospitals, power infrastructure, and landmark projects that shape India's built environment."
        gradient="radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16,185,129,0.07) 0%, transparent 70%)"
      />

      {/* Why Join */}
      <section className="py-20 bg-[#0a1628] relative">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <Container>
          <SectionHeader
            tag="Why SAM India"
            title="Why Work With Us"
            subtitle="We offer more than a job — we offer the chance to build the infrastructure that powers, connects, and heals India."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {whyJoinUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <MotionWrapper key={item.title} delay={i * 0.1}>
                  <div className="glass rounded-2xl p-6 border border-white/5 hover:border-cyan-400/15 transition-all h-full text-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto"
                      style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: item.color }} />
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

      {/* Departments */}
      <section className="py-20 bg-[#050a1a] relative">
        <div className="absolute inset-0 blueprint-grid opacity-25" />
        <Container>
          <SectionHeader
            tag="Departments"
            title="Where You Could Work"
            subtitle="We hire across all construction and project management disciplines."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
            {departments.map((dept, i) => {
              const Icon = dept.icon;
              return (
                <MotionWrapper key={dept.name} delay={i * 0.05}>
                  <div className="glass rounded-xl p-4 border border-white/5 hover:border-cyan-400/20 transition-all flex items-center gap-3">
                    <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-sm text-white font-medium">{dept.name}</span>
                  </div>
                </MotionWrapper>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Open Roles */}
      <section className="py-20 bg-[#0a1628] relative">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <Container>
          <SectionHeader
            tag="Current Openings"
            title="Open Positions"
            subtitle="We are actively hiring across engineering and project management roles. If you do not see your role listed, send us your profile — we review all qualified applications."
          />

          <div className="space-y-4 mt-12">
            {openRoles.map((role, i) => (
              <MotionWrapper key={role.title} delay={i * 0.07}>
                <div className="glass rounded-xl p-5 border border-white/5 hover:border-cyan-400/20 transition-all duration-300 group cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-white font-bold text-base group-hover:text-cyan-400 transition-colors">{role.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-1.5">
                        <span className="text-[#8899bb] text-xs">{role.dept}</span>
                        <span className="text-[#8899bb] text-xs">•</span>
                        <span className="text-[#8899bb] text-xs">{role.exp}</span>
                        <span className="text-[#8899bb] text-xs">•</span>
                        <span className="text-[#8899bb] text-xs">{role.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">{role.type}</span>
                      <div className="flex items-center gap-1 text-cyan-400 text-xs font-semibold">
                        Apply <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>

          <p className="text-xs text-[#8899bb] mt-6 italic">* Job listings are placeholder — to be updated with live positions.</p>
        </Container>
      </section>

      {/* Application form placeholder */}
      <section className="py-20 bg-[#050a1a] relative">
        <div className="absolute inset-0 blueprint-grid opacity-25" />
        <Container>
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              tag="Apply Now"
              title="Send Us Your Profile"
              subtitle="Fill in your details below and we will reach out for suitable opportunities."
              center
            />

            <div className="glass rounded-2xl p-8 border border-cyan-400/10 mt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                  { label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                  { label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
                  { label: 'Years of Experience', type: 'text', placeholder: 'e.g. 5 years' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-bold text-[#8899bb] uppercase tracking-wider mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-cyan-400/30 outline-none text-white text-sm placeholder:text-[#8899bb] bg-transparent transition-colors"
                    />
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#8899bb] uppercase tracking-wider mb-2">Department / Role of Interest</label>
                  <input
                    type="text"
                    placeholder="e.g. Civil Engineering, Project Planning, QA/QC..."
                    className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-cyan-400/30 outline-none text-white text-sm placeholder:text-[#8899bb] bg-transparent transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#8899bb] uppercase tracking-wider mb-2">Brief Profile / Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your experience, key projects, and what you are looking for..."
                    className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-cyan-400/30 outline-none text-white text-sm placeholder:text-[#8899bb] bg-transparent transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
                <p className="text-xs text-[#8899bb]">By submitting, you agree to our privacy policy. Your data will only be used for recruitment purposes.</p>
                <button className="px-8 py-3 rounded-lg bg-[#00d4ff] text-[#050a1a] text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors">
                  Submit Application
                </button>
              </div>

              <p className="text-xs text-[#8899bb] mt-4 italic">* Form submission backend not yet connected — contact directly at [email placeholder].</p>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        tag="Join SAM India"
        title="Ready to Build India's Next Infrastructure?"
        subtitle="We are always looking for talented engineers, project managers, and construction professionals who share our passion for delivering landmark infrastructure."
        primaryCTA={{ label: 'Apply Now', href: '#apply-now' }}
        secondaryCTA={{ label: 'Contact HR', href: '/contact' }}
      />
    </>
  );
}
