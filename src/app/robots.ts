import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/playthrough/", "/settings/"],
		},
		sitemap: "https://dinkum.gamerdex.app/sitemap.xml",
	};
}
