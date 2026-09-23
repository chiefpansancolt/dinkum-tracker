import "@/app/globals.css";
import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import LayoutWrapper from "@/comps/layout/LayoutWrapper";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://dinkum.gamerdex.app"),
	title: "Dinkum Tracker",
	description:
		"Track your Dinkum progress — fish, bugs, critters, milestones, licenses, NPCs, and more.",
	applicationName: "Dinkum Tracker",
	keywords: ["dinkum", "dinkum game", "dinkum tracker", "dinkum progress tracker"],
	openGraph: {
		title: "Dinkum Tracker",
		description:
			"Track your Dinkum progress — fish, bugs, critters, milestones, licenses, NPCs, and more.",
		url: "https://dinkum.gamerdex.app",
		siteName: "Dinkum Tracker",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Dinkum Tracker",
		description:
			"Track your Dinkum progress — fish, bugs, critters, milestones, licenses, NPCs, and more.",
	},
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="h-full">
			<head>
				<ThemeModeScript />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50 antialiased dark:bg-gray-800`}
			>
				<LayoutWrapper>{children}</LayoutWrapper>
				<Script
					src="https://static.cloudflareinsights.com/beacon.min.js"
					strategy="afterInteractive"
					data-cf-beacon='{"token": "195d9b2b11a443eca5a1fe2526c2bb35"}'
				/>
			</body>
		</html>
	);
}
