"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { PageHeader } from "@/comps/layout/PageHeader";
import { Button } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { PlaythroughForm } from "./PlaythroughForm";
import { useCreatePlaythrough } from "./useCreatePlaythrough";

const STEPS = ["one", "two", "three"] as const;

export function NewPlaythroughPage() {
	const t = useTranslations("playthroughs");
	const router = useRouter();
	const formId = useId();
	const create = useCreatePlaythrough();
	const [busy, setBusy] = useState(false);
	const [failed, setFailed] = useState(false);

	return (
		<>
			<PageHeader title={t("new.pageTitle")} subline={t("new.pageSubline")} />
			<Link href="/playthroughs" className="text-link self-start underline">
				{t("new.back")}
			</Link>
			<div className="grid items-start gap-4 lg:grid-cols-[minmax(0,35rem)_minmax(0,24rem)]">
				<Card className="flex flex-col gap-4 p-5">
					<h2 className="text-xl font-semibold">{t("form.title")}</h2>
					<PlaythroughForm
						formId={formId}
						onCreate={create}
						onCreated={() => router.push("/playthroughs")}
						onBusyChange={setBusy}
						onFailedChange={setFailed}
					/>
					<div className="flex gap-2 max-sm:flex-col-reverse sm:flex-wrap sm:justify-end">
						<Button
							onClick={() => router.push("/playthroughs")}
							className="max-sm:w-full"
						>
							{t("form.cancel")}
						</Button>
						<Button
							type="submit"
							form={formId}
							variant="primary"
							loading={busy}
							className="max-sm:w-full"
						>
							{busy
								? t("form.creating")
								: failed
									? t("form.tryAgain")
									: t("form.create")}
						</Button>
					</div>
				</Card>
				<Card className="flex flex-col gap-3 p-5">
					<h2 className="font-semibold">{t("new.next.title")}</h2>
					<ol className="flex flex-col gap-3">
						{STEPS.map((step, index) => (
							<li key={step} className="flex items-start gap-3">
								<span
									aria-hidden="true"
									className="border-line flex size-7 shrink-0 items-center justify-center rounded-full border-[1.5px] font-mono text-xs"
								>
									{index + 1}
								</span>
								<span>{t(`new.next.${step}`)}</span>
							</li>
						))}
					</ol>
				</Card>
			</div>
		</>
	);
}
