import React from "react";
import { InArticleAd } from "@/components/ads/AdUnit";
import { HelpCircle } from "lucide-react";

export function CoverLetterGeneratorSeo() {
  const faqs = [
    {
      q: "Why do I need a tailored cover letter?",
      a: "A tailored cover letter increases your chances of getting an interview by 40%+. It allows you to explain why you are interested in the specific company and highlight key achievements.",
    },
    {
      q: "Can I customize the generated letter?",
      a: "Yes! You can choose between Professional, Enthusiastic, and Executive tones, and copy or download the generated text to edit further.",
    },
    {
      q: "Is this cover letter tool free?",
      a: "100% free with no account creation or hidden fees required.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 space-y-12 text-slate-800">
      <InArticleAd position={1} />

      <section className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-8 text-slate-900">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight mb-4">
            Free AI Cover Letter Writer & Generator
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-slate-600">
            Writing a compelling cover letter from scratch takes hours. Our <strong>AI Cover Letter Generator</strong> crafts custom, persuasive job application letters in seconds tailored to your experience and target role.
          </p>
        </div>

        {/* Step-by-Step */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-950 text-base">Enter Job & Name</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provide your name, target job title, and the company you are applying to.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-950 text-base">Add Key Skills</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              List a few core skills and pick your preferred writing tone.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-950 text-base">Generate & Copy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Copy your tailored letter to clipboard or download as text instantly.
            </p>
          </div>
        </div>
      </section>

      <InArticleAd position={2} />

      <section className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-6 text-slate-900">
        <h3 className="text-2xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-600" /> Frequently Asked Questions
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
