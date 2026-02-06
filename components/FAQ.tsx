'use client';

import { useState } from 'react';
import { palette, fonts } from '@/lib/theme';

const faqs = [
  {
    question: "HOW DOES THE WAITLIST WORK?",
    answer: "Table Zero has 32 spots. The waitlist is open to everyone — sign up and we'll keep you updated. We're currently in talks with breweries in downtown Toronto to lock in a venue. Once we have a confirmed date and location, we'll open registration and reach out to everyone on the list."
  },
  {
    question: "WHEN WILL REGISTRATION OPEN?",
    answer: "We're finalizing a venue partnership with a downtown Toronto brewery right now. Once the venue and date are confirmed, we'll open registration and notify everyone on the waitlist. We're targeting April 2026."
  },
  {
    question: "HOW MUCH DOES IT COST?",
    answer: "$10 per duo team. Payment instructions will be sent once registration opens and your spot is confirmed. Drinks and food are not included — you can purchase them at the bar."
  },
  {
    question: "WILL THERE BE ALCOHOL?",
    answer: "Yes. We're partnering with a brewery in downtown Toronto, so drinks will be available for purchase. Food and drinks are not included in the entry fee."
  },
  {
    question: "WHAT'S THE TOURNAMENT FORMAT?",
    answer: "32 teams in a double-elimination bracket. Win and advance. Lose your first game and you drop to the loser's bracket, where you can fight your way back later in the tournament. Lose twice and you're out. We'll share more details closer to the event."
  },
  {
    question: "WHAT HAPPENS WHEN I LOSE?",
    answer: "If you're eliminated from the bracket, there's still plenty to do. We'll have other games and entertainment set up throughout the venue, so you can hang out, have fun, and watch the final matches to see who gets crowned the winner."
  },
  {
    question: "WHEN AND WHERE IS THIS HAPPENING?",
    answer: "April 2026 at a brewery in downtown Toronto. We're currently in talks with venues and will confirm the exact date and location soon. Everyone on the waitlist will be the first to know."
  },
  {
    question: "CAN I REGISTER AS A SOLO PLAYER?",
    answer: "Not directly. You need a partner to sign up. If you need help finding one, email info@tocuppongchampions.ca and we'll try to match you with someone."
  },
  {
    question: "WHAT SHOULD I BRING?",
    answer: "Just yourself and your teammate. We provide all equipment. Bring cash or card for food and drinks at the bar."
  },
  {
    question: "WHY IS THIS EVENT HAPPENING?",
    answer: "Table Zero is the first official 6CUPS event. We're capturing content and testing our tournament format with a small group before scaling up. Think of it as the origin story."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-28 px-6" style={{ background: palette.darkSlate }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <span
            className="text-xs font-bold uppercase tracking-[0.4em]"
            style={{ fontFamily: fonts.body, color: palette.red }}
          >
            Questions
          </span>
        </div>
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl font-black mb-6 uppercase"
            style={{ fontFamily: fonts.heading, color: palette.cream }}
          >
            FAQ
          </h2>
          <div
            className="w-16 h-1 mx-auto"
            style={{ background: palette.red }}
          />
        </div>

        {/* FAQ Items */}
        <div>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden transition-all"
              style={{
                background: openIndex === index ? palette.darkMaroon : 'transparent',
                borderBottom: `2px solid ${palette.slate}`,
                borderLeft: openIndex === index ? `3px solid ${palette.red}` : '3px solid transparent',
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 md:px-6 py-5 flex items-center justify-between text-left gap-4"
              >
                <h3
                  className="text-base md:text-lg font-bold uppercase tracking-wider"
                  style={{ fontFamily: fonts.heading, color: palette.cream }}
                >
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                  style={{ color: palette.red }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-4 md:px-6 pb-5">
                  <p
                    className="text-sm md:text-base leading-relaxed"
                    style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.7 }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-16 text-center">
          <p
            className="mb-6 text-sm font-bold uppercase tracking-widest"
            style={{ fontFamily: fonts.body, color: palette.cream, opacity: 0.6 }}
          >
            Still have questions?
          </p>
          <a
            href="mailto:info@tocuppongchampions.ca"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest px-6 py-3 transition-all hover:opacity-80"
            style={{
              color: palette.cream,
              fontFamily: fonts.heading,
              background: palette.red,
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            CONTACT US
          </a>
        </div>
      </div>
    </section>
  );
}
