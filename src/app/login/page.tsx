"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message); setLoading(false); return; }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">TS</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 font-outfit">
              Toolbox<span className="text-indigo-600">SaaS</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mt-6">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage your platform</p>
        </div>

        <form onSubmit={handleLogin} className="card p-6 space-y-4">
          <div>
            <label className="label" htmlFor="login-email">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input pl-10" placeholder="admin@example.com" autoComplete="email" />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="login-password">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input id="login-password" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="input pl-10 pr-10" placeholder="••••••••" autoComplete="current-password" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          <button type="submit" disabled={loading} className="btn-primary w-full btn-lg">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          <Link href="/" className="hover:text-blue-600 transition-colors">← Back to site</Link>
        </p>
      </div>
    </div>
  );
}
