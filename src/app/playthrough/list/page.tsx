"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, Spinner } from "flowbite-react";
import PlaythroughCard from "./Card";
import { getPlaythroughs } from "@/lib/localStorage";
import { Playthrough } from "@/types/app";

export default function PlaythroughsPage() {
	const [playthroughs, setPlaythroughs] = useState<Playthrough[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setPlaythroughs(getPlaythroughs());
			setIsLoading(false);
		}
	}, []);

	const handleDelete = () => {
		setPlaythroughs(getPlaythroughs());
	};

	return (
		<div className="px-4 py-8">
			<div className="mb-6 flex">
				<h1 className="text-primary text-3xl font-bold">My Playthroughs</h1>
			</div>

			{isLoading ? (
				<div className="py-8 text-center">
					<Spinner size="xl" />
					<p className="mt-2">Loading playthroughs...</p>
				</div>
			) : playthroughs.length === 0 ? (
				<Card className="py-8 text-center">
					<h2 className="mb-4 text-xl font-medium text-gray-700">
						No Playthroughs Found
					</h2>
					<p className="mb-6 text-gray-600">
						You haven&apos;t created any playthroughs yet. Start tracking your Dinkum
						adventure!
					</p>
					<div className="flex justify-center">
						<Button as={Link} href="/playthrough/new" color="primary">
							Create Your First Playthrough
						</Button>
					</div>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{playthroughs.map((playthrough) => (
						<PlaythroughCard
							key={playthrough.id}
							playthrough={playthrough}
							onDelete={handleDelete}
						/>
					))}
				</div>
			)}
		</div>
	);
}
