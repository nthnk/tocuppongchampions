'use client';

import { useEffect, useRef, useState } from 'react';
import { palette, fonts } from '@/lib/theme';

export function Hero() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top + windowHeight * 0.5) / (windowHeight * 0.4))
      );

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - deep black */}
      <div
        className="absolute inset-0"
        style={{ background: palette.black }}
      />

      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${palette.red}08 0%, transparent 70%)`
        }}
      />

      {/* Hero video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/landing-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: `${palette.black}40` }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        {/* Main headline - TABLE ZERO */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6"
          style={{
            fontFamily: fonts.heading,
            color: palette.cream,
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: 'opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s',
            lineHeight: 0.9,
          }}
        >
          TABLE<br />
          <span style={{ color: palette.red }}>ZERO</span>
        </h1>

        {/* Tagline - moodboard style */}
        <div
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8"
          style={{
            fontFamily: fonts.heading,
            color: palette.cream,
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: 'opacity 0.4s ease-out 0.2s, transform 0.4s ease-out 0.2s',
          }}
        >
          <span style={{ color: palette.cream }}>32 Teams. </span>
          <span style={{ color: palette.cream }}>One Night. </span>
          <span style={{ color: palette.red }}>One Champion.</span>
        </div>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg md:text-xl mb-12 max-w-2xl mx-auto"
          style={{
            fontFamily: fonts.body,
            color: palette.cream,
            opacity: scrollProgress * 0.7,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: 'opacity 0.4s ease-out 0.3s, transform 0.4s ease-out 0.3s',
          }}
        >
          Building Toronto's largest cup pong tournament. Waitlist open now.
        </p>

        {/* Stats row */}
        <div
          className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-12"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: 'opacity 0.4s ease-out 0.4s, transform 0.4s ease-out 0.4s',
          }}
        >
          <div className="text-center">
            <div
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: fonts.heading, color: palette.cream }}
            >
              32
            </div>
            <div
              className="text-xs uppercase tracking-wider mt-1"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.5 }}
            >
              Teams
            </div>
          </div>
          <div className="text-center">
            <div
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: fonts.heading, color: palette.cream }}
            >
              $10
            </div>
            <div
              className="text-xs uppercase tracking-wider mt-1"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.5 }}
            >
              Per Duo
            </div>
          </div>
          <div className="text-center">
            <div
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: fonts.heading, color: palette.cream }}
            >
              March
            </div>
            <div
              className="text-xs uppercase tracking-wider mt-1"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.5 }}
            >
              2026
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToWaitlist}
          className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105"
          style={{
            background: palette.red,
            color: palette.cream,
            fontFamily: fonts.heading,
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: 'opacity 0.4s ease-out 0.5s, transform 0.4s ease-out 0.5s, scale 0.3s ease',
          }}
        >
          <span>Get on the List</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {/* Location badge */}
        <div
          className="mt-8"
          style={{
            opacity: scrollProgress * 0.5,
            transform: `translateY(${(1 - scrollProgress) * 20}px)`,
            transition: 'opacity 0.4s ease-out 0.6s, transform 0.4s ease-out 0.6s',
          }}
        >
          <span
            className="text-sm tracking-wider uppercase"
            style={{ fontFamily: fonts.body, color: palette.cream }}
          >
            TORONTO · VENUE TBD
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6" style={{ color: palette.cream, opacity: 0.3 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
