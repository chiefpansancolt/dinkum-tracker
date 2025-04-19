/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Card, Label, TextInput, Select, Badge } from "flowbite-react";
import { relics } from "@/data/dinkum";
import { RelicLocations } from "@/data/constants";
import { RelicCardProps } from "@/types/dinkum";
import { HiSearch } from "react-icons/hi";

const RelicsTab: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [locationFilter, setLocationFilter] = useState<string>("All");

	const filteredRelics = React.useMemo(() => {
		return relics.filter((relic) => {
			if (
				searchQuery &&
				!relic.name.toLowerCase().includes(searchQuery.toLowerCase())
			) {
				return false;
			}

			if (locationFilter !== "All" && !relic.locations.includes(locationFilter)) {
				return false;
			}

			return true;
		});
	}, [searchQuery, locationFilter]);

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-primary mb-6 text-2xl font-bold">
					Relics
				</h1>
			</div>

			<div className="flex flex-col gap-4 md:flex-row">
				<div className="w-full md:w-1/3">
					<div className="mb-2 block">
						<Label htmlFor="location-filter">Location</Label>
					</div>
					<Select
						id="location-filter"
						value={locationFilter}
						onChange={(e) => setLocationFilter(e.target.value)}
					>
						<option value="All">All Locations</option>
						{RelicLocations.map((location) => (
							<option key={location} value={location}>
								{location}
							</option>
						))}
					</Select>
				</div>
				<div className="w-full md:w-2/3">
					<div className="mb-2 block">
						<Label htmlFor="search-relics">Search</Label>
					</div>
					<TextInput
						id="search-relics"
						type="text"
						icon={HiSearch}
						placeholder="Search by name..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			<div className="mb-4">
				<p className="text-primary font-medium">
					Showing {filteredRelics.length} of {relics.length} relics
				</p>
			</div>

			{filteredRelics.length === 0 ? (
				<Card className="py-8 text-center">
					<p className="text-gray-500 dark:text-gray-400">
						No relics match your filter criteria. Try adjusting your filters.
					</p>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{filteredRelics.map((relic) => (
						<RelicCard key={relic.id} relic={relic} />
					))}
				</div>
			)}
		</div>
	);
};

const RelicCard: React.FC<RelicCardProps> = ({ relic }) => {
	return (
		<Card className="h-full">
			<div className="flex h-full flex-col">
				<h3 className="text-primary mb-2 text-lg font-bold">{relic.name}</h3>

				<div className="my-4 flex items-center justify-center">
					{relic.img ? (
						<img
							src={relic.img}
							alt={relic.name}
							className="h-24 w-24 object-contain"
						/>
					) : (
						<div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
							<span className="text-gray-500 dark:text-gray-400">No image</span>
						</div>
					)}
				</div>

				<div className="mt-auto space-y-3">
					<div className="space-y-2">
						<p className="font-medium">Prices:</p>
						<div className="grid grid-cols-2 gap-2 text-sm">
							{relic.locations.includes("John's Goods") && relic.buyPrice && (
								<div className="flex items-center rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
									<span className="font-medium">Buy Price:</span>
									<span className="ml-2 flex items-center">
										<img
											src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
											alt="Dinks"
											className="mr-1 h-4 w-4"
										/>
										{relic.buyPrice.toLocaleString()}
									</span>
								</div>
							)}
							<div className="flex items-center rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
								<span className="font-medium">Sell:</span>
								<span className="ml-2 flex items-center">
									<img
										src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
										alt="Dinks"
										className="mr-1 h-4 w-4"
									/>
									{relic.baseSellPrice.toLocaleString()}
								</span>
							</div>
							<div className="flex items-center rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
								<span className="font-medium">John&apos;s:</span>
								<span className="ml-2 flex items-center">
									<img
										src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
										alt="Dinks"
										className="mr-1 h-4 w-4"
									/>
									{relic.johnsSellPrice.toLocaleString()}
								</span>
							</div>
							{relic.franklynsSellPrice && (
								<div className="flex items-center rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
									<span className="font-medium">Franklyn&apos;s:</span>
									<span className="ml-2 flex items-center">
										<img
											src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
											alt="Dinks"
											className="mr-1 h-4 w-4"
										/>
										{relic.franklynsSellPrice.toLocaleString()}
									</span>
								</div>
							)}
						</div>
					</div>

					<div>
						<p className="font-medium">Found in:</p>
						<div className="mt-1 flex flex-wrap gap-2">
							{relic.locations.map((location) => (
								<Badge
									key={`${relic.id}-${location}`}
									color="info"
								>
									{location}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default RelicsTab;