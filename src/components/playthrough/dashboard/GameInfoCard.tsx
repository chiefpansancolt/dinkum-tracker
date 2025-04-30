import { Card } from "flowbite-react";
import React from "react";
import { GameInfoCardProps } from "@/types";

const GameInfoCard: React.FC<GameInfoCardProps> = ({ playthrough }) => {
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
		<Card className="flex h-full flex-col text-gray-900 dark:text-gray-50">
			<div className="flex h-full flex-col">
				<div className="flex-none">
					<h2 className="text-primary mb-4 text-xl font-bold">Game Info</h2>
				</div>

				<div className="flex-grow overflow-auto">
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
								Last updated:{" "}
								{new Date(playthrough.lastUpdated).toLocaleDateString()}
							</p>
						</div>

						<div>
							<h3 className="font-medium">Milestones</h3>
							<p>{completedMilestones} completed</p>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default GameInfoCard;
