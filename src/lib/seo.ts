import type { Post } from "@/types/database";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fleettechguide.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "FleetTechGuide";

/**
 * Generate JSON-LD schema for a blog article post
 */
export function generateArticleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt ?? "",
    image: post.og_image ?? post.featured_image ?? "",
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.full_name,
          url: `${SITE_URL}/author/${post.author.username}`,
        }
      : { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    wordCount: post.content?.split(/\s+/).length ?? 0,
    articleSection: post.category?.name ?? "Fleet Telematics",
    keywords: post.tags?.map((t) => t.name).join(", ") ?? "",
    timeRequired: `PT${post.reading_time}M`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };
}

/**
 * Generate JSON-LD schema for the website (Organization)
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [],
    description:
      "GPS Tracking, ELD Compliance & Fleet Telematics guides for small business owners.",
  };
}

/**
 * Generate JSON-LD BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  crumbs: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Generate JSON-LD FAQ schema
 */
export function generateFaqSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD WebSite schema with SearchAction
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Truncate a string to a max length, at a word boundary
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  const trimmed = str.substring(0, maxLength);
  return trimmed.substring(0, trimmed.lastIndexOf(" ")) + "…";
}

/**
 * Generate canonical URL for a page
 */
export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * Estimate reading time from plain text content
 */
export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Format a date for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a date for datetime attributes (ISO 8601)
 */
export function formatDateISO(dateString: string): string {
  return new Date(dateString).toISOString();
}

/**
 * Slugify a string to a URL-safe slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Get absolute URL for images (handles relative Supabase paths)
 */
export function absoluteImageUrl(url: string | null | undefined): string {
  if (!url) return `${SITE_URL}/og-default.png`;
  if (url.startsWith("http")) return url;
  return `${SITE_URL}${url}`;
}
