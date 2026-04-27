import { palette, fonts } from '@/lib/theme';
import { SectionHeader } from '@/components/brand/Primitives';
import { RegionPill } from '@/components/brand/RegionPill';
import type { Standing } from '@/lib/events';

export function Leaderboard({
  rows,
  title = 'Final Standings',
  tag = 'Results',
}: {
  rows: Standing[];
  title?: string;
  tag?: string;
}) {
  return (
    <section style={{ background: palette.foam, padding: 'clamp(56px, 8vw, 88px) clamp(16px, 4vw, 24px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader tag={tag} headline={title} />
        <div style={{ overflowX: 'auto', marginTop: 48 }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: fonts.body,
              minWidth: 720,
            }}
          >
            <thead>
              <tr style={{ borderBottom: `3px solid ${palette.blackout}` }}>
                {['#', 'Team', 'Members', 'Neighbourhood', 'Result'].map((h, i) => (
                  <th
                    key={i}
                    className="t-tag"
                    style={{
                      textAlign: i === 0 ? 'center' : 'left',
                      padding: '14px 12px',
                      color: palette.blackout,
                      opacity: 0.6,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const isPodium = r.rank <= 3;
                const accent =
                  r.rank === 1 ? palette.cupRed : r.rank === 2 ? palette.blackout : palette.lager;
                return (
                  <tr
                    key={i}
                    style={{
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      background: isPodium ? 'rgba(240,11,31,0.04)' : 'transparent',
                    }}
                  >
                    <td
                      style={{
                        padding: '18px 12px',
                        textAlign: 'center',
                        position: 'relative',
                      }}
                    >
                      {isPodium && (
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 6,
                            bottom: 6,
                            width: 4,
                            background: accent,
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontFamily: fonts.heading,
                          fontSize: 26,
                          color: isPodium ? accent : palette.blackout,
                          opacity: isPodium ? 1 : 0.4,
                        }}
                      >
                        {String(r.rank).padStart(2, '0')}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: '18px 12px',
                        fontFamily: fonts.heading,
                        textTransform: 'uppercase',
                        fontSize: 18,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {r.team}
                    </td>
                    <td
                      style={{
                        padding: '18px 12px',
                        fontSize: 14,
                        opacity: 0.7,
                      }}
                    >
                      {r.members || '·'}
                    </td>
                    <td style={{ padding: '18px 12px' }}>
                      <RegionPill neighbourhood={r.neighbourhood} size="xs" />
                    </td>
                    <td
                      style={{
                        padding: '18px 12px',
                        fontFamily: fonts.body,
                        fontWeight: 700,
                        fontSize: 13,
                        color: isPodium ? palette.cupRed : palette.blackout,
                        opacity: isPodium ? 1 : 0.55,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {r.result}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
