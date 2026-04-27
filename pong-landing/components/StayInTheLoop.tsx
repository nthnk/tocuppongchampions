'use client';

import Link from 'next/link';
import { palette, fonts } from '@/lib/theme';
import { Button } from '@/components/brand/Button';
import { WordmarkPattern } from '@/components/brand/Primitives';
import { Reveal } from '@/components/brand/Reveal';

export function StayInTheLoop() {
  return (
    <section
      id="register"
      style={{
        position: 'relative',
        background: palette.cupRed,
        color: palette.foam,
        padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 24px)',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
        <WordmarkPattern bg={palette.cupRed} color={palette.foam} rows={9} rotate={-10} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 760, margin: '0 auto' }}>
        <Reveal>
          <div className="t-tag" style={{ opacity: 0.85, marginBottom: 16 }}>
            Lock It In
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: 'clamp(2.75rem, 7vw, 6rem)',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              margin: '0 0 12px',
            }}
          >
            Come as you are.
          </h2>
        </Reveal>
        <Reveal delay={220}>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: 'clamp(2.75rem, 7vw, 6rem)',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              margin: '0 0 36px',
            }}
          >
            Join a game.
          </h2>
        </Reveal>
        <Reveal delay={320}>
          <p
            style={{
              fontSize: 18,
              opacity: 0.92,
              marginBottom: 36,
              maxWidth: 520,
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.55,
            }}
          >
            We&apos;re putting the next event together. Follow @play6cups so you don&apos;t miss the drop.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link href="https://www.instagram.com/play6cups" target="_blank" rel="noopener noreferrer">
              <Button variant="inverse" size="xl">Follow @play6cups</Button>
            </Link>
            <Link href="mailto:info@tocuppongchampions.ca">
              <Button variant="ghost-foam" size="xl">Email Us</Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
