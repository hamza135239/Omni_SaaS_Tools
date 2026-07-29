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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 mb-2">
            <Layers className="w-3.5 h-3.5 text-rose-600" /> Free PDF Tool
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-950 tracking-tight">
            PDF Merge & Splitter
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 mt-1">
            Combine multiple PDF files into one single document with custom page reordering.
          </p>
        </div>

        {pdfFiles.length > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-xl transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-zinc-600" /> Start Fresh
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
            className="relative border-2 border-dashed border-zinc-200 hover:border-rose-500 rounded-2xl p-8 text-center cursor-pointer bg-zinc-50/50 hover:bg-rose-50/30 transition-all group overflow-hidden"
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

            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-zinc-900 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
              <Upload className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-base font-bold text-zinc-950 mb-1">
              Drag & Drop PDF files here, or <span className="text-rose-600 underline">Add Files</span>
            </h3>

            <p className="text-xs text-zinc-500">
              Upload 2 or more PDF documents. Free & private.
            </p>
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
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Merging PDF Documents...
              </>
            ) : (
              <>
                <Layers className="w-4 h-4" /> Merge PDFs Now
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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs"
            >
              <Download className="w-4 h-4" /> Download Merged PDF
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
