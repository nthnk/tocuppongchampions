'use client';

import { useEffect, useRef, ReactNode, useState } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({ children, speed = 0.1, className = '' }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only apply parallax when section is in or near viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Simple parallax: move based on scroll position relative to viewport center
        const centerY = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distanceFromCenter = centerY - viewportCenter;

        // Subtle parallax effect - negative speed means move opposite to scroll
        const parallaxOffset = distanceFromCenter * speed;

        setOffset(parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={sectionRef}
      className={`will-change-transform ${className}`}
      style={{
        transform: `translate3d(0, ${offset}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}
