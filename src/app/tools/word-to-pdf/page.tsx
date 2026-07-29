import { Metadata } from "next";
import Link from "next/link";
import { WordToPdfTool } from "@/tools/word-to-pdf/WordToPdfTool";
import { WordToPdfSeo } from "@/tools/word-to-pdf/WordToPdfSeo";
import { HeaderAd, FooterAd } from "@/components/ads/AdUnit";
import { ChevronRight, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Word to PDF Converter — Convert DOCX to PDF Online | ToolboxSaaS",
  description:
    "Convert Microsoft Word (.docx) documents to PDF files online for free. Fast, private, browser-based conversion with zero software installation.",
  keywords: [
    "word to pdf free",
    "convert docx to pdf",
    "word to pdf converter online",
    "docx to pdf free",
  ],
  openGraph: {
    title: "Free Word to PDF Converter — Convert DOCX to PDF Online",
    description: "Convert Word (.docx) files to PDF in seconds.",
    type: "website",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Word to PDF Converter",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0.00",
    priceCurrency: "USD",
  },
  description:
    "Free online client-side Word DOCX to PDF converter.",
};

export default function WordToPdfPage() {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-white text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <HeaderAd />

      <div className="max-w-5xl mx-auto mb-6 flex items-center gap-2 text-xs font-semibold text-zinc-500">
        <Link href="/" className="hover:text-indigo-600 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/tools" className="hover:text-indigo-600">Tools</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-zinc-950 font-bold">
          Word to PDF Converter
        </span>
      </div>

      <WordToPdfTool />

      <WordToPdfSeo />

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}
