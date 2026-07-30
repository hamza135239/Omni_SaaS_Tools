import { Metadata } from "next";
import { AiResumeBuilderTool } from "@/tools/ai-resume-builder/AiResumeBuilderTool";
import { AiResumeBuilderSeo } from "@/tools/ai-resume-builder/AiResumeBuilderSeo";
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
const TOOL_PATH = "/tools/ai-resume-builder";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Free AI Resume Builder (ATS-Friendly PDF Export) | ToolboxSaaS",
  description:
    "Create clean, ATS-optimized professional resumes with live side-by-side preview and instant PDF export. 100% free with zero registration or paywalls.",
  keywords: [
    "free ai resume builder",
    "ats resume generator online",
    "free pdf resume maker",
    "cv builder without signup",
    "ats compliant resume template",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free AI Resume Builder (ATS-Friendly PDF Export)",
    description:
      "Create clean, ATS-optimized professional resumes with live preview and instant PDF export.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "Is this AI Resume Builder completely free?",
    a: "Yes! You can build, customize templates, and download high-resolution PDF resumes with zero registration fees or hidden watermarks.",
  },
  {
    q: "Are the resume templates ATS-compliant?",
    a: "Yes! Our templates use clean single-column and standard multi-column structures with ATS-readable typography and headings.",
  },
  {
    q: "Is my personal work history saved or shared?",
    a: "No! All profile data is saved strictly inside your local browser storage. Your resume data is never uploaded or shared with recruiters without your permission.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Free Online AI Resume Builder",
  description: "Build ATS-optimized professional resumes with live PDF export.",
  url: CANONICAL_URL,
  category: "EducationalApplication",
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "AI Resume Builder", url: CANONICAL_URL },
]);

export default function AiResumeBuilderPage() {
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
        title="AI Resume Builder — Free ATS Templates"
        description="Build ATS-optimized professional resumes with live preview and printable templates powered by AI."
        badge="Career Tools Suite"
        breadcrumbLabel="AI Resume Builder"
      />

<AiResumeBuilderTool />

      <TrustBadges />

      <AiResumeBuilderSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="resume" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}

