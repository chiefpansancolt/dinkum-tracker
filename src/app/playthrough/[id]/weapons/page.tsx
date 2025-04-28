"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { weapons } from "@/data/dinkum";
import { Playthrough } from "@/types";
import TabHeader from "@/playthrough/ui/TabHeader";
import WeaponCard from "./WeaponCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";

export default function WeaponsPage() {
	const params = useParams();
	const playthroughId = params?.id as string;
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [damageFilter, setDamageFilter] = useState<string>("All");
	const [weaponCollection, setWeaponCollection] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	const uniqueSources = useMemo(() => {
		const sources = new Set<string>();
		weapons.forEach((weapon) => {
			if (weapon.source && weapon.source.length > 0) {
				weapon.source.forEach((src) => {
					sources.add(src);
				});
			}
		});
		return ["All", ...Array.from(sources).sort()];
	}, []);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setWeaponCollection(data.weapons || {});
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

	const handleToggleCollected = (id: string, isCollected: boolean) => {
		setWeaponCollection((prev) => {
			if (prev[id] !== isCollected) {
				setIsDirty(true);
			}
			return {
				...prev,
				[id]: isCollected,
			};
		});
	};

	const handleSave = () => {
		if (!isDirty) return false;

		const success = updatePlaythroughData(playthroughId, {
			weapons: weaponCollection,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const filters = {
		source: {
			value: sourceFilter,
			options: uniqueSources,
			label: "Source",
		},
		damage: {
			value: damageFilter,
			options: ["All", "High", "Medium", "Low"],
			label: "Damage",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "source") {
			setSourceFilter(value);
		} else if (name === "damage") {
			setDamageFilter(value);
		}
	};

	const filteredWeapons = useMemo(() => {
		return weapons.filter((weapon) => {
			if (sourceFilter !== "All" && !weapon.source.includes(sourceFilter)) {
				return false;
			}

			if (damageFilter !== "All") {
				if (damageFilter === "High" && (weapon.damage === null || weapon.damage < 20)) {
					return false;
				}
				if (
					damageFilter === "Medium" &&
					(weapon.damage === null || weapon.damage < 10 || weapon.damage >= 20)
				) {
					return false;
				}
				if (damageFilter === "Low" && (weapon.damage === null || weapon.damage >= 10)) {
					return false;
				}
			}

			if (searchQuery && !weapon.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [sourceFilter, damageFilter, searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(weaponCollection).filter((key) => weaponCollection[key]).length;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading weapons..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Weapons" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Weapons"
					collectionName="Collected"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={getCollectedCount()}
					collectionTotal={weapons.length}
					dirtyMessage="Your weapons collection has not been saved yet."
				/>

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search by name..."
				/>

				<FilterDetails
					title="weapons"
					filteredCount={filteredWeapons.length}
					totalCount={weapons.length}
					collectedLabel="Collected"
					collectedCount={getCollectedCount()}
				/>

				{filteredWeapons.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{filteredWeapons.map((weapon) => (
							<WeaponCard
								key={weapon.id}
								record={weapon}
								isCollected={weaponCollection[weapon.id] || false}
								onToggleCollected={handleToggleCollected}
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
