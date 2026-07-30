import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Image as ImageIcon, FileCheck, Layers } from "lucide-react";

export interface ToolItem {
  name: string;
  href: string;
  description: string;
  category: "pdf" | "image" | "resume";
}

const allTools: ToolItem[] = [
  // PDF Tools
  { name: "PDF Compressor", href: "/tools/pdf-compressor", description: "Reduce PDF size online without losing quality", category: "pdf" },
  { name: "Merge PDF", href: "/tools/pdf-merge", description: "Combine multiple PDF files into one single document", category: "pdf" },
  { name: "PDF to Word", href: "/tools/pdf-to-word", description: "Convert PDF documents into editable Word files", category: "pdf" },
  { name: "Word to PDF", href: "/tools/word-to-pdf", description: "Convert Word DOCX files into PDF format instantly", category: "pdf" },
  { name: "Image to PDF", href: "/tools/image-to-pdf", description: "Convert JPG and PNG images into a clean PDF document", category: "pdf" },
  { name: "Split PDF", href: "/tools/pdf-split", description: "Extract pages or split PDF into separate files", category: "pdf" },
  { name: "Rotate PDF", href: "/tools/pdf-rotate", description: "Rotate PDF pages clockwise or counter-clockwise", category: "pdf" },
  { name: "Protect PDF", href: "/tools/pdf-protect", description: "Encrypt and password protect your PDF files", category: "pdf" },

  // Image Tools
  { name: "Background Remover", href: "/tools/background-remover", description: "Remove image background automatically in 1 click", category: "image" },
  { name: "Image Compressor", href: "/tools/image-compressor", description: "Compress PNG, JPG, and WebP images up to 90%", category: "image" },
  { name: "Image Converter", href: "/tools/image-converter", description: "Convert image files to PNG, JPG, WebP, or AVIF", category: "image" },

  // Resume Tools
  { name: "Resume Scorer", href: "/tools/resume-scorer", description: "100-point ATS resume scoring & section audit", category: "resume" },
  { name: "AI Resume Builder", href: "/tools/ai-resume-builder", description: "Create professional ATS-friendly resumes in minutes", category: "resume" },
  { name: "Cover Letter Generator", href: "/tools/cover-letter-generator", description: "Generate personalized cover letters using AI", category: "resume" },
];

export function RelatedTools({ currentPath, category }: { currentPath: string; category?: "pdf" | "image" | "resume" }) {
  const filtered = allTools
    .filter((t) => t.href !== currentPath)
    .sort((a, b) => {
      if (category && a.category === category && b.category !== category) return -1;
      if (category && b.category === category && a.category !== category) return 1;
      return 0;
    })
    .slice(0, 4);

  return (
    <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-slate-950 font-outfit flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" /> Related Online Utility Tools
          </h3>
          <p className="text-xs text-slate-600 font-bold mt-1">
            Explore complementary tools for document processing, image optimization, and career building.
          </p>
        </div>
        <Link href="/tools" className="text-xs font-black text-indigo-600 hover:underline flex items-center gap-1">
          View all 15 tools <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-500 transition-all space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                {t.category === "pdf" && <FileText className="w-4 h-4" />}
                {t.category === "image" && <ImageIcon className="w-4 h-4" />}
                {t.category === "resume" && <FileCheck className="w-4 h-4" />}
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-extrabold text-slate-950 text-sm group-hover:text-indigo-600 transition-colors font-outfit">
              {t.name}
            </h4>
            <p className="text-xs text-slate-600 font-medium line-clamp-2">
              {t.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Internal Navigation Category Pills */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs font-black">
        <span className="text-slate-500">Quick Category Navigation:</span>
        <div className="flex flex-wrap gap-2">
          <Link href="/tools" className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200">
            📄 All 8 PDF Tools
          </Link>
          <Link href="/tools" className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200">
            🖼️ All 3 Image Tools
          </Link>
          <Link href="/tools" className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200">
            💼 All 4 Career AI Tools
          </Link>
        </div>
      </div>
    </section>
  );
}
