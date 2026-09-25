import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Food Modeller",
	description:
		"Browse every Dinkum Food Modeller conversion — food and crops into display furniture.",
	alternates: {
		canonical: "/dinkum/food-modeller",
	},
	openGraph: {
		title: "Food Modeller | Dinkum Tracker",
		description:
			"Browse every Dinkum Food Modeller conversion — food and crops into display furniture.",
		url: "/dinkum/food-modeller",
	},
};

const FoodModellerLayout = ({ children }: { children: React.ReactNode }) => children;

export default FoodModellerLayout;
