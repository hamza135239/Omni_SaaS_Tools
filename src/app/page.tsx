import { Metadata } from "next";
import { HomePageClient } from "@/components/home/HomePageClient";
import {
  getCanonicalUrl,
  generateWebSiteSchema,
} from "@/lib/seo/schema";

const CANONICAL_URL = getCanonicalUrl("/");

export const metadata: Metadata = {
  title: "ToolboxSaaS — 100% Free Online AI & Utility Web Tools Platform",
  description:
    "Fast, 100% private online web tools for PDFs, images, and career resumes. Compress PDF, Merge PDF, Background Remover, ATS Resume Checker with zero registration.",
  keywords: [
    "free online web tools",
    "ai background remover",
    "image compressor online",
    "compress pdf free",
    "merge pdf online",
    "ats resume checker",
    "ai resume builder",
    "utility saas tools",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: CANONICAL_URL,
    siteName: "ToolboxSaaS",
    title: "ToolboxSaaS — Free AI & Online Utility Web Tools Platform",
    description: "Browser-processed tools for PDFs, images, and career resumes with zero signup.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolboxSaaS — Free AI & Online Utility Web Tools Platform",
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

const webSiteSchema = generateWebSiteSchema(getCanonicalUrl(""));

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <HomePageClient />
    </>
  );
}
