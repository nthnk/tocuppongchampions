import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EventHero } from '@/components/event/EventHero';
import { StatBar } from '@/components/event/StatBar';
import { RecapBody } from '@/components/event/RecapBody';
import { PhotoSlideshow } from '@/components/event/PhotoSlideshow';
import { Bracket } from '@/components/event/Bracket';
import { Leaderboard } from '@/components/event/Leaderboard';
import { ChampionCard } from '@/components/event/ChampionCard';
import { VenueCard } from '@/components/event/VenueCard';
import { EVENTS, getEvent } from '@/lib/events';

export const dynamicParams = false;

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const ev = getEvent(slug);
  if (!ev) return { title: '6CUPS' };
  return {
    title: `${ev.name} · 6CUPS`,
    description: ev.summary,
  };
}

export default async function EventPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  return (
    <main className="min-h-screen relative grain-overlay" style={{ background: 'var(--foam)' }}>
      <div className="relative z-10">
        <Header />
        <EventHero event={event} />
        <StatBar stats={event.stats} />
        <ChampionCard event={event} />
        <RecapBody paragraphs={event.recap} kicker="From The Floor" title="How It Played" />
        <PhotoSlideshow photos={event.photos} />
        <Bracket rounds={event.bracket} />
        <Leaderboard rows={event.standings} />
        <VenueCard event={event} />
        <Footer />
      </div>
    </main>
  );
}
