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
      category: "career",
      title: "Free ATS Resume Checker & Scorer",
      desc: "Audit your resume score out of 100, keyword gaps, section ordering & quick fixes in seconds.",
      badge: "Resumly Grade",
      href: "/tools/resume-scorer",
      icon: <Award className="w-6 h-6 text-violet-600" />,
      tagColor: "bg-violet-100 text-violet-900 border-violet-200",
    },
    {
      id: "ats-resume-checker",
      category: "career",
      title: "ATS Resume Checker",
      desc: "Check your resume keyword match score against target job descriptions to beat corporate filters.",
      badge: "NLP Engine",
      href: "/tools/ats-resume-checker",
      icon: <Award className="w-6 h-6 text-purple-600" />,
      tagColor: "bg-purple-100 text-purple-900 border-purple-200",
    },
    {
      id: "ai-resume-builder",
      category: "career",
      title: "AI Resume Builder",
      desc: "Build ATS-optimized professional resumes with live preview & printable templates.",
      badge: "ATS Optimized",
      href: "/tools/ai-resume-builder",
      icon: <Award className="w-6 h-6 text-blue-600" />,
      tagColor: "bg-blue-100 text-blue-900 border-blue-200",
    },
    {
      id: "cover-letter-generator",
      category: "career",
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
      badge: "Up to 90% Savings",
      href: "/tools/image-compressor",
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      tagColor: "bg-indigo-100 text-indigo-900 border-indigo-200",
    },
    {
      id: "image-converter",
      category: "image",
      title: "Universal Image Converter",
      desc: "Batch convert PNG, JPG, WEBP, BMP, and GIF images to any format with zero quality loss.",
      badge: "Batch Conversion",
      href: "/tools/image-converter",
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      tagColor: "bg-blue-100 text-blue-900 border-blue-200",
    },
  ];

  const filteredTools = allTools.filter((t) => {
    const matchesCategory =
      selectedCategory === "all" || t.category === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>100% Free Online AI & Utility Tools Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight font-outfit text-white leading-tight">
            Fast, Private Online Web Tools <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Zero Signup Required
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Process PDFs, compress images, remove photo backgrounds, and audit resumes with Resumly-grade AI algorithms. Executed 100% locally inside your web browser.
          </p>

          {/* Search Bar & Quick Filters */}
          <div className="max-w-2xl mx-auto pt-4 space-y-4">
            <div className="canva-search-bar rounded-2xl p-2 flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md">
              <div className="pl-3 text-slate-300">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search PDF to Word, Split PDF, JPG to PDF, Rotate PDF, Protect PDF..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="pr-3 text-xs font-bold text-slate-300 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { id: "all", label: "All Tools (15)" },
                { id: "pdf", label: "PDF Suite (8)" },
                { id: "image", label: "Image Tools (3)" },
                { id: "career", label: "Career & Resume AI (4)" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-white text-slate-950 shadow-md"
                      : "bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Client-Side Privacy</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-400" /> Instant Processing</span>
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-indigo-400" /> Zero File Uploads</span>
          </div>

        </div>
      </section>

      {/* Main Tools Container */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        <HeaderAd />

        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-950 tracking-tight font-outfit">
                Featured Online Web Tools ({filteredTools.length})
              </h2>
              <p className="text-xs text-slate-600 font-bold mt-1">
                Select any tool below to launch instant in-browser document or image processing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((t) => (
              <Link
                key={t.id}
                href={t.href}
                className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {t.icon}
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-black border ${t.tagColor}`}>
                      {t.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-slate-950 text-lg group-hover:text-indigo-600 transition-colors flex items-center gap-1 font-outfit">
                      {t.title} <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed font-bold">
                      {t.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-indigo-600">
                  <span>Launch Tool</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Value Proposition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h3 className="font-black text-slate-950 text-base font-outfit">100% Private Browser Sandbox</h3>
            <p className="text-xs text-slate-600 font-bold leading-relaxed">
              Your files never touch our servers. WebAssembly and HTML5 Canvas process all documents locally inside your web browser.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
            <Zap className="w-6 h-6 text-indigo-600" />
            <h3 className="font-black text-slate-950 text-base font-outfit">Zero Signup & Unrestricted Usage</h3>
            <p className="text-xs text-slate-600 font-bold leading-relaxed">
              No credit cards, mandatory email logins, or daily file limits. Use every tool completely free anytime.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
            <Sparkles className="w-6 h-6 text-violet-600" />
            <h3 className="font-black text-slate-950 text-base font-outfit">Resumly & Commercial Grade AI</h3>
            <p className="text-xs text-slate-600 font-bold leading-relaxed">
              Our career tools use advanced NLP algorithms to check ATS scores, order resume sections, and match job keywords.
            </p>
          </div>
        </div>

        <FooterAd />
      </section>
    </div>
  );
}
