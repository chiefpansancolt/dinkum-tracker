"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCassette } from "react-icons/bs";
import { FaToolbox, FaTools } from "react-icons/fa";
import {
	FaAward,
	FaBook,
	FaBoxOpen,
	FaBug,
	FaBuilding,
	FaBuildingColumns,
	FaCalendarDays,
	FaCar,
	FaCouch,
	FaFish,
	FaIdCard,
	FaOtter,
	FaReceipt,
	FaSeedling,
	FaSignsPost,
	FaTree,
	FaUsers,
} from "react-icons/fa6";
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
import { GoStarFill } from "react-icons/go";
import { HiCog, HiHome, HiViewList } from "react-icons/hi";
import { LuCookingPot, LuFlower2 } from "react-icons/lu";
import { MdDashboard, MdScale } from "react-icons/md";
import { getActivePlaythroughId, getPlaythroughs, setActivePlaythroughId } from "@/lib/localStorage";
import { Playthrough } from "@/types/app";
import PlaythroughSwitcher from "./PlaythroughSwitcher";
import SidebarCollapse from "./SidebarCollapse";

interface SidebarLinkProps {
	href: string;
	currentPath: string;
	icon?: React.ReactNode;
	indented?: boolean;
	children: React.ReactNode;
}

const SidebarLink = ({ href, currentPath, icon, indented = false, children }: SidebarLinkProps) => {
	const isActive = currentPath === href;

	return (
		<Link
			href={href}
			className={`flex items-center rounded-lg ${indented ? "p-2 pl-11" : "p-2"} text-base font-medium transition duration-75 ${
				isActive ? "bg-primary text-white" : "hover:bg-primary text-white"
			} group`}
		>
			{icon && (
				<span
					className={`${indented ? "mr-2" : ""} h-5 w-5 text-white transition duration-75`}
				>
					{icon}
				</span>
			)}
			<span className={!indented && icon ? "ml-3" : ""}>{children}</span>
		</Link>
	);
};

