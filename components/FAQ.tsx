'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "How much does it cost to enter?",
    answer: "$30 per duo team. This covers tournament entry, venue access, and eligibility for prizes."
  },
  {
    question: "Is this really non-alcoholic?",
    answer: "Yeah, we just want to crown a cup pong champion in Toronto without having to deal with the liquor licensing laws."
  },
  {
    question: "What's the tournament format?",
    answer: "Teams compete in 16-team mini-brackets using single elimination. First-round losers advance to a losers bracket for a second chance to advance. Each team is guaranteed two matches. Tournament format is set to change as we finalize the total number of teams."
  },
  {
    question: "When will the venue be announced?",
    answer: "Venue details will be emailed to all registered teams approximately 30 days before the event. Depending on the number of signups, we will be able to secure a premium location in Downtown Toronto, so please share this event with your friends!"
  },
  {
    question: "Can I register as a solo player?",
    answer: "No, this tournament is for pairs. If you need a partner, email info@tocuppongchampions.ca and we will help you find a partner!"
  },
  {
    question: "What happens after I join the waitlist?",
    answer: "You'll receive a confirmation email immediately. As we finalize venue and payment details, you'll get updates via email with instructions to secure your team's spot."
  },
  {
    question: "Are there prizes?",
    answer: "Yes! Prize pool details will be announced closer to the event. Expect cash prizes for top 3 finishers, plus awards for tournament champions."
  },
  {
    question: "What should we bring?",
    answer: "Just yourselves! All equipment is provided. We recommend comfortable athletic clothing and a competitive mindset."
  },
  {
    question: "Why is the event 18+ if there's no alcohol?",
    answer: "We're creating a competitive, professional atmosphere designed for adult participants. The 18+ age requirement ensures that all attendees can fully engage with the event's energy and vibe, maintaining the mature, high-stakes environment that makes this championship special."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-white/20 transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left gap-4"
              >
                <h3 className="text-lg md:text-xl font-bold text-white pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-blue-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 md:px-8 pb-6">
                  <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <a
            href="mailto:info@tocuppongchampions.ca"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact us at info@tocuppongchampions.ca
          </a>
        </div>
      </div>
    </section>
  );
}
