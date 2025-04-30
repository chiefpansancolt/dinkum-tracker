import { Badge, Card, Progress } from "flowbite-react";
import React, { useMemo } from "react";
import { FaBook, FaTools } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { BsCassette } from "react-icons/bs";
import { GiBackpack, GiSwordman } from "react-icons/gi";
import { GearAndEquipmentStatsProps } from "@/types";
import { books, cassettes, equipment, tools, vehicles, weapons } from "@/data/dinkum";

const GearAndEquipmentStats: React.FC<GearAndEquipmentStatsProps> = ({
	bookCollection,
	toolCollection,
	weaponCollection,
	equipmentCollection,
	vehicleCollection,
	cassetteCollection,
}) => {
	const stats = useMemo(() => {
		return {
			books: {
				collected: Object.keys(bookCollection || {}).filter((key) => bookCollection[key])
					.length,
				total: books.length,
				percentage:
					Math.round(
						(Object.keys(bookCollection || {}).filter((key) => bookCollection[key])
							.length /
							books.length) *
							100
					) || 0,
			},
			tools: {
				collected: Object.keys(toolCollection || {}).filter((key) => toolCollection[key])
					.length,
				total: tools.length,
				percentage:
					Math.round(
						(Object.keys(toolCollection || {}).filter((key) => toolCollection[key])
							.length /
							tools.length) *
							100
					) || 0,
			},
			weapons: {
				collected: Object.keys(weaponCollection || {}).filter(
					(key) => weaponCollection[key]
				).length,
				total: weapons.length,
				percentage:
					Math.round(
						(Object.keys(weaponCollection || {}).filter((key) => weaponCollection[key])
							.length /
							weapons.length) *
							100
					) || 0,
			},
			equipment: {
				collected: Object.keys(equipmentCollection || {}).filter(
					(key) => equipmentCollection[key]
				).length,
				total: equipment.length,
				percentage:
					Math.round(
						(Object.keys(equipmentCollection || {}).filter(
							(key) => equipmentCollection[key]
						).length /
							equipment.length) *
							100
					) || 0,
			},
			vehicles: {
				collected: Object.keys(vehicleCollection || {}).filter(
					(key) => vehicleCollection[key]
				).length,
				total: vehicles.length,
				percentage:
					Math.round(
						(Object.keys(vehicleCollection || {}).filter(
							(key) => vehicleCollection[key]
						).length /
							vehicles.length) *
							100
					) || 0,
			},
			cassettes: {
				collected: Object.keys(cassetteCollection || {}).filter(
					(key) => cassetteCollection[key]
				).length,
				total: cassettes.length,
				percentage:
					Math.round(
						(Object.keys(cassetteCollection || {}).filter(
							(key) => cassetteCollection[key]
						).length /
							cassettes.length) *
							100
					) || 0,
			},
		};
	}, [
		bookCollection,
		toolCollection,
		weaponCollection,
		equipmentCollection,
		vehicleCollection,
		cassetteCollection,
	]);

	
	const totalStats = useMemo(() => {
		const totalCollected =
			stats.books.collected +
			stats.tools.collected +
			stats.weapons.collected +
			stats.equipment.collected +
			stats.vehicles.collected +
			stats.cassettes.collected;

		const totalItems =
			stats.books.total +
			stats.tools.total +
			stats.weapons.total +
			stats.equipment.total +
			stats.vehicles.total +
			stats.cassettes.total;

		return {
			collected: totalCollected,
			total: totalItems,
			percentage: Math.round((totalCollected / totalItems) * 100) || 0,
		};
	}, [stats]);

	const progressColorMap: Record<string, string> = {
		books: "indigo",
		tools: "blue",
		weapons: "red",
		equipment: "green",
		vehicles: "purple",
		cassettes: "yellow",
	};

	const mostCompleteCategory = useMemo(() => {
		const categories = Object.keys(stats) as Array<keyof typeof stats>;
		return categories.reduce(
			(prev, current) =>
				stats[current].percentage > stats[prev].percentage ? current : prev,
			categories[0]
		);
	}, [stats]);

	const leastCompleteCategory = useMemo(() => {
		const categories = Object.keys(stats) as Array<keyof typeof stats>;
		return categories.reduce(
			(prev, current) =>
				stats[current].percentage < stats[prev].percentage ? current : prev,
			categories[0]
		);
	}, [stats]);

	return (
		<Card className="flex h-full w-full flex-col text-gray-900 dark:text-gray-50">
			<div className="flex h-full flex-col">
				<div className="flex-none">
					<h2 className="text-primary mb-4 text-xl font-bold">Gear & Equipment</h2>
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
						</div>

						{Object.entries(stats).map(([category, data]) => (
							<div key={category}>
								<div className="mb-1 flex items-center justify-between">
									<span className="flex items-center gap-2 font-medium capitalize">
										{category === "books" && <FaBook className="h-4 w-4" />}
										{category === "tools" && <FaTools className="h-4 w-4" />}
										{category === "weapons" && (
											<GiSwordman className="h-4 w-4" />
										)}
										{category === "equipment" && (
											<GiBackpack className="h-4 w-4" />
										)}
										{category === "vehicles" && <FaCar className="h-4 w-4" />}
										{category === "cassettes" && (
											<BsCassette className="h-4 w-4" />
										)}
										{category} ({data.collected}/{data.total})
									</span>
									<span className="font-medium">{data.percentage}%</span>
								</div>
								<Progress
									progress={Number(data.percentage)}
									color={(progressColorMap[category] as string) || "gray"}
								/>
							</div>
						))}

						<div className="mt-4 grid grid-cols-2 gap-4">
							<div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
								<p className="text-sm font-medium text-green-700 dark:text-green-300">
									Most Complete
								</p>
								<div className="mt-1 flex items-center justify-between">
									<p className="text-lg font-bold capitalize">
										{mostCompleteCategory}
									</p>
									<Badge color={progressColorMap[mostCompleteCategory] as string}>
										{
											stats[mostCompleteCategory as keyof typeof stats]
												.percentage
										}
										%
									</Badge>
								</div>
							</div>

							<div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
								<p className="text-sm font-medium text-orange-700 dark:text-orange-300">
									Least Complete
								</p>
								<div className="mt-1 flex items-center justify-between">
									<p className="text-lg font-bold capitalize">
										{leastCompleteCategory}
									</p>
									<Badge
										color={progressColorMap[leastCompleteCategory] as string}
									>
										{
											stats[leastCompleteCategory as keyof typeof stats]
												.percentage
										}
										%
									</Badge>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default GearAndEquipmentStats;
