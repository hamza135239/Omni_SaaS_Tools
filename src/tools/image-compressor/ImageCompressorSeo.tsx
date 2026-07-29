import React from "react";
import { InArticleAd } from "@/components/ads/AdUnit";
import { HelpCircle } from "lucide-react";

export function ImageCompressorSeo() {
  const faqs = [
    {
      q: "How does smart image compression work without losing quality?",
      a: "Our tool uses advanced client-side algorithms (Canvas API and browser WebP/MozJPEG encoders) to strip unnecessary metadata and optimize color palettes, resulting in dramatically smaller file sizes while preserving visual fidelity.",
    },
    {
      q: "What image formats can I compress?",
      a: "You can compress PNG, JPG, JPEG, and WEBP images. You can also convert between formats (e.g. PNG to WEBP) for maximum savings.",
    },
    {
      q: "Are my photos uploaded to a cloud server?",
      a: "No! All image compression happens 100% locally in your web browser. Your private photos never leave your device.",
    },
    {
      q: "Is there a limit on how many images I can compress?",
      a: "No limit at all. You can compress unlimited single or batch images for free without registration.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 space-y-12 text-slate-800">
      <InArticleAd position={1} />

      <section className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-8 text-slate-900">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight mb-4">
            How to Compress Images Online Without Losing Quality
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-slate-600">
            Large image file sizes slow down websites, waste mobile data, and cause slow email attachments.
            With our <strong>Free Smart Image Compressor</strong>, you can shrink image file sizes by up to 90% in seconds while preserving crisp visual clarity.
          </p>
        </div>

        {/* Step-by-Step */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-950 text-base">Upload Images</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Drag & drop one or multiple PNG, JPG, or WEBP files into the upload area.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-950 text-base">Adjust Quality</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use the live quality slider (e.g. 80%) and pick your target format.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-950 text-base">Download Instantly</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Download your compressed images individually with instant savings statistics.
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
