import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Animals",
	description: "Browse all Dinkum animals — temperament, sell value, and health stats.",
	alternates: {
		canonical: "/dinkum/animals",
	},
	openGraph: {
		title: "Animals | Dinkum Tracker",
		description: "Browse all Dinkum animals — temperament, sell value, and health stats.",
		url: "/dinkum/animals",
	},
};

const AnimalsLayout = ({ children }: { children: React.ReactNode }) => children;

export default AnimalsLayout;
