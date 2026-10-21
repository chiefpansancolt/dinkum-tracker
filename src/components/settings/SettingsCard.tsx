import type { ReactNode } from "react";
import { Card } from "@/comps/ui/Card";

interface SettingsCardProps {
	title: string;
	description?: string;
	aside?: ReactNode;
	children: ReactNode;
}

export function SettingsCard({ title, description, aside, children }: SettingsCardProps) {
	return (
		<Card className="flex flex-col gap-3 p-4">
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 flex-col gap-0.5">
					<h2 className="text-base font-semibold">{title}</h2>
					{description && <p className="text-muted">{description}</p>}
				</div>
				{aside}
			</div>
			{children}
		</Card>
	);
}
