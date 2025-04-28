"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { books } from "@/data/dinkum";
import { Playthrough } from "@/types";
import TabHeader from "@/playthrough/ui/TabHeader";
import BookCard from "./BookCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";

export default function BooksPage() {
	const params = useParams();
	const playthroughId = params?.id as string;
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [bookCollection, setBookCollection] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setBookCollection(data.books || {});
			}

			setIsLoading(false);

			const hashParams = getHashQueryParams();
			if (hashParams.q) {
				setSearchQuery(hashParams.q);
			}
		}
	}, [playthroughId]);

	useEffect(() => {
		if (searchQuery) {
			setHashQueryParam("q", searchQuery);
		} else {
			setHashQueryParam("q", "");
		}
	}, [searchQuery]);

	const handleToggleCollected = (id: string, isCollected: boolean) => {
		setBookCollection((prev) => {
			if (prev[id] !== isCollected) {
				setIsDirty(true);
			}
			return {
				...prev,
				[id]: isCollected,
			};
		});
	};

	const handleSave = () => {
		if (!isDirty) return false;

		const success = updatePlaythroughData(playthroughId, {
			books: bookCollection,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const filteredBooks = searchQuery
		? books.filter((book) => book.name.toLowerCase().includes(searchQuery.toLowerCase()))
		: books;

	const getCollectedCount = () => {
		return Object.keys(bookCollection).filter((key) => bookCollection[key]).length;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading books..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Books" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Books"
					collectionName="Collected"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={getCollectedCount()}
					collectionTotal={books.length}
					dirtyMessage="Your book collection has not been saved yet."
				/>

				<div className="mb-4">
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								className="h-4 w-4 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
						</div>
						<input
							type="search"
							className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
							placeholder="Search books by name..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>

				<div className="mb-4">
					<p className="text-primary font-medium">
						Showing {filteredBooks.length} of {books.length} books
						{getCollectedCount() > 0 && (
							<span className="ml-1">• Collected: {getCollectedCount()}</span>
						)}
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredBooks.map((book) => (
						<BookCard
							key={book.id}
							record={book}
							isCollected={bookCollection[book.id] || false}
							onToggleCollected={handleToggleCollected}
						/>
					))}
				</div>

				<SaveFAB isDirty={isDirty} onSave={handleSave} />
			</div>
		</>
	);
}
