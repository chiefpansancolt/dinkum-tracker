import "@/app/globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { themeInitScript } from "@/lib/themeScript";

const plexSans = IBM_Plex_Sans({
	variable: "--font-plex-sans",
	subsets: ["latin"],
	weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
	variable: "--font-plex-mono",
	subsets: ["latin"],
	weight: ["400", "500"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://dinkum.gamerdex.app"),
	title: {
		default: "Dinkum Tracker",
		template: "%s | Dinkum Tracker",
	},
	description:
		"Track your Dinkum progress — fish, bugs, critters, milestones, licenses, NPCs, and more.",
	applicationName: "Dinkum Tracker",
	keywords: ["dinkum", "dinkum game", "dinkum tracker", "dinkum progress tracker"],
	alternates: {
		canonical: "/",
	},
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
		<html
			lang="en"
			suppressHydrationWarning
			className={`h-full ${plexSans.variable} ${plexMono.variable}`}
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body className="min-h-dvh">{children}</body>
		</html>
	);
}
