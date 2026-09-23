import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Seeds",
	description: "Browse all Dinkum seeds — cost, growth time, and what they grow into.",
	alternates: {
		canonical: "/dinkum/seeds",
	},
	openGraph: {
		title: "Seeds | Dinkum Tracker",
		description: "Browse all Dinkum seeds — cost, growth time, and what they grow into.",
		url: "/dinkum/seeds",
	},
};

const SeedsLayout = ({ children }: { children: React.ReactNode }) => children;

export default SeedsLayout;
