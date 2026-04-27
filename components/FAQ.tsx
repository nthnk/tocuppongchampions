'use client';

import { useState } from 'react';
import { palette, fonts } from '@/lib/theme';
import { SectionHeader } from '@/components/brand/Primitives';
import { Reveal } from '@/components/brand/Reveal';

const FAQS = [
  {
    q: 'When is the next event?',
    a: "We don't have one on the calendar right now, but we're working on it. Follow @play6cups and you'll be the first to know when registration opens.",
  },
  {
    q: 'Why is this 19+?',
    a: 'Events are at breweries and distilleries where alcohol is available. Beyond that, we want to keep the vibe right. This is an adults-only social experience.',
  },
  {
    q: 'Do I have to drink to play?',
    a: "Nope. Drinking is completely optional. Cups are filled with water (it's actually illegal to put beer in them).",
  },
  {
    q: 'How much does it cost?',
    a: '$10 per duo. You pay online when you register. Drinks and food are not included. The bar handles those.',
  },
  {
    q: "What's the format?",
    a: 'Up to 32 teams across 4 brackets. Single elimination. Plus cornhole, board games, and other social games running throughout the day so the fun keeps going if you get knocked out.',
  },
  {
    q: 'Can I sign up solo?',
    a: "Not directly, but we can pair you up. Email info@tocuppongchampions.ca and we'll find you a teammate.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section
      id="faq"
      style={{
        background: palette.foam,
        padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 24px)',
      }}
    >
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <Reveal>
          <SectionHeader tag="Questions" headline="FAQ" align="center" />
        </Reveal>
        <div style={{ marginTop: 56 }}>
          {FAQS.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={80 + i * 60}>
              <div
                style={{
                  borderBottom: '2px solid rgba(0,0,0,0.12)',
                  borderLeft: isOpen
                    ? `3px solid ${palette.cupRed}`
                    : '3px solid transparent',
                  background: isOpen ? 'rgba(240,11,31,0.04)' : 'transparent',
                  transition: 'background 250ms cubic-bezier(0.16,1,0.3,1), border-color 250ms cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 16px',
                    background: 'transparent',
                    border: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: fonts.heading,
                    fontSize: 16,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: palette.blackout,
                  }}
                >
                  <span>{it.q}</span>
                  <span
                    style={{
                      color: palette.cupRed,
                      transition: 'transform 250ms cubic-bezier(0.16,1,0.3,1)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                      display: 'inline-flex',
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  style={{
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 350ms cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <div style={{ minHeight: 0 }}>
                    <div
                      style={{
                        padding: '0 16px 24px',
                        fontFamily: fonts.body,
                        fontSize: 15,
                        lineHeight: 1.65,
                        opacity: isOpen ? 0.78 : 0,
                        transform: isOpen ? 'translateY(0)' : 'translateY(-6px)',
                        transition: 'opacity 250ms ease, transform 300ms cubic-bezier(0.16,1,0.3,1)',
                      }}
                    >
                      {it.a}
                    </div>
                  </div>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>

        <div style={{ marginTop: 56, textAlign: 'center' }}>
          <p className="t-tag" style={{ opacity: 0.6, marginBottom: 14 }}>
            Still have questions?
          </p>
          <a
            href="mailto:info@tocuppongchampions.ca"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: fonts.heading,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontSize: 14,
              padding: '14px 28px',
              background: palette.cupRed,
              color: palette.foam,
              textDecoration: 'none',
            }}
          >
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}
