"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, Button, Badge, Progress, Modal, ModalHeader, ModalBody } from "flowbite-react";
import { deletePlaythrough } from "@/lib/localStorage";
import { PlaythroughCardProps } from "@/types";
import {
	HiOutlineCalendar,
	HiOutlineRefresh,
	HiOutlinePencil,
	HiOutlineTrash,
} from "react-icons/hi";
import { FaBug, FaFish, FaIdCard, FaAward, FaBuilding } from "react-icons/fa";
import { GiCrab } from "react-icons/gi";
import { getSeasonEmoji } from "@/service/seasonalTheme";
import {
	bugs,
	critters,
	fish,
	licenses,
	milestones,
	buildings,
	books,
	tools,
	weapons,
	equipment,
	vehicles,
	craftingRecipes,
	signWritingRecipes,
	cookingRecipes,
} from "@/data/dinkum";

export default function PlaythroughCard({ playthrough, onDelete }: PlaythroughCardProps) {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const formatDate = (dateString: string) => {
		if (!dateString) return "N/A";
		const date = new Date(dateString);
		return date.toLocaleDateString();
	};

	const formatRelativeDate = (dateString: string) => {
		if (!dateString) return "N/A";

		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - date.getTime());
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0) {
			return "Today";
		} else if (diffDays === 1) {
			return "Yesterday";
		} else if (diffDays < 7) {
			return `${diffDays} days ago`;
		} else if (diffDays < 30) {
			return `${Math.floor(diffDays / 7)} weeks ago`;
		} else {
			return `${Math.floor(diffDays / 30)} months ago`;
		}
	};

	const calculateProgress = () => {
		const fishCount = playthrough.collections.fish?.length || 0;
		const bugsCount = playthrough.collections.bugs?.length || 0;
		const crittersCount = playthrough.collections.critters?.length || 0;
		const totalPediaItems = fishCount + bugsCount + crittersCount;
		const licensesCount = Object.values(playthrough.licenses || {}).filter((v) => v).length;
		const milestonesCount = Object.values(playthrough.milestones || {}).filter((v) => v).length;
		const buildingsCount = Object.values(playthrough.buildings || {}).filter((v) => v).length;
		const cookingCount = Object.values(playthrough.cookingRecipes || {}).filter(
			(v) => v
		).length;
		const craftingCount = Object.values(playthrough.craftingRecipes || {}).filter(
			(v) => v
		).length;
		const signCount = Object.values(playthrough.signWritingRecipes || {}).filter(
			(v) => v
		).length;
		const totalRecipes = cookingCount + craftingCount + signCount;
		const booksCount = Object.values(playthrough.books || {}).filter((v) => v).length;
		const toolsCount = Object.values(playthrough.tools || {}).filter((v) => v).length;
		const weaponsCount = Object.values(playthrough.weapons || {}).filter((v) => v).length;
		const equipmentCount = Object.values(playthrough.equipment || {}).filter((v) => v).length;
		const vehiclesCount = Object.values(playthrough.vehicles || {}).filter((v) => v).length;
		const clothingCount = Object.values(playthrough.clothing || {}).filter((v) => v).length;
		const furnitureCount = Object.values(playthrough.furniture || {}).filter((v) => v).length;
		const totalFish = fish.length;
		const totalBugs = bugs.length;
		const totalCritters = critters.length;
		const totalPossiblePediaItems = totalFish + totalBugs + totalCritters;
		const totalLicenseLevels = licenses.reduce((total, license) => {
			return total + license.levels.length;
		}, 0);
		const totalMilestoneLevels = milestones.reduce((total, milestone) => {
			return total + milestone.levels.length;
		}, 0);
		const totalCollectableBuildings = buildings.filter(
			(building) => building.deedType === "Collectable"
		).length;
		const totalCookingRecipes = cookingRecipes.length;
		const totalCraftingRecipes = craftingRecipes.length;
		const totalSignWritingRecipes = signWritingRecipes.length;
		const totalPossibleRecipes =
			totalCookingRecipes + totalCraftingRecipes + totalSignWritingRecipes;
		const totalBooks = books.length;
		const totalTools = tools.length;
		const totalWeapons = weapons.length;
		const totalEquipment = equipment.length;
		const totalVehicles = vehicles.length;
		const totalPossibleCollectables =
			totalBooks + totalTools + totalWeapons + totalEquipment + totalVehicles;
		const pediaPercentage = Math.round((totalPediaItems / totalPossiblePediaItems) * 100) || 0;
		const licensesPercentage = Math.round((licensesCount / totalLicenseLevels) * 100) || 0;
		const milestonesPercentage =
			Math.round((milestonesCount / totalMilestoneLevels) * 100) || 0;
		const buildingsPercentage =
			Math.round((buildingsCount / totalCollectableBuildings) * 100) || 0;
		const totalTrackableItems =
			totalPossiblePediaItems +
			totalLicenseLevels +
			totalMilestoneLevels +
			totalCollectableBuildings +
			totalPossibleRecipes +
			totalPossibleCollectables;
		const totalCollectedItems =
			totalPediaItems +
			licensesCount +
			milestonesCount +
			buildingsCount +
			totalRecipes +
			booksCount +
			toolsCount +
			weaponsCount +
			equipmentCount +
			vehiclesCount +
			clothingCount +
			furnitureCount;
		const overallPercentage =
			Math.round((totalCollectedItems / totalTrackableItems) * 100) || 0;

		return {
			fishCount,
			bugsCount,
			crittersCount,
			licensesCount,
			milestonesCount,
			buildingsCount,
			totalFish,
			totalBugs,
			totalCritters,
			totalLicenseLevels,
			totalMilestoneLevels,
			totalCollectableBuildings,
			pediaPercentage,
			licensesPercentage,
			milestonesPercentage,
			buildingsPercentage,
			overallPercentage,
		};
	};

	const progress = calculateProgress();
	const season = playthrough.calendar?.currentSeason || "Summer";
	const day = playthrough.calendar?.currentDay || 1;

	const handleDelete = () => {
		setIsDeleting(true);
		deletePlaythrough(playthrough.id);
		onDelete();
		setOpenModal(false);
	};

	const handleEdit = () => {
		router.push(`/playthrough/${playthrough.id}`);
	};

	const getProgressColor = (value: number) => {
		if (value < 30) return "red";
		if (value < 70) return "yellow";
		return "green";
	};

	return (
		<>
			<Card className="border-b-accent dark:border-b-accent overflow-hidden border-b-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
				<div className="flex items-start justify-between">
					<div>
						<h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
							{playthrough.name}
						</h3>
						<div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
							<div className="flex items-center">
								<HiOutlineCalendar className="mr-1 h-4 w-4" />
								<span>Created: {formatDate(playthrough.createdAt)}</span>
							</div>
							<div className="ml-4 flex items-center">
								<HiOutlineRefresh className="mr-1 h-4 w-4" />
								<span>Updated: {formatRelativeDate(playthrough.lastUpdated)}</span>
							</div>
						</div>
					</div>
					<Badge
						color={getProgressColor(progress.overallPercentage)}
						size="lg"
						className="flex items-center gap-1"
					>
						{progress.overallPercentage}% Complete
					</Badge>
				</div>

				<div className="mt-2 flex items-center justify-between">
					<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
						Overall Progress
					</span>
					<span className="text-xs text-gray-500 dark:text-gray-400">
						{progress.overallPercentage}%
					</span>
				</div>
				<Progress
					progress={progress.overallPercentage}
					color={getProgressColor(progress.overallPercentage)}
					size="md"
				/>

				<div className="rounded-lg bg-gray-50 p-1 dark:bg-gray-800">
					<div className="mb-2 flex items-center justify-between">
						<div className="flex items-center gap-1">
							<span className="font-medium text-gray-900 dark:text-gray-50">
								Pedia Items
							</span>
							<Badge color="blue" size="xs">
								{progress.pediaPercentage}%
							</Badge>
						</div>
						<div className="flex gap-3">
							<div className="flex items-center gap-1">
								<FaFish className="h-4 w-4 text-blue-500" />
								<span className="text-xs font-medium text-gray-900 dark:text-gray-50">
									{progress.fishCount}/{progress.totalFish}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<FaBug className="h-4 w-4 text-red-500" />
								<span className="text-xs font-medium text-gray-900 dark:text-gray-50">
									{progress.bugsCount}/{progress.totalBugs}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<GiCrab className="h-4 w-4 text-purple-500" />
								<span className="text-xs font-medium text-gray-900 dark:text-gray-50">
									{progress.crittersCount}/{progress.totalCritters}
								</span>
							</div>
						</div>
					</div>
					<Progress progress={progress.pediaPercentage} color="blue" size="sm" />
				</div>

				<div className="rounded-lg bg-gray-50 p-1 dark:bg-gray-800">
					<div className="mb-2 flex items-center justify-between">
						<div className="flex items-center gap-1">
							<span className="font-medium text-gray-900 dark:text-gray-50">
								Licenses
							</span>
							<Badge color="indigo" size="xs">
								{progress.licensesPercentage}%
							</Badge>
						</div>
						<div className="flex items-center gap-1">
							<FaIdCard className="h-4 w-4 text-indigo-500" />
							<span className="text-xs font-medium text-gray-900 dark:text-gray-50">
								{progress.licensesCount}/{progress.totalLicenseLevels}
							</span>
						</div>
					</div>
					<Progress progress={progress.licensesPercentage} color="indigo" size="sm" />
				</div>

				<div className="rounded-lg bg-gray-50 p-1 dark:bg-gray-800">
					<div className="mb-2 flex items-center justify-between">
						<div className="flex items-center gap-1">
							<span className="font-medium text-gray-900 dark:text-gray-50">
								Milestones
							</span>
							<Badge color="green" size="xs">
								{progress.milestonesPercentage}%
							</Badge>
						</div>
						<div className="flex items-center gap-1">
							<FaAward className="h-4 w-4 text-green-500" />
							<span className="text-xs font-medium text-gray-900 dark:text-gray-50">
								{progress.milestonesCount}/{progress.totalMilestoneLevels}
							</span>
						</div>
					</div>
					<Progress progress={progress.milestonesPercentage} color="green" size="sm" />
				</div>

				<div className="rounded-lg bg-gray-50 p-1 dark:bg-gray-800">
					<div className="mb-2 flex items-center justify-between">
						<div className="flex items-center gap-1">
							<span className="font-medium text-gray-900 dark:text-gray-50">
								Buildings
							</span>
							<Badge color="yellow" size="xs">
								{progress.buildingsPercentage}%
							</Badge>
						</div>
						<div className="flex items-center gap-1">
							<FaBuilding className="h-4 w-4 text-yellow-500" />
							<span className="text-xs font-medium text-gray-900 dark:text-gray-50">
								{progress.buildingsCount}/{progress.totalCollectableBuildings}
							</span>
						</div>
					</div>
					<Progress progress={progress.buildingsPercentage} color="yellow" size="sm" />
				</div>

				<div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
					<div className="flex items-center">
						<span className="mr-2 text-xl">{getSeasonEmoji(season)}</span>
						<div>
							<div className="font-medium text-gray-900 dark:text-gray-50">
								Day {day}, {season}
							</div>
							<div className="text-xs text-gray-500 dark:text-gray-400">
								Current game date
							</div>
						</div>
					</div>
				</div>

				<div className="flex gap-2">
					<Button
						color="primary"
						onClick={handleEdit}
						className="flex-1 items-center gap-2"
					>
						<HiOutlinePencil className="h-4 w-4" />
						Manage Playthrough
					</Button>
					<Button
						color="red"
						onClick={() => setOpenModal(true)}
						className="px-3 focus:ring-red-300"
					>
						<HiOutlineTrash className="h-5 w-5" />
					</Button>
				</div>
			</Card>

			<Modal show={openModal} onClose={() => setOpenModal(false)} size="md" popup>
				<ModalHeader />
				<ModalBody>
					<div className="text-center">
						<HiOutlineTrash className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							Are you sure you want to delete this playthrough?
						</h3>
						<div className="flex justify-center gap-4">
							<Button color="red" onClick={handleDelete} disabled={isDeleting}>
								{isDeleting ? "Deleting..." : "Yes, delete it"}
							</Button>
							<Button color="gray" onClick={() => setOpenModal(false)}>
								No, cancel
							</Button>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</>
	);
}
