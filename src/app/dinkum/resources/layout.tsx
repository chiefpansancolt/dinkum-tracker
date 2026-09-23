import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Resources",
	description: "Browse all Dinkum resources — sell value and where to gather them.",
	alternates: {
		canonical: "/dinkum/resources",
	},
	openGraph: {
		title: "Resources | Dinkum Tracker",
		description: "Browse all Dinkum resources — sell value and where to gather them.",
		url: "/dinkum/resources",
	},
};

const ResourcesLayout = ({ children }: { children: React.ReactNode }) => children;

export default ResourcesLayout;
