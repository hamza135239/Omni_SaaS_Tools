"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, FileText, RefreshCw, CheckCircle2 } from "lucide-react";
import mammoth from "mammoth";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export function WordToPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (uploadedFile: File) => {
    const isDocx =
      uploadedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      uploadedFile.name.endsWith(".docx");

    if (!isDocx) {
      setError("Please upload a valid Word document (.docx).");
      return;
    }
    setError(null);
    setFile(uploadedFile);
    setPdfUrl(null);
  };

  const handleConvert = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const rawText = result.value || "Converted Word Document";

      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      const fontSize = 11;
      const margin = 40;
      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const maxLineWidth = pageWidth - margin * 2;

      let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      let cursorY = pageHeight - margin;

      const paragraphs = rawText.split("\n");

      for (const para of paragraphs) {
        if (!para.trim()) {
          cursorY -= fontSize * 1.5;
          continue;
        }

        const words = para.split(" ");
        let currentLine = "";

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const textWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (textWidth > maxLineWidth) {
            if (cursorY - fontSize < margin) {
              currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
              cursorY = pageHeight - margin;
            }
            currentPage.drawText(currentLine, {
              x: margin,
              y: cursorY,
              size: fontSize,
              font,
              color: rgb(0.1, 0.1, 0.1),
            });
            cursorY -= fontSize * 1.4;
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine) {
          if (cursorY - fontSize < margin) {
            currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            cursorY = pageHeight - margin;
          }
          currentPage.drawText(currentLine, {
            x: margin,
            y: cursorY,
            size: fontSize,
            font,
            color: rgb(0.1, 0.1, 0.1),
          });
          cursorY -= fontSize * 1.6;
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setPdfUrl(url);
      setPdfFileName(file.name.replace(/\.docx$/i, ".pdf"));
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError("Failed to convert Word document to PDF.");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPdfUrl(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-indigo-600 text-white shadow-xs mb-3">
            <FileText className="w-4 h-4 text-white" /> PDF Utility Suite
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight font-outfit">
            Word to PDF Converter
          </h1>
          <p className="text-xs md:text-sm text-slate-700 font-extrabold mt-1">
            Convert Microsoft Word (.docx) files into clean PDF documents instantly.
          </p>
        </div>

        {file && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-xs font-extrabold text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-slate-800" /> Convert Another File
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
          className="relative border-2 border-dashed border-slate-300 hover:border-indigo-600 rounded-2xl p-12 text-center cursor-pointer bg-slate-50 hover:bg-indigo-50/40 transition-all group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileUpload(f);
            }}
            accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
          />

          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg border-2 border-indigo-700">
            <Upload className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-extrabold text-slate-950 mb-1 font-outfit">
            Select Word (.docx) file, or <span className="text-indigo-600 underline font-black">Browse File</span>
          </h3>

          <p className="text-xs text-slate-700 max-w-md mx-auto font-extrabold">
            Convert Microsoft Word documents into PDF. 100% private browser processing.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-indigo-600" />
              <div>
                <h4 className="font-extrabold text-slate-950 text-sm">{file.name}</h4>
                <p className="text-xs text-slate-800 font-black">Size: {(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>

            <span className="px-3.5 py-1 rounded-full text-xs font-black bg-indigo-600 text-white border border-indigo-700 shadow-xs">
              Word Document Ready
            </span>
          </div>

          {!pdfUrl ? (
            <button
              onClick={handleConvert}
              disabled={loading}
              className="w-full py-4 rounded-xl font-black text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin text-white" /> : <FileText className="w-5 h-5 text-white" />}
              {loading ? "Converting DOCX to PDF..." : "Convert Word Document to PDF"}
            </button>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4">
              <div className="flex items-center gap-3 text-emerald-950 font-black">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <div>
                  <h4 className="text-base font-extrabold font-outfit">Conversion Completed!</h4>
                  <p className="text-xs text-emerald-800 font-extrabold">Your PDF document is ready to download.</p>
                </div>
              </div>

              <a
                href={pdfUrl}
                download={pdfFileName}
                className="w-full py-4 rounded-xl font-black text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Download className="w-5 h-5 text-white" /> Download {pdfFileName}
              </a>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
