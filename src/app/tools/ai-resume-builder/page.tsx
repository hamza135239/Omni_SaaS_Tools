import { Metadata } from "next";
import Link from "next/link";
import { AiResumeBuilderTool } from "@/tools/ai-resume-builder/AiResumeBuilderTool";
import { AiResumeBuilderSeo } from "@/tools/ai-resume-builder/AiResumeBuilderSeo";
import { HeaderAd, FooterAd } from "@/components/ads/AdUnit";
import { ChevronRight, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Free AI Resume Builder — Build ATS-Friendly Resumes | ToolboxSaaS",
  description:
    "Create clean, ATS-optimized professional resumes with live preview and instant PDF print export. 100% free with zero registration.",
  keywords: [
    "free resume builder",
    "ats resume builder",
    "pdf resume maker online",
    "cv generator free",
  ],
  openGraph: {
    title: "Free AI Resume Builder — Build ATS-Friendly Resumes",
    description: "Build ATS-optimized resumes with live PDF export.",
    type: "website",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Resume Builder",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0.00",
    priceCurrency: "USD",
  },
  description:
    "Free ATS-friendly resume builder and PDF generator for job seekers.",
};

export default function AiResumeBuilderPage() {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-white text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <HeaderAd />

      <div className="max-w-5xl mx-auto mb-6 flex items-center gap-2 text-xs font-semibold text-zinc-500">
        <Link href="/" className="hover:text-indigo-600 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/tools" className="hover:text-indigo-600">Tools</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-zinc-950 font-bold">
          AI Resume Builder
        </span>
      </div>

      <AiResumeBuilderTool />

      <AiResumeBuilderSeo />

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}
