'use client';

import Image from 'next/image';
import { palette, fonts } from '@/lib/theme';
import { SectionHeader } from '@/components/brand/Primitives';
import { Button } from '@/components/brand/Button';
import { Reveal } from '@/components/brand/Reveal';

export function Location() {
  return (
    <section
      id="location"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 24px)',
        overflow: 'hidden',
        color: palette.foam,
        textAlign: 'center',
      }}
    >
      <Image
        src="/event_photos/tz-13.jpg"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 760, margin: '0 auto' }}>
        <Reveal>
          <SectionHeader
            tag="Where We Play"
            headline="Toronto For Now."
            align="center"
            tone="on-dark"
          />
        </Reveal>
        <Reveal delay={120}>
          <p
            style={{
              marginTop: 32,
              marginBottom: 28,
              fontSize: 17,
              lineHeight: 1.6,
              opacity: 0.85,
              fontFamily: fonts.body,
            }}
          >
            We host at distilleries, breweries, and other venues around the city. Each event picks a different room to keep things fresh.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <p
            style={{
              opacity: 0.65,
              margin: '0 auto 36px',
              maxWidth: 520,
              lineHeight: 1.55,
              fontFamily: fonts.body,
            }}
          >
            Other cities are on the roadmap. If you&apos;d like to bring 6CUPS to yours, get in touch.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <a
            href="https://www.instagram.com/play6cups"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Button variant="primary" size="lg">Follow For The Drop</Button>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
