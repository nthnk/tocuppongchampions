'use client';

import { palette, fonts } from '@/lib/theme';

const topItems = [
  '32 TEAMS',
  '$10 ENTRY',
  'APRIL 2026',
  'TORONTO',
  'BRACKET STYLE',
  'ONE CHAMPION',
];

const bottomItems = [
  'COME AS YOU ARE',
  'JOIN A GAME',
  'BEER PONG',
  'SOCIAL CLUB',
  'DOWNTOWN',
  'TABLE ZERO',
];

export function MarqueeTicker() {
  const repeatedTop = [...topItems, ...topItems, ...topItems, ...topItems];
  const repeatedBottom = [...bottomItems, ...bottomItems, ...bottomItems, ...bottomItems];

  return (
    <div style={{ background: palette.red }}>
      {/* Top row — scrolls left */}
      <div className="overflow-hidden" style={{ borderBottom: `1px solid rgba(255,255,255,0.15)` }}>
        <div
          className="flex items-center whitespace-nowrap py-3"
          style={{
            animation: 'marquee 25s linear infinite',
            fontFamily: fonts.heading,
            color: palette.cream,
          }}
        >
          {repeatedTop.map((item, i) => (
            <span
              key={i}
              className="text-sm font-bold uppercase tracking-widest flex items-center"
              style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
            >
              {item}
              <span className="ml-8" style={{ opacity: 0.4 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom row — scrolls right */}
      <div className="overflow-hidden">
        <div
          className="flex items-center whitespace-nowrap py-3"
          style={{
            animation: 'marquee-reverse 30s linear infinite',
            fontFamily: fonts.body,
            color: palette.cream,
            opacity: 0.85,
          }}
        >
          {repeatedBottom.map((item, i) => (
            <span
              key={i}
              className="text-xs font-bold uppercase tracking-[0.3em] flex items-center"
              style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
            >
              {item}
              <span className="ml-8" style={{ opacity: 0.3 }}>—</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
