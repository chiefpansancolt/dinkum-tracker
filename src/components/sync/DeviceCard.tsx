"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useSync } from "@/lib/contexts/SyncContext";
import { Card } from "@/comps/ui/Card";
import { Field } from "@/comps/ui/Field";
import { Input } from "@/comps/ui/Input";

export function DeviceCard() {
	const t = useTranslations("sync.device");
	const { activePlaythrough } = usePlaythrough();
	const { deviceName, setDeviceName } = useSync();
	const [draft, setDraft] = useState<string | null>(null);

	const commit = () => {
		if (draft !== null) setDeviceName(draft);
		setDraft(null);
	};

	return (
		<Card className="flex flex-col gap-4 p-4">
			<h2 className="text-base font-semibold">{t("title")}</h2>
			<Field label={t("name")} hint={t("nameHint")}>
				<Input
					value={draft ?? deviceName}
					maxLength={60}
					onChange={(event) => setDraft(event.target.value)}
					onBlur={commit}
					onKeyDown={(event) => {
						if (event.key === "Enter") event.currentTarget.blur();
					}}
				/>
			</Field>
			<dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
				<dt className="text-muted">{t("activePlaythrough")}</dt>
				<dd className="text-end">{activePlaythrough?.name ?? t("noPlaythrough")}</dd>
				<dt className="text-muted">{t("login")}</dt>
				<dd className="text-end">{t("loginValue")}</dd>
			</dl>
			<p className="text-muted">{t("loginHint")}</p>
		</Card>
	);
}
