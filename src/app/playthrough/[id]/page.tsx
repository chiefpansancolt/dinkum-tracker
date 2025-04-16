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
import { getPlaythroughById, Playthrough } from "@/lib/localStorage";
import CollectionsTab from "./CollectionsTab";
import MilestonesTab from "./MilestonesTab";
import CalendarTab, { CalendarTabHandle } from "./CalendarTab";
import NotFoundCard from "@/components/NotFoundCard";
import { errorToast, successToast } from "@/lib/notifications";
import { FaRegSave } from "react-icons/fa";
import { HiHome, HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
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
} from "react-icons/fa6";
import { FaTools } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";

enum ActiveTab {
	Overview = "overview",
	Calendar = "calendar",
	NPCs = "npcs",
	Bugs = "bugs",
	Critters = "critters",
	Fish = "fish",
	Buildings = "buildings",
	Licenses = "licenses",
	Milestones = "milestones",
	Skills = "skills",
}

export default function PlaythroughPage() {
	const params = useParams();
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.Overview);
	const calendarRef = useRef<CalendarTabHandle>(null);

	useEffect(() => {
		if (typeof params.id !== "string") {
			setIsLoading(false);
			return;
		}

		setPlaythrough(getPlaythroughById(params.id));
		setIsLoading(false);
	}, [params.id]);

	const handleSave = async () => {
		if (!playthrough) return;

		setIsSaving(true);
		try {
			let status = false;
			if (activeTab === ActiveTab.Calendar && calendarRef.current) {
				status = calendarRef.current.saveSelectedDay();
			}

			if (status) {
				setPlaythrough(getPlaythroughById(playthrough.id));
				successToast({ message: "Playthrough Saved Successfully!" });
			}

			setTimeout(() => {
				setIsSaving(false);
			}, 800);
		} catch (error) {
			errorToast({ message: JSON.stringify(error) });
			setIsSaving(false);
		}
	};

	const handleCollectionUpdate = (
		collectionType: keyof Playthrough["collections"],
		itemIds: string[]
	) => {
		if (!playthrough) return;

		setPlaythrough({
			...playthrough,
			collections: {
				...playthrough.collections,
				[collectionType]: itemIds,
			},
		});
	};

	const handleMilestoneUpdate = (milestoneId: string, completed: boolean) => {
		if (!playthrough) return;

		setPlaythrough({
			...playthrough,
			milestones: {
				...playthrough.milestones,
				[milestoneId]: completed,
			},
		});
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
			case ActiveTab.Milestones:
				return (
					<MilestonesTab
						milestones={playthrough.milestones}
						onUpdate={handleMilestoneUpdate}
					/>
				);
			case ActiveTab.Fish:
			case ActiveTab.Bugs:
			case ActiveTab.Critters:
				return (
					<CollectionsTab
						collections={playthrough.collections}
						onUpdate={handleCollectionUpdate}
					/>
				);
			case ActiveTab.Overview:
			default:
				return (
					<div className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
						<div className="h-32 rounded-xl border-2 border-dashed border-gray-300 lg:h-64 dark:border-gray-600">
							<p className="p-4 text-center">Overview dashboard will go here</p>
						</div>
						<div className="h-32 rounded-xl border-2 border-dashed border-gray-300 lg:h-64 dark:border-gray-600"></div>
						<div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600"></div>
						<div className="h-32 rounded-xl border-2 border-dashed border-gray-300 lg:h-64 dark:border-gray-600"></div>
					</div>
				);
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
										href="#"
										icon={MdDashboard}
										active={activeTab === ActiveTab.Overview}
										onClick={() => setActiveTab(ActiveTab.Overview)}
									>
										Overview
									</SidebarItem>
									<SidebarItem
										href="#"
										icon={FaUsers}
										active={activeTab === ActiveTab.NPCs}
										onClick={() => setActiveTab(ActiveTab.NPCs)}
									>
										NPCs
									</SidebarItem>
									<SidebarItem
										href="#"
										icon={FaCalendarDays}
										active={activeTab === ActiveTab.Calendar}
										onClick={() => setActiveTab(ActiveTab.Calendar)}
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
											href="#"
											icon={FaBug}
											active={activeTab === ActiveTab.Bugs}
											onClick={() => setActiveTab(ActiveTab.Bugs)}
										>
											Bugs
										</SidebarItem>
										<SidebarItem
											href="#"
											icon={GoStarFill}
											active={activeTab === ActiveTab.Critters}
											onClick={() => setActiveTab(ActiveTab.Critters)}
										>
											Critters
										</SidebarItem>
										<SidebarItem
											href="#"
											icon={FaFish}
											active={activeTab === ActiveTab.Fish}
											onClick={() => setActiveTab(ActiveTab.Fish)}
										>
											Fish
										</SidebarItem>
									</SidebarCollapse>
									<SidebarItem
										href="#"
										icon={FaBuilding}
										active={activeTab === ActiveTab.Buildings}
										onClick={() => setActiveTab(ActiveTab.Buildings)}
									>
										Buildings & Deeds
									</SidebarItem>
									<SidebarItem
										href="#"
										icon={FaIdCard}
										active={activeTab === ActiveTab.Licenses}
										onClick={() => setActiveTab(ActiveTab.Licenses)}
									>
										Licenses
									</SidebarItem>
									<SidebarItem
										href="#"
										icon={FaAward}
										active={activeTab === ActiveTab.Milestones}
										onClick={() => setActiveTab(ActiveTab.Milestones)}
									>
										Milestones
									</SidebarItem>
									<SidebarItem
										href="#"
										icon={FaTools}
										active={activeTab === ActiveTab.Skills}
										onClick={() => setActiveTab(ActiveTab.Skills)}
									>
										Skills
									</SidebarItem>
								</SidebarItemGroup>
							</SidebarItems>
						</Sidebar>
					</div>

					<section className="h-full flex-1 overflow-y-auto pb-4 lg:pl-4">
						{renderTabContent()}
					</section>
				</div>
			</div>

			<button
				onClick={handleSave}
				disabled={isSaving}
				className="bg-accent hover:bg-accent/95 focus:ring-accent fixed right-6 bottom-6 z-10 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-0 text-white shadow-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-90"
				aria-label="Save Progress"
			>
				{isSaving ? <Spinner size="lg" /> : <FaRegSave className="h-6 w-6" />}
			</button>
		</div>
	);
}
