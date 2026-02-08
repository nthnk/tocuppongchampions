'use client';

import { palette, fonts } from '@/lib/theme';

export function Footer() {
  return (
    <footer style={{ background: palette.black, borderTop: `3px solid ${palette.red}` }}>
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Top — brand & tagline */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div>
            <div className="mb-3">
              <svg viewBox="0 0 147.4 45.25" className="h-10 w-auto">
                <path fill={palette.red} d="M27.64,3.67c1.81,2.64-2.83,8.95-10.35,14.11C9.76,22.93,2.2,24.97.39,22.33c-1.22-1.78.49-5.22,4.04-8.86,2.68,3.24,7.43,3.95,10.97,1.53,3.53-2.42,4.58-7.11,2.53-10.78,4.67-1.99,8.5-2.34,9.72-.56Z"/>
                <path fill={palette.red} d="M17.53,3.58c.15.21.28.43.4.65-2.26.96-4.72,2.31-7.18,3.99s-4.6,3.49-6.32,5.25c-.17-.19-.32-.39-.46-.61C1.4,9.12,2.35,4,6.1,1.44,9.85-1.13,14.96-.17,17.53,3.58Z"/>
                <path fill={palette.red} d="M2.01,24.7s6.19,1.89,16.49-5.16c10.29-7.05,10.77-13.51,10.77-13.51l11.05,26.25s1.1,4.18-5.98,9.02c-7.08,4.85-11.22,3.86-11.22,3.86L2.01,24.7Z"/>
                <path fill={palette.cream} d="M56.72,17.66c-2.1,0-4.02.38-5.1,1.86.17-3.7,1.27-5.65,4.62-5.65,1.56,0,2.56.49,3.05,1.54.18.38.54.64.96.64h2.96c.69,0,1.19-.66,1-1.33-1.06-3.82-4.94-5.03-7.96-5.03-5.05,0-9.26,3.06-9.26,11.54s4,11.5,9.26,11.5c4.43,0,8.55-1.86,8.55-7.9,0-5.28-3.65-7.18-8.08-7.18ZM56.92,27.65c-2.06,0-3.72-1.66-3.72-3.71s1.66-3.72,3.72-3.72,3.71,1.66,3.71,3.72-1.66,3.71-3.71,3.71Z"/>
                <path fill={palette.cream} d="M90.08,23.72c-.46-.45-1.09-.73-1.81-.73h-.04c-1.08,0-2.03.69-2.43,1.7-.81,2.05-2.35,3.35-4.95,3.35-3.73,0-5.61-2.78-5.61-7.05s1.88-7.08,5.61-7.08c2.6,0,4.14,1.31,4.95,3.38.4,1.01,1.34,1.71,2.43,1.71h.03c.71,0,1.33-.27,1.78-.71.75-.71,1.06-1.87.59-2.94-.17-.39-.37-.76-.59-1.11-2.05-3.42-5.68-4.8-9.19-4.8-5.27,0-10.87,3.06-10.87,11.53s5.61,11.51,10.87,11.51c3.79,0,7.71-1.57,9.65-5.61.05-.09.09-.18.13-.27.47-1.06.17-2.2-.57-2.91Z"/>
                <path fill={palette.cream} d="M106.76,9.93h-.02c-1.43,0-2.59,1.16-2.59,2.59v10.28c0,4.52-2,5.24-4.46,5.24s-4.45-.72-4.45-5.24v-10.28c0-1.43-1.16-2.59-2.59-2.59h-.02c-1.43,0-2.58,1.16-2.58,2.59v10.28c0,.31,0,.62.02.92.05,1.22.2,2.27.43,3.18,1.26,4.84,4.99,5.61,9.19,5.61,5.17,0,9.65-1.17,9.65-9.7v-10.28c0-1.43-1.15-2.59-2.58-2.59Z"/>
                <path fill={palette.cream} d="M127.66,13.8c-1.09-2.35-3.37-3.75-6.83-3.75h-8.9c-1.43,0-2.59,1.15-2.59,2.58v16.96c0,1.43,1.16,2.58,2.59,2.58h.02c1.42,0,2.58-1.15,2.58-2.58v-1.72c0-1.43,1.16-2.59,2.58-2.59h3.22c4.09,0,6.85-1.61,7.74-5.06.21-.79.31-1.69.31-2.69,0-1.41-.24-2.67-.73-3.74ZM119.89,22.55c-2.41,0-4.37-1.96-4.37-4.37s1.96-4.37,4.37-4.37,4.37,1.96,4.37,4.37-1.96,4.37-4.37,4.37Z"/>
                <path fill={palette.cream} d="M138.2,18.67c-3.1-.48-5.89-.6-5.89-2.47,0-1.39,1.19-2.17,4.3-2.17,2.03,0,3.35.64,3.94,1.55.46.71,1.19,1.19,2.03,1.19h.37c2.09,0,3.33-2.35,2.14-4.06-1.33-1.9-3.93-3.15-8.42-3.15-5,0-7.91,1.52-9,4.23-.35.85-.52,1.81-.52,2.88,0,1.53.32,2.67.93,3.54,1.17,1.66,3.38,2.35,6.39,2.97,4.98,1.04,7.25.95,7.25,2.79,0,1.48-1.56,2.18-4.38,2.18-2,0-4-.44-4.78-1.8-.48-.82-1.29-1.4-2.25-1.4h-.46c-1.9,0-3.22,2.01-2.34,3.69,1.33,2.54,4.35,3.97,9.47,3.97,6.73,0,10.43-2.18,10.43-7.5s-4.59-5.69-9.2-6.45Z"/>
              </svg>
            </div>
            <p
              className="text-xs font-bold uppercase tracking-[0.3em] mb-2"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.4 }}
            >
              TORONTO&apos;S BEER PONG TOURNAMENT
            </p>
            <p
              className="text-xs font-bold uppercase tracking-wider"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.3 }}
            >
              Table Zero — April 2026
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/play6cups?igsh=MXh5ZzJmYW9ubnFrNA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center transition-all"
              style={{ border: `1px solid ${palette.slate}`, background: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = palette.red; e.currentTarget.style.borderColor = palette.red; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = palette.slate; }}
            >
              <svg className="w-5 h-5" style={{ color: palette.cream }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@play6cups?_r=1&_t=ZS-93jqD6GmT6W"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center transition-all"
              style={{ border: `1px solid ${palette.slate}`, background: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = palette.red; e.currentTarget.style.borderColor = palette.red; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = palette.slate; }}
            >
              <svg className="w-5 h-5" style={{ color: palette.cream }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Links row */}
        <div className="flex flex-wrap gap-8 mb-16">
          {[
            { label: 'About', href: '#about' },
            { label: 'Waitlist', href: '#waitlist' },
            { label: 'FAQ', href: '#faq' },
            { label: 'Contact', href: 'mailto:info@tocuppongchampions.ca' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-bold uppercase tracking-[0.3em] transition-opacity hover:opacity-100"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.4 }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8" style={{ borderTop: `1px solid ${palette.slate}` }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.3 }}
            >
              &copy; 2026 6CUPS. All rights reserved.
            </p>
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.3 }}
            >
              Toronto, Canada
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
