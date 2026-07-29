"use client";

import React, { useState } from "react";
import {
  Award,
  Printer,
  Sparkles,
  Plus,
  Trash2,
  Eye,
  Layout,
  Palette,
  Type,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  ArrowUp,
  ArrowDown,
  FileText,
  Sliders,
} from "lucide-react";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  bullet1: string;
  bullet2: string;
}

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  duration: string;
}

export function AiResumeBuilderTool() {
  // Design Controls
  const [template, setTemplate] = useState<"modern" | "harvard-single" | "corporate-pro" | "minimal-clean">("modern");
  const [layoutColumns, setLayoutColumns] = useState<"1-column" | "2-column">("2-column");
  const [accentColor, setAccentColor] = useState<string>("#2563eb");
  const [fontFamily, setFontFamily] = useState<"inter" | "serif" | "mono">("inter");

  // Content Sections Ordering
  const [sectionOrder, setSectionOrder] = useState<string[]>([
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
  ]);

  // Accordion Active Tab
  const [activeSection, setActiveSection] = useState<"personal" | "summary" | "skills" | "experience" | "projects" | "education" | "design">("personal");

  // Form State
  const [name, setName] = useState<string>("Alex Morgan");
  const [title, setTitle] = useState<string>("Senior Software Engineer");
  const [email, setEmail] = useState<string>("alex.morgan@example.com");
  const [phone, setPhone] = useState<string>("+1 (555) 019-2834");
  const [location, setLocation] = useState<string>("San Francisco, CA");
  const [linkedin, setLinkedin] = useState<string>("linkedin.com/in/alex-morgan");
  const [github, setGithub] = useState<string>("github.com/alex-morgan");

  const [summary, setSummary] = useState<string>(
    "Results-oriented Senior Software Engineer with 6+ years of experience building scalable web applications, microservices architecture, and cloud infrastructure. Proven track record in optimizing application performance and leading engineering teams."
  );

  const [skills, setSkills] = useState<string>(
    "Core Programming: JavaScript, TypeScript, Python, Java, SQL\nWeb Frameworks: React, Next.js, Node.js, Express, TailwindCSS\nDevOps & Tools: AWS, Docker, Kubernetes, CI/CD, Git, PostgreSQL"
  );

  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: "1",
      company: "TechCorp Solutions",
      role: "Lead Frontend Engineer",
      duration: "2021 - Present",
      location: "San Francisco, CA",
      bullet1: "Spearheaded frontend architecture overhaul using Next.js & TypeScript, reducing page load times by 45%.",
      bullet2: "Mentored a team of 5 junior engineers and implemented automated CI/CD testing pipelines.",
    },
    {
      id: "2",
      company: "DataStream Systems",
      role: "Software Engineer",
      duration: "2018 - 2021",
      location: "Austin, TX",
      bullet1: "Architected microservices API handling 2M+ daily requests with 99.99% uptime reliability.",
      bullet2: "Reduced cloud hosting costs by 25% through serverless resource optimization.",
    },
  ]);

  const [education, setEducation] = useState<EducationItem[]>([
    {
      id: "1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science: Computer Science",
      duration: "2014 - 2018",
    },
  ]);

  const [projects, setProjects] = useState<string>(
    "CloudStream: Distributed Log Analyzer (2024)\nBuilt a real-time data pipeline processing 100K logs/sec using Python and Apache Kafka.\n\nAI Code Assistant Chrome Extension (2023)\nDeveloped a browser extension powered by LLMs to automate code refactoring."
  );

  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");

  const calculateAtsScore = () => {
    let score = 65;
    if (summary.length > 100) score += 10;
    if (skills.length > 50) score += 10;
    if (experiences.length >= 1) score += 10;
    if (education.length >= 1) score += 4;
    return Math.min(99, score);
  };

  const atsScore = calculateAtsScore();

  const moveSection = (index: number, direction: "up" | "down") => {
    const updated = [...sectionOrder];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;

    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setSectionOrder(updated);
  };

  const handleAddExperience = () => {
    setExperiences((prev) => [
      ...prev,
      { id: Date.now().toString(), company: "", role: "", duration: "", location: "", bullet1: "", bullet2: "" },
    ]);
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const fontClass =
    fontFamily === "serif" ? "font-serif" : fontFamily === "mono" ? "font-mono" : "font-sans";

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-white rounded-2xl border border-zinc-200 shadow-xs transition-all duration-200">
      
      {/* Clean Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200 print:hidden">
        <div>
          <div
            style={{ backgroundColor: "#dbeafe", color: "#1e40af", borderColor: "#bfdbfe" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border mb-3"
          >
            <Sparkles style={{ color: "#2563eb" }} className="w-4 h-4" />
            <span>AI Resume Builder & Editor</span>
          </div>
          <h1 style={{ color: "#0f172a" }} className="text-2xl md:text-3xl font-black tracking-tight font-outfit">
            AI Resume Builder
          </h1>
          <p style={{ color: "#334155" }} className="text-xs md:text-sm font-bold mt-1">
            Create ATS-optimized professional resumes with live preview & section reordering.
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950 text-white text-xs font-bold shadow-xs">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>ATS Score: <span className="text-emerald-400">{atsScore}/100</span></span>
          </div>

          <button
            onClick={() => setMobileView(mobileView === "edit" ? "preview" : "edit")}
            className="md:hidden flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-700 bg-zinc-100 border border-zinc-200 rounded-xl"
          >
            <Eye className="w-4 h-4 text-indigo-600" /> {mobileView === "edit" ? "Preview Paper" : "Edit Data"}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-white" /> Export PDF Resume
          </button>
        </div>
      </div>

      {/* Main 2-Column Studio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Accordion Sections Sidebar */}
        <div className={`md:col-span-5 space-y-4 print:hidden ${mobileView === "preview" ? "hidden md:block" : "block"}`}>
          
          {/* Section Navigation Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-semibold">
            {[
              { id: "personal", label: "Contact", icon: <User className="w-3.5 h-3.5" /> },
              { id: "summary", label: "Summary", icon: <FileText className="w-3.5 h-3.5" /> },
              { id: "skills", label: "Skills", icon: <Wrench className="w-3.5 h-3.5" /> },
              { id: "experience", label: "Experience", icon: <Briefcase className="w-3.5 h-3.5" /> },
              { id: "projects", label: "Projects", icon: <FolderGit2 className="w-3.5 h-3.5" /> },
              { id: "education", label: "Education", icon: <GraduationCap className="w-3.5 h-3.5" /> },
              { id: "design", label: "Design", icon: <Sliders className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] transition-all cursor-pointer ${
                  activeSection === tab.id
                    ? "bg-white text-zinc-950 font-bold shadow-xs border border-zinc-200"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Section Content Accordions */}
          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-medium space-y-4">
            
            {/* 1. Personal & Contact */}
            {activeSection === "personal" && (
              <div className="space-y-3">
                <h3 className="font-bold text-zinc-950 text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" /> Personal & Contact Details
                </h3>
                <div className="space-y-2.5">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full p-2.5 rounded-lg border border-zinc-200 bg-white text-zinc-950 font-bold"
                  />
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Target Job Title"
                    className="w-full p-2.5 rounded-lg border border-zinc-200 bg-white text-zinc-950 font-semibold"
                  />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full p-2.5 rounded-lg border border-zinc-200 bg-white text-zinc-950"
                  />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full p-2.5 rounded-lg border border-zinc-200 bg-white text-zinc-950"
                  />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Country"
                    className="w-full p-2.5 rounded-lg border border-zinc-200 bg-white text-zinc-950"
                  />
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="LinkedIn Profile"
                    className="w-full p-2.5 rounded-lg border border-zinc-200 bg-white text-zinc-950"
                  />
                </div>
              </div>
            )}

            {/* 2. Professional Summary */}
            {activeSection === "summary" && (
              <div className="space-y-3">
                <h3 className="font-bold text-zinc-950 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" /> Professional Summary
                </h3>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={5}
                  className="w-full p-3 rounded-lg border border-zinc-200 bg-white text-zinc-950 leading-relaxed font-sans"
                />
              </div>
            )}

            {/* 3. Technical Skills */}
            {activeSection === "skills" && (
              <div className="space-y-3">
                <h3 className="font-bold text-zinc-950 text-sm flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-blue-600" /> Skills & Technical Categories
                </h3>
                <textarea
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  rows={5}
                  className="w-full p-3 rounded-lg border border-zinc-200 bg-white text-zinc-950 leading-relaxed font-sans"
                />
              </div>
            )}

            {/* 4. Experience */}
            {activeSection === "experience" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-zinc-950 text-sm flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-600" /> Work Experience
                  </h3>
                  <button
                    onClick={handleAddExperience}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 text-white font-semibold text-[11px]"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>

                {experiences.map((exp, idx) => (
                  <div key={exp.id} className="p-3.5 rounded-xl bg-white border border-zinc-200 space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-zinc-950">Role #{idx + 1}</span>
                      <button onClick={() => handleRemoveExperience(exp.id)} className="text-rose-600 hover:underline">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx].role = e.target.value;
                        setExperiences(updated);
                      }}
                      placeholder="Job Title"
                      className="w-full p-2 rounded border border-zinc-200 text-xs font-semibold"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].company = e.target.value;
                          setExperiences(updated);
                        }}
                        placeholder="Company"
                        className="p-2 rounded border border-zinc-200 text-xs"
                      />
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx].duration = e.target.value;
                          setExperiences(updated);
                        }}
                        placeholder="Dates"
                        className="p-2 rounded border border-zinc-200 text-xs"
                      />
                    </div>

                    <input
                      type="text"
                      value={exp.bullet1}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx].bullet1 = e.target.value;
                        setExperiences(updated);
                      }}
                      placeholder="Achievement Bullet 1"
                      className="w-full p-2 rounded border border-zinc-200 text-xs"
                    />

                    <input
                      type="text"
                      value={exp.bullet2}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx].bullet2 = e.target.value;
                        setExperiences(updated);
                      }}
                      placeholder="Achievement Bullet 2"
                      className="w-full p-2 rounded border border-zinc-200 text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 5. Projects */}
            {activeSection === "projects" && (
              <div className="space-y-3">
                <h3 className="font-bold text-zinc-950 text-sm flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-blue-600" /> Projects & Research
                </h3>
                <textarea
                  value={projects}
                  onChange={(e) => setProjects(e.target.value)}
                  rows={5}
                  className="w-full p-3 rounded-lg border border-zinc-200 bg-white text-zinc-950 leading-relaxed font-sans"
                />
              </div>
            )}

            {/* 6. Education */}
            {activeSection === "education" && (
              <div className="space-y-3">
                <h3 className="font-bold text-zinc-950 text-sm flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" /> Education
                </h3>
                {education.map((edu, idx) => (
                  <div key={edu.id} className="p-3 rounded-xl bg-white border border-zinc-200 space-y-2">
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...education];
                        updated[idx].degree = e.target.value;
                        setEducation(updated);
                      }}
                      placeholder="Degree"
                      className="w-full p-2 rounded border border-zinc-200 text-xs font-semibold"
                    />
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...education];
                        updated[idx].institution = e.target.value;
                        setEducation(updated);
                      }}
                      placeholder="University"
                      className="w-full p-2 rounded border border-zinc-200 text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 7. Design & Section Order Controls */}
            {activeSection === "design" && (
              <div className="space-y-4">
                <h3 className="font-bold text-zinc-950 text-sm flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-600" /> Layout & Section Order
                </h3>

                {/* Column Layout */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-700 block text-[11px]">Column Layout:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setLayoutColumns("1-column")}
                      className={`p-2 rounded-lg border text-center font-bold text-xs cursor-pointer ${
                        layoutColumns === "1-column" ? "bg-zinc-950 text-white border-zinc-950" : "bg-white text-zinc-700 border-zinc-200"
                      }`}
                    >
                      1-Column Classic ATS
                    </button>
                    <button
                      onClick={() => setLayoutColumns("2-column")}
                      className={`p-2 rounded-lg border text-center font-bold text-xs cursor-pointer ${
                        layoutColumns === "2-column" ? "bg-zinc-950 text-white border-zinc-950" : "bg-white text-zinc-700 border-zinc-200"
                      }`}
                    >
                      2-Column Split View
                    </button>
                  </div>
                </div>

                {/* Accent Colors */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-700 block text-[11px]">Accent Color:</label>
                  <div className="flex items-center gap-2.5">
                    {[
                      { color: "#2563eb", name: "Royal Blue" },
                      { color: "#0f172a", name: "Slate Black" },
                      { color: "#7c3aed", name: "Violet Purple" },
                      { color: "#059669", name: "Emerald Green" },
                    ].map((c) => (
                      <button
                        key={c.color}
                        onClick={() => setAccentColor(c.color)}
                        style={{ backgroundColor: c.color }}
                        className={`w-6.5 h-6.5 rounded-full transition-transform ${
                          accentColor === c.color ? "scale-115 ring-2 ring-blue-500 ring-offset-2" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Section Reordering */}
                <div className="space-y-2 pt-2 border-t border-zinc-200">
                  <label className="font-semibold text-zinc-700 block text-[11px]">Reorder Section Order:</label>
                  <div className="space-y-1.5">
                    {sectionOrder.map((secKey, idx) => (
                      <div key={secKey} className="flex items-center justify-between p-2 rounded-lg bg-white border border-zinc-200 text-xs">
                        <span className="font-bold text-zinc-800 capitalize">{secKey}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveSection(idx, "up")}
                            disabled={idx === 0}
                            className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 disabled:opacity-30"
                          >
                            <ArrowUp className="w-3 h-3 text-zinc-700" />
                          </button>
                          <button
                            onClick={() => moveSection(idx, "down")}
                            disabled={idx === sectionOrder.length - 1}
                            className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 disabled:opacity-30"
                          >
                            <ArrowDown className="w-3 h-3 text-zinc-700" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Printable A4 Sheet */}
        <div className={`md:col-span-7 ${mobileView === "edit" ? "hidden md:block" : "block"}`}>
          
          <div className={`p-8 md:p-10 bg-white text-zinc-950 border border-zinc-300 rounded-xl space-y-5 leading-relaxed shadow-sm max-w-2xl mx-auto ${fontClass}`}>
            
            {/* Header */}
            <div className="pb-4 border-b border-zinc-200 space-y-1">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase" style={{ color: accentColor }}>
                {name}
              </h1>
              <p className="text-xs font-bold text-zinc-700 uppercase tracking-wide">{title}</p>
              <div className="text-xs text-zinc-600 flex flex-wrap items-center gap-2 pt-1">
                <span>{location}</span>
                {phone && <span>• {phone}</span>}
                {email && <span>• {email}</span>}
                {linkedin && <span>• {linkedin}</span>}
              </div>
            </div>

            {/* Dynamic Section Ordering Render */}
            {sectionOrder.map((sec) => {
              if (sec === "summary" && summary) {
                return (
                  <div key="summary" className="space-y-1">
                    <h2 className="text-xs font-bold uppercase tracking-wider border-b border-zinc-200 pb-1" style={{ color: accentColor }}>
                      Professional Summary
                    </h2>
                    <p className="text-xs text-zinc-800 leading-relaxed pt-0.5">{summary}</p>
                  </div>
                );
              }

              if (sec === "skills" && skills) {
                return (
                  <div key="skills" className="space-y-1">
                    <h2 className="text-xs font-bold uppercase tracking-wider border-b border-zinc-200 pb-1" style={{ color: accentColor }}>
                      Skills & Technical Expertise
                    </h2>
                    <div className="text-xs text-zinc-800 whitespace-pre-line leading-relaxed pt-0.5">
                      {skills}
                    </div>
                  </div>
                );
              }

              if (sec === "experience" && experiences.length > 0) {
                return (
                  <div key="experience" className="space-y-2.5">
                    <h2 className="text-xs font-bold uppercase tracking-wider border-b border-zinc-200 pb-1" style={{ color: accentColor }}>
                      Work Experience
                    </h2>
                    {experiences.map((exp, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between items-baseline text-xs font-bold text-zinc-950">
                          <span>{exp.role} <span className="font-normal text-zinc-600">— {exp.company}</span></span>
                          <span className="text-zinc-600 font-medium text-xs">{exp.duration}</span>
                        </div>
                        {exp.location && <p className="text-[11px] text-zinc-500 italic">{exp.location}</p>}
                        <ul className="list-disc list-inside text-xs text-zinc-800 space-y-0.5 pl-1 pt-0.5">
                          {exp.bullet1 && <li>{exp.bullet1}</li>}
                          {exp.bullet2 && <li>{exp.bullet2}</li>}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              }

              if (sec === "projects" && projects) {
                return (
                  <div key="projects" className="space-y-1">
                    <h2 className="text-xs font-bold uppercase tracking-wider border-b border-zinc-200 pb-1" style={{ color: accentColor }}>
                      Projects & Key Accomplishments
                    </h2>
                    <div className="text-xs text-zinc-800 whitespace-pre-line leading-relaxed pt-0.5">
                      {projects}
                    </div>
                  </div>
                );
              }

              if (sec === "education" && education.length > 0) {
                return (
                  <div key="education" className="space-y-1.5">
                    <h2 className="text-xs font-bold uppercase tracking-wider border-b border-zinc-200 pb-1" style={{ color: accentColor }}>
                      Education
                    </h2>
                    {education.map((edu, i) => (
                      <div key={i} className="flex justify-between items-baseline text-xs">
                        <div>
                          <span className="font-bold text-zinc-950">{edu.degree}</span>
                          <span className="text-zinc-600 block text-xs">{edu.institution}</span>
                        </div>
                        <span className="text-zinc-600 font-medium text-xs">{edu.duration}</span>
                      </div>
                    ))}
                  </div>
                );
              }

              return null;
            })}

          </div>
        </div>

      </div>
    </div>
  );
}
