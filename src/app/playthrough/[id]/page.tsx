"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import {
	Spinner,
	Breadcrumb,
	BreadcrumbItem,
	Sidebar,
	SidebarItem,
	SidebarItemGroup,
	SidebarItems,
	SidebarCollapse,
	SidebarLogo,
} from "flowbite-react";
import { getPlaythroughById } from "@/lib/localStorage";
import CollectionsTab from "./components/CollectionsTab";
import CalendarTab from "./components/CalendarTab";
import MilestonesTab from "./components/MilestonesTab";
import SkillsTab from "./components/SkillsTab";
import LicensesTab from "./components/LicensesTab";
import NPCsTab from "./components/NPCsTab";
import BuildingsTab from "./components/BuildingsTab";
import {
	CollectionsTabHandle,
	CalendarTabHandle,
	MilestonesTabHandle,
	SkillsTabHandle,
	LicensesTabHandle,
	NPCsTabHandle,
	BuildingsTabHandle,
} from "@/types/dinkum";
import { Playthrough } from "@/types/app";
import { ActiveTab } from "@/data/constants";
import NotFoundCard from "@/comps/NotFoundCard";
import Dashboard from "@/playthrough/dashboard/Dashboard";
import { errorToast, successToast } from "@/lib/notifications";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import {
	FaFish,
	FaBug,
	FaCalendarDays,
	FaUsers,
	FaIdCard,
	FaBuildingColumns,
	FaBuilding,
	FaAward,
	FaReceipt,
	FaBook,
	FaCar,
	FaCouch,
	FaKey,
	FaBoxOpen,
} from "react-icons/fa6";
import { HiHome, HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { FaTools, FaRegSave, FaToolbox, FaAppleAlt } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { LuCookingPot } from "react-icons/lu";
import {
	GiBackpack,
	GiClothes,
	GiMineralPearls,
	GiPartyPopper,
	GiSofa,
	GiStoneCrafting,
	GiSwordman,
	GiWheat,
} from "react-icons/gi";

export default function PlaythroughPage() {
	const params = useParams();
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.Overview);

	const calendarRef = useRef<CalendarTabHandle>(null);
	const collectionsRef = useRef<CollectionsTabHandle>(null);
	const milestonesRef = useRef<MilestonesTabHandle>(null);
	const skillsRef = useRef<SkillsTabHandle>(null);
	const licensesRef = useRef<LicensesTabHandle>(null);
	const npcsRef = useRef<NPCsTabHandle>(null);
	const buildingsRef = useRef<BuildingsTabHandle>(null);

	useEffect(() => {
		const handleHashChange = () => {
			const hash = window.location.hash.replace("#", "");
			if (hash && Object.values(ActiveTab).includes(hash as ActiveTab)) {
				setActiveTab(hash as ActiveTab);
			}
		};

		handleHashChange();

		window.addEventListener("hashchange", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	useEffect(() => {
		if (typeof params.id !== "string") {
			setIsLoading(false);
			return;
		}

		setPlaythrough(getPlaythroughById(params.id));
		setIsLoading(false);
	}, [params.id]);

	const handleSetActiveTab = (tab: ActiveTab) => {
		setActiveTab(tab);

		window.history.pushState(null, "", `#${tab}`);
	};

	const handleSave = async () => {
		if (!playthrough || !params.id || typeof params.id !== "string") return;

		setIsSaving(true);
		try {
			if (activeTab === ActiveTab.Calendar && calendarRef.current) {
				calendarRef.current.saveSelectedDay();
			}

			if (
				[ActiveTab.Fish, ActiveTab.Bugs, ActiveTab.Critters].includes(activeTab) &&
				collectionsRef.current
			) {
				collectionsRef.current.saveCollections();
			}

			if (activeTab === ActiveTab.Milestones && milestonesRef.current) {
				milestonesRef.current.saveMilestones();
			}

			if (activeTab === ActiveTab.Licenses && licensesRef.current) {
				licensesRef.current.saveLicenses();
			}

			if (activeTab === ActiveTab.Skills && skillsRef.current) {
				skillsRef.current.saveSkills();
			}

			if (activeTab === ActiveTab.NPCs && npcsRef.current) {
				npcsRef.current.saveRelationships();
			}

			if (activeTab === ActiveTab.Buildings && buildingsRef.current) {
				buildingsRef.current.saveBuildings();
			}

			successToast({ message: "Playthrough Saved Successfully!" });
			setPlaythrough(getPlaythroughById(params.id));

			setTimeout(() => {
				setIsSaving(false);
			}, 800);
		} catch (error) {
			errorToast({ message: JSON.stringify(error) });
			setIsSaving(false);
		}
	};

	const shouldShowSaveButton = (tab: ActiveTab) => {
		return tab !== ActiveTab.Overview;
	};

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center py-12">
				<Spinner size="xl" />
				<p className="mt-4">Loading playthrough...</p>
			</div>
		);
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	const renderTabContent = () => {
		switch (activeTab) {
			case ActiveTab.Calendar:
				return <CalendarTab ref={calendarRef} />;
			case ActiveTab.Fish:
			case ActiveTab.Bugs:
			case ActiveTab.Critters:
				return (
					<CollectionsTab
						ref={collectionsRef}
						collections={playthrough.collections}
						donations={playthrough.donations}
						activeCollectionType={activeTab}
					/>
				);
			case ActiveTab.Milestones:
				return <MilestonesTab ref={milestonesRef} milestones={playthrough.milestones} />;
			case ActiveTab.Licenses:
				return <LicensesTab ref={licensesRef} licenses={playthrough.licenses || {}} />;
			case ActiveTab.Skills:
				return <SkillsTab ref={skillsRef} skillLevels={playthrough.skillLevels} />;
			case ActiveTab.NPCs:
				return <NPCsTab ref={npcsRef} relationships={playthrough.relationships || {}} />;
			case ActiveTab.Buildings:
				return <BuildingsTab ref={buildingsRef} buildings={playthrough.buildings || {}} />;
			case ActiveTab.Overview:
			default:
				return <Dashboard playthrough={playthrough} />;
		}
	};

	return (
		<div className="relative pb-20">
			<nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-700">
				<div className="px-4 py-2">
					<Breadcrumb aria-label="Default breadcrumb example">
						<BreadcrumbItem href="/" icon={HiHome}>
							Home
						</BreadcrumbItem>
						<BreadcrumbItem href="/playthrough/list">Playthroughs</BreadcrumbItem>
						<BreadcrumbItem>{playthrough.name}</BreadcrumbItem>
					</Breadcrumb>
				</div>
			</nav>
			<div className="px-4 py-8">
				<div className="relative mx-auto flex w-full">
					<div className="sticky top-4 h-fit max-h-screen overflow-y-auto pb-20">
						<Sidebar
							aria-label="Sidebar with logo branding example"
							applyTheme={{
								root: { base: "replace", inner: "replace" },
								collapse: {
									button: "replace",
									icon: { base: "replace", open: { on: "replace" } },
								},
								item: { base: "replace", icon: { base: "replace" } },
							}}
						>
							<SidebarLogo href="#" img="/dinkum_d_logo.png" imgAlt="Dinkum logo">
								{playthrough.name}
							</SidebarLogo>
							<SidebarItems>
								<SidebarItemGroup>
									<SidebarItem
										href={`#${ActiveTab.Overview}`}
										icon={MdDashboard}
										active={activeTab === ActiveTab.Overview}
										onClick={() => handleSetActiveTab(ActiveTab.Overview)}
									>
										Overview
									</SidebarItem>
									<SidebarItem
										href={`#${ActiveTab.NPCs}`}
										icon={FaUsers}
										active={activeTab === ActiveTab.NPCs}
										onClick={() => handleSetActiveTab(ActiveTab.NPCs)}
									>
										NPCs
									</SidebarItem>
									<SidebarItem
										href={`#${ActiveTab.Calendar}`}
										icon={FaCalendarDays}
										active={activeTab === ActiveTab.Calendar}
										onClick={() => handleSetActiveTab(ActiveTab.Calendar)}
									>
										Calendar
									</SidebarItem>
								</SidebarItemGroup>
								<SidebarItemGroup>
									<SidebarCollapse
										icon={FaBuildingColumns}
										label="Pedia"
										open={[
											ActiveTab.Bugs,
											ActiveTab.Critters,
											ActiveTab.Fish,
										].includes(activeTab)}
										renderChevronIcon={(theme, open) => {
											const IconComponent = open
												? HiOutlineMinusSm
												: HiOutlinePlusSm;

											return (
												<IconComponent
													aria-hidden
													className={twMerge(
														theme.label.icon.open[open ? "on" : "off"]
													)}
												/>
											);
										}}
									>
										<SidebarItem
											href={`#${ActiveTab.Bugs}`}
											icon={FaBug}
											active={activeTab === ActiveTab.Bugs}
											onClick={() => handleSetActiveTab(ActiveTab.Bugs)}
										>
											Bugs
										</SidebarItem>
										<SidebarItem
											href={`#${ActiveTab.Critters}`}
											icon={GoStarFill}
											active={activeTab === ActiveTab.Critters}
											onClick={() => handleSetActiveTab(ActiveTab.Critters)}
										>
											Critters
										</SidebarItem>
										<SidebarItem
											href={`#${ActiveTab.Fish}`}
											icon={FaFish}
											active={activeTab === ActiveTab.Fish}
											onClick={() => handleSetActiveTab(ActiveTab.Fish)}
										>
											Fish
										</SidebarItem>
									</SidebarCollapse>
									<SidebarItem
										href={`#${ActiveTab.Buildings}`}
										icon={FaBuilding}
										active={activeTab === ActiveTab.Buildings}
										onClick={() => handleSetActiveTab(ActiveTab.Buildings)}
									>
										Buildings & Deeds
									</SidebarItem>
									<SidebarItem
										href={`#${ActiveTab.Licenses}`}
										icon={FaIdCard}
										active={activeTab === ActiveTab.Licenses}
										onClick={() => handleSetActiveTab(ActiveTab.Licenses)}
									>
										Licenses
									</SidebarItem>
									<SidebarItem
										href={`#${ActiveTab.Milestones}`}
										icon={FaAward}
										active={activeTab === ActiveTab.Milestones}
										onClick={() => handleSetActiveTab(ActiveTab.Milestones)}
									>
										Milestones
									</SidebarItem>
									<SidebarItem
										href={`#${ActiveTab.Skills}`}
										icon={FaTools}
										active={activeTab === ActiveTab.Skills}
										onClick={() => handleSetActiveTab(ActiveTab.Skills)}
									>
										Skills
									</SidebarItem>
								</SidebarItemGroup>
								<SidebarItemGroup>
									<SidebarCollapse
										icon={FaReceipt}
										label="Recipes"
										open={[
											ActiveTab.CookingRecipes,
											ActiveTab.CraftingRecipes,
										].includes(activeTab)}
										renderChevronIcon={(theme, open) => {
											const IconComponent = open
												? HiOutlineMinusSm
												: HiOutlinePlusSm;

											return (
												<IconComponent
													aria-hidden
													className={twMerge(
														theme.label.icon.open[open ? "on" : "off"]
													)}
												/>
											);
										}}
									>
										<SidebarItem
											href={`#${ActiveTab.CookingRecipes}`}
											icon={LuCookingPot}
											active={activeTab === ActiveTab.CookingRecipes}
											onClick={() =>
												handleSetActiveTab(ActiveTab.CookingRecipes)
											}
										>
											Cooking Recipes
										</SidebarItem>
										<SidebarItem
											href={`#${ActiveTab.CraftingRecipes}`}
											icon={GiStoneCrafting}
											active={activeTab === ActiveTab.CraftingRecipes}
											onClick={() =>
												handleSetActiveTab(ActiveTab.CraftingRecipes)
											}
										>
											Crafting Recipes
										</SidebarItem>
									</SidebarCollapse>
									<SidebarCollapse
										icon={FaToolbox}
										label="Gear & Equipment"
										open={[
											ActiveTab.Books,
											ActiveTab.Tools,
											ActiveTab.Weapons,
											ActiveTab.Equipment,
											ActiveTab.Vehicles,
										].includes(activeTab)}
										renderChevronIcon={(theme, open) => {
											const IconComponent = open
												? HiOutlineMinusSm
												: HiOutlinePlusSm;

											return (
												<IconComponent
													aria-hidden
													className={twMerge(
														theme.label.icon.open[open ? "on" : "off"]
													)}
												/>
											);
										}}
									>
										<SidebarItem
											href={`#${ActiveTab.Books}`}
											icon={FaBook}
											active={activeTab === ActiveTab.Books}
											onClick={() => handleSetActiveTab(ActiveTab.Books)}
										>
											Books
										</SidebarItem>
										<SidebarItem
											href={`#${ActiveTab.Tools}`}
											icon={FaTools}
											active={activeTab === ActiveTab.Tools}
											onClick={() => handleSetActiveTab(ActiveTab.Tools)}
										>
											Tools
										</SidebarItem>
										<SidebarItem
											href={`#${ActiveTab.Weapons}`}
											icon={GiSwordman}
											active={activeTab === ActiveTab.Weapons}
											onClick={() => handleSetActiveTab(ActiveTab.Weapons)}
										>
											Weapons
										</SidebarItem>
										<SidebarItem
											href={`#${ActiveTab.Equipment}`}
											icon={GiBackpack}
											active={activeTab === ActiveTab.Equipment}
											onClick={() => handleSetActiveTab(ActiveTab.Equipment)}
										>
											Equipment
										</SidebarItem>
										<SidebarItem
											href={`#${ActiveTab.Vehicles}`}
											icon={FaCar}
											active={activeTab === ActiveTab.Vehicles}
											onClick={() => handleSetActiveTab(ActiveTab.Vehicles)}
										>
											Vehicles
										</SidebarItem>
									</SidebarCollapse>
									<SidebarCollapse
										icon={GiSofa}
										label="Customization & Decor"
										open={[
											ActiveTab.Clothing,
											ActiveTab.Decorations,
											ActiveTab.Furniture,
										].includes(activeTab)}
										renderChevronIcon={(theme, open) => {
											const IconComponent = open
												? HiOutlineMinusSm
												: HiOutlinePlusSm;

											return (
												<IconComponent
													aria-hidden
													className={twMerge(
														theme.label.icon.open[open ? "on" : "off"]
													)}
												/>
											);
										}}
									>
										<SidebarItem
											href={`#${ActiveTab.Clothing}`}
											icon={GiClothes}
											active={activeTab === ActiveTab.Clothing}
											onClick={() => handleSetActiveTab(ActiveTab.Clothing)}
										>
											Clothing
										</SidebarItem>
										<SidebarItem
											href={`#${ActiveTab.Decorations}`}
											icon={GiPartyPopper}
											active={activeTab === ActiveTab.Decorations}
											onClick={() =>
												handleSetActiveTab(ActiveTab.Decorations)
											}
										>
											Decorations
										</SidebarItem>
										<SidebarItem
											href={`#${ActiveTab.Furniture}`}
											icon={FaCouch}
											active={activeTab === ActiveTab.Furniture}
											onClick={() => handleSetActiveTab(ActiveTab.Furniture)}
										>
											Furniture
										</SidebarItem>
									</SidebarCollapse>
									<SidebarCollapse
										icon={FaBoxOpen}
										label="Materials & Collectibles"
										open={[
											ActiveTab.Resources,
											ActiveTab.Consumables,
											ActiveTab.Relics,
											ActiveTab.Crops,
										].includes(activeTab)}
										renderChevronIcon={(theme, open) => {
											const IconComponent = open
												? HiOutlineMinusSm
												: HiOutlinePlusSm;

											return (
												<IconComponent
													aria-hidden
													className={twMerge(
														theme.label.icon.open[open ? "on" : "off"]
													)}
												/>
											);
										}}
									>
										<SidebarItem
											href={`#${ActiveTab.Resources}`}
											icon={GiMineralPearls}
											active={activeTab === ActiveTab.Resources}
											onClick={() => handleSetActiveTab(ActiveTab.Resources)}
										>
											Resources
										</SidebarItem>
										<SidebarItem
											href={`#${ActiveTab.Consumables}`}
											icon={FaAppleAlt}
											active={activeTab === ActiveTab.Consumables}
											onClick={() =>
												handleSetActiveTab(ActiveTab.Consumables)
											}
										>
											Consumables
										</SidebarItem>
										<SidebarItem
											href={`#${ActiveTab.Relics}`}
											icon={FaKey}
											active={activeTab === ActiveTab.Relics}
											onClick={() => handleSetActiveTab(ActiveTab.Relics)}
										>
											Relics
										</SidebarItem>
										<SidebarItem
											href={`#${ActiveTab.Crops}`}
											icon={GiWheat}
											active={activeTab === ActiveTab.Crops}
											onClick={() => handleSetActiveTab(ActiveTab.Crops)}
										>
											Crops
										</SidebarItem>
									</SidebarCollapse>
								</SidebarItemGroup>
							</SidebarItems>
						</Sidebar>
					</div>

					<section className="h-full flex-1 overflow-y-auto pb-4 lg:pl-4">
						{renderTabContent()}
					</section>
				</div>
			</div>

			{shouldShowSaveButton(activeTab) && (
				<button
					onClick={handleSave}
					disabled={isSaving}
					className="bg-accent hover:bg-accent/95 focus:ring-accent fixed right-6 bottom-6 z-10 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-0 text-white shadow-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-90"
					aria-label="Save Progress"
				>
					{isSaving ? <Spinner size="lg" /> : <FaRegSave className="h-6 w-6" />}
				</button>
			)}
		</div>
	);
}
