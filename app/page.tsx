'use client';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';

import { AboutAnimated } from '@/components/AboutAnimated';
import { Sponsors } from '@/components/Sponsors';
import { Location } from '@/components/Location';
import { WaitlistForm } from '@/components/WaitlistForm';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { palette } from '@/lib/theme';

export default function Home() {
  return (
    <main className="min-h-screen relative grain-overlay" style={{ background: palette.black }}>
      <div className="relative z-10">
        <Header />
        <Hero />
        <Sponsors />
        <AboutAnimated />
        <WaitlistForm />
        <Location />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
