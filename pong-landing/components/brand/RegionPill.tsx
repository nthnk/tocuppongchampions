import { CSSProperties } from 'react';
import { fonts } from '@/lib/theme';
import { regionOf } from '@/lib/regions';

export function RegionPill({
  neighbourhood,
  size = 'sm',
  style,
}: {
  neighbourhood: string;
  size?: 'xs' | 'sm' | 'md';
  style?: CSSProperties;
}) {
  const region = regionOf(neighbourhood);
  const sz =
    size === 'xs'
      ? { padding: '4px 10px', fontSize: 9, letterSpacing: '0.18em' }
      : size === 'md'
      ? { padding: '8px 16px', fontSize: 12, letterSpacing: '0.22em' }
      : { padding: '6px 12px', fontSize: 10, letterSpacing: '0.2em' };

  return (
    <span
      data-pill
      style={{
        display: 'inline-block',
        background: region.bg,
        color: region.fg,
        fontFamily: fonts.body,
        fontWeight: 700,
        textTransform: 'uppercase',
        whiteSpace: 'normal',
        wordBreak: 'normal',
        overflowWrap: 'anywhere',
        textAlign: 'center',
        lineHeight: 1.25,
        maxWidth: '100%',
        ...sz,
        ...style,
      }}
      title={`${region.label} Toronto`}
    >
      {neighbourhood}
    </span>
  );
}
