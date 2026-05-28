import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Download, ArrowRight } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Container from '@/components/ui/Container';
import MotionWrapper from '@/components/ui/MotionWrapper';

export const metadata: Metadata = {
  title: 'Contact SAM India — Infrastructure Project Enquiries',
  description:
    'Contact SAM India Builtwell Pvt. Ltd. for infrastructure project partnerships, tendering, business development, careers, or general enquiries.',
};

const inquiryTypes = [
  'New Project / Business Partnership',
  'Joint Venture Enquiry',
  'Subcontracting Opportunity',
  'Vendor / Supplier Registration',
  'Careers / Recruitment',
  'Media & Press',
  'General Enquiry',
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        tag="Contact Us"
        title="Partner with SAM India"
        subtitle="For complex infrastructure project partnerships, business development, career opportunities, or general enquiries — our team is ready to engage."
      />

      <section className="py-20 bg-[#0a1628] relative">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <MotionWrapper direction="left">
                <h2 className="text-xl font-bold text-white mb-6">Get in Touch</h2>

                {[
                  {
                    icon: MapPin,
                    title: 'Registered Office',
                    lines: ['[Office Address — Placeholder]', 'New Delhi — [PIN Code]', 'India'],
                    color: '#00d4ff',
                  },
                  {
                    icon: Phone,
                    title: 'Phone',
                    lines: ['[Landline Placeholder]', '[Mobile Placeholder]'],
                    color: '#10b981',
                  },
                  {
                    icon: Mail,
                    title: 'Email',
                    lines: ['[General Enquiry Email]', '[BD Email Placeholder]'],
                    color: '#1e6fff',
                  },
                  {
                    icon: Clock,
                    title: 'Business Hours',
                    lines: ['Monday – Saturday', '9:00 AM – 6:00 PM IST'],
                    color: '#f0a020',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="glass rounded-xl p-5 border border-white/5 flex gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#8899bb] uppercase tracking-wider mb-1">{item.title}</p>
                        {item.lines.map((line) => (
                          <p key={line} className="text-sm text-white">{line}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </MotionWrapper>

              {/* Company profile download */}
              <MotionWrapper direction="left" delay={0.15}>
                <div className="glass rounded-xl p-5 border border-cyan-400/15">
                  <p className="text-white font-bold text-sm mb-2">Download Company Profile</p>
                  <p className="text-xs text-[#8899bb] mb-4">Get our detailed company profile for project qualification and client prequalification submissions.</p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00d4ff] text-[#050a1a] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </a>
                  <p className="text-[11px] text-[#8899bb] mt-2 italic">* PDF to be prepared and linked here.</p>
                </div>
              </MotionWrapper>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <MotionWrapper direction="right">
                <div className="glass rounded-2xl p-8 border border-cyan-400/10 hud-border">
                  <h2 className="text-xl font-bold text-white mb-6">Send Us a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { label: 'Full Name *', type: 'text', placeholder: 'Your full name', col: 1 },
                      { label: 'Organization *', type: 'text', placeholder: 'Company / Agency name', col: 1 },
                      { label: 'Email Address *', type: 'email', placeholder: 'your@organization.com', col: 1 },
                      { label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX', col: 1 },
                    ].map((field) => (
                      <div key={field.label} className={field.col === 2 ? 'sm:col-span-2' : ''}>
                        <label className="block text-xs font-bold text-[#8899bb] uppercase tracking-wider mb-2">{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-cyan-400/30 outline-none text-white text-sm placeholder:text-[#8899bb] bg-transparent transition-colors"
                        />
                      </div>
                    ))}

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#8899bb] uppercase tracking-wider mb-2">Enquiry Type *</label>
                      <select className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-cyan-400/30 outline-none text-white text-sm bg-[#0a1628] transition-colors">
                        <option value="" className="bg-[#0a1628] text-[#8899bb]">Select enquiry type...</option>
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type} className="bg-[#0a1628] text-white">{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#8899bb] uppercase tracking-wider mb-2">Project / Message Details *</label>
                      <textarea
                        rows={5}
                        placeholder="Describe your project, requirements, or enquiry in detail..."
                        className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-cyan-400/30 outline-none text-white text-sm placeholder:text-[#8899bb] bg-transparent transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
                    <p className="text-xs text-[#8899bb]">
                      Fields marked * are required. We respond to all enquiries within 2 business days.
                    </p>
                    <button className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#00d4ff] text-[#050a1a] text-sm font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                      Send Message
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <p className="text-xs text-[#8899bb] mt-4 italic">* Form submission backend not yet connected. Contact us directly at [email placeholder] for urgent enquiries.</p>
                </div>
              </MotionWrapper>
            </div>
          </div>

          {/* Map placeholder */}
          <MotionWrapper className="mt-12">
            <div
              className="rounded-2xl h-64 relative overflow-hidden border border-white/5"
              style={{ background: 'linear-gradient(135deg, #0a1628, #162a52)' }}
            >
              <div className="absolute inset-0 blueprint-grid opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-cyan-400/30 mx-auto mb-3" />
                  <p className="text-[#8899bb] text-sm italic">📍 Google Maps embed — to be added with registered office location</p>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </Container>
      </section>
    </>
  );
}
