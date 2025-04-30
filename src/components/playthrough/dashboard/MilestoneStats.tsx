import { Badge, Card, Progress } from "flowbite-react";
import React, { useMemo } from "react";
import { CollectTabProps, Milestone } from "@/types";
import { milestones } from "@/data/dinkum";

const MilestoneStats: React.FC<CollectTabProps> = ({ collected }) => {
	const stats = useMemo(() => {
		const areAllLevelsComplete = (milestone: Milestone) => {
			return milestone.levels.every((level) => {
				const milestoneKey = `${milestone.id}_level_${level.level}`;
				return collected[milestoneKey] === true;
			});
		};

		const totalLevels = milestones.reduce(
			(total, milestone) => total + milestone.levels.length,
			0
		);

		const completedLevels = Object.keys(collected).filter((key) => collected[key]).length;

		const completedMilestones = milestones.filter((milestone) =>
			areAllLevelsComplete(milestone)
		).length;

		let totalPermitPoints = 0;
		let earnedPermitPoints = 0;

		milestones.forEach((milestone) => {
			milestone.levels.forEach((level) => {
				totalPermitPoints += level.permitPoints;

				const milestoneKey = `${milestone.id}_level_${level.level}`;
				if (collected[milestoneKey]) {
					earnedPermitPoints += level.permitPoints;
				}
			});
		});

		return {
			totalLevels,
			completedLevels,
			totalMilestones: milestones.length,
			completedMilestones,
			totalPermitPoints,
			earnedPermitPoints,
		};
	}, [collected]);

	return (
		<Card className="flex h-full flex-col text-gray-900 dark:text-gray-50">
			<div className="flex h-full flex-col">
				<div className="flex-none">
					<h2 className="text-primary mb-4 text-xl font-bold">Milestone Progress</h2>
				</div>

				<div className="flex-grow overflow-auto">
					<div className="mb-6">
						<div className="mb-4 flex justify-between">
							<span className="text-lg font-medium">Overall Progress</span>
							<span className="font-medium text-gray-900 dark:text-gray-50">
								{stats.completedMilestones}/{stats.totalMilestones} Complete
							</span>
						</div>
						<Progress
							progress={Math.round(
								(stats.completedMilestones / stats.totalMilestones) * 100
							)}
							size="lg"
							color="green"
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

					<div>
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
							<span className="text-sm text-gray-500 dark:text-gray-300">
								(
								{Math.round(
									(stats.earnedPermitPoints / stats.totalPermitPoints) * 100
								)}
								% earned)
							</span>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default MilestoneStats;
