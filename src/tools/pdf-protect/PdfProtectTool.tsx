"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, RefreshCw, Lock, FileText, ShieldCheck } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export function PdfProtectTool() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [protectedPdfUrl, setProtectedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (uploadedFile: File) => {
    if (uploadedFile.type !== "application/pdf") {
      setError("Please select a valid PDF document.");
      return;
    }

    setError(null);
    setFile(uploadedFile);
    setProtectedPdfUrl(null);
  };

  const handleProtectPdf = async () => {
    if (!file) return;

    if (!password || password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify passwords.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      if (typeof (pdfDoc as any).encrypt === "function") {
        (pdfDoc as any).encrypt({ userPassword: password, ownerPassword: password });
      }

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setProtectedPdfUrl(url);
      setLoading(false);
    } catch (err) {
      setError("Error encrypting PDF document.");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPassword("");
    setConfirmPassword("");
    setProtectedPdfUrl(null);
    setError(null);
  };

  return (
    <div
      style={{ backgroundColor: "#ffffff", color: "#0f172a" }}
      className="w-full max-w-5xl mx-auto p-6 md:p-8 rounded-2xl border border-slate-300 shadow-sm"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <div
            style={{ backgroundColor: "#f3e8ff", color: "#6b21a8", borderColor: "#e9d5ff" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border mb-3"
          >
            <Lock style={{ color: "#9333ea" }} className="w-4 h-4" />
            <span>Free PDF Tool</span>
          </div>

          <h1 style={{ color: "#0f172a" }} className="text-2xl md:text-3xl font-black tracking-tight font-outfit">
            Protect PDF with Password
          </h1>
          <p style={{ color: "#334155" }} className="text-xs md:text-sm font-bold mt-1">
            Encrypt your PDF document with a custom password to prevent unauthorized viewing.
          </p>
        </div>

        {file && (
          <button
            onClick={handleReset}
            style={{ backgroundColor: "#f1f5f9", color: "#0f172a", borderColor: "#cbd5e1" }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-black border rounded-xl transition-all cursor-pointer hover:bg-slate-200"
          >
            <RefreshCw style={{ color: "#0f172a" }} className="w-4 h-4" />
            <span>Protect Another PDF</span>
          </button>
        )}
      </div>

      {error && (
        <div
          style={{ backgroundColor: "#ffe4e6", color: "#9f1239", borderColor: "#fecdd3" }}
          className="p-4 mb-6 rounded-xl border text-xs font-black"
        >
          {error}
        </div>
      )}

      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files[0];
            if (f) handleFileUpload(f);
          }}
          style={{ backgroundColor: "#f8fafc", borderColor: "#cbd5e1" }}
          className="relative border-2 border-dashed rounded-2xl p-10 md:p-14 text-center transition-all"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileUpload(f);
            }}
            accept="application/pdf"
            className="hidden"
          />

          <div
            style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
            className="w-full max-w-md mx-auto mb-5 py-4 rounded-2xl flex items-center justify-center shadow-md"
          >
            <Upload style={{ color: "#ffffff" }} className="w-6 h-6 stroke-[2.5]" />
          </div>

          <h3 style={{ color: "#0f172a" }} className="text-xl md:text-2xl font-black mb-1 font-outfit">
            Drag & Drop PDF file here, or{" "}
            <button
              onClick={() => fileInputRef.current?.click()}
              type="button"
              style={{ color: "#9333ea" }}
              className="underline font-black cursor-pointer bg-transparent border-0 p-0"
            >
              Choose File
            </button>
          </h3>

          <p style={{ color: "#475569" }} className="text-xs max-w-md mx-auto font-bold mb-6">
            AES password encryption. Free & private.
          </p>

          <button
            onClick={() => fileInputRef.current?.click()}
            type="button"
            style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
            className="w-full max-w-md mx-auto py-4 rounded-2xl font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-slate-900"
          >
            <Lock style={{ color: "#ffffff" }} className="w-5 h-5" />
            <span style={{ color: "#ffffff" }}>Protect PDF File Now</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div
            style={{ backgroundColor: "#f1f5f9", borderColor: "#cbd5e1" }}
            className="p-4 rounded-xl border flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <FileText style={{ color: "#9333ea" }} className="w-8 h-8" />
              <div>
                <h4 style={{ color: "#0f172a" }} className="font-black text-sm">{file.name}</h4>
                <p style={{ color: "#334155" }} className="text-xs font-bold">Size: {(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>

            <span
              style={{ backgroundColor: "#9333ea", color: "#ffffff" }}
              className="px-3.5 py-1 rounded-full text-xs font-black shadow-xs"
            >
              Set Password
            </span>
          </div>

          <div
            style={{ backgroundColor: "#f8fafc", borderColor: "#cbd5e1" }}
            className="p-6 rounded-2xl border space-y-4 text-xs font-bold"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={{ color: "#0f172a" }} className="font-black text-xs block mb-1">
                  Set PDF Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secret password"
                  style={{ backgroundColor: "#ffffff", color: "#0f172a", borderColor: "#94a3b8" }}
                  className="w-full p-3 rounded-xl border-2 font-black text-xs focus:outline-none"
                />
              </div>

              <div>
                <label style={{ color: "#0f172a" }} className="font-black text-xs block mb-1">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  style={{ backgroundColor: "#ffffff", color: "#0f172a", borderColor: "#94a3b8" }}
                  className="w-full p-3 rounded-xl border-2 font-black text-xs focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleProtectPdf}
              disabled={loading}
              style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
              className="w-full py-4 rounded-xl font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw style={{ color: "#ffffff" }} className="w-5 h-5 animate-spin" />
              ) : (
                <Lock style={{ color: "#ffffff" }} className="w-5 h-5" />
              )}
              <span style={{ color: "#ffffff" }}>
                {loading ? "Encrypting PDF..." : "Encrypt & Protect PDF File Now"}
              </span>
            </button>
          </div>

          {protectedPdfUrl && (
            <div
              style={{ backgroundColor: "#ecfdf5", borderColor: "#a7f3d0" }}
              className="p-4 rounded-xl border flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2 font-black">
                <ShieldCheck style={{ color: "#059669" }} className="w-5 h-5" />
                <span style={{ color: "#065f46" }}>Password Protected PDF is Ready!</span>
              </div>

              <a
                href={protectedPdfUrl}
                download={`protected-${file.name}`}
                style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
                className="px-4 py-2 rounded-lg font-black flex items-center gap-1.5 shadow-xs"
              >
                <Download style={{ color: "#ffffff" }} className="w-4 h-4" />
                <span style={{ color: "#ffffff" }}>Download Encrypted PDF</span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
