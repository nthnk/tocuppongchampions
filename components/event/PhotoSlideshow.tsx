'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { palette, fonts } from '@/lib/theme';
import { SectionHeader } from '@/components/brand/Primitives';

type Photo = { src: string; tag?: string; caption?: string };

export function PhotoSlideshow({
  photos,
  autoplay = true,
  interval = 5000,
}: {
  photos: Photo[];
  autoplay?: boolean;
  interval?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!autoplay || paused) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % photos.length), interval);
    return () => clearTimeout(t);
  }, [idx, autoplay, paused, interval, photos.length]);

  return (
    <section
      style={{
        background: palette.blackout,
        color: palette.foam,
        padding: 'clamp(56px, 8vw, 88px) clamp(16px, 4vw, 24px)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 24,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <SectionHeader
            tag="From The Floor"
            headline="In Frame"
            tone="on-dark"
          />
          <div className="t-tag" style={{ opacity: 0.55, fontVariantNumeric: 'tabular-nums' }}>
            {String(idx + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
            background: palette.lager,
            border: `2px solid ${palette.cupRed}`,
          }}
        >
          {photos.map((p, i) => (
            <Image
              key={i}
              src={p.src}
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority={i === 0}
              style={{
                objectFit: 'contain',
                opacity: i === idx ? 1 : 0,
                transition: 'opacity 600ms cubic-bezier(0.2,0.8,0.2,1)',
              }}
            />
          ))}

          <div
            style={{
              position: 'absolute',
              right: 12,
              bottom: 12,
              display: 'flex',
              gap: 8,
            }}
          >
            <button
              onClick={() => setIdx((idx - 1 + photos.length) % photos.length)}
              aria-label="Previous"
              style={{
                width: 44,
                height: 44,
                background: 'rgba(0,0,0,0.7)',
                border: `2px solid ${palette.foam}`,
                color: palette.foam,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scaleX(-1)' }}>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button
              onClick={() => setIdx((idx + 1) % photos.length)}
              aria-label="Next"
              style={{
                width: 44,
                height: 44,
                background: palette.cupRed,
                border: `2px solid ${palette.cupRed}`,
                color: palette.foam,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))',
            gap: 6,
            marginTop: 12,
          }}
        >
          {photos.map((p, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to photo ${i + 1}`}
              style={{
                aspectRatio: '4/3',
                border: 0,
                padding: 0,
                cursor: 'pointer',
                background: palette.lager,
                position: 'relative',
                overflow: 'hidden',
                outline:
                  i === idx
                    ? `3px solid ${palette.cupRed}`
                    : `2px solid rgba(255,251,236,0.2)`,
                outlineOffset: -2,
              }}
            >
              <Image
                src={p.src}
                alt=""
                fill
                sizes="80px"
                style={{
                  objectFit: 'cover',
                  opacity: i === idx ? 1 : 0.55,
                  transition: 'opacity 200ms',
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
