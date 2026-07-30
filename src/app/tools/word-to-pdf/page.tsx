import { Metadata } from "next";
import { WordToPdfTool } from "@/tools/word-to-pdf/WordToPdfTool";
import { WordToPdfSeo } from "@/tools/word-to-pdf/WordToPdfSeo";
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
const TOOL_PATH = "/tools/word-to-pdf";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Convert Word to PDF Online Free (DOCX to PDF) â€” Fast | ToolboxSaaS",
  description:
    "Convert Microsoft Word (.docx, .doc) documents to PDF files online for free. Preserves document formatting and fonts with 100% private browser conversion.",
  keywords: [
    "convert word to pdf online free",
    "docx to pdf converter",
    "word doc to pdf free",
    "convert docx to pdf without software",
    "save word as pdf",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Convert Word to PDF Online Free (DOCX to PDF) â€” Fast",
    description:
      "Convert Microsoft Word (.docx, .doc) documents to PDF files online for free preserving document layout.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How do I convert Word to PDF online for free?",
    a: "Upload your Microsoft Word document (.docx or .doc), click 'Convert to PDF', and download your clean PDF file instantly.",
  },
  {
    q: "Will my Word document fonts and images be preserved?",
    a: "Yes! Our conversion engine preserves original document layouts, typography, line breaks, and embedded imagery.",
  },
  {
    q: "Is it safe to convert confidential Word documents?",
    a: "Yes! Conversion runs in-browser. Your documents are never uploaded or saved to external servers.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Free Word to PDF Converter",
  description: "Convert Word (.docx) documents to PDF files online for free.",
  url: CANONICAL_URL,
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "Word to PDF Converter", url: CANONICAL_URL },
]);

export default function WordToPdfPage() {
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
        title="Convert Word to PDF Online Free"
        description="Convert Microsoft Word (.docx) files into clean, professional PDF documents instantly in your browser."
        badge="PDF Utility Suite"
        breadcrumbLabel="Word to PDF"
      />

      <WordToPdfTool />

      <TrustBadges />

      <WordToPdfSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="pdf" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}

