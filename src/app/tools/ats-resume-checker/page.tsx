import { Metadata } from "next";
import Link from "next/link";
import { AtsResumeCheckerTool } from "@/tools/ats-resume-checker/AtsResumeCheckerTool";
import { AtsResumeCheckerSeo } from "@/tools/ats-resume-checker/AtsResumeCheckerSeo";
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
const TOOL_PATH = "/tools/ats-resume-checker";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Free ATS Resume Checker (AI Score & Keyword Optimizer)",
  description:
    "Check your resume against target job descriptions using AI natural language processing. Find missing keywords and boost your ATS score instantly without registration.",
  keywords: [
    "ats resume checker free",
    "ats score scanner",
    "resume keyword matcher",
    "ats compatibility test",
    "how to pass ats scanner",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free ATS Resume Checker (AI Score & Keyword Optimizer)",
    description:
      "Scan your resume against target job descriptions and boost your ATS compatibility score.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How does the ATS Resume Checker work?",
    a: "Upload your resume (PDF or DOCX) and paste your target job description. Our AI parser analyzes hard skills, soft skills, and keyword density matching to calculate your ATS match score.",
  },
  {
    q: "What is a good ATS score?",
    a: "An ATS match score of 75% or higher is considered competitive to pass human resources filtering algorithms.",
  },
  {
    q: "Is my resume kept private?",
    a: "Yes! All document parsing takes place locally inside your browser session. Your personal information is never saved or sold.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Free ATS Resume Checker & Keyword Matcher",
  description: "Check your resume against job descriptions using AI natural language parsing.",
  url: CANONICAL_URL,
  category: "EducationalApplication",
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "ATS Resume Checker", url: CANONICAL_URL },
]);

export default function AtsResumeCheckerPage() {
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
        <span className="text-slate-950 dark:text-slate-100 font-bold">ATS Resume Checker</span>
      </div>

      <AtsResumeCheckerTool />

      <TrustBadges />

      <AtsResumeCheckerSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="resume" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}
