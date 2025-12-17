export function TournamentFormat() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Tournament Format
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Structured competition designed for maximum excitement and fairness
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Mini Brackets */}
          <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm hover:border-blue-500/40 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">16-Team Brackets</h3>
            <p className="text-slate-400 leading-relaxed">
              Teams are organized into mini-brackets of 16 for balanced competition and faster gameplay
            </p>
          </div>

          {/* Single Elimination */}
          <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm hover:border-purple-500/40 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Single Elimination</h3>
            <p className="text-slate-400 leading-relaxed">
              High-stakes matches where every shot counts. Win or go home (or to redemption)
            </p>
          </div>

          {/* Losers Bracket */}
          <div className="bg-gradient-to-br from-pink-600/10 to-red-600/10 border border-pink-500/20 rounded-2xl p-8 backdrop-blur-sm hover:border-pink-500/40 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-red-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Losers Bracket</h3>
            <p className="text-slate-400 leading-relaxed">
              First-round losers get a second chance in the losers bracket to fight back (guaranteed minimum two matches)
            </p>
          </div>
        </div>

        {/* Format Flow */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h3>

          <div className="grid md:grid-cols-4 gap-6 md:gap-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-center">
                <div className="text-3xl font-black text-white mb-2">1</div>
                <p className="text-sm font-semibold text-white">Check-In & Seeding</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-4">
                <svg className="text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-center">
                <div className="text-3xl font-black text-white mb-2">2</div>
                <p className="text-sm font-semibold text-white">Bracket Play Begins</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-4">
                <svg className="text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-pink-600 to-red-600 rounded-xl p-6 text-center">
                <div className="text-3xl font-black text-white mb-2">3</div>
                <p className="text-sm font-semibold text-white">Losers Bracket</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-4">
                <svg className="text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl p-6 text-center">
                <div className="text-3xl font-black text-white mb-2">4</div>
                <p className="text-sm font-semibold text-white">Finals & Prizes</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-600/10 border border-blue-500/20 rounded-xl">
            <p className="text-center text-slate-300 text-lg">
              <span className="font-bold text-white">Expected duration:</span> Full day event with multiple brackets running simultaneously
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
