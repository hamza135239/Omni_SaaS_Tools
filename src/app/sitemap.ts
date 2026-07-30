import { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/seo/schema";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getCanonicalUrl("");
  const now = new Date();

  const routes = [
    { path: "", priority: 1.0, changeFreq: "daily" as const },
    { path: "/tools", priority: 0.9, changeFreq: "daily" as const },
    // PDF Tools
    { path: "/tools/pdf-compressor", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tools/pdf-merge", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tools/pdf-split", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tools/pdf-to-word", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tools/word-to-pdf", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tools/image-to-pdf", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tools/pdf-rotate", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/tools/pdf-protect", priority: 0.8, changeFreq: "weekly" as const },
    // Image Tools
    { path: "/tools/background-remover", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tools/image-compressor", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tools/image-converter", priority: 0.8, changeFreq: "weekly" as const },
    // Resume Tools
    { path: "/tools/ai-resume-builder", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tools/resume-scorer", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/tools/cover-letter-generator", priority: 0.8, changeFreq: "weekly" as const },
    // Static Pages
    { path: "/about", priority: 0.5, changeFreq: "monthly" as const },
    { path: "/contact", priority: 0.5, changeFreq: "monthly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFreq: "monthly" as const },
    { path: "/terms-of-service", priority: 0.3, changeFreq: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFreq,
    priority: route.priority,
  }));
}
