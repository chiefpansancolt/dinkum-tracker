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
import { MdDashboard } from "react-icons/md";
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
	const [pedieOpen, setPedieOpen] = useState(false);
	const [recipesOpen, setRecipesOpen] = useState(false);
	const [gearOpen, setGearOpen] = useState(false);
	const [decorOpen, setDecorOpen] = useState(false);
	const [resourcesOpen, setResourcesOpen] = useState(false);

	const playthroughId = params?.id as string;
	const isPlaythroughRoute = pathname?.includes("/playthrough/") && playthroughId;

	useEffect(() => {
		if (pathname) {
			setPedieOpen(
				pathname.includes("/fish") ||
					pathname.includes("/bugs") ||
					pathname.includes("/critters")
			);

			setRecipesOpen(
				pathname.includes("/cookingRecipes") ||
					pathname.includes("/craftingRecipes") ||
					pathname.includes("/signWritingRecipes")
			);

			setGearOpen(
				pathname.includes("/books") ||
					pathname.includes("/tools") ||
					pathname.includes("/weapons") ||
					pathname.includes("/equipment") ||
					pathname.includes("/vehicles") ||
					pathname.includes("/cassettes")
			);

			setDecorOpen(
				pathname.includes("/clothing") ||
					pathname.includes("/decorations") ||
					pathname.includes("/furniture")
			);

			setResourcesOpen(
				pathname.includes("/resources") ||
					pathname.includes("/seeds") ||
					pathname.includes("/crops")
			);
		}
	}, [pathname]);

	return (
		<aside
			className={`fixed top-0 left-0 z-40 h-screen w-64 pt-20 transition-transform ${
				sidebarOpen ? "translate-x-0" : "-translate-x-full"
			} bg-accent border-r border-gray-200 md:translate-x-0 dark:border-gray-700`}
			aria-label="Sidenav"
			id="drawer-navigation"
		>
			<div className="bg-accent h-full overflow-y-auto px-3 pb-28">
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

					{isPlaythroughRoute && (
						<>
							<div className="mt-6 mb-2 border-t border-gray-200 pt-3 dark:border-gray-700">
								<p className="px-2 text-sm font-semibold text-gray-200">
									Current Playthrough
								</p>
							</div>

							<li>
								<SidebarLink
									href={`/playthrough/${playthroughId}`}
									currentPath={pathname}
									icon={<MdDashboard />}
								>
									Overview
								</SidebarLink>
							</li>

							<li>
								<SidebarLink
									href={`/playthrough/${playthroughId}/npcs`}
									currentPath={pathname}
									icon={<FaUsers />}
								>
									NPCs
								</SidebarLink>
							</li>

							<li>
								<SidebarLink
									href={`/playthrough/${playthroughId}/calendar`}
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
										pathname?.includes(`/playthrough/${playthroughId}/bugs`) ||
										pathname?.includes(
											`/playthrough/${playthroughId}/critters`
										) ||
										pathname?.includes(`/playthrough/${playthroughId}/fish`)
									}
								>
									<SidebarLink
										href={`/playthrough/${playthroughId}/bugs`}
										currentPath={pathname}
										icon={<FaBug />}
										indented
									>
										Bugs
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${playthroughId}/critters`}
										currentPath={pathname}
										icon={<GoStarFill />}
										indented
									>
										Critters
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${playthroughId}/fish`}
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
									href={`/playthrough/${playthroughId}/buildings`}
									currentPath={pathname}
									icon={<FaBuilding />}
								>
									Buildings & Deeds
								</SidebarLink>
							</li>

							<li>
								<SidebarLink
									href={`/playthrough/${playthroughId}/licenses`}
									currentPath={pathname}
									icon={<FaIdCard />}
								>
									Licenses
								</SidebarLink>
							</li>

							<li>
								<SidebarLink
									href={`/playthrough/${playthroughId}/milestones`}
									currentPath={pathname}
									icon={<FaAward />}
								>
									Milestones
								</SidebarLink>
							</li>

							<li>
								<SidebarLink
									href={`/playthrough/${playthroughId}/skills`}
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
											`/playthrough/${playthroughId}/cookingRecipes`
										) ||
										pathname?.includes(
											`/playthrough/${playthroughId}/craftingRecipes`
										) ||
										pathname?.includes(
											`/playthrough/${playthroughId}/signWritingRecipes`
										)
									}
								>
									<SidebarLink
										href={`/playthrough/${playthroughId}/cookingRecipes`}
										currentPath={pathname}
										icon={<LuCookingPot />}
										indented
									>
										Cooking
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${playthroughId}/craftingRecipes`}
										currentPath={pathname}
										icon={<GiStoneCrafting />}
										indented
									>
										Crafting
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${playthroughId}/signWritingRecipes`}
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
										pathname?.includes(`/playthrough/${playthroughId}/books`) ||
										pathname?.includes(`/playthrough/${playthroughId}/tools`) ||
										pathname?.includes(
											`/playthrough/${playthroughId}/weapons`
										) ||
										pathname?.includes(
											`/playthrough/${playthroughId}/equipment`
										) ||
										pathname?.includes(
											`/playthrough/${playthroughId}/vehicles`
										) ||
										pathname?.includes(
											`/playthrough/${playthroughId}/cassettes`
										)
									}
								>
									<SidebarLink
										href={`/playthrough/${playthroughId}/books`}
										currentPath={pathname}
										icon={<FaBook />}
										indented
									>
										Books
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${playthroughId}/cassettes`}
										currentPath={pathname}
										icon={<BsCassette />}
										indented
									>
										Cassettes
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${playthroughId}/tools`}
										currentPath={pathname}
										icon={<FaTools />}
										indented
									>
										Tools
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${playthroughId}/weapons`}
										currentPath={pathname}
										icon={<GiSwordman />}
										indented
									>
										Weapons
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${playthroughId}/equipment`}
										currentPath={pathname}
										icon={<GiBackpack />}
										indented
									>
										Equipment
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${playthroughId}/vehicles`}
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
											`/playthrough/${playthroughId}/clothing`
										) ||
										pathname?.includes(
											`/playthrough/${playthroughId}/decorations`
										) ||
										pathname?.includes(
											`/playthrough/${playthroughId}/furniture`
										)
									}
								>
									<SidebarLink
										href={`/playthrough/${playthroughId}/clothing`}
										currentPath={pathname}
										icon={<GiClothes />}
										indented
									>
										Clothing
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${playthroughId}/decorations`}
										currentPath={pathname}
										icon={<GiPartyPopper />}
										indented
									>
										Decorations
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${playthroughId}/furniture`}
										currentPath={pathname}
										icon={<FaCouch />}
										indented
									>
										Furniture
									</SidebarLink>
								</SidebarCollapse>
							</li>

							<li>
								<SidebarCollapse
									label="Resources & Plants"
									icon={<FaBoxOpen className="h-5 w-5" />}
									open={resourcesOpen}
									onToggle={() => setResourcesOpen(!resourcesOpen)}
									active={
										pathname?.includes(
											`/playthrough/${playthroughId}/resources`
										) ||
										pathname?.includes(`/playthrough/${playthroughId}/seeds`) ||
										pathname?.includes(`/playthrough/${playthroughId}/crops`)
									}
								>
									<SidebarLink
										href={`/playthrough/${playthroughId}/resources`}
										currentPath={pathname}
										icon={<GiMineralPearls />}
										indented
									>
										Resources
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${playthroughId}/seeds`}
										currentPath={pathname}
										icon={<FaSeedling />}
										indented
									>
										Seeds
									</SidebarLink>

									<SidebarLink
										href={`/playthrough/${playthroughId}/crops`}
										currentPath={pathname}
										icon={<GiWheat />}
										indented
									>
										Crops
									</SidebarLink>
									<SidebarLink
										href={`/playthrough/${playthroughId}/flowers`}
										currentPath={pathname}
										icon={<LuFlower2 />}
										indented
									>
										Flowers
									</SidebarLink>
									<SidebarLink
										href={`/playthrough/${playthroughId}/trees`}
										currentPath={pathname}
										icon={<FaTree />}
										indented
									>
										Trees
									</SidebarLink>
								</SidebarCollapse>
							</li>
						</>
					)}
				</ul>

				<div className="bg-accent dark:border-primary absolute right-0 bottom-0 left-0 border-t border-gray-200 p-4">
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
