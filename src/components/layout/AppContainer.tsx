"use client";

import { useState } from "react";
import AppSidebar from "./AppSidebar";
import AppNav from "./AppNav";
import Footer from "../Footer";

export default function AppContainer({ children }: { children: React.ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className="bg-gray-50 antialiased dark:bg-gray-900">
			<AppNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

			<AppSidebar sidebarOpen={sidebarOpen} />

			<main className="mt-15 flex min-h-screen flex-col md:ml-64">
				<div className="flex-grow">{children}</div>
				<Footer />
			</main>
		</div>
	);
}
