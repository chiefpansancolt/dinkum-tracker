"use client";

import { ROOT_FOLDER } from "@gamerdexapp/gamerdex-sync";
import { useTranslations } from "next-intl";
import { type SyncProviderId, usesRepository } from "@/lib/sync/providers";
import { DATA_REPOSITORY_NAME } from "@/lib/sync/repository";
import { Button } from "@/comps/ui/Button";

function Step({ number, children }: { number: number; children: string }) {
	return (
		<li className="flex items-start gap-3">
			<span
				aria-hidden="true"
				className="bg-primary text-on-primary flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
			>
				{number}
			</span>
			<span className="pt-0.5">{children}</span>
		</li>
	);
}

interface ConnectPanelProps {
	provider: SyncProviderId;
	pickAnother: boolean;
	onConnect: () => void;
}

export function ConnectPanel({ provider, pickAnother, onConnect }: ConnectPanelProps) {
	const t = useTranslations("sync");
	const name = usesRepository(provider) ? DATA_REPOSITORY_NAME : ROOT_FOLDER;

	return (
		<div className="border-primary bg-tint flex flex-col gap-3 rounded-md border-[1.5px] p-4">
			<h3 className="text-base font-semibold">
				{t("connect.panelTitle", { provider: t(`provider.${provider}.name`) })}
			</h3>
			<ol className="flex flex-col gap-3">
				<Step number={1}>{t(`connect.${provider}.step1`, { name })}</Step>
				<Step number={2}>{t(`connect.${provider}.step2`, { name })}</Step>
				<Step number={3}>{t("connect.firstSync")}</Step>
			</ol>
			<div className="flex flex-wrap items-center gap-3">
				<Button variant="primary" onClick={onConnect}>
					{t(`connect.${provider}.button`)}
				</Button>
				{pickAnother && <span className="text-muted">{t("connect.another")}</span>}
			</div>
		</div>
	);
}
