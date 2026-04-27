import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MarqueeTicker } from '@/components/MarqueeTicker';
import { About } from '@/components/About';
import { HowItWorks } from '@/components/HowItWorks';
import { PastEvents } from '@/components/PastEvents';
import { PastWinners } from '@/components/PastWinners';
import { Sponsors } from '@/components/Sponsors';
import { Location } from '@/components/Location';
import { FAQ } from '@/components/FAQ';
import { StayInTheLoop } from '@/components/StayInTheLoop';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen relative grain-overlay" style={{ background: 'var(--foam)' }}>
      <div className="relative z-10">
        <Header />
        <Hero />
        <MarqueeTicker variant="red" />
        <About />
        <HowItWorks />
        <PastEvents />
        <PastWinners />
        <Sponsors />
        <Location />
        <FAQ />
        <StayInTheLoop />
        <Footer />
      </div>
    </main>
  );
}
