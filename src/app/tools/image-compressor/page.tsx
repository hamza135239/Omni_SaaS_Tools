import { Metadata } from "next";
import { ImageCompressorTool } from "@/tools/image-compressor/ImageCompressorTool";
import { ImageCompressorSeo } from "@/tools/image-compressor/ImageCompressorSeo";
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
const TOOL_PATH = "/tools/image-compressor";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Compress Image Online Free (PNG, JPG, WEBP) â€” Fast | ToolboxSaaS",
  description:
    "Compress JPG, PNG, and WebP image file sizes up to 85% online for free. Real-time visual comparison slider with 100% private browser WebAssembly compression.",
  keywords: [
    "compress image online free",
    "png image compressor",
    "jpg file size reducer",
    "webp compressor online",
    "reduce image file size to 50kb",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Compress Image Online Free (PNG, JPG, WEBP) â€” Fast",
    description:
      "Compress JPG, PNG, and WebP image file sizes up to 85% online for free.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How do I compress images without losing quality?",
    a: "Select your images, adjust the quality compression slider (Default 80%), and download. Our smart lossy algorithms optimize image streams while leaving visual details sharp.",
  },
  {
    q: "What image formats are supported?",
    a: "Our tool supports PNG, JPEG/JPG, WebP, and AVIF image formats.",
  },
  {
    q: "Is batch image compression free?",
    a: "Yes! You can compress multiple images simultaneously without any daily limits or registration.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Smart Image File Compressor",
  description: "Compress PNG, JPG, and WebP image file sizes up to 85% using client-side WebAssembly.",
  url: CANONICAL_URL,
  category: "MultimediaApplication",
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "Image Compressor", url: CANONICAL_URL },
]);

export default function ImageCompressorPage() {
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
        title="Compress Images Online Free"
        description="Compress PNG, JPG, and WebP images up to 90% smaller. Client-side compression with zero quality loss."
        badge="Image Tools Suite"
        breadcrumbLabel="Image Compressor"
      />

<ImageCompressorTool />

      <TrustBadges />

      <ImageCompressorSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="image" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}

