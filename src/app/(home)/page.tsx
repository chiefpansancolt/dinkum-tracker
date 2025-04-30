import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { FaTools, FaUsers } from "react-icons/fa";
import { FaAward } from "react-icons/fa";
import { FaBuilding, FaCalendarDays, FaIdCard } from "react-icons/fa6";
import { GiBackpack, GiClothes, GiCrab, GiPartyPopper, GiStoneCrafting } from "react-icons/gi";
import { HiPlus } from "react-icons/hi";
import { LuCookingPot } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";

export default function Home() {
	return (
		<div className="text-gray-900 dark:text-gray-50">
			<div className="relative isolate overflow-hidden">
				<svg
					className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200 dark:stroke-white/10"
					aria-hidden="true"
				>
					<defs>
						<pattern
							id="dinkum-pattern"
							width="200"
							height="200"
							x="50%"
							y="-1"
							patternUnits="userSpaceOnUse"
						>
							<path d="M.5 200V.5H200" fill="none" />
						</pattern>
					</defs>
					<svg
						x="50%"
						y="-1"
						className="overflow-visible fill-gray-200/20 dark:fill-gray-800/20"
					>
						<path
							d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
							strokeWidth="0"
						/>
					</svg>
					<rect width="100%" height="100%" strokeWidth="0" fill="url(#dinkum-pattern)" />
				</svg>
				<div
					className="absolute -top-40 -right-20 -z-10 transform-gpu blur-3xl"
					aria-hidden="true"
				>
					<div
						className="from-primary/20 to-accent/20 aspect-[1108/632] w-[69.25rem] bg-gradient-to-r opacity-20"
						style={{
							clipPath:
								"polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
						}}
					></div>
				</div>

				<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
					<div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
						<div className="mt-6 sm:mt-10">
							<span className="font-medium">Track Your Progress</span>
						</div>
						<h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
							Dinkum Tracker
						</h1>
						<p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
							A comprehensive tracking application for your Dinkum adventures. Manage
							multiple playthroughs, track collections, and monitor progress all in
							one place - all saved locally in your browser.
						</p>
						<div className="mt-10 flex items-center gap-x-6">
							<Button
								as={Link}
								href="/playthrough/list"
								color="primary"
								size="xl"
								className="px-6"
							>
								View My Playthroughs
							</Button>
							<Button
								as={Link}
								href="/playthrough/new"
								color="secondary"
								size="xl"
								className="px-6"
							>
								<HiPlus className="mr-2 h-5 w-5" />
								New Adventure
							</Button>
						</div>
					</div>
					<div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0">
						<div className="relative">
							<Image
								src="/Dinkum_Game_Image.png"
								alt="Dinkum Tracker"
								width={400}
								height={400}
								className="relative z-10 w-full rounded-2xl shadow-xl ring-1 ring-gray-900/10 dark:ring-white/10"
							/>
							<div className="bg-accent absolute -bottom-10 -left-10 h-full w-full rounded-2xl opacity-10 blur-lg"></div>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-primary text-3xl font-bold tracking-tight sm:text-4xl">
						Track Your Complete Collection
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
						Manage every aspect of your Dinkum journey with our comprehensive tracking
						system
					</p>
				</div>

				<dl className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-10 text-gray-900 sm:mt-16 sm:grid-cols-4 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-8 dark:text-white">
					<div className="border-primary/20 flex flex-col gap-y-3 border-l pl-6">
						<dt className="text-sm text-gray-600 dark:text-gray-300">Pedia</dt>
						<dd className="order-first text-3xl font-semibold tracking-tight">120+</dd>
					</div>
					<div className="border-primary/20 flex flex-col gap-y-3 border-l pl-6">
						<dt className="text-sm text-gray-600 dark:text-gray-300">NPC&apos;s</dt>
						<dd className="order-first text-3xl font-semibold tracking-tight">18+</dd>
					</div>
					<div className="border-primary/20 flex flex-col gap-y-3 border-l pl-6">
						<dt className="text-sm text-gray-600 dark:text-gray-300">Licenses</dt>
						<dd className="order-first text-3xl font-semibold tracking-tight">50+</dd>
					</div>
					<div className="border-primary/20 flex flex-col gap-y-3 border-l pl-6">
						<dt className="text-sm text-gray-600 dark:text-gray-300">Milestones</dt>
						<dd className="order-first text-3xl font-semibold tracking-tight">65+</dd>
					</div>
					<div className="border-primary/20 flex flex-col gap-y-3 border-l pl-6">
						<dt className="text-sm text-gray-600 dark:text-gray-300">Buildings</dt>
						<dd className="order-first text-3xl font-semibold tracking-tight">25+</dd>
					</div>
					<div className="border-primary/20 flex flex-col gap-y-3 border-l pl-6">
						<dt className="text-sm text-gray-600 dark:text-gray-300">
							Gear & Equipment
						</dt>
						<dd className="order-first text-3xl font-semibold tracking-tight">160+</dd>
					</div>
					<div className="border-primary/20 flex flex-col gap-y-3 border-l pl-6">
						<dt className="text-sm text-gray-600 dark:text-gray-300">Recipes</dt>
						<dd className="order-first text-3xl font-semibold tracking-tight">300+</dd>
					</div>
					<div className="border-primary/20 flex flex-col gap-y-3 border-l pl-6">
						<dt className="text-sm text-gray-600 dark:text-gray-300">Clothing</dt>
						<dd className="order-first text-3xl font-semibold tracking-tight">400+</dd>
					</div>
				</dl>
			</div>

			<div className="mx-auto mt-32 max-w-7xl items-center gap-8 px-6 py-8 sm:mt-40 sm:py-16 lg:grid lg:grid-cols-2 lg:px-8 xl:gap-16">
				<Image
					className="mb-4 w-full rounded-lg lg:mb-0"
					src="/Dinkum_Tracker_View.png"
					alt="Dinkum Tracker View"
					width={400}
					height={800}
				/>
				<div className="text-gray-500 sm:text-lg dark:text-gray-400">
					<h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
						Track Everything
					</h2>
					<p className="mb-8 font-light lg:text-xl">
						All the tools you need for Dinkum success
					</p>
					<div className="mb-6 border-t border-b border-gray-200 py-8 dark:border-gray-700">
						<div className="flex">
							<div className="bg-primary-100 dark:bg-primary-900 mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
								<GiCrab className="text-primary-600 dark:text-primary-300 h-5 w-5" />
							</div>
							<div>
								<h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
									Pedia Collections
								</h3>
								<p className="mb-2 font-light text-gray-500 dark:text-gray-400">
									Track all fish, bugs, and critters across different seasons,
									locations, and times of day. Monitor your museum donations and
									collection progress.
								</p>
							</div>
						</div>
						<div className="flex pt-8">
							<div className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
								<FaUsers className="h-5 w-5 text-purple-600 dark:text-purple-300" />
							</div>
							<div>
								<h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
									NPC Relationships
								</h3>
								<p className="mb-2 font-light text-gray-500 dark:text-gray-400">
									Keep track of your friendships with town residents, track gift
									preferences, and monitor heart levels with all NPCs.
								</p>
							</div>
						</div>
						<div className="flex pt-8">
							<div className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
								<FaCalendarDays className="h-5 w-5 text-teal-600 dark:text-teal-300" />
							</div>
							<div>
								<h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
									Calendar Events
								</h3>
								<p className="mb-2 font-light text-gray-500 dark:text-gray-400">
									Keep track of important dates, birthdays, and seasonal events.
									Never miss another festival or special occasion in your Dinkum
									town.
								</p>
							</div>
						</div>
					</div>
					<p className="text-sm">
						From collecting bugs to managing relationships with NPCs, Dinkum Tracker
						helps you keep track of everything in your game.
					</p>
				</div>
			</div>

			<div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
				<div className="mx-auto max-w-2xl sm:text-center">
					<h2 className="text-primary text-3xl font-bold tracking-tight sm:text-4xl">
						Everything you need
					</h2>
					<p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
						Keep track of all the details that matter in your Dinkum adventure with our
						comprehensive tracking features.
					</p>
				</div>

				<div className="mx-auto mt-16 max-w-7xl">
					<dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
						<div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
							<dt className="text-lg font-semibold text-gray-900 dark:text-white">
								Milestones & Licenses
							</dt>
							<dd className="mt-4 space-y-3 text-base text-gray-600 dark:text-gray-300">
								<div className="flex items-start gap-x-3">
									<FaAward className="text-accent mt-1 h-5 w-5 flex-none" />
									<span>Track completion of 65+ game milestones</span>
								</div>
								<div className="flex items-start gap-x-3">
									<FaIdCard className="text-accent mt-1 h-5 w-5 flex-none" />
									<span>Manage all licenses and their upgrade levels</span>
								</div>
								<div className="flex items-start gap-x-3">
									<MdDashboard className="text-accent mt-1 h-5 w-5 flex-none" />
									<span>View permit point progress and requirements</span>
								</div>
							</dd>
						</div>

						<div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
							<dt className="text-lg font-semibold text-gray-900 dark:text-white">
								Recipes & Crafting
							</dt>
							<dd className="mt-4 space-y-3 text-base text-gray-600 dark:text-gray-300">
								<div className="flex items-start gap-x-3">
									<LuCookingPot className="text-accent mt-1 h-5 w-5 flex-none" />
									<span>Track all cooking recipes and their ingredients</span>
								</div>
								<div className="flex items-start gap-x-3">
									<GiStoneCrafting className="text-accent mt-1 h-5 w-5 flex-none" />
									<span>Keep track of crafting recipes and resources</span>
								</div>
								<div className="flex items-start gap-x-3">
									<FaTools className="text-accent mt-1 h-5 w-5 flex-none" />
									<span>Manage tools, weapons and equipment</span>
								</div>
							</dd>
						</div>

						<div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
							<dt className="text-lg font-semibold text-gray-900 dark:text-white">
								Collections & Resources
							</dt>
							<dd className="mt-4 space-y-3 text-base text-gray-600 dark:text-gray-300">
								<div className="flex items-start gap-x-3">
									<GiClothes className="text-accent mt-1 h-5 w-5 flex-none" />
									<span>Catalog all clothing and furniture items</span>
								</div>
								<div className="flex items-start gap-x-3">
									<GiBackpack className="text-accent mt-1 h-5 w-5 flex-none" />
									<span>Track all resources and their uses</span>
								</div>
								<div className="flex items-start gap-x-3">
									<FaBuilding className="text-accent mt-1 h-5 w-5 flex-none" />
									<span>Manage building projects and deeds</span>
								</div>
							</dd>
						</div>
					</dl>
				</div>
			</div>

			<div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
				<svg
					className="absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200 dark:stroke-white/10"
					aria-hidden="true"
				>
					<defs>
						<pattern
							id="cta-pattern"
							width="200"
							height="200"
							x="50%"
							y="0"
							patternUnits="userSpaceOnUse"
						>
							<path d="M.5 200V.5H200" fill="none" />
						</pattern>
					</defs>
					<svg
						x="50%"
						y="0"
						className="overflow-visible fill-gray-200/20 dark:fill-gray-800/20"
					>
						<path
							d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
							strokeWidth="0"
						/>
					</svg>
					<rect width="100%" height="100%" strokeWidth="0" fill="url(#cta-pattern)" />
				</svg>
				<div
					className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
					aria-hidden="true"
				>
					<div
						className="from-accent to-primary relative left-[calc(50%-11rem)] aspect-[1108/632] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					></div>
				</div>

				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
						Ready to start tracking?
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
						Begin organizing your Dinkum adventure today and never lose track of your
						progress again!
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Button as={Link} href="/playthrough/new" color="primary" size="xl">
							<GiPartyPopper className="mr-2 h-5 w-5" />
							Create New Playthrough
						</Button>
						<Button as={Link} href="/playthrough/list" color="light" size="xl">
							View Existing Playthroughs
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
