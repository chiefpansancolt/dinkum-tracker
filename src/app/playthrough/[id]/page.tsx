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
import CollectionsTab from "./CollectionsTab";
import CalendarTab from "./CalendarTab";
import { CollectionsTabHandle, CollectionType, CalendarTabHandle } from "@/types/dinkum";
import { Playthrough } from "@/types/app";
import { ActiveTab } from "@/data/constants";
import NotFoundCard from "@/comps/NotFoundCard";
import Dashboard from "@/playthrough/dashboard/Dashboard";
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

const mapTabToCollectionType = (tab: ActiveTab): CollectionType | null => {
	switch (tab) {
		case ActiveTab.Fish:
			return "fish";
		case ActiveTab.Bugs:
			return "bugs";
		case ActiveTab.Critters:
			return "critters";
		default:
			return null;
	}
};

export default function PlaythroughPage() {
	const params = useParams();
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.Overview);

	const calendarRef = useRef<CalendarTabHandle>(null);
	const collectionsRef = useRef<CollectionsTabHandle>(null);

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
				const collectionType = mapTabToCollectionType(activeTab);
				if (!collectionType) return null;

				return (
					<CollectionsTab
						ref={collectionsRef}
						collections={playthrough.collections}
						donations={playthrough.donations}
						activeCollectionType={collectionType}
					/>
				);
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
