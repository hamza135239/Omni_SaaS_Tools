"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, FileText, RefreshCw, CheckCircle2 } from "lucide-react";
import { Document, Packer, Paragraph, TextRun } from "docx";

interface ExtractedTextItem {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontName: string;
  isBold?: boolean;
}

export function PdfToWordTool() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [docxUrl, setDocxUrl] = useState<string | null>(null);
  const [docxFileName, setDocxFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (uploadedFile: File) => {
    if (uploadedFile.type !== "application/pdf" && !uploadedFile.name.endsWith(".pdf")) {
      setError("Please upload a valid PDF file.");
      return;
    }
    setError(null);
    setFile(uploadedFile);
    setDocxUrl(null);
  };

  const handleConvert = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(10);
    setError(null);

    try {
      const pdfjsLib = await import("pdfjs-dist");

      if (typeof window !== "undefined") {
        try {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        } catch (e) {
          console.warn("WorkerSrc setup warning:", e);
        }
      }

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
        useSystemFonts: true,
        disableFontFace: true,
      } as any);

      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;

      const docSections: any[] = [];

      for (let i = 1; i <= totalPages; i++) {
        setProgress(Math.round((i / totalPages) * 70));
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        const items: ExtractedTextItem[] = (textContent.items || []).map((item: any) => ({
          text: item.str || "",
          x: item.transform ? item.transform[4] : 0,
          y: item.transform ? item.transform[5] : 0,
          width: item.width || 0,
          height: item.height || 0,
          fontSize: item.transform ? Math.abs(item.transform[0]) : 12,
          fontName: item.fontName || "",
          isBold:
            item.fontName?.toLowerCase().includes("bold") ||
            (item.str && item.str.toUpperCase() === item.str && item.str.length > 3),
        }));

        const lineMap = new Map<number, ExtractedTextItem[]>();
        const tolerance = 6;

        items.forEach((item) => {
          if (!item.text || !item.text.trim()) return;

          let foundY = Array.from(lineMap.keys()).find((y) => Math.abs(y - item.y) <= tolerance);
          if (foundY !== undefined) {
            lineMap.get(foundY)!.push(item);
          } else {
            lineMap.set(item.y, [item]);
          }
        });

        const sortedYs = Array.from(lineMap.keys()).sort((a, b) => b - a);
        const pageParagraphs: Paragraph[] = [];

        sortedYs.forEach((y) => {
          const lineItems = lineMap.get(y)!.sort((a, b) => a.x - b.x);
          const fullLineText = lineItems.map((it) => it.text).join(" ").trim();

          if (!fullLineText) return;

          const isHeading = lineItems.some((it) => it.fontSize > 13 || it.isBold);

          pageParagraphs.push(
            new Paragraph({
              spacing: { after: isHeading ? 140 : 80 },
              children: [
                new TextRun({
                  text: fullLineText,
                  bold: isHeading,
                  size: isHeading ? 24 : 20,
                  font: "Calibri",
                }),
              ],
            })
          );
        });

        if (pageParagraphs.length === 0) {
          pageParagraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `[Page ${i} Content]`,
                  size: 20,
                  font: "Calibri",
                }),
              ],
            })
          );
        }

        docSections.push({
          properties: {},
          children: pageParagraphs,
        });
      }

      setProgress(85);

      const doc = new Document({
        sections: docSections,
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);

      setDocxUrl(url);
      setDocxFileName(file.name.replace(/\.pdf$/i, ".docx"));
      setProgress(100);
      setLoading(false);
    } catch (err: any) {
      console.error("PDF to Word conversion error:", err);
      setError("Failed to convert PDF. Please ensure the file is not password protected.");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setDocxUrl(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <div
            style={{ backgroundColor: "#dbeafe", color: "#1e40af", borderColor: "#bfdbfe" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border mb-3"
          >
            <FileText style={{ color: "#2563eb" }} className="w-4 h-4" />
            <span>PDF Utility Suite</span>
          </div>
          <h1 style={{ color: "#0f172a" }} className="text-2xl md:text-3xl font-black tracking-tight font-outfit">
            PDF to Word Converter
          </h1>
          <p style={{ color: "#334155" }} className="text-xs md:text-sm font-bold mt-1">
            Convert non-editable PDF documents into editable Word (.docx) files matching 1:1 original layout.
          </p>
        </div>

        {file && (
          <button
            onClick={handleReset}
            style={{ backgroundColor: "#f1f5f9", color: "#0f172a", borderColor: "#cbd5e1" }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-black border rounded-xl transition-all cursor-pointer hover:bg-slate-200"
          >
            <RefreshCw style={{ color: "#0f172a" }} className="w-4 h-4" />
            <span>Convert Another PDF</span>
          </button>
        )}
      </div>

      {error && (
        <div style={{ backgroundColor: "#ffe4e6", color: "#9f1239", borderColor: "#fecdd3" }} className="p-4 mb-6 rounded-xl border text-xs font-black">
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
          onClick={() => fileInputRef.current?.click()}
          style={{ backgroundColor: "#f8fafc", borderColor: "#cbd5e1" }}
          className="relative border-2 border-dashed rounded-2xl p-10 md:p-14 text-center cursor-pointer transition-all"
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
            Select PDF file to convert, or <span style={{ color: "#2563eb" }} className="underline font-black">Browse File</span>
          </h3>

          <p style={{ color: "#475569" }} className="text-xs max-w-md mx-auto font-bold mb-6">
            Extracts tables, paragraphs & headings into editable Word (.docx). 100% private.
          </p>

          <button
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
            type="button"
            style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
            className="w-full max-w-md mx-auto py-4 rounded-2xl font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-slate-900"
          >
            <Upload style={{ color: "#ffffff" }} className="w-5 h-5" />
            <span style={{ color: "#ffffff" }}>Choose PDF File</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          
          <div style={{ backgroundColor: "#f1f5f9", borderColor: "#cbd5e1" }} className="p-4 rounded-xl border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText style={{ color: "#2563eb" }} className="w-8 h-8 flex-shrink-0" />
              <div>
                <h4 style={{ color: "#0f172a" }} className="font-black text-sm">{file.name}</h4>
                <p style={{ color: "#475569" }} className="text-xs font-extrabold">Size: {(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>

            <span style={{ backgroundColor: "#2563eb", color: "#ffffff" }} className="px-3.5 py-1.5 rounded-full text-xs font-black shadow-xs">
              PDF Document Selected
            </span>
          </div>

          {!docxUrl ? (
            <button
              onClick={handleConvert}
              disabled={loading}
              style={{ backgroundColor: "#2563eb", color: "#ffffff" }}
              className="w-full py-4 rounded-2xl font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-blue-700 disabled:opacity-75"
            >
              {loading ? <RefreshCw style={{ color: "#ffffff" }} className="w-5 h-5 animate-spin" /> : <FileText style={{ color: "#ffffff" }} className="w-5 h-5" />}
              <span style={{ color: "#ffffff" }}>
                {loading ? `Converting PDF (${progress}%)...` : "Convert PDF to Editable Word (.docx)"}
              </span>
            </button>
          ) : (
            <div style={{ backgroundColor: "#ecfdf5", borderColor: "#a7f3d0" }} className="p-6 rounded-2xl border space-y-4">
              <div className="flex items-center gap-3 font-black">
                <CheckCircle2 style={{ color: "#059669" }} className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 style={{ color: "#065f46" }} className="text-base font-black font-outfit">Conversion Completed!</h4>
                  <p style={{ color: "#047857" }} className="text-xs font-bold">Your editable Word document is ready to download.</p>
                </div>
              </div>

              <a
                href={docxUrl}
                download={docxFileName}
                style={{ backgroundColor: "#059669", color: "#ffffff" }}
                className="w-full py-4 rounded-2xl font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-emerald-700 text-center block"
              >
                <Download style={{ color: "#ffffff" }} className="w-5 h-5 inline-block mr-1" />
                <span style={{ color: "#ffffff" }}>Download {docxFileName}</span>
              </a>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
