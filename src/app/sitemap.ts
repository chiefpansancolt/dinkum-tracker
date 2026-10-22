import type { MetadataRoute } from "next";

const base = "https://dinkum.gamerdex.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, priority: 1.0, changeFrequency: "monthly" },
    { url: `${base}/reference`, priority: 0.8, changeFrequency: "monthly" },
    {
      url: `${base}/items-breakdown`,
      priority: 0.6,
      changeFrequency: "monthly",
    },
    {
      url: `${base}/weight-calculator`,
      priority: 0.6,
      changeFrequency: "monthly",
    },
  ];
}
