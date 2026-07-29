import React from "react";
import { InArticleAd } from "@/components/ads/AdUnit";
import { HelpCircle } from "lucide-react";

export function ImageConverterSeo() {
  const faqs = [
    {
      q: "Which image formats can I convert?",
      a: "Our online tool supports converting PNG, JPG, JPEG, WEBP, BMP, and GIF images to next-gen WEBP, transparent PNG, or universal JPG formats.",
    },
    {
      q: "Why should I convert my images to WEBP?",
      a: "WEBP provides 30% smaller file sizes than PNG or JPG while maintaining superior image quality. Google recommends WEBP for boosting PageSpeed Insights scores.",
    },
    {
      q: "Is image conversion private and secure?",
      a: "Yes! Conversion is performed 100% locally inside your browser using HTML5 Canvas APIs. Your private images are never uploaded to any server.",
    },
    {
      q: "Can I convert multiple images at once?",
      a: "Yes, you can upload and batch convert multiple images simultaneously with one click.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 space-y-12 text-slate-800">
      <InArticleAd position={1} />

      <section className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-8 text-slate-900">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight mb-4">
            Free Online Universal Image Format Converter
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-slate-600">
            Convert image files online in 1 click without installing software. Change PNG to JPG, HEIC to JPG, or convert images to next-gen WebP format for fast web page loading speeds.
          </p>
        </div>

        {/* Step-by-Step */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-950 text-base">Upload Files</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select or drag & drop single or batch images from your device.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-950 text-base">Choose Format</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select WEBP (Recommended for web), PNG (Transparent), or JPG (Standard).
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-950 text-base">Download Converted</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Download converted files instantly with zero waiting time.
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
