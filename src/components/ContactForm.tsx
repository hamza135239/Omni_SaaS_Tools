"use client";
import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading"); setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err.message ?? "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle className="w-12 h-12 text-green-500" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Message Sent!</h3>
        <p className="text-gray-500">Thank you for reaching out. We&apos;ll respond within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="contact-name">Full Name *</label>
          <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange} required minLength={2} maxLength={100} className="input" placeholder="Your name" />
        </div>
        <div>
          <label className="label" htmlFor="contact-email">Email Address *</label>
          <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} required maxLength={254} className="input" placeholder="your@email.com" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="contact-subject">Subject</label>
        <select id="contact-subject" name="subject" value={form.subject} onChange={handleChange} className="input">
          <option value="">Select a topic</option>
          <option>Factual correction in an article</option>
          <option>Content partnership / collaboration</option>
          <option>Advertising inquiry</option>
          <option>General question</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="label" htmlFor="contact-message">Message *</label>
        <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} required minLength={10} maxLength={5000} rows={5} className="input resize-none" placeholder="Tell us how we can help..." />
      </div>
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}
      <button type="submit" disabled={status === "loading"} className="btn-primary btn-lg w-full sm:w-auto">
        {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        Send Message
      </button>
    </form>
  );
}
