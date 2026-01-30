import type { MetadataRoute } from "next";

const siteUrl = "https://parbhat.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
