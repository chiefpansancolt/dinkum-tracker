/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "flowbite-react";
import { NPCCardProps } from "@/types";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "../ui/itemcard/ItemDetail";

const NPCCard: React.FC<NPCCardProps> = ({ npc, hearts, onHeartsChange }) => {
	const fullHearts = Math.floor(hearts);
	const quarterHearts = Math.round((hearts - fullHearts) * 4);

	const maxHearts = 5;

	const renderHeartSection = () => {
		return (
			<div className="mt-4 border-t border-gray-200 pt-3 dark:border-gray-700">
				<div className="flex items-center gap-1">
					<div className="flex-grow">
						<div className="flex items-center">
							{Array.from({ length: maxHearts }).map((_, index) => {
								const isFull = index < fullHearts;
								const isPartial = index === fullHearts && quarterHearts > 0;

								return (
									<div key={index} className="relative h-6 w-6 cursor-pointer">
										<HiOutlineHeart
											className="absolute h-6 w-6 text-gray-500 dark:text-gray-100"
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

						<span className="w-16 text-center text-gray-900 dark:text-gray-50">
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
		<ItemCard
			renderHeader={() => <ItemHeader title={npc.name} />}
			renderImage={() => <ItemImage src={npc.img} name={npc.name} isCollected={false} />}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					<ItemDetail label="Ocupation" details={npc.occupation} />

					<div>
						<h4 className="font-semibold text-gray-900 underline dark:text-gray-50">
							Requirements:
						</h4>
						<div className="mt-1 ml-2 space-y-1">
							<ItemDetail label="Visit" details={npc.requirements.visit} />
							<ItemDetail label="Move In" details={npc.requirements.moveIn} />
						</div>
					</div>

					<div>
						<h4 className="font-semibold text-gray-900 underline dark:text-gray-50">
							Food Preferences:
						</h4>
						<div className="mt-1 ml-2 space-y-1">
							{npc.foodPreferences.likes !== "None" ? (
								<ItemDetail
									label="Likes"
									details={npc.foodPreferences.likes}
									iconComp={
										npc.foodPreferences.likesImg
											? () => (
													<img
														src={npc.foodPreferences.likesImg}
														alt={`${npc.foodPreferences.likes} icon`}
														className="mr-1 h-5 w-5 object-contain"
													/>
												)
											: undefined
									}
								/>
							) : (
								<ItemDetail label="Likes" details="None" />
							)}

							{npc.foodPreferences.dislikes !== "None" ? (
								<ItemDetail
									label="Dislikes"
									details={npc.foodPreferences.dislikes}
									iconComp={
										npc.foodPreferences.dislikesImg
											? () => (
													<img
														src={npc.foodPreferences.dislikesImg}
														alt={`${npc.foodPreferences.dislikes} icon`}
														className="mr-1 h-5 w-5 object-contain"
													/>
												)
											: undefined
									}
								/>
							) : (
								<ItemDetail label="DisLikes" details="None" />
							)}
						</div>
					</div>
				</div>
			)}
			renderFooter={() => renderHeartSection()}
		/>
	);
};

export default NPCCard;
