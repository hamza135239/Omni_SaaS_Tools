import React from "react";

export function ResumeScorerSeo() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free ATS Resume Checker & Scorer",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
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
    "name": "How to Score Your Resume Against ATS Filters",
    "description": "Step-by-step guide to auditing your CV for Applicant Tracking Systems.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Paste PDF / Text Resume",
        "text": "Upload your resume PDF or paste raw plain text into the auditor box."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "100-Point Audit Engine",
        "text": "Our algorithm scans for quantified metrics, technical skills, and standard section headings."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Actionable Quick Fixes",
        "text": "Review detailed breakdown scores and apply quick fixes to boost your ATS score above 85+."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does this ATS Resume Checker evaluate my CV?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our scanner audits your resume against key Workday, Greenhouse, and Taleo ATS algorithms. It checks section order, keyword density, quantified metrics (%, $), and contact info completeness to give a score out of 100.",
        },
      },
      {
        "@type": "Question",
        "name": "Is my resume kept private during scanning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, 100% private. Text extraction and ATS scoring happen entirely inside your browser. No copy of your resume is stored or uploaded to remote databases.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 font-outfit">
          How to Pass Applicant Tracking Systems (ATS) in 2026
        </h2>
        <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal">
          Over 90% of Fortune 500 companies use Applicant Tracking Systems like Workday, Greenhouse, Taleo, and Lever to filter out resumes before human recruiters read them. Our free ATS Resume Checker scores your CV out of 100 and highlights missing action verbs, keyword gaps, and structural errors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-medium text-slate-800">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold text-xs">1</span>
          <h3 className="font-bold text-slate-950 text-sm font-outfit">Paste PDF / Text Resume</h3>
          <p className="text-slate-600 leading-relaxed">
            Upload your resume PDF or paste raw plain text into the auditor box.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold text-xs">2</span>
          <h3 className="font-bold text-slate-950 text-sm font-outfit">100-Point Audit Engine</h3>
          <p className="text-slate-600 leading-relaxed">
            Our algorithm scans for quantified metrics, technical skills, and standard section headings.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold text-xs">3</span>
          <h3 className="font-bold text-slate-950 text-sm font-outfit">Actionable Quick Fixes</h3>
          <p className="text-slate-600 leading-relaxed">
            Review detailed breakdown scores and apply quick fixes to boost your ATS score above 85+.
          </p>
        </div>
      </div>
    </article>
  );
}
