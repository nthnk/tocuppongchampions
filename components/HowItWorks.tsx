'use client';

import Image from 'next/image';
import { palette, fonts } from '@/lib/theme';
import { SectionHeader } from '@/components/brand/Primitives';
import { Reveal } from '@/components/brand/Reveal';

const STEPS = [
  {
    n: '01',
    t: 'We Drop A New Event',
    d: 'Each event is its own thing, with its own name, venue, and bracket. Watch our socials for the announcement.',
  },
  {
    n: '02',
    t: 'You Sign Up With A Duo',
    d: 'Two players per team. $10 a duo. Spots are limited so we usually fill quickly once registration opens.',
  },
  {
    n: '03',
    t: 'Show Up & Play',
    d: 'Check in, grab a drink, jump into bracket play. Win or lose, the room is the point.',
  },
];

export function HowItWorks() {
  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 24px)',
        overflow: 'hidden',
        background: palette.blackout,
        color: palette.foam,
      }}
    >
      <Image
        src="/event_photos/tz-08.jpg"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', opacity: 0.7 }}
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
        <Reveal>
          <SectionHeader
            tag="How It Works"
            headline={
              <>
                Sign Up. Show Up. <span style={{ color: palette.cupRed }}>Compete.</span>
              </>
            }
            align="center"
            tone="on-dark"
          />
        </Reveal>
        <Reveal delay={120}>
          <p
            style={{
              marginTop: 28,
              marginBottom: 64,
              fontSize: 18,
              opacity: 0.75,
              maxWidth: 580,
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.55,
            }}
          >
            6CUPS runs cup pong tournaments throughout the year. Here&apos;s how a typical event goes when one is on the calendar.
          </p>
        </Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
            maxWidth: 880,
            margin: '0 auto',
          }}
        >
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={200 + i * 120}>
              <div
                className="lift"
                style={{
                  background: 'rgba(0,0,0,0.7)',
                  borderTop: `3px solid ${palette.cupRed}`,
                  padding: '32px 24px',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 44,
                    color: palette.cupRed,
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    letterSpacing: '0.18em',
                    margin: '14px 0 8px',
                    fontFamily: fonts.heading,
                    textTransform: 'uppercase',
                  }}
                >
                  {s.t}
                </h3>
                <p style={{ margin: 0, opacity: 0.7, fontSize: 14, lineHeight: 1.55 }}>
                  {s.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
