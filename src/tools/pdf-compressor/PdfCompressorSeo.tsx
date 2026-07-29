import React from "react";
import { InArticleAd } from "@/components/ads/AdUnit";
import { HelpCircle } from "lucide-react";

export function PdfCompressorSeo() {
  const faqs = [
    {
      q: "How do I reduce PDF file size online?",
      a: "Upload your PDF file to our online PDF Compressor, select your desired compression level (Low, Medium, High), and download your compressed PDF instantly.",
    },
    {
      q: "Will reducing PDF size degrade text or document quality?",
      a: "Our PDF compressor strips duplicate font streams, optimizes embedded image streams, and removes unnecessary metadata while maintaining crisp text readability.",
    },
    {
      q: "Is PDF compression secure and private?",
      a: "Yes! All compression takes place 100% locally inside your web browser using WebAssembly. Your files are never uploaded to remote servers.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 space-y-12 text-slate-800">
      <InArticleAd position={1} />

      <section className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-8 text-slate-900">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight mb-4">
            Free Online PDF File Size Compressor
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-slate-600">
            Large PDF files can fail email attachment limits and slow down downloads. Our <strong>Free PDF Compressor</strong> allows you to optimize and shrink PDF files online quickly without installing software.
          </p>
        </div>

        {/* Step-by-Step */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-950 text-base">Upload PDF</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Drag & drop one or multiple PDF documents.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-950 text-base">Select Level</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choose Low, Medium (Recommended), or High compression mode.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-950 text-base">Download Optimized</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Download your reduced PDF file instantly with zero watermarks.
            </p>
          </div>
        </div>
      </section>

      <InArticleAd position={2} />

      <section className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-6 text-slate-900">
        <h3 className="text-2xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-emerald-600" /> Frequently Asked Questions
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
