import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/Analytics";
import Script from "next/script";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolboxsaas.com";
const SITE_NAME = "ToolboxSaaS";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — 100% Free Online AI & Utility Web Tools Platform`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Fast, 100% private online web tools for PDFs, images, and career resumes. Compress PDF, Merge PDF, Background Remover, ATS Resume Checker with zero registration.",
  keywords: [
    "free online web tools",
    "ai background remover",
    "image compressor online",
    "compress pdf free",
    "merge pdf online",
    "ats resume checker",
    "ai resume builder",
    "utility saas tools",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Free AI & Online Utility Web Tools Platform`,
    description: "Browser-processed tools for PDFs, images, and career resumes with zero signup.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// Organization + WebSite JSON-LD
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description: "Free Online AI Utility Tools Platform for PDF, Image, and Resume Processing.",
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/tools?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts & External CDNs */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

        {/* JSON-LD Schemas */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />

        {/* Theme init script - enforce light mode by default */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            const t = localStorage.getItem('theme');
            const d = document.documentElement;
            if (t === 'dark') {
              d.classList.add('dark');
            } else {
              d.classList.remove('dark');
              localStorage.setItem('theme', 'light');
            }
          } catch(e) {}
        `}} />
      </head>
      <body className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>

        <Analytics />

        {/* AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
