import { palette, fonts } from '@/lib/theme';

export function Footer() {
  return (
    <footer className="backdrop-blur-sm" style={{ borderTop: `1px solid ${palette.slate}`, background: palette.darkNavy }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black mb-4" style={{ fontFamily: fonts.heading }}>
              <span style={{ color: palette.red }}>CUP </span>
              <span style={{ color: palette.orange }}>PONG </span>
              <span style={{ color: palette.blue }}>DUDES</span>
            </h3>
            <p className="leading-relaxed" style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.5 }}>
              Competitive spirit. Good vibes. Toronto's best cup pong tournament.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ fontFamily: fonts.body, color: palette.cream }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#waitlist"
                  className="transition-all hover:scale-105 inline-block"
                  style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.5 }}
                  onMouseEnter={(e) => e.currentTarget.style.color = palette.orange}
                  onMouseLeave={(e) => { e.currentTarget.style.color = palette.cream; e.currentTarget.style.opacity = '0.5'; }}
                >
                  Join Waitlist
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@tocuppongchampions.ca"
                  className="transition-all hover:scale-105 inline-block"
                  style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.5 }}
                  onMouseEnter={(e) => e.currentTarget.style.color = palette.orange}
                  onMouseLeave={(e) => { e.currentTarget.style.color = palette.cream; e.currentTarget.style.opacity = '0.5'; }}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ fontFamily: fonts.body, color: palette.cream }}>
              Follow Us
            </h4>
            <div className="flex gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/cuppongdudes/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 group"
                style={{ background: `${palette.orange}20`, border: `1px solid ${palette.orange}30` }}
              >
                <svg className="w-6 h-6 transition-colors" style={{ color: palette.cream }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@cuppongguy?_r=1&_t=ZS-92vv1AfUO2B"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 group"
                style={{ background: `${palette.gold}20`, border: `1px solid ${palette.gold}30` }}
              >
                <svg className="w-6 h-6 transition-colors" style={{ color: palette.cream }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8" style={{ borderTop: `1px solid ${palette.slate}` }}>
          <div className="text-center">
            <p className="text-sm" style={{ fontFamily: fonts.accent, color: palette.cream, opacity: 0.3 }}>
              © 2026 CUP PONG DUDES. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
