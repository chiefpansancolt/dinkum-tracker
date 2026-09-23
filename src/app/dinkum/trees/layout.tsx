import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Trees",
	description: "Browse all Dinkum trees — sell value and where to find them.",
	alternates: {
		canonical: "/dinkum/trees",
	},
	openGraph: {
		title: "Trees | Dinkum Tracker",
		description: "Browse all Dinkum trees — sell value and where to find them.",
		url: "/dinkum/trees",
	},
};

const TreesLayout = ({ children }: { children: React.ReactNode }) => children;

export default TreesLayout;
