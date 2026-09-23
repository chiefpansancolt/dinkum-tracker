import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Flowers",
	description: "Browse all Dinkum flowers — sell value and where to find them.",
	alternates: {
		canonical: "/dinkum/flowers",
	},
	openGraph: {
		title: "Flowers | Dinkum Tracker",
		description: "Browse all Dinkum flowers — sell value and where to find them.",
		url: "/dinkum/flowers",
	},
};

const FlowersLayout = ({ children }: { children: React.ReactNode }) => children;

export default FlowersLayout;
