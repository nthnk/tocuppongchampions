import { palette, fonts } from '@/lib/theme';

type Stat = { value: string; label: string };

export function StatBar({ stats, tone = 'dark' }: { stats: Stat[]; tone?: 'dark' | 'red' }) {
  const isDark = tone === 'dark';
  return (
    <section
      style={{
        background: isDark ? palette.blackout : palette.cupRed,
        color: palette.foam,
        padding: 'clamp(40px, 6vw, 64px) clamp(16px, 4vw, 24px)',
        borderTop: `3px solid ${palette.cupRed}`,
        borderBottom: `3px solid ${palette.cupRed}`,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`,
          gap: 24,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              textAlign: 'center',
              padding: '0 12px',
            }}
          >
            <div
              style={{
                fontFamily: fonts.heading,
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                color: isDark ? palette.cupRed : palette.foam,
                lineHeight: 0.95,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {s.value}
            </div>
            <div className="t-tag" style={{ marginTop: 10, opacity: 0.7 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
