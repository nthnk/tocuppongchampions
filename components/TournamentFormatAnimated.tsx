'use client';

import { useEffect, useRef, useState } from 'react';
import { palette, fonts } from '@/lib/theme';

export function TournamentFormatAnimated() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start animating much earlier and finish quickly
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
    <section ref={sectionRef} id="format" className="py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Title animation */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl font-black mb-6"
            style={{
              fontFamily: fonts.heading,
              color: palette.orange,
              opacity: scrollProgress,
              transform: `translateY(${(1 - scrollProgress) * 30}px) scale(${0.9 + scrollProgress * 0.1})`,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Tournament Format
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full mb-6"
            style={{
              background: `linear-gradient(to right, ${palette.red}, ${palette.orange}, ${palette.blue})`,
              opacity: scrollProgress,
              transform: `scaleX(${scrollProgress})`,
              transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
            }}
          />
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{
              fontFamily: fonts.body,
              color: palette.cream,
              opacity: scrollProgress * 0.7,
              transform: `translateY(${(1 - scrollProgress) * 20}px)`,
              transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.15s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
            }}
          >
            A simple, intimate bracket system with max 64 teams—perfect for a fun bar tournament
          </p>
        </div>

        {/* Feature cards with stagger */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              ),
              bgColor: `${palette.redLight}1A`,
              borderColor: `${palette.redLight}4D`,
              iconColor: palette.red,
              title: 'Max 64 Teams',
              description:
                'Smaller, more intimate tournament organized into 16-team brackets for fair competition',
              delay: 0.2,
            },
            {
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              ),
              bgColor: `${palette.orangeLight}1A`,
              borderColor: `${palette.orangeLight}4D`,
              iconColor: palette.orange,
              title: 'Bracket Style',
              description: "Winner moves forward, but don't worry—lose once and you get another shot in the losers bracket!",
              delay: 0.3,
            },
            {
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              ),
              bgColor: `${palette.blueLight}1A`,
              borderColor: `${palette.blueLight}4D`,
              iconColor: palette.blue,
              title: 'Second Chances',
              description:
                'Everyone plays at least two matches—lose your first game and keep playing in the comeback bracket',
              delay: 0.4,
            },
          ].map((card, index) => (
            <div
              key={index}
              className="rounded-2xl p-8 backdrop-blur-sm transition-all"
              style={{
                background: card.bgColor,
                border: `1px solid ${card.borderColor}`,
                opacity: scrollProgress,
                transform: `translateY(${(1 - scrollProgress) * 30}px) scale(${0.95 + scrollProgress * 0.05})`,
                transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${card.delay}s`,
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: card.iconColor }}
              >
                <svg
                  className="w-8 h-8"
                  style={{ color: palette.cream }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {card.icon}
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: fonts.body, color: palette.cream }}>{card.title}</h3>
              <p className="leading-relaxed" style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.7 }}>{card.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works section */}
        <div
          className="rounded-2xl p-8 md:p-12 backdrop-blur-sm"
          style={{
            background: `${palette.slate}40`,
            border: `1px solid ${palette.orange}33`,
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.5s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
          }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: fonts.body, color: palette.cream }}>How It Works</h3>

          <div className="grid md:grid-cols-4 gap-6 md:gap-4">
            {[
              { step: '1', label: 'Check-In & Seeding', color: palette.red, delay: 0.6 },
              { step: '2', label: 'Bracket Play Begins', color: palette.orange, delay: 0.65 },
              { step: '3', label: 'Losers Bracket', color: palette.blue, delay: 0.7 },
              { step: '4', label: 'Finals & Prizes', color: palette.red, delay: 0.75 },
            ].map((step, index) => (
              <div key={index}>
                <div
                  className="rounded-xl p-6 text-center"
                  style={{
                    background: step.color,
                    opacity: scrollProgress,
                    transform: `translateY(${(1 - scrollProgress) * 20}px) rotate(${(1 - scrollProgress) * -3}deg)`,
                    transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${step.delay}s`,
                  }}
                >
                  <div className="text-3xl font-black mb-2" style={{ color: palette.cream }}>{step.step}</div>
                  <p className="text-sm font-semibold" style={{ fontFamily: fonts.body, color: palette.cream }}>{step.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-8 p-6 rounded-xl"
            style={{
              background: `${palette.orange}1A`,
              border: `1px solid ${palette.orange}4D`,
              opacity: scrollProgress,
              transform: `scale(${0.95 + scrollProgress * 0.05})`,
              transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.8s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.8s',
            }}
          >
            <p className="text-center text-lg" style={{ fontFamily: fonts.body, color: palette.cream }}>
              <span className="font-bold">Event duration:</span> A fun afternoon/evening at a downtown bar with brackets running—grab drinks, watch games, and compete!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
