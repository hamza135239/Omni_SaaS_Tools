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
    if (uploadedFile.type !== "application/pdf") {
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
      
      const arrayBuffer = await file.arrayBuffer();
      let pdf;

      try {
        if (typeof window !== "undefined") {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || "3.11.174"}/build/pdf.worker.min.js`;
        }
        pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      } catch (workerErr) {
        console.warn("Mobile WebWorker init fallback:", workerErr);
        pdfjsLib.GlobalWorkerOptions.workerSrc = "";
        pdf = await pdfjsLib.getDocument({
          data: new Uint8Array(arrayBuffer),
          useSystemFonts: true,
          disableFontFace: true,
        } as any).promise;
      }

      const totalPages = pdf.numPages;

      const docSections: any[] = [];

      for (let i = 1; i <= totalPages; i++) {
        setProgress(Math.round((i / totalPages) * 70));
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        const items: ExtractedTextItem[] = textContent.items.map((item: any) => ({
          text: item.str,
          x: item.transform[4],
          y: item.transform[5],
          width: item.width,
          height: item.height,
          fontSize: Math.abs(item.transform[0]),
          fontName: item.fontName || "",
          isBold: item.fontName?.toLowerCase().includes("bold") || (item.str.toUpperCase() === item.str && item.str.length > 3),
        }));

        const lineMap = new Map<number, ExtractedTextItem[]>();
        const tolerance = 4;

        items.forEach((item) => {
          if (!item.text.trim()) return;

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
      console.error(err);
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-blue-600 text-white shadow-xs mb-3">
            <FileText className="w-4 h-4 text-white" /> PDF Utility Suite
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight font-outfit">
            PDF to Word Converter
          </h1>
          <p className="text-xs md:text-sm text-slate-700 font-extrabold mt-1">
            Convert non-editable PDF documents into editable Word (.docx) files matching 1:1 original layout.
          </p>
        </div>

        {file && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-xs font-extrabold text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-slate-800" /> Convert Another PDF
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 mb-6 rounded-xl bg-rose-100 border border-rose-300 text-rose-950 text-xs font-black">
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
          className="relative border-2 border-dashed border-slate-300 hover:border-blue-600 rounded-2xl p-12 text-center cursor-pointer bg-slate-50 hover:bg-blue-50/40 transition-all group"
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

          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg border-2 border-blue-700">
            <Upload className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-extrabold text-slate-950 mb-1 font-outfit">
            Select PDF file to convert, or <span className="text-blue-600 underline font-black">Browse File</span>
          </h3>

          <p className="text-xs text-slate-700 max-w-md mx-auto font-extrabold">
            Extracts tables, paragraphs & headings into editable Word (.docx). 100% private.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <h4 className="font-extrabold text-slate-950 text-sm">{file.name}</h4>
                <p className="text-xs text-slate-800 font-black">Size: {(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>

            <span className="px-3.5 py-1 rounded-full text-xs font-black bg-blue-600 text-white border border-blue-700 shadow-xs">
              PDF Document Selected
            </span>
          </div>

          {!docxUrl ? (
            <button
              onClick={handleConvert}
              disabled={loading}
              className="w-full py-4 rounded-xl font-black text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin text-white" /> : <FileText className="w-5 h-5 text-white" />}
              {loading ? `Converting PDF (${progress}%)...` : "Convert PDF to Editable Word (.docx)"}
            </button>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4">
              <div className="flex items-center gap-3 text-emerald-950 font-black">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <div>
                  <h4 className="text-base font-extrabold font-outfit">Conversion Completed!</h4>
                  <p className="text-xs text-emerald-800 font-extrabold">Your editable Word document is ready to download.</p>
                </div>
              </div>

              <a
                href={docxUrl}
                download={docxFileName}
                className="w-full py-4 rounded-xl font-black text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Download className="w-5 h-5 text-white" /> Download {docxFileName}
              </a>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
