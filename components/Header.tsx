'use client';

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.origin : '';
    const shareText = `🏆 Toronto Cup Pong Championship - The Inaugural Fall Classic 🏆

Join me for Toronto's premier competitive cup pong tournament!

📅 September 2026
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
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ background: 'rgba(253, 246, 227, 0.9)', borderColor: 'rgba(226, 125, 96, 0.2)' }}>
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm md:text-base transition-all font-medium hover:scale-105"
            style={{ color: '#2D3436', fontFamily: 'DM Sans, sans-serif' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#E27D60'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#2D3436'}
          >
            What Is It?
          </button>
          <button
            onClick={() => scrollToSection('format')}
            className="text-sm md:text-base transition-all font-medium hover:scale-105"
            style={{ color: '#2D3436', fontFamily: 'DM Sans, sans-serif' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#E27D60'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#2D3436'}
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('share')}
            className="text-sm md:text-base transition-all font-medium hover:scale-105"
            style={{ color: '#2D3436', fontFamily: 'DM Sans, sans-serif' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#E27D60'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#2D3436'}
          >
            Share Event
          </button>
          <button
            onClick={() => scrollToSection('waitlist')}
            className="text-sm md:text-base px-4 md:px-6 py-2 font-bold rounded-full transition-all hover:scale-105"
            style={{ background: 'linear-gradient(to right, #E27D60, #C38D9E)', color: '#FDF6E3', fontFamily: 'DM Sans, sans-serif' }}
          >
            Sign Up
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-sm md:text-base transition-all font-medium hover:scale-105"
            style={{ color: '#2D3436', fontFamily: 'DM Sans, sans-serif' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#E27D60'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#2D3436'}
          >
            FAQs
          </button>
        </div>
      </nav>
    </header>
  );
}
