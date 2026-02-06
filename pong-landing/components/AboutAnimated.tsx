'use client';

import { useEffect, useRef, useState } from 'react';
import { palette, fonts } from '@/lib/theme';
import Image from 'next/image';

export function AboutAnimated() {
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
    <section
      ref={sectionRef}
      id="about"
      className="overflow-hidden"
      style={{ background: palette.black }}
    >
      {/* WHAT IS 6CUPS — editorial manifesto section */}
      <div className="px-6" style={{ paddingTop: '160px', paddingBottom: '160px' }}>
        <div className="max-w-5xl mx-auto">
          {/* Kicker tag */}
          <div
            className="mb-8"
            style={{
              opacity: scrollProgress * 0.6,
              transform: `translateY(${(1 - scrollProgress) * 20}px)`,
              transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
            }}
          >
            <span
              className="text-xs font-bold uppercase tracking-[0.4em]"
              style={{ fontFamily: fonts.body, color: palette.red }}
            >
              The Mission
            </span>
          </div>

          {/* Big editorial heading */}
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-none"
            style={{
              fontFamily: fonts.heading,
              color: palette.cream,
              opacity: scrollProgress,
              transform: `translateY(${(1 - scrollProgress) * 30}px)`,
              transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
            }}
          >
            WHAT IS <span style={{ color: palette.red }}>6CUPS</span>?
          </h2>

          {/* Short red divider */}
          <div
            className="w-20 h-1 mb-14"
            style={{
              background: palette.red,
              opacity: scrollProgress,
              transform: `scaleX(${scrollProgress})`,
              transformOrigin: 'left',
              transition: 'opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s',
            }}
          />

          {/* Body copy — editorial, manifesto-like */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div
              style={{
                opacity: scrollProgress * 0.9,
                transform: `translateY(${(1 - scrollProgress) * 20}px)`,
                transition: 'opacity 0.4s ease-out 0.15s, transform 0.4s ease-out 0.15s',
              }}
            >
              <p
                className="text-xl md:text-2xl leading-relaxed font-medium mb-8"
                style={{
                  fontFamily: fonts.body,
                  color: palette.cream,
                }}
              >
                Beer pong gets a bad rap. People think frat houses and sticky floors. But at its core, it&apos;s one of the most social games out there.
              </p>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{
                  fontFamily: fonts.body,
                  color: palette.cream,
                  opacity: 0.7,
                }}
              >
                Easy to learn, fun to watch, and it brings strangers together. Everyone has a memory of it. We think that&apos;s worth building on.
              </p>
            </div>

            <div
              style={{
                opacity: scrollProgress * 0.85,
                transform: `translateY(${(1 - scrollProgress) * 25}px)`,
                transition: 'opacity 0.4s ease-out 0.25s, transform 0.4s ease-out 0.25s',
              }}
            >
              <p
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{
                  fontFamily: fonts.body,
                  color: palette.cream,
                  opacity: 0.8,
                }}
              >
                <span className="font-bold" style={{ color: palette.red }}>6CUPS</span> is here to change the perception. We&apos;re growing beer pong into a real social activity — a reason to link up, meet new people, and compete over something everyone already knows how to play.
              </p>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{
                  fontFamily: fonts.body,
                  color: palette.cream,
                  opacity: 0.6,
                }}
              >
                Two tournaments each year and pop-ups across Toronto. Not a league. Just a community built around a game that never needed to be this serious — but is way more fun when it is.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Zero section — full-bleed photo with content overlay */}
      <div
        className="relative overflow-hidden"
        style={{ paddingTop: '140px', paddingBottom: '140px' }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/people_playing_2.jpg"
            alt="Beer pong action"
            fill
            className="object-cover"
          />
          {/* Warm gradient overlay — less harsh */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${palette.black}b0, ${palette.black}c5, ${palette.black}b8)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Kicker */}
          <div className="text-center mb-4" style={{ opacity: scrollProgress * 0.5 }}>
            <span
              className="text-xs font-bold uppercase tracking-[0.4em]"
              style={{ fontFamily: fonts.body, color: palette.cream }}
            >
              First Event
            </span>
          </div>

          <div className="text-center mb-16">
            <h3
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-5 uppercase tracking-wide"
              style={{
                fontFamily: fonts.heading,
                color: palette.cream,
                opacity: scrollProgress,
                transform: `translateY(${(1 - scrollProgress) * 20}px)`,
                transition: 'opacity 0.4s ease-out 0.3s, transform 0.4s ease-out 0.3s',
              }}
            >
              TABLE <span style={{ color: palette.red }}>ZERO</span>
            </h3>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto"
              style={{
                fontFamily: fonts.body,
                color: palette.cream,
                opacity: scrollProgress * 0.7,
                transform: `translateY(${(1 - scrollProgress) * 20}px)`,
                transition: 'opacity 0.4s ease-out 0.35s, transform 0.4s ease-out 0.35s',
              }}
            >
              The first official 6CUPS tournament. Up to 32 teams. A brewery in downtown Toronto. April 2026.
            </p>
          </div>

          {/* How to get in */}
          <div
            className="mb-8"
            style={{
              opacity: scrollProgress,
              transition: 'opacity 0.4s ease-out 0.38s',
            }}
          >
            <h4
              className="text-center text-xs font-bold uppercase tracking-[0.4em] mb-10"
              style={{ fontFamily: fonts.heading, color: palette.red }}
            >
              How To Get In
            </h4>
          </div>

          <div
            className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            style={{
              opacity: scrollProgress,
              transform: `translateY(${(1 - scrollProgress) * 30}px)`,
              transition: 'opacity 0.4s ease-out 0.4s, transform 0.4s ease-out 0.4s',
            }}
          >
            {[
              {
                number: '01',
                title: 'JOIN THE WAITLIST',
                description: 'Sign up below. Once we lock in a venue and date, we\'ll open registration.',
              },
              {
                number: '02',
                title: 'GET CONFIRMED',
                description: 'We\'ll reach out to confirm your spot and share all the event details.',
              },
            ].map((step, index) => (
              <div
                key={index}
                className="p-8 text-center"
                style={{
                  background: `${palette.black}c0`,
                  borderTop: `3px solid ${palette.red}`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  className="text-4xl md:text-5xl font-black mb-3"
                  style={{ fontFamily: fonts.heading, color: palette.red }}
                >
                  {step.number}
                </div>
                <h3
                  className="text-base font-black mb-2 uppercase tracking-wider"
                  style={{ fontFamily: fonts.heading, color: palette.cream }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.6 }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
