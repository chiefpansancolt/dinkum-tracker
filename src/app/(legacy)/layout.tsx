import { Geist, Geist_Mono } from "next/font/google";
import LayoutWrapper from "@/comps/layout/LayoutWrapper";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function LegacyLayout({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50 antialiased dark:bg-gray-800`}
		>
			<LayoutWrapper>{children}</LayoutWrapper>
		</div>
	);
}
