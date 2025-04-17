import React from "react";
import { DashboardProps } from "@/types/app";
import CollectionStats from "./CollectionStats";
import MilestoneStats from "./MilestoneStats";
import SkillStats from "./SkillStats";
import LicenseStats from "./LicenseStats";
import NPCStats from "./NPCStats";
import GameInfoCard from "./GameInfoCard";

const Dashboard: React.FC<DashboardProps> = ({ playthrough }) => {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
			<SkillStats skillLevels={playthrough.skillLevels} />

			<CollectionStats
				collections={playthrough.collections}
				donations={playthrough.donations}
			/>

			<MilestoneStats milestones={playthrough.milestones} />

			<LicenseStats licenses={playthrough.licenses || {}} />

			<NPCStats relationships={playthrough.relationships || {}} />

			<GameInfoCard playthrough={playthrough} />
		</div>
	);
};

export default Dashboard;
