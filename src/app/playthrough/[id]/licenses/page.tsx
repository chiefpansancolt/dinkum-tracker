/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { licenses } from "@/data/dinkum";
import { Playthrough, License } from "@/types";
import TabHeader from "@/playthrough/ui/TabHeader";
import LicenseCard from "./LicenseCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";
import { Badge } from "flowbite-react";

export default function LicensesPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [categoryFilter, setCategoryFilter] = useState<string>("All Licenses");
	const [licenseCollection, setLicenseCollection] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setLicenseCollection(data.licenses || {});
			}

			setIsLoading(false);

			const hashParams = getHashQueryParams();
			if (hashParams.q) {
				setSearchQuery(hashParams.q);
			}
		}
	}, [playthroughId]);

	useEffect(() => {
		if (searchQuery) {
			setHashQueryParam("q", searchQuery);
		} else {
			setHashQueryParam("q", "");
		}
	}, [searchQuery]);

	const isPreviousLevelObtained = (licenseId: string, level: number) => {
		if (level === 1) return true;

		const previousLevel = level - 1;
		const previousLicenseKey = `${licenseId}_level_${previousLevel}`;

		return licenseCollection[previousLicenseKey] === true;
	};

	const handleToggleLicenseLevel = (licenseId: string, level: number, isObtained: boolean) => {
		const licenseKey = `${licenseId}_level_${level}`;

		setLicenseCollection((prev) => {
			if (isObtained && level > 1 && !isPreviousLevelObtained(licenseId, level)) {
				return prev;
			}

			const updates: Record<string, boolean> = {
				[licenseKey]: isObtained,
			};

			if (!isObtained) {
				const license = licenses.find((l) => l.id === licenseId);
				if (license) {
					license.levels.forEach((l) => {
						if (l.level > level) {
							const higherLevelKey = `${licenseId}_level_${l.level}`;
							updates[higherLevelKey] = false;
						}
					});
				}
			}

			const newState = { ...prev, ...updates };

			if (JSON.stringify(prev) !== JSON.stringify(newState)) {
				setIsDirty(true);
			}

			return newState;
		});
	};

	const handleToggleAllLevels = (license: License, obtainAll: boolean) => {
		setLicenseCollection((prev) => {
			const updates: Record<string, boolean> = {};

			if (obtainAll) {
				license.levels.forEach((level) => {
					const licenseKey = `${license.id}_level_${level.level}`;
					updates[licenseKey] = true;
				});
			} else {
				license.levels.forEach((level) => {
					const licenseKey = `${license.id}_level_${level.level}`;
					updates[licenseKey] = false;
				});
			}

			const newState = { ...prev, ...updates };

			if (JSON.stringify(prev) !== JSON.stringify(newState)) {
				setIsDirty(true);
			}

			return newState;
		});
	};

	const areAllLevelsComplete = (license: License) => {
		return license.levels.every((level) => {
			const licenseKey = `${license.id}_level_${level.level}`;
			return licenseCollection[licenseKey] === true;
		});
	};

	const handleSave = () => {
		if (!isDirty) return false;

		const success = updatePlaythroughData(playthroughId, {
			licenses: licenseCollection,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const filters = {
		category: {
			value: categoryFilter,
			options: [
				"All Licenses",
				"Mining",
				"Fishing",
				"Farming",
				"Logging",
				"Hunting",
				"Building",
				"Vehicle",
				"Commerce",
			],
			label: "Category",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "category") {
			setCategoryFilter(value);
		}
	};

	const filteredLicenses = useMemo(() => {
		return licenses.filter((license) => {
			if (categoryFilter !== "All Licenses") {
				if (!license.id.includes(categoryFilter.toLowerCase())) {
					return false;
				}
			}

			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				return (
					license.name.toLowerCase().includes(query) ||
					license.requirements.toLowerCase().includes(query)
				);
			}

			return true;
		});
	}, [categoryFilter, searchQuery]);

	const getTotalLevels = () => {
		return licenses.reduce((total, license) => total + license.levels.length, 0);
	};

	const getCompletedLevels = () => {
		return Object.keys(licenseCollection).filter((key) => licenseCollection[key]).length;
	};

	const getTotalPermitPoints = () => {
		let total = 0;
		licenses.forEach((license) => {
			license.levels.forEach((level) => {
				total += level.permitPointCost;
			});
		});
		return total;
	};

	const getSpentPermitPoints = () => {
		let spent = 0;
		licenses.forEach((license) => {
			license.levels.forEach((level) => {
				const licenseKey = `${license.id}_level_${level.level}`;
				if (licenseCollection[licenseKey]) {
					spent += level.permitPointCost;
				}
			});
		});
		return spent;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading licenses..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Licenses" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Licenses"
					collectionName="levels obtained"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={getCompletedLevels()}
					collectionTotal={getTotalLevels()}
					dirtyMessage="Your license progress has not been saved yet."
				/>

				<div className="mb-4">
					<div className="bg-secondary flex items-center justify-between rounded-lg p-4">
						<div>
							<h3 className="font-medium">Permit Points Spent</h3>
							<p className="text-sm">
								You&apos;ve spent {getSpentPermitPoints().toLocaleString()} of{" "}
								{getTotalPermitPoints().toLocaleString()} needed permit points.
							</p>
						</div>
						<Badge color="indigo" size="xl">
							<span className="flex items-center">
								{getSpentPermitPoints().toLocaleString()} /{" "}
								{getTotalPermitPoints().toLocaleString()}
								<img
									src="https://static.wikia.nocookie.net/dinkum/images/9/97/Permit_Points.png"
									alt="Permit Points"
									className="ml-2 w-7"
								/>
							</span>
						</Badge>
					</div>
				</div>

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search licenses by name or requirement..."
				/>

				<FilterDetails
					title="licenses"
					filteredCount={filteredLicenses.length}
					totalCount={licenses.length}
					collectedLabel="Unlocked Levels"
					collectedCount={getCompletedLevels()}
				/>

				{filteredLicenses.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredLicenses.map((license) => (
							<LicenseCard
								key={license.id}
								license={license}
								licenseCollection={licenseCollection}
								isPreviousLevelObtained={isPreviousLevelObtained}
								onToggleLicenseLevel={handleToggleLicenseLevel}
								onToggleAllLevels={handleToggleAllLevels}
								areAllLevelsComplete={areAllLevelsComplete}
							/>
						))}
					</div>
				) : (
					<EmptyFilterCard />
				)}

				<SaveFAB isDirty={isDirty} onSave={handleSave} />
			</div>
		</>
	);
}
