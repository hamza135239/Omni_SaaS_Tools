import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-20 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-950 font-outfit">
                Toolbox<span className="text-indigo-600">SaaS</span>
              </span>
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed">
              100% free online utility suite. Process PDF documents, check resume ATS scores, remove image backgrounds & compress files safely inside your browser.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Client-Side Privacy
            </div>
          </div>

          {/* Col 2: PDF Document Tools */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider font-outfit">PDF Tools</h3>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/tools/pdf-to-word" className="hover:text-indigo-600 transition-colors">PDF to Word Converter</Link>
              </li>
              <li>
                <Link href="/tools/word-to-pdf" className="hover:text-indigo-600 transition-colors">Word to PDF Converter</Link>
              </li>
              <li>
                <Link href="/tools/pdf-merge" className="hover:text-indigo-600 transition-colors">PDF Merge</Link>
              </li>
              <li>
                <Link href="/tools/pdf-split" className="hover:text-indigo-600 transition-colors">Split PDF Pages</Link>
              </li>
              <li>
                <Link href="/tools/image-to-pdf" className="hover:text-indigo-600 transition-colors">JPG to PDF Converter</Link>
              </li>
              <li>
                <Link href="/tools/pdf-rotate" className="hover:text-indigo-600 transition-colors">Rotate PDF Pages</Link>
              </li>
              <li>
                <Link href="/tools/pdf-protect" className="hover:text-indigo-600 transition-colors">Protect PDF Password</Link>
              </li>
              <li>
                <Link href="/tools/pdf-compressor" className="hover:text-indigo-600 transition-colors">PDF File Compressor</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resume & CV AI */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider font-outfit">Resume & CV</h3>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/tools/resume-scorer" className="hover:text-indigo-600 transition-colors font-bold text-indigo-600">Free ATS Resume Checker</Link>
              </li>
              <li>
                <Link href="/tools/ai-resume-builder" className="hover:text-indigo-600 transition-colors">AI Resume Builder</Link>
              </li>
              <li>
                <Link href="/tools/cover-letter-generator" className="hover:text-indigo-600 transition-colors">AI Cover Letter Writer</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Mandatory Legal & Company Links */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider font-outfit">Company & Legal</h3>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/about" className="hover:text-indigo-600 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-indigo-600 transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} ToolboxSaaS. All rights reserved. Zero registration required.</p>
          <div className="flex items-center gap-4">
            <Link href="/tools" className="hover:underline">All Tools</Link>
            <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
            <Link href="/terms-of-service" className="hover:underline">Terms</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
