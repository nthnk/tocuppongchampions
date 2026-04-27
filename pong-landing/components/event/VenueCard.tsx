import Image from 'next/image';
import { palette, fonts } from '@/lib/theme';
import { SectionHeader } from '@/components/brand/Primitives';
import { Button } from '@/components/brand/Button';
import type { EventCanon } from '@/lib/events';

export function VenueCard({ event }: { event: EventCanon }) {
  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(56px, 8vw, 88px) clamp(20px, 5vw, 24px)',
        overflow: 'hidden',
        color: palette.foam,
      }}
    >
      <Image
        src="/event_photos/venue_background.jpg"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 760,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <SectionHeader
          tag="The Venue"
          headline={event.venue.split(' / ').join(' · ')}
          align="center"
          tone="on-dark"
        />
        <p
          style={{
            opacity: 0.78,
            marginTop: 28,
            marginBottom: 28,
            lineHeight: 1.6,
            fontFamily: fonts.body,
          }}
        >
          {event.address}
        </p>
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(event.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <Button variant="primary" size="lg">Open In Google Maps</Button>
        </a>
      </div>
    </section>
  );
}
