import type { MetadataRoute } from "next";

const base = "https://dinkum.gamerdex.app";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: base, priority: 1.0, changeFrequency: "monthly" },
		{ url: `${base}/dinkum`, priority: 0.8, changeFrequency: "monthly" },
		{ url: `${base}/dinkum/animals`, priority: 0.7, changeFrequency: "monthly" },
		{ url: `${base}/dinkum/crops`, priority: 0.7, changeFrequency: "monthly" },
		{ url: `${base}/dinkum/flowers`, priority: 0.7, changeFrequency: "monthly" },
		{ url: `${base}/dinkum/resources`, priority: 0.7, changeFrequency: "monthly" },
		{ url: `${base}/dinkum/seeds`, priority: 0.7, changeFrequency: "monthly" },
		{ url: `${base}/dinkum/trees`, priority: 0.7, changeFrequency: "monthly" },
		{ url: `${base}/itemsBreakdown`, priority: 0.6, changeFrequency: "monthly" },
		{ url: `${base}/weight-calculator`, priority: 0.6, changeFrequency: "monthly" },
	];
}
