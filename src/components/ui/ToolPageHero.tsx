"use client";

import React from "react";
import Link from "next/link";
import { Home, ChevronRight, ShieldCheck, Zap, Lock, CheckCircle2 } from "lucide-react";

interface ToolPageHeroProps {
  title: string;
  description: string;
  badge?: string;
  breadcrumbLabel: string;
}

export function ToolPageHero({ title, description, badge, breadcrumbLabel }: ToolPageHeroProps) {
  return (
    <div
      className="w-full text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #7d2ae8 0%, #2d1d8e 50%, #00c4cc 100%)",
        borderRadius: "0 0 32px 32px",
        paddingBottom: "40px",
        marginBottom: "32px",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #a78bfa, transparent)", top: "-40px", right: "-40px" }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #22d3ee, transparent)", bottom: "-30px", left: "-30px" }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-white/70 mb-8">
          <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <Link href="/tools" className="hover:text-white transition-colors">
            Tools
          </Link>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <span className="text-white font-bold">{breadcrumbLabel}</span>
        </nav>

        {/* Content — center aligned */}
        <div className="text-center">
          {/* Badge Pill */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/30 mb-5">
              ✦ {badge}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white font-outfit max-w-3xl mx-auto">
            {title}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto leading-relaxed font-medium mt-4">
            {description}
          </p>

          {/* Trust Row */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-8 pt-6 border-t border-white/20 text-xs font-bold text-white">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> 100% Free Forever
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-300" /> No File Uploads
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-300" /> WASM Speed
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-violet-300" /> 100% Private
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
