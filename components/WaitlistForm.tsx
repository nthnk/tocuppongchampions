'use client';

import { useState } from 'react';

type FormStep = 'form' | 'otp';

export function WaitlistForm() {
  const [formData, setFormData] = useState({
    teamName: '',
    player1FirstName: '',
    player1LastName: '',
    player2FirstName: '',
    player2LastName: '',
    email: '',
  });
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState<FormStep>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification code');
      }

      setStep('otp');
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to send verification code');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          code: otpCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid verification code');
      }

      setSubmitStatus('success');
      setFormData({
        teamName: '',
        player1FirstName: '',
        player1LastName: '',
        player2FirstName: '',
        player2LastName: '',
        email: '',
      });
      setOtpCode('');
      setStep('form');
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Verification failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend code');
      }

      setOtpCode('');
      alert('New verification code sent!');
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to resend code');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtpCode(value);
  };

  const handleBackToForm = () => {
    setStep('form');
    setOtpCode('');
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  return (
    <section id="waitlist" className="py-24 px-6" style={{ borderTop: '1px solid rgba(226, 125, 96, 0.2)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black mb-6" style={{ fontFamily: 'Pacifico, cursive', color: '#E27D60' }}>
            Join the Waitlist
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(to right, #E27D60, #C38D9E)' }} />
          <p className="text-xl mb-6" style={{ fontFamily: 'DM Sans, sans-serif', color: '#2D3436', opacity: 0.7 }}>
            Reserve your spot and be part of something fun!
          </p>
          <div className="rounded-xl p-6 text-left max-w-2xl mx-auto" style={{ background: 'rgba(65, 179, 163, 0.1)', border: '1px solid rgba(65, 179, 163, 0.3)' }}>
            <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'DM Sans, sans-serif', color: '#2D3436' }}>Why Join the Waitlist?</h3>
            <p className="leading-relaxed mb-4" style={{ fontFamily: 'DM Sans, sans-serif', color: '#2D3436' }}>
              We're seeing how many people are interested! Once we hit our target number, we'll lock in an awesome venue in Downtown Toronto, send out payment details, and set a date. The more people who sign up, the better this event will be!
            </p>
            <div className="flex items-start gap-3 rounded-lg p-4" style={{ color: '#E8A87C', background: 'rgba(232, 168, 124, 0.1)', border: '1px solid rgba(232, 168, 124, 0.3)' }}>
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="font-semibold mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>18+ Event Only</p>
                <p className="text-sm" style={{ fontFamily: 'DM Sans, sans-serif', color: '#E27D60' }}>Valid government-issued ID will be checked at the entrance. No exceptions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-8 md:p-12 backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(226, 125, 96, 0.2)' }}>
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Name */}
              <div>
                <label htmlFor="teamName" className="block text-sm font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif', color: '#2D3436' }}>
                  Team Name *
                </label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  required
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder="e.g., The Swish Squad"
                  className="w-full px-4 py-4 rounded-xl focus:outline-none transition-all"
                  style={{ background: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(226, 125, 96, 0.3)', color: '#2D3436' }}
                />
              </div>

              {/* Player 1 */}
              <div>
                <label className="block text-sm font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif', color: '#2D3436' }}>
                  Player 1 *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    id="player1FirstName"
                    name="player1FirstName"
                    required
                    value={formData.player1FirstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full px-4 py-4 rounded-xl focus:outline-none transition-all"
                    style={{ background: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(226, 125, 96, 0.3)', color: '#2D3436' }}
                  />
                  <input
                    type="text"
                    id="player1LastName"
                    name="player1LastName"
                    required
                    value={formData.player1LastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-4 rounded-xl focus:outline-none transition-all"
                    style={{ background: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(226, 125, 96, 0.3)', color: '#2D3436' }}
                  />
                </div>
              </div>

              {/* Player 2 */}
              <div>
                <label className="block text-sm font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif', color: '#2D3436' }}>
                  Player 2 *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    id="player2FirstName"
                    name="player2FirstName"
                    required
                    value={formData.player2FirstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full px-4 py-4 rounded-xl focus:outline-none transition-all"
                    style={{ background: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(226, 125, 96, 0.3)', color: '#2D3436' }}
                  />
                  <input
                    type="text"
                    id="player2LastName"
                    name="player2LastName"
                    required
                    value={formData.player2LastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-4 rounded-xl focus:outline-none transition-all"
                    style={{ background: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(226, 125, 96, 0.3)', color: '#2D3436' }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif', color: '#2D3436' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-4 rounded-xl focus:outline-none transition-all"
                  style={{ background: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(226, 125, 96, 0.3)', color: '#2D3436' }}
                />
                <p className="mt-2 text-sm" style={{ fontFamily: 'DM Sans, sans-serif', color: '#2D3436', opacity: 0.6 }}>
                  We'll send a verification code to this email
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-5 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                style={{ background: 'linear-gradient(to right, #E27D60, #C38D9E)', color: '#FDF6E3', boxShadow: '0 8px 30px rgba(226, 125, 96, 0.4)' }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Code...
                  </>
                ) : (
                  <>
                    Continue
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Check Your Email</h3>
                <p className="text-slate-400">
                  We sent a 6-digit code to <span className="text-white font-semibold">{formData.email}</span>
                </p>
              </div>

              <div>
                <label htmlFor="otpCode" className="block text-sm font-semibold text-white mb-2 uppercase tracking-wide text-center">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="otpCode"
                  name="otpCode"
                  required
                  value={otpCode}
                  onChange={handleOTPChange}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-6 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all text-center text-3xl font-bold tracking-widest"
                  autoComplete="off"
                />
                <p className="mt-2 text-sm text-slate-400 text-center">
                  Code expires in 10 minutes
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otpCode.length !== 6}
                className="w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Join Waitlist
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={handleBackToForm}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ← Change email
                </button>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isSubmitting}
                  className="text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                >
                  Resend code
                </button>
              </div>
            </form>
          )}

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mt-6 p-4 bg-green-600/20 border border-green-500/50 rounded-xl flex items-start gap-3">
              <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold text-green-400 mb-1">You're on the list!</h4>
                <p className="text-sm text-green-300">We'll email you with all the details once we lock in the venue. See you there!</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && errorMessage && (
            <div className="mt-6 p-4 bg-red-600/20 border border-red-500/50 rounded-xl flex items-start gap-3">
              <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold text-red-400 mb-1">Error</h4>
                <p className="text-sm text-red-300">{errorMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
