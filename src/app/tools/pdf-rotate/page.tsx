import { Metadata } from "next";
import { PdfRotateTool } from "@/tools/pdf-rotate/PdfRotateTool";
import { PdfRotateSeo } from "@/tools/pdf-rotate/PdfRotateSeo";
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
const TOOL_PATH = "/tools/pdf-rotate";
const CANONICAL_URL = `${SITE_URL}${TOOL_PATH}`;

export const metadata: Metadata = {
  title: "Rotate PDF Online Free (Rotate PDF Pages 90Â° & 180Â°) | ToolboxSaaS",
  description:
    "Rotate PDF pages clockwise or counter-clockwise (90Â°, 180Â°, 270Â°) online for free. Permanently save orientation with 100% private browser processing.",
  keywords: [
    "rotate pdf online free",
    "rotate pdf pages 90 degrees",
    "turn pdf upside down",
    "permanently rotate pdf",
    "change pdf orientation free",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Rotate PDF Online Free (Rotate PDF Pages 90Â° & 180Â°)",
    description:
      "Rotate PDF pages clockwise or counter-clockwise (90Â°, 180Â°, 270Â°) online for free.",
    url: CANONICAL_URL,
    type: "website",
  },
};

const faqs = [
  {
    q: "How do I rotate PDF pages online for free?",
    a: "Upload your PDF file, click the rotate buttons (90Â° clockwise or counter-clockwise) for individual pages or all pages, and click 'Save & Download'.",
  },
  {
    q: "Will the rotation be saved permanently in the PDF?",
    a: "Yes! Our tool alters the page orientation metadata permanently when saving your PDF.",
  },
  {
    q: "Is rotating PDF pages secure?",
    a: "Yes! Rotation runs completely in your web browser memory. Your files are never sent to external servers.",
  },
];

const webAppSchema = generateWebApplicationSchema({
  name: "Free Online PDF Page Rotator",
  description: "Rotate individual PDF pages or full documents permanently.",
  url: CANONICAL_URL,
});

const faqSchema = generateFaqSchema(faqs);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Tools", url: `${SITE_URL}/tools` },
  { name: "Rotate PDF", url: CANONICAL_URL },
]);

export default function PdfRotatePage() {
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
        title="Rotate PDF Pages Online Free"
        description="Rotate PDF pages clockwise or counter-clockwise instantly. Select individual pages or rotate all at once."
        badge="PDF Utility Suite"
        breadcrumbLabel="Rotate PDF"
      />

      <PdfRotateTool />

      <TrustBadges />

      <PdfRotateSeo />

      <div className="max-w-5xl mx-auto mt-12">
        <RelatedTools currentPath={TOOL_PATH} category="pdf" />
      </div>

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}

