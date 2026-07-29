# FleetTechGuide — Production Deployment & Setup Guide

A enterprise-grade, high-performance blog platform for **Fleet Telematics, GPS Tracking & ELD Compliance**.
Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, Supabase (PostgreSQL), and Google AdSense optimization.

Designed to serve 10M+ monthly page views with minimal server costs using SSG, ISR, and Cloudflare edge caching.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router with ISR & SSG)
- **Database & Auth**: Supabase (PostgreSQL + RLS Security Policies)
- **Styling**: Tailwind CSS v4 (CSS variables, dark mode)
- **Validation**: Zod schema validation
- **AdSense**: AdSense-compliant responsive placeholders & auto-ad injection
- **Performance**: Edge caching headers, AVIF/WebP image optimization, requestAnimationFrame scroll handlers
- **SEO**: Dynamic JSON-LD (Article, Organization, WebSite, Breadcrumb), dynamic XML sitemap, RSS 2.0 feed

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 20+ installed
- Supabase account & project

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase project URL and Keys from the Supabase dashboard.

### 4. Database Setup
1. Open your project on [Supabase Dashboard](https://app.supabase.com).
2. Go to **SQL Editor**.
3. Copy the contents of `supabase/schema.sql` and run the script.
4. (Optional) Run the seed post migration script to populate initial fleet telematics articles.

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Schema & RLS Policies

The database is built on PostgreSQL with Row Level Security (RLS) enabled on all tables:
- `posts` — Core articles with full-text search index & view counters
- `categories` — Content categories with auto-calculated post counts
- `tags` & `post_tags` — Many-to-many article tagging
- `profiles` — Author profiles & role-based access (`admin`, `editor`, `author`)
- `comments` — Visitor comments with moderation states (`pending`, `approved`, `spam`)
- `newsletter_subscribers` — Email subscriber list
- `contact_submissions` — Contact form messages
- `media` — Media library assets

---

## ⚡ Deployment Guide (Vercel + Cloudflare)

### Deploying to Vercel
1. Push your repository to GitHub / GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Add the environment variables from `.env.example` in Vercel settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (Set to your production domain, e.g., `https://fleettechguide.com`)
   - `NEXT_PUBLIC_ADSENSE_ID` (Once approved by AdSense)
4. Click **Deploy**.

### Cloudflare Integration (Edge Caching for 10M+ Page Views)
1. Add your domain to Cloudflare.
2. Set SSL/TLS encryption mode to **Full (Strict)**.
3. Create a **Cache Rule** for static assets & ISR pages:
   - Match: `URI Path starts with /_next/static` or `/blog`
   - Cache Level: **Cache Everything**
   - Edge Cache TTL: **7 days**
4. Enable **Auto Minify** (HTML, CSS, JS) & **Brotli** compression.

---

## 💰 Monetization & AdSense Approval Checklist

To ensure fast Google AdSense approval:
- [x] Clear navigational structure with top-level categories
- [x] Required legal pages (Privacy Policy, Terms & Conditions, Disclaimer, Cookie Policy)
- [x] Original, fact-checked long-form content with cited sources
- [x] Clear "Advertisement" labels above all ad units
- [x] Responsive layout with zero content shifting (CLS optimized)
- [x] Working contact form and about page

---

## 🔒 Security Features

- **Row Level Security (RLS)**: Enforced at PostgreSQL layer
- **API Rate Limiting**: In-memory rate limiting on search, comments, and contact API routes
- **CSRF & Security Headers**: Strict CSP, X-Frame-Options, X-Content-Type-Options
- **Strict Input Validation**: Zod schemas for all client inputs
