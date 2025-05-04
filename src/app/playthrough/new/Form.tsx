"use client";

import { Alert, Button, Card, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createEmptyPlaythrough, savePlaythrough } from "@/lib/storage";

export default function NewPlaythroughForm() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!name.trim()) {
			setError("Please enter a name for your playthrough");
			return;
		}

		setIsSubmitting(true);
		setError("");

		try {
			const newPlaythrough = createEmptyPlaythrough(name.trim());
			savePlaythrough(newPlaythrough);

			router.push("/playthrough/list");
		} catch (err) {
			console.error("Error creating playthrough:", err);
			setError("Failed to create playthrough. Please try again.");
			setIsSubmitting(false);
		}
	};

	return (
		<div className="mx-auto max-w-md">
			<Card className="text-gray-900 dark:text-gray-50">
				<h2 className="mb-6 text-2xl font-bold">Create New Playthrough</h2>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name">Playthrough Name</Label>
						</div>
						<TextInput
							id="name"
							placeholder="My Dinkum Adventure"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
							Give your playthrough a memorable name to help you identify it later.
						</p>
					</div>

					{error && <Alert color="failure">{error}</Alert>}

					<div className="flex justify-end">
						<Button type="submit" color="primary" disabled={isSubmitting}>
							{isSubmitting ? "Creating..." : "Create Playthrough"}
						</Button>
					</div>
				</form>
			</Card>
		</div>
	);
}
