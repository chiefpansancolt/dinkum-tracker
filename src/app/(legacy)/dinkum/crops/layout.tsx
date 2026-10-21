import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Crops",
	description: "Browse all Dinkum crops — growth time, sell value, and season data.",
	alternates: {
		canonical: "/dinkum/crops",
	},
	openGraph: {
		title: "Crops | Dinkum Tracker",
		description: "Browse all Dinkum crops — growth time, sell value, and season data.",
		url: "/dinkum/crops",
	},
};

const CropsLayout = ({ children }: { children: React.ReactNode }) => children;

export default CropsLayout;
