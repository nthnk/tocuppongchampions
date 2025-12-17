'use client';

import { useState } from 'react';

export function ShareSection() {
  const [copied, setCopied] = useState(false);

  const shareText = `🏆 Toronto Cup Pong Championship - The Inaugural Fall Classic 🏆

Join me for Toronto's premier competitive cup pong tournament!

📅 September 2026
📍 Downtown Toronto
💰 $40 per duo team
🏅 Cash prizes for top 3 finishers

Non-alcoholic, skill-based competition. 50-100 teams competing in 16-team brackets.

Sign up for the waitlist:`;

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.origin : '';
    const fullText = `${shareText}\n${url}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="py-24 px-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Help Us Make This Happen
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6" />
        </div>

        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <div className="space-y-6 mb-8">
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed text-center">
              The more teams we get, the more <span className="font-bold text-white">meaningful</span> the championship becomes.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Secure the Venue</h3>
                  <p className="text-slate-400">More signups = better venue options in prime Downtown Toronto locations</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Bigger Prize Pool</h3>
                  <p className="text-slate-400">More teams means larger prizes and greater bragging rights</p>
                </div>
              </div>
            </div>

            <p className="text-center text-slate-400 text-lg mt-8">
              Share with your friends, teammates, and anyone who loves competition!
            </p>
          </div>

          <button
            onClick={handleShare}
            className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50"
          >
            {copied ? (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Copy Shareable Message</span>
              </>
            )}
          </button>

          <p className="text-center text-sm text-slate-500 mt-4">
            Copies a pre-written message and link you can paste anywhere
          </p>
        </div>
      </div>
    </section>
  );
}
