"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Award,
  FileText,
  ChevronDown,
  Wrench,
  ShieldCheck,
  Grid,
  RotateCw,
  Lock,
  Home,
} from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pdfDropdown, setPdfDropdown] = useState(false);
  const [resumeDropdown, setResumeDropdown] = useState(false);
  const [imageDropdown, setImageDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setPdfDropdown(false);
    setResumeDropdown(false);
    setImageDropdown(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-1.5"
          : "bg-white border-b border-slate-200/60 py-2.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xs shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 font-outfit">
                Toolbox<span className="text-indigo-600">SaaS</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> 100% Free
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 font-extrabold text-xs text-slate-900">
            
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl transition-all ${
                pathname === "/"
                  ? "bg-indigo-600 text-white font-black shadow-xs"
                  : "hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            {/* 1. PDF Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPdfDropdown(true)}
              onMouseLeave={() => setPdfDropdown(false)}
            >
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer font-black text-slate-900">
                <FileText className="w-4 h-4 text-blue-600" /> PDF Tools{" "}
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                    pdfDropdown ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>

              {pdfDropdown && (
                <div className="absolute top-full left-0 w-72 pt-2 z-50 animate-slide-down">
                  <div className="p-2 bg-white rounded-2xl border border-slate-200 shadow-xl space-y-1">
                    <div className="px-3 py-1 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      PDF Document Tools
                    </div>
                    
                    <Link
                      href="/tools/pdf-to-word"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-blue-50 text-slate-950 text-xs font-extrabold group"
                    >
                      <FileText className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="font-extrabold group-hover:text-blue-600">PDF to Word</div>
                        <div className="text-[10px] text-slate-600 font-bold">Convert PDF to DOCX</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/word-to-pdf"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-indigo-50 text-slate-950 text-xs font-extrabold group"
                    >
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <div>
                        <div className="font-extrabold group-hover:text-indigo-600">Word to PDF</div>
                        <div className="text-[10px] text-slate-600 font-bold">Convert DOCX to PDF</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/pdf-merge"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-rose-50 text-slate-950 text-xs font-extrabold group"
                    >
                      <Layers className="w-4 h-4 text-rose-600" />
                      <div>
                        <div className="font-extrabold group-hover:text-rose-600">PDF Merge</div>
                        <div className="text-[10px] text-slate-600 font-bold">Combine multiple PDFs</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/pdf-split"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-rose-50 text-slate-950 text-xs font-extrabold group"
                    >
                      <Layers className="w-4 h-4 text-rose-600" />
                      <div>
                        <div className="font-extrabold group-hover:text-rose-600">Split PDF</div>
                        <div className="text-[10px] text-slate-600 font-bold">Separate pages or ranges</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/image-to-pdf"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-indigo-50 text-slate-950 text-xs font-extrabold group"
                    >
                      <ImageIcon className="w-4 h-4 text-indigo-600" />
                      <div>
                        <div className="font-extrabold group-hover:text-indigo-600">JPG to PDF</div>
                        <div className="text-[10px] text-slate-600 font-bold">Convert images to PDF</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/pdf-rotate"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-amber-50 text-slate-950 text-xs font-extrabold group"
                    >
                      <RotateCw className="w-4 h-4 text-amber-600" />
                      <div>
                        <div className="font-extrabold group-hover:text-amber-600">Rotate PDF</div>
                        <div className="text-[10px] text-slate-600 font-bold">Rotate pages 90° 180°</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/pdf-protect"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-purple-50 text-slate-950 text-xs font-extrabold group"
                    >
                      <Lock className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="font-extrabold group-hover:text-purple-600">Protect PDF</div>
                        <div className="text-[10px] text-slate-600 font-bold">Add password security</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/pdf-compressor"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-amber-50 text-slate-950 text-xs font-extrabold group"
                    >
                      <Wrench className="w-4 h-4 text-amber-600" />
                      <div>
                        <div className="font-extrabold group-hover:text-amber-600">PDF Compressor</div>
                        <div className="text-[10px] text-slate-600 font-bold">Shrink file size</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Resume & CV Category */}
            <div
              className="relative"
              onMouseEnter={() => setResumeDropdown(true)}
              onMouseLeave={() => setResumeDropdown(false)}
            >
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer font-black text-slate-900">
                <Award className="w-4 h-4 text-purple-600" /> Resume & CV{" "}
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                    resumeDropdown ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>

              {resumeDropdown && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-slide-down">
                  <div className="p-2 bg-white rounded-2xl border border-slate-200 shadow-xl space-y-1">
                    <div className="px-3 py-1 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      Resume & Jobs Suite
                    </div>
                    <Link
                      href="/tools/resume-scorer"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-purple-50 text-slate-950 text-xs font-extrabold transition-colors group"
                    >
                      <Award className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="font-extrabold group-hover:text-purple-600">ATS Resume Checker</div>
                        <div className="text-[10px] text-slate-600 font-bold">100-point score audit</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/ai-resume-builder"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50 text-slate-950 text-xs font-extrabold transition-colors group"
                    >
                      <FileText className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="font-extrabold group-hover:text-blue-600">AI Resume Builder</div>
                        <div className="text-[10px] text-slate-600 font-bold">6 templates & PDF export</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/cover-letter-generator"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50 text-slate-950 text-xs font-extrabold transition-colors group"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <div>
                        <div className="font-extrabold group-hover:text-indigo-600">Cover Letter Writer</div>
                        <div className="text-[10px] text-slate-600 font-bold">AI job-tailored writer</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Image Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setImageDropdown(true)}
              onMouseLeave={() => setImageDropdown(false)}
            >
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer font-black text-slate-900">
                <ImageIcon className="w-4 h-4 text-emerald-600" /> Image Tools{" "}
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                    imageDropdown ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>

              {imageDropdown && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-slide-down">
                  <div className="p-2 bg-white rounded-2xl border border-slate-200 shadow-xl space-y-1">
                    <div className="px-3 py-1 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      Image Editing
                    </div>
                    <Link
                      href="/tools/background-remover"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 text-slate-950 text-xs font-extrabold transition-colors group"
                    >
                      <ImageIcon className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="font-extrabold group-hover:text-emerald-600">Background Remover</div>
                        <div className="text-[10px] text-slate-600 font-bold">AI automatic cutout</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/image-compressor"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50 text-slate-950 text-xs font-extrabold transition-colors group"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <div>
                        <div className="font-extrabold group-hover:text-indigo-600">Image Compressor</div>
                        <div className="text-[10px] text-slate-600 font-bold">Live slider compression</div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/image-converter"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50 text-slate-950 text-xs font-extrabold transition-colors group"
                    >
                      <Layers className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="font-extrabold group-hover:text-blue-600">Image Converter</div>
                        <div className="text-[10px] text-slate-600 font-bold">WEBP, PNG, JPG, BMP</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/tools"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                pathname === "/tools"
                  ? "bg-indigo-600 text-white font-black shadow-xs"
                  : "hover:text-indigo-600 hover:bg-slate-50 text-slate-900"
              }`}
            >
              <Grid className="w-4 h-4 text-indigo-600" /> All Tools
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-slate-900 hover:text-indigo-600 hover:bg-slate-100 border border-slate-300 cursor-pointer"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Drawer - Original Simple Style */}
        {mobileOpen && (
          <nav className="lg:hidden py-4 border-t border-slate-200 space-y-5 max-h-[80vh] overflow-y-auto animate-slide-down">
            
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Home className="w-4 h-4 text-indigo-600" /> Home Page
            </Link>

            {/* 1. PDF Tools Section */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-black text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" /> PDF Document Tools
              </div>
              <Link href="/tools/pdf-to-word" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-blue-50">
                <FileText className="w-4 h-4 text-blue-600" /> PDF to Word Converter
              </Link>
              <Link href="/tools/word-to-pdf" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-indigo-50">
                <FileText className="w-4 h-4 text-indigo-600" /> Word to PDF Converter
              </Link>
              <Link href="/tools/pdf-merge" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-rose-50">
                <Layers className="w-4 h-4 text-rose-600" /> PDF Merge
              </Link>
              <Link href="/tools/pdf-split" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-rose-50">
                <Layers className="w-4 h-4 text-rose-600" /> Split PDF Pages
              </Link>
              <Link href="/tools/image-to-pdf" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-indigo-50">
                <ImageIcon className="w-4 h-4 text-indigo-600" /> JPG to PDF Converter
              </Link>
              <Link href="/tools/pdf-rotate" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-amber-50">
                <RotateCw className="w-4 h-4 text-amber-600" /> Rotate PDF Pages
              </Link>
              <Link href="/tools/pdf-protect" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-purple-50">
                <Lock className="w-4 h-4 text-purple-600" /> Protect PDF File
              </Link>
              <Link href="/tools/pdf-compressor" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-amber-50">
                <Wrench className="w-4 h-4 text-amber-600" /> PDF Compressor
              </Link>
            </div>

            {/* 2. Resume & CV Section */}
            <div className="space-y-1 border-t border-slate-100 pt-3">
              <div className="px-3 py-1 text-[11px] font-black text-purple-600 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-purple-600" /> Resume & CV AI Tools
              </div>
              <Link href="/tools/resume-scorer" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-purple-50">
                <Award className="w-4 h-4 text-purple-600" /> ATS Resume Checker
              </Link>
              <Link href="/tools/ai-resume-builder" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-blue-50">
                <FileText className="w-4 h-4 text-blue-600" /> AI Resume Builder
              </Link>
              <Link href="/tools/cover-letter-generator" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-indigo-50">
                <Sparkles className="w-4 h-4 text-indigo-600" /> Cover Letter Writer
              </Link>
            </div>

            {/* 3. Image Tools Section */}
            <div className="space-y-1 border-t border-slate-100 pt-3">
              <div className="px-3 py-1 text-[11px] font-black text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" /> Image AI & Utility Tools
              </div>
              <Link href="/tools/background-remover" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-emerald-50">
                <ImageIcon className="w-4 h-4 text-emerald-600" /> AI Background Remover
              </Link>
              <Link href="/tools/image-compressor" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-indigo-50">
                <Sparkles className="w-4 h-4 text-indigo-600" /> Smart Image Compressor
              </Link>
              <Link href="/tools/image-converter" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-blue-50">
                <Layers className="w-4 h-4 text-blue-600" /> Universal Image Converter
              </Link>
            </div>

            {/* 4. Company Links Section */}
            <div className="space-y-1 border-t border-slate-100 pt-3">
              <div className="px-3 py-1 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                Company & Legal
              </div>
              <Link href="/about" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-slate-100">
                About Us
              </Link>
              <Link href="/contact" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-slate-100">
                Contact Us
              </Link>
              <Link href="/privacy-policy" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-slate-100">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 hover:bg-slate-100">
                Terms of Service
              </Link>
            </div>

            <div className="pt-2">
              <Link
                href="/tools"
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <Grid className="w-4 h-4 text-white" /> View All 14 Tools
              </Link>
            </div>

          </nav>
        )}
      </div>
    </header>
  );
}

