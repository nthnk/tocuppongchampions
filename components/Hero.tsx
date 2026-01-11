export function Hero() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/pong-background.jpg)' }}
      />

      {/* Retro gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(226, 125, 96, 0.3) 0%, rgba(195, 141, 158, 0.3) 50%, rgba(232, 168, 124, 0.3) 100%)' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        {/* Event badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 border rounded-full mb-8 backdrop-blur-sm" style={{ background: 'rgba(253, 246, 227, 0.2)', borderColor: '#85DCBA' }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#85DCBA' }} />
          <span className="font-semibold text-sm tracking-wide uppercase" style={{ color: '#2D3436' }}>Downtown Toronto (Venue TBD)</span>
        </div>

        {/* Main headline with Pacifico font */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2 tracking-tight" style={{ fontFamily: 'Pacifico, cursive', color: '#E27D60', textShadow: '2px 2px 0 #E8A87C' }}>
          Cup Pong Dudes
        </h1>

        <div className="text-sm sm:text-base md:text-lg mb-6" style={{ fontFamily: 'Pacifico, cursive', color: '#2D3436', opacity: 0.5 }}>
          present
        </div>

        <div className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 max-w-4xl mx-auto" style={{ fontFamily: 'Pacifico, cursive', color: '#E27D60', textShadow: '3px 3px 0 #E8A87C', lineHeight: '1.2' }}>
          The Toronto Cup Pong Championship
        </div>

        <div className="text-lg sm:text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: 'DM Sans, sans-serif', color: '#2D3436' }}>
          Late February - March 2026
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto px-4" style={{ fontFamily: 'DM Sans, sans-serif', color: '#2D3436', opacity: 0.8 }}>
          Meet new people, make memories, and find out who's Toronto's best cup pong duo.
        </p>

        {/* Stats grid with retro colors */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 max-w-2xl mx-auto mb-12 px-4">
          <div className="backdrop-blur-md border rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-6" style={{ background: 'rgba(255, 255, 255, 0.5)', borderColor: 'rgba(226, 125, 96, 0.3)', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1" style={{ color: '#2D3436' }}>MAX 64</div>
            <div className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif', color: '#2D3436', opacity: 0.6 }}>Teams</div>
          </div>
          <div className="backdrop-blur-md border rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-6" style={{ background: 'rgba(255, 255, 255, 0.5)', borderColor: 'rgba(195, 141, 158, 0.3)', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1" style={{ color: '#2D3436' }}>$10</div>
            <div className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif', color: '#2D3436', opacity: 0.6 }}>Per Duo</div>
          </div>
          <div className="backdrop-blur-md border rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-6" style={{ background: 'rgba(255, 255, 255, 0.5)', borderColor: 'rgba(232, 168, 124, 0.3)', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1" style={{ color: '#2D3436' }}>16</div>
            <div className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif', color: '#2D3436', opacity: 0.6 }}>Team Brackets</div>
          </div>
        </div>

        {/* CTA Button with brand colors */}
        <button
          onClick={scrollToWaitlist}
          className="group relative inline-flex items-center gap-3 px-12 py-6 text-xl font-bold rounded-full transition-all duration-300 hover:scale-105"
          style={{ background: 'linear-gradient(to right, #E27D60, #C38D9E)', color: '#FDF6E3', boxShadow: '0 8px 30px rgba(226, 125, 96, 0.4)' }}
        >
          <span>Sign Up Now</span>
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6" style={{ color: '#2D3436', opacity: 0.5 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
