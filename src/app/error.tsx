"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50 text-slate-900">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold font-outfit text-slate-950">500 Server Error</h1>
          <p className="text-xs text-slate-600 font-bold mt-2">
            Something unexpected occurred. Our system logged the incident.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full py-3.5 px-4 rounded-xl font-extrabold text-xs bg-slate-950 text-white hover:bg-slate-900 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="w-full py-3.5 px-4 rounded-xl font-extrabold text-xs bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200 flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
