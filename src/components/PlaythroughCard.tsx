"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Playthrough, deletePlaythrough } from "../lib/localStorage";

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
            Object.values(playthrough.collections).reduce((acc, curr) => acc + (curr.length || 0), 0) +
            Object.values(playthrough.milestones).length;

        // Count completed items
        const completedItems =
            Object.values(playthrough.collections).reduce((acc, curr) => acc + curr.length, 0) +
            Object.values(playthrough.milestones).filter((value) => value === true).length;

        if (totalItems === 0) return 0;
        return Math.round((completedItems / totalItems) * 100);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this playthrough? This action cannot be undone.")) {
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
        <div className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-primary">{playthrough.name}</h3>
                <span className="bg-secondary text-white px-2 py-1 rounded text-sm">{completion}% Complete</span>
            </div>

            <div className="mt-4 text-sm text-gray-600">
                <p>Created: {formatDate(playthrough.createdAt)}</p>
                <p>Last Updated: {formatDate(playthrough.lastUpdated)}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
                <div>
                    <h4 className="font-medium">Collections</h4>
                    <ul className="text-sm mt-1">
                        <li>Animals: {playthrough.collections.animals.length}</li>
                        <li>Fish: {playthrough.collections.fish.length}</li>
                        <li>Bugs: {playthrough.collections.bugs.length}</li>
                        <li>Minerals: {playthrough.collections.minerals.length}</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-medium">Milestones</h4>
                    <p className="text-sm mt-1">
                        {Object.values(playthrough.milestones).filter((v) => v).length} completed
                    </p>
                </div>
            </div>

            <div className="mt-6 flex gap-3">
                <button onClick={handleEdit} className="btn btn-primary flex-1">
                    Edit
                </button>
                <button onClick={handleDelete} className="btn btn-danger flex-1" disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
}
