import React from "react";

export function PdfToWordSeo() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PDF to Word Converter",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1840",
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
        "name": "Is this PDF to Word converter 100% free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, ToolboxSaaS PDF to Word converter is 100% free with no hidden fees, page limits, or registration required.",
        },
      },
      {
        "@type": "Question",
        "name": "Does it preserve the original PDF layout and tables?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our converter uses Y-coordinate vertical clustering and borderless tables to reconstruct exact 1:1 layouts, line alignments, and multi-column bullet grids.",
        },
      },
      {
        "@type": "Question",
        "name": "Is my PDF document private and secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "100% private. All PDF parsing and Word DOCX generation happens directly inside your web browser. Your files are never uploaded to any remote server.",
        },
      },
    ],
  };

  return (
    <article className="mt-16 border-t border-slate-200 pt-12 space-y-12 bg-white rounded-3xl p-8 md:p-12 text-slate-900 border border-slate-200">
      
      {/* Inject Structured Data Schemas for Google Search */}
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
          How to Convert PDF to Word (.docx) Online Free
        </h2>
        <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal">
          ToolboxSaaS PDF to Word Converter allows you to transform static, non-editable PDF files into fully editable Microsoft Word documents (.docx) without corrupting text alignment, tables, or resume structures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-medium text-slate-800">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">1</span>
          <h3 className="font-bold text-slate-950 text-sm font-outfit">Select PDF File</h3>
          <p className="text-slate-600 leading-relaxed">
            Drag and drop single or batch PDF files into the converter area above.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">2</span>
          <h3 className="font-bold text-slate-950 text-sm font-outfit">1:1 Layout Extraction</h3>
          <p className="text-slate-600 leading-relaxed">
            Our engine clusters lines by exact Y-coordinates to reconstruct original column layouts.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">3</span>
          <h3 className="font-bold text-slate-950 text-sm font-outfit">Download Word File</h3>
          <p className="text-slate-600 leading-relaxed">
            Click download to open your fully editable .docx file in Microsoft Word or Google Docs.
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <h2 className="text-xl font-bold text-slate-950 font-outfit">Frequently Asked Questions (FAQ)</h2>
        <div className="space-y-4 text-xs md:text-sm text-slate-800">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <h3 className="font-bold text-slate-950">Is this PDF to Word converter 100% free?</h3>
            <p className="text-slate-600">Yes, it is completely free with zero page limits, ads overlaying content, or forced email registration.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <h3 className="font-bold text-slate-950">Does it preserve original PDF layout & formatting?</h3>
            <p className="text-slate-600">Yes. Our Y-coordinate clustering engine clusters words into exact visual lines, preventing text overlap or scrambled fonts.</p>
          </div>
        </div>
      </div>

    </article>
  );
}
