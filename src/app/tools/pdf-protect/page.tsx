import { Metadata } from "next";
import { PdfProtectTool } from "@/tools/pdf-protect/PdfProtectTool";
import { PdfProtectSeo } from "@/tools/pdf-protect/PdfProtectSeo";
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
const TOOL_PATH = "/tools/pdf-protect";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Protect PDF Online Free (Add Password & Encrypt PDF) | ToolboxSaaS",
  description:
    "Encrypt PDF documents with custom passwords online for free. 100% private browser-side AES encryption without uploading files to servers.",
  keywords: [
    "protect pdf online free",
    "password protect pdf",
    "encrypt pdf file online",
    "lock pdf with password",
    "pdf security tool free",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Protect PDF Online Free (Add Password & Encrypt PDF)",
    description:
      "Encrypt PDF documents with custom passwords online for free.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How do I password protect a PDF file for free?",
    a: "Upload your PDF file, type your secure password, and click 'Protect PDF'. Download your encrypted PDF document instantly.",
  },
  {
    q: "What encryption strength is used?",
    a: "Our browser engine uses strong AES 128-bit / 256-bit encryption standards to lock PDF files.",
  },
  {
    q: "Are my passwords or files stored on a server?",
    a: "No! All encryption occurs locally inside your web browser. Your passwords and PDF files are never sent to external servers.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Free Online PDF Document Locker",
  description: "Encrypt PDF files with custom passwords locally in browser.",
  url: CANONICAL_URL,
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "Protect PDF", url: CANONICAL_URL },
]);

export default function PdfProtectPage() {
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
        title="Password Protect PDF Online Free"
        description="Encrypt and password protect your PDF files instantly in your browser. AES-256 encryption, no server uploads."
        badge="PDF Utility Suite"
        breadcrumbLabel="Protect PDF"
      />

      <PdfProtectTool />

      <TrustBadges />

      <PdfProtectSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="pdf" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}

