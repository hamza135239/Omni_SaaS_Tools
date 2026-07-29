import React from "react";
import { Sparkles, ShieldCheck, Zap, Lock } from "lucide-react";

export const metadata = {
  title: "About Us — ToolboxSaaS | Free Online Web Utilities",
  description: "About ToolboxSaaS. Fast, private, client-side web utility tools for PDFs, resumes, and images.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm space-y-8">
        
        <div className="border-b border-slate-200 pb-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Sparkles className="w-4 h-4 text-indigo-600" /> About ToolboxSaaS
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-950 font-outfit">
            Fast, Private & 100% Free Web Tools
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Empowering professionals, students, and businesses with instant browser-based utility tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            <h3 className="font-bold text-slate-950 text-base font-outfit">100% Private</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All files are processed locally inside your web browser using WebAssembly. Zero files uploaded to remote servers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <Zap className="w-8 h-8 text-indigo-600" />
            <h3 className="font-bold text-slate-950 text-base font-outfit">Instant Speed</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No server upload queues or bandwidth bottlenecks. Process PDFs and images in milliseconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <Lock className="w-8 h-8 text-purple-600" />
            <h3 className="font-bold text-slate-950 text-base font-outfit">Zero Registration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No credit cards, signups, or email verification required. Open the website and use any tool freely.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
