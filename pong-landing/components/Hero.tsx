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
      {/* Background - warm black */}
      <div
        className="absolute inset-0"
        style={{ background: palette.black }}
      />

      {/* Hero video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      >
        <source src="/landing-video.mp4" type="video/mp4" />
      </video>

      {/* Warm dark overlay with slight gradient */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${palette.black}50, ${palette.black}90)` }} />

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: palette.red }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        {/* Small tag above — social club feel */}
        <div
          className="mb-6"
          style={{
            opacity: scrollProgress * 0.6,
            transform: `translateY(${(1 - scrollProgress) * 20}px)`,
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
          }}
        >
          <span
            className="text-xs font-bold uppercase tracking-[0.4em]"
            style={{ fontFamily: fonts.body, color: palette.cream }}
          >
            Toronto&apos;s Beer Pong Community
          </span>
        </div>

        {/* Main headline — massive, editorial */}
        <h1
          className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[13rem] font-black tracking-tight mb-6"
          style={{
            fontFamily: fonts.heading,
            color: palette.cream,
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: 'opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s',
            lineHeight: 0.85,
          }}
        >
          <span style={{ color: palette.red }}>6</span>CUPS
        </h1>

        {/* Event tag — Table Zero bordered tag */}
        <div
          className="mb-10"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: 'opacity 0.4s ease-out 0.15s, transform 0.4s ease-out 0.15s',
          }}
        >
          <span
            className="inline-block text-sm sm:text-base font-bold uppercase tracking-[0.3em] px-5 py-2.5"
            style={{
              fontFamily: fonts.heading,
              color: palette.cream,
              border: `2px solid ${palette.red}`,
            }}
          >
            TABLE ZERO — APRIL 2026
          </span>
        </div>

        {/* Tagline — warmer, more human tone */}
        <p
          className="text-base sm:text-lg md:text-xl max-w-lg mx-auto mb-14 leading-relaxed"
          style={{
            fontFamily: fonts.body,
            color: palette.cream,
            opacity: scrollProgress * 0.7,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: 'opacity 0.4s ease-out 0.2s, transform 0.4s ease-out 0.2s',
          }}
        >
          32 teams. One bracket. A brewery in downtown Toronto.
        </p>

        {/* Stats row — cleaner, editorial */}
        <div
          className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 mb-14"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: 'opacity 0.4s ease-out 0.3s, transform 0.4s ease-out 0.3s',
          }}
        >
          {[
            { big: '32', small: 'Teams' },
            { big: '$10', small: 'Per Duo' },
            { big: 'APR', small: '2026' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-3xl sm:text-4xl font-black"
                style={{ fontFamily: fonts.heading, color: palette.red }}
              >
                {stat.big}
              </div>
              <div
                className="text-xs font-bold uppercase tracking-widest mt-1"
                style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.5 }}
              >
                {stat.small}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: 'opacity 0.4s ease-out 0.4s, transform 0.4s ease-out 0.4s',
          }}
        >
          <button
            onClick={scrollToWaitlist}
            className="inline-flex items-center gap-3 px-14 py-5 text-lg font-black uppercase tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              background: palette.red,
              color: palette.cream,
              fontFamily: fonts.heading,
              animation: 'pulse-red 3s ease-in-out infinite',
            }}
          >
            GET ON THE LIST
          </button>
        </div>

        {/* Location — subtle */}
        <div
          className="mt-10"
          style={{
            opacity: scrollProgress * 0.4,
            transform: `translateY(${(1 - scrollProgress) * 20}px)`,
            transition: 'opacity 0.4s ease-out 0.5s, transform 0.4s ease-out 0.5s',
          }}
        >
          <span
            className="text-xs font-bold tracking-[0.3em] uppercase"
            style={{ fontFamily: fonts.body, color: palette.cream }}
          >
            Downtown Toronto
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
