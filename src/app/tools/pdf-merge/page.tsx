import { Metadata } from "next";
import { PdfMergeTool } from "@/tools/pdf-merge/PdfMergeTool";
import { PdfMergeSeo } from "@/tools/pdf-merge/PdfMergeSeo";
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
const TOOL_PATH = "/tools/pdf-merge";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Merge PDF Online Free (Combine PDF Files) â€” Fast | ToolboxSaaS",
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
    title: "Merge PDF Online Free (Combine PDF Files) â€” Fast",
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
        title="Merge PDF Files Online Free"
        description="Combine multiple PDF documents into one single file. Reorder pages, drag & drop, 100% private browser processing."
        badge="PDF Utility Suite"
        breadcrumbLabel="PDF Merge"
      />

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

