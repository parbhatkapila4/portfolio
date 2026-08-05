import type { MetadataRoute } from "next";

const siteUrl = "https://www.parbhat.dev";

const writingSlugs = ["sentinel", "cutline", "repodoc", "vectormail"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...writingSlugs.map((slug) => ({
      url: `${siteUrl}/writing/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
