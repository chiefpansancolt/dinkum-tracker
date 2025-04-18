import React from "react";
import { DashboardProps } from "@/types/app";
import CollectionStats from "./CollectionStats";
import MilestoneStats from "./MilestoneStats";
import SkillStats from "./SkillStats";
import LicenseStats from "./LicenseStats";
import NPCStats from "./NPCStats";
import BuildingStats from "./BuildingStats";
import GameInfoCard from "./GameInfoCard";

const Dashboard: React.FC<DashboardProps> = ({ playthrough }) => {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
			<SkillStats skillLevels={playthrough.skillLevels} />

			<LicenseStats licenses={playthrough.licenses} />

			<MilestoneStats milestones={playthrough.milestones} />

			<CollectionStats
				collections={playthrough.collections}
				donations={playthrough.donations}
			/>

			<BuildingStats buildings={playthrough.buildings} />

			<NPCStats relationships={playthrough.relationships} />

			<GameInfoCard playthrough={playthrough} />
		</div>
	);
};

export default Dashboard;
