"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, RefreshCw, Layers, FileText } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export function PdfSplitTool() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [splitMode, setSplitMode] = useState<"all" | "range">("all");
  const [fromPage, setFromPage] = useState<number>(1);
  const [toPage, setToPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [splitPdfUrls, setSplitPdfUrls] = useState<{ name: string; url: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (uploadedFile: File) => {
    if (uploadedFile.type !== "application/pdf") {
      setError("Please select a valid PDF document.");
      return;
    }

    try {
      setError(null);
      setFile(uploadedFile);
      setSplitPdfUrls([]);

      const arrayBuffer = await uploadedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const count = pdfDoc.getPageCount();

      setNumPages(count);
      setFromPage(1);
      setToPage(count);
    } catch (err) {
      setError("Failed to parse PDF file. The file may be password protected or corrupted.");
    }
  };

  const handleSplitPdf = async () => {
    if (!file || numPages === 0) return;

    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(arrayBuffer);
      const outputUrls: { name: string; url: string }[] = [];

      if (splitMode === "all") {
        for (let i = 0; i < numPages; i++) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(srcDoc, [i]);
          newPdf.addPage(copiedPage);

          const pdfBytes = await newPdf.save();
          const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);

          outputUrls.push({
            name: `${file.name.replace(".pdf", "")}-page-${i + 1}.pdf`,
            url,
          });
        }
      } else {
        const start = Math.max(1, Math.min(fromPage, numPages)) - 1;
        const end = Math.min(numPages, Math.max(fromPage, toPage)) - 1;

        const newPdf = await PDFDocument.create();
        const pageIndices = [];
        for (let i = start; i <= end; i++) pageIndices.push(i);

        const copiedPages = await newPdf.copyPages(srcDoc, pageIndices);
        copiedPages.forEach((p) => newPdf.addPage(p));

        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        outputUrls.push({
          name: `${file.name.replace(".pdf", "")}-pages-${start + 1}-to-${end + 1}.pdf`,
          url,
        });
      }

      setSplitPdfUrls(outputUrls);
      setLoading(false);
    } catch (err) {
      setError("Error splitting PDF document.");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setNumPages(0);
    setSplitPdfUrls([]);
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
          {/* Top Pill Badge with explicit inline colors */}
          <div
            style={{ backgroundColor: "#ffe4e6", color: "#9f1239", borderColor: "#fecdd3" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border mb-3"
          >
            <Layers style={{ color: "#e11d48" }} className="w-4 h-4" />
            <span>Free PDF Tool</span>
          </div>

          <h1 style={{ color: "#0f172a" }} className="text-2xl md:text-3xl font-black tracking-tight font-outfit">
            Split PDF Pages Online
          </h1>
          <p style={{ color: "#334155" }} className="text-xs md:text-sm font-bold mt-1">
            Separate single pages or extract custom page ranges into clean PDF documents.
          </p>
        </div>

        {file && (
          <button
            onClick={handleReset}
            style={{ backgroundColor: "#f1f5f9", color: "#0f172a", borderColor: "#cbd5e1" }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-black border rounded-xl transition-all cursor-pointer hover:bg-slate-200"
          >
            <RefreshCw style={{ color: "#0f172a" }} className="w-4 h-4" />
            <span>Split Another PDF</span>
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

          {/* Central Black Icon Bar - Matching Image 2 with explicit inline colors */}
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
              style={{ color: "#e11d48" }}
              className="underline font-black cursor-pointer bg-transparent border-0 p-0"
            >
              Choose File
            </button>
          </h3>

          <p style={{ color: "#475569" }} className="text-xs max-w-md mx-auto font-bold mb-6">
            Extract single pages or custom ranges. Free & private.
          </p>

          {/* Black CTA Button - Matching Image 2 with explicit inline colors */}
          <button
            onClick={() => fileInputRef.current?.click()}
            type="button"
            style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
            className="w-full max-w-md mx-auto py-4 rounded-2xl font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-slate-900"
          >
            <Layers style={{ color: "#ffffff" }} className="w-5 h-5" />
            <span style={{ color: "#ffffff" }}>Split PDF File Now</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div
            style={{ backgroundColor: "#f1f5f9", borderColor: "#cbd5e1" }}
            className="p-4 rounded-xl border flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <FileText style={{ color: "#e11d48" }} className="w-8 h-8" />
              <div>
                <h4 style={{ color: "#0f172a" }} className="font-black text-sm">{file.name}</h4>
                <p style={{ color: "#334155" }} className="text-xs font-bold">Total Pages: {numPages} Pages</p>
              </div>
            </div>

            <span
              style={{ backgroundColor: "#059669", color: "#ffffff" }}
              className="px-3.5 py-1 rounded-full text-xs font-black shadow-xs"
            >
              Ready to Split
            </span>
          </div>

          <div
            style={{ backgroundColor: "#f8fafc", borderColor: "#cbd5e1" }}
            className="p-6 rounded-2xl border space-y-5 text-xs font-bold"
          >
            <label style={{ color: "#0f172a" }} className="font-black text-sm block">
              Choose Split Method:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setSplitMode("all")}
                style={
                  splitMode === "all"
                    ? { backgroundColor: "#0f172a", color: "#ffffff", borderColor: "#0f172a" }
                    : { backgroundColor: "#ffffff", color: "#0f172a", borderColor: "#cbd5e1" }
                }
                className="p-4 rounded-xl border-2 text-center font-black transition-all cursor-pointer"
              >
                Extract Every Single Page ({numPages} Files)
              </button>

              <button
                onClick={() => setSplitMode("range")}
                style={
                  splitMode === "range"
                    ? { backgroundColor: "#0f172a", color: "#ffffff", borderColor: "#0f172a" }
                    : { backgroundColor: "#ffffff", color: "#0f172a", borderColor: "#cbd5e1" }
                }
                className="p-4 rounded-xl border-2 text-center font-black transition-all cursor-pointer"
              >
                Extract Custom Page Range
              </button>
            </div>

            {splitMode === "range" && (
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div>
                  <label style={{ color: "#0f172a" }} className="font-black text-xs block mb-1">
                    From Page:
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={numPages}
                    value={fromPage}
                    onChange={(e) => setFromPage(Number(e.target.value))}
                    style={{ backgroundColor: "#ffffff", color: "#0f172a", borderColor: "#94a3b8" }}
                    className="p-3 rounded-xl border-2 font-black text-center w-28 text-sm focus:outline-none"
                  />
                </div>

                <span style={{ color: "#0f172a" }} className="font-black text-sm mt-5">
                  to
                </span>

                <div>
                  <label style={{ color: "#0f172a" }} className="font-black text-xs block mb-1">
                    To Page:
                  </label>
                  <input
                    type="number"
                    min={fromPage}
                    max={numPages}
                    value={toPage}
                    onChange={(e) => setToPage(Number(e.target.value))}
                    style={{ backgroundColor: "#ffffff", color: "#0f172a", borderColor: "#94a3b8" }}
                    className="p-3 rounded-xl border-2 font-black text-center w-28 text-sm focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Split Action Button */}
            <button
              onClick={handleSplitPdf}
              disabled={loading}
              style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
              className="w-full py-4 rounded-xl font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw style={{ color: "#ffffff" }} className="w-5 h-5 animate-spin" />
              ) : (
                <Layers style={{ color: "#ffffff" }} className="w-5 h-5" />
              )}
              <span style={{ color: "#ffffff" }}>{loading ? "Splitting PDF..." : "Split PDF Document Now"}</span>
            </button>
          </div>

          {splitPdfUrls.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h3 style={{ color: "#0f172a" }} className="font-black text-sm font-outfit">
                Split PDF Output Files:
              </h3>
              <div className="space-y-2">
                {splitPdfUrls.map((item, idx) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: "#f8fafc", borderColor: "#cbd5e1" }}
                    className="p-3.5 rounded-xl border flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 font-black">
                      <FileText style={{ color: "#e11d48" }} className="w-4 h-4" />
                      <span style={{ color: "#0f172a" }}>{item.name}</span>
                    </div>

                    <a
                      href={item.url}
                      download={item.name}
                      style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
                      className="px-4 py-2 rounded-lg font-black flex items-center gap-1.5 shadow-xs"
                    >
                      <Download style={{ color: "#ffffff" }} className="w-4 h-4" />
                      <span style={{ color: "#ffffff" }}>Download Page</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
