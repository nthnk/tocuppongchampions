'use client';

import Image from 'next/image';
import Link from 'next/link';
import { palette, fonts } from '@/lib/theme';
import { RegionPill } from '@/components/brand/RegionPill';
import type { EventCanon } from '@/lib/events';

export function ChampionTile({ event }: { event: EventCanon }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: palette.foam,
        background: palette.blackout,
        position: 'relative',
        borderTop: `4px solid ${palette.cupRed}`,
        overflow: 'hidden',
        transition: 'transform 200ms',
      }}
      onMouseEnter={(el) => (el.currentTarget.style.transform = 'translateY(-4px)')}
      onMouseLeave={(el) => (el.currentTarget.style.transform = '')}
    >
      <div style={{ position: 'relative', height: 220 }}>
        <Image
          src={event.cover}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover', opacity: 0.55 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.92) 30%, rgba(0,0,0,0.2) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            right: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            color: palette.foam,
            gap: 8,
          }}
        >
          <span className="t-tag" style={{ color: palette.cupRed }}>
            {event.status}
          </span>
          <span className="t-tag" style={{ color: palette.foam, opacity: 0.7 }}>
            {event.shortDate}
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 20,
            right: 20,
            bottom: 16,
            color: palette.foam,
          }}
        >
          <div
            style={{
              fontFamily: fonts.heading,
              fontSize: 32,
              textTransform: 'uppercase',
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
            }}
          >
            {event.name}
          </div>
        </div>
      </div>
      <div
        style={{
          padding: '24px 24px 28px',
          color: palette.foam,
          background: palette.blackout,
        }}
      >
        <div className="t-tag" style={{ color: palette.cupRed, marginBottom: 12 }}>
          Champion Duo
        </div>
        <div
          style={{
            fontFamily: fonts.heading,
            fontSize: 28,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            lineHeight: 1,
            marginBottom: 10,
          }}
        >
          {event.champion.team}
        </div>
        <div style={{ marginBottom: 10 }}>
          <RegionPill neighbourhood={event.champion.neighbourhood} size="xs" />
        </div>
        <p style={{ fontFamily: fonts.body, fontSize: 14, opacity: 0.78, margin: 0 }}>
          {event.champion.members}
        </p>
        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid rgba(255,251,236,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontFamily: fonts.body, fontSize: 13, opacity: 0.55 }}>
            Runner-up: {event.runnerUp.team}
          </span>
          <span
            className="t-tag"
            style={{
              color: palette.cupRed,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            See Page
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
