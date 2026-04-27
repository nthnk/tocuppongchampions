'use client';

import Link from 'next/link';
import { palette, fonts } from '@/lib/theme';
import { Pill } from '@/components/brand/Primitives';
import { Button } from '@/components/brand/Button';
import { Reveal } from '@/components/brand/Reveal';

export function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: 720,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: palette.blackout,
        color: palette.foam,
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6,
        }}
      >
        <source src="/landing-video.mp4" type="video/mp4" />
      </video>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.9))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: palette.cupRed,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1200,
          padding: 'clamp(96px, 12vw, 140px) clamp(20px, 5vw, 24px)',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Reveal delay={0} duration={600}>
          <div className="t-tag" style={{ opacity: 0.7, marginBottom: 16 }}>
            Toronto&apos;s Beer Pong Tournament
          </div>
        </Reveal>

        <Reveal delay={120} duration={700}>
          <h1
            style={{
              fontFamily: fonts.heading,
              fontSize: 'clamp(5rem, 14vw, 11rem)',
              lineHeight: 0.85,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              margin: 0,
              color: palette.foam,
            }}
          >
            <span style={{ color: palette.cupRed }}>6</span>CUPS
          </h1>
        </Reveal>

        <Reveal delay={260} duration={700}>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 20,
              opacity: 0.95,
              maxWidth: 640,
              margin: '32px auto 12px',
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            Come as you are &amp; join a game.
          </p>
        </Reveal>
        <Reveal delay={320} duration={700}>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16,
              opacity: 0.75,
              maxWidth: 580,
              margin: '0 auto 36px',
              lineHeight: 1.55,
            }}
          >
            Toronto&apos;s cup pong tournament series. Where strangers become friends.
          </p>
        </Reveal>

        <Reveal delay={360} duration={700}>
          <div style={{ marginBottom: 44 }}>
            <Pill variant="foam-outline" size="md">More Events Coming</Pill>
          </div>
        </Reveal>

        <Reveal delay={460} duration={700}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link href="https://www.instagram.com/play6cups" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="xl" pulse>Follow For The Drop</Button>
            </Link>
            <Link href="/events/table-zero">
              <Button variant="ghost-foam" size="xl">See The Last Event</Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
