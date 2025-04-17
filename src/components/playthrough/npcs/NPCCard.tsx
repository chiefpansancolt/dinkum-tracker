/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, Button } from "flowbite-react";
import { NPCCardProps } from "@/types/dinkum";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

const NPCCard: React.FC<NPCCardProps> = ({ npc, hearts, onHeartsChange }) => {
	const fullHearts = Math.floor(hearts);
	const quarterHearts = Math.round((hearts - fullHearts) * 4);

	const maxHearts = 5;

	const renderHeartSection = () => {
		return (
			<div className="mt-auto border-t border-gray-200 pt-3 dark:border-gray-700">
				<div className="flex items-center gap-1">
					<div className="flex-grow">
						<div className="flex items-center">
							{Array.from({ length: maxHearts }).map((_, index) => {
								const isFull = index < fullHearts;
								const isPartial = index === fullHearts && quarterHearts > 0;

								return (
									<div key={index} className="relative h-6 w-6 cursor-pointer">
										<HiOutlineHeart
											className="absolute h-6 w-6 text-gray-400"
											onClick={() => {
												if (index >= fullHearts) {
													onHeartsChange(npc.id, index + 1);
												} else {
													onHeartsChange(npc.id, index + 1);
												}
											}}
										/>

										{isFull && (
											<HiHeart
												className="absolute h-6 w-6 text-red-500"
												onClick={() => onHeartsChange(npc.id, index)}
											/>
										)}

										{isPartial && (
											<div className="absolute h-6 w-6 overflow-hidden">
												<HiHeart
													className="h-6 w-6 text-red-500"
													style={{
														clipPath: `inset(0 ${100 - quarterHearts * 25}% 0 0)`,
													}}
												/>
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>

					<div className="flex items-center gap-2">
						<Button
							color="gray"
							size="sm"
							onClick={() => {
								const newValue = Math.max(0, hearts - 0.25);
								onHeartsChange(npc.id, newValue);
							}}
							disabled={hearts <= 0}
						>
							<span className="sr-only">Decrease hearts</span>-
						</Button>

						<span className="w-16 text-center">
							{hearts
								.toFixed(2)
								.replace(/\.00$/, "")
								.replace(/\.50$/, ".5")
								.replace(/\.25$/, ".25")
								.replace(/\.75$/, ".75")}{" "}
							/ {maxHearts}
						</span>

						<Button
							color="gray"
							size="sm"
							onClick={() => {
								const newValue = Math.min(maxHearts, hearts + 0.25);
								onHeartsChange(npc.id, newValue);
							}}
							disabled={hearts >= maxHearts}
						>
							<span className="sr-only">Increase hearts</span>+
						</Button>
					</div>
				</div>
			</div>
		);
	};

	return (
		<Card className="flex h-full">
			<div className="flex h-full flex-col">
				<div className="mb-4 flex-grow">
					<div className="flex items-start">
						<h3 className="text-primary text-xl font-bold">{npc.name}</h3>
					</div>

					<div className="mt-4 flex flex-col gap-4 md:flex-row">
						<div className="flex items-center justify-center md:w-1/4">
							<img
								src={npc.img}
								alt={npc.name}
								className="h-24 w-24 object-contain"
							/>
						</div>

						<div className="flex-1 md:w-3/4">
							<div className="space-y-3">
								<div>
									<h4 className="font-semibold text-gray-700 dark:text-gray-300">
										Occupation
									</h4>
									<p className="text-sm whitespace-pre-line">{npc.occupation}</p>
								</div>

								<div>
									<h4 className="font-semibold text-gray-700 dark:text-gray-300">
										Requirements
									</h4>
									<div className="space-y-1">
										<p className="text-sm">
											<span className="font-medium">Visit:</span>{" "}
											{npc.requirements.visit}
										</p>
										<p className="text-sm">
											<span className="font-medium">Move In:</span>{" "}
											{npc.requirements.moveIn}
										</p>
									</div>
								</div>

								<div>
									<h4 className="font-semibold text-gray-700 dark:text-gray-300">
										Food Preferences
									</h4>
									<div className="space-y-1">
										{npc.foodPreferences.likes !== "None" ? (
											<div className="flex items-center">
												<span className="mr-2 text-sm font-medium">
													Likes:
												</span>
												{npc.foodPreferences.likesImg && (
													<img
														src={npc.foodPreferences.likesImg}
														alt={`${npc.foodPreferences.likes} icon`}
														className="mr-1 h-5 w-5 object-contain"
													/>
												)}
												<span className="text-sm">
													{npc.foodPreferences.likes}
												</span>
											</div>
										) : (
											<p className="text-sm">
												<span className="font-medium">Likes:</span> None
											</p>
										)}

										{npc.foodPreferences.dislikes !== "None" ? (
											<div className="flex items-center">
												<span className="mr-2 text-sm font-medium">
													Dislikes:
												</span>
												{npc.foodPreferences.dislikesImg && (
													<img
														src={npc.foodPreferences.dislikesImg}
														alt={`${npc.foodPreferences.dislikes} icon`}
														className="mr-1 h-5 w-5 object-contain"
													/>
												)}
												<span className="text-sm whitespace-pre-line">
													{npc.foodPreferences.dislikes}
												</span>
											</div>
										) : (
											<p className="text-sm">
												<span className="font-medium">Dislikes:</span> None
											</p>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{renderHeartSection()}
			</div>
		</Card>
	);
};

export default NPCCard;
