'use client';

import { palette, fonts } from '@/lib/theme';

export function WaitlistForm() {
  return (
    <section id="register" className="py-28 px-6" style={{ background: palette.black }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <span
            className="text-xs font-bold uppercase tracking-[0.4em]"
            style={{ fontFamily: fonts.body, color: palette.red }}
          >
            Registration Closed
          </span>
        </div>
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 uppercase tracking-wider"
            style={{ fontFamily: fonts.heading, color: palette.cream }}
          >
            SEE YOU <span style={{ color: palette.red }}>THERE</span>
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed max-w-lg mx-auto"
            style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.6 }}
          >
            Sign-ups have closed. See you all on March 22nd at 11:50 a.m.
          </p>
        </div>

        {/* Info Card */}
        <div
          className="p-8 md:p-10 text-center"
          style={{
            background: palette.darkSlate,
            borderTop: `3px solid ${palette.red}`,
          }}
        >
          <p
            className="text-base md:text-lg leading-relaxed mb-6"
            style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.8 }}
          >
            If you didn&apos;t get a chance to sign up but are still interested in future events, follow us on Instagram for all the latest updates.
          </p>
          <a
            href="https://www.instagram.com/play6cups"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-black uppercase tracking-widest transition-all duration-300 hover:opacity-90"
            style={{
              background: palette.red,
              color: palette.cream,
              fontFamily: fonts.heading,
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @PLAY6CUPS
          </a>
        </div>
      </div>
    </section>
  );
}
