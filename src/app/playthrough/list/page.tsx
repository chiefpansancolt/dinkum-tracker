"use client";

import LoadingPlaythrough from "@/components/playthrough/LoadingPlaythrough";
import EmptyFilterCard from "@/components/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/components/playthrough/ui/FilterBar";
import FilterDetails from "@/components/playthrough/ui/FilterDetails";
import { Button, Card } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Playthrough } from "@/types/app";
import { getDefaultSortPreference } from "@/lib/services/dataService";
import { getPlaythroughs } from "@/lib/storage";
import PlaythroughCard from "./Card";

const calculateCompletion = (playthrough: Playthrough): number => {
	const totalItems =
		Object.values(playthrough.collections).reduce((acc, curr) => acc + (curr.length || 0), 0) +
		Object.values(playthrough.milestones).length;

	const completedItems =
		Object.values(playthrough.collections).reduce((acc, curr) => acc + curr.length, 0) +
		Object.values(playthrough.milestones).filter((value) => value === true).length;

	if (totalItems === 0) return 0;
	return Math.round((completedItems / totalItems) * 100);
};

export default function PlaythroughsPage() {
	const [playthroughs, setPlaythroughs] = useState<Playthrough[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOption, setSortOption] = useState<string>("lastUpdated");
	const [filteredPlaythroughs, setFilteredPlaythroughs] = useState<Playthrough[]>([]);

	const sortPlaythroughs = useCallback(
		(playthroughsList: Playthrough[], sort: string): Playthrough[] => {
			const sorted = [...playthroughsList];

			switch (sort) {
				case "name":
					return sorted.sort((a, b) => a.name.localeCompare(b.name));
				case "createdAt":
					return sorted.sort(
						(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
				case "completion":
					return sorted.sort((a, b) => calculateCompletion(b) - calculateCompletion(a));
				case "lastUpdated":
				default:
					return sorted.sort(
						(a, b) =>
							new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
					);
			}
		},
		[]
	);

	useEffect(() => {
		if (typeof window !== "undefined") {
			getDefaultSortPreference().then((defaultSort) => {
				setSortOption(defaultSort);
			});

			getPlaythroughs().then((data) => {
				setPlaythroughs(data);
				setIsLoading(false);
			});
		}
	}, []);

	useEffect(() => {
		let result = [...playthroughs];

		if (searchQuery) {
			result = result.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
		}

		result = sortPlaythroughs(result, sortOption);

		setFilteredPlaythroughs(result);
	}, [playthroughs, searchQuery, sortOption, sortPlaythroughs]);

	const handleDelete = () => {
		getPlaythroughs().then((data) => {
			setPlaythroughs(data);
		});
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "sort") {
			setSortOption(value);
		}
	};

	const filters = {
		sort: {
			value: sortOption,
			options: [
				{ id: "lastUpdated", value: "Last Updated" },
				{ id: "name", value: "Name" },
				{ id: "createdAt", value: "Date Created" },
				{ id: "completion", value: "Completion" },
			],
			label: "Sort By",
		},
	};

	return (
		<div className="p-6">
			<div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
				<div>
					<h1 className="text-primary mb-2 text-3xl font-bold">My Playthroughs</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Manage your Dinkum adventures and track your progress
					</p>
				</div>
			</div>

			{filteredPlaythroughs.length > 0 && (
				<>
					<FilterBar
						showFilters={true}
						filters={filters}
						onFilterChange={handleFilterChange}
						showSearch={true}
						searchValue={searchQuery}
						onSearchChange={setSearchQuery}
						searchPlaceholder="Search playthroughs by name..."
					/>

					<div className="mt-4 mb-4">
						<FilterDetails
							title="Playthroughs"
							filteredCount={filteredPlaythroughs.length}
							totalCount={playthroughs.length}
						/>
					</div>
				</>
			)}

			{isLoading ? (
				<LoadingPlaythrough message="Loading Playthroughs..." />
			) : filteredPlaythroughs.length === 0 ? (
				searchQuery ? (
					<EmptyFilterCard />
				) : (
					<Card className="border-t-primary border-t-4 py-8 text-center">
						<div className="mx-auto max-w-md">
							<Image
								src="/dinkum_d_logo.png"
								alt="Dinkum Logo"
								className="mx-auto mb-6 h-20 w-20"
								width={80}
								height={80}
							/>
							<h2 className="mb-4 text-xl font-medium text-gray-700 dark:text-gray-300">
								No Playthroughs Found
							</h2>
							<p className="mb-6 text-gray-600 dark:text-gray-400">
								You haven&apos;t created any playthroughs yet. Start tracking your
								Dinkum adventure by creating your first playthrough!
							</p>
							<div className="flex justify-center">
								<Button
									as={Link}
									href="/playthrough/new"
									color="primary"
									size="lg"
									className="flex items-center gap-2"
								>
									<HiPlus className="h-5 w-5" />
									Create Your First Playthrough
								</Button>
							</div>
						</div>
					</Card>
				)
			) : (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredPlaythroughs.map((playthrough) => (
						<PlaythroughCard
							key={playthrough.id}
							playthrough={playthrough}
							onDelete={handleDelete}
						/>
					))}
				</div>
			)}
		</div>
	);
}
