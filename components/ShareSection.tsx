'use client';

import { useState } from 'react';
import { palette, fonts } from '@/lib/theme';

export function ShareSection() {
  const [copied, setCopied] = useState(false);

  const shareText = `🏆 Toronto Cup Pong Championship - The Inaugural Fall Classic 🏆

Come hang, compete, and meet new people at Toronto's most fun cup pong tournament!

📍 Downtown Toronto
💰 $20 per duo team
🏅 Cash prizes + bragging rights for top teams

Non-alcoholic, everyone's welcome. Let's find Toronto's best cup pong duo!

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
    <section id="share" className="py-24 px-6" style={{ borderTop: `1px solid ${palette.orange}33` }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: fonts.heading, color: palette.orange }}>
            Help Us Make This Happen
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: `linear-gradient(to right, ${palette.red}, ${palette.orange}, ${palette.blue})` }} />
        </div>

        <div className="rounded-2xl p-8 md:p-12 backdrop-blur-sm" style={{ background: `${palette.slate}E6`, border: `1px solid ${palette.orangeLight}4D` }}>
          <div className="space-y-6 mb-8">
            <p className="text-lg md:text-xl leading-relaxed text-center" style={{ fontFamily: fonts.body, color: palette.white }}>
              The more people who join, the more <span className="font-bold" style={{ color: palette.orange }}>epic</span> this event becomes!
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: palette.red }}>
                  <svg className="w-6 h-6" style={{ color: palette.white }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: fonts.body, color: palette.white }}>Get a Better Venue</h3>
                  <p style={{ fontFamily: fonts.body, color: palette.gray100 }}>More signups = cooler location in Downtown Toronto</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: palette.blue }}>
                  <svg className="w-6 h-6" style={{ color: palette.white }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: fonts.body, color: palette.white }}>Bigger Prize Pool</h3>
                  <p style={{ fontFamily: fonts.body, color: palette.gray100 }}>More teams = bigger prizes and even better bragging rights</p>
                </div>
              </div>
            </div>

            <p className="text-center text-lg mt-8" style={{ fontFamily: fonts.body, color: palette.gray100 }}>
              Share with your friends and anyone looking for a fun way to meet people!
            </p>
          </div>

          <button
            onClick={handleShare}
            className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105"
            style={{ background: `linear-gradient(to right, ${palette.orange}, ${palette.orangeLight})`, color: palette.cream, boxShadow: `0 8px 30px ${palette.orange}66` }}
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

          <p className="text-center text-sm mt-4" style={{ fontFamily: fonts.body, color: palette.slate, opacity: 0.5 }}>
            Copies a pre-written message and link you can paste anywhere
          </p>
        </div>
      </div>
    </section>
  );
}
