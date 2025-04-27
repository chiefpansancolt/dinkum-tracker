"use client";

import { useState, useEffect } from "react";
import AppSidebar from "./AppSidebar";
import AppNav from "./AppNav";
import Footer from "../Footer";

export default function AppContainer({ children }: { children: React.ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(true);


	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setSidebarOpen(true);
			} else {
				setSidebarOpen(false);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className="bg-gray-50 antialiased dark:bg-gray-900">
			<AppNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

			<AppSidebar sidebarOpen={sidebarOpen} />

			<main className="min-h-screen flex flex-col md:ml-64 mt-15">
				<div className="flex-grow">{children}</div>
				<Footer />
			</main>
		</div>
	);
}
