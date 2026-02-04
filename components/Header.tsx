'use client';

import { useState, useEffect } from 'react';
import { palette, fonts } from '@/lib/theme';
import Image from 'next/image';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? `${palette.black}f0` : 'transparent',
        borderBottom: isScrolled ? `1px solid ${palette.slate}` : '1px solid transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      }}
    >
      <nav className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/6cups-logo.svg"
              alt="6cups"
              width={32}
              height={32}
              className="invert"
            />
          </button>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium uppercase tracking-wider transition-opacity hover:opacity-100"
              style={{ color: palette.cream, fontFamily: fonts.body, opacity: 0.7 }}
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-sm font-medium uppercase tracking-wider transition-opacity hover:opacity-100"
              style={{ color: palette.cream, fontFamily: fonts.body, opacity: 0.7 }}
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('waitlist')}
              className="text-sm font-semibold uppercase tracking-wider px-5 py-2 transition-opacity hover:opacity-90"
              style={{
                background: palette.red,
                color: palette.cream,
                fontFamily: fonts.heading,
              }}
            >
              GET ON THE LIST
            </button>
          </div>

          {/* Mobile CTA */}
          <button
            onClick={() => scrollToSection('waitlist')}
            className="md:hidden text-sm font-semibold uppercase tracking-wider px-4 py-2 transition-opacity hover:opacity-90"
            style={{
              background: palette.red,
              color: palette.cream,
              fontFamily: fonts.heading,
            }}
          >
            SIGN UP
          </button>
        </div>
      </nav>
    </header>
  );
}
