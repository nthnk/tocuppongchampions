'use client';

import Image from 'next/image';
import { palette, fonts } from '@/lib/theme';

export function Location() {
  return (
    <section id="location" className="relative overflow-hidden" style={{ paddingTop: '140px', paddingBottom: '140px' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/samara_brewery.jpg"
          alt="Samara Brewing Co."
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${palette.black}80, ${palette.black}95, ${palette.black}88)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Kicker */}
        <div className="text-center mb-4">
          <span
            className="text-xs font-bold uppercase tracking-[0.4em]"
            style={{ fontFamily: fonts.body, color: palette.red }}
          >
            Venue
          </span>
        </div>

        <div className="text-center mb-14">
          <h2
            className="text-5xl md:text-6xl font-black uppercase mb-5"
            style={{ fontFamily: fonts.heading, color: palette.cream }}
          >
            FIND US
          </h2>
          <div
            className="w-16 h-1 mx-auto"
            style={{ background: palette.red }}
          />
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <h3
            className="font-black uppercase mb-4 whitespace-nowrap"
            style={{ fontFamily: fonts.heading, color: palette.cream, fontSize: 'clamp(0.85rem, 4vw, 1.875rem)' }}
          >
            SAMARA BREWING CO. / NICKEL 9 DISTILLERY
          </h3>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.7 }}
          >
            90 Cawthra Ave Unit 101<br />
            Toronto, ON M6N 3C2
          </p>

          <div
            className="p-6 mb-8 text-left"
            style={{
              background: `${palette.black}c0`,
              borderLeft: `3px solid ${palette.red}`,
              backdropFilter: 'blur(8px)',
            }}
          >
            <h4
              className="text-sm font-black uppercase tracking-wider mb-3"
              style={{ fontFamily: fonts.heading, color: palette.red }}
            >
              Getting There
            </h4>
            <p
              className="text-sm leading-relaxed mb-3"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.7 }}
            >
              Our venue is located in the Cawthra Avenue industrial area, just west of Dufferin Street off Dupont. Easy to reach by car, TTC, or ride-share.
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.7 }}
            >
              <span style={{ color: palette.red, fontWeight: 700 }}>Free parking</span> is available on Cawthra Avenue — plenty of street spots right outside the venue.
            </p>
          </div>

          <a
            href="https://www.google.com/maps/search/90+Cawthra+Ave+Unit+101,+Toronto,+ON+M6N+3C2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest px-8 py-4 transition-all hover:opacity-80"
            style={{
              background: palette.red,
              color: palette.cream,
              fontFamily: fonts.heading,
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            OPEN IN GOOGLE MAPS
          </a>
        </div>
      </div>
    </section>
  );
}
