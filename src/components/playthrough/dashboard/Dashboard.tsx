import React from "react";
import { DashboardProps } from "@/types/app";
import CollectionStats from "./CollectionStats";
import MilestoneStats from "./MilestoneStats";
import SkillStats from "./SkillStats";
import LicenseStats from "./LicenseStats";
import NPCStats from "./NPCStats";
import BuildingStats from "./BuildingStats";
import GameInfoCard from "./GameInfoCard";
import GearAndEquipmentStats from "./GearAndEquipmentStats";
import RecipeStats from "./RecipesStats";

const Dashboard: React.FC<DashboardProps> = ({ playthrough }) => {
	return (
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
	);
};

export default Dashboard;
