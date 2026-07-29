import React from "react";
import { ShieldCheck, Zap, Lock, Sparkles } from "lucide-react";

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto my-8">
      <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">100% Private</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Zero file upload server calls</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Browser WASM Speed</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Instant client-side execution</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">TLS Encryption</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Secure end-to-end browser environment</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">100% Free Forever</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">No signups or watermarks</p>
        </div>
      </div>
    </div>
  );
}
