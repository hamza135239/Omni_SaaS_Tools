import { Metadata } from "next";
import { ResumeScorerTool } from "@/tools/resume-scorer/ResumeScorerTool";
import { ResumeScorerSeo } from "@/tools/resume-scorer/ResumeScorerSeo";
import { HeaderAd, FooterAd } from "@/components/ads/AdUnit";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { TrustBadges } from "@/components/seo/TrustBadges";
import { ToolPageHero } from "@/components/ui/ToolPageHero";
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
    <div className="min-h-screen bg-slate-50 pb-16">
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

      <ToolPageHero
        title="Free ATS Resume Scorer"
        description="Get a 0-100 AI score for your resume. Audit formatting, section structure, keyword density and bullet quality."
        badge="Career Tools Suite"
        breadcrumbLabel="Resume Scorer"
      />

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

