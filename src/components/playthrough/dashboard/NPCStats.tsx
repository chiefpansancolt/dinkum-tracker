/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react";
import { Card } from "flowbite-react";
import { npcs } from "@/data/dinkum";
import { NPCStatsProps } from "@/types/dinkum";
import { HiHeart } from "react-icons/hi";

const NPCStats: React.FC<NPCStatsProps> = ({ collected }) => {
	const residents = useMemo(() => npcs, []);

	const stats = useMemo(() => {
		const totalNPCs = residents.length;
		const friendsCount = Object.keys(collected).filter(
			(npcId) => collected[npcId] > 0
		).length;

		const oneHeartCount = Object.keys(collected).filter(
			(npcId) => collected[npcId] >= 1
		).length;

		const maxHeartCount = Object.keys(collected).filter(
			(npcId) => collected[npcId] >= 5
		).length;

		let avgHearts = 0;
		if (friendsCount > 0) {
			const totalHearts = Object.values(collected).reduce(
				(sum, hearts) => sum + hearts,
				0
			);
			avgHearts = totalHearts / friendsCount;
		}

		return {
			totalNPCs,
			friendsCount,
			oneHeartCount,
			maxHeartCount,
			avgHearts,
		};
	}, [collected, residents]);

	const sortedNPCIds = useMemo(() => {
		return Object.keys(collected)
			.sort((a, b) => (collected[b] || 0) - (collected[a] || 0))
			.slice(0, 5);
	}, [collected]);

	return (
		<Card className="flex h-full flex-col">
			<div className="flex h-full flex-col">
				<div className="flex-none">
					<h2 className="text-primary mb-4 text-xl font-bold">NPC Relationships</h2>
				</div>

				<div className="flex-grow overflow-auto">
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
								<p className="text-sm font-medium text-blue-700 dark:text-blue-300">
									Total NPCs
								</p>
								<p className="text-2xl font-bold">{stats.totalNPCs}</p>
							</div>

							<div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
								<p className="text-sm font-medium text-green-700 dark:text-green-300">
									Friends
								</p>
								<p className="text-2xl font-bold">{stats.friendsCount}</p>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-2">
							<div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/20">
								<p className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
									1+ Hearts
								</p>
								<p className="text-lg font-bold">{stats.oneHeartCount}</p>
							</div>

							<div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-900/20">
								<p className="text-xs font-medium text-purple-700 dark:text-purple-300">
									Max Hearts
								</p>
								<p className="text-lg font-bold">{stats.maxHeartCount}</p>
							</div>

							<div className="rounded-lg bg-red-50 p-2 dark:bg-red-900/20">
								<p className="text-xs font-medium text-red-700 dark:text-red-300">
									Avg Hearts
								</p>
								<p className="text-lg font-bold">{stats.avgHearts.toFixed(1)}</p>
							</div>
						</div>

						{sortedNPCIds.length > 0 ? (
							<div>
								<h3 className="mb-2 text-base font-medium">Top Relationships</h3>
								<div className="space-y-2">
									{sortedNPCIds.map((npcId) => {
										const npc = npcs.find((n) => n.id === npcId);
										const hearts = collected[npcId] || 0;

										if (!npc) return null;

										return (
											<div
												key={npcId}
												className="flex items-center justify-between rounded-lg bg-gray-50 p-2 dark:bg-gray-800"
											>
												<div className="flex items-center">
													<img
														src={npc.img}
														alt={npc.name}
														className="mr-2 h-6 w-6 object-contain"
													/>
													<span className="font-medium">{npc.name}</span>
												</div>
												<div className="flex items-center">
													<span className="mr-1 text-sm">
														{hearts.toFixed(2).replace(/\.00$/, "")}
													</span>
													<HiHeart className="h-5 w-5 text-red-500" />
												</div>
											</div>
										);
									})}
								</div>
							</div>
						) : (
							<div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-800">
								<p className="text-gray-500 italic dark:text-gray-400">
									No NPC collected recorded yet.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
};

export default NPCStats;
