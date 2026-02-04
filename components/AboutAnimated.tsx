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
      className="px-6 overflow-hidden"
      style={{ background: palette.black, borderTop: `1px solid ${palette.slate}`, paddingTop: '166px', paddingBottom: '166px' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* What is 6cups */}
        <div className="text-center mb-20" style={{ marginBottom: '180px' }}>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{
              fontFamily: fonts.heading,
              color: palette.cream,
              opacity: scrollProgress,
              transform: `translateY(${(1 - scrollProgress) * 30}px)`,
              transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
            }}
          >
            What is <span style={{ color: palette.red }}>6cups</span>?
          </h2>
          <div
            className="w-16 h-1 mx-auto mb-12"
            style={{
              background: palette.red,
              opacity: scrollProgress,
              transform: `scaleX(${scrollProgress})`,
              transition: 'opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s',
            }}
          />

          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: fonts.body,
                color: palette.cream,
                opacity: scrollProgress * 0.9,
                transform: `translateY(${(1 - scrollProgress) * 20}px)`,
                transition: 'opacity 0.4s ease-out 0.15s, transform 0.4s ease-out 0.15s',
              }}
            >
              Cup pong is accessible, nostalgic, and brings people together. It's easy to learn, fun to watch, and everyone has a memory of it.
            </p>

            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: fonts.body,
                color: palette.cream,
                opacity: scrollProgress * 0.8,
                transform: `translateY(${(1 - scrollProgress) * 20}px)`,
                transition: 'opacity 0.4s ease-out 0.25s, transform 0.4s ease-out 0.25s',
              }}
            >
              <span className="font-semibold">6cups</span> is building a community around that. Two tournaments a year in Toronto, plus pop-ups at parks and beaches. Fun and casual, with an element of competition.
            </p>

          </div>
        </div>

      </div>

      {/* Table Zero section with background image - full width */}
      <div
        className="relative overflow-hidden"
        style={{ borderTop: `1px solid ${palette.slate}`, paddingTop: '180px', paddingBottom: '180px' }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/people_playing_2.jpg"
            alt="Cup pong action"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: `${palette.black}99` }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: fonts.heading,
                color: palette.cream,
                opacity: scrollProgress,
                transform: `translateY(${(1 - scrollProgress) * 20}px)`,
                transition: 'opacity 0.4s ease-out 0.3s, transform 0.4s ease-out 0.3s',
              }}
            >
              About <span style={{ color: palette.red }}>Table Zero</span>
            </h3>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
              style={{
                fontFamily: fonts.body,
                color: palette.cream,
                opacity: scrollProgress * 0.8,
                transform: `translateY(${(1 - scrollProgress) * 20}px)`,
                transition: 'opacity 0.4s ease-out 0.35s, transform 0.4s ease-out 0.35s',
              }}
            >
              The first official 6cups tournament. Up to 32 teams max. March 2026.
            </p>
          </div>

          {/* How to get in section */}
          <div
            className="grid md:grid-cols-3 gap-8"
            style={{
              opacity: scrollProgress,
              transform: `translateY(${(1 - scrollProgress) * 30}px)`,
              transition: 'opacity 0.4s ease-out 0.4s, transform 0.4s ease-out 0.4s',
            }}
          >
            {[
              {
                number: '01',
                title: 'Sign Up',
                description: 'Get on the waitlist. Everyone starts here.',
              },
              {
                number: '02',
                title: 'Invite Friends',
                description: 'If they sign up and mention your name, you both move up.',
              },
              {
                number: '03',
                title: 'Stand Out',
                description: 'Tag us on socials. Send us a trick shot. Get creative.',
              },
            ].map((step, index) => (
              <div
                key={index}
                className="text-center p-6"
                style={{
                  borderTop: `2px solid ${palette.red}`,
                }}
              >
                <div
                  className="text-4xl font-bold mb-3"
                  style={{ fontFamily: fonts.heading, color: palette.red }}
                >
                  {step.number}
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: fonts.heading, color: palette.cream }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm"
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
