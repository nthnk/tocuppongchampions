'use client';

import Link from 'next/link';
import { palette, fonts } from '@/lib/theme';
import { SectionHeader } from '@/components/brand/Primitives';
import { RegionPill } from '@/components/brand/RegionPill';
import { Reveal } from '@/components/brand/Reveal';
import { EVENTS } from '@/lib/events';

const COL_TEMPLATE = '120px 1fr 1.3fr 220px 1.3fr 220px 1fr';

export function PastWinners() {
  return (
    <section
      id="winners"
      style={{
        background: palette.blackout,
        color: palette.foam,
        padding: 'clamp(72px, 10vw, 120px) clamp(16px, 4vw, 24px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 24,
              marginBottom: 40,
            }}
          >
            <SectionHeader
              tag="The Hall"
              headline="Past Winners"
              tone="on-dark"
            />
            <Link
              href="/winners"
              className="t-tag link-underline"
              style={{
                color: palette.cupRed,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              See All Champions
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>

        {/* Desktop table */}
        <Reveal delay={150} className="winners-table-desktop">
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: 1260, border: `2px solid rgba(255,251,236,0.2)` }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: COL_TEMPLATE,
                  alignItems: 'center',
                  padding: '14px 24px',
                  borderBottom: `2px solid rgba(255,251,236,0.2)`,
                  gap: 16,
                }}
                className="t-tag"
              >
                <span style={{ opacity: 0.55 }}>Date</span>
                <span style={{ opacity: 0.55 }}>Event</span>
                <span style={{ opacity: 0.55 }}>Champions</span>
                <span style={{ opacity: 0.55 }}>Neighbourhood</span>
                <span style={{ opacity: 0.55 }}>Runner-Up</span>
                <span style={{ opacity: 0.55 }}>Neighbourhood</span>
                <span style={{ opacity: 0.55 }}>Venue</span>
              </div>

              {EVENTS.map((e) => (
                <Link
                  key={e.slug}
                  href={`/events/${e.slug}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: COL_TEMPLATE,
                    alignItems: 'center',
                    padding: '24px 24px',
                    borderBottom: `1px solid rgba(255,251,236,0.1)`,
                    gap: 16,
                    color: 'inherit',
                    textDecoration: 'none',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={(el) => (el.currentTarget.style.background = 'rgba(240,11,31,0.08)')}
                  onMouseLeave={(el) => (el.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ fontFamily: fonts.body, fontSize: 14, opacity: 0.75, whiteSpace: 'nowrap' }}>
                    {e.date}
                  </span>
                  <span style={{ fontFamily: fonts.heading, fontSize: 20, textTransform: 'uppercase', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                    {e.name}
                  </span>
                  <DuoCell team={e.champion.team} members={e.champion.members} emphasized />
                  <span>
                    <RegionPill neighbourhood={e.champion.neighbourhood} size="xs" />
                  </span>
                  <DuoCell team={e.runnerUp.team} members={e.runnerUp.members} />
                  <span>
                    <RegionPill neighbourhood={e.runnerUp.neighbourhood} size="xs" />
                  </span>
                  <span style={{ fontFamily: fonts.body, fontSize: 13, opacity: 0.6 }}>
                    {e.venue.split(' / ')[0]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Mobile card stack */}
        <div className="winners-cards-mobile" style={{ gap: 14 }}>
          {EVENTS.map((e, idx) => (
            <Reveal key={e.slug} delay={120 + idx * 90}>
            <Link
              href={`/events/${e.slug}`}
              style={{
                display: 'block',
                color: 'inherit',
                textDecoration: 'none',
                border: '2px solid rgba(255,251,236,0.2)',
                borderTop: `4px solid ${palette.cupRed}`,
                padding: '18px 18px 20px',
                background: 'transparent',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 12,
                  marginBottom: 16,
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 22,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {e.name}
                </span>
                <span className="t-tag" style={{ opacity: 0.6 }}>{e.date}</span>
              </div>

              <MobileDuoBlock
                kicker="Champions"
                team={e.champion.team}
                members={e.champion.members}
                neighbourhood={e.champion.neighbourhood}
                emphasized
              />

              <div style={{ height: 16 }} />

              <MobileDuoBlock
                kicker="Runner-Up"
                team={e.runnerUp.team}
                members={e.runnerUp.members}
                neighbourhood={e.runnerUp.neighbourhood}
              />

              <div
                style={{
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: '1px solid rgba(255,251,236,0.12)',
                  fontFamily: fonts.body,
                  fontSize: 13,
                  opacity: 0.7,
                }}
              >
                <span style={{ opacity: 0.6 }}>Venue:</span> {e.venue.split(' / ')[0]}
              </div>
            </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p
            className="t-tag"
            style={{ marginTop: 24, opacity: 0.5, textAlign: 'center' }}
          >
            A new chapter is added with every event.
          </p>
        </Reveal>
      </div>

      <style jsx>{`
        .winners-table-desktop { display: none; }
        .winners-cards-mobile { display: grid; }
        @media (min-width: 900px) {
          .winners-table-desktop { display: block; }
          .winners-cards-mobile { display: none; }
        }
      `}</style>
    </section>
  );
}

function DuoCell({
  team,
  members,
  emphasized = false,
}: {
  team: string;
  members?: string;
  emphasized?: boolean;
}) {
  return (
    <span style={{ display: 'block', minWidth: 0 }}>
      <span
        style={{
          display: 'block',
          fontFamily: fonts.heading,
          fontSize: emphasized ? 18 : 16,
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          color: palette.foam,
          opacity: emphasized ? 1 : 0.9,
        }}
      >
        {team}
      </span>
      {members && (
        <span
          style={{
            display: 'block',
            fontFamily: fonts.body,
            fontSize: 12,
            opacity: 0.55,
            marginTop: 4,
          }}
        >
          {members}
        </span>
      )}
    </span>
  );
}

function MobileDuoBlock({
  kicker,
  team,
  members,
  neighbourhood,
  emphasized = false,
}: {
  kicker: string;
  team: string;
  members?: string;
  neighbourhood: string;
  emphasized?: boolean;
}) {
  return (
    <div>
      <div
        className="t-tag"
        style={{
          color: emphasized ? palette.cupRed : palette.foam,
          opacity: emphasized ? 1 : 0.55,
          marginBottom: 6,
          fontSize: 10,
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          fontFamily: fonts.heading,
          fontSize: emphasized ? 22 : 18,
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          marginBottom: members ? 6 : 10,
        }}
      >
        {team}
      </div>
      {members && (
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 13,
            opacity: 0.8,
            marginBottom: 10,
          }}
        >
          {members}
        </div>
      )}
      <RegionPill neighbourhood={neighbourhood} size="xs" />
    </div>
  );
}
