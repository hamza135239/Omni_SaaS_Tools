import React from "react";

export function PdfSplitSeo() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Split PDF Pages Online",
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
    "name": "How to Split PDF Pages Online for Free",
    "description": "Step-by-step guide to separating PDF pages or extracting custom page ranges.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Select PDF File",
        "text": "Drag and drop your PDF document into the splitter box above."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Choose Split Mode",
        "text": "Choose to extract all pages as separate files or select a custom page range."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Download Split PDFs",
        "text": "Click download to save your split PDF files instantly."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this Split PDF tool 100% free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, ToolboxSaaS Split PDF tool is 100% free with no file size limits or registration required.",
        },
      },
      {
        "@type": "Question",
        "name": "Can I extract specific page ranges from a PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can extract every single page as an individual PDF file or select custom page ranges (e.g. pages 1 to 5).",
        },
      },
      {
        "@type": "Question",
        "name": "Is my PDF file secure during splitting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "100% private. All PDF page splitting happens directly inside your web browser. Your files are never uploaded to any server.",
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
          How to Split PDF Pages Online for Free
        </h2>
        <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-extrabold">
          ToolboxSaaS Split PDF tool allows you to separate single PDF pages or extract custom page ranges into individual PDF files without quality loss or formatting distortion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-extrabold text-slate-900">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <span className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-sm">1</span>
          <h3 className="font-extrabold text-slate-950 text-base font-outfit">Select PDF File</h3>
          <p className="text-slate-700 leading-relaxed font-bold">
            Drag and drop your PDF document into the splitter box above.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <span className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-sm">2</span>
          <h3 className="font-extrabold text-slate-950 text-base font-outfit">Choose Split Mode</h3>
          <p className="text-slate-700 leading-relaxed font-bold">
            Choose to extract all pages as separate files or select a custom page range.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <span className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-sm">3</span>
          <h3 className="font-extrabold text-slate-950 text-base font-outfit">Download Split PDFs</h3>
          <p className="text-slate-700 leading-relaxed font-bold">
            Click download to save your split PDF files instantly.
          </p>
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t border-slate-200">
        <h2 className="text-xl font-extrabold text-slate-950 font-outfit">Frequently Asked Questions (FAQ)</h2>
        <div className="space-y-4 text-xs md:text-sm text-slate-900">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-black text-slate-950 text-base">Is this Split PDF tool 100% free?</h3>
            <p className="text-slate-700 font-bold">Yes, it is completely free with zero file limits, ads over content, or mandatory registration.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-black text-slate-950 text-base">Are my PDF files safe during splitting?</h3>
            <p className="text-slate-700 font-bold">100% private. All PDF parsing and splitting happens client-side directly in your browser.</p>
          </div>
        </div>
      </div>
    </article>
  );
}
