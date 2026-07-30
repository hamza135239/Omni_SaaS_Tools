import { Metadata } from "next";
import { ImageConverterTool } from "@/tools/image-converter/ImageConverterTool";
import { ImageConverterSeo } from "@/tools/image-converter/ImageConverterSeo";
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
const TOOL_PATH = "/tools/image-converter";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Convert Image Online Free (PNG, JPG, WEBP, AVIF) | ToolboxSaaS",
  description:
    "Batch convert PNG, JPG, WEBP, AVIF, and BMP images to any target format online for free. Fast 100% private client-side conversion without registration.",
  keywords: [
    "image converter online free",
    "png to webp converter",
    "jpg to png converter",
    "convert image to avif",
    "batch image converter",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Convert Image Online Free (PNG, JPG, WEBP, AVIF) â€” Fast",
    description:
      "Batch convert PNG, JPG, WEBP, AVIF, and BMP images to any target format online for free.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How do I convert images to another format for free?",
    a: "Upload your image files (PNG, JPG, WEBP, AVIF, BMP), select your target output format, and click 'Convert All'. Download converted files instantly.",
  },
  {
    q: "Will converting image formats reduce quality?",
    a: "Our client-side conversion engine optimizes color palettes and compression vectors while keeping visual quality sharp.",
  },
  {
    q: "Is batch image conversion supported?",
    a: "Yes! You can convert multiple images to your desired format at once without daily limits.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Universal Image Format Converter",
  description: "Batch convert PNG, JPG, WEBP, AVIF, and BMP image files online.",
  url: CANONICAL_URL,
  category: "MultimediaApplication",
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "Image Converter", url: CANONICAL_URL },
]);

export default function ImageConverterPage() {
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
        title="Convert Image Format Online Free"
        description="Convert images between PNG, JPG, WebP, and AVIF formats instantly. 100% browser-based, no uploads."
        badge="Image Tools Suite"
        breadcrumbLabel="Image Converter"
      />

<ImageConverterTool />

      <TrustBadges />

      <ImageConverterSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="image" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}

