import React from "react";
import { FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms of Service — ToolboxSaaS | Utility Web Tools",
  description: "Terms of service for ToolboxSaaS. Usage terms for free online PDF, image, and ATS resume tools.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm space-y-8">
        
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 font-outfit">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500 mt-2">Last updated: July 2026</p>
        </div>

        <div className="space-y-6 text-xs md:text-sm text-slate-700 leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950 font-outfit">1. Agreement to Terms</h2>
            <p>
              By accessing or using ToolboxSaaS, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950 font-outfit">2. Use of Free Tools</h2>
            <p>
              ToolboxSaaS provides 100% free web utility tools including PDF converters, image background removers, compressors, and ATS resume builders. You are free to use these tools for personal, commercial, or academic purposes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950 font-outfit">3. Disclaimer of Liability</h2>
            <p>
              Our tools are provided &quot;as is&quot; without any warranty of any kind. ToolboxSaaS shall not be liable for any damages arising out of the use or inability to use our tools.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-200 pt-4">
            <h2 className="text-lg font-bold text-slate-950 font-outfit">4. Contact Information</h2>
            <p>
              For any questions regarding these terms, please contact: <strong className="text-indigo-600">support@toolboxsaas.com</strong>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
