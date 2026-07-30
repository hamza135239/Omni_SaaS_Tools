"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, RefreshCw, FileText, Download } from "lucide-react";

export function CoverLetterGeneratorTool() {
  const [applicantName, setApplicantName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [keySkills, setKeySkills] = useState<string>("");
  const [tone, setTone] = useState<"professional" | "enthusiastic" | "executive">("professional");
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedLetter, setGeneratedLetter] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerateLetter = () => {
    if (!jobTitle || !companyName) return;

    setLoading(true);

    setTimeout(() => {
      const name = applicantName.trim() || "[Your Full Name]";
      const skillsArr = keySkills.split(",").map((s) => s.trim()).filter(Boolean);
      const skillsStr = skillsArr.length > 0 ? skillsArr.join(", ") : "project execution, problem-solving, and communication";

      let opening = `Dear Hiring Manager,`;
      let intro = `I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. With a proven track record in ${skillsStr}, I am excited about the opportunity to contribute to your team's ongoing success.`;
      
      if (tone === "enthusiastic") {
        intro = `I was thrilled to see the opening for the ${jobTitle} role at ${companyName}! As someone deeply passionate about delivering top-tier performance, I am confident that my expertise in ${skillsStr} makes me an ideal fit for your innovative team.`;
      } else if (tone === "executive") {
        intro = `Please accept this letter as formal application for the ${jobTitle} executive position at ${companyName}. Throughout my career, I have specialized in driving strategic growth and leveraging key strengths in ${skillsStr}.`;
      }

      let body = `In my previous experience, I have successfully led cross-functional initiatives, optimized operational workflows, and consistently delivered measurable results. My hands-on background in ${skillsStr} aligns directly with the core requirements outlined for the ${jobTitle} role at ${companyName}.\n\nWhat excites me most about ${companyName} is your commitment to excellence and industry leadership. I bring a strategic mindset, relentless dedication, and the ability to convert key challenges into actionable successes.`;

      let closing = `Thank you for your time and consideration. I welcome the opportunity to discuss how my qualifications in ${skillsStr} match the strategic goals of ${companyName}.\n\nSincerely,\n${name}`;

      const fullLetter = `${opening}\n\n${intro}\n\n${body}\n\n${closing}`;

      setGeneratedLetter(fullLetter);
      setLoading(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedLetter], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `cover-letter-${companyName.toLowerCase().replace(/\s+/g, "-")}.txt`;
    element.click();
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-2xl border border-zinc-200 shadow-xs transition-all duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <div
            style={{ backgroundColor: "#e0e7ff", color: "#3730a3", borderColor: "#c7d2fe" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border mb-3"
          >
            <Sparkles style={{ color: "#4f46e5" }} className="w-4 h-4" />
            <span>AI Cover Letter Writer</span>
          </div>
          <h1 style={{ color: "#0f172a" }} className="text-2xl md:text-3xl font-black tracking-tight font-outfit">
            AI Cover Letter Generator
          </h1>
          <p style={{ color: "#334155" }} className="text-xs md:text-sm font-bold mt-1">
            Generate persuasive, job-tailored cover letters in 10 seconds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Form */}
        <div className="space-y-4 text-xs font-bold">
          <div className="space-y-1.5">
            <label style={{ color: "#0f172a" }} className="font-black text-xs block">Your Name (Optional):</label>
            <input
              type="text"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              style={{ backgroundColor: "#ffffff", color: "#0f172a", borderColor: "#94a3b8" }}
              className="w-full p-3 rounded-xl border-2 font-extrabold focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label style={{ color: "#0f172a" }} className="font-black text-xs block">Target Job Title:*</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                style={{ backgroundColor: "#ffffff", color: "#0f172a", borderColor: "#94a3b8" }}
                className="w-full p-3 rounded-xl border-2 font-extrabold focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label style={{ color: "#0f172a" }} className="font-black text-xs block">Company Name:*</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Microsoft"
                style={{ backgroundColor: "#ffffff", color: "#0f172a", borderColor: "#94a3b8" }}
                className="w-full p-3 rounded-xl border-2 font-extrabold focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label style={{ color: "#0f172a" }} className="font-black text-xs block">Key Skills (Comma separated):</label>
            <input
              type="text"
              value={keySkills}
              onChange={(e) => setKeySkills(e.target.value)}
              placeholder="e.g. Python, AWS, Team Leadership, Agile"
              style={{ backgroundColor: "#ffffff", color: "#0f172a", borderColor: "#94a3b8" }}
              className="w-full p-3 rounded-xl border-2 font-extrabold focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-700 font-semibold">Writing Tone:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "professional", label: "Professional" },
                { id: "enthusiastic", label: "Enthusiastic" },
                { id: "executive", label: "Executive" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id as any)}
                  className={`p-2.5 rounded-xl border transition-all text-center cursor-pointer font-semibold ${
                    tone === t.id
                      ? "bg-zinc-900 text-white border-zinc-900 shadow-xs"
                      : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerateLetter}
            disabled={loading || !jobTitle || !companyName}
            style={{ backgroundColor: "#18181b", color: "#ffffff" }}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-50 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <RefreshCw style={{ color: "#ffffff" }} className="w-4 h-4 animate-spin" />
                <span style={{ color: "#ffffff" }}>Drafting Cover Letter...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span style={{ color: "#ffffff" }}>Generate Tailored Cover Letter</span>
              </>
            )}
          </button>
        </div>

        {/* Generated Output Letter */}
        <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
              <span className="text-xs font-bold text-zinc-950 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" /> Generated Cover Letter
              </span>
              {generatedLetter && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-white border border-zinc-200 rounded-lg hover:bg-zinc-100 text-zinc-700"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownloadText}
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 text-white"
                  >
                    <Download className="w-3 h-3 text-white" />
                    <span>TXT</span>
                  </button>
                </div>
              )}
            </div>

            <textarea
              readOnly
              value={generatedLetter || "Your generated cover letter will appear here after clicking 'Generate Tailored Cover Letter'..."}
              rows={14}
              className="w-full p-4 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs focus:outline-none font-sans leading-relaxed resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
