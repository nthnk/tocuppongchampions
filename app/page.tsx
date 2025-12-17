'use client';

import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { TournamentFormat } from '@/components/TournamentFormat';
import { WaitlistForm } from '@/components/WaitlistForm';
import { ShareSection } from '@/components/ShareSection';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Hero />
      <About />
      <TournamentFormat />
      <WaitlistForm />
      <ShareSection />
      <FAQ />
      <Footer />
    </main>
  );
}
