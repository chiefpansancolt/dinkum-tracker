import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Daily Milestones",
	description:
		"Browse every Dinkum daily milestone task and its permit point reward, grouped by category.",
	alternates: {
		canonical: "/dinkum/daily-milestones",
	},
	openGraph: {
		title: "Daily Milestones | Dinkum Tracker",
		description:
			"Browse every Dinkum daily milestone task and its permit point reward, grouped by category.",
		url: "/dinkum/daily-milestones",
	},
};

const DailyMilestonesLayout = ({ children }: { children: React.ReactNode }) => children;

export default DailyMilestonesLayout;
