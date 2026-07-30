import { Metadata } from "next";
import Link from "next/link";
import { PdfRotateTool } from "@/tools/pdf-rotate/PdfRotateTool";
import { PdfRotateSeo } from "@/tools/pdf-rotate/PdfRotateSeo";
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
const TOOL_PATH = "/tools/pdf-rotate";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Rotate PDF Online Free (Rotate PDF Pages 90° & 180°) | ToolboxSaaS",
  description:
    "Rotate PDF pages clockwise or counter-clockwise (90°, 180°, 270°) online for free. Permanently save orientation with 100% private browser processing.",
  keywords: [
    "rotate pdf online free",
    "rotate pdf pages 90 degrees",
    "turn pdf upside down",
    "permanently rotate pdf",
    "change pdf orientation free",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Rotate PDF Online Free (Rotate PDF Pages 90° & 180°)",
    description:
      "Rotate PDF pages clockwise or counter-clockwise (90°, 180°, 270°) online for free.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How do I rotate PDF pages online for free?",
    a: "Upload your PDF file, click the rotate buttons (90° clockwise or counter-clockwise) for individual pages or all pages, and click 'Save & Download'.",
  },
  {
    q: "Will the rotation be saved permanently in the PDF?",
    a: "Yes! Our tool alters the page orientation metadata permanently when saving your PDF.",
  },
  {
    q: "Is rotating PDF pages secure?",
    a: "Yes! Rotation runs completely in your web browser memory. Your files are never sent to external servers.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Free Online PDF Page Rotator",
  description: "Rotate individual PDF pages or full documents permanently.",
  url: CANONICAL_URL,
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "Rotate PDF", url: CANONICAL_URL },
]);

export default function PdfRotatePage() {
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
        <span className="text-slate-950 dark:text-slate-100 font-bold">Rotate PDF</span>
      </div>

      <PdfRotateTool />

      <TrustBadges />

      <PdfRotateSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="pdf" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}
