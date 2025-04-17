import React from "react";
import { Card } from "flowbite-react";
import { DashboardProps } from "@/types/app";
import CollectionStats from "./CollectionStats";
import MilestoneStats from "./MilestoneStats";
import SkillStats from "./SkillStats";

const Dashboard: React.FC<DashboardProps> = ({ playthrough }) => {
	const daysSinceCreation = () => {
		if (!playthrough.createdAt) return 0;

		const creationDate = new Date(playthrough.createdAt);
		const currentDate = new Date();
		const diffTime = Math.abs(currentDate.getTime() - creationDate.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		return diffDays;
	};

	const getGameCalendarInfo = () => {
		if (!playthrough.calendar) {
			return { day: 1, season: "Summer" };
		}

		return {
			day: playthrough.calendar.currentDay,
			season: playthrough.calendar.currentSeason,
		};
	};

	const getMilestoneCompletion = () => {
		const completedMilestones = Object.values(playthrough.milestones).filter(
			(value) => value
		).length;
		return completedMilestones;
	};

	const calendarInfo = getGameCalendarInfo();
	const daysPlayed = daysSinceCreation();
	const completedMilestones = getMilestoneCompletion();

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
			<div className="md:col-span-2 xl:col-span-3">
				<Card className="bg-accent/10">
					<h2 className="text-primary text-2xl font-bold">{playthrough.name}</h2>
					<p className="text-gray-600 dark:text-gray-400">
						Tracking your Dinkum adventure since{" "}
						{new Date(playthrough.createdAt).toLocaleDateString()}
					</p>
				</Card>
			</div>

			<SkillStats skillLevels={playthrough.skillLevels} />

			<CollectionStats
				collections={playthrough.collections}
				donations={playthrough.donations}
			/>

			<MilestoneStats milestones={playthrough.milestones} />

			<Card>
				<h2 className="text-primary mb-4 text-xl font-bold">Game Info</h2>
				<div className="space-y-4">
					<div>
						<h3 className="font-medium">Game Calendar</h3>
						<p className="text-lg">
							Day {calendarInfo.day}, {calendarInfo.season}
						</p>
					</div>

					<div>
						<h3 className="font-medium">Real-world Tracking</h3>
						<p>Days since creation: {daysPlayed}</p>
						<p>
							Last updated: {new Date(playthrough.lastUpdated).toLocaleDateString()}
						</p>
					</div>

					<div>
						<h3 className="font-medium">Milestones</h3>
						<p>{completedMilestones} completed</p>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Dashboard;
