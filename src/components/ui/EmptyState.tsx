import type { ReactNode } from "react";
import { Card } from "./Card";

export function EmptyState({
	title,
	description,
	actions,
}: {
	title: string;
	description: string;
	actions?: ReactNode;
}) {
	return (
		<Card className="flex flex-col items-center gap-3 px-6 py-12 text-center">
			<h2 className="text-lg font-semibold">{title}</h2>
			<p className="text-muted max-w-md">{description}</p>
			{actions && (
				<div className="flex flex-wrap items-center justify-center gap-3">{actions}</div>
			)}
		</Card>
	);
}
