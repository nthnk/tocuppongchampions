'use client';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ParallaxCups } from '@/components/ParallaxCups';
import { ParallaxSection } from '@/components/ParallaxSection';
import { AboutAnimated } from '@/components/AboutAnimated';
import { TournamentFormatAnimated } from '@/components/TournamentFormatAnimated';
import { WaitlistForm } from '@/components/WaitlistForm';
import { ShareSection } from '@/components/ShareSection';
import { FAQ } from '@/components/FAQ';
import { CupPongGame } from '@/components/CupPongGame';
import { Footer } from '@/components/Footer';
import { CursorGlow } from '@/components/CursorGlow';

export default function Home() {
  return (
    <main className="min-h-screen relative" style={{ background: 'linear-gradient(180deg, #121318 0%, #0C0C0C 100%)' }}>
      <CursorGlow />
      <div className="relative z-10">
        <Header />
        <ParallaxSection speed={0.05}>
          <Hero />
        </ParallaxSection>
        <ParallaxCups />
        <AboutAnimated />
        <TournamentFormatAnimated />
        <ParallaxSection speed={0.1}>
          <ShareSection />
        </ParallaxSection>
        <ParallaxSection speed={0.15}>
          <WaitlistForm />
        </ParallaxSection>
        <ParallaxSection speed={0.09}>
          <FAQ />
        </ParallaxSection>
        <CupPongGame />
        <Footer />
      </div>
    </main>
  );
}
