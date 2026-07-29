import React from "react";
import { InArticleAd } from "@/components/ads/AdUnit";
import { HelpCircle } from "lucide-react";

export function AtsResumeCheckerSeo() {
  const faqs = [
    {
      q: "What is an ATS (Applicant Tracking System)?",
      a: "An Applicant Tracking System (ATS) is an automated HR software used by 99% of Fortune 500 companies to parse, scan, rank, and filter job applications before human recruiters review them.",
    },
    {
      q: "How can I increase my ATS resume score to 90%+?",
      a: "To boost your ATS score: 1) Incorporate exact hard skill keywords from the job description, 2) Use standard section headings ('Work Experience', 'Education', 'Skills'), 3) Use strong action verbs at the start of bullet points, and 4) Avoid complex tables or graphics that confuse ATS parsers.",
    },
    {
      q: "Is my resume data kept private?",
      a: "Yes! All resume analysis is processed locally in your browser session. We never store or transmit your personal career history.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 space-y-12 text-slate-800 dark:text-slate-200">
      <InArticleAd position={1} />

      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Free ATS Resume Checker & Job Keyword Optimization
          </h2>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Over 75% of resumes are rejected by corporate ATS algorithms before a human hiring manager ever reads them. Our <strong>Free ATS Resume Checker</strong> scans your resume against any job description, pinpointing missing keywords and formatting improvements.
          </p>
        </div>

        {/* Step-by-Step */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Paste Resume</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Paste your full resume text or experience bullet points.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Paste Job Ad</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Paste the target job description from LinkedIn or Indeed.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Get AI Score & Keywords</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              View your ATS compatibility score and missing high-value keywords.
            </p>
          </div>
        </div>
      </section>

      <InArticleAd position={2} />

      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-purple-600" /> Frequently Asked Questions
        </h3>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/50 space-y-2"
            >
              <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                {faq.q}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
