"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Upload, Download, RefreshCw, Layers, FileText } from "lucide-react";

interface ConvertedFile {
  file: File;
  previewUrl: string;
  targetFormat: string;
  size: number;
}

export function ImageConverterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>("image/webp");
  const [converted, setConverted] = useState<ConvertedFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (uploadedFile: File) => {
    if (!uploadedFile.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setError(null);
    setFile(uploadedFile);
    setOriginalPreview(URL.createObjectURL(uploadedFile));
    setConverted(null);
  };

  const processConversion = useCallback(
    (imgFile: File, format: string) => {
      setLoading(true);
      const img = new Image();
      const url = URL.createObjectURL(imgFile);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setError("Canvas context unavailable.");
          setLoading(false);
          return;
        }

        if (format === "image/jpeg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setError("Format conversion failed.");
              setLoading(false);
              return;
            }

            const ext = format.split("/")[1];
            const newName = imgFile.name.replace(/\.[^/.]+$/, "") + `.${ext}`;
            const convertedFile = new File([blob], newName, { type: format });
            const convertedUrl = URL.createObjectURL(blob);

            setConverted({
              file: convertedFile,
              previewUrl: convertedUrl,
              targetFormat: format,
              size: blob.size,
            });

            setLoading(false);
          },
          format,
          0.9
        );

        URL.revokeObjectURL(url);
      };

      img.onerror = () => {
        setError("Failed to load image for conversion.");
        setLoading(false);
      };

      img.src = url;
    },
    []
  );

  useEffect(() => {
    if (file) {
      processConversion(file, targetFormat);
    }
  }, [file, targetFormat, processConversion]);

  const handleReset = () => {
    setFile(null);
    setOriginalPreview(null);
    setConverted(null);
    setError(null);
  };

  const formatPills = [
    { mime: "image/webp", label: "WEBP (Web Optimized)" },
    { mime: "image/png", label: "PNG (Lossless)" },
    { mime: "image/jpeg", label: "JPG (High Compatibility)" },
    { mime: "image/bmp", label: "BMP (Raw)" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-900 border border-blue-200 mb-2">
            <Layers className="w-3.5 h-3.5 text-blue-600" /> Image Utility Suite
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight font-outfit">
            Universal Image Converter
          </h1>
          <p className="text-xs md:text-sm text-slate-700 font-bold mt-1">
            Convert PNG, JPG, WEBP, and BMP images to any target format in real-time.
          </p>
        </div>

        {file && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-extrabold text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-slate-700" /> Convert Another Image
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 mb-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-extrabold">
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
            accept="image/*"
            className="hidden"
          />

          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
            <Upload className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-extrabold text-slate-950 mb-1 font-outfit">
            Select image to convert, or <span className="text-blue-600 underline">Browse File</span>
          </h3>

          <p className="text-xs text-slate-600 max-w-md mx-auto font-bold">
            Real-time HTML5 Canvas conversion. 100% private browser execution.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          
          <div className="p-6 rounded-2xl bg-slate-100/80 border border-slate-200 space-y-3">
            <label className="text-slate-950 font-black text-sm block">Select Target Format:</label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {formatPills.map((pill) => (
                <button
                  key={pill.mime}
                  onClick={() => setTargetFormat(pill.mime)}
                  className={`p-3 rounded-xl border text-center text-xs font-extrabold transition-all cursor-pointer ${
                    targetFormat === pill.mime
                      ? "bg-blue-600 text-white border-blue-600 shadow-md scale-[1.01]"
                      : "bg-white text-slate-900 border-slate-300 hover:bg-slate-200/80 shadow-xs"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {converted && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                <h4 className="font-extrabold text-slate-950 text-xs uppercase tracking-wider">Original Preview</h4>
                {originalPreview && (
                  <img src={originalPreview} alt="Original" className="max-h-48 mx-auto rounded-xl object-contain" />
                )}
                <p className="text-xs font-extrabold text-slate-700">Format: {file.type}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center space-y-3">
                <h4 className="font-extrabold text-emerald-950 text-xs uppercase tracking-wider">Converted Preview</h4>
                {converted.previewUrl && (
                  <img src={converted.previewUrl} alt="Converted" className="max-h-48 mx-auto rounded-xl object-contain" />
                )}
                <p className="text-xs font-black text-emerald-950">
                  New Format: {converted.targetFormat.split("/")[1].toUpperCase()}
                </p>

                <a
                  href={converted.previewUrl}
                  download={converted.file.name}
                  className="w-full py-3.5 rounded-xl font-extrabold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4 text-white" /> Download {converted.file.name}
                </a>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
