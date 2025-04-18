import Link from "next/link";
import { Card, Button, Badge } from "flowbite-react";
import { FaFish, FaBug, FaCalendarDays, FaBuilding } from "react-icons/fa6";
import { GiPartyPopper, GiMineralPearls } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

export default function Home() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="space-y-8">
				<div className="rounded-lg bg-gradient-to-r from-secondary/30 to-primary/20 p-8 shadow-lg">
					<h1 className="text-primary mb-4 text-4xl font-bold">
						Welcome to Dinkum Tracker
					</h1>
					<p className="mb-6 text-lg">
						Track your progress as you explore the relaxing world of Dinkum. Keep tabs on 
						your collections, relationships, licenses, and milestones - all saved locally 
						in your browser.
					</p>
					<div className="flex flex-col gap-4 sm:flex-row">
						<Button as={Link} href="/playthrough/list" color="primary" size="lg">
							View My Playthroughs
						</Button>
						<Button as={Link} href="/playthrough/new" color="secondary" size="lg">
							Start New Adventure
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<Card className="border-t-4 border-t-accent overflow-hidden">
						<div className="flex items-center gap-3">
							<div className="rounded-full bg-accent/10 p-3">
								<MdDashboard className="h-6 w-6 text-accent" />
							</div>
							<h2 className="text-primary text-xl font-bold">
								Comprehensive Tracking
							</h2>
						</div>
						<p className="mt-2 text-gray-600 dark:text-gray-400">
							Monitor all aspects of your Dinkum adventure with an intuitive dashboard that 
							gives you a complete overview of your progress.
						</p>
						<div className="mt-4 flex flex-wrap gap-2">
							<Badge color="info">Fish</Badge>
							<Badge color="success">Bugs</Badge>
							<Badge color="purple">Critters</Badge>
							<Badge color="warning">Milestones</Badge>
							<Badge color="indigo">Licenses</Badge>
							<Badge color="blue">Buildings</Badge>
						</div>
					</Card>

					<Card className="border-t-4 border-t-primary overflow-hidden">
						<div className="flex items-center gap-3">
							<div className="rounded-full bg-primary/10 p-3">
								<FaCalendarDays className="h-6 w-6 text-primary" />
							</div>
							<h2 className="text-primary text-xl font-bold">
								Seasonal Calendar
							</h2>
						</div>
						<p className="mt-2 text-gray-600 dark:text-gray-400">
							Keep track of important dates, birthdays, and seasonal events. Never miss 
							another festival or special occasion in your Dinkum town.
						</p>
						<div className="mt-4 flex flex-wrap gap-2">
							<Badge color="warning">Summer Events</Badge>
							<Badge color="orange">Autumn Activities</Badge>
							<Badge color="info">Winter Celebrations</Badge>
							<Badge color="success">Spring Festivals</Badge>
						</div>
					</Card>

					<Card className="border-t-4 border-t-secondary overflow-hidden">
						<div className="flex items-center gap-3">
							<div className="rounded-full bg-secondary/10 p-3">
								<FaUsers className="h-6 w-6 text-secondary" />
							</div>
							<h2 className="text-primary text-xl font-bold">
								Villager Relationships
							</h2>
						</div>
						<p className="mt-2 text-gray-600 dark:text-gray-400">
							Monitor your friendships with townspeople, track gift preferences, and keep 
							notes on special requirements to invite new residents.
						</p>
						<div className="mt-4 flex flex-wrap gap-2">
							<Badge color="red">Friendships</Badge>
							<Badge color="pink">Birthdays</Badge>
							<Badge color="purple">Gift Preferences</Badge>
							<Badge color="indigo">Relationship Levels</Badge>
						</div>
					</Card>
				</div>

				<Card className="bg-accent/5 p-6">
					<h2 className="text-primary mb-6 text-2xl font-bold">Featured Trackers</h2>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						<div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
							<div className="mb-3 flex items-center justify-center">
								<div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
									<FaFish className="h-7 w-7 text-blue-600" />
								</div>
							</div>
							<h3 className="mb-2 text-center text-lg font-semibold">Fish Collection</h3>
							<p className="text-center text-sm text-gray-600 dark:text-gray-400">
								Track all 45+ fish species across different seasons, locations, and times of day.
							</p>
						</div>

						<div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
							<div className="mb-3 flex items-center justify-center">
								<div className="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
									<FaBug className="h-7 w-7 text-red-600" />
								</div>
							</div>
							<h3 className="mb-2 text-center text-lg font-semibold">Bug Collection</h3>
							<p className="text-center text-sm text-gray-600 dark:text-gray-400">
								Catalog over 50 different bugs with details on rarity and habitat.
							</p>
						</div>

						<div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
							<div className="mb-3 flex items-center justify-center">
								<div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
									<FaBuilding className="h-7 w-7 text-green-600" />
								</div>
							</div>
							<h3 className="mb-2 text-center text-lg font-semibold">Buildings & Deeds</h3>
							<p className="text-center text-sm text-gray-600 dark:text-gray-400">
								Keep track of construction projects, deed costs, and building requirements.
							</p>
						</div>

						<div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
							<div className="mb-3 flex items-center justify-center">
								<div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
									<GiMineralPearls className="h-7 w-7 text-purple-600" />
								</div>
							</div>
							<h3 className="mb-2 text-center text-lg font-semibold">Collectibles</h3>
							<p className="text-center text-sm text-gray-600 dark:text-gray-400">
								Monitor your progress with books, clothing, furniture, and more.
							</p>
						</div>
					</div>
				</Card>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<Card>
						<h2 className="text-primary mb-4 text-xl font-bold">How It Works</h2>
						<ol className="ml-5 list-decimal space-y-3">
							<li className="pl-2">
								<span className="font-medium">Create a playthrough</span> - Give your Dinkum 
								save a name to help you identify it
							</li>
							<li className="pl-2">
								<span className="font-medium">Track your collection</span> - Mark items as 
								found and donated to the museum
							</li>
							<li className="pl-2">
								<span className="font-medium">Monitor milestones</span> - Keep track of your 
								achievements and permit points earned
							</li>
							<li className="pl-2">
								<span className="font-medium">Manage relationships</span> - Track friendship 
								levels with villagers
							</li>
							<li className="pl-2">
								<span className="font-medium">All data saved locally</span> - Everything is stored 
								in your browser, no account needed
							</li>
						</ol>
					</Card>

					<Card>
						<h2 className="text-primary mb-4 text-xl font-bold">About Dinkum Tracker</h2>
						<p className="mb-4">
							This tracker was built by fans, for fans of the relaxing Australian-themed 
							life simulator. All game data is sourced from the{" "}
							<a
								href="https://dinkum.fandom.com/wiki/Dinkum_Wiki"
								className="text-primary hover:text-accent font-medium"
								target="_blank"
								rel="noopener noreferrer"
							>
								Dinkum Wiki
							</a>
							.
						</p>
						<p className="mb-4">
							Dinkum Tracker is an open-source project that aims to enhance your gameplay 
							experience by allowing you to easily track all aspects of your progress.
						</p>
						<div className="flex justify-between">
							<Badge color="purple" size="lg">No Account Needed</Badge>
							<Badge color="blue" size="lg">Fully Responsive</Badge>
							<Badge color="success" size="lg">Open Source</Badge>
						</div>
					</Card>
				</div>

				<Card className="bg-gradient-to-br from-primary/10 to-accent/10">
					<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
						<div>
							<h2 className="text-accent mb-3 text-2xl font-bold">Ready to start tracking?</h2>
							<p className="text-lg">
								Begin organizing your Dinkum adventure today and never lose track of your progress again!
							</p>
						</div>
						<div className="flex flex-col gap-4 sm:flex-row">
							<Button as={Link} href="/playthrough/new" color="primary" size="lg">
								<GiPartyPopper className="mr-2 h-5 w-5" />
								Create New Playthrough
							</Button>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
