"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, RefreshCw, Layers, ArrowUp, ArrowDown, Trash2 } from "lucide-react";

export function PdfMergeTool() {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesUpload = (filesList: FileList | File[]) => {
    const validPdfs = Array.from(filesList).filter(
      (f) => f.type.includes("pdf") || f.name.endsWith(".pdf")
    );

    if (validPdfs.length === 0) {
      setError("Please upload valid PDF files (.pdf).");
      return;
    }

    setError(null);
    setPdfFiles((prev) => [...prev, ...validPdfs]);
  };

  const movePdf = (index: number, direction: "up" | "down") => {
    const updated = [...pdfFiles];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;

    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setPdfFiles(updated);
  };

  const removePdf = (index: number) => {
    setPdfFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMergePdfs = async () => {
    if (pdfFiles.length < 2) {
      setError("Please upload at least 2 PDF files to merge.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const mergedPdfDoc = await PDFDocument.create();

      for (const file of pdfFiles) {
        const buffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer);
        const copiedPages = await mergedPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdfDoc.addPage(page));
      }

      const mergedPdfBytes = await mergedPdfDoc.save();
      const blob = new Blob([mergedPdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (err) {
      setError("Error merging PDF documents. Please ensure files are not encrypted.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPdfFiles([]);
    setMergedPdfUrl(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-2xl border border-zinc-200 shadow-xs transition-all duration-200">
      
      {/* Clean Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <div
            style={{ backgroundColor: "#ffe4e6", color: "#9f1239", borderColor: "#fecdd3" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border mb-3"
          >
            <Layers style={{ color: "#e11d48" }} className="w-4 h-4" />
            <span>Free PDF Tool</span>
          </div>
          <h1 style={{ color: "#0f172a" }} className="text-2xl md:text-3xl font-black tracking-tight font-outfit">
            PDF Merge Online
          </h1>
          <p style={{ color: "#334155" }} className="text-xs md:text-sm font-bold mt-1">
            Combine multiple PDF files into one single document with custom page reordering.
          </p>
        </div>

        {pdfFiles.length > 0 && (
          <button
            onClick={handleReset}
            style={{ backgroundColor: "#f1f5f9", color: "#0f172a", borderColor: "#cbd5e1" }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-black border rounded-xl transition-all cursor-pointer hover:bg-slate-200"
          >
            <RefreshCw style={{ color: "#0f172a" }} className="w-4 h-4" />
            <span>Start Fresh</span>
          </button>
        )}
      </div>

      {!mergedPdfUrl ? (
        <div className="space-y-6">
          
          {/* Upload Dropzone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const files = e.dataTransfer.files;
              if (files) handleFilesUpload(files);
            }}
            onClick={() => fileInputRef.current?.click()}
            style={{ backgroundColor: "#f8fafc", borderColor: "#cbd5e1" }}
            className="relative border-2 border-dashed rounded-2xl p-10 md:p-14 text-center cursor-pointer transition-all"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                const files = e.target.files;
                if (files) handleFilesUpload(files);
              }}
              accept="application/pdf"
              multiple
              className="hidden"
            />

            <div
              style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
              className="w-full max-w-md mx-auto mb-5 py-4 rounded-2xl flex items-center justify-center shadow-md"
            >
              <Upload style={{ color: "#ffffff" }} className="w-6 h-6 stroke-[2.5]" />
            </div>

            <h3 style={{ color: "#0f172a" }} className="text-xl md:text-2xl font-black mb-1 font-outfit">
              Drag & Drop PDF files here, or <span style={{ color: "#e11d48" }} className="underline font-black">Choose Files</span>
            </h3>

            <p style={{ color: "#475569" }} className="text-xs max-w-md mx-auto font-bold mb-6">
              Upload 2 or more PDF documents. Free & private.
            </p>

            <button
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              type="button"
              style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
              className="w-full max-w-md mx-auto py-4 rounded-2xl font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-slate-900"
            >
              <Upload style={{ color: "#ffffff" }} className="w-5 h-5" />
              <span style={{ color: "#ffffff" }}>Choose PDF Files</span>
            </button>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Uploaded PDF Items Sequence */}
          {pdfFiles.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                PDF Sequence Order ({pdfFiles.length} files selected):
              </h3>
              {pdfFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-4 text-xs font-medium"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-zinc-900 text-white font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-zinc-950">{file.name}</h4>
                      <p className="text-zinc-500 text-[11px]">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => movePdf(idx, "up")}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 disabled:opacity-30 hover:bg-zinc-100"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => movePdf(idx, "down")}
                      disabled={idx === pdfFiles.length - 1}
                      className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 disabled:opacity-30 hover:bg-zinc-100"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removePdf(idx)}
                      className="p-1.5 rounded-lg bg-white border border-zinc-200 text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleMergePdfs}
            disabled={loading || pdfFiles.length < 2}
            style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-50 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw style={{ color: "#ffffff" }} className="w-4 h-4 animate-spin" />
                <span style={{ color: "#ffffff" }}>Merging PDF Documents...</span>
              </>
            ) : (
              <>
                <Layers style={{ color: "#ffffff" }} className="w-4 h-4" />
                <span style={{ color: "#ffffff" }}>Merge PDFs Now</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* Merged PDF Result */
        <div className="space-y-6 text-center">
          <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-zinc-950">PDF Documents Successfully Merged!</h2>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Your single combined PDF is ready to download.
            </p>
            <a
              href={mergedPdfUrl}
              download="merged-document.pdf"
              style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 shadow-xs"
            >
              <Download style={{ color: "#ffffff" }} className="w-4 h-4" />
              <span style={{ color: "#ffffff" }}>Download Merged PDF</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
