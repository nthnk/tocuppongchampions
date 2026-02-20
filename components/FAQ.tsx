'use client';

import { useState } from 'react';
import { palette, fonts } from '@/lib/theme';

const faqs = [
  {
    question: "WHY IS THIS EVENT HAPPENING?",
    answer: "Practically everyone we've talked to says there's nothing interesting to do in Toronto in the winter. We wanted to put together something fun and social — an excuse to bring a bunch of people together. This is our first of many events, so we're testing out our format before scaling up."
  },
  {
    question: "WHY IS THIS 19+?",
    answer: "Since the event is at a brewery and alcohol will be available for purchase, it's a 19+ event. Beyond that, we want to keep the vibe right — this is an adults-only social experience."
  },
  {
    question: "DO I HAVE TO DRINK TO PLAY?",
    answer: "Nope. Drinking is completely optional. It's not part of the game at all — you're there to compete, hang out, and have fun. Grab a drink if you want, or don't. No pressure either way."
  },
  {
    question: "WILL THERE BE BEER IN THE CUPS?",
    answer: "No. It's actually illegal to have beer in the cups, so they'll be filled with water. You're welcome to drink whatever you'd like on the side, but the game cups are water only."
  },
  {
    question: "CAN I SHOW UP WITHOUT REGISTERING?",
    answer: "No. Walk-ins will not be accepted under any circumstances. All teams must register online and pay the $10 entry fee before the event. This is because walk-ins would disrupt our bracket structure, and the venue has strict capacity limits that we cannot exceed. If you haven't registered and paid, you will not be allowed in."
  },
  {
    question: "CAN I BRING SPECTATORS?",
    answer: "Only if you're a registered team. When you register, you'll indicate how many spectators you'd like to bring. However, spectator spots are not guaranteed — they are approved on a first come, first serve basis. The venue has a legal capacity limit of 150 people and we expect to be very close to it. We'll reach out to let teams know if their spectators have been confirmed. Spectators who are not associated with a registered team will not be allowed entry."
  },
  {
    question: "HOW MUCH DOES IT COST?",
    answer: "$10 per duo team. You pay online when you register. Drinks and food are not included — you can purchase them at the bar."
  },
  {
    question: "WILL THERE BE ALCOHOL?",
    answer: "Yes. The event is at Samara Brewing Co., so drinks will be available for purchase. Food and drinks are not included in the entry fee."
  },
  {
    question: "WHAT'S THE TOURNAMENT FORMAT?",
    answer: "32 teams across 4 brackets. Single elimination — you lose, you're out. But don't worry, there's still plenty to do. We'll have cornhole, board games, and other organized social games running throughout the event so the fun doesn't stop."
  },
  {
    question: "WHAT HAPPENS IF I LOSE?",
    answer: "If you're eliminated from the bracket, there's still plenty to do. We'll have board games, cornhole, a photo booth, and other games set up throughout the venue, so you can hang out, have fun, and watch the final matches to see who gets crowned the winner."
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
    question: "HOW DO I GET A REFUND?",
    answer: "Email info@tocuppongchampions.ca with the email you used to register and let us know which email you'd like us to send the e-transfer refund to. We'll get it sorted."
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
