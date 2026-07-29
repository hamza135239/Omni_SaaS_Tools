import { Metadata } from "next";
import Link from "next/link";
import { BackgroundRemoverTool } from "@/tools/background-remover/BackgroundRemoverTool";
import { BackgroundRemoverSeo } from "@/tools/background-remover/BackgroundRemoverSeo";
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
const TOOL_PATH = "/tools/background-remover";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Remove Background From Image Free (1-Click AI) — Fast | ToolboxSaaS",
  description:
    "Remove background from photos automatically in 1 click using client-side AI. Export transparent HD PNG files with zero server uploads or registration.",
  keywords: [
    "remove background from image free",
    "ai background remover",
    "transparent png maker",
    "remove bg online free",
    "cut out background image",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Remove Background From Image Free (1-Click AI) — Fast",
    description:
      "Remove background from photos automatically in 1 click using client-side AI.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How do I remove the background from an image for free?",
    a: "Upload your image file (JPG, PNG, WebP) to our AI Background Remover tool. Our client-side neural model isolates the subject and removes the background in under 3 seconds.",
  },
  {
    q: "Does it support high resolution image exports?",
    a: "Yes! Unlike other tools that downscale your image resolution, our tool preserves the full resolution HD PNG format.",
  },
  {
    q: "Are my private photos uploaded to a server?",
    a: "No! All AI segmentation processes execute locally in your web browser memory. Your images never touch an external server.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Free AI Background Remover",
  description: "Remove image background automatically using client-side AI neural vision models.",
  url: CANONICAL_URL,
  category: "MultimediaApplication",
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "AI Background Remover", url: CANONICAL_URL },
]);

export default function BackgroundRemoverPage() {
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
        <span className="text-slate-950 dark:text-slate-100 font-bold">AI Background Remover</span>
      </div>

      <BackgroundRemoverTool />

      <TrustBadges />

      <BackgroundRemoverSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="image" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}
