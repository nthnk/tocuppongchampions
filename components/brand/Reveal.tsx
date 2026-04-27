'use client';

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

type Direction = 'up' | 'left' | 'right' | 'fade';

const offsetFor: Record<Direction, string> = {
  up: 'translate3d(0, 28px, 0)',
  left: 'translate3d(-28px, 0, 0)',
  right: 'translate3d(28px, 0, 0)',
  fade: 'translate3d(0, 0, 0)',
};

export function Reveal({
  children,
  delay = 0,
  duration = 700,
  direction = 'up',
  threshold = 0.15,
  as: As = 'div',
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  threshold?: number;
  as?: 'div' | 'section' | 'span' | 'li' | 'article';
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <As
      ref={ref as never}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translate3d(0, 0, 0)' : offsetFor[direction],
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </As>
  );
}
