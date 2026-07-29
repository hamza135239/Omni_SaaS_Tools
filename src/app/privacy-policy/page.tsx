import React from "react";
import { ShieldCheck, Lock, Eye, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — ToolboxSaaS | Google AdSense Compliance",
  description: "Privacy policy for ToolboxSaaS. Learn how we handle cookies, Google AdSense ads, and browser-processed files.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> AdSense Compliant Policy
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 font-outfit">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-2">Last updated: July 2026</p>
        </div>

        {/* Policy Content */}
        <div className="space-y-6 text-xs md:text-sm text-slate-700 leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950 font-outfit">1. Client-Side File Privacy</h2>
            <p>
              At ToolboxSaaS, user privacy is our highest priority. All document processing (PDF to Word, PDF merging, PDF compression, image background removal, image compression, image conversion, and resume ATS scoring) happens <strong>100% locally inside your web browser</strong> using WebAssembly and client-side JavaScript. Your files are <strong>never uploaded to external servers</strong> or stored on remote databases.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950 font-outfit">2. Google AdSense & Third-Party Advertising</h2>
            <p>
              We use third-party advertising companies, including <strong>Google AdSense</strong>, to serve advertisements when you visit our website. These companies may use cookies, web beacons, and similar technologies to collect non-personally identifiable information about your visits to this and other websites in order to provide targeted advertisements about goods and services of interest to you.
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
              <li>Google uses cookies, such as the DART cookie, to serve ads based on user visits to our site and other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-bold">Google Ads Settings</a>.</li>
              <li>You can also opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-bold">aboutads.info</a>.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950 font-outfit">3. Log Files & Analytics</h2>
            <p>
              Like most standard web servers, ToolboxSaaS uses log files. This includes Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), referring/exit pages, platform type, date/time stamp, and number of clicks to analyze trends, administer the site, track user movement in the aggregate, and gather broad demographic information for aggregate use. IP addresses, etc. are not linked to personally identifiable information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950 font-outfit">4. GDPR & CCPA Compliance</h2>
            <p>
              If you are a resident of the European Economic Area (EEA) or California (USA), you have certain data protection rights under GDPR and CCPA. ToolboxSaaS does not collect, sell, or rent personal data. Any cookie consent choices can be managed directly through your web browser settings.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-200 pt-4">
            <h2 className="text-lg font-bold text-slate-950 font-outfit">5. Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at: <strong className="text-indigo-600">privacy@toolboxsaas.com</strong>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
