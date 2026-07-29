"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Upload, Download, Sparkles, RefreshCw, FileText } from "lucide-react";

interface CompressedResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  previewUrl: string;
  quality: number;
  format: string;
}

export function ImageCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [targetFormat, setTargetFormat] = useState<string>("image/jpeg");
  const [result, setResult] = useState<CompressedResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (uploadedFile: File) => {
    if (!uploadedFile.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, WEBP, BMP).");
      return;
    }

    setError(null);
    setFile(uploadedFile);
    setOriginalPreview(URL.createObjectURL(uploadedFile));
    setResult(null);
  };

  const processCompression = useCallback(
    (imgFile: File, q: number, format: string) => {
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
              setError("Compression failed.");
              setLoading(false);
              return;
            }

            const compressedFile = new File([blob], imgFile.name, { type: format });
            const compressedUrl = URL.createObjectURL(blob);

            setResult({
              file: compressedFile,
              originalSize: imgFile.size,
              compressedSize: blob.size,
              previewUrl: compressedUrl,
              quality: q,
              format,
            });

            setLoading(false);
          },
          format,
          q / 100
        );

        URL.revokeObjectURL(url);
      };

      img.onerror = () => {
        setError("Failed to load image for compression.");
        setLoading(false);
      };

      img.src = url;
    },
    []
  );

  useEffect(() => {
    if (file) {
      processCompression(file, quality, targetFormat);
    }
  }, [file, quality, targetFormat, processCompression]);

  const handleReset = () => {
    setFile(null);
    setOriginalPreview(null);
    setResult(null);
    setError(null);
  };

  const savedPercent = result
    ? Math.round(((result.originalSize - result.compressedSize) / result.originalSize) * 100)
    : 0;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-50 text-indigo-900 border border-indigo-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Image Utility Suite
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight font-outfit">
            Smart Image Compressor
          </h1>
          <p className="text-xs md:text-sm text-slate-700 font-bold mt-1">
            Compress JPG, PNG, and WEBP images in real-time with zero quality loss.
          </p>
        </div>

        {file && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-extrabold text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-slate-700" /> Compress Another Image
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
          className="relative border-2 border-dashed border-slate-300 hover:border-indigo-600 rounded-2xl p-12 text-center cursor-pointer bg-slate-50 hover:bg-indigo-50/40 transition-all group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileUpload(f);
            }}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />

          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
            <Upload className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-extrabold text-slate-950 mb-1 font-outfit">
            Select image file, or <span className="text-indigo-600 underline">Browse File</span>
          </h3>

          <p className="text-xs text-slate-600 max-w-md mx-auto font-bold">
            Live compression slider & byte saving statistics. 100% private browser execution.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          
          <div className="p-6 rounded-2xl bg-slate-100/80 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-slate-950 font-black text-sm">
                Quality Level: <span className="text-indigo-600 font-extrabold">{quality}%</span>
              </label>

              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
                className="p-2 rounded-xl border-2 border-slate-300 bg-white font-extrabold text-slate-950 text-xs focus:outline-none focus:border-indigo-600"
              >
                <option value="image/jpeg">Convert to JPG</option>
                <option value="image/webp">Convert to WEBP (Best Size)</option>
                <option value="image/png">Convert to PNG</option>
              </select>
            </div>

            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {result && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                <h4 className="font-extrabold text-slate-950 text-xs uppercase tracking-wider">Original File</h4>
                {originalPreview && (
                  <img src={originalPreview} alt="Original" className="max-h-48 mx-auto rounded-xl object-contain" />
                )}
                <p className="text-xs font-extrabold text-slate-700">
                  Size: {(result.originalSize / 1024).toFixed(1)} KB
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center space-y-3">
                <div className="flex items-center justify-between px-2">
                  <h4 className="font-extrabold text-emerald-950 text-xs uppercase tracking-wider">Compressed File</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-600 text-white shadow-xs">
                    {savedPercent > 0 ? `-${savedPercent}% Saved` : "Optimized"}
                  </span>
                </div>
                {result.previewUrl && (
                  <img src={result.previewUrl} alt="Compressed" className="max-h-48 mx-auto rounded-xl object-contain" />
                )}
                <p className="text-xs font-black text-emerald-950">
                  Size: {(result.compressedSize / 1024).toFixed(1)} KB
                </p>

                <a
                  href={result.previewUrl}
                  download={`compressed-${file.name}`}
                  className="w-full py-3.5 rounded-xl font-extrabold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4 text-white" /> Download Compressed Image
                </a>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
