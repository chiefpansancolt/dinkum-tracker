"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEmptyPlaythrough, savePlaythrough } from "../lib/localStorage";

export default function NewPlaythroughForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!name.trim()) {
            setError("Please enter a name for your playthrough");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            // Create a new playthrough and save it to localStorage
            const newPlaythrough = createEmptyPlaythrough(name.trim());
            savePlaythrough(newPlaythrough);

            // Redirect to the playthroughs page
            router.push("/playthroughs");
        } catch (err) {
            console.error("Error creating playthrough:", err);
            setError("Failed to create playthrough. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-6">Create New Playthrough</h2>

            <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Playthrough Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="input"
                    placeholder="My Dinkum Adventure"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <p className="text-sm text-gray-500 mt-1">
                    Give your playthrough a memorable name to help you identify it later.
                </p>
            </div>

            {error && <div className="mb-6 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

            <div className="flex justify-end">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Playthrough"}
                </button>
            </div>
        </form>
    );
}
