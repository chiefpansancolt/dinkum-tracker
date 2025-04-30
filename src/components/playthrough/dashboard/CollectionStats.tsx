import { Badge, Card, Progress } from "flowbite-react";
import React, { useMemo } from "react";
import { CollectionStatsProps } from "@/types";
import { bugs, critters, fish } from "@/data/dinkum";

const CollectionStats: React.FC<CollectionStatsProps> = ({ collections, donations }) => {
	const stats = useMemo(() => {
		return {
			fish: {
				collected: collections.fish.length,
				total: fish.length,
				percentage: Math.round((collections.fish.length / fish.length) * 100) || 0,
				donated: donations?.fish.length || 0,
				donationPercentage:
					Math.round(((donations?.fish.length || 0) / fish.length) * 100) || 0,
			},
			bugs: {
				collected: collections.bugs.length,
				total: bugs.length,
				percentage: Math.round((collections.bugs.length / bugs.length) * 100) || 0,
				donated: donations?.bugs.length || 0,
				donationPercentage:
					Math.round(((donations?.bugs.length || 0) / bugs.length) * 100) || 0,
			},
			critters: {
				collected: collections.critters?.length || 0,
				total: critters.length,
				percentage:
					Math.round(((collections.critters?.length || 0) / critters.length) * 100) || 0,
				donated: donations?.critters.length || 0,
				donationPercentage:
					Math.round(((donations?.critters.length || 0) / critters.length) * 100) || 0,
			},
		};
	}, [collections, donations]);

	const totalStats = useMemo(() => {
		const totalCollected =
			stats.fish.collected + stats.bugs.collected + stats.critters.collected;

		const totalItems = stats.fish.total + stats.bugs.total + stats.critters.total;

		const totalDonated =
			(donations?.fish.length || 0) +
			(donations?.bugs.length || 0) +
			(donations?.critters.length || 0);

		const totalPossiblePermitPoints = totalItems * 100;
		const earnedPermitPoints = totalDonated * 100;
		const permitPointsPercentage =
			totalPossiblePermitPoints > 0
				? Math.round((earnedPermitPoints / totalPossiblePermitPoints) * 100)
				: 0;

		return {
			collected: totalCollected,
			total: totalItems,
			percentage: Math.round((totalCollected / totalItems) * 100) || 0,
			donated: totalDonated,
			donationPercentage: Math.round((totalDonated / totalItems) * 100) || 0,
			totalPossiblePermitPoints,
			earnedPermitPoints,
			permitPointsPercentage,
		};
	}, [stats, donations]);

	const progressColorMap: Record<string, string> = {
		fish: "blue",
		bugs: "red",
		critters: "purple",
	};

	return (
		<Card className="flex h-full w-full flex-col text-gray-900 dark:text-gray-50">
			<div className="flex h-full flex-col">
				<div className="flex-none">
					<h2 className="text-primary mb-4 text-xl font-bold">Pedia Progress</h2>
				</div>

				<div className="flex-grow overflow-auto">
					<div className="space-y-5">
						<div>
							<div className="mb-1 flex justify-between">
								<span className="font-medium">
									Overall Progress ({totalStats.collected}/{totalStats.total})
								</span>
								<span className="font-medium">{totalStats.percentage}%</span>
							</div>
							<Progress progress={Number(totalStats.percentage)} color="blue" />

							<div className="mt-1 mb-1 flex justify-between">
								<span className="text-sm text-gray-500 dark:text-gray-300">
									Museum Donations ({totalStats.donated}/{totalStats.total})
								</span>
								<span className="text-sm text-gray-500 dark:text-gray-300">
									{totalStats.donationPercentage}%
								</span>
							</div>
							<Progress
								progress={Number(totalStats.donationPercentage)}
								color="indigo"
								size="sm"
							/>
						</div>

						{Object.entries(stats).map(([category, data]) => (
							<div key={category}>
								<div className="mb-1 flex justify-between">
									<span className="font-medium capitalize">
										{category} ({data.collected}/{data.total})
									</span>
									<span className="font-medium">{data.percentage}%</span>
								</div>
								<Progress
									progress={Number(data.percentage)}
									color={(progressColorMap[category] as string) || "gray"}
								/>

								<div className="mt-1 mb-1 flex justify-between">
									<span className="text-sm text-gray-500 dark:text-gray-300">
										Donated ({data.donated}/{data.total})
									</span>
									<span className="text-sm text-gray-500 dark:text-gray-300">
										{data.donationPercentage}%
									</span>
								</div>
								<Progress
									progress={Number(data.donationPercentage)}
									color={(progressColorMap[category] as string) || "gray"}
									size="sm"
								/>
							</div>
						))}

						<div className="mt-4">
							<h3 className="mb-2 text-lg font-medium">Permit Points</h3>
							<div className="flex items-center gap-2">
								<Badge color="primary" size="lg">
									<span className="flex items-center">
										{totalStats.earnedPermitPoints.toLocaleString()} /{" "}
										{totalStats.totalPossiblePermitPoints.toLocaleString()}{" "}
										<img
											src="https://static.wikia.nocookie.net/dinkum/images/9/97/Permit_Points.png"
											alt="Permit Points"
											className="ml-2 w-7"
										/>
									</span>
								</Badge>
								<span className="text-sm text-gray-500 dark:text-gray-300">
									({totalStats.permitPointsPercentage}% earned)
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default CollectionStats;
