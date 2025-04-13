"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PlaythroughCard from "../../components/PlaythroughCard";
import { getPlaythroughs, Playthrough } from "../../lib/localStorage";

export default function PlaythroughsPage() {
    const [playthroughs, setPlaythroughs] = useState<Playthrough[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load playthroughs from localStorage on component mount
        setPlaythroughs(getPlaythroughs());
        setIsLoading(false);
    }, []);

    const handleDelete = () => {
        // Refresh the list after deletion
        setPlaythroughs(getPlaythroughs());
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary">My Playthroughs</h1>
                <Link href="/new-playthrough" className="btn btn-primary">
                    New Playthrough
                </Link>
            </div>

            {isLoading ? (
                <div className="text-center py-8">
                    <p>Loading playthroughs...</p>
                </div>
            ) : playthroughs.length === 0 ? (
                <div className="card bg-gray-50 text-center py-12">
                    <h2 className="text-xl font-medium text-gray-700 mb-4">No Playthroughs Found</h2>
                    <p className="text-gray-600 mb-6">
                        You haven't created any playthroughs yet. Start tracking your Dinkum adventure!
                    </p>
                    <Link href="/new-playthrough" className="btn btn-primary inline-block">
                        Create Your First Playthrough
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {playthroughs.map((playthrough) => (
                        <PlaythroughCard key={playthrough.id} playthrough={playthrough} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}
