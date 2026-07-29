"use client";

import { useState } from "react";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface NewsletterFormProps {
  variant?: "default" | "footer" | "sidebar";
}

export function NewsletterForm({ variant = "default" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("You're subscribed! Check your inbox for confirmation.");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-emerald-700 dark:text-emerald-300">
        <CheckCircle className="w-5 h-5 shrink-0" />
        <p className="text-sm font-medium">{message}</p>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary shrink-0"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Mail className="w-4 h-4" />
              Subscribe
            </>
          )}
        </button>
        {status === "error" && (
          <p className="w-full text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {message}
          </p>
        )}
      </form>
    );
  }

  // Default / sidebar variant
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (optional)"
        className="input"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="input"
      />
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Mail className="w-4 h-4" />
            Subscribe for free
          </>
        )}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {message}
        </p>
      )}
      <p className="text-xs text-gray-400 text-center">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
