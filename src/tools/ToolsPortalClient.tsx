"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Image as ImageIcon,
  FileText,
  Layers,
  Award,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { HeaderAd, FooterAd } from "@/components/ads/AdUnit";

export function ToolsPortalClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const tools = [
    {
      id: "background-remover",
      title: "AI Background Remover",
      desc: "Remove image backgrounds automatically in 1 second using client-side AI. Export transparent HD PNG.",
      category: "image",
      badge: "AI Powered",
      href: "/tools/background-remover",
      icon: <ImageIcon className="w-6 h-6 text-emerald-600" />,
      tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "image-compressor",
      title: "Smart Image Compressor",
      desc: "Compress JPG, PNG, and WEBP file sizes up to 90% with live quality slider & byte savings stats.",
      category: "image",
      badge: "Up to 90% Savings",
      href: "/tools/image-compressor",
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      id: "image-converter",
      title: "Universal Image Converter",
      desc: "Batch convert PNG, JPG, WEBP, BMP, and GIF images to any format with zero quality loss.",
      category: "image",
      badge: "Batch Conversion",
      href: "/tools/image-converter",
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: "pdf-merge",
      title: "PDF Merge & Splitter",
      desc: "Combine multiple PDF documents into a single file or reorder pages with zero file limits.",
      category: "pdf",
      badge: "Fast & Private",
      href: "/tools/pdf-merge",
      icon: <Layers className="w-6 h-6 text-rose-600" />,
      tagColor: "bg-rose-50 text-rose-700 border-rose-200",
    },
    {
      id: "pdf-compressor",
      title: "PDF File Compressor",
      desc: "Reduce PDF document file size for easy email attachment while maintaining crisp text quality.",
      category: "pdf",
      badge: "Lossless Stream",
      href: "/tools/pdf-compressor",
      icon: <Layers className="w-6 h-6 text-amber-600" />,
      tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "pdf-to-word",
      title: "PDF to Word Converter",
      desc: "Convert non-editable PDF documents into fully editable Microsoft Word (.docx) files.",
      category: "pdf",
      badge: "DOCX Export",
      href: "/tools/pdf-to-word",
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: "word-to-pdf",
      title: "Word to PDF Converter",
      desc: "Convert Microsoft Word (.docx) documents to PDF files instantly in your browser.",
      category: "pdf",
      badge: "DOCX to PDF",
      href: "/tools/word-to-pdf",
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      id: "image-to-pdf",
      title: "JPG to PDF Converter",
      desc: "Convert JPG, PNG, and WEBP images into clean PDF documents.",
      category: "pdf",
      badge: "JPG to PDF",
      href: "/tools/image-to-pdf",
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      id: "pdf-split",
      title: "Split PDF Pages",
      desc: "Separate single PDF pages or extract custom page ranges easily.",
      category: "pdf",
      badge: "Extract Pages",
      href: "/tools/pdf-split",
      icon: <Layers className="w-6 h-6 text-rose-600" />,
      tagColor: "bg-rose-50 text-rose-700 border-rose-200",
    },
    {
      id: "pdf-rotate",
      title: "Rotate PDF Pages",
      desc: "Rotate upside-down or sideways PDF pages 90°, 180°, or 270°.",
      category: "pdf",
      badge: "Page Rotation",
      href: "/tools/pdf-rotate",
      icon: <Layers className="w-6 h-6 text-amber-600" />,
      tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "pdf-protect",
      title: "Protect PDF Password",
      desc: "Encrypt PDF files with custom passwords for security.",
      category: "pdf",
      badge: "AES Encryption",
      href: "/tools/pdf-protect",
      icon: <Layers className="w-6 h-6 text-purple-600" />,
      tagColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      id: "resume-scorer",
      title: "General Resume Auditor",
      desc: "Audit resume formatting, section order, text quality & 0-100 quality score.",
      category: "career",
      badge: "Format Audit",
      href: "/tools/resume-scorer",
      icon: <Award className="w-6 h-6 text-violet-600" />,
      tagColor: "bg-violet-50 text-violet-700 border-violet-200",
    },
    {
      id: "ats-resume-checker",
      title: "Job Match Keyword Scanner",
      desc: "Compare resume keywords against specific job description postings.",
      category: "career",
      badge: "Job Matcher",
      href: "/tools/ats-resume-checker",
      icon: <Award className="w-6 h-6 text-purple-600" />,
      tagColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      id: "cover-letter-generator",
      title: "AI Cover Letter Generator",
      desc: "Generate persuasive, job-tailored cover letters in seconds.",
      category: "career",
      badge: "AI Writer",
      href: "/tools/cover-letter-generator",
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      id: "ai-resume-builder",
      title: "AI Resume Builder",
      desc: "Build clean, ATS-optimized professional resumes with live PDF export.",
      category: "career",
      badge: "ATS Optimized",
      href: "/tools/ai-resume-builder",
      icon: <Award className="w-6 h-6 text-blue-600" />,
      tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white text-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <HeaderAd />

        {/* Portal Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">
            <ShieldCheck className="w-4 h-4 text-indigo-600" /> Free Web & AI Tools Suite
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight">
            All Online Web & AI SaaS Tools
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Client-side browser tools for image editing, PDF manipulation, and career resume creation. 100% free with zero signups.
          </p>

          {/* Search Input */}
          <div className="relative max-w-xl mx-auto pt-2">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tools (e.g. pdf to word, background remover, ats score)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:ring-2 focus:ring-indigo-600 focus:bg-white focus:outline-none placeholder-zinc-400"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: "all", label: "All Tools (15)" },
              { id: "image", label: "Image Tools (3)" },
              { id: "pdf", label: "PDF Tools (8)" },
              { id: "career", label: "Career & Resume AI (4)" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-zinc-900 text-white shadow-xs"
                    : "bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 border border-zinc-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="group p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {tool.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${tool.tagColor}`}>
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-zinc-950 text-lg group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                    {tool.title} <ArrowUpRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                <span>Open Tool</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>

        <FooterAd />
      </div>
    </div>
  );
}
