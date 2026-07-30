import { Metadata } from "next";
import { PdfToWordClient } from "@/tools/pdf-to-word/PdfToWordClient";
import { PdfToWordSeo } from "@/tools/pdf-to-word/PdfToWordSeo";
import { HeaderAd, FooterAd } from "@/components/ads/AdUnit";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { TrustBadges } from "@/components/seo/TrustBadges";
import { ToolPageHero } from "@/components/ui/ToolPageHero";
import {
  getCanonicalUrl,
  generateWebApplicationSchema,
  generateWebPageSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/schema";

const TOOL_PATH = "/tools/pdf-to-word";
const CANONICAL_URL = getCanonicalUrl(TOOL_PATH);

export const metadata: Metadata = {
  title: "Convert PDF to Word Online Free (Editable DOCX) â€” Fast",
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
    title: "Convert PDF to Word Online Free (Editable DOCX) â€” Fast",
    description:
      "Convert PDF files to editable Microsoft Word (.docx) documents online for free preserving layout and fonts.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "ToolboxSaaS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert PDF to Word Online Free (Editable DOCX) â€” Fast",
    description: "Convert PDF files to editable Microsoft Word (.docx) documents online for free.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

const webPageSchema = generateWebPageSchema({
  name: "Convert PDF to Word Online Free (Editable DOCX)",
  description: "Convert PDF files to editable Microsoft Word (.docx) documents online for free.",
  url: CANONICAL_URL,
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: getCanonicalUrl("/") },
  { name: "Tools", url: getCanonicalUrl("/tools") },
  { name: "PDF to Word Converter", url: CANONICAL_URL },
]);

export default function PdfToWordPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
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
        title="Convert PDF to Word Online Free"
        description="Convert non-editable PDF documents into fully editable Word (.docx) files with original formatting preserved."
        badge="PDF Utility Suite"
        breadcrumbLabel="PDF to Word"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <PdfToWordClient />

      </div>

      <TrustBadges />

      <PdfToWordSeo />

      <div className="max-w-5xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <RelatedTools currentPath={TOOL_PATH} category="pdf" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}

