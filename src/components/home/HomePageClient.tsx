"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Image as ImageIcon, FileText, Layers, Award, ArrowUpRight, ShieldCheck, Zap, Lock, Search, CheckCircle2, RotateCw } from "lucide-react";
import { HeaderAd, FooterAd } from "@/components/ads/AdUnit";

export function HomePageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const allTools = [
    {
      id: "pdf-to-word",
      category: "pdf",
      title: "PDF to Word Converter",
      desc: "Convert non-editable PDF documents into fully editable Microsoft Word (.docx) files matching 1:1 original layout.",
      badge: "DOCX Export",
      href: "/tools/pdf-to-word",
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      tagColor: "bg-blue-100 text-blue-900 border-blue-200",
    },
    {
      id: "word-to-pdf",
      category: "pdf",
      title: "Word to PDF Converter",
      desc: "Convert Microsoft Word (.docx) documents to PDF files instantly in your browser with clean formatting.",
      badge: "DOCX to PDF",
      href: "/tools/word-to-pdf",
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      tagColor: "bg-indigo-100 text-indigo-900 border-indigo-200",
    },
    {
      id: "pdf-merge",
      category: "pdf",
      title: "PDF Merge & Splitter",
      desc: "Combine multiple PDF documents into a single file or reorder pages with zero file size limits.",
      badge: "Fast & Private",
      href: "/tools/pdf-merge",
      icon: <Layers className="w-6 h-6 text-rose-600" />,
      tagColor: "bg-rose-100 text-rose-900 border-rose-200",
    },
    {
      id: "pdf-split",
      category: "pdf",
      title: "Split PDF Pages",
      desc: "Separate single PDF pages or extract custom page ranges into individual clean PDF documents.",
      badge: "Page Extraction",
      href: "/tools/pdf-split",
      icon: <Layers className="w-6 h-6 text-rose-600" />,
      tagColor: "bg-rose-100 text-rose-900 border-rose-200",
    },
    {
      id: "image-to-pdf",
      category: "pdf",
      title: "JPG / Image to PDF Converter",
      desc: "Combine JPG, PNG, and WEBP photos into a clean single PDF document in seconds.",
      badge: "Batch Images",
      href: "/tools/image-to-pdf",
      icon: <ImageIcon className="w-6 h-6 text-indigo-600" />,
      tagColor: "bg-indigo-100 text-indigo-900 border-indigo-200",
    },
    {
      id: "pdf-rotate",
      category: "pdf",
      title: "Rotate PDF Pages",
      desc: "Rotate sideways or upside-down PDF pages 90°, 180°, or 270° clockwise with 1-click download.",
      badge: "Page Rotation",
      href: "/tools/pdf-rotate",
      icon: <RotateCw className="w-6 h-6 text-amber-600" />,
      tagColor: "bg-amber-100 text-amber-900 border-amber-200",
    },
    {
      id: "pdf-protect",
      category: "pdf",
      title: "Protect PDF Password",
      desc: "Encrypt your PDF files with custom user/owner passwords to prevent unauthorized viewing.",
      badge: "AES Encryption",
      href: "/tools/pdf-protect",
      icon: <Lock className="w-6 h-6 text-purple-600" />,
      tagColor: "bg-purple-100 text-purple-900 border-purple-200",
    },
    {
      id: "pdf-compressor",
      category: "pdf",
      title: "PDF File Compressor",
      desc: "Reduce PDF document file size for easy email attachment while maintaining crisp text quality.",
      badge: "Lossless Stream",
      href: "/tools/pdf-compressor",
      icon: <Layers className="w-6 h-6 text-amber-600" />,
      tagColor: "bg-amber-100 text-amber-900 border-amber-200",
    },
    {
      id: "resume-scorer",
      category: "resume",
      title: "General Resume Auditor",
      desc: "Audit resume formatting, section structure, bullet quality & 0-100 score without needing a job description.",
      badge: "Format Audit",
      href: "/tools/resume-scorer",
      icon: <Award className="w-6 h-6 text-violet-600" />,
      tagColor: "bg-violet-100 text-violet-900 border-violet-200",
    },
    {
      id: "ai-resume-builder",
      category: "resume",
      title: "AI Resume Builder",
      desc: "Build ATS-optimized professional resumes with live preview & printable templates.",
      badge: "ATS Optimized",
      href: "/tools/ai-resume-builder",
      icon: <Award className="w-6 h-6 text-blue-600" />,
      tagColor: "bg-blue-100 text-blue-900 border-blue-200",
    },
    {
      id: "cover-letter-generator",
      category: "resume",
      title: "AI Cover Letter Generator",
      desc: "Generate persuasive, job-tailored cover letters in 10 seconds.",
      badge: "AI Writer",
      href: "/tools/cover-letter-generator",
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      tagColor: "bg-indigo-100 text-indigo-900 border-indigo-200",
    },
    {
      id: "background-remover",
      category: "image",
      title: "AI Background Remover",
      desc: "Remove image backgrounds automatically in 1 second using client-side AI. Export transparent HD PNG.",
      badge: "AI Powered",
      href: "/tools/background-remover",
      icon: <ImageIcon className="w-6 h-6 text-emerald-600" />,
      tagColor: "bg-emerald-100 text-emerald-900 border-emerald-200",
    },
    {
      id: "image-compressor",
      category: "image",
      title: "Smart Image Compressor",
      desc: "Compress JPG, PNG, and WEBP file sizes up to 90% with live quality slider & byte savings stats.",
      badge: "Live Re-compress",
      href: "/tools/image-compressor",
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      tagColor: "bg-indigo-100 text-indigo-900 border-indigo-200",
    },
    {
      id: "image-converter",
      category: "image",
      title: "Universal Image Converter",
      desc: "Batch convert PNG, JPG, WEBP, BMP, and GIF images to any format with zero quality loss.",
      badge: "Batch Convert",
      href: "/tools/image-converter",
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      tagColor: "bg-blue-100 text-blue-900 border-blue-200",
    },
  ];

  const filteredTools = allTools.filter((t) => {
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        
        <HeaderAd />

        {/* Canva Hero Banner */}
        <div className="canva-hero-banner rounded-3xl p-8 sm:p-14 text-white text-center relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/30 mb-6">
            <Sparkles className="w-4 h-4 text-amber-300" /> Fast & Free Web Utility & AI Suite
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white font-outfit max-w-4xl mx-auto">
            Every PDF & Image Tool You Need, <span className="text-amber-300 underline decoration-white/40 underline-offset-8">100% Free</span>
          </h1>

          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-medium mt-4">
            Convert, split, merge, rotate, compress, and protect PDF files. 100% client-side browser privacy with zero registration.
          </p>

          {/* Canva Search & Quick Category Filters */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="canva-search-bar rounded-2xl p-2 flex items-center gap-3">
              <div className="pl-3 text-purple-600">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search PDF to Word, Split PDF, JPG to PDF, Rotate PDF, Protect PDF..."
                className="w-full bg-transparent border-none text-slate-900 font-semibold placeholder:text-slate-400 focus:outline-none text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-3 py-1 text-xs text-slate-400 hover:text-slate-700 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs font-bold">
              {[
                { id: "all", label: "✨ All Tools" },
                { id: "pdf", label: "📄 PDF Tools" },
                { id: "resume", label: "📊 Resume & CV" },
                { id: "image", label: "🖼️ Image Tools" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedCategory(pill.id)}
                  className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                    selectedCategory === pill.id
                      ? "bg-white text-purple-700 font-extrabold shadow-md scale-105"
                      : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-md"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs font-bold text-white border-t border-white/20 mt-8">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> 100% Free Forever
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-300" /> Client Privacy
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-300" /> Fast WASM Speed
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Lock className="w-4 h-4 text-purple-300" /> Zero Registration
            </div>
          </div>
        </div>

        {/* Tools Display */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight font-outfit">
              {selectedCategory === "all"
                ? "PDF Utility & AI SaaS Tools"
                : selectedCategory === "pdf"
                ? "📄 PDF Tools Suite"
                : selectedCategory === "resume"
                ? "📊 Resume & CV Tools"
                : "🖼️ Image AI Tools"}
            </h2>
            <span className="text-xs font-extrabold text-purple-700 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200">
              {filteredTools.length} Tools Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                className="canva-card p-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${tool.tagColor}`}>
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-950 text-xl group-hover:text-purple-700 transition-colors flex items-center gap-1 font-outfit">
                      {tool.title} <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs font-medium text-slate-700 mt-2 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-purple-700">
                  <span>Use Tool</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <FooterAd />
      </div>
    </div>
  );
}
