"use client";

import React, { useState } from "react";
import {
  FileCheck2,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  RefreshCw,
  Search,
  Briefcase,
  FileText,
  Zap,
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
  const [jobTitle, setJobTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AtsResult | null>(null);

  // Common high-value action verbs for ATS
  const commonActionVerbs = [
    "achieved", "developed", "managed", "led", "created", "increased", "reduced",
    "implemented", "designed", "architected", "optimized", "launched", "spearheaded",
    "improved", "expanded", "generated", "engineered", "collaborated", "orchestrated"
  ];

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
    setJobTitle("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" /> AI Natural Language Processing (NLP) Engine
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ATS Resume Checker & Keyword Matcher
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Check your resume against target job descriptions to beat corporate ATS filters.
          </p>
        </div>

        {result && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Reset Analysis
          </button>
        )}
      </div>

      {/* Main Input Form (When no result yet) */}
      {!result ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Resume Text Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" /> Paste Your Resume Text:
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your full resume text here (Work experience, Skills, Summary, Education)..."
                rows={10}
                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>

            {/* Job Description Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600" /> Target Job Description:
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description or requirements from LinkedIn, Indeed, etc..."
                rows={10}
                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !resumeText.trim() || !jobDescription.trim()}
            className="w-full py-4 px-6 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" /> Analyzing Resume with ATS NLP Engine...
              </>
            ) : (
              <>
                <FileCheck2 className="w-5 h-5" /> Calculate ATS Match Score Now
              </>
            )}
          </button>
        </div>
      ) : (
        /* Results Dashboard */
        <div className="space-y-8">
          
          {/* Top Score Summary Banner */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-purple-900/90 to-indigo-900/90 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30">
                ATS Compatibility Report
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold">
                {result.overallScore >= 80
                  ? "Great Match! Ready for Job Applications"
                  : result.overallScore >= 60
                  ? "Good Match, but Needs Keyword Optimization"
                  : "Low ATS Match — Action Required"}
              </h2>
              <p className="text-sm text-purple-200 max-w-lg">
                Your resume scored {result.overallScore}% against the target job requirements.
              </p>
            </div>

            {/* Circular Score Badge */}
            <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center bg-white/10 rounded-full border-4 border-purple-400/50 backdrop-blur-md">
              <span className="text-3xl font-black">{result.overallScore}%</span>
            </div>
          </div>

          {/* Breakdown Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Hard Skills Match</span>
              <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                {result.hardSkillsScore}%
              </div>
              <p className="text-xs text-slate-500">Keyword relevance against job requirements.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Action Verbs Density</span>
              <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {result.actionVerbsScore}%
              </div>
              <p className="text-xs text-slate-500">Impactful action verbs found: {result.actionVerbsFound.length}</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">ATS Structure & Formatting</span>
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {result.formattingScore}%
              </div>
              <p className="text-xs text-slate-500">Readability by automated HR scanners.</p>
            </div>
          </div>

          {/* Matched & Missing Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Matched Keywords */}
            <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-3">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Matched Keywords ({result.matchedSkills.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.matchedSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="p-5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-3">
              <h4 className="font-bold text-rose-900 dark:text-rose-300 text-sm flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-600" /> Top Missing Keywords ({result.missingSkills.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200"
                  >
                    + {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Suggestions Box */}
          <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" /> Recommended AI Improvements
            </h4>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {result.suggestions.map((sug, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
