import type { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';
import PageHero from '@/components/ui/PageHero';
import CTASection from '@/components/ui/CTASection';

export const metadata: Metadata = {
  title: 'Projects — Infrastructure Portfolio',
  description:
    'Explore SAM India\'s portfolio of delivered and ongoing infrastructure projects — metro, underground, healthcare, industrial, power, real estate, and civil projects across India.',
};

export default function ProjectsPage() {
  return (
    <>
      <div className="bg-[#050a1a]">
        <PageHero
          tag="Project Portfolio"
          title="Landmark Infrastructure Projects"
          subtitle="Explore SAM India's portfolio of delivered and ongoing infrastructure projects — from underground metro stations to hospitals, power plants, and industrial facilities."
        />
        <ProjectsClient />
      </div>

      <CTASection
        tag="New Opportunity?"
        title="Have a Complex Infrastructure Project?"
        subtitle="SAM India is available to partner on complex civil, metro, institutional, industrial, power, or real estate infrastructure projects across India."
        primaryCTA={{ label: 'Discuss Your Project', href: '/contact' }}
        secondaryCTA={{ label: 'Our Capabilities', href: '/sectors' }}
      />
    </>
  );
}
