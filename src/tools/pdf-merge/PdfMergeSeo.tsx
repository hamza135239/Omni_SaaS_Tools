import React from "react";
import { InArticleAd } from "@/components/ads/AdUnit";
import { HelpCircle } from "lucide-react";

export function PdfMergeSeo() {
  const faqs = [
    {
      q: "How do I combine multiple PDF files into one?",
      a: "Simply drag & drop 2 or more PDF documents into our PDF Merger tool, reorder them if needed, and click 'Merge PDFs Now'. Your combined file is ready to download in seconds.",
    },
    {
      q: "Is there a limit on how many PDF files I can merge?",
      a: "No! You can combine unlimited PDF files for free with zero watermarks or registration required.",
    },
    {
      q: "Are my confidential PDF documents safe?",
      a: "100% safe. All PDF processing takes place locally inside your browser using WebAssembly PDF engines. Your documents are never uploaded to any remote server.",
    },
    {
      q: "Can I reorder PDF pages before merging?",
      a: "Yes! Use the up and down arrow buttons next to each file to arrange your PDF documents in your preferred order.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 space-y-12 text-slate-800">
      <InArticleAd position={1} />

      <section className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-8 text-slate-900">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight mb-4">
            How to Merge PDF Files Online for Free
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-slate-600">
            Combining multiple PDF files into a single unified document makes sharing, emailing, and organizing reports much simpler. Our <strong>Free PDF Merge Tool</strong> lets you join PDF files effortlessly with zero file limits.
          </p>
        </div>

        {/* Step-by-Step */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-950 text-base">Upload PDFs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Drag & drop two or more PDF documents into the dropzone.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-950 text-base">Reorder Sequence</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use the arrow buttons to arrange documents in the exact order you want.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-950 text-base">Merge & Download</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click 'Merge PDFs Now' and save your single combined PDF instantly.
            </p>
          </div>
        </div>
      </section>

      <InArticleAd position={2} />

      <section className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-6 text-slate-900">
        <h3 className="text-2xl font-bold text-slate-950 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-rose-600" /> Frequently Asked Questions
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
