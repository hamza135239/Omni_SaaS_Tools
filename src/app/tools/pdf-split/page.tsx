import { Metadata } from "next";
import { PdfSplitTool } from "@/tools/pdf-split/PdfSplitTool";
import { PdfSplitSeo } from "@/tools/pdf-split/PdfSplitSeo";
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
const TOOL_PATH = "/tools/pdf-split";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Split PDF Online Free (Extract Pages & Ranges) â€” Fast | ToolboxSaaS",
  description:
    "Separate single PDF pages or extract custom page ranges into individual PDF files online for free. 100% private client-side WASM processing.",
  keywords: [
    "split pdf online free",
    "extract pdf pages",
    "separate pdf pages online",
    "split pdf by page range",
    "cut pdf document free",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Split PDF Online Free (Extract Pages & Ranges) â€” Fast",
    description:
      "Separate single PDF pages or extract custom page ranges into individual PDF files online for free.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How do I split PDF pages online for free?",
    a: "Upload your PDF document, specify custom page numbers or ranges (e.g. 1-3, 5, 8-10), and click 'Split PDF' to download separated files instantly.",
  },
  {
    q: "Can I extract a single page from a PDF?",
    a: "Yes! Simply enter the single page number you wish to extract, and our tool will generate a standalone PDF for that page.",
  },
  {
    q: "Is it safe to split confidential PDF files?",
    a: "Yes! PDF splitting is executed 100% locally inside your web browser. Your files are never uploaded to any remote server.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Free Online PDF Page Splitter",
  description: "Separate single PDF pages or extract custom page ranges into individual files.",
  url: CANONICAL_URL,
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "Split PDF", url: CANONICAL_URL },
]);

export default function PdfSplitPage() {
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
        title="Split PDF Pages Online Free"
        description="Extract pages or split PDF into separate files instantly. No file uploads, 100% browser-processed."
        badge="PDF Utility Suite"
        breadcrumbLabel="Split PDF"
      />

      <PdfSplitTool />

      <TrustBadges />

      <PdfSplitSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="pdf" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}

