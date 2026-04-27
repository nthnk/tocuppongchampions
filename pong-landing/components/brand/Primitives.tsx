import { CSSProperties, ReactNode } from 'react';
import { palette, fonts } from '@/lib/theme';

/* ---------- Star divider ---------- */
export function Star({
  color = palette.cupRed,
  size = '0.9em',
}: { color?: string; size?: string | number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        color,
        display: 'inline-block',
        margin: '0 0.4em',
        transform: 'translateY(-0.08em)',
        fontSize: size,
        fontFamily: fonts.heading,
      }}
    >
      ★
    </span>
  );
}

/* ---------- Pill outline tag ---------- */
type PillVariant = 'red-outline' | 'ink-outline' | 'foam-outline' | 'red-filled' | 'ink-filled';
type PillSize = 'sm' | 'md' | 'lg';

const pillSizes: Record<PillSize, CSSProperties> = {
  sm: { padding: '7px 16px', fontSize: 11, letterSpacing: '0.22em' },
  md: { padding: '10px 22px', fontSize: 12, letterSpacing: '0.25em' },
  lg: { padding: '12px 28px', fontSize: 14, letterSpacing: '0.25em' },
};

const pillVariants: Record<PillVariant, CSSProperties> = {
  'red-outline':  { background: 'transparent', color: palette.cupRed,   border: `1.5px solid ${palette.cupRed}` },
  'ink-outline':  { background: 'transparent', color: palette.blackout, border: `1.5px solid ${palette.blackout}` },
  'foam-outline': { background: 'transparent', color: palette.foam,     border: `1.5px solid ${palette.foam}` },
  'red-filled':   { background: palette.cupRed,   color: palette.foam,  border: `1.5px solid ${palette.cupRed}` },
  'ink-filled':   { background: palette.blackout, color: palette.foam,  border: `1.5px solid ${palette.blackout}` },
};

export function Pill({
  children,
  variant = 'red-outline',
  size = 'md',
  style,
}: {
  children: ReactNode;
  variant?: PillVariant;
  size?: PillSize;
  style?: CSSProperties;
}) {
  return (
    <span
      data-pill
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: fonts.body,
        fontWeight: 700,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        ...pillSizes[size],
        ...pillVariants[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ---------- Ping-pong ball badge ---------- */
type BallVariant = 'foam' | 'red' | 'ink';
const ballVariants: Record<BallVariant, { background: string; border: string; main: string; sub: string }> = {
  foam: { background: palette.foam,     border: `3px solid ${palette.cupRed}`,   main: palette.cupRed, sub: palette.blackout },
  red:  { background: palette.cupRed,   border: `3px solid ${palette.blackout}`, main: palette.foam,   sub: palette.foam },
  ink:  { background: palette.blackout, border: `3px solid ${palette.cupRed}`,   main: palette.cupRed, sub: palette.foam },
};

export type BallLine = string | { text: string; emphasis?: 'small' | 'large' };

export function BallBadge({
  lines,
  size = 200,
  variant = 'foam',
  style,
}: {
  lines: BallLine[];
  size?: number;
  variant?: BallVariant;
  style?: CSSProperties;
}) {
  const v = ballVariants[variant];

  // Defaults: first line is the "headline" (large, main colour),
  // additional lines are sub-text (smaller, sub colour, wider tracking).
  // Override per line with { emphasis: 'small' | 'large' }.
  return (
    <div
      data-ball
      style={{
        width: size,
        height: size,
        background: v.background,
        border: v.border,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: size * 0.1,
        boxSizing: 'border-box',
        flexShrink: 0,
        gap: size * 0.03,
        ...style,
      }}
    >
      {lines.map((raw, i) => {
        const item = typeof raw === 'string' ? { text: raw } : raw;
        const emphasis: 'small' | 'large' =
          item.emphasis ?? (i === 0 ? 'large' : 'small');
        const isLarge = emphasis === 'large';
        return (
          <div
            key={i}
            style={{
              fontFamily: fonts.heading,
              textTransform: 'uppercase',
              color: isLarge ? v.main : v.sub,
              fontSize: isLarge ? size * 0.18 : size * 0.07,
              letterSpacing: isLarge ? '-0.01em' : '0.2em',
              lineHeight: 1,
            }}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Section header (tag → headline → red rule) ---------- */
export function SectionHeader({
  tag,
  headline,
  align = 'left',
  tone = 'on-foam',
}: {
  tag?: string;
  headline: ReactNode;
  align?: 'left' | 'center';
  tone?: 'on-foam' | 'on-dark' | 'on-red';
}) {
  const colors =
    tone === 'on-dark'
      ? { tag: palette.cupRed, head: palette.foam, rule: palette.cupRed }
      : tone === 'on-red'
      ? { tag: palette.foam, head: palette.foam, rule: palette.foam }
      : { tag: palette.cupRed, head: palette.blackout, rule: palette.cupRed };

  return (
    <div style={{ textAlign: align }}>
      {tag && (
        <div className="t-tag" style={{ color: colors.tag, marginBottom: 12 }}>
          {tag}
        </div>
      )}
      <h2
        style={{
          color: colors.head,
          margin: 0,
          fontFamily: fonts.heading,
          fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
          textTransform: 'uppercase',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
        }}
      >
        {headline}
      </h2>
      <div
        style={{
          width: 64,
          height: 4,
          background: colors.rule,
          marginTop: 20,
          marginLeft: align === 'center' ? 'auto' : 0,
          marginRight: align === 'center' ? 'auto' : 0,
        }}
      />
    </div>
  );
}

/* ---------- Repeating wordmark pattern (background) ---------- */
export function WordmarkPattern({
  word = '6CUPS',
  divider = '★',
  rotate = -8,
  rows = 7,
  color = palette.foam,
  bg = palette.cupRed,
}: {
  word?: string;
  divider?: string;
  rotate?: number;
  rows?: number;
  color?: string;
  bg?: string;
}) {
  const line = Array.from({ length: 6 }, (_, i) => (
    <span key={i}>
      {word}
      <span style={{ display: 'inline-block', margin: '0 18px', transform: 'translateY(-0.1em)' }}>
        {divider}
      </span>
    </span>
  ));
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: bg,
        color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ transform: `rotate(${rotate}deg) scale(1.4)`, transformOrigin: 'center' }}>
        {Array.from({ length: rows }, (_, r) => (
          <div
            key={r}
            style={{
              fontFamily: fonts.heading,
              textTransform: 'uppercase',
              fontSize: 'clamp(40px, 6vw, 84px)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
              padding: '6px 0',
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
