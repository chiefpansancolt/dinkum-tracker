import React, { useMemo } from "react";
import { Card, Progress, Badge } from "flowbite-react";
import { cookingRecipes, craftingRecipes, signWritingRecipes } from "@/data/dinkum";
import { RecipeStatsProps } from "@/types";
import { LuCookingPot } from "react-icons/lu";
import { GiStoneCrafting, GiPaintBrush } from "react-icons/gi";

const RecipeStats: React.FC<RecipeStatsProps> = ({
	unlockedCookingRecipes,
	unlockedCraftingRecipes,
	unlockedSignwritingRecipes,
}) => {
	const stats = useMemo(() => {
		return {
			cooking: {
				unlocked: Object.keys(unlockedCookingRecipes).filter(
					(key) => unlockedCookingRecipes[key]
				).length,
				total: cookingRecipes.length,
				percentage:
					Math.round(
						(Object.keys(unlockedCookingRecipes).filter(
							(key) => unlockedCookingRecipes[key]
						).length /
							cookingRecipes.length) *
							100
					) || 0,
			},
			crafting: {
				unlocked: Object.keys(unlockedCraftingRecipes).filter(
					(key) => unlockedCraftingRecipes[key]
				).length,
				total: craftingRecipes.length,
				percentage:
					Math.round(
						(Object.keys(unlockedCraftingRecipes).filter(
							(key) => unlockedCraftingRecipes[key]
						).length /
							craftingRecipes.length) *
							100
					) || 0,
			},
			signwriting: {
				unlocked: Object.keys(unlockedSignwritingRecipes).filter(
					(key) => unlockedSignwritingRecipes[key]
				).length,
				total: signWritingRecipes.length,
				percentage:
					Math.round(
						(Object.keys(unlockedSignwritingRecipes).filter(
							(key) => unlockedSignwritingRecipes[key]
						).length /
							signWritingRecipes.length) *
							100
					) || 0,
			},
		};
	}, [unlockedCookingRecipes, unlockedCraftingRecipes, unlockedSignwritingRecipes]);

	const totalStats = useMemo(() => {
		const totalUnlocked =
			stats.cooking.unlocked + stats.crafting.unlocked + stats.signwriting.unlocked;

		const totalItems = stats.cooking.total + stats.crafting.total + stats.signwriting.total;

		return {
			unlocked: totalUnlocked,
			total: totalItems,
			percentage: Math.round((totalUnlocked / totalItems) * 100) || 0,
		};
	}, [stats]);

	const progressColorMap: Record<string, string> = {
		cooking: "orange",
		crafting: "blue",
		signwriting: "purple",
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
		<Card className="flex h-full w-full flex-col">
			<div className="flex h-full flex-col">
				<div className="flex-none">
					<h2 className="text-primary mb-4 text-xl font-bold">Recipe Collection</h2>
				</div>

				<div className="flex-grow overflow-auto">
					<div className="space-y-5">
						<div>
							<div className="mb-1 flex justify-between">
								<span className="font-medium">
									Overall Progress ({totalStats.unlocked}/{totalStats.total})
								</span>
								<span className="font-medium">{totalStats.percentage}%</span>
							</div>
							<Progress progress={Number(totalStats.percentage)} color="green" />
						</div>

						{Object.entries(stats).map(([category, data]) => (
							<div key={category}>
								<div className="mb-1 flex items-center justify-between">
									<span className="flex items-center gap-2 font-medium capitalize">
										{category === "cooking" && (
											<LuCookingPot className="h-4 w-4" />
										)}
										{category === "crafting" && (
											<GiStoneCrafting className="h-4 w-4" />
										)}
										{category === "signwriting" && (
											<GiPaintBrush className="h-4 w-4" />
										)}
										{category} ({data.unlocked}/{data.total})
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

export default RecipeStats;
