"use client";

import { Button, Card } from "flowbite-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaHammer, FaRegClock } from "react-icons/fa6";
import { GiPartyPopper } from "react-icons/gi";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";

export default function DecorationsPage() {
	const params = useParams();
	const playthroughId = params?.id as string;

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name="Your Playthrough" routeName="Decorations" />
			<div className="flex min-h-[70vh] items-center justify-center p-6">
				<Card className="mx-auto max-w-lg text-center">
					<div className="mb-6 flex flex-col items-center">
						<div className="bg-primary/10 text-primary mb-4 flex h-20 w-20 items-center justify-center rounded-full">
							<GiPartyPopper className="h-10 w-10" />
						</div>
						<h1 className="text-primary mb-2 text-3xl font-bold">Coming Soon!</h1>
						<p className="mb-8 text-gray-600 dark:text-gray-300">
							The Decorations tracking feature is currently under development. Check
							back soon to track all your Dinkum decorative items!
						</p>

						<div className="mb-8 flex items-center gap-3 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
							<FaRegClock className="h-6 w-6 text-blue-500 dark:text-blue-300" />
							<p className="text-sm text-blue-700 dark:text-blue-300">
								We&apos;re working hard to bring you a comprehensive tracking system for
								all decorative items in Dinkum.
							</p>
						</div>

						<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
								<FaHammer className="h-5 w-5 text-gray-500 dark:text-gray-400" />
								<span className="text-sm text-gray-700 dark:text-gray-300">
									Track wall decorations
								</span>
							</div>
							<div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
								<FaHammer className="h-5 w-5 text-gray-500 dark:text-gray-400" />
								<span className="text-sm text-gray-700 dark:text-gray-300">
									Track floor decorations
								</span>
							</div>
							<div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
								<FaHammer className="h-5 w-5 text-gray-500 dark:text-gray-400" />
								<span className="text-sm text-gray-700 dark:text-gray-300">
									Track seasonal decorations
								</span>
							</div>
							<div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
								<FaHammer className="h-5 w-5 text-gray-500 dark:text-gray-400" />
								<span className="text-sm text-gray-700 dark:text-gray-300">
									Track event decorations
								</span>
							</div>
						</div>

						<Button
							as={Link}
							href={`/playthrough/${playthroughId}`}
							color="primary"
							className="w-full"
						>
							Return to Dashboard
						</Button>
					</div>
				</Card>
			</div>
		</>
	);
}
