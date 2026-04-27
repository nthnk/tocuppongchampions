'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { palette, fonts } from '@/lib/theme';
import { LogoHorizontal } from '@/components/brand/Logo';
import { Button } from '@/components/brand/Button';

const NAV = [
  { label: 'About', href: '/#about' },
  { label: 'Past Events', href: '/#past-events' },
  { label: 'Winners', href: '/#winners' },
  { label: 'FAQ', href: '/#faq' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: scrolled ? 'rgba(255,251,236,0.96)' : 'rgba(255,251,236,0.85)',
          borderBottom: `2px solid ${palette.cupRed}`,
          backdropFilter: 'blur(10px)',
          transition: 'background 200ms',
        }}
      >
        <nav
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '14px clamp(16px, 4vw, 24px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <Link href="/" aria-label="6CUPS home" style={{ display: 'inline-flex', flexShrink: 0 }}>
            <LogoHorizontal height={28} mark={palette.cupRed} word={palette.blackout} />
          </Link>

          <div className="header-desktop-nav" style={{ gap: 28 }}>
            {NAV.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: fonts.body,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: palette.blackout,
                  opacity: 0.7,
                  textDecoration: 'none',
                  transition: 'opacity 150ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
              >
                {l.label}
              </Link>
            ))}
            <Link href="https://www.instagram.com/play6cups" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm">Follow Along</Button>
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="header-mobile-toggle"
            style={{
              background: 'transparent',
              border: 'none',
              padding: 8,
              cursor: 'pointer',
              color: palette.blackout,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </nav>
      </header>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            background: palette.blackout,
            color: palette.foam,
            paddingTop: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 14,
              right: 16,
              padding: 12,
              background: 'transparent',
              border: 'none',
              color: palette.foam,
              cursor: 'pointer',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <nav style={{ display: 'flex', flexDirection: 'column', padding: '16px 24px', gap: 4 }}>
            {NAV.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 32,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color: palette.foam,
                  textDecoration: 'none',
                  padding: '18px 0',
                  borderBottom: '1px solid rgba(255,251,236,0.15)',
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="https://www.instagram.com/play6cups"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                fontFamily: fonts.heading,
                fontSize: 32,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                color: palette.cupRed,
                textDecoration: 'none',
                padding: '18px 0',
              }}
            >
              Follow Along
            </Link>
          </nav>
        </div>
      )}

      <style jsx>{`
        .header-desktop-nav { display: none; align-items: center; }
        .header-mobile-toggle { display: inline-flex; }
        @media (min-width: 768px) {
          .header-desktop-nav { display: flex; }
          .header-mobile-toggle { display: none; }
        }
      `}</style>
    </>
  );
}
