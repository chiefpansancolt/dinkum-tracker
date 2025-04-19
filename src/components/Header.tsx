"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import { getPlaythroughs } from "../lib/localStorage";
import { Playthrough } from "@/types/app";
import { HiCog } from "react-icons/hi";

export default function Header() {
	const pathname = usePathname();
	const [recentPlaythroughs, setRecentPlaythroughs] = useState<Playthrough[]>([]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const allPlaythroughs = getPlaythroughs();
			const sortedPlaythroughs = allPlaythroughs
				.sort(
					(a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
				)
				.slice(0, 5);
			setRecentPlaythroughs(sortedPlaythroughs);
		}
	}, []);

	return (
		<header className="bg-primary text-white shadow-md">
			<div className="mx-auto px-4 py-4">
				<div className="flex flex-col items-center justify-between md:flex-row">
					<Link
						href="/"
						className="hover:text-highlight text-2xl font-bold transition-colors"
					>
						Dinkum Tracker
					</Link>

					<nav className="mt-4 md:mt-0">
						<ul className="flex space-x-6">
							<li>
								<Link
									href="/"
									className={`hover:text-highlight transition-colors ${
										pathname === "/" ? "font-bold underline" : ""
									}`}
								>
									Home
								</Link>
							</li>
							<li>
								<Dropdown label="Playthroughs" inline={true} dismissOnClick={true}>
									{recentPlaythroughs.length > 0 ? (
										recentPlaythroughs.map((playthrough) => (
											<DropdownItem
												key={playthrough.id}
												as={Link}
												href={`/playthrough/${playthrough.id}`}
											>
												{playthrough.name}
											</DropdownItem>
										))
									) : (
										<DropdownItem disabled>No playthroughs found</DropdownItem>
									)}
									<DropdownDivider />
									<DropdownItem as={Link} href="/playthrough/list">
										View All Playthroughs
									</DropdownItem>
								</Dropdown>
							</li>
							<li>
								<Link
									href="/settings"
									className={`hover:text-highlight flex items-center transition-colors ${
										pathname === "/settings" ? "font-bold underline" : ""
									}`}
								>
									<HiCog className="mr-1 h-5 w-5" />
									Settings
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}
