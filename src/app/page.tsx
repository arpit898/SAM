import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import SectorsSection from '@/components/sections/SectorsSection';
import ProjectsPreviewSection from '@/components/sections/ProjectsPreviewSection';
import ClientsSection from '@/components/sections/ClientsSection';
import CTASection from '@/components/ui/CTASection';

export const metadata: Metadata = {
  title: 'SAM India Builtwell Pvt. Ltd. | Next-Generation Infrastructure Execution Company',
  description:
    'SAM India Builtwell Pvt. Ltd. is an Indian infrastructure and construction company delivering metro, transportation, institutional, industrial, power, real estate, and complex civil infrastructure projects.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <SectorsSection />
      <ProjectsPreviewSection />
      <ClientsSection />
      <CTASection
        tag="Join Our Team"
        title="Build the Infrastructure That Builds India"
        subtitle="SAM India seeks engineers, project managers, site leaders, and construction professionals who want to work on landmark national infrastructure projects."
        primaryCTA={{ label: 'Explore Careers', href: '/careers' }}
        secondaryCTA={{ label: 'Partner With Us', href: '/contact' }}
      />
    </>
  );
}
