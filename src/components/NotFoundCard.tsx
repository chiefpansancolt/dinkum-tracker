import { Card, Button } from "flowbite-react";
import Link from "next/link";
import { NotFoundCardProps } from "@/types";

export default function NotFoundCard({ message }: NotFoundCardProps) {
	return (
		<Card className="mx-auto max-w-lg py-8 text-center">
			<h2 className="mb-4 text-xl font-medium text-gray-700">{message}</h2>
			<p className="mb-6 text-gray-600">
				The item you&apos;re looking for could not be found. It may have been deleted or you
				may have followed an invalid link.
			</p>
			<div className="flex justify-center">
				<Button as={Link} href="/playthrough/list" color="primary">
					View All Playthroughs
				</Button>
			</div>
		</Card>
	);
}
