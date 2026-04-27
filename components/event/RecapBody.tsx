import { palette, fonts } from '@/lib/theme';

export function RecapBody({
  paragraphs,
  kicker = 'Recap',
  title = 'How It Played',
}: {
  paragraphs: string[];
  kicker?: string;
  title?: string;
}) {
  return (
    <section
      style={{
        background: palette.foam,
        padding: 'clamp(56px, 8vw, 96px) clamp(20px, 5vw, 24px)',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div
          className="t-tag"
          style={{ color: palette.cupRed, marginBottom: 16 }}
        >
          {kicker}
        </div>
        <h2
          style={{
            fontFamily: fonts.heading,
            fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            margin: '0 0 16px',
          }}
        >
          {title}
        </h2>
        <div
          style={{
            width: 64,
            height: 4,
            background: palette.cupRed,
            margin: '0 0 36px',
          }}
        />
        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              margin: '0 0 24px',
              fontFamily: fonts.body,
              fontSize: i === 0 ? 22 : 17,
              fontWeight: i === 0 ? 500 : 400,
              lineHeight: i === 0 ? 1.45 : 1.65,
              color: i === 0 ? palette.blackout : 'rgba(0,0,0,0.78)',
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
