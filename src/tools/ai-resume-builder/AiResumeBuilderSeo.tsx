import React from "react";
import { InArticleAd } from "@/components/ads/AdUnit";
import { HelpCircle } from "lucide-react";

export function AiResumeBuilderSeo() {
  const faqs = [
    {
      q: "Are the resumes built on this platform ATS-friendly?",
      a: "Yes! Our templates use clean single-column layouts, standard ATS typography, and un-nested bullet structures that parse cleanly across all major Applicant Tracking Systems.",
    },
    {
      q: "Can I download my resume as a PDF?",
      a: "Yes! Once you fill out your information, click 'View & Print Resume PDF' to export or save a high-resolution PDF document directly from your browser.",
    },
    {
      q: "Is my personal data stored on remote servers?",
      a: "No! All resume data remains 100% private inside your browser session.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 space-y-12 text-slate-800">
      <InArticleAd position={1} />

      <section className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-8 text-slate-900">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight mb-4">
            Free Online ATS-Friendly Resume Builder
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-slate-600">
            A poorly formatted resume can lead to immediate rejection by automated hiring systems. Our <strong>Free AI Resume Builder</strong> creates clean, professional, ATS-optimized resumes that showcase your experience effectively.
          </p>
        </div>

        {/* Step-by-Step */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-950 text-base">Fill Details</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your contact details, summary, experience, and key skills.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-950 text-base">Live Preview</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Switch to live preview mode to view your formatted ATS resume document.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-950 text-base">Export PDF</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Print or save your high-resolution PDF resume instantly.
            </p>
          </div>
        </div>
      </section>

      <InArticleAd position={2} />

      <section className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-6 text-slate-900">
        <h3 className="text-2xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-blue-600" /> Frequently Asked Questions
        </h3>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
            >
              <h4 className="font-bold text-slate-950 text-base">
                {faq.q}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
