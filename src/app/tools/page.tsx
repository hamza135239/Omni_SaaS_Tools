import { Metadata } from "next";
import { ToolsPortalClient } from "@/tools/ToolsPortalClient";
import {
  getCanonicalUrl,
  generateCollectionPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/schema";

const CANONICAL_URL = getCanonicalUrl("/tools");

export const metadata: Metadata = {
  title: "All Free Online AI & Utility Web Tools Platform",
  description:
    "Explore our complete suite of 100% free, private online tools for PDF processing, image editing, and career resume building. Zero registration required.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "All Free Online AI & Utility Web Tools Platform",
    description: "Browser-processed tools for PDFs, images, and career resumes with zero signup.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "ToolboxSaaS",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Free Online AI & Utility Web Tools Platform",
    description: "Browser-processed tools for PDFs, images, and career resumes with zero signup.",
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

const toolListItems = [
  { name: "PDF to Word Converter", url: getCanonicalUrl("/tools/pdf-to-word") },
  { name: "Word to PDF Converter", url: getCanonicalUrl("/tools/word-to-pdf") },
  { name: "PDF Merge & Splitter", url: getCanonicalUrl("/tools/pdf-merge") },
  { name: "PDF File Compressor", url: getCanonicalUrl("/tools/pdf-compressor") },
  { name: "Split PDF Pages", url: getCanonicalUrl("/tools/pdf-split") },
  { name: "JPG to PDF Converter", url: getCanonicalUrl("/tools/image-to-pdf") },
  { name: "Rotate PDF Pages", url: getCanonicalUrl("/tools/pdf-rotate") },
  { name: "Protect PDF Password", url: getCanonicalUrl("/tools/pdf-protect") },
  { name: "AI Background Remover", url: getCanonicalUrl("/tools/background-remover") },
  { name: "Smart Image Compressor", url: getCanonicalUrl("/tools/image-compressor") },
  { name: "Universal Image Converter", url: getCanonicalUrl("/tools/image-converter") },
  { name: "General Resume Structure Auditor", url: getCanonicalUrl("/tools/resume-scorer") },
  { name: "AI Cover Letter Generator", url: getCanonicalUrl("/tools/cover-letter-generator") },
  { name: "AI Resume Builder", url: getCanonicalUrl("/tools/ai-resume-builder") },
];

const collectionSchema = generateCollectionPageSchema({
  name: "All Free Online AI & Utility Web Tools Platform",
  description: "Browse 15 browser-processed PDF, image, and career resume SaaS tools.",
  url: CANONICAL_URL,
  items: toolListItems,
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: getCanonicalUrl("/") },
  { name: "Tools", url: CANONICAL_URL },
]);

export default function ToolsPortalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ToolsPortalClient />
    </>
  );
}
