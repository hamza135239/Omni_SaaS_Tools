"use client";

import dynamic from "next/dynamic";

const PdfToWordTool = dynamic(
  () => import("@/tools/pdf-to-word/PdfToWordTool").then((mod) => mod.PdfToWordTool),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-5xl mx-auto p-12 bg-white rounded-2xl border border-slate-200 text-center font-extrabold text-slate-700">
        Loading PDF to Word Converter...
      </div>
    ),
  }
);

export function PdfToWordClient() {
  return <PdfToWordTool />;
}
