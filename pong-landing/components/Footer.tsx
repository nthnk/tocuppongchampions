'use client';

import Link from 'next/link';
import { palette, fonts } from '@/lib/theme';
import { LogoHorizontal } from '@/components/brand/Logo';

export function Footer() {
  return (
    <footer
      style={{
        background: palette.blackout,
        color: palette.foam,
        borderTop: `3px solid ${palette.cupRed}`,
        padding: 'clamp(48px, 7vw, 64px) clamp(20px, 5vw, 24px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 32,
            marginBottom: 56,
          }}
        >
          <div>
            <LogoHorizontal height={36} mark={palette.cupRed} word={palette.foam} />
            <p className="t-tag" style={{ marginTop: 16, opacity: 0.5 }}>
              Toronto&apos;s beer pong tournament
            </p>
            <p className="t-tag" style={{ marginTop: 4, opacity: 0.4 }}>
              Where strangers become friends.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <a
              href="https://www.instagram.com/play6cups"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                width: 40,
                height: 40,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,251,236,0.25)',
                color: palette.foam,
                textDecoration: 'none',
                transition: 'all 150ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = palette.cupRed;
                e.currentTarget.style.borderColor = palette.cupRed;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,251,236,0.25)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@play6cups"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              style={{
                width: 40,
                height: 40,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,251,236,0.25)',
                color: palette.foam,
                textDecoration: 'none',
                transition: 'all 150ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = palette.cupRed;
                e.currentTarget.style.borderColor = palette.cupRed;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,251,236,0.25)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 28,
            flexWrap: 'wrap',
            marginBottom: 48,
          }}
        >
          {[
            { label: 'About', href: '/#about' },
            { label: 'Past Events', href: '/#past-events' },
            { label: 'Winners', href: '/winners' },
            { label: 'FAQ', href: '/#faq' },
            { label: 'Contact', href: 'mailto:info@tocuppongchampions.ca' },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="t-tag"
              style={{
                color: palette.foam,
                opacity: 0.4,
                textDecoration: 'none',
                transition: 'opacity 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.4')}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div
          style={{
            paddingTop: 24,
            borderTop: '1px solid rgba(255,251,236,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p className="t-tag" style={{ opacity: 0.4, fontFamily: fonts.body }}>
            © 2026 6CUPS. All rights reserved.
          </p>
          <p className="t-tag" style={{ opacity: 0.4, fontFamily: fonts.body }}>
            Toronto, Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
