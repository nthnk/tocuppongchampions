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

      {/* Dark overlay for text visibility */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        {/* Event badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full mb-8 backdrop-blur-sm">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-blue-300 font-semibold text-sm tracking-wide uppercase">Downtown Toronto</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
          TORONTO CUP PONG
          <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            CHAMPIONSHIP
          </span>
        </h1>

        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
          Coming Soon Spring 2026
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto px-4" style={{ color: '#e3e4e6' }}>
          Meet new people, make memories, and find out who's Toronto's best cup pong duo.
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 max-w-2xl mx-auto mb-12 px-4">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">50-100</div>
            <div className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wide" style={{ color: '#e3e4e6' }}>Teams</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">$40</div>
            <div className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wide" style={{ color: '#e3e4e6' }}>Per Duo</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">16</div>
            <div className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wide" style={{ color: '#e3e4e6' }}>Team Brackets</div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToWaitlist}
          className="group relative inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-full hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105"
        >
          <span>Join the Waitlist</span>
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
