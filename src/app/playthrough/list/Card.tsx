"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, Button, Badge, Progress } from "flowbite-react";
import { Playthrough, deletePlaythrough } from "@/lib/localStorage";

interface PlaythroughCardProps {
	playthrough: Playthrough;
	onDelete: () => void;
}

export default function PlaythroughCard({ playthrough, onDelete }: PlaythroughCardProps) {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	const formatDate = (dateString: string) => {
		if (!dateString) return "N/A";
		const date = new Date(dateString);
		return date.toLocaleDateString();
	};

	const calculateCompletion = () => {
		// Calculate the completion percentage based on collections and milestones
		const totalItems =
			Object.values(playthrough.collections).reduce(
				(acc, curr) => acc + (curr.length || 0),
				0
			) + Object.values(playthrough.milestones).length;

		// Count completed items
		const completedItems =
			Object.values(playthrough.collections).reduce((acc, curr) => acc + curr.length, 0) +
			Object.values(playthrough.milestones).filter((value) => value === true).length;

		if (totalItems === 0) return 0;
		return Math.round((completedItems / totalItems) * 100);
	};

	const handleDelete = () => {
		if (
			window.confirm(
				"Are you sure you want to delete this playthrough? This action cannot be undone."
			)
		) {
			setIsDeleting(true);
			deletePlaythrough(playthrough.id);
			onDelete();
		}
	};

	const handleEdit = () => {
		router.push(`/playthrough/${playthrough.id}`);
	};

	const completion = calculateCompletion();

	return (
		<Card className="transition-shadow hover:shadow-lg">
			<div className="flex items-start justify-between">
				<h3 className="text-primary text-xl font-bold">{playthrough.name}</h3>
				<Badge color="info">{completion}% Complete</Badge>
			</div>

			<Progress progress={completion} color="blue" className="mt-2" />

			<div className="mt-4 text-sm text-gray-600">
				<p>Created: {formatDate(playthrough.createdAt)}</p>
				<p>Last Updated: {formatDate(playthrough.lastUpdated)}</p>
			</div>

			<div className="mt-4 grid grid-cols-2 gap-2">
				<div>
					<h4 className="font-medium">Collections</h4>
					<ul className="mt-1 text-sm">
						<li>Animals: {playthrough.collections.animals.length}</li>
						<li>Fish: {playthrough.collections.fish.length}</li>
						<li>Bugs: {playthrough.collections.bugs.length}</li>
						<li>Minerals: {playthrough.collections.minerals.length}</li>
					</ul>
				</div>
				<div>
					<h4 className="font-medium">Milestones</h4>
					<p className="mt-1 text-sm">
						{Object.values(playthrough.milestones).filter((v) => v).length} completed
					</p>
				</div>
			</div>

			<div className="mt-6 flex gap-3">
				<Button color="primary" onClick={handleEdit} className="flex-1">
					Edit
				</Button>
				<Button color="red" onClick={handleDelete} disabled={isDeleting} className="flex-1">
					{isDeleting ? "Deleting..." : "Delete"}
				</Button>
			</div>
		</Card>
	);
}
