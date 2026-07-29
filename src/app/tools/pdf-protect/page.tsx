import React from "react";
import { PdfProtectTool } from "@/tools/pdf-protect/PdfProtectTool";
import { PdfProtectSeo } from "@/tools/pdf-protect/PdfProtectSeo";
import { HeaderAd, FooterAd } from "@/components/ads/AdUnit";

export const metadata = {
  title: "Free Protect PDF Online — Add Password Encryption | ToolboxSaaS",
  description: "Encrypt your PDF documents with custom passwords online for free. 100% private browser-side AES encryption.",
  alternates: {
    canonical: "https://toolboxsaas.com/tools/pdf-protect",
  },
};

export default function PdfProtectPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <HeaderAd />
        <PdfProtectTool />
        <PdfProtectSeo />
        <FooterAd />
      </div>
    </div>
  );
}
