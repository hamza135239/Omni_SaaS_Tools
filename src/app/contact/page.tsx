"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-6 text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Mail className="w-4 h-4 text-indigo-600" /> Get in Touch
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 font-outfit">
            Contact Support & Publisher Team
          </h1>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Have questions, feedback, or business inquiries regarding ToolboxSaaS? Send us a message below.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Info Card */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6 text-xs font-medium">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-950 text-sm font-outfit">Publisher Details</h3>
              <p className="text-slate-600 leading-relaxed">
                ToolboxSaaS is a privacy-first utility web platform providing free browser-based tools.
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-3 text-slate-700">
                <Mail className="w-4 h-4 text-indigo-600" />
                <span>support@toolboxsaas.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Client-Side Security Audit</span>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-900 text-lg font-outfit">Message Sent Successfully!</h3>
                <p className="text-xs text-emerald-700">
                  Thank you for contacting us. Our publisher team will respond within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-950 font-semibold focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-950 font-semibold focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. AdSense Inquiry / Tool Feedback"
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-950 font-semibold focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-950 font-semibold focus:ring-2 focus:ring-indigo-600 focus:outline-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4 text-white" /> Send Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
