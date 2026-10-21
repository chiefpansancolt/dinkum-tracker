import type { Metadata } from "next";
import { LandingPage } from "@/comps/landing/LandingPage";

export const metadata: Metadata = {
	title: { absolute: "Dinkum Tracker — Track Your Dinkum Progress" },
	description:
		"Track your Dinkum progress — fish, bugs, critters, milestones, licenses, NPCs, and more.",
	alternates: { canonical: "/" },
};

export default function HomePage() {
	return <LandingPage />;
}
