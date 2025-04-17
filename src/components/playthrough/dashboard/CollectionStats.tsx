import React, { useMemo } from "react";
import { Card, Progress } from "flowbite-react";
import { critters } from "@/data/dinkum/pedia/critters";
import { fish } from "@/data/dinkum/pedia/fish";
import { bugs } from "@/data/dinkum/pedia/bugs";
import { CollectionStatsProps } from "@/types/ui";

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

		return {
			collected: totalCollected,
			total: totalItems,
			percentage: Math.round((totalCollected / totalItems) * 100) || 0,
			donated: totalDonated,
			donationPercentage: Math.round((totalDonated / totalItems) * 100) || 0,
		};
	}, [stats, donations]);

	const progressColorMap: Record<string, string> = {
		fish: "blue",
		bugs: "red",
		critters: "purple",
	};

	return (
		<Card className="w-full">
			<h2 className="text-primary mb-4 text-xl font-bold">Pedia Progress</h2>

			<div className="space-y-5">
				<div>
					<div className="mb-1 flex justify-between">
						<span className="font-medium">
							Overall Progress ({totalStats.collected}/{totalStats.total})
						</span>
						<span className="font-medium">{totalStats.percentage}%</span>
					</div>
					<Progress progress={totalStats.percentage} color="blue" />

					<div className="mt-1 mb-1 flex justify-between">
						<span className="text-sm text-gray-500">
							Museum Donations ({totalStats.donated}/{totalStats.total})
						</span>
						<span className="text-sm text-gray-500">
							{totalStats.donationPercentage}%
						</span>
					</div>
					<Progress progress={totalStats.donationPercentage} color="indigo" size="sm" />
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
							progress={data.percentage}
							color={(progressColorMap[category] as string) || "gray"}
						/>

						<div className="mt-1 mb-1 flex justify-between">
							<span className="text-sm text-gray-500">
								Donated ({data.donated}/{data.total})
							</span>
							<span className="text-sm text-gray-500">
								{data.donationPercentage}%
							</span>
						</div>
						<Progress
							progress={data.donationPercentage}
							color={(progressColorMap[category] as string) || "gray"}
							size="sm"
						/>
					</div>
				))}
			</div>
		</Card>
	);
};

export default CollectionStats;
