/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import { Card, Checkbox, Label, Badge } from "flowbite-react";
import { books } from "@/data/dinkum/books";
import { BooksTabHandle, BooksTabProps } from "@/types/dinkum";
import { updatePlaythroughData } from "@/lib/localStorage";
import { HiCheck } from "react-icons/hi";
import SaveAlert from "@/comps/SaveAlert";

const BooksTab = forwardRef<BooksTabHandle, BooksTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [localBooksState, setLocalBooksState] = useState<Record<string, boolean>>(collected);

	const isDirty = useRef(false);

	useEffect(() => {
		setLocalBooksState(collected);
		isDirty.current = false;
	}, [collected]);

	const handleToggleCollected = (id: string, isCollected: boolean) => {
		setLocalBooksState((prev) => ({
			...prev,
			[id]: isCollected,
		}));

		isDirty.current = true;
	};

	const saveBooks = () => {
		if (!playthroughId || !isDirty.current) return false;

		const success = updatePlaythroughData(playthroughId, {
			books: localBooksState,
		});

		if (success) {
			isDirty.current = false;
			return true;
		}

		return false;
	};

	useImperativeHandle(ref, () => ({
		saveBooks,
	}));

	const getCollectedCount = () => {
		return Object.keys(localBooksState).filter((key) => localBooksState[key]).length;
	};

	return (
		<div className="space-y-6">
			<div>
				<div className="mb-2 flex items-center justify-between">
					<h1 className="text-primary text-2xl font-bold">
						Books ({getCollectedCount()} / {books.length})
					</h1>
					<Badge color="blue" size="lg">
						{Math.round((getCollectedCount() / books.length) * 100)}% collected
					</Badge>
				</div>

				{isDirty.current && (
					<SaveAlert message="Your book collection has not been saved yet." />
				)}
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{books.map((book) => {
					const isCollected = localBooksState[book.id] === true;

					return (
						<Card
							key={book.id}
							className={`h-full ${
								isCollected
									? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10"
									: ""
							}`}
						>
							<div className="flex h-full flex-col">
								<div className="mb-2 flex items-start justify-between">
									<h3 className="text-lg font-medium">{book.name}</h3>
									{isCollected && (
										<div className="rounded-full bg-green-500 p-1 text-white">
											<HiCheck className="h-4 w-4" />
										</div>
									)}
								</div>

								<div className="flex items-center justify-center py-4">
									{book.img && (
										<div className="relative h-24 w-24">
											<img
												src={book.img}
												alt={book.name}
												className="h-full w-full object-contain"
											/>
										</div>
									)}
								</div>

								<div className="mt-2 flex-grow space-y-4 text-sm">
									{book.details.map((detail, index) => (
										<div
											key={index}
											className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
										>
											<div className="mb-2 flex">
												<p className="w-32 font-medium">Acquired From:</p>
												<p>{detail.aquiredFrom}</p>
											</div>

											{detail.requirements && (
												<div className="mb-2 flex">
													<p className="w-32 font-medium">
														Requirements:
													</p>
													<p>{detail.requirements}</p>
												</div>
											)}

											<div className="grid grid-cols-2 gap-2">
												{detail.buyingPrice > 0 && (
													<div className="flex items-center">
														<p className="mr-2 font-medium">Buy:</p>
														<div className="flex items-center">
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
																alt="Dinks"
																className="mr-1 h-4 w-4"
															/>
															<span>
																{detail.buyingPrice.toLocaleString()}
															</span>
														</div>
													</div>
												)}

												{detail.sellingPrice > 0 && (
													<div className="flex items-center">
														<p className="mr-2 font-medium">Sell:</p>
														<div className="flex items-center">
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
																alt="Dinks"
																className="mr-1 h-4 w-4"
															/>
															<span>
																{detail.sellingPrice.toLocaleString()}
															</span>
														</div>
													</div>
												)}
											</div>
										</div>
									))}
								</div>

								<div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
									<div className="flex items-center">
										<Checkbox
											id={`collected-${book.id}`}
											checked={isCollected}
											onChange={(e) =>
												handleToggleCollected(book.id, e.target.checked)
											}
											className="mr-2"
										/>
										<Label
											htmlFor={`collected-${book.id}`}
											className="cursor-pointer"
										>
											Collected
										</Label>
									</div>
								</div>
							</div>
						</Card>
					);
				})}
			</div>
		</div>
	);
});

BooksTab.displayName = "BooksTab";

export default BooksTab;
