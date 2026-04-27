'use client';

import Image from 'next/image';
import { palette, fonts } from '@/lib/theme';
import { SectionHeader } from '@/components/brand/Primitives';
import { Reveal } from '@/components/brand/Reveal';

const SPONSORS = [
  {
    src: '/samara_logo.png',
    name: 'Samara Brewing Co.',
    href: 'https://www.samarabrewing.com',
    photo: '/event_photos/nickel_9_2.jpg',
    role: 'Bar partner',
  },
  {
    src: '/nickel9_logo.png',
    name: 'Nickel 9 Distillery',
    href: 'https://www.nickel9distillery.com',
    photo: '/event_photos/nickel_9_1.jpg',
    role: 'Venue partner',
  },
  {
    src: '/stavs-corner-logo.svg',
    name: "Stav's Corner",
    href: 'https://www.instagram.com/chefstav.toronto/',
    photo: '/event_photos/nickel_9_3.jpg',
    role: 'Food partner',
  },
];

export function Sponsors() {
  return (
    <section
      style={{
        background: palette.foam,
        padding: 'clamp(64px, 9vw, 96px) clamp(16px, 4vw, 24px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionHeader
              tag="Past Partners"
              headline="In The Room With Us"
              align="center"
            />
            <p
              style={{
                maxWidth: 580,
                margin: '24px auto 0',
                opacity: 0.7,
                lineHeight: 1.55,
                fontFamily: fonts.body,
              }}
            >
              The venues &amp; sponsors who&apos;ve helped us pull these off.
            </p>
          </div>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {SPONSORS.map((s, i) => (
            <Reveal key={s.name} delay={120 + i * 100}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="lift"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                background: palette.blackout,
                borderTop: `4px solid ${palette.cupRed}`,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: 220 }}>
                <Image
                  src={s.photo}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover', opacity: 0.65 }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.2) 100%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 24,
                  }}
                >
                  <div
                    style={{
                      background: palette.foam,
                      padding: '14px 22px',
                      width: 200,
                      height: 96,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.src}
                      alt={s.name}
                      style={{
                        maxHeight: 76,
                        maxWidth: 168,
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ padding: '20px 22px 24px', color: palette.foam }}>
                <div className="t-tag" style={{ color: palette.cupRed, marginBottom: 8 }}>
                  {s.role}
                </div>
                <div
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 20,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.name}
                </div>
              </div>
            </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
