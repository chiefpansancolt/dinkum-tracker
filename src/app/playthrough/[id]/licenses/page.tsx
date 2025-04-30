"use client";

import { Badge } from "flowbite-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { License, Playthrough } from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { collectedFilter } from "@/data/constants";
import {
	getLicenseByCategory,
	getLicenseBySearchValue,
	getLicenseCategories,
	getLicenseTotalLevels,
	getLicenseTotalPermitPoints,
	licenses,
} from "@/data/dinkum";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import LicenseCard from "./LicenseCard";

export default function LicensesPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [categoryFilter, setCategoryFilter] = useState<string>("All");
	const [collectionFilter, setCollectionFilter] = useState<string>("All");
	const [localState, setLocalState] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	const filters = {
		category: {
			value: categoryFilter,
			options: getLicenseCategories(),
			label: "Category",
		},
		collection: {
			value: collectionFilter,
			options: collectedFilter,
			label: "Collected",
		},
	};

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setLocalState(data.licenses || {});
			}

			setIsLoading(false);

			const params = getQueryParams();
			if (params.q) {
				setSearchQuery(params.q);
			}
		}
	}, [playthroughId]);

	useEffect(() => {
		if (searchQuery) {
			setQueryParam("q", searchQuery);
		} else {
			setQueryParam("q", "");
		}
	}, [searchQuery]);

	const isPreviousLevelObtained = (licenseId: string, level: number) => {
		if (level === 1) return true;

		const previousLevel = level - 1;
		const previousLicenseKey = `${licenseId}_level_${previousLevel}`;

		return localState[previousLicenseKey] === true;
	};

	const handleToggleLicenseLevel = (licenseId: string, level: number, isObtained: boolean) => {
		const licenseKey = `${licenseId}_level_${level}`;

		setLocalState((prev) => {
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
		setLocalState((prev) => {
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
			return localState[licenseKey] === true;
		});
	};

	const handleSave = () => {
		if (!isDirty) return false;

		const success = updatePlaythroughData(playthroughId, {
			licenses: localState,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "category") {
			setCategoryFilter(value);
		} else if (name === "collection") {
			setCollectionFilter(value);
		}
	};

	const filteredLicenses = useMemo(() => {
		let filtered = [...licenses];

		if (categoryFilter !== "All") {
			filtered = getLicenseByCategory(filtered, categoryFilter);
		}

		if (collectionFilter !== "All") {
			if (collectionFilter === "collected") {
				filtered = filtered.filter((license) => {
					return license.levels.some((level) => {
						const licenseKey = `${license.id}_level_${level.level}`;
						return localState[licenseKey] === true;
					});
				});
			} else if (collectionFilter === "not_collected") {
				filtered = filtered.filter((license) => {
					return license.levels.every((level) => {
						const licenseKey = `${license.id}_level_${level.level}`;
						return !localState[licenseKey];
					});
				});
			}
		}

		if (searchQuery) {
			filtered = getLicenseBySearchValue(filtered, searchQuery);
		}

		return filtered;
	}, [categoryFilter, collectionFilter, localState, searchQuery]);

	const getCompletedLevels = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
	};

	const getSpentPermitPoints = () => {
		let spent = 0;
		licenses.forEach((license) => {
			license.levels.forEach((level) => {
				const licenseKey = `${license.id}_level_${level.level}`;
				if (localState[licenseKey]) {
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
					collectionTotal={getLicenseTotalLevels()}
					dirtyMessage="Your license progress has not been saved yet."
				/>

				<div className="mb-4">
					<div className="bg-secondary flex items-center justify-between rounded-lg p-4">
						<div>
							<h3 className="font-medium">Permit Points Spent</h3>
							<p className="text-sm">
								You&apos;ve spent {getSpentPermitPoints().toLocaleString()} of{" "}
								{getLicenseTotalPermitPoints().toLocaleString()} needed permit
								points.
							</p>
						</div>
						<Badge color="indigo" size="xl">
							<span className="flex items-center">
								{getSpentPermitPoints().toLocaleString()} /{" "}
								{getLicenseTotalPermitPoints().toLocaleString()}
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
					searchPlaceholder="Search licenses by name..."
				/>

				<FilterDetails
					title="licenses"
					filteredCount={filteredLicenses.length}
					totalCount={licenses.length}
					collectedLabel="Unlocked Levels"
					collectedCount={getCompletedLevels()}
				/>

				{filteredLicenses.length === 0 ? (
					<EmptyFilterCard />
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredLicenses.map((license) => (
							<LicenseCard
								key={license.id}
								license={license}
								licenseCollection={localState}
								isPreviousLevelObtained={isPreviousLevelObtained}
								onToggleLicenseLevel={handleToggleLicenseLevel}
								onToggleAllLevels={handleToggleAllLevels}
								areAllLevelsComplete={areAllLevelsComplete}
							/>
						))}
					</div>
				)}

				<SaveFAB isDirty={isDirty} onSave={handleSave} />
			</div>
		</>
	);
}
