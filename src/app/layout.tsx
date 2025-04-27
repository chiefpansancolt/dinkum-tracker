import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "flowbite-react";
import { customTheme } from "@/app/theme";
import FAB from "@/comps/FAB";
import AppContainer from "@/comps/layout/AppContainer";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Dinkum Tracker",
	description: "Track your progress in the Dinkum game",
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
				className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-gray-50 dark:bg-gray-800`}
			>
				<ThemeProvider theme={customTheme}>
					<AppContainer>
						{children}
					</AppContainer>
					<FAB />
					<ToastContainer
						closeButton={false}
						hideProgressBar
						newestOnTop
						draggable
						stacked
						className={"mt-14 lg:mt-0 lg:mr-24"}
						toastClassName={
							"shadow-md rounded-lg text-gray-500 bg-white dark:text-gray-400 dark:bg-gray-800 p-0"
						}
					/>
				</ThemeProvider>
			</body>
		</html>
	);
}
