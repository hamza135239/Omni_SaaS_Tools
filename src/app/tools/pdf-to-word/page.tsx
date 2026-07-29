import { Metadata } from "next";
import Link from "next/link";
import { PdfToWordTool } from "@/tools/pdf-to-word/PdfToWordTool";
import { PdfToWordSeo } from "@/tools/pdf-to-word/PdfToWordSeo";
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
const TOOL_PATH = "/tools/pdf-to-word";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Convert PDF to Word Online Free (Editable DOCX) — Fast | ToolboxSaaS",
  description:
    "Convert PDF files to editable Microsoft Word (.docx) documents online for free. Preserves layout, formatting, and fonts with 100% private browser processing.",
  keywords: [
    "pdf to word converter online",
    "convert pdf to docx free",
    "pdf to editable word",
    "convert pdf to word without software",
    "ocr pdf to docx",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Convert PDF to Word Online Free (Editable DOCX) — Fast",
    description:
      "Convert PDF files to editable Microsoft Word (.docx) documents online for free preserving layout and fonts.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How do I convert PDF to Word for free?",
    a: "Select or drag your PDF file into the upload zone, choose whether to apply OCR text extraction, and click 'Convert to Word'. Download your editable .docx file instantly.",
  },
  {
    q: "Will the converted Word document keep the original formatting?",
    a: "Yes! Our conversion engine preserves paragraph layouts, table structures, fonts, and inline images.",
  },
  {
    q: "Can I convert scanned PDF files?",
    a: "Yes! Our OCR engine scans non-selectable text images inside scanned PDFs and converts them into searchable, editable text.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Free PDF to Word Converter",
  description: "Convert PDF documents to editable Word (.docx) files online for free.",
  url: CANONICAL_URL,
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "PDF to Word Converter", url: CANONICAL_URL },
]);

export default function PdfToWordPage() {
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
        <span className="text-slate-950 dark:text-slate-100 font-bold">PDF to Word Converter</span>
      </div>

      <PdfToWordTool />

      <TrustBadges />

      <PdfToWordSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="pdf" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}
