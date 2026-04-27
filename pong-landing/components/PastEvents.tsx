'use client';

import Image from 'next/image';
import Link from 'next/link';
import { palette, fonts } from '@/lib/theme';
import { Pill, SectionHeader } from '@/components/brand/Primitives';
import { RegionPill } from '@/components/brand/RegionPill';
import { Reveal } from '@/components/brand/Reveal';
import { EVENTS } from '@/lib/events';

export function PastEvents() {
  return (
    <section
      id="past-events"
      style={{ background: palette.foam, padding: 'clamp(72px, 10vw, 120px) clamp(16px, 4vw, 24px)' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 24,
              marginBottom: 48,
            }}
          >
            <SectionHeader tag="The Archive" headline="Past Events" />
            <p
              style={{
                maxWidth: 380,
                opacity: 0.7,
                margin: 0,
                fontSize: 15,
                lineHeight: 1.6,
                fontFamily: fonts.body,
              }}
            >
              Every 6CUPS event gets its own page. Bracket, photos, who won, the whole story.
            </p>
          </div>
        </Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 24,
          }}
        >
          {EVENTS.map((e, i) => (
            <Reveal key={e.slug} delay={120 + i * 110}>
              <PastEventCard event={e} featured={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PastEventCard({
  event,
  featured = false,
}: {
  event: typeof EVENTS[number];
  featured?: boolean;
}) {
  return (
    <Link
      href={`/events/${event.slug}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        background: palette.blackout,
        overflow: 'hidden',
        borderTop: `4px solid ${palette.cupRed}`,
        minHeight: featured ? 420 : 360,
        transition: 'transform 200ms',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src={event.cover}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover', opacity: 0.55 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.92) 20%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      </div>
      <div
        style={{
          position: 'relative',
          padding: '32px 28px',
          height: '100%',
          minHeight: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: palette.foam,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 12,
          }}
        >
          <Pill variant="foam-outline" size="sm">{event.status}</Pill>
          <div style={{ textAlign: 'right' }}>
            <div className="t-tag" style={{ opacity: 0.7 }}>{event.shortDate}</div>
            <div className="t-tag" style={{ opacity: 0.5, marginTop: 4 }}>
              {event.location}
            </div>
          </div>
        </div>
        <div>
          <div
            className="t-tag"
            style={{ color: palette.cupRed, marginBottom: 10 }}
          >
            {event.date}
          </div>
          <h3
            style={{
              fontFamily: fonts.heading,
              fontSize: featured ? 'clamp(3.5rem, 7vw, 5.5rem)' : 'clamp(2.5rem, 5vw, 3.5rem)',
              textTransform: 'uppercase',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              margin: '0 0 20px',
            }}
          >
            {event.name}
          </h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
              <div>
                <div
                  className="t-tag"
                  style={{ color: palette.cupRed, marginBottom: 6, fontSize: 10 }}
                >
                  Champions
                </div>
                <div
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 26,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {event.champion.team}
                </div>
                <div style={{ marginTop: 8 }}>
                  <RegionPill neighbourhood={event.champion.neighbourhood} size="xs" />
                </div>
              </div>
            </div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: fonts.heading,
                fontSize: 12,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: palette.cupRed,
              }}
            >
              See Recap
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
