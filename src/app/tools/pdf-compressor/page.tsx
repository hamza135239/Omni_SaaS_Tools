import { Metadata } from "next";
import Link from "next/link";
import { PdfCompressorTool } from "@/tools/pdf-compressor/PdfCompressorTool";
import { PdfCompressorSeo } from "@/tools/pdf-compressor/PdfCompressorSeo";
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
const TOOL_PATH = "/tools/pdf-compressor";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Compress PDF Online Free (Reduce File Size)",
  description:
    "Compress PDF files online for free. Reduce PDF file size instantly without losing document quality. 100% secure client-side WASM processing. No signup required.",
  keywords: [
    "compress pdf online free",
    "reduce pdf file size",
    "pdf size reducer online",
    "compress pdf to 100kb",
    "pdf compressor no watermark",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Compress PDF Online Free (Reduce File Size)",
    description:
      "Compress PDF files online for free without losing document quality. 100% secure client-side processing.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How do I reduce PDF file size online?",
    a: "Upload your PDF file to our online PDF Compressor, select your desired compression level (Low, Medium, High), and download your compressed PDF instantly.",
  },
  {
    q: "Will reducing PDF size degrade text or document quality?",
    a: "Our PDF compressor strips duplicate font streams, optimizes embedded image streams, and removes unnecessary metadata while maintaining crisp text readability.",
  },
  {
    q: "Is PDF compression secure and private?",
    a: "Yes! All compression takes place 100% locally inside your web browser using WebAssembly. Your files are never uploaded to remote servers.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Free Online PDF File Size Compressor",
  description: "Compress PDF files online without losing document quality using client-side WebAssembly.",
  url: CANONICAL_URL,
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "PDF File Compressor", url: CANONICAL_URL },
]);

export default function PdfCompressorPage() {
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
        <span className="text-slate-950 dark:text-slate-100 font-bold">PDF File Compressor</span>
      </div>

      <PdfCompressorTool />

      <TrustBadges />

      <PdfCompressorSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="pdf" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}
