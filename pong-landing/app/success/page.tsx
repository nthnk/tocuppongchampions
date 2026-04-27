'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { palette, fonts } from '@/lib/theme';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (sessionId) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [sessionId]);

  return (
    <section className="py-28 px-6 min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        {status === 'loading' && (
          <div className="text-center">
            <div
              className="animate-spin w-12 h-12 border-4 rounded-full mx-auto"
              style={{ borderColor: `${palette.slate} ${palette.slate} ${palette.red} ${palette.slate}` }}
            />
            <p className="mt-6 text-lg" style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.7 }}>
              Confirming your payment...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div
              className="w-20 h-20 flex items-center justify-center mx-auto mb-6"
              style={{ background: '#22c55e' }}
            >
              <svg className="w-10 h-10" style={{ color: palette.cream }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="mb-4">
              <span
                className="text-xs font-bold uppercase tracking-[0.4em]"
                style={{ fontFamily: fonts.body, color: '#22c55e' }}
              >
                Payment Confirmed
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-wider"
              style={{ fontFamily: fonts.heading, color: palette.cream }}
            >
              YOU&apos;RE <span style={{ color: palette.red }}>IN</span>
            </h1>

            <p
              className="text-base md:text-lg leading-relaxed max-w-md mx-auto mb-10"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.7 }}
            >
              Your spot at Table Zero is locked in. Check your email for confirmation and event details.
            </p>

            <div
              className="p-6 mb-8 text-left"
              style={{ background: palette.darkSlate, borderLeft: `3px solid ${palette.red}` }}
            >
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ fontFamily: fonts.heading, color: palette.cream, opacity: 0.7 }}
              >
                Event Details
              </h3>
              <div className="space-y-2" style={{ fontFamily: fonts.body }}>
                <p style={{ color: palette.cream, opacity: 0.9 }}>
                  <strong>When:</strong> March 22, 2026
                </p>
                <p style={{ color: palette.cream, opacity: 0.9 }}>
                  <strong>Where:</strong> Samara Brewing Co., 90 Cawthra Ave Unit 101, Toronto
                </p>
                <p style={{ color: palette.cream, opacity: 0.9 }}>
                  <strong>Format:</strong> 32 teams, bracket style
                </p>
              </div>
            </div>

            <a
              href="/"
              className="inline-block px-8 py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 hover:opacity-90"
              style={{
                background: palette.red,
                color: palette.cream,
                fontFamily: fonts.heading,
              }}
            >
              Back to Home
            </a>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div
              className="w-20 h-20 flex items-center justify-center mx-auto mb-6"
              style={{ background: palette.red }}
            >
              <svg className="w-10 h-10" style={{ color: palette.cream }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <h1
              className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-wider"
              style={{ fontFamily: fonts.heading, color: palette.cream }}
            >
              Something went wrong
            </h1>

            <p
              className="text-base md:text-lg leading-relaxed max-w-md mx-auto mb-10"
              style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.7 }}
            >
              We couldn&apos;t confirm your payment. If you were charged, please contact us at{' '}
              <a href="mailto:info@tocuppongchampions.ca" style={{ color: palette.red }}>info@tocuppongchampions.ca</a>.
            </p>

            <a
              href="/#register"
              className="inline-block px-8 py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 hover:opacity-90"
              style={{
                background: palette.red,
                color: palette.cream,
                fontFamily: fonts.heading,
              }}
            >
              Try Again
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen relative" style={{ background: palette.black }}>
      <div className="relative z-10">
        <Header />
        <Suspense
          fallback={
            <section className="py-28 px-6 min-h-[70vh] flex items-center">
              <div className="max-w-2xl mx-auto w-full text-center">
                <div
                  className="animate-spin w-12 h-12 border-4 rounded-full mx-auto"
                  style={{ borderColor: `${palette.slate} ${palette.slate} ${palette.red} ${palette.slate}` }}
                />
                <p className="mt-6 text-lg" style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.7 }}>
                  Confirming your payment...
                </p>
              </div>
            </section>
          }
        >
          <SuccessContent />
        </Suspense>
        <Footer />
      </div>
    </main>
  );
}
