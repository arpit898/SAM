import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'SAM India Builtwell Pvt. Ltd. | Next-Generation Infrastructure Execution',
    template: '%s | SAM India Builtwell',
  },
  description:
    'SAM India Builtwell Pvt. Ltd. is an Indian infrastructure and construction company delivering metro, transportation, institutional, industrial, power, real estate, and complex civil infrastructure projects since 1998.',
  keywords: [
    'infrastructure company India',
    'metro construction',
    'underground metro',
    'civil engineering India',
    'construction company',
    'SAM India',
    'SAM Builtwell',
    'hospital construction',
    'industrial civil works',
  ],
  openGraph: {
    title: 'SAM India Builtwell Pvt. Ltd. | Next-Generation Infrastructure Execution',
    description:
      'Engineering India\'s next generation of infrastructure. Metro, institutional, industrial, power, and civil projects since 1998.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'SAM India Builtwell Pvt. Ltd.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#050a1a] text-white">
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
