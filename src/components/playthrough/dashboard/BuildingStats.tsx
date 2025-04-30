import { Badge, Card, Progress } from "flowbite-react";
import React, { useMemo } from "react";
import { HiOutlineHome, HiOutlineOfficeBuilding, HiOutlineShoppingBag } from "react-icons/hi";
import { CollectTabProps } from "@/types/dinkum";
import { getCollectableBuildings, getCollectableBuildingsCount } from "@/data/dinkum";

const BuildingStats: React.FC<CollectTabProps> = ({ collected }) => {
	const stats = useMemo(() => {
		const collectableBuildings = getCollectableBuildings();
		const totalBuildings = getCollectableBuildingsCount();

		const installedCount = Object.keys(collected).filter(
			(buildingId) => collected[buildingId]
		).length;

		const houseUpgradeCount = collectableBuildings.filter(
			(building) => building.id.includes("house_upgrade") && collected[building.id]
		).length;

		const shopCount = collectableBuildings.filter(
			(building) =>
				(building.id.includes("shop") ||
					/barn|lab|salon|greenhouse|threadspace|tuckerbox/i.test(building.id)) &&
				collected[building.id]
		).length;

		const townCount = collectableBuildings.filter(
			(building) => /hall|museum|bank|band/i.test(building.id) && collected[building.id]
		).length;

		const utilityCount = collectableBuildings.filter(
			(building) =>
				/mine|tower|pad|fountain|airport|bulletin/i.test(building.id) &&
				collected[building.id]
		).length;

		return {
			totalBuildings,
			installedCount,
			houseUpgradeCount,
			shopCount,
			townCount,
			utilityCount,
		};
	}, [collected]);

	const expensiveBuildings = useMemo(() => {
		return getCollectableBuildings()
			.sort((a, b) => b.deedPrice - a.deedPrice)
			.slice(0, 5);
	}, []);

	return (
		<Card className="flex h-full flex-col text-gray-900 dark:text-gray-50">
			<div className="flex h-full flex-col">
				<div className="flex-none">
					<h2 className="text-primary mb-4 text-xl font-bold">Buildings Progress</h2>
				</div>

				<div className="flex-grow overflow-auto">
					<div className="mb-6">
						<div className="mb-4 flex justify-between">
							<span className="text-lg font-medium">Overall Progress</span>
							<span className="font-medium text-gray-900 dark:text-gray-50">
								{stats.installedCount}/{stats.totalBuildings} Complete
							</span>
						</div>
						<Progress
							progress={Number((stats.installedCount / stats.totalBuildings) * 100)}
							size="lg"
							color="green"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
							<p className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-300">
								<HiOutlineHome className="h-5 w-5" />
								House Upgrades
							</p>
							<p className="text-2xl font-bold">{stats.houseUpgradeCount}</p>
						</div>

						<div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
							<p className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
								<HiOutlineShoppingBag className="h-5 w-5" />
								Shops
							</p>
							<p className="text-2xl font-bold">{stats.shopCount}</p>
						</div>

						<div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
							<p className="flex items-center gap-2 text-sm font-medium text-purple-700 dark:text-purple-300">
								<HiOutlineOfficeBuilding className="h-5 w-5" />
								Town Buildings
							</p>
							<p className="text-2xl font-bold">{stats.townCount}</p>
						</div>

						<div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
							<p className="flex items-center gap-2 text-sm font-medium text-orange-700 dark:text-orange-300">
								<HiOutlineOfficeBuilding className="h-5 w-5" />
								Utility Buildings
							</p>
							<p className="text-2xl font-bold">{stats.utilityCount}</p>
						</div>
					</div>

					<div className="mt-4">
						<h3 className="mb-2 text-base font-medium">Most Expensive Buildings</h3>
						<div className="space-y-2">
							{expensiveBuildings.map((building) => (
								<div
									key={building.id}
									className="flex items-center justify-between rounded-lg bg-gray-50 p-2 dark:bg-gray-800"
								>
									<div className="flex items-center">
										{building.img ? (
											<img
												src={building.img}
												alt={building.name}
												className="mr-2 h-6 w-6 object-contain"
											/>
										) : (
											<div className="mr-2 h-6 w-6 bg-gray-200 dark:bg-gray-700"></div>
										)}
										<span className="font-medium">{building.name}</span>
									</div>
									<Badge color="indigo">
										<span className="flex">
											<img
												src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
												alt="Dinks"
												className="mr-1 h-4 w-4"
											/>
											{building.deedPrice.toLocaleString()}
										</span>
									</Badge>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default BuildingStats;
