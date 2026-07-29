# ToolboxSaaS — Production Deployment & Setup Guide

A high-performance, open-source SaaS utility suite providing **14 Free Online Tools** for PDF documents, AI resume building, ATS resume scoring, cover letters, and image processing. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, Supabase (PostgreSQL), and Google AdSense / SEO optimization.

Designed to deliver instant client-side & server-side document processing with zero queue times and responsive UI.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 16 (App Router with ISR & SSG)
- **Database & Auth:** Supabase (PostgreSQL + RLS Security Policies)
- **Styling:** Tailwind CSS (CSS variables, clean modern tokens)
- **Document & Image Engine:** `pdf-lib`, `pdfjs-dist`, `docx`, `mammoth`
- **Validation & Types:** TypeScript strict mode, Zod validation

---

## 🧰 Included Tools (14 Free SaaS Utilities)

### 📄 PDF Utilities
1. **PDF to Word Converter** (`/tools/pdf-to-word`)
2. **Word to PDF Converter** (`/tools/word-to-pdf`)
3. **PDF Merge** (`/tools/pdf-merge`)
4. **Split PDF Pages** (`/tools/pdf-split`)
5. **JPG to PDF Converter** (`/tools/image-to-pdf`)
6. **Rotate PDF Pages** (`/tools/pdf-rotate`)
7. **Protect PDF File** (`/tools/pdf-protect`)
8. **PDF Compressor** (`/tools/pdf-compressor`)

### 💼 Resume & Career AI Suite
9. **ATS Resume Checker** (`/tools/ats-resume-checker`)
10. **Resume Scorer** (`/tools/resume-scorer`)
11. **AI Resume Builder** (`/tools/ai-resume-builder`)
12. **Cover Letter Generator** (`/tools/cover-letter-generator`)

### 🖼️ Image AI & Utility Tools
13. **AI Background Remover** (`/tools/background-remover`)
14. **Smart Image Compressor** (`/tools/image-compressor`)
15. **Universal Image Converter** (`/tools/image-converter`)

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open local preview
http://localhost:3000
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=https://toolboxsaas.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

---

## 🌐 Production Build & Verification

```bash
# Check TypeScript types
npx tsc --noEmit

# Build production bundle
npm run build

# Start production server
npm run start
```
