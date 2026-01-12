'use client';

import { useEffect, useState } from 'react';
import { palette, fonts } from '@/lib/theme';

export function ParallaxCups() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate random positions for cups
  const cups = [
    { id: 1, left: '5%', baseTop: 10, speed: 0.3, rotation: -15, size: 1.2 },
    { id: 2, left: '15%', baseTop: 30, speed: 0.5, rotation: 20, size: 0.9 },
    { id: 3, left: '25%', baseTop: 60, speed: 0.2, rotation: -10, size: 1.1 },
    { id: 4, left: '35%', baseTop: 20, speed: 0.4, rotation: 15, size: 0.8 },
    { id: 5, left: '45%', baseTop: 70, speed: 0.25, rotation: -20, size: 1.3 },
    { id: 6, left: '55%', baseTop: 40, speed: 0.35, rotation: 10, size: 1.0 },
    { id: 7, left: '65%', baseTop: 15, speed: 0.45, rotation: -25, size: 0.85 },
    { id: 8, left: '75%', baseTop: 50, speed: 0.3, rotation: 18, size: 1.15 },
    { id: 9, left: '85%', baseTop: 35, speed: 0.4, rotation: -12, size: 0.95 },
    { id: 10, left: '92%', baseTop: 65, speed: 0.2, rotation: 22, size: 1.05 },
    { id: 11, left: '10%', baseTop: 80, speed: 0.35, rotation: -18, size: 0.9 },
    { id: 12, left: '70%', baseTop: 75, speed: 0.25, rotation: 12, size: 1.1 },
  ];

  // Ping pong ball - moves faster for more dynamic effect
  const ball = {
    left: '50%',
    baseTop: 45,
    speed: 0.6,
  };

  return (
    <section className="relative h-[200vh] overflow-hidden -mt-24" style={{ background: 'linear-gradient(180deg, #121318 0%, #0C0C0C 100%)' }}>
      {/* Cups */}
      {cups.map((cup) => (
        <div
          key={cup.id}
          className="absolute opacity-80 transition-transform duration-100"
          style={{
            left: cup.left,
            top: `${cup.baseTop}%`,
            transform: `
              translateY(${scrollY * cup.speed * 0.5}px)
              rotate(${cup.rotation + scrollY * 0.05}deg)
              scale(${cup.size})
            `,
          }}
        >
          <RedSoloCup id={cup.id} />
        </div>
      ))}

      {/* Ping Pong Ball - floats through the scene */}
      <div
        className="absolute z-20 transition-transform duration-100"
        style={{
          left: ball.left,
          top: `${ball.baseTop}%`,
          transform: `
            translateY(${scrollY * ball.speed * 0.5}px)
            translateX(${Math.sin(scrollY * 0.01) * 100}px)
            scale(1.5)
          `,
        }}
      >
        <PingPongBall />
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(226, 125, 96, 0.05), transparent)' }} />

      {/* Content overlay - centered text */}
      <div className="sticky top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-screen pointer-events-none">
        <div className="text-center">
          <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tight" style={{ fontFamily: fonts.heading, color: palette.orange, textShadow: `3px 3px 0 ${palette.orangeLight}` }}>
            Game On
          </h2>
          <p className="text-2xl md:text-3xl font-bold" style={{ fontFamily: fonts.body, color: palette.slate, opacity: 0.8 }}>
            Prepare for the ultimate showdown
          </p>
        </div>
      </div>
    </section>
  );
}

function RedSoloCup({ id = 0 }: { id?: number }) {
  return (
    <svg width="120" height="160" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`cupGradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#C41E3A', stopOpacity: 1 }} />
          <stop offset="30%" style={{ stopColor: '#E63946', stopOpacity: 1 }} />
          <stop offset="70%" style={{ stopColor: '#DC2F3E', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#A01729', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id={`cupHighlight-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 0 }} />
          <stop offset="20%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.4 }} />
          <stop offset="40%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.2 }} />
          <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={`rimGradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#E8E8E8', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#D0D0D0', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Main cup body - trapezoid (red) */}
      <path
        d="M 25 20 L 15 145 L 105 145 L 95 20 Z"
        fill={`url(#cupGradient-${id})`}
      />

      {/* Bottom of cup - red */}
      <ellipse cx="60" cy="145" rx="45" ry="12" fill={`url(#cupGradient-${id})`} />

      {/* Left highlight on cup body */}
      <path
        d="M 30 25 L 22 140 L 35 140 L 42 25 Z"
        fill={`url(#cupHighlight-${id})`}
        opacity="0.6"
      />

      {/* White rim at top - just a thin band */}
      <ellipse cx="60" cy="20" rx="35" ry="8" fill={`url(#rimGradient-${id})`} />
      <ellipse cx="60" cy="15" rx="35" ry="8" fill={`url(#rimGradient-${id})`} />
    </svg>
  );
}

function PingPongBall() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ballGradient">
          <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
          <stop offset="70%" style={{ stopColor: '#F8F8F8', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#D1D1D1', stopOpacity: 1 }} />
        </radialGradient>
        <radialGradient id="ballHighlight" cx="30%" cy="30%">
          <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.8 }} />
          <stop offset="50%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="40" cy="75" rx="25" ry="5" fill="#000000" opacity="0.2" />

      {/* Main ball */}
      <circle cx="40" cy="40" r="35" fill="url(#ballGradient)" />

      {/* Highlight */}
      <circle cx="40" cy="40" r="35" fill="url(#ballHighlight)" />

      {/* Specular highlight */}
      <circle cx="28" cy="28" r="12" fill="#FFFFFF" opacity="0.6" />
      <circle cx="25" cy="25" r="6" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}
