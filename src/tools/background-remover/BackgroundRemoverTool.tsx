"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, RefreshCw, Layers, Sparkles, AlertCircle, Image as ImageIcon } from "lucide-react";

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

      const maxDim = 1200;
      let width = imageElement.naturalWidth || imageElement.width;
      let height = imageElement.naturalHeight || imageElement.height;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(imageElement, 0, 0, width, height);

      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // Sample border pixels to establish background color
      const borderSamples: number[][] = [];
      const stepX = Math.max(1, Math.floor(width / 30));
      const stepY = Math.max(1, Math.floor(height / 30));

      for (let x = 0; x < width; x += stepX) {
        borderSamples.push([x, 0], [x, height - 1]);
      }
      for (let y = 0; y < height; y += stepY) {
        borderSamples.push([0, y], [width - 1, y]);
      }

      let rSum = 0, gSum = 0, bSum = 0;
      borderSamples.forEach(([x, y]) => {
        const idx = (y * width + x) * 4;
        rSum += data[idx];
        gSum += data[idx + 1];
        bSum += data[idx + 2];
      });

      const bgR = rSum / borderSamples.length;
      const bgG = gSum / borderSamples.length;
      const bgB = bSum / borderSamples.length;

      // Edge-Connected BFS Flood-Fill to prevent corrupting inner subject (shirt, hair, face)
      const visited = new Uint8Array(width * height);
      const queue: number[] = [];

      for (let x = 0; x < width; x++) {
        queue.push(x, 0);
        queue.push(x, height - 1);
        visited[0 * width + x] = 1;
        visited[(height - 1) * width + x] = 1;
      }
      for (let y = 1; y < height - 1; y++) {
        queue.push(0, y);
        queue.push(width - 1, y);
        visited[y * width + 0] = 1;
        visited[y * width + (width - 1)] = 1;
      }

      const tolerance = 45;
      let head = 0;

      while (head < queue.length) {
        const cx = queue[head++];
        const cy = queue[head++];
        const idx = (cy * width + cx) * 4;

        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);

        if (dist < tolerance) {
          data[idx + 3] = 0;

          const neighbors = [
            [cx + 1, cy],
            [cx - 1, cy],
            [cx, cy + 1],
            [cx, cy - 1],
          ];

          for (let i = 0; i < neighbors.length; i++) {
            const [nx, ny] = neighbors[i];
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const nPos = ny * width + nx;
              if (!visited[nPos]) {
                visited[nPos] = 1;
                queue.push(nx, ny);
              }
            }
          }
        } else if (dist < tolerance + 18) {
          data[idx + 3] = Math.round(((dist - tolerance) / 18) * 255);
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
        publicPath: "https://staticimgly.com/@imgly/background-removal-data/1.5.5/dist/",
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
      console.warn("WASM removal fallback to Edge-Connected Smart Canvas:", err);
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <div
            style={{ backgroundColor: "#d1fae5", color: "#065f46", borderColor: "#a7f3d0" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border mb-3"
          >
            <Sparkles style={{ color: "#059669" }} className="w-4 h-4" />
            <span>AI Background Removal Engine</span>
          </div>
          <h1 style={{ color: "#0f172a" }} className="text-2xl md:text-3xl font-black tracking-tight font-outfit">
            AI Image Background Remover
          </h1>
          <p style={{ color: "#334155" }} className="text-xs md:text-sm font-bold mt-1">
            Remove image backgrounds automatically in 1 second with clean edges. Export HD PNG.
          </p>
        </div>

        {processedUrl && (
          <button
            onClick={handleReset}
            style={{ backgroundColor: "#f1f5f9", color: "#0f172a", borderColor: "#cbd5e1" }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-black border rounded-xl transition-all cursor-pointer hover:bg-slate-200"
          >
            <RefreshCw style={{ color: "#0f172a" }} className="w-4 h-4" />
            <span>Process Another Image</span>
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
          style={{ backgroundColor: "#f8fafc", borderColor: "#cbd5e1" }}
          className="relative border-2 border-dashed rounded-2xl p-10 md:p-14 text-center cursor-pointer transition-all"
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

          <div
            style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
            className="w-full max-w-md mx-auto mb-5 py-4 rounded-2xl flex items-center justify-center shadow-md"
          >
            <Upload style={{ color: "#ffffff" }} className="w-6 h-6 stroke-[2.5]" />
          </div>

          <h3 style={{ color: "#0f172a" }} className="text-xl md:text-2xl font-black mb-1 font-outfit">
            Drag & Drop image file here, or <span style={{ color: "#059669" }} className="underline font-black">Choose File</span>
          </h3>

          <p style={{ color: "#475569" }} className="text-xs max-w-md mx-auto font-bold mb-6">
            Supports PNG, JPG, WEBP formats. Instant automatic background removal.
          </p>

          <button
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
            type="button"
            style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
            className="w-full max-w-md mx-auto py-4 rounded-2xl font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-slate-900"
          >
            <ImageIcon style={{ color: "#ffffff" }} className="w-5 h-5" />
            <span style={{ color: "#ffffff" }}>Choose Image File</span>
          </button>
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
