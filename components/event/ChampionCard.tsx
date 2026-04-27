import { palette, fonts } from '@/lib/theme';
import { BallBadge } from '@/components/brand/Primitives';
import { RegionPill } from '@/components/brand/RegionPill';
import type { EventCanon } from '@/lib/events';

export function ChampionCard({ event }: { event: EventCanon }) {
  return (
    <section
      style={{
        background: palette.cupRed,
        color: palette.foam,
        padding: 'clamp(56px, 8vw, 88px) clamp(20px, 5vw, 24px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(28px, 5vw, 48px)',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <div
          style={{
            flexShrink: 0,
            animation: 'drop-in 700ms cubic-bezier(0.16,1,0.3,1) both, ball-bob 6s ease-in-out 800ms infinite',
          }}
        >
          <BallBadge
            size={200}
            variant="foam"
            lines={[
              { text: 'Champion', emphasis: 'small' },
              { text: event.champion.team, emphasis: 'large' },
              { text: `${event.name} ${event.shortDate.split(' / ')[1]}`, emphasis: 'small' },
            ]}
          />
        </div>
        <div style={{ flex: '1 1 280px', minWidth: 0 }}>
          <div className="t-tag" style={{ opacity: 0.85, marginBottom: 14 }}>
            {event.name} · {event.date}
          </div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: 'clamp(2.25rem, 6vw, 5rem)',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              margin: '0 0 16px',
              wordBreak: 'break-word',
            }}
          >
            {event.champion.team}
          </h2>
          <div style={{ marginBottom: 14 }}>
            <RegionPill neighbourhood={event.champion.neighbourhood} size="sm" />
          </div>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 18,
              opacity: 0.95,
              margin: '0 0 8px',
            }}
          >
            {event.champion.members}
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 14,
              opacity: 0.78,
              margin: 0,
            }}
          >
            Runner-up: <strong>{event.runnerUp.team}</strong>
            {event.runnerUp.members ? ` · ${event.runnerUp.members}` : ''} · {event.runnerUp.neighbourhood}
          </p>
        </div>
      </div>
    </section>
  );
}
