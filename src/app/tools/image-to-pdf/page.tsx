import React from "react";
import { ImageToPdfTool } from "@/tools/image-to-pdf/ImageToPdfTool";
import { ImageToPdfSeo } from "@/tools/image-to-pdf/ImageToPdfSeo";
import { HeaderAd, FooterAd } from "@/components/ads/AdUnit";

export const metadata = {
  title: "Free Image to PDF Converter — Convert JPG & PNG to PDF | ToolboxSaaS",
  description: "Combine multiple JPG, PNG, and WEBP photos into a clean single PDF document for free. 100% private browser processing.",
  alternates: {
    canonical: "https://toolboxsaas.com/tools/image-to-pdf",
  },
};

export default function ImageToPdfPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <HeaderAd />
        <ImageToPdfTool />
        <ImageToPdfSeo />
        <FooterAd />
      </div>
    </div>
  );
}
