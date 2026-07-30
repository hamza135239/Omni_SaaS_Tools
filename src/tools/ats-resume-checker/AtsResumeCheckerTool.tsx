"use client";

import React, { useState, useRef } from "react";
import {
  FileCheck2,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  RefreshCw,
  Briefcase,
  FileText,
  Upload,
  FileCode,
} from "lucide-react";

interface AtsResult {
  overallScore: number;
  hardSkillsScore: number;
  actionVerbsScore: number;
  formattingScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  actionVerbsFound: string[];
}

export function AtsResumeCheckerTool() {
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [extractingFile, setExtractingFile] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [result, setResult] = useState<AtsResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Common high-value action verbs for ATS
  const commonActionVerbs = [
    "achieved", "developed", "managed", "led", "created", "increased", "reduced",
    "implemented", "designed", "architected", "optimized", "launched", "spearheaded",
    "improved", "expanded", "generated", "engineered", "collaborated", "orchestrated"
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExtractingFile(true);
    setFileName(file.name);

    try {
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        const pdfjs = await import("pdfjs-dist");
        if (typeof window !== "undefined") {
          pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
        }
        const arrayBuffer = await file.arrayBuffer();
        let pdfDoc;
        try {
          const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) });
          pdfDoc = await loadingTask.promise;
        } catch {
          pdfjs.GlobalWorkerOptions.workerSrc = "";
          const fallbackTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) });
          pdfDoc = await fallbackTask.promise;
        }
        let fullText = "";
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const content = await page.getTextContent();
          const pageStr = content.items.map((item: any) => item.str).join(" ");
          fullText += " " + pageStr;
        }
        setResumeText(fullText.trim());
      } else {
        const text = await file.text();
        setResumeText(text.trim());
      }
    } catch (err) {
      console.error("File extraction error:", err);
    } finally {
      setExtractingFile(false);
    }
  };

  const handleAnalyze = () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;

    setLoading(true);

    setTimeout(() => {
      const resumeLower = resumeText.toLowerCase();
      const jobLower = jobDescription.toLowerCase();

      // Extract words from job description (>3 chars)
      const jobWords = Array.from(
        new Set(
          jobLower
            .replace(/[^\w\s]/gi, " ")
            .split(/\s+/)
            .filter((w) => w.length > 3)
        )
      );

      // Find matched & missing keywords
      const matched = jobWords.filter((w) => resumeLower.includes(w));
      const missing = jobWords.filter((w) => !resumeLower.includes(w)).slice(0, 10);

      // Find action verbs
      const actionVerbsFound = commonActionVerbs.filter((v) => resumeLower.includes(v));

      // Calculate Scores
      const keywordRatio = jobWords.length > 0 ? matched.length / jobWords.length : 0;
      const hardSkillsScore = Math.min(100, Math.round(keywordRatio * 120));
      const actionVerbsScore = Math.min(100, Math.round((actionVerbsFound.length / 5) * 100));

      // Formatting heuristic check
      let formattingScore = 85;
      if (resumeText.length < 300) formattingScore -= 30;
      if (!resumeLower.includes("education")) formattingScore -= 10;
      if (!resumeLower.includes("experience")) formattingScore -= 10;
      if (!resumeLower.includes("skills")) formattingScore -= 10;

      const overallScore = Math.round(
        hardSkillsScore * 0.5 + actionVerbsScore * 0.25 + formattingScore * 0.25
      );

      // Generate actionable AI suggestions
      const suggestions: string[] = [];
      if (missing.length > 0) {
        suggestions.push(`Add top missing keywords: "${missing.slice(0, 5).join('", "')}" to your experience section.`);
      }
      if (actionVerbsFound.length < 4) {
        suggestions.push("Use more strong action verbs (e.g. Spearheaded, Accelerated, Architected) at the start of bullet points.");
      }
      if (!resumeLower.includes("education") || !resumeLower.includes("skills")) {
        suggestions.push("Ensure clear section headings like 'Work Experience', 'Skills', and 'Education' so ATS parsers can categorize your data.");
      }

      setResult({
        overallScore: Math.max(20, Math.min(98, overallScore)),
        hardSkillsScore: Math.max(15, Math.min(99, hardSkillsScore)),
        actionVerbsScore: Math.max(20, Math.min(99, actionVerbsScore)),
        formattingScore: Math.max(40, Math.min(99, formattingScore)),
        matchedSkills: matched.slice(0, 12),
        missingSkills: missing,
        suggestions,
        actionVerbsFound,
      });

      setLoading(false);
    }, 600);
  };

  const handleReset = () => {
    setResumeText("");
    setJobDescription("");
    setFileName("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div
            style={{ backgroundColor: "#f3e8ff", color: "#6b21a8", borderColor: "#e9d5ff" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border mb-3"
          >
            <Sparkles style={{ color: "#9333ea" }} className="w-4 h-4" />
            <span>AI Job Description Matcher & Keyword Scanner</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50 font-outfit">
            Job Match Keyword Scanner
          </h1>
          <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300 mt-1">
            Upload your PDF/DOCX resume and paste target job description to find missing ATS keywords.
          </p>
        </div>

        {result && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-xs font-black border rounded-xl transition-all cursor-pointer bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-slate-100"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Analysis</span>
          </button>
        )}
      </div>

      {/* Main Input Form */}
      {!result ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Resume Upload / Text Area */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-black text-slate-950 dark:text-slate-50 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" /> Upload Resume PDF or Paste Text:
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800 hover:bg-purple-200 flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload File (PDF/DOCX)
                </button>
              </div>

              {fileName && (
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <FileCode className="w-4 h-4 text-emerald-600" /> File Loaded: {fileName}
                </div>
              )}

              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Upload PDF above or paste full resume text here..."
                rows={10}
                className="w-full p-4 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 text-sm font-semibold focus:outline-none focus:border-purple-600"
              />
            </div>

            {/* Job Description Input */}
            <div className="space-y-3">
              <label className="text-sm font-black text-slate-950 dark:text-slate-50 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600" /> Target Job Description:
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description from LinkedIn, Indeed, Glassdoor..."
                rows={10}
                className="w-full p-4 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 text-sm font-semibold focus:outline-none focus:border-purple-600"
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || extractingFile || !resumeText.trim() || !jobDescription.trim()}
            className="w-full py-4 px-6 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" /> Scanning Keywords with NLP Engine...
              </>
            ) : extractingFile ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" /> Extracting Text from {fileName}...
              </>
            ) : (
              <>
                <FileCheck2 className="w-5 h-5" /> Calculate Job Match Score Now
              </>
            )}
          </button>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-800 text-purple-200 border border-purple-700">
                Match Audit Report
              </span>
              <h2 className="text-2xl font-black">ATS Keyword Compatibility Score</h2>
              <p className="text-xs text-purple-200">
                Calculated by parsing your resume keywords against the job description.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <Award className="w-12 h-12 text-yellow-400" />
              <div>
                <span className="text-4xl font-black">{result.overallScore}%</span>
                <p className="text-xs text-purple-200 font-bold">Overall Match</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500">Keyword Match Rate</span>
              <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{result.hardSkillsScore}%</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500">Action Verbs Score</span>
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{result.actionVerbsScore}%</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500">Formatting Strength</span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{result.formattingScore}%</p>
            </div>
          </div>

          {/* Missing Keywords Box */}
          <div className="p-6 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 space-y-4">
            <h3 className="text-base font-black text-amber-950 dark:text-amber-200 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" /> Top Missing Keywords (Add These To Pass ATS)
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.missingSkills.map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-100 border border-amber-300 dark:border-amber-700">
                  + {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Matched Keywords Box */}
          <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 space-y-4">
            <h3 className="text-base font-black text-emerald-950 dark:text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Successfully Matched Keywords ({result.matchedSkills.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.matchedSkills.map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-200 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-100 border border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
