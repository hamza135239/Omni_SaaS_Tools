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
  { name: "Image Compressor", href: "/tools/image-compressor", description: "Compress PNG, JPG, and WebP images up to 80%", category: "image" },
  { name: "Image Converter", href: "/tools/image-converter", description: "Convert image files to PNG, JPG, WebP, or AVIF", category: "image" },

  // Resume Tools
  { name: "AI Resume Builder", href: "/tools/ai-resume-builder", description: "Create professional ATS-friendly resumes in minutes", category: "resume" },
  { name: "ATS Resume Checker", href: "/tools/ats-resume-checker", description: "Scan your resume for ATS compliance and keywords", category: "resume" },
  { name: "Cover Letter Generator", href: "/tools/cover-letter-generator", description: "Generate personalized cover letters using AI", category: "resume" },
];

export function RelatedTools({ currentPath, category }: { currentPath: string; category?: "pdf" | "image" | "resume" }) {
  // Filter out current tool, prioritize same category
  const filtered = allTools
    .filter((t) => t.href !== currentPath)
    .sort((a, b) => {
      if (category && a.category === category && b.category !== category) return -1;
      if (category && b.category === category && a.category !== category) return 1;
      return 0;
    })
    .slice(0, 4);

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-950 dark:text-slate-50 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Related Utility Tools
        </h3>
        <Link href="/tools" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
          View all tools <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                {t.category === "pdf" && <FileText className="w-4 h-4" />}
                {t.category === "image" && <ImageIcon className="w-4 h-4" />}
                {t.category === "resume" && <FileCheck className="w-4 h-4" />}
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {t.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {t.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
