import type { ReactNode } from "react";
import { SavedChip } from "@/comps/ui/SavedChip";
import { SyncChip } from "./SyncChip";

interface PageHeaderProps {
	title: string;
	subline?: string;
	actions?: ReactNode;
	/** False for a page that saves nothing, such as a calculator. */
	showSaved?: boolean;
}

export function PageHeader({ title, subline, actions, showSaved = true }: PageHeaderProps) {
	return (
		<header className="flex flex-wrap items-center justify-between gap-4">
			<div className="flex flex-col">
				<h1 className="text-2xl font-semibold max-lg:sr-only">{title}</h1>
				{subline && <span className="text-muted max-lg:sr-only">{subline}</span>}
			</div>
			<div className="flex flex-wrap items-center gap-3">
				{actions}
				{showSaved && (
					<span className="flex items-center gap-3 max-lg:hidden">
						<SavedChip />
						<SyncChip />
					</span>
				)}
			</div>
		</header>
	);
}
