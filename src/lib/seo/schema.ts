export interface FAQItem {
  q: string;
  a: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export function getCanonicalUrl(path: string = ""): string {
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}${path}`;
  }
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:3000${path}`;
  }
  return `https://toolboxsaas.com${path}`;
}

export function generateWebApplicationSchema({
  name,
  description,
  url,
  category = "UtilitiesApplication",
}: {
  name: string;
  description: string;
  url: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: "All (Web Browser)",
    browserRequirements: "Requires WebAssembly compatible web browser",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function generateWebPageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "ToolboxSaaS",
      url: getCanonicalUrl(""),
    },
  };
}

export function generateHowToSchema({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: HowToStep[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function generateFaqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateCollectionPageSchema({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

export function generateImageObjectSchema({
  url,
  caption,
}: {
  url: string;
  caption?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: url,
    caption: caption || "ToolboxSaaS Utility Image",
  };
}

export function generateWebSiteSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: "ToolboxSaaS",
        description: "Free Online AI Utility Tools for PDF, Image, and Document Processing",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/tools?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "ToolboxSaaS",
        url: `${baseUrl}/`,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/favicon.ico`,
        },
      },
    ],
  };
}
