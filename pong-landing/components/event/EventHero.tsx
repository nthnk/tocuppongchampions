import Image from 'next/image';
import Link from 'next/link';
import { palette, fonts } from '@/lib/theme';
import { Pill } from '@/components/brand/Primitives';
import type { EventCanon } from '@/lib/events';

export function EventHero({ event }: { event: EventCanon }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: 600,
        color: palette.foam,
        background: palette.blackout,
        overflow: 'hidden',
        borderBottom: `4px solid ${palette.cupRed}`,
      }}
    >
      <Image
        src={event.cover}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', opacity: 0.85 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 80%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(96px, 12vw, 140px) clamp(20px, 5vw, 24px) clamp(56px, 8vw, 80px)',
          minHeight: 600,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Link
          href="/#past-events"
          className="t-tag"
          style={{
            color: palette.foam,
            textDecoration: 'none',
            opacity: 0.6,
            marginBottom: 24,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            width: 'fit-content',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Past Editions
        </Link>

        <Pill variant="foam-outline" size="md">
          {event.status} · {event.date}
        </Pill>

        <h1
          style={{
            fontFamily: fonts.heading,
            fontSize: 'clamp(4.5rem, 12vw, 11rem)',
            lineHeight: 0.85,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            margin: '24px 0 16px',
          }}
        >
          {event.name.split(' ').map((word, i, arr) => (
            <span key={i} style={i === arr.length - 1 ? { color: palette.cupRed } : undefined}>
              {word}{i < arr.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>

        <p
          style={{
            fontSize: 19,
            opacity: 0.82,
            margin: 0,
            maxWidth: 640,
            lineHeight: 1.55,
            fontFamily: fonts.body,
          }}
        >
          {event.summary}
        </p>
      </div>
    </section>
  );
}
