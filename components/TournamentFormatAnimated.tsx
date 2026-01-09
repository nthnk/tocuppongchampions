'use client';

import { useEffect, useRef, useState } from 'react';

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
            className="text-5xl md:text-6xl font-black text-white mb-6"
            style={{
              opacity: scrollProgress,
              transform: `translateY(${(1 - scrollProgress) * 30}px) scale(${0.9 + scrollProgress * 0.1})`,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Tournament Format
          </h2>
          <div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"
            style={{
              opacity: scrollProgress,
              transform: `scaleX(${scrollProgress})`,
              transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
            }}
          />
          <p
            className="text-xl text-slate-400 max-w-2xl mx-auto"
            style={{
              opacity: scrollProgress,
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
              bgGradient: 'from-blue-600/10 to-purple-600/10',
              borderColor: 'border-blue-500/20',
              hoverBorder: 'hover:border-blue-500/40',
              iconGradient: 'from-blue-600 to-purple-600',
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
              bgGradient: 'from-purple-600/10 to-pink-600/10',
              borderColor: 'border-purple-500/20',
              hoverBorder: 'hover:border-purple-500/40',
              iconGradient: 'from-purple-600 to-pink-600',
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
              bgGradient: 'from-pink-600/10 to-red-600/10',
              borderColor: 'border-pink-500/20',
              hoverBorder: 'hover:border-pink-500/40',
              iconGradient: 'from-pink-600 to-red-600',
              title: 'Second Chances',
              description:
                'Everyone plays at least two matches—lose your first game and keep playing in the comeback bracket',
              delay: 0.4,
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.bgGradient} border ${card.borderColor} rounded-2xl p-8 backdrop-blur-sm ${card.hoverBorder} transition-all`}
              style={{
                opacity: scrollProgress,
                transform: `translateY(${(1 - scrollProgress) * 30}px) scale(${0.95 + scrollProgress * 0.05})`,
                transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${card.delay}s`,
              }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${card.iconGradient} rounded-2xl flex items-center justify-center mb-6`}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {card.icon}
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works section */}
        <div
          className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.5s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
          }}
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h3>

          <div className="grid md:grid-cols-4 gap-6 md:gap-4">
            {[
              { step: '1', label: 'Check-In & Seeding', gradient: 'from-blue-600 to-purple-600', delay: 0.6 },
              { step: '2', label: 'Bracket Play Begins', gradient: 'from-purple-600 to-pink-600', delay: 0.65 },
              { step: '3', label: 'Losers Bracket', gradient: 'from-pink-600 to-red-600', delay: 0.7 },
              { step: '4', label: 'Finals & Prizes', gradient: 'from-yellow-600 to-orange-600', delay: 0.75 },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div
                  className={`bg-gradient-to-br ${step.gradient} rounded-xl p-6 text-center`}
                  style={{
                    opacity: scrollProgress,
                    transform: `translateY(${(1 - scrollProgress) * 20}px) rotate(${(1 - scrollProgress) * -3}deg)`,
                    transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${step.delay}s`,
                  }}
                >
                  <div className="text-3xl font-black text-white mb-2">{step.step}</div>
                  <p className="text-sm font-semibold text-white">{step.label}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-4">
                    <svg className="text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            className="mt-8 p-6 bg-blue-600/10 border border-blue-500/20 rounded-xl"
            style={{
              opacity: scrollProgress,
              transform: `scale(${0.95 + scrollProgress * 0.05})`,
              transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.8s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.8s',
            }}
          >
            <p className="text-center text-slate-300 text-lg">
              <span className="font-bold text-white">Event duration:</span> A fun afternoon/evening at a downtown bar with brackets running—grab drinks, watch games, and compete!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
