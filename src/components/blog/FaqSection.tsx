"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
  title?: string;
}

export function FaqSection({ faqs, title = "Frequently Asked Questions" }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="my-12 pt-8 border-t border-slate-200 dark:border-slate-800" aria-labelledby="faq-title">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-5 h-5 text-blue-600" />
        <h2 id="faq-title" className="text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="card-editorial overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
