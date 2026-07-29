import React from "react";
import { PdfRotateTool } from "@/tools/pdf-rotate/PdfRotateTool";
import { PdfRotateSeo } from "@/tools/pdf-rotate/PdfRotateSeo";
import { HeaderAd, FooterAd } from "@/components/ads/AdUnit";

export const metadata = {
  title: "Free Rotate PDF Online — Rotate PDF Pages 90° 180° | ToolboxSaaS",
  description: "Rotate PDF pages clockwise or counter-clockwise (90°, 180°, 270°) online for free. 100% private browser processing.",
  alternates: {
    canonical: "https://toolboxsaas.com/tools/pdf-rotate",
  },
};

export default function PdfRotatePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <HeaderAd />
        <PdfRotateTool />
        <PdfRotateSeo />
        <FooterAd />
      </div>
    </div>
  );
}
