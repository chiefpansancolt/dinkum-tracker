"use client";

import { DarkThemeToggle } from "flowbite-react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";
export default function AppNav({
	sidebarOpen,
	toggleSidebar,
}: {
	sidebarOpen: boolean;
	toggleSidebar: () => void;
}) {
	return (
		<nav className="bg-primary fixed top-0 right-0 left-0 z-50 border-b border-gray-200 px-4 py-2.5 lg:px-6 dark:border-gray-700">
			<div className="flex flex-wrap items-center justify-between">
				<div className="flex items-center justify-start">
					<button
						data-drawer-target="drawer-navigation"
						onClick={toggleSidebar}
						aria-controls="drawer-navigation"
						className="mr-2 cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700"
					>
						{sidebarOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
						<span className="sr-only">Toggle sidebar</span>
					</button>

					<Link href="/" className="mr-4 flex items-center justify-center">
						<Image
							src="/dinkum_d_logo.png"
							className="mr-3 h-8"
							alt="Dinkum Logo"
							width={32}
							height={32}
						/>
						<span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
							Dinkum Tracker
						</span>
					</Link>
				</div>

				<div className="flex items-center lg:order-2">
					<DarkThemeToggle className="border-accent dark:border-accent hover:bg-accent dark:hover:bg-accent cursor-pointer text-white dark:text-white" />
				</div>
			</div>
		</nav>
	);
}
