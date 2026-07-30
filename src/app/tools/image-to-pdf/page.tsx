import { Metadata } from "next";
import { ImageToPdfTool } from "@/tools/image-to-pdf/ImageToPdfTool";
import { ImageToPdfSeo } from "@/tools/image-to-pdf/ImageToPdfSeo";
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
const TOOL_PATH = "/tools/image-to-pdf";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Convert JPG to PDF Online Free (Image to PDF) â€” Fast | ToolboxSaaS",
  description:
    "Convert JPG, PNG, WEBP, and BMP images into a clean single PDF document online for free. 100% private browser processing with zero watermarks.",
  keywords: [
    "convert jpg to pdf online free",
    "image to pdf converter",
    "combine photos into pdf",
    "png to pdf free",
    "convert photos to pdf document",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Convert JPG to PDF Online Free (Image to PDF) â€” Fast",
    description:
      "Convert JPG, PNG, WEBP, and BMP images into a clean single PDF document online for free.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How do I convert images to PDF for free?",
    a: "Drag and drop your images (JPG, PNG, WebP), arrange your page order, select page size (A4, Letter), and click 'Convert to PDF'. Download your PDF instantly.",
  },
  {
    q: "Can I combine multiple photos into one PDF?",
    a: "Yes! You can combine unlimited photos into a single PDF document in seconds.",
  },
  {
    q: "Are my photos kept private during conversion?",
    a: "Yes! All processing happens locally in your browser memory. Your images are never uploaded to any remote server.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Free Image to PDF Converter",
  description: "Convert JPG, PNG, and WebP images into a single PDF document.",
  url: CANONICAL_URL,
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "Image to PDF", url: CANONICAL_URL },
]);

export default function ImageToPdfPage() {
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
        title="Convert Images to PDF Online Free"
        description="Combine JPG, PNG and WebP photos into a single clean PDF document in seconds. Batch support."
        badge="PDF Utility Suite"
        breadcrumbLabel="Image to PDF"
      />

      <ImageToPdfTool />

      <TrustBadges />

      <ImageToPdfSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="pdf" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}

