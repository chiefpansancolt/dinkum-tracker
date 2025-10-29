"use client";

import { Button, Card } from "flowbite-react";
import Link from "next/link";
import { FaOtter, FaSeedling, FaTree } from "react-icons/fa6";
import { GiMineralPearls, GiWheat } from "react-icons/gi";
import { LuFlower2 } from "react-icons/lu";

export default function DinkumPage() {
	const resources = [
		{
			title: "Animals",
			description: "Browse all animals including wild, farm, and tamed varieties",
			icon: <FaOtter className="text-primary h-10 w-10" />,
			href: "/dinkum/animals",
		},
		{
			title: "Resources",
			description: "View all craftable materials, minerals, relics, and more",
			icon: <GiMineralPearls className="text-primary h-10 w-10" />,
			href: "/dinkum/resources",
		},
		{
			title: "Seeds",
			description: "Discover all plantable seeds and their growing requirements",
			icon: <FaSeedling className="text-primary h-10 w-10" />,
			href: "/dinkum/seeds",
		},
		{
			title: "Crops",
			description: "View all harvestable crops and their seasons",
			icon: <GiWheat className="text-primary h-10 w-10" />,
			href: "/dinkum/crops",
		},
		{
			title: "Flowers",
			description: "Browse all flowers and their growing locations",
			icon: <LuFlower2 className="text-primary h-10 w-10" />,
			href: "/dinkum/flowers",
		},
		{
			title: "Trees",
			description: "View all trees and their harvestable resources",
			icon: <FaTree className="text-primary h-10 w-10" />,
			href: "/dinkum/trees",
		},
	];

	return (
		<div className="p-6">
			<h1 className="text-primary mb-6 text-3xl font-bold">Dinkum Resources</h1>
			<p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
				Browse comprehensive information about all resources in the Dinkum game. Select a
				category below to explore.
			</p>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{resources.map((resource) => (
					<Card
						key={resource.title}
						className="transition-all duration-300 hover:shadow-lg"
					>
						<div className="flex h-full flex-col">
							<div className="mb-4 flex items-center gap-4">
								{resource.icon}
								<h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
									{resource.title}
								</h2>
							</div>
							<p className="mb-6 flex-grow text-gray-700 dark:text-gray-300">
								{resource.description}
							</p>
							<Button
								as={Link}
								href={resource.href}
								color="primary"
								className="w-full"
							>
								Browse {resource.title}
							</Button>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}