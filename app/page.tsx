'use client';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { TournamentFormat } from '@/components/TournamentFormat';
import { WaitlistForm } from '@/components/WaitlistForm';
import { ShareSection } from '@/components/ShareSection';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { CursorGlow } from '@/components/CursorGlow';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 relative">
      <CursorGlow />
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <TournamentFormat />
        <ShareSection />
        <WaitlistForm />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
