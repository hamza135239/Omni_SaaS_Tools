"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, RefreshCw, FileText, Image as ImageIcon } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export function ImageToPdfTool() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesUpload = (filesList: FileList | File[]) => {
    const validImages = Array.from(filesList).filter((f) => f.type.startsWith("image/"));
    if (validImages.length === 0) {
      setError("Please select valid image files (JPG, PNG, WEBP).");
      return;
    }

    setError(null);
    setImages((prev) => [...prev, ...validImages]);
  };

  const handleConvertToPdf = async () => {
    if (images.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of images) {
        const imageBytes = await file.arrayBuffer();
        let embeddedImage;

        if (file.type === "image/png") {
          embeddedImage = await pdfDoc.embedPng(imageBytes);
        } else {
          embeddedImage = await pdfDoc.embedJpg(imageBytes);
        }

        const { width, height } = embeddedImage;
        const page = pdfDoc.addPage([width, height]);
        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width,
          height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setPdfUrl(url);
      setLoading(false);
    } catch (err) {
      setError("Failed to convert images to PDF. Please ensure images are valid JPG or PNG files.");
      setLoading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setImages([]);
    setPdfUrl(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-indigo-600 text-white shadow-xs mb-3">
            <ImageIcon className="w-4 h-4 text-white" /> PDF Utility Suite
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight font-outfit">
            JPG & Image to PDF Converter
          </h1>
          <p className="text-xs md:text-sm text-slate-700 font-extrabold mt-1">
            Convert JPG, PNG, and WEBP images into a clean, single PDF document in seconds.
          </p>
        </div>

        {images.length > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-xs font-extrabold text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-slate-800" /> Start Fresh
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 mb-6 rounded-xl bg-rose-100 border border-rose-300 text-rose-950 text-xs font-black">
          {error}
        </div>
      )}

      {images.length === 0 ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files) handleFilesUpload(files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className="relative border-2 border-dashed border-slate-300 hover:border-indigo-600 rounded-2xl p-12 text-center cursor-pointer bg-slate-50 hover:bg-indigo-50/40 transition-all group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              const files = e.target.files;
              if (files) handleFilesUpload(files);
            }}
            accept="image/png, image/jpeg, image/webp"
            multiple
            className="hidden"
          />

          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg border-2 border-indigo-700">
            <Upload className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-extrabold text-slate-950 mb-1 font-outfit">
            Select JPG or PNG images, or <span className="text-indigo-600 underline font-black">Browse Files</span>
          </h3>

          <p className="text-xs text-slate-700 max-w-md mx-auto font-extrabold">
            Combine multiple photos into 1 single PDF file. 100% private browser processing.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-950 text-sm font-outfit">
              Selected Images ({images.length}):
            </h3>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-black text-indigo-600 hover:underline cursor-pointer"
            >
              + Add More Images
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                const files = e.target.files;
                if (files) handleFilesUpload(files);
              }}
              accept="image/*"
              multiple
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative p-2 rounded-xl bg-slate-50 border border-slate-200 group">
                <img
                  src={URL.createObjectURL(img)}
                  alt="Preview"
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs"
                >
                  ✕
                </button>
                <p className="text-[10px] text-slate-950 font-bold truncate mt-1">{img.name}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleConvertToPdf}
            disabled={loading}
            className="w-full py-4 rounded-xl font-black text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin text-white" /> : <FileText className="w-5 h-5 text-white" />}
            {loading ? "Generating PDF..." : "Convert All Images to PDF Document"}
          </button>

          {pdfUrl && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-black text-emerald-950">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span>converted-images.pdf is Ready!</span>
              </div>

              <a
                href={pdfUrl}
                download="converted-images.pdf"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-4 h-4 text-white" /> Download PDF Document
              </a>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
