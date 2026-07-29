import React from "react";

export function PdfRotateSeo() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Rotate PDF Pages Online",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.95",
      "reviewCount": "1410",
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this Rotate PDF tool free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, ToolboxSaaS Rotate PDF tool is 100% free with no file size limits or registration required.",
        },
      },
      {
        "@type": "Question",
        "name": "Does rotating PDF degrade image or text quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, rotating PDF pages modifies internal page rotation metadata directly without rasterizing text or degrading image quality.",
        },
      },
    ],
  };

  return (
    <article className="mt-16 border-t border-slate-200 pt-12 space-y-12 bg-white rounded-3xl p-8 md:p-12 text-slate-900 border border-slate-200 shadow-xs">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 font-outfit">
          How to Rotate PDF Pages Online for Free
        </h2>
        <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-extrabold">
          Rotate upside-down or sideways PDF pages 90°, 180°, or 270° clockwise in 1 click and download your updated PDF file instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-extrabold text-slate-900">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <span className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-sm">1</span>
          <h3 className="font-extrabold text-slate-950 text-base font-outfit">Upload PDF Document</h3>
          <p className="text-slate-700 leading-relaxed font-bold">
            Select or drag and drop your PDF file into the rotation tool.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <span className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-sm">2</span>
          <h3 className="font-extrabold text-slate-950 text-base font-outfit">Select Rotation Angle</h3>
          <p className="text-slate-700 leading-relaxed font-bold">
            Choose 90° right, 180° flip, or 270° left rotation angle.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <span className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-sm">3</span>
          <h3 className="font-extrabold text-slate-950 text-base font-outfit">Download Rotated PDF</h3>
          <p className="text-slate-700 leading-relaxed font-bold">
            Click download to save your permanently rotated PDF document.
          </p>
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t border-slate-200">
        <h2 className="text-xl font-extrabold text-slate-950 font-outfit">Frequently Asked Questions (FAQ)</h2>
        <div className="space-y-4 text-xs md:text-sm text-slate-900">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-black text-slate-950 text-base">Is this Rotate PDF tool free?</h3>
            <p className="text-slate-700 font-bold">Yes, it is completely free with zero page limits or registration.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-black text-slate-950 text-base">Does rotation ruin document quality?</h3>
            <p className="text-slate-700 font-bold">No. Rotation updates the vector viewport dictionary natively without degrading quality.</p>
          </div>
        </div>
      </div>

    </article>
  );
}
