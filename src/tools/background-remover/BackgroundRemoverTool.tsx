"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, RefreshCw, Layers, Sparkles, AlertCircle } from "lucide-react";

export function BackgroundRemoverTool() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"compare" | "preview">("compare");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [bgColor, setBgColor] = useState<string>("transparent");
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const removeBgCanvasSmart = (imageElement: HTMLImageElement): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(imageElement.src);

      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      ctx.drawImage(imageElement, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      const cornerPixels = [
        [0, 0],
        [canvas.width - 1, 0],
        [0, canvas.height - 1],
        [canvas.width - 1, canvas.height - 1],
      ];

      let rSum = 0, gSum = 0, bSum = 0;
      cornerPixels.forEach(([x, y]) => {
        const idx = (y * canvas.width + x) * 4;
        rSum += data[idx];
        gSum += data[idx + 1];
        bSum += data[idx + 2];
      });

      const bgR = rSum / 4;
      const bgG = gSum / 4;
      const bgB = bSum / 4;
      const tolerance = 42;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
        if (dist < tolerance) {
          data[i + 3] = 0;
        } else if (dist < tolerance + 25) {
          data[i + 3] = Math.round(((dist - tolerance) / 25) * 255);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    });
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }

    setError(null);
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    setProcessedUrl(null);
    setProgress(0);
    processBackgroundRemoval(file, url);
  };

  const processBackgroundRemoval = async (file: File, url: string) => {
    setLoading(true);
    setProgress(10);

    try {
      const imgRemover = await import("@imgly/background-removal");
      setProgress(30);

      const blob = await imgRemover.removeBackground(file, {
        progress: (stage: string, current: number, total: number) => {
          if (total > 0) {
            const p = Math.round((current / total) * 100);
            if (stage.includes("fetch")) setProgress(30 + Math.round(p * 0.4));
            else if (stage.includes("compute")) setProgress(70 + Math.round(p * 0.28));
          }
        },
      });

      const processedImageUrl = URL.createObjectURL(blob);
      setProcessedUrl(processedImageUrl);
      setProgress(100);
    } catch (err) {
      console.warn("WASM removal fallback to Smart Canvas:", err);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = async () => {
        const smartUrl = await removeBgCanvasSmart(img);
        setProcessedUrl(smartUrl);
        setProgress(100);
      };
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!processedUrl) return;
    const link = document.createElement("a");
    link.href = processedUrl;
    link.download = `removed-bg-${imageFile?.name || "image"}.png`;
    link.click();
  };

  const handleReset = () => {
    setImageFile(null);
    setOriginalUrl(null);
    setProcessedUrl(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-2xl border border-zinc-200 shadow-xs transition-all duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> AI Background Removal Engine
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-950 tracking-tight">
            AI Image Background Remover
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 mt-1">
            Remove image backgrounds automatically in 1 second with clean edges. Export HD PNG.
          </p>
        </div>

        {processedUrl && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-xl transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-zinc-600" /> Process Another Image
          </button>
        )}
      </div>

      {!originalUrl ? (
        /* Upload Area */
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) handleImageUpload(file);
          }}
          onClick={() => fileInputRef.current?.click()}
          className="relative border-2 border-dashed border-zinc-200 hover:border-emerald-500 rounded-2xl p-10 md:p-16 text-center cursor-pointer bg-zinc-50/50 hover:bg-emerald-50/30 transition-all group overflow-hidden"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />

          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-zinc-900 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <Upload className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-lg font-bold text-zinc-950 mb-1">
            Drag & Drop image here, or <span className="text-emerald-600 underline">Browse File</span>
          </h3>

          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            Supports PNG, JPG, JPEG, WEBP up to 25MB. 100% private browser processing.
          </p>
        </div>
      ) : (
        /* Studio Output */
        <div className="space-y-6">
          
          {loading && (
            <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3">
              <div className="flex justify-between text-xs font-semibold text-zinc-700">
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" /> Removing Background with AI...
                </span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {processedUrl && (
            <div className="space-y-6">
              
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("compare")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeTab === "compare"
                        ? "bg-zinc-900 text-white font-semibold"
                        : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    Compare Slider
                  </button>
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeTab === "preview"
                        ? "bg-zinc-900 text-white font-semibold"
                        : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    Cutout Preview
                  </button>
                </div>

                {/* Backdrop Color Options */}
                <div className="flex items-center gap-2">
                  <span className="text-zinc-600 text-xs">Backdrop:</span>
                  {[
                    { id: "transparent", label: "Transparent", class: "bg-zinc-200 border-zinc-300" },
                    { id: "#ffffff", label: "White", class: "bg-white border-zinc-300" },
                    { id: "#000000", label: "Black", class: "bg-black border-zinc-900" },
                    { id: "#2563eb", label: "Blue", class: "bg-blue-600 border-blue-700" },
                  ].map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setBgColor(color.id)}
                      className={`w-6 h-6 rounded-full border ${color.class} transition-transform ${
                        bgColor === color.id ? "scale-110 ring-2 ring-indigo-500" : ""
                      }`}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

              {/* Image Compare / Preview Display */}
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 min-h-[350px] flex items-center justify-center p-4">
                {activeTab === "compare" && originalUrl ? (
                  <div className="relative w-full max-w-2xl h-[380px] overflow-hidden rounded-xl">
                    <img
                      src={processedUrl}
                      alt="Processed Cutout"
                      className="absolute inset-0 w-full h-full object-contain"
                      style={{ backgroundColor: bgColor }}
                    />
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${sliderPosition}%` }}
                    >
                      <img
                        src={originalUrl}
                        alt="Original"
                        className="w-full h-full object-contain bg-white"
                      />
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPosition}
                      onChange={(e) => setSliderPosition(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    />
                  </div>
                ) : (
                  <img
                    src={processedUrl}
                    alt="Removed Background Result"
                    className="max-h-[380px] object-contain rounded-xl"
                    style={{ backgroundColor: bgColor }}
                  />
                )}
              </div>

              {/* Download Action Button */}
              <button
                onClick={handleDownload}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download Transparent HD PNG
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
