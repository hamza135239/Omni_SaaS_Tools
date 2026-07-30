import { Metadata } from "next";
import Link from "next/link";
import { WordToPdfTool } from "@/tools/word-to-pdf/WordToPdfTool";
import { WordToPdfSeo } from "@/tools/word-to-pdf/WordToPdfSeo";
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
const TOOL_PATH = "/tools/word-to-pdf";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Convert Word to PDF Online Free (DOCX to PDF) — Fast | ToolboxSaaS",
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
    title: "Convert Word to PDF Online Free (DOCX to PDF) — Fast",
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
        <span className="text-slate-950 dark:text-slate-100 font-bold">Word to PDF Converter</span>
      </div>

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
