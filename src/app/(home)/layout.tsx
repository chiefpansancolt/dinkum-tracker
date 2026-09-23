import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dinkum Tracker — Track Your Dinkum Progress",
	description:
		"Track your Dinkum progress — fish, bugs, critters, milestones, licenses, NPCs, and more.",
	alternates: {
		canonical: "/",
	},
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => children;

export default HomeLayout;
