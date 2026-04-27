'use client';

import { ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';
import { palette, fonts } from '@/lib/theme';

type Variant = 'primary' | 'inverse' | 'foam' | 'ghost-ink' | 'ghost-red' | 'ghost-foam';
type Size = 'sm' | 'md' | 'lg' | 'xl';

const sizes: Record<Size, CSSProperties> = {
  sm: { padding: '10px 18px', fontSize: 12, letterSpacing: '0.22em' },
  md: { padding: '14px 26px', fontSize: 14, letterSpacing: '0.2em' },
  lg: { padding: '18px 36px', fontSize: 16, letterSpacing: '0.2em' },
  xl: { padding: '22px 44px', fontSize: 18, letterSpacing: '0.22em' },
};

const variants: Record<Variant, CSSProperties> = {
  primary:      { background: palette.cupRed,   color: palette.foam,     border: 'none' },
  inverse:      { background: palette.blackout, color: palette.foam,     border: 'none' },
  foam:         { background: palette.foam,     color: palette.blackout, border: 'none' },
  'ghost-ink':  { background: 'transparent',    color: palette.blackout, border: `2px solid ${palette.blackout}` },
  'ghost-red':  { background: 'transparent',    color: palette.cupRed,   border: `2px solid ${palette.cupRed}` },
  'ghost-foam': { background: 'transparent',    color: palette.foam,     border: `2px solid ${palette.foam}` },
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  pulse?: boolean;
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  pulse,
  style,
  ...rest
}: Props) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: fonts.heading,
        fontWeight: 700,
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'transform 150ms, opacity 150ms',
        animation: pulse ? 'pulse-red 3s ease-in-out infinite' : undefined,
        ...sizes[size],
        ...variants[variant],
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = '')}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.92')}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.opacity = '';
      }}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
