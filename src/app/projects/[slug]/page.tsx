import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Calendar, User, CheckCircle2, AlertTriangle, ArrowLeft, ExternalLink } from 'lucide-react';
import { getProjectBySlug, getRelatedProjects, projects } from '@/data/projects';
import Container from '@/components/ui/Container';
import CTASection from '@/components/ui/CTASection';
import MotionWrapper from '@/components/ui/MotionWrapper';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.name} — ${project.sector}`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(slug, project.category);

  const statusColor: Record<string, string> = {
    Completed: '#10b981',
    Ongoing: '#00d4ff',
    Upcoming: '#f0a020',
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[#050a1a] overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-30" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,212,255,0.07), transparent 70%)' }} />

        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[#8899bb] hover:text-cyan-400 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Title */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 uppercase tracking-wider">
                  {project.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: statusColor[project.status] }} />
                  <span className="text-xs font-semibold text-white">{project.status}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                {project.name}
              </h1>

              <div className="flex flex-wrap gap-6 text-sm text-[#8899bb]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  {project.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  {project.year}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  {project.client}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="glass rounded-2xl p-6 border border-cyan-400/10 hud-border">
              <div className="text-xs font-bold text-[#8899bb] uppercase tracking-[0.2em] mb-4">Project Facts</div>
              <div className="space-y-4">
                {project.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[#8899bb] text-sm">{stat.label}</span>
                    <span className="text-white font-bold text-sm">{stat.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <span className="text-[#8899bb] text-sm">Contract Value</span>
                  <span className="text-white font-bold text-sm">{project.value}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Image placeholder */}
      <section className="bg-[#050a1a]">
        <Container>
          <div
            className="rounded-2xl h-80 sm:h-[480px] relative overflow-hidden border border-white/5"
            style={{ background: 'linear-gradient(135deg, #0a1628, #162a52, #0f2040)' }}
          >
            <div className="absolute inset-0 blueprint-grid-dense opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl font-black text-white/5 uppercase tracking-widest mb-4">{project.category}</div>
                <div className="glass rounded-xl px-6 py-3 border border-white/10">
                  <p className="text-[#8899bb] text-sm italic">📷 Project photography placeholder — to be replaced with actual site images</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Details */}
      <section className="py-20 bg-[#0a1628]">
        <div className="absolute inset-0 blueprint-grid opacity-15" />
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <MotionWrapper>
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Project Overview</h2>
                  <p className="text-[#a8b8d0] leading-relaxed">{project.description}</p>
                </div>
              </MotionWrapper>

              {/* Scope */}
              <MotionWrapper delay={0.1}>
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Scope of Work</h2>
                  <div className="glass rounded-xl p-6 border border-white/5">
                    <p className="text-[#a8b8d0] leading-relaxed">{project.scope}</p>
                  </div>
                </div>
              </MotionWrapper>

              {/* Highlights */}
              <MotionWrapper delay={0.15}>
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Engineering Highlights</h2>
                  <div className="space-y-3">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3 glass rounded-lg p-4 border border-white/5">
                        <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                        <span className="text-[#a8b8d0] text-sm leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionWrapper>

              {/* Challenges */}
              <MotionWrapper delay={0.2}>
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Execution Challenges</h2>
                  <div className="space-y-3">
                    {project.challenges.map((c, i) => (
                      <div key={i} className="flex items-start gap-3 glass rounded-lg p-4 border border-white/5">
                        <AlertTriangle className="w-5 h-5 text-[#f0a020] shrink-0 mt-0.5" />
                        <span className="text-[#a8b8d0] text-sm leading-relaxed">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionWrapper>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Sector</h3>
                <p className="text-cyan-400 font-semibold">{project.sector}</p>
              </div>

              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Related Sectors</h3>
                <Link
                  href="/sectors"
                  className="inline-flex items-center gap-2 text-cyan-400 text-sm hover:underline"
                >
                  View All Sectors
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <div className="glass rounded-2xl p-6 border border-cyan-400/10">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">Interested in similar work?</h3>
                <p className="text-[#8899bb] text-sm mb-4">We execute complex infrastructure projects across India. Let us discuss your requirements.</p>
                <Link
                  href="/contact"
                  className="block w-full text-center px-4 py-2.5 rounded-lg bg-[#00d4ff] text-[#050a1a] text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="py-20 bg-[#050a1a]">
          <Container>
            <h2 className="text-2xl font-bold text-white mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`}>
                  <div className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-400/20 transition-all group">
                    <div className="h-40 relative" style={{ background: 'linear-gradient(135deg, #0a1628, #162a52)' }}>
                      <div className="absolute inset-0 blueprint-grid-dense opacity-30" />
                      <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#00d4ff]/10 text-[#00d4ff] text-xs font-bold uppercase tracking-wider border border-[#00d4ff]/20">
                        {p.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors mb-2">{p.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-[#8899bb]">
                        <MapPin className="w-3 h-3" />
                        {p.location}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        tag="Partner With Us"
        title="Ready to Execute Your Infrastructure Project?"
        primaryCTA={{ label: 'Start a Conversation', href: '/contact' }}
        secondaryCTA={{ label: 'View All Projects', href: '/projects' }}
      />
    </>
  );
}
