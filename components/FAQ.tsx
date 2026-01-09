'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "How much does it cost to enter?",
    answer: "$10 per duo team. That's it! This gets you tournament entry and access to compete with other cup pong enthusiasts at a downtown Toronto bar."
  },
  {
    question: "Will there be alcohol?",
    answer: "Yes! This is a bar event, so alcohol will be available for purchase. However, drinks and food are not included in the entry fee—you can purchase them directly from the bar."
  },
  {
    question: "What's the tournament format?",
    answer: "This is a smaller, more intimate tournament with a max of 64 teams. We organize teams into 16-team mini-brackets. Win and you advance, lose and you drop to the redemption bracket for another chance. Everyone is guaranteed at least two games!"
  },
  {
    question: "When and where is this happening?",
    answer: "The event is planned for late February - March 2026 at a downtown Toronto bar. We'll email all registered teams with the exact date and venue details as we finalize arrangements!"
  },
  {
    question: "Can I register as a solo player?",
    answer: "Not directly, but we've got you! Email info@tocuppongchampions.ca and we'll help match you with a partner. This is a great way to meet someone new before the event."
  },
  {
    question: "How do I pay the $10?",
    answer: "Payment instructions will be sent to you in the confirmation email after you sign up. We'll provide all the details you need to complete your registration."
  },
  {
    question: "What happens after I sign up?",
    answer: "You'll get a confirmation email right away with payment instructions. We'll also send you updates about the venue, date, and everything else you need to know before the event."
  },
  {
    question: "What's included in the entry fee?",
    answer: "Your $10 entry fee covers tournament participation and equipment. Food and drinks are available for purchase from the bar throughout the event."
  },
  {
    question: "What should we bring?",
    answer: "Just yourself and a friend! We provide all the cup pong equipment. Bring your game face and some cash for food and drinks at the bar."
  },
  {
    question: "Why is this event happening?",
    answer: "We're shooting content for our social media and wanted to host a fun mini tournament for friends and anyone who wants to play cup pong. It's a way to test our tournament concept while creating awesome content!"
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
