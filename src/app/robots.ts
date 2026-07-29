import { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/seo/schema";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getCanonicalUrl("");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/login", "/search"],
      },
      {
        userAgent: "Mediapartners-Google",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/login", "/search"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
