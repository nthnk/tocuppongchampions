'use client';

import { useEffect, useRef, useState } from 'react';

export function AboutAnimated() {
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
    <section
      ref={sectionRef}
      id="about"
      className="py-24 px-6 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Title with fade and slide up */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl font-black text-white mb-6"
            style={{
              opacity: scrollProgress,
              transform: `translateY(${(1 - scrollProgress) * 30}px)`,
              transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            What Is It?
          </h2>
          <div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            style={{
              opacity: scrollProgress,
              transform: `scaleX(${scrollProgress})`,
              transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Main description - words fade in */}
          <div className="space-y-6">
            <p
              className="text-lg md:text-xl text-slate-300 leading-relaxed"
              style={{
                opacity: scrollProgress,
                transform: `translateX(${(1 - scrollProgress) * -20}px)`,
                transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.15s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
              }}
            >
              The <span className="font-bold text-white">Toronto Cup Pong Championship</span> will be the largest cup pong tournament Toronto has ever seen. Come play cup pong and meet new friends! Our first event will be a mini-tournament hosted at a downtown Toronto bar in late February - March 2026.
            </p>
            <p
              className="text-lg md:text-xl text-slate-300 leading-relaxed"
              style={{
                opacity: scrollProgress,
                transform: `translateX(${(1 - scrollProgress) * -20}px)`,
                transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.25s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.25s',
              }}
            >
              Never played before? Perfect! Everyone's welcome regardless of skill level. The bar will have drinks and food available for purchase, so you can enjoy the full bar experience while competing with friends.
            </p>
          </div>

          {/* Features - stagger animation */}
          <div className="space-y-6">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
                gradient: 'from-blue-600 to-purple-600',
                title: 'Easy to Play',
                description: "No experience needed—we'll show you the ropes when you arrive",
                delay: 0.2,
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                ),
                gradient: 'from-purple-600 to-pink-600',
                title: 'Content Creation',
                description: "Help us capture the energy and fun—your games could go viral!",
                delay: 0.3,
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                ),
                gradient: 'from-pink-600 to-red-600',
                title: 'Bar Vibes',
                description: 'Downtown Toronto bar with food and drinks available for purchase',
                delay: 0.4,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4"
                style={{
                  opacity: scrollProgress,
                  transform: `translateX(${(1 - scrollProgress) * 20}px)`,
                  transition: `opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${feature.delay}s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${feature.delay}s`,
                }}
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
