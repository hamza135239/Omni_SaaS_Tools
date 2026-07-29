import React from "react";

export function ImageToPdfSeo() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JPG to PDF Converter",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert JPG & Images to PDF Online for Free",
    "description": "Step-by-step guide to combining multiple JPG, PNG, and WEBP images into a clean single PDF document.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Upload Images",
        "text": "Select or drag and drop single or multiple JPG/PNG images into the tool."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Instant PDF Merge",
        "text": "Our engine formats each image onto vector pages directly inside your browser."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Download Single PDF",
        "text": "Click download to save your merged PDF document instantly."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this JPG to PDF converter free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, ToolboxSaaS JPG to PDF converter is 100% free with no file limits or registration required.",
        },
      },
      {
        "@type": "Question",
        "name": "Can I combine multiple images into one PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can upload multiple JPG, PNG, or WEBP photos and merge them into a single clean PDF file.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 font-outfit">
          How to Convert JPG & Images to PDF Online for Free
        </h2>
        <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-extrabold">
          Combine multiple JPG, PNG, and WEBP photos into a clean, single PDF document in seconds with zero quality loss.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-extrabold text-slate-900">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm">1</span>
          <h3 className="font-extrabold text-slate-950 text-base font-outfit">Upload Images</h3>
          <p className="text-slate-700 leading-relaxed font-bold">
            Select or drag and drop single or multiple JPG/PNG images.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm">2</span>
          <h3 className="font-extrabold text-slate-950 text-base font-outfit">Instant PDF Merge</h3>
          <p className="text-slate-700 leading-relaxed font-bold">
            Our engine formats each image onto vector pages in your browser.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm">3</span>
          <h3 className="font-extrabold text-slate-950 text-base font-outfit">Download Single PDF</h3>
          <p className="text-slate-700 leading-relaxed font-bold">
            Click download to save your merged PDF document.
          </p>
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t border-slate-200">
        <h2 className="text-xl font-extrabold text-slate-950 font-outfit">Frequently Asked Questions (FAQ)</h2>
        <div className="space-y-4 text-xs md:text-sm text-slate-900">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-black text-slate-950 text-base">Is this JPG to PDF converter free?</h3>
            <p className="text-slate-700 font-bold">Yes, it is completely free with zero limits or registration.</p>
          </div>
        </div>
      </div>
    </article>
  );
}
