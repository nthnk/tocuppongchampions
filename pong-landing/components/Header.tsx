'use client';

import { useState, useEffect } from 'react';
import { palette, fonts } from '@/lib/theme';

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
        borderBottom: isScrolled ? `2px solid ${palette.red}` : '2px solid transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Mark */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <svg viewBox="0 0 147.4 45.25" className="h-8 w-auto">
              <path fill={palette.red} d="M27.64,3.67c1.81,2.64-2.83,8.95-10.35,14.11C9.76,22.93,2.2,24.97.39,22.33c-1.22-1.78.49-5.22,4.04-8.86,2.68,3.24,7.43,3.95,10.97,1.53,3.53-2.42,4.58-7.11,2.53-10.78,4.67-1.99,8.5-2.34,9.72-.56Z"/>
              <path fill={palette.red} d="M17.53,3.58c.15.21.28.43.4.65-2.26.96-4.72,2.31-7.18,3.99s-4.6,3.49-6.32,5.25c-.17-.19-.32-.39-.46-.61C1.4,9.12,2.35,4,6.1,1.44,9.85-1.13,14.96-.17,17.53,3.58Z"/>
              <path fill={palette.red} d="M2.01,24.7s6.19,1.89,16.49-5.16c10.29-7.05,10.77-13.51,10.77-13.51l11.05,26.25s1.1,4.18-5.98,9.02c-7.08,4.85-11.22,3.86-11.22,3.86L2.01,24.7Z"/>
              <path fill={palette.cream} d="M56.72,17.66c-2.1,0-4.02.38-5.1,1.86.17-3.7,1.27-5.65,4.62-5.65,1.56,0,2.56.49,3.05,1.54.18.38.54.64.96.64h2.96c.69,0,1.19-.66,1-1.33-1.06-3.82-4.94-5.03-7.96-5.03-5.05,0-9.26,3.06-9.26,11.54s4,11.5,9.26,11.5c4.43,0,8.55-1.86,8.55-7.9,0-5.28-3.65-7.18-8.08-7.18ZM56.92,27.65c-2.06,0-3.72-1.66-3.72-3.71s1.66-3.72,3.72-3.72,3.71,1.66,3.71,3.72-1.66,3.71-3.71,3.71Z"/>
              <path fill={palette.cream} d="M90.08,23.72c-.46-.45-1.09-.73-1.81-.73h-.04c-1.08,0-2.03.69-2.43,1.7-.81,2.05-2.35,3.35-4.95,3.35-3.73,0-5.61-2.78-5.61-7.05s1.88-7.08,5.61-7.08c2.6,0,4.14,1.31,4.95,3.38.4,1.01,1.34,1.71,2.43,1.71h.03c.71,0,1.33-.27,1.78-.71.75-.71,1.06-1.87.59-2.94-.17-.39-.37-.76-.59-1.11-2.05-3.42-5.68-4.8-9.19-4.8-5.27,0-10.87,3.06-10.87,11.53s5.61,11.51,10.87,11.51c3.79,0,7.71-1.57,9.65-5.61.05-.09.09-.18.13-.27.47-1.06.17-2.2-.57-2.91Z"/>
              <path fill={palette.cream} d="M106.76,9.93h-.02c-1.43,0-2.59,1.16-2.59,2.59v10.28c0,4.52-2,5.24-4.46,5.24s-4.45-.72-4.45-5.24v-10.28c0-1.43-1.16-2.59-2.59-2.59h-.02c-1.43,0-2.58,1.16-2.58,2.59v10.28c0,.31,0,.62.02.92.05,1.22.2,2.27.43,3.18,1.26,4.84,4.99,5.61,9.19,5.61,5.17,0,9.65-1.17,9.65-9.7v-10.28c0-1.43-1.15-2.59-2.58-2.59Z"/>
              <path fill={palette.cream} d="M127.66,13.8c-1.09-2.35-3.37-3.75-6.83-3.75h-8.9c-1.43,0-2.59,1.15-2.59,2.58v16.96c0,1.43,1.16,2.58,2.59,2.58h.02c1.42,0,2.58-1.15,2.58-2.58v-1.72c0-1.43,1.16-2.59,2.58-2.59h3.22c4.09,0,6.85-1.61,7.74-5.06.21-.79.31-1.69.31-2.69,0-1.41-.24-2.67-.73-3.74ZM119.89,22.55c-2.41,0-4.37-1.96-4.37-4.37s1.96-4.37,4.37-4.37,4.37,1.96,4.37,4.37-1.96,4.37-4.37,4.37Z"/>
              <path fill={palette.cream} d="M138.2,18.67c-3.1-.48-5.89-.6-5.89-2.47,0-1.39,1.19-2.17,4.3-2.17,2.03,0,3.35.64,3.94,1.55.46.71,1.19,1.19,2.03,1.19h.37c2.09,0,3.33-2.35,2.14-4.06-1.33-1.9-3.93-3.15-8.42-3.15-5,0-7.91,1.52-9,4.23-.35.85-.52,1.81-.52,2.88,0,1.53.32,2.67.93,3.54,1.17,1.66,3.38,2.35,6.39,2.97,4.98,1.04,7.25.95,7.25,2.79,0,1.48-1.56,2.18-4.38,2.18-2,0-4-.44-4.78-1.8-.48-.82-1.29-1.4-2.25-1.4h-.46c-1.9,0-3.22,2.01-2.34,3.69,1.33,2.54,4.35,3.97,9.47,3.97,6.73,0,10.43-2.18,10.43-7.5s-4.59-5.69-9.2-6.45Z"/>
            </svg>
          </button>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-100"
              style={{ color: palette.cream, fontFamily: fonts.body, opacity: 0.7 }}
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-100"
              style={{ color: palette.cream, fontFamily: fonts.body, opacity: 0.7 }}
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('waitlist')}
              className="text-sm font-black uppercase tracking-widest px-6 py-3 transition-all hover:opacity-90"
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
            className="md:hidden text-sm font-black uppercase tracking-widest px-5 py-2.5 transition-opacity hover:opacity-90"
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
