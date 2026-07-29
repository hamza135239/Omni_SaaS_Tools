import { Metadata } from "next";
import Link from "next/link";
import { ResumeScorerTool } from "@/tools/resume-scorer/ResumeScorerTool";
import { ResumeScorerSeo } from "@/tools/resume-scorer/ResumeScorerSeo";
import { HeaderAd, FooterAd } from "@/components/ads/AdUnit";
import { ChevronRight, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Free ATS Checker — Resume & CV ATS Score Checker | ToolboxSaaS",
  description:
    "Free ATS checker for your resume or CV. Check your ATS score, see if it passes applicant tracking systems, and get parsing, keyword, and formatting fixes in minutes.",
  keywords: [
    "free ats checker",
    "ats resume checker",
    "ats cv checker",
    "resume ats score",
    "resumly ai ats checker",
  ],
  openGraph: {
    title: "Free ATS Checker — Resume & CV ATS Score Checker | ToolboxSaaS",
    description: "Check your ATS score and get instant keyword, section, and formatting fixes.",
    type: "website",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free ATS Resume Checker",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0.00",
    priceCurrency: "USD",
  },
  description:
    "Free client-side ATS resume scanner and scoring tool for job seekers.",
};

export default function ResumeScorerPage() {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <HeaderAd />

      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/tools" className="hover:text-blue-600">Tools</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 font-bold">
          Free ATS Resume Checker
        </span>
      </div>

      <ResumeScorerTool />

      <ResumeScorerSeo />

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}
