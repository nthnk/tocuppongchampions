import { palette, fonts } from '@/lib/theme';
import { SectionHeader } from '@/components/brand/Primitives';
import { regionOf } from '@/lib/regions';
import type { BracketRound } from '@/lib/events';

export function Bracket({
  rounds,
  title = 'How It Played Out',
  tag = 'Bracket',
}: {
  rounds: BracketRound[];
  title?: string;
  tag?: string;
}) {
  return (
    <section
      style={{
        background: palette.blackout,
        color: palette.foam,
        padding: 'clamp(56px, 8vw, 88px) clamp(16px, 4vw, 24px)',
        overflowX: 'auto',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <SectionHeader tag={tag} headline={title} tone="on-dark" />

        <div
          style={{
            display: 'flex',
            gap: 24,
            marginTop: 48,
            minWidth: 1100,
          }}
        >
          {rounds.map((round, ri) => {
            const isFinal = ri === rounds.length - 1;
            return (
              <div
                key={ri}
                style={{
                  flex: 1,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  gap: 14,
                  minHeight: 520,
                }}
              >
                <div
                  className="t-tag"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    color: palette.cupRed,
                  }}
                >
                  {round.label}
                </div>
                {round.matches.map((m, mi) => (
                  <MatchCard key={mi} match={m} highlightWinner={isFinal} />
                ))}
              </div>
            );
          })}
        </div>

        <RegionLegend />
      </div>
    </section>
  );
}

function MatchCard({
  match,
  highlightWinner,
}: {
  match: BracketRound['matches'][number];
  highlightWinner: boolean;
}) {
  return (
    <div
      style={{
        border: '2px solid rgba(255,251,236,0.18)',
        background: highlightWinner ? 'rgba(240,11,31,0.06)' : 'transparent',
      }}
    >
      {[match.a, match.b].map((team, ti) => {
        const isWinner = match.winner === ti;
        const region = team.neighbourhood ? regionOf(team.neighbourhood) : null;
        return (
          <div
            key={ti}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 14px',
              gap: 8,
              background: isWinner && region ? region.bg : 'transparent',
              color: isWinner && region ? region.fg : palette.foam,
              borderBottom: ti === 0 ? '1px solid rgba(255,251,236,0.18)' : 'none',
              opacity: isWinner ? 1 : 0.5,
            }}
          >
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 13,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {team.name}
              </div>
              {team.neighbourhood && (
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 10,
                    letterSpacing: '0.05em',
                    marginTop: 4,
                    opacity: isWinner ? 0.85 : 0.7,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {team.neighbourhood}
                </div>
              )}
            </div>
            {team.score !== undefined && (
              <span
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 20,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {team.score}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function RegionLegend() {
  const items = [
    { label: 'North West', n: 'Weston' },
    { label: 'North East', n: 'Milliken' },
    { label: 'South West', n: 'Long Branch' },
    { label: 'South East', n: 'St. Lawrence Market' },
  ];
  return (
    <div
      style={{
        marginTop: 48,
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        justifyContent: 'center',
        opacity: 0.85,
      }}
    >
      <span className="t-tag" style={{ opacity: 0.55, alignSelf: 'center' }}>
        Region Colours
      </span>
      {items.map((i) => {
        const r = regionOf(i.n);
        return (
          <span
            key={i.label}
            style={{
              background: r.bg,
              color: r.fg,
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '6px 12px',
            }}
          >
            {i.label}
          </span>
        );
      })}
    </div>
  );
}
