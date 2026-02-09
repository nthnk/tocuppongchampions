'use client';

import { useState } from 'react';
import { palette, fonts } from '@/lib/theme';

type FormStep = 'form' | 'otp';

export function WaitlistForm() {
  const [formData, setFormData] = useState({
    teamName: '',
    player1FirstName: '',
    player1LastName: '',
    player2FirstName: '',
    player2LastName: '',
    email: '',
    referredBy: '',
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
        referredBy: '',
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

  const inputStyle = {
    background: palette.black,
    border: `1px solid ${palette.slate}`,
    color: palette.cream,
  };

  const inputFocusClass = "w-full px-4 py-4 focus:outline-none transition-all placeholder-gray-600";

  return (
    <section id="waitlist" className="py-28 px-6" style={{ background: palette.black }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <span
            className="text-xs font-bold uppercase tracking-[0.4em]"
            style={{ fontFamily: fonts.body, color: palette.red }}
          >
            Limited Entry
          </span>
        </div>
        <div className="text-center mb-14">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 uppercase tracking-wider"
            style={{ fontFamily: fonts.heading, color: palette.cream }}
          >
            GET ON <span style={{ color: palette.red }}>THE LIST</span>
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed max-w-md mx-auto"
            style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.6 }}
          >
            32 spots. Sign up and we&apos;ll reach out when registration opens.
          </p>
        </div>

        {/* Form Card */}
        <div
          className="p-8 md:p-10"
          style={{
            background: palette.darkSlate,
            borderTop: `3px solid ${palette.red}`,
          }}
        >
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Name */}
              <div>
                <label
                  htmlFor="teamName"
                  className="block text-xs font-bold mb-2 uppercase tracking-widest"
                  style={{ fontFamily: fonts.heading, color: palette.cream }}
                >
                  TEAM NAME *
                </label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  required
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder="e.g., The Splash Bros"
                  className={inputFocusClass}
                  style={inputStyle}
                />
              </div>

              {/* Player 1 */}
              <div>
                <label
                  className="block text-xs font-bold mb-2 uppercase tracking-widest"
                  style={{ fontFamily: fonts.heading, color: palette.cream }}
                >
                  PLAYER 1 *
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
                    className={inputFocusClass}
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    id="player1LastName"
                    name="player1LastName"
                    required
                    value={formData.player1LastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className={inputFocusClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Player 2 */}
              <div>
                <label
                  className="block text-xs font-bold mb-2 uppercase tracking-widest"
                  style={{ fontFamily: fonts.heading, color: palette.cream }}
                >
                  PLAYER 2 *
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
                    className={inputFocusClass}
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    id="player2LastName"
                    name="player2LastName"
                    required
                    value={formData.player2LastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className={inputFocusClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold mb-2 uppercase tracking-widest"
                  style={{ fontFamily: fonts.heading, color: palette.cream }}
                >
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputFocusClass}
                  style={inputStyle}
                />
                <p
                  className="mt-2 text-sm"
                  style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.5 }}
                >
                  We&apos;ll send a verification code to this email
                </p>
              </div>

              {/* 19+ Notice */}
              <div
                className="flex items-start gap-3 p-4"
                style={{ background: `${palette.red}15`, border: `2px solid ${palette.red}30` }}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: palette.red }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p
                    className="font-black text-sm uppercase tracking-wider"
                    style={{ fontFamily: fonts.heading, color: palette.cream }}
                  >
                    19+ Event
                  </p>
                  <p
                    className="text-sm"
                    style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.7 }}
                  >
                    Valid ID required at entrance. No exceptions.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-6 text-lg font-black uppercase tracking-widest transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                style={{
                  background: palette.red,
                  color: palette.cream,
                  fontFamily: fonts.heading,
                  animation: !isSubmitting ? 'pulse-red 3s ease-in-out infinite' : 'none',
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SENDING CODE...
                  </>
                ) : (
                  'SUBMIT APPLICATION'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="text-center mb-6">
                <div
                  className="w-16 h-16 flex items-center justify-center mx-auto mb-4"
                  style={{ background: palette.red }}
                >
                  <svg className="w-8 h-8" style={{ color: palette.cream }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-black mb-2 uppercase tracking-wider"
                  style={{ fontFamily: fonts.heading, color: palette.cream }}
                >
                  VERIFY YOUR EMAIL
                </h3>
                <p style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.7 }}>
                  We sent a 6-digit code to <span style={{ color: palette.cream, fontWeight: 700 }}>{formData.email}</span>
                </p>
              </div>

              <div>
                <label
                  htmlFor="otpCode"
                  className="block text-xs font-bold mb-2 uppercase tracking-widest text-center"
                  style={{ fontFamily: fonts.heading, color: palette.cream }}
                >
                  VERIFICATION CODE
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
                  className="w-full px-4 py-6 focus:outline-none transition-all text-center text-3xl font-black tracking-widest placeholder-gray-600"
                  style={inputStyle}
                  autoComplete="off"
                />
                <p
                  className="mt-2 text-sm text-center"
                  style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.5 }}
                >
                  Code expires in 10 minutes
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otpCode.length !== 6}
                className="w-full px-8 py-6 text-lg font-black uppercase tracking-widest transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                style={{
                  background: palette.red,
                  color: palette.cream,
                  fontFamily: fonts.heading,
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    VERIFYING...
                  </>
                ) : (
                  'CONFIRM & JOIN'
                )}
              </button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={handleBackToForm}
                  className="transition-colors hover:opacity-80 font-bold uppercase tracking-wider"
                  style={{ color: palette.cream, opacity: 0.6 }}
                >
                  ← Change email
                </button>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isSubmitting}
                  className="transition-colors hover:opacity-80 disabled:opacity-50 font-bold uppercase tracking-wider"
                  style={{ color: palette.red }}
                >
                  Resend code
                </button>
              </div>
            </form>
          )}

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div
              className="mt-6 p-4 flex items-start gap-3"
              style={{ background: '#22c55e20', border: '2px solid #22c55e50' }}
            >
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-black mb-1 uppercase tracking-wider" style={{ fontFamily: fonts.heading, color: palette.cream }}>YOU&apos;RE ON THE WAITLIST.</h4>
                <p className="text-sm" style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.8 }}>We&apos;ll be in touch with event details and registration in the next few weeks.</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && errorMessage && (
            <div
              className="mt-6 p-4 flex items-start gap-3"
              style={{ background: `${palette.red}20`, border: `2px solid ${palette.red}50` }}
            >
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: palette.red }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-black mb-1 uppercase tracking-wider" style={{ fontFamily: fonts.heading, color: palette.cream }}>ERROR</h4>
                <p className="text-sm" style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.8 }}>{errorMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
