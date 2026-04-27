'use client';

import { palette, fonts } from '@/lib/theme';
import { Star } from '@/components/brand/Primitives';

const ITEMS = [
  'COME AS YOU ARE',
  'JOIN A GAME',
  'GAMES ★ DRINKS ★ COMMUNITY',
  'WHERE STRANGERS BECOME FRIENDS',
  'TORONTO',
  '6CUPS',
];

export function MarqueeTicker({
  variant = 'red',
  speed = 30,
}: {
  variant?: 'red' | 'ink' | 'foam';
  speed?: number;
}) {
  const v =
    variant === 'red'
      ? { bg: palette.cupRed, fg: palette.foam }
      : variant === 'ink'
      ? { bg: palette.blackout, fg: palette.foam }
      : { bg: palette.foam, fg: palette.blackout };

  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div style={{ background: v.bg, color: v.fg, overflow: 'hidden', padding: '14px 0' }}>
      <div
        style={{
          whiteSpace: 'nowrap',
          animation: `marquee ${speed}s linear infinite`,
          fontFamily: fonts.heading,
          fontSize: 22,
          lineHeight: 1,
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          willChange: 'transform',
        }}
      >
        {repeated.map((item, i) => (
          <span key={i} style={{ display: 'inline-block' }}>
            {item}
            <Star color={v.fg} size="0.85em" />
          </span>
        ))}
      </div>
    </div>
  );
}
