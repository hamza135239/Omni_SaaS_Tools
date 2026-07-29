import React from "react";

export function BackgroundRemoverSeo() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI Background Remover",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.92",
      "reviewCount": "1950",
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
        "name": "Is this AI background remover free without watermarks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! ToolboxSaaS Background Remover is 100% free with zero watermarks, image resolution degradation, or hidden subscriptions.",
        },
      },
      {
        "@type": "Question",
        "name": "How does client-side AI background removal work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We run specialized Machine Learning image segmentation neural networks (RMBG-1.4 / WASM) directly inside your web browser. Your photo is parsed locally without being uploaded to any external server.",
        },
      },
    ],
  };

  return (
    <article className="mt-16 border-t border-slate-200 pt-12 space-y-12 bg-white rounded-3xl p-8 md:p-12 text-slate-900 border border-slate-200">
      
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
          Automatic HD Image Background Removal Online
        </h2>
        <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal">
          Remove backgrounds from photos, product images, e-commerce listings, and profile avatars automatically in 1 second. Export transparent HD PNG images with zero watermarks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-medium text-slate-800">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">1</span>
          <h3 className="font-bold text-slate-950 text-sm font-outfit">Upload Image</h3>
          <p className="text-slate-600 leading-relaxed">
            Drag and drop PNG, JPG, or WEBP images into the editor.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">2</span>
          <h3 className="font-bold text-slate-950 text-sm font-outfit">Instant AI Cutout</h3>
          <p className="text-slate-600 leading-relaxed">
            Our AI model segments the subject and erases the background automatically.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">3</span>
          <h3 className="font-bold text-slate-950 text-sm font-outfit">Download HD Transparent PNG</h3>
          <p className="text-slate-600 leading-relaxed">
            Download your full-resolution cut-out image with transparent background.
          </p>
        </div>
      </div>

    </article>
  );
}
