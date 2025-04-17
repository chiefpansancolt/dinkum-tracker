/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react";
import { Card, Progress, Badge } from "flowbite-react";
import { milestones as milestoneData } from "@/data/dinkum/milestones";
import { Milestone, MilestoneStatsProps } from "@/types/dinkum";

const MilestoneStats: React.FC<MilestoneStatsProps> = ({ milestones }) => {
	const stats = useMemo(() => {
		const areAllLevelsComplete = (milestone: Milestone) => {
			return milestone.levels.every((level) => {
				const milestoneKey = `${milestone.id}_level_${level.level}`;
				return milestones[milestoneKey] === true;
			});
		};

		const totalLevels = milestoneData.reduce(
			(total, milestone) => total + milestone.levels.length,
			0
		);

		const completedLevels = Object.keys(milestones).filter(
			(key) => milestones[key]
		).length;

		const completedMilestones = milestoneData.filter((milestone) =>
			areAllLevelsComplete(milestone)
		).length;

		let totalPermitPoints = 0;
		let earnedPermitPoints = 0;

		milestoneData.forEach((milestone) => {
			milestone.levels.forEach((level) => {
				totalPermitPoints += level.permitPoints;

				const milestoneKey = `${milestone.id}_level_${level.level}`;
				if (milestones[milestoneKey]) {
					earnedPermitPoints += level.permitPoints;
				}
			});
		});

		return {
			totalLevels,
			completedLevels,
			totalMilestones: milestoneData.length,
			completedMilestones,
			totalPermitPoints,
			earnedPermitPoints,
		};
	}, [milestones]);

	return (
		<Card className="h-full">
			<h2 className="text-primary mb-4 text-xl font-bold">Milestone Progress</h2>

			<div className="mb-6">
				<div className="mb-4 flex justify-between">
					<span className="text-lg font-medium">Overall Progress</span>
					<span className="text-accent font-medium">
						{stats.completedMilestones}/{stats.totalMilestones} Complete
					</span>
				</div>
				<Progress
					progress={Math.round((stats.completedMilestones / stats.totalMilestones) * 100)}
					size="lg"
					color="success"
				/>

				<div className="mt-4 flex justify-between">
					<span className="text-sm font-medium">Levels</span>
					<span className="text-sm font-medium">
						{stats.completedLevels}/{stats.totalLevels} (
						{Math.round((stats.completedLevels / stats.totalLevels) * 100)}%)
					</span>
				</div>
				<Progress
					progress={Math.round((stats.completedLevels / stats.totalLevels) * 100)}
					size="md"
					color="blue"
				/>
			</div>

			<div className="mb-4">
				<h3 className="mb-2 text-lg font-medium">Permit Points</h3>
				<div className="flex items-center gap-2">
					<Badge color="primary" size="lg">
						<span className="flex items-center">
							{stats.earnedPermitPoints.toLocaleString()} /{" "}
							{stats.totalPermitPoints.toLocaleString()}{" "}
							<img
								src="https://static.wikia.nocookie.net/dinkum/images/9/97/Permit_Points.png"
								alt="Permit Points"
								className="inlinde ml-2 w-7"
							/>
						</span>
					</Badge>
					<span className="text-sm text-gray-500">
						({Math.round((stats.earnedPermitPoints / stats.totalPermitPoints) * 100)}%
						earned)
					</span>
				</div>
			</div>
		</Card>
	);
};

export default MilestoneStats;
