import { Metadata } from "next";
import Link from "next/link";
import { PdfMergeTool } from "@/tools/pdf-merge/PdfMergeTool";
import { PdfMergeSeo } from "@/tools/pdf-merge/PdfMergeSeo";
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
const TOOL_PATH = "/tools/pdf-merge";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Merge PDF Online Free (Combine PDF Files) — Fast | ToolboxSaaS",
  description:
    "Combine multiple PDF documents into one single file online for free. Drag & drop page reordering with 100% secure client-side WASM processing.",
  keywords: [
    "merge pdf online free",
    "combine pdf files online",
    "pdf joiner free",
    "merge pdf documents",
    "combine pdf pages free",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Merge PDF Online Free (Combine PDF Files) — Fast",
    description:
      "Combine multiple PDF documents into one single file online for free with page reordering.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How many PDF files can I merge at once?",
    a: "You can merge unlimited PDF files simultaneously. Our tool runs directly in your browser with zero file size caps.",
  },
  {
    q: "Can I reorder PDF pages before merging?",
    a: "Yes! Drag and drop individual PDF pages or files to set your preferred page order before downloading.",
  },
  {
    q: "Are my uploaded PDF files safe?",
    a: "100% safe! All merging operations occur locally in your web browser memory. Your documents never reach any external server.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Free Online PDF Document Merger",
  description: "Combine multiple PDF documents into a single file with custom page reordering.",
  url: CANONICAL_URL,
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "Merge PDF", url: CANONICAL_URL },
]);

export default function PdfMergePage() {
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
        <span className="text-slate-950 dark:text-slate-100 font-bold">Merge PDF</span>
      </div>

      <PdfMergeTool />

      <TrustBadges />

      <PdfMergeSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="pdf" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}
