"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Playthrough } from "@/types";
import { getPlaythroughById } from "@/lib/localStorage";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import CollectionStats from "@/playthrough/dashboard/CollectionStats";
import MilestoneStats from "@/playthrough/dashboard/MilestoneStats";
import SkillStats from "@/playthrough/dashboard/SkillStats";
import LicenseStats from "@/playthrough/dashboard/LicenseStats";
import NPCStats from "@/playthrough/dashboard/NPCStats";
import BuildingStats from "@/playthrough/dashboard/BuildingStats";
import GameInfoCard from "@/playthrough/dashboard/GameInfoCard";
import GearAndEquipmentStats from "@/playthrough/dashboard/GearAndEquipmentStats";
import RecipeStats from "@/playthrough/dashboard/RecipesStats";

export default function DashboardPage() {
	const params = useParams();
	const playthroughId = params?.id as string;
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);
			setIsLoading(false);
		}
	}, [playthroughId]);

	if (isLoading) {
		return <LoadingPlaythrough message="Loading dashboard..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<div>
			<BreadcrumbsComp name={playthrough.name} overview={true} />
			<div className="p-6">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
					<SkillStats collected={playthrough.skillLevels || {}} />

					<LicenseStats collected={playthrough.licenses || {}} />

					<MilestoneStats collected={playthrough.milestones || {}} />

					<CollectionStats
						collections={playthrough.collections}
						donations={playthrough.donations}
					/>

					<GearAndEquipmentStats
						bookCollection={playthrough.books || {}}
						toolCollection={playthrough.tools || {}}
						weaponCollection={playthrough.weapons || {}}
						equipmentCollection={playthrough.equipment || {}}
						vehicleCollection={playthrough.vehicles || {}}
					/>

					<BuildingStats collected={playthrough.buildings || {}} />

					<RecipeStats
						unlockedCookingRecipes={playthrough.cookingRecipes || {}}
						unlockedCraftingRecipes={playthrough.craftingRecipes || {}}
						unlockedSignwritingRecipes={playthrough.signWritingRecipes || {}}
					/>

					<NPCStats collected={playthrough.relationships || {}} />

					<GameInfoCard playthrough={playthrough} />
				</div>
			</div>
		</div>
	);
}
