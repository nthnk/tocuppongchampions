import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { palette, fonts } from '@/lib/theme';
import { Pill } from '@/components/brand/Primitives';
import { Button } from '@/components/brand/Button';
import { ChampionTile } from '@/components/event/ChampionTile';
import { EVENTS } from '@/lib/events';

export const metadata: Metadata = {
  title: 'Winners · 6CUPS',
  description: 'The 6CUPS Hall of Champions. Every Table, every winning duo, every recap.',
};

export default function WinnersPage() {
  return (
    <main className="min-h-screen relative grain-overlay" style={{ background: 'var(--foam)' }}>
      <div className="relative z-10">
        <Header />

        <section
          style={{
            position: 'relative',
            background: palette.blackout,
            color: palette.foam,
            padding: '120px 24px 96px',
            borderBottom: `4px solid ${palette.cupRed}`,
            overflow: 'hidden',
          }}
        >
          <Image
            src="/event_photos/tz-10.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: 'cover', opacity: 0.75 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />

          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: 1100,
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <Link
              href="/"
              className="t-tag"
              style={{
                color: palette.foam,
                opacity: 0.6,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 24,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back to 6CUPS
            </Link>

            <Pill variant="foam-outline" size="md">The Hall</Pill>
            <h1
              style={{
                fontFamily: fonts.heading,
                fontSize: 'clamp(4rem, 11vw, 9rem)',
                lineHeight: 0.88,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                margin: '24px 0 16px',
              }}
            >
              <span style={{ color: palette.cupRed }}>Champions</span>
            </h1>
            <p
              style={{
                fontSize: 18,
                opacity: 0.8,
                margin: '0 auto',
                maxWidth: 620,
                lineHeight: 1.55,
                fontFamily: fonts.body,
              }}
            >
              Every duo that&apos;s ever taken a 6CUPS Table. The names go on the wall, the recap goes in the canon.
            </p>
          </div>
        </section>

        <section style={{ background: palette.foam, padding: '96px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 24,
              }}
            >
              {EVENTS.map((e) => (
                <ChampionTile key={e.slug} event={e} />
              ))}
            </div>

            <div style={{ marginTop: 64, textAlign: 'center' }}>
              <p className="t-tag" style={{ opacity: 0.55, marginBottom: 18 }}>
                A new chapter is added with every Table.
              </p>
              <Link href="/#past-events" style={{ textDecoration: 'none' }}>
                <Button variant="ghost-ink" size="md">See All Editions</Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
