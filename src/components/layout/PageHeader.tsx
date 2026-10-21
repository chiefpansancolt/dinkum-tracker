import type { ReactNode } from "react";
import { SavedChip } from "@/comps/ui/SavedChip";

interface PageHeaderProps {
	title: string;
	subline?: string;
	actions?: ReactNode;
}

export function PageHeader({ title, subline, actions }: PageHeaderProps) {
	return (
		<header className="flex flex-wrap items-center justify-between gap-4">
			<div className="flex flex-col">
				<h1 className="text-2xl font-semibold max-lg:sr-only">{title}</h1>
				{subline && <span className="text-muted max-lg:sr-only">{subline}</span>}
			</div>
			<div className="flex flex-wrap items-center gap-3">
				{actions}
				<span className="max-lg:hidden">
					<SavedChip />
				</span>
			</div>
		</header>
	);
}
