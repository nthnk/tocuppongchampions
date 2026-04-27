'use client';

import Image from 'next/image';
import { palette, fonts } from '@/lib/theme';
import { SectionHeader } from '@/components/brand/Primitives';
import { Reveal } from '@/components/brand/Reveal';

export function Prizes({
  title,
  description,
  photos,
}: {
  title: string;
  description: string;
  photos: string[];
}) {
  return (
    <section
      style={{
        background: palette.foam,
        padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 24px)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <SectionHeader tag="The Spoils" headline="Champion Prizes" />
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
            gap: 'clamp(28px, 5vw, 56px)',
            alignItems: 'center',
            marginTop: 48,
          }}
          className="prizes-grid"
        >
          <Reveal>
            <div>
              <h3
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  margin: '0 0 16px',
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: 17,
                  lineHeight: 1.6,
                  opacity: 0.78,
                  margin: 0,
                }}
              >
                {description}
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: 14,
              }}
            >
              {photos.map((src) => (
                <div
                  key={src}
                  className="lift"
                  style={{
                    position: 'relative',
                    aspectRatio: '4/5',
                    overflow: 'hidden',
                    background: palette.lager,
                    border: `2px solid ${palette.blackout}`,
                  }}
                >
                  <Image
                    src={src}
                    alt="Champion prize"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 720px) {
          .prizes-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
