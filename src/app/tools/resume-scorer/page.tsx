import { Metadata } from "next";
import Link from "next/link";
import { ResumeScorerTool } from "@/tools/resume-scorer/ResumeScorerTool";
import { ResumeScorerSeo } from "@/tools/resume-scorer/ResumeScorerSeo";
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
const TOOL_PATH = "/tools/resume-scorer";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Free ATS Resume Score Checker & Reviewer | ToolboxSaaS",
  description:
    "Scan your resume for ATS compliance, formatting errors, and impact metrics. Get an instant ATS readiness score with 100% private browser parsing.",
  keywords: [
    "free ats score checker",
    "resume score scanner",
    "ats cv audit online",
    "check resume for ats compliance",
    "resume quality analyzer",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free ATS Resume Score Checker & Reviewer",
    description:
      "Scan your resume for ATS compliance, formatting errors, and impact metrics.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How is my ATS Resume Score calculated?",
    a: "Our parsing engine scores your resume across 4 dimensions: Contact info completeness, section headings, bullet point action verbs, and document formatting.",
  },
  {
    q: "How can I improve my resume score?",
    a: "Add quantifiable metrics (% achievements, revenue numbers), use standard section titles (Experience, Education), and eliminate non-standard font symbols.",
  },
  {
    q: "Is my resume file stored anywhere?",
    a: "No! All scoring algorithms run locally in your web browser. Your resume text is never uploaded to an external server.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Free Online ATS Resume Scorer",
  description: "Check your resume for ATS compliance and formatting errors.",
  url: CANONICAL_URL,
  category: "EducationalApplication",
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "ATS Resume Scorer", url: CANONICAL_URL },
]);

export default function ResumeScorerPage() {
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
        <span className="text-slate-950 dark:text-slate-100 font-bold">ATS Resume Scorer</span>
      </div>

      <ResumeScorerTool />

      <TrustBadges />

      <ResumeScorerSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="resume" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}