export default function AppSidebar({ sidebarOpen }: { sidebarOpen: boolean }) {
	const pathname = usePathname();
	const params = useParams();
	const urlId = params?.id as string | undefined;

	const [playthroughs, setPlaythroughs] = useState<Playthrough[]>([]);
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		setPlaythroughs(getPlaythroughs());
		if (urlId) {
			setActivePlaythroughId(urlId);
			setActiveId(urlId);
		} else {
			setActiveId(getActivePlaythroughId());
		}
	}, [urlId]);

	const handlePlaythroughSelect = (id: string) => {
		setActiveId(id);
	};

	const [pedieOpen, setPedieOpen] = useState(
		() =>
			!!(
				pathname?.includes("/fish") ||
				pathname?.includes("/bugs") ||
				pathname?.includes("/critters")
			)
	);
	const [recipesOpen, setRecipesOpen] = useState(
		() =>
			!!(
				pathname?.includes("/cookingRecipes") ||
				pathname?.includes("/craftingRecipes") ||
				pathname?.includes("/signWritingRecipes")
			)
	);
	const [gearOpen, setGearOpen] = useState(
		() =>
			!!(
				pathname?.includes("/books") ||
				pathname?.includes("/tools") ||
				pathname?.includes("/weapons") ||
				pathname?.includes("/equipment") ||
				pathname?.includes("/vehicles") ||
				pathname?.includes("/cassettes")
			)
	);
	const [decorOpen, setDecorOpen] = useState(
		() =>
			!!(
				pathname?.includes("/clothing") ||
				pathname?.includes("/decorations") ||
				pathname?.includes("/furniture")
			)
	);
	const [plansOpen, setPlantsOpen] = useState(
		() =>
			!!(
				pathname?.includes("/trees") ||
				pathname?.includes("/seeds") ||
				pathname?.includes("/crops") ||
				pathname?.includes("/flowers")
			)
	);

	return (
		<aside
			className={`fixed top-0 left-0 z-40 h-screen w-64 pt-20 transition-transform ${
				sidebarOpen ? "translate-x-0" : "-translate-x-full"
			} bg-accent border-r border-gray-200 md:translate-x-0 dark:border-gray-700`}
			aria-label="Sidenav"
			id="drawer-navigation"
		>
			<div className="bg-accent h-full overflow-y-auto px-3 pb-28">
				<PlaythroughSwitcher
						playthroughs={playthroughs}
						activeId={activeId}
						onSelect={handlePlaythroughSelect}
					/>
				<ul className="space-y-2">
					<li>
						<SidebarLink
							href="/"
							currentPath={pathname}
							icon={<HiHome className="h-5 w-5" />}
						>
							Home
						</SidebarLink>
					</li>

					<li>
						<SidebarLink
							href="/playthrough/list"
							currentPath={pathname}
							icon={<HiViewList className="h-5 w-5" />}
						>
							Playthroughs
						</SidebarLink>
					</li>

					<li>
						<SidebarLink
							href="/itemsBreakdown"
							currentPath={pathname}
							icon={<FaBoxOpen className="h-5 w-5" />}
						>
							Items Breakdown
						</SidebarLink>
					</li>

					<li>
						<SidebarLink
							href="/weight-calculator"
							currentPath={pathname}
							icon={<MdScale className="h-5 w-5" />}
						>
							Weight Calculator
						</SidebarLink>
					</li>

					<div className="mt-6 mb-2 border-t border-gray-200 pt-3 dark:border-gray-700">
						<p className="px-2 text-sm font-semibold text-gray-200">
							Resource References
						</p>
					</div>

					<li>
						<SidebarLink
							href="/dinkum/animals"
							currentPath={pathname}
							icon={<FaOtter />}
						>
							Animals
						</SidebarLink>
					</li>

					<li>
						<SidebarLink
							href="/dinkum/resources"
							currentPath={pathname}
							icon={<GiMineralPearls />}
						>
							Resources
						</SidebarLink>
					</li>

					<li>
						<SidebarCollapse
							label="Plants"
							icon={<FaSeedling className="h-5 w-5" />}
							open={plansOpen}
							onToggle={() => setPlantsOpen(!plansOpen)}
							active={
								pathname?.includes("/dinkum/trees") ||
								pathname?.includes("/dinkum/seeds") ||
								pathname?.includes("/dinkum/crops") ||
								pathname?.includes("/dinkum/flowers")
							}
						>
							<SidebarLink
								href="/dinkum/seeds"
								currentPath={pathname}
								icon={<FaSeedling />}
								indented
							>
								Seeds
							</SidebarLink>

							<SidebarLink
								href="/dinkum/crops"
								currentPath={pathname}
								icon={<GiWheat />}
								indented
							>
								Crops
							</SidebarLink>
							<SidebarLink
								href="/dinkum/flowers"
								currentPath={pathname}
								icon={<LuFlower2 />}
								indented
							>
								Flowers
							</SidebarLink>
							<SidebarLink
								href="/dinkum/trees"
								currentPath={pathname}
								icon={<FaTree />}
								indented
							>
								Trees
							</SidebarLink>
						</SidebarCollapse>
					</li>

					{activeId && (
						<>
							<div className="mt-6 mb-2 border-t border-gray-200 pt-3 dark:border-gray-700">
								<p className="px-2 text-sm font-semibold text-gray-200">
									Current Playthrough
								</p>
							</div>

							<li>
								<SidebarLink
									href={`/playthrough/${activeId}`}
									currentPath={pathname}
									icon={<MdDashboard />}
								>
									Overview
								</SidebarLink>
							</li>

							<li>
								<SidebarLink
									href={`/playthrough/${activeId}/npcs`}
									currentPath={pathname}
									icon={<FaUsers />}
								>
									NPCs
								</SidebarLink>
							</li>

							<li>
								<SidebarLink
									href={`/playthrough/${activeId}/calendar`}
									currentPath={pathname}
									icon={<FaCalendarDays />}
								>
									Calendar
								</SidebarLink>
							</li>

							<li>
								<SidebarCollapse
									label="Pedia"
									icon={<FaBuildingColumns className="h-5 w-5" />}
									open={pedieOpen}
									onToggle={() => setPedieOpen(!pedieOpen)}
									active={
										pathname?.includes(`/playthrough/${activeId}/bugs`) ||
										pathname?.includes(
											`/playthrough/${activeId}/critters`
										) ||
										pathname?.includes(`/playthrough/${activeId}/fish`)
									}
								>
									<SidebarLink
										href={`/playthrough/${activeId}/bugs`}
										currentPath={pathname}
										icon={<FaBug />}
										indented
									>
										Bugs
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${activeId}/critters`}
										currentPath={pathname}
										icon={<GoStarFill />}
										indented
									>
										Critters
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${activeId}/fish`}
										currentPath={pathname}
										icon={<FaFish />}
										indented
									>
										Fish
									</SidebarLink>
								</SidebarCollapse>
							</li>

							<li>
								<SidebarLink
									href={`/playthrough/${activeId}/buildings`}
									currentPath={pathname}
									icon={<FaBuilding />}
								>
									Buildings & Deeds
								</SidebarLink>
							</li>

							<li>
								<SidebarLink
									href={`/playthrough/${activeId}/licenses`}
									currentPath={pathname}
									icon={<FaIdCard />}
								>
									Licenses
								</SidebarLink>
							</li>

							<li>
								<SidebarLink
									href={`/playthrough/${activeId}/milestones`}
									currentPath={pathname}
									icon={<FaAward />}
								>
									Milestones
								</SidebarLink>
							</li>

							<li>
								<SidebarLink
									href={`/playthrough/${activeId}/skills`}
									currentPath={pathname}
									icon={<FaTools />}
								>
									Skills
								</SidebarLink>
							</li>

							<li>
								<SidebarCollapse
									label="Recipes"
									icon={<FaReceipt className="h-5 w-5" />}
									open={recipesOpen}
									onToggle={() => setRecipesOpen(!recipesOpen)}
									active={
										pathname?.includes(
											`/playthrough/${activeId}/cookingRecipes`
										) ||
										pathname?.includes(
											`/playthrough/${activeId}/craftingRecipes`
										) ||
										pathname?.includes(
											`/playthrough/${activeId}/signWritingRecipes`
										)
									}
								>
									<SidebarLink
										href={`/playthrough/${activeId}/cookingRecipes`}
										currentPath={pathname}
										icon={<LuCookingPot />}
										indented
									>
										Cooking
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${activeId}/craftingRecipes`}
										currentPath={pathname}
										icon={<GiStoneCrafting />}
										indented
									>
										Crafting
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${activeId}/signWritingRecipes`}
										currentPath={pathname}
										icon={<FaSignsPost />}
										indented
									>
										Sign Writing
									</SidebarLink>
								</SidebarCollapse>
							</li>

							<li>
								<SidebarCollapse
									label="Gear & Equipment"
									icon={<FaToolbox className="h-5 w-5" />}
									open={gearOpen}
									onToggle={() => setGearOpen(!gearOpen)}
									active={
										pathname?.includes(`/playthrough/${activeId}/books`) ||
										pathname?.includes(`/playthrough/${activeId}/tools`) ||
										pathname?.includes(
											`/playthrough/${activeId}/weapons`
										) ||
										pathname?.includes(
											`/playthrough/${activeId}/equipment`
										) ||
										pathname?.includes(
											`/playthrough/${activeId}/vehicles`
										) ||
										pathname?.includes(
											`/playthrough/${activeId}/cassettes`
										)
									}
								>
									<SidebarLink
										href={`/playthrough/${activeId}/books`}
										currentPath={pathname}
										icon={<FaBook />}
										indented
									>
										Books
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${activeId}/cassettes`}
										currentPath={pathname}
										icon={<BsCassette />}
										indented
									>
										Cassettes
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${activeId}/tools`}
										currentPath={pathname}
										icon={<FaTools />}
										indented
									>
										Tools
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${activeId}/weapons`}
										currentPath={pathname}
										icon={<GiSwordman />}
										indented
									>
										Weapons
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${activeId}/equipment`}
										currentPath={pathname}
										icon={<GiBackpack />}
										indented
									>
										Equipment
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${activeId}/vehicles`}
										currentPath={pathname}
										icon={<FaCar />}
										indented
									>
										Vehicles
									</SidebarLink>
								</SidebarCollapse>
							</li>

							<li>
								<SidebarCollapse
									label="Clothing & Decor"
									icon={<GiSofa className="h-5 w-5" />}
									open={decorOpen}
									onToggle={() => setDecorOpen(!decorOpen)}
									active={
										pathname?.includes(
											`/playthrough/${activeId}/clothing`
										) ||
										pathname?.includes(
											`/playthrough/${activeId}/decorations`
										) ||
										pathname?.includes(
											`/playthrough/${activeId}/furniture`
										)
									}
								>
									<SidebarLink
										href={`/playthrough/${activeId}/clothing`}
										currentPath={pathname}
										icon={<GiClothes />}
										indented
									>
										Clothing
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${activeId}/decorations`}
										currentPath={pathname}
										icon={<GiPartyPopper />}
										indented
									>
										Decorations
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${activeId}/furniture`}
										currentPath={pathname}
										icon={<FaCouch />}
										indented
									>
										Furniture
									</SidebarLink>
								</SidebarCollapse>
							</li>
						</>
					)}
				</ul>

				<div className="bg-accent absolute right-0 bottom-0 left-0 border-t border-gray-200 p-4 dark:border-gray-700">
					<ul className="space-y-2">
						<li>
							<SidebarLink
								href="/settings"
								currentPath={pathname}
								icon={<HiCog className="h-5 w-5" />}
							>
								Settings
							</SidebarLink>
						</li>
					</ul>
				</div>
			</div>
		</aside>
	);
}
