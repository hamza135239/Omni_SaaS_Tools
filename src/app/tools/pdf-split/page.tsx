import React from "react";
import { PdfSplitTool } from "@/tools/pdf-split/PdfSplitTool";
import { PdfSplitSeo } from "@/tools/pdf-split/PdfSplitSeo";
import { HeaderAd, FooterAd } from "@/components/ads/AdUnit";

export const metadata = {
  title: "Free Split PDF Online — Extract Pages & Ranges | ToolboxSaaS",
  description: "Separate single PDF pages or extract custom page ranges into individual PDF files for free. 100% private browser processing.",
  alternates: {
    canonical: "https://toolboxsaas.com/tools/pdf-split",
  },
};

export default function PdfSplitPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <HeaderAd />
        <PdfSplitTool />
        <PdfSplitSeo />
        <FooterAd />
      </div>
    </div>
  );
}
