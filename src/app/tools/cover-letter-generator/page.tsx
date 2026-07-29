import { Metadata } from "next";
import Link from "next/link";
import { CoverLetterGeneratorTool } from "@/tools/cover-letter-generator/CoverLetterGeneratorTool";
import { CoverLetterGeneratorSeo } from "@/tools/cover-letter-generator/CoverLetterGeneratorSeo";
import { HeaderAd, FooterAd } from "@/components/ads/AdUnit";
import { ChevronRight, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Free AI Cover Letter Writer & Generator | ToolboxSaaS",
  description:
    "Generate custom, persuasive cover letters tailored to your target job in seconds. Professional, enthusiastic, and executive tone options.",
  keywords: [
    "ai cover letter generator",
    "free cover letter writer",
    "job application letter maker",
    "tailored cover letter ai",
  ],
  openGraph: {
    title: "Free AI Cover Letter Writer & Generator",
    description: "Write tailored cover letters for any job role in 10 seconds.",
    type: "website",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Cover Letter Generator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0.00",
    priceCurrency: "USD",
  },
  description:
    "Free AI cover letter writing assistant for job applicants.",
};

export default function CoverLetterGeneratorPage() {
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
          AI Cover Letter Generator
        </span>
      </div>

      <CoverLetterGeneratorTool />

      <CoverLetterGeneratorSeo />

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}
