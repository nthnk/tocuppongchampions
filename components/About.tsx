'use client';

import { palette, fonts } from '@/lib/theme';
import { SectionHeader } from '@/components/brand/Primitives';
import { Reveal } from '@/components/brand/Reveal';

export function About() {
  return (
    <section
      id="about"
      style={{
        background: palette.foam,
        color: palette.blackout,
        padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 24px)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <SectionHeader
            tag="The Mission"
            headline={
              <>
                What is <span style={{ color: palette.cupRed }}>6CUPS</span>?
              </>
            }
          />
        </Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 56,
            marginTop: 56,
          }}
        >
          <Reveal delay={120}>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 22,
                lineHeight: 1.45,
                fontWeight: 500,
                margin: 0,
              }}
            >
              Beer pong gets a bad rap. People think house parties &amp; sticky floors. At its core, it&apos;s one of the most social games out there.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p style={{ margin: 0, opacity: 0.75, lineHeight: 1.65, fontSize: 17 }}>
              <strong style={{ color: palette.cupRed }}>6CUPS</strong> is changing the perception. We&apos;re growing cup pong into a real social activity. A reason to link up, meet new people, and compete over something everyone already knows how to play. Not a league. Just a community built around a game that&apos;s way more fun when it&apos;s done right.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
