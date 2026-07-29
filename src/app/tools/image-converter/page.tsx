import { Metadata } from "next";
import Link from "next/link";
import { ImageConverterTool } from "@/tools/image-converter/ImageConverterTool";
import { ImageConverterSeo } from "@/tools/image-converter/ImageConverterSeo";
import { HeaderAd, FooterAd } from "@/components/ads/AdUnit";
import { ChevronRight, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Universal Image Format Converter — PNG, JPG, WEBP, BMP | ToolboxSaaS",
  description:
    "Batch convert PNG, JPG, WEBP, BMP, and GIF images to any target format instantly without server uploads.",
  keywords: [
    "image converter online",
    "png to webp converter",
    "jpg to png free",
    "batch image format converter",
  ],
  openGraph: {
    title: "Universal Image Format Converter — PNG, JPG, WEBP, BMP",
    description: "Convert image formats online with zero quality loss.",
    type: "website",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Universal Image Format Converter",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0.00",
    priceCurrency: "USD",
  },
  description:
    "Free client-side image format converter for PNG, JPG, WEBP, BMP files.",
};

export default function ImageConverterPage() {
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
          Universal Image Converter
        </span>
      </div>

      <ImageConverterTool />

      <ImageConverterSeo />

      <div className="mt-12">
        <FooterAd />
      </div>
    </div>
  );
}
