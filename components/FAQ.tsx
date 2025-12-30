'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "How much does it cost to enter?",
    answer: "$20 per duo team. That's it! This gets you tournament entry, venue access, and a shot at the prizes."
  },
  {
    question: "Is this really non-alcoholic?",
    answer: "Yep! We just want to find Toronto's best cup pong duo without dealing with liquor licensing. Plus, everyone stays sharp and can actually remember if they won or lost."
  },
  {
    question: "What's the tournament format?",
    answer: "We organize teams into 16-team mini-brackets. Win and you advance, lose and you drop to the redemption bracket for another chance. Everyone is guaranteed at least two games! The exact format might adjust based on how many teams sign up."
  },
  {
    question: "When will the venue be announced?",
    answer: "We'll email all registered teams about 30 days before the event. The more people who sign up, the better venue we can secure in Downtown Toronto - so spread the word!"
  },
  {
    question: "Can I register as a solo player?",
    answer: "Not directly, but we've got you! Email info@tocuppongchampions.ca and we'll help match you with a partner. This is a great way to meet someone new before the event."
  },
  {
    question: "What happens after I join the waitlist?",
    answer: "You'll get a confirmation email right away. As we lock in the venue and payment system, we'll send you updates with everything you need to secure your spot."
  },
  {
    question: "Are there prizes?",
    answer: "Absolutely! We'll announce the full prize pool closer to the event. Expect cash prizes for the top 3 teams, plus awards and major bragging rights for the champions."
  },
  {
    question: "What should we bring?",
    answer: "Just yourself and a friend! We provide all the equipment. Wear something comfortable - and bring your best game face (optional but encouraged)."
  },
  {
    question: "Why is the event 18+ if there's no alcohol?",
    answer: "We want to keep the vibe mature and social - this is designed as a fun adult hangout where people can meet others with similar interests. Think of it as a chill day out with a competitive twist!"
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
