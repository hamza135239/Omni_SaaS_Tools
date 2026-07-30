import { Metadata } from "next";
import Link from "next/link";
import { CoverLetterGeneratorTool } from "@/tools/cover-letter-generator/CoverLetterGeneratorTool";
import { CoverLetterGeneratorSeo } from "@/tools/cover-letter-generator/CoverLetterGeneratorSeo";
import { HeaderAd, FooterAd } from "@/components/ads/AdUnit";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { TrustBadges } from "@/components/seo/TrustBadges";
import { ChevronRight, Home } from "lucide-react";
import {
  generateWebApplicationSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://toolboxsaas.com";
const TOOL_PATH = "/tools/cover-letter-generator";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Free AI Cover Letter Writer & Generator | ToolboxSaaS",
  description:
    "Generate custom, persuasive cover letters tailored to your target job role in seconds. Professional, enthusiastic, and executive tone options with 100% private browser processing.",
  keywords: [
    "ai cover letter generator free",
    "free cover letter writer",
    "job application letter generator",
    "tailored cover letter generator",
    "ai cover letter maker",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free AI Cover Letter Writer & Generator",
    description:
      "Generate custom, persuasive cover letters tailored to your target job role in seconds.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How does the AI Cover Letter Generator write tailored letters?",
    a: "Enter your target job title, company name, and key experience points. Our client AI structures a formal application letter highlighting your relevant achievements.",
  },
  {
    q: "Can I customize the writing tone?",
    a: "Yes! Choose between Professional, Enthusiastic, Executive, or Modern creative tone profiles.",
  },
  {
    q: "Is it free to copy and export cover letters?",
    a: "Yes! You can copy text with one click or export to PDF format for free.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Free AI Cover Letter Generator",
  description: "Generate tailored cover letters for any job role in seconds.",
  url: CANONICAL_URL,
  category: "EducationalApplication",
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "AI Cover Letter Generator", url: CANONICAL_URL },
]);

export default function CoverLetterGeneratorPage() {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <HeaderAd />

      <div className="max-w-5xl mx-auto mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/tools" className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Tools
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-950 dark:text-slate-100 font-bold">AI Cover Letter Generator</span>
      </div>

      <CoverLetterGeneratorTool />

      <TrustBadges />

      <CoverLetterGeneratorSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="resume" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}
