'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import SignaturePad from 'signature_pad';
import {
  WAIVER_HEADER,
  WAIVER_PREAMBLE,
  WAIVER_SECTIONS,
  RULES_HEADER,
  RULES_PREAMBLE,
  RULES_SECTIONS,
  RULES_CLOSING,
  WAIVER_FOOTER,
} from '@/lib/waiver-text';

export default function WaiverPage() {
  // Form state
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [ageOnEvent, setAgeOnEvent] = useState<number | null>(null);

  // UI state
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  // Signature pad
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  // Initialize signature pad
  useEffect(() => {
    if (canvasRef.current && !signaturePadRef.current) {
      const canvas = canvasRef.current;
      signaturePadRef.current = new SignaturePad(canvas, {
        backgroundColor: 'rgb(255, 255, 255)',
        penColor: 'rgb(0, 0, 0)',
      });
      resizeCanvas();
    }
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const pad = signaturePadRef.current;
    if (!canvas || !pad) return;

    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    canvas.getContext('2d')?.scale(ratio, ratio);
    pad.clear();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // Calculate age on event date (March 22, 2026)
  useEffect(() => {
    if (!dob) {
      setAgeOnEvent(null);
      return;
    }
    const dobDate = new Date(dob + 'T00:00:00');
    const eventDate = new Date('2026-03-22T00:00:00');
    let age = eventDate.getFullYear() - dobDate.getFullYear();
    const monthDiff = eventDate.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && eventDate.getDate() < dobDate.getDate())) {
      age--;
    }
    setAgeOnEvent(age);
  }, [dob]);

  function clearSignature() {
    signaturePadRef.current?.clear();
  }

  function isValidDate(dateStr: string): boolean {
    if (!dateStr) return false;
    const [year, month, day] = dateStr.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
  }

  function validate(): string[] {
    const errs: string[] = [];
    if (!fullName.trim()) errs.push('Full legal name is required.');
    if (!dob) errs.push('Date of birth is required.');
    else if (!isValidDate(dob)) errs.push('Please enter a valid date of birth.');
    if (ageOnEvent !== null && ageOnEvent < 19) errs.push('You must be 19 or older on March 22, 2026 to attend this event.');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push('A valid email address is required.');
    const digits = phone.replace(/\D/g, '');
    if (!phone.trim()) errs.push('Mobile phone number is required.');
    else if (digits.length !== 10) errs.push('Phone number must be exactly 10 digits.');
    if (signaturePadRef.current?.isEmpty()) errs.push('Please draw your signature before submitting.');
    if (!agreed) errs.push('You must agree to the waiver terms to submit.');
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: document.getElementById('form-section')?.offsetTop || 0, behavior: 'smooth' });
      return;
    }
    setErrors([]);
    setSubmitting(true);

    try {
      const signatureData = signaturePadRef.current?.toDataURL('image/png') || '';

      const res = await fetch('/api/waiver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          dateOfBirth: dob,
          ageOnEvent,
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          photoOptOut: false,
          signatureData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors([data.error || 'Something went wrong. Please try again.']);
        setSubmitting(false);
        setTimeout(() => {
          document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }

      setConfirmationCode(data.confirmationCode);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErrors(['Network error. Please check your connection and try again.']);
      setSubmitting(false);
    }
  }

  // ===== SUCCESS SCREEN =====
  if (success) {
    return (
      <div className="min-h-screen" style={{ background: '#0a0808', color: '#f5efe6' }}>
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs tracking-[3px] uppercase mb-2" style={{ color: '#a8a29e' }}>6CUPS PRESENTS</p>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-posterama), sans-serif' }}>
              TABLE <span style={{ color: '#f61813' }}>ZERO</span>
            </h1>
          </div>

          {/* Success card */}
          <div className="text-center py-12 px-6" style={{ background: '#111010', borderLeft: '2px solid #22c55e' }}>
            <div className="inline-block px-6 py-3 mb-6 text-sm font-bold uppercase tracking-wider" style={{ background: '#22c55e', color: '#fff' }}>
              Waiver Signed Successfully
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-posterama), sans-serif' }}>
              You&apos;re all set. See you March 22nd.
            </h2>
            <p className="text-sm mb-8" style={{ color: '#a8a29e' }}>
              A confirmation email has been sent to your inbox with your entry code and event details.
            </p>
            <div className="inline-block px-8 py-4 mb-6" style={{ background: '#1c1917', border: '1px solid #333' }}>
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#a8a29e' }}>Your Confirmation Code</p>
              <p className="text-3xl font-bold tracking-wider" style={{ color: '#f61813', fontFamily: 'monospace' }}>{confirmationCode}</p>
            </div>
            <p className="text-xs" style={{ color: '#57534e' }}>
              Show this email at the front door for entry. Keep it handy.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ===== MAIN FORM =====
  return (
    <div className="min-h-screen" style={{ background: '#0a0808', color: '#f5efe6' }}>
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs tracking-[3px] uppercase mb-2" style={{ color: '#a8a29e' }}>6CUPS PRESENTS</p>
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-posterama), sans-serif' }}>
            TABLE <span style={{ color: '#f61813' }}>ZERO</span>
          </h1>
          <p className="text-xs mt-2 tracking-wider uppercase" style={{ color: '#57534e' }}>
            Event Waiver &amp; Release of Liability
          </p>
        </div>

        {/* Important notice */}
        <div className="mb-6 px-4 py-3 text-xs" style={{ background: '#1a0a08', borderLeft: '2px solid #f61813', color: '#f5efe6' }}>
          <strong style={{ color: '#f61813' }}>IMPORTANT:</strong> Read the entire waiver and rules below before signing. This is a legally binding document.
          You must be <strong>19 years of age or older</strong> to attend. Valid government-issued photo ID is required at entry.
        </div>

        {/* Waiver text - scrollable */}
        <div
          className="mb-8 overflow-y-auto text-xs leading-relaxed"
          style={{
            background: '#111010',
            border: '1px solid #222',
            maxHeight: '50vh',
            padding: '20px',
            color: '#d4d0c8',
          }}
        >
          {/* WAIVER */}
          <div className="mb-6">
            <pre className="whitespace-pre-wrap font-sans text-center font-bold text-sm mb-4" style={{ color: '#f5efe6' }}>
              {WAIVER_HEADER}
            </pre>
            <pre className="whitespace-pre-wrap font-sans mb-6" style={{ color: '#f61813', fontWeight: 600 }}>
              {WAIVER_PREAMBLE}
            </pre>

            {WAIVER_SECTIONS.map((section) => (
              <div key={section.number} className="mb-5">
                <h3 className="font-bold text-xs mb-1" style={{ color: '#f5efe6' }}>
                  {section.number}. {section.title}
                </h3>
                <pre className="whitespace-pre-wrap font-sans">{section.content}</pre>
              </div>
            ))}
          </div>

          {/* Divider */}
          <hr className="my-8" style={{ borderColor: '#333' }} />

          {/* RULES */}
          <div>
            <pre className="whitespace-pre-wrap font-sans text-center font-bold text-sm mb-4" style={{ color: '#f5efe6' }}>
              {RULES_HEADER}
            </pre>
            <pre className="whitespace-pre-wrap font-sans mb-6">{RULES_PREAMBLE}</pre>

            {RULES_SECTIONS.map((section) => (
              <div key={section.letter} className="mb-5">
                <h3 className="font-bold text-xs mb-1" style={{ color: '#f5efe6' }}>
                  {section.letter}. {section.title}
                </h3>
                <pre className="whitespace-pre-wrap font-sans">{section.content}</pre>
              </div>
            ))}

            <pre className="whitespace-pre-wrap font-sans font-bold mt-6" style={{ color: '#f5efe6' }}>
              {RULES_CLOSING}
            </pre>
          </div>

          <hr className="my-6" style={{ borderColor: '#333' }} />
          <pre className="whitespace-pre-wrap font-sans text-center text-[10px]" style={{ color: '#57534e' }}>
            {WAIVER_FOOTER}
          </pre>
        </div>

        {/* FORM */}
        <div id="form-section">
          <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-posterama), sans-serif' }}>
            PARTICIPANT <span style={{ color: '#f61813' }}>DECLARATION</span>
          </h2>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mb-6 px-4 py-3" style={{ background: '#1a0a08', borderLeft: '2px solid #f61813' }}>
              {errors.map((err, i) => (
                <p key={i} className="text-sm mb-1" style={{ color: '#ff3b36' }}>{err}</p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Legal Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#a8a29e' }}>
                Full Legal Name <span style={{ color: '#f61813' }}>*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="As it appears on your government-issued ID"
                className="w-full px-4 py-3 text-sm outline-none"
                style={{ background: '#111010', border: '1px solid #333', color: '#f5efe6' }}
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#a8a29e' }}>
                Date of Birth <span style={{ color: '#f61813' }}>*</span>
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                max="2007-03-22"
                className="w-full px-4 py-3 text-sm outline-none"
                style={{ background: '#111010', border: '1px solid #333', color: '#f5efe6', colorScheme: 'dark' }}
                required
              />
            </div>

            {/* Age on Event Date */}
            {ageOnEvent !== null && (
              <div className="px-4 py-3" style={{ background: '#111010', border: '1px solid #333' }}>
                <span className="text-xs uppercase tracking-wider" style={{ color: '#a8a29e' }}>Age on March 22, 2026: </span>
                <span
                  className="text-sm font-bold ml-2"
                  style={{ color: ageOnEvent >= 19 ? '#22c55e' : '#f61813' }}
                >
                  {ageOnEvent} years old
                  {ageOnEvent < 19 && ' — Must be 19+'}
                </span>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#a8a29e' }}>
                Email Address <span style={{ color: '#f61813' }}>*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 text-sm outline-none"
                style={{ background: '#111010', border: '1px solid #333', color: '#f5efe6' }}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#a8a29e' }}>
                Mobile Phone Number <span style={{ color: '#f61813' }}>*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setPhone(digits);
                }}
                placeholder="4165551234"
                maxLength={10}
                className="w-full px-4 py-3 text-sm outline-none"
                style={{ background: '#111010', border: '1px solid #333', color: '#f5efe6' }}
                required
              />
              <p className="text-[11px] mt-1" style={{ color: '#57534e' }}>
                10 digits, no dashes or spaces ({phone.replace(/\D/g, '').length}/10)
              </p>
            </div>

            {/* Photography notice */}
            <div className="px-4 py-3" style={{ background: '#111010', border: '1px solid #333' }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#a8a29e' }}>Photography &amp; Media</p>
              <p className="text-sm" style={{ color: '#d4d0c8' }}>
                By signing this waiver, you consent to being photographed and filmed at this Event for promotional and social media purposes, as outlined in Section 10 of the waiver.
              </p>
              <p className="text-sm mt-2" style={{ color: '#f5efe6' }}>
                <strong>If you do not wish to be photographed or filmed, you must personally deliver a signed, written declaration to the Event Organizer in person at the Venue on the day of the Event, prior to entry.</strong> Digital or email requests will not be accepted.
              </p>
            </div>

            {/* Signature pad */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#a8a29e' }}>
                Your Signature <span style={{ color: '#f61813' }}>*</span>
              </label>
              <p className="text-[11px] mb-2" style={{ color: '#57534e' }}>
                Draw your signature below using your finger (mobile) or mouse (desktop).
              </p>
              <div style={{ background: '#fff', border: '1px solid #333', touchAction: 'none' }}>
                <canvas
                  ref={canvasRef}
                  style={{ width: '100%', height: '160px', display: 'block' }}
                />
              </div>
              <button
                type="button"
                onClick={clearSignature}
                className="mt-2 px-4 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
                style={{ background: '#1c1917', border: '1px solid #333', color: '#a8a29e' }}
              >
                Clear Signature
              </button>
            </div>

            {/* Agreement checkbox */}
            <div className="px-4 py-3" style={{ background: '#1a0a08', border: '1px solid #f61813' }}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 shrink-0"
                  style={{ accentColor: '#f61813' }}
                  required
                />
                <span className="text-sm font-bold" style={{ color: '#f5efe6' }}>
                  I confirm I have read and understood the entire waiver and Event Rules &amp; Safety Guidelines, and I agree to be bound by all terms.
                </span>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 text-sm font-bold uppercase tracking-wider cursor-pointer transition-opacity"
              style={{
                background: submitting ? '#57534e' : '#f61813',
                color: '#fff',
                opacity: submitting ? 0.7 : 1,
                border: 'none',
              }}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting Waiver...
                </span>
              ) : (
                'Submit Waiver'
              )}
            </button>

            <p className="text-[10px] text-center" style={{ color: '#57534e' }}>
              By clicking Submit Waiver, your electronic signature will be recorded along with your IP address and timestamp,
              constituting a legally binding agreement under the Electronic Commerce Act, 2000, S.O. 2000, c. 17.
            </p>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 text-center" style={{ borderTop: '1px solid #1c1917' }}>
          <div className="flex justify-center mb-3">
            <svg viewBox="0 0 147.4 45.25" className="h-8 w-auto">
              <path fill="#f61813" d="M27.64,3.67c1.81,2.64-2.83,8.95-10.35,14.11C9.76,22.93,2.2,24.97.39,22.33c-1.22-1.78.49-5.22,4.04-8.86,2.68,3.24,7.43,3.95,10.97,1.53,3.53-2.42,4.58-7.11,2.53-10.78,4.67-1.99,8.5-2.34,9.72-.56Z"/>
              <path fill="#f61813" d="M17.53,3.58c.15.21.28.43.4.65-2.26.96-4.72,2.31-7.18,3.99s-4.6,3.49-6.32,5.25c-.17-.19-.32-.39-.46-.61C1.4,9.12,2.35,4,6.1,1.44,9.85-1.13,14.96-.17,17.53,3.58Z"/>
              <path fill="#f61813" d="M2.01,24.7s6.19,1.89,16.49-5.16c10.29-7.05,10.77-13.51,10.77-13.51l11.05,26.25s1.1,4.18-5.98,9.02c-7.08,4.85-11.22,3.86-11.22,3.86L2.01,24.7Z"/>
              <path fill="#f5efe6" d="M56.72,17.66c-2.1,0-4.02.38-5.1,1.86.17-3.7,1.27-5.65,4.62-5.65,1.56,0,2.56.49,3.05,1.54.18.38.54.64.96.64h2.96c.69,0,1.19-.66,1-1.33-1.06-3.82-4.94-5.03-7.96-5.03-5.05,0-9.26,3.06-9.26,11.54s4,11.5,9.26,11.5c4.43,0,8.55-1.86,8.55-7.9,0-5.28-3.65-7.18-8.08-7.18ZM56.92,27.65c-2.06,0-3.72-1.66-3.72-3.71s1.66-3.72,3.72-3.72,3.71,1.66,3.71,3.72-1.66,3.71-3.71,3.71Z"/>
              <path fill="#f5efe6" d="M90.08,23.72c-.46-.45-1.09-.73-1.81-.73h-.04c-1.08,0-2.03.69-2.43,1.7-.81,2.05-2.35,3.35-4.95,3.35-3.73,0-5.61-2.78-5.61-7.05s1.88-7.08,5.61-7.08c2.6,0,4.14,1.31,4.95,3.38.4,1.01,1.34,1.71,2.43,1.71h.03c.71,0,1.33-.27,1.78-.71.75-.71,1.06-1.87.59-2.94-.17-.39-.37-.76-.59-1.11-2.05-3.42-5.68-4.8-9.19-4.8-5.27,0-10.87,3.06-10.87,11.53s5.61,11.51,10.87,11.51c3.79,0,7.71-1.57,9.65-5.61.05-.09.09-.18.13-.27.47-1.06.17-2.2-.57-2.91Z"/>
              <path fill="#f5efe6" d="M106.76,9.93h-.02c-1.43,0-2.59,1.16-2.59,2.59v10.28c0,4.52-2,5.24-4.46,5.24s-4.45-.72-4.45-5.24v-10.28c0-1.43-1.16-2.59-2.59-2.59h-.02c-1.43,0-2.58,1.16-2.58,2.59v10.28c0,.31,0,.62.02.92.05,1.22.2,2.27.43,3.18,1.26,4.84,4.99,5.61,9.19,5.61,5.17,0,9.65-1.17,9.65-9.7v-10.28c0-1.43-1.15-2.59-2.58-2.59Z"/>
              <path fill="#f5efe6" d="M127.66,13.8c-1.09-2.35-3.37-3.75-6.83-3.75h-8.9c-1.43,0-2.59,1.15-2.59,2.58v16.96c0,1.43,1.16,2.58,2.59,2.58h.02c1.42,0,2.58-1.15,2.58-2.58v-1.72c0-1.43,1.16-2.59,2.58-2.59h3.22c4.09,0,6.85-1.61,7.74-5.06.21-.79.31-1.69.31-2.69,0-1.41-.24-2.67-.73-3.74ZM119.89,22.55c-2.41,0-4.37-1.96-4.37-4.37s1.96-4.37,4.37-4.37,4.37,1.96,4.37,4.37-1.96,4.37-4.37,4.37Z"/>
              <path fill="#f5efe6" d="M138.2,18.67c-3.1-.48-5.89-.6-5.89-2.47,0-1.39,1.19-2.17,4.3-2.17,2.03,0,3.35.64,3.94,1.55.46.71,1.19,1.19,2.03,1.19h.37c2.09,0,3.33-2.35,2.14-4.06-1.33-1.9-3.93-3.15-8.42-3.15-5,0-7.91,1.52-9,4.23-.35.85-.52,1.81-.52,2.88,0,1.53.32,2.67.93,3.54,1.17,1.66,3.38,2.35,6.39,2.97,4.98,1.04,7.25.95,7.25,2.79,0,1.48-1.56,2.18-4.38,2.18-2,0-4-.44-4.78-1.8-.48-.82-1.29-1.4-2.25-1.4h-.46c-1.9,0-3.22,2.01-2.34,3.69,1.33,2.54,4.35,3.97,9.47,3.97,6.73,0,10.43-2.18,10.43-7.5s-4.59-5.69-9.2-6.45Z"/>
            </svg>
          </div>
          <p className="text-[10px]" style={{ color: '#57534e' }}>
            Table Zero &bull; March 22, 2026 &bull; Toronto
          </p>
        </div>
      </div>
    </div>
  );
}
