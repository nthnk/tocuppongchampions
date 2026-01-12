'use client';

import { palette, fonts } from '@/lib/theme';

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.origin : '';
    const shareText = `🏆 Toronto Cup Pong Championship - The Spring Classic 🏆

Join me for Toronto's premier competitive cup pong tournament!

📅 March 2026
📍 Downtown Toronto
💰 $20 per duo team
🏅 Cash prizes for top 3 finishers

Non-alcoholic, skill-based competition. 50-100 teams competing in 16-team brackets.

Sign up for the waitlist:
${url}`;

    try {
      await navigator.clipboard.writeText(shareText);
      alert('Shareable message copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ background: `${palette.darkNavy}cc`, borderColor: `${palette.slate}` }}>
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm md:text-base transition-all font-medium hover:scale-105"
            style={{ color: palette.cream, fontFamily: fonts.body }}
            onMouseEnter={(e) => e.currentTarget.style.color = palette.orange}
            onMouseLeave={(e) => e.currentTarget.style.color = palette.cream}
          >
            What Is It?
          </button>
          <button
            onClick={() => scrollToSection('format')}
            className="text-sm md:text-base transition-all font-medium hover:scale-105"
            style={{ color: palette.cream, fontFamily: fonts.body }}
            onMouseEnter={(e) => e.currentTarget.style.color = palette.orange}
            onMouseLeave={(e) => e.currentTarget.style.color = palette.cream}
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('share')}
            className="text-sm md:text-base transition-all font-medium hover:scale-105"
            style={{ color: palette.cream, fontFamily: fonts.body }}
            onMouseEnter={(e) => e.currentTarget.style.color = palette.orange}
            onMouseLeave={(e) => e.currentTarget.style.color = palette.cream}
          >
            Share Event
          </button>
          <button
            onClick={() => scrollToSection('waitlist')}
            className="text-sm md:text-base px-4 md:px-6 py-2 font-bold rounded-full transition-all hover:scale-105"
            style={{ background: palette.orange, color: palette.cream, fontFamily: fonts.heading }}
          >
            SIGN UP
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-sm md:text-base transition-all font-medium hover:scale-105"
            style={{ color: palette.cream, fontFamily: fonts.body }}
            onMouseEnter={(e) => e.currentTarget.style.color = palette.orange}
            onMouseLeave={(e) => e.currentTarget.style.color = palette.cream}
          >
            FAQs
          </button>
        </div>
      </nav>
    </header>
  );
}
