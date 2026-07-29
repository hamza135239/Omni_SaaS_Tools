import React from "react";
import { InArticleAd } from "@/components/ads/AdUnit";
import { HelpCircle } from "lucide-react";

export function WordToPdfSeo() {
  const faqs = [
    {
      q: "How do I convert a Microsoft Word (.docx) document to PDF?",
      a: "Upload your Word document (.docx or .doc) to our online Word to PDF converter, click 'Convert Word to PDF', and download your PDF file instantly.",
    },
    {
      q: "Is there any software installation required?",
      a: "No! The conversion runs 100% locally in your web browser. You do not need Microsoft Word or any plugins installed.",
    },
    {
      q: "Is Word to PDF conversion free and private?",
      a: "Yes, 100% free with no file limits or account registration required. Your confidential documents never leave your browser.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 space-y-12 text-slate-800">
      <InArticleAd position={1} />

      <section className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-8 text-slate-900">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight mb-4">
            Free Online Word (.DOCX) to PDF Converter
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-slate-600">
            Converting Word documents to PDF ensures your file layout, fonts, and formatting look identical on all devices and operating systems. Our <strong>Free Word to PDF Converter</strong> turns DOCX files into professional PDFs in seconds.
          </p>
        </div>

        {/* Step-by-Step */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-950 text-base">Upload Word File</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Drag & drop your .docx or .doc file into the converter.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-950 text-base">Browser PDF Conversion</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our engine parses the Word text and builds a clean PDF document.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-950 text-base">Download PDF</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Download your converted PDF document instantly for sharing or printing.
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
