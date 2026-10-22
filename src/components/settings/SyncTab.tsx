"use client";

import { formatDateTime, formatNumber } from "@/i18n/formatter";
import { type Conflict, type InstalledRepository, ROOT_FOLDER } from "@gamerdexapp/gamerdex-sync";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { type SyncErrorKind, useSync } from "@/lib/contexts/SyncContext";
import { availableProviders, type SyncProviderId, usesRepository } from "@/lib/sync/providers";
import {
	CREATE_REPOSITORY_URL,
	DATA_REPOSITORY_NAME,
	type DataRepository,
	findDataRepository,
} from "@/lib/sync/repository";
import { ActivityCard } from "@/comps/sync/ActivityCard";
import { ConnectPanel } from "@/comps/sync/ConnectPanel";
import { DeviceCard } from "@/comps/sync/DeviceCard";
import { DisconnectCard } from "@/comps/sync/DisconnectCard";
import { FirstSyncDialog } from "@/comps/sync/FirstSyncDialog";
import { HowSyncWorks } from "@/comps/sync/HowSyncWorks";
import { LivesCard } from "@/comps/sync/LivesCard";
import { PlaythroughsList } from "@/comps/sync/PlaythroughsList";
import { ProviderIcon } from "@/comps/sync/ProviderIcon";
import { ProviderTiles } from "@/comps/sync/ProviderTiles";
import { SyncSettingsCard } from "@/comps/sync/SyncSettingsCard";
import { Badge } from "@/comps/ui/Badge";
import { Button, ButtonLink } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { Note } from "@/comps/ui/Note";
import { SettingsCard } from "./SettingsCard";

const valueText = (value: unknown) =>
	value === undefined ? null : typeof value === "string" ? value : JSON.stringify(value);

type Lookup =
	| { state: "loading" }
	| { state: "failed" }
	| { state: "done"; repository: Exclude<DataRepository, { kind: "ready" }> };

function RepositoryPicker() {
	const t = useTranslations("sync.repository");
	const { listRepositories, chooseRepository, installApp } = useSync();
	const [lookup, setLookup] = useState<Lookup>({ state: "loading" });
	const name = DATA_REPOSITORY_NAME;

	const look = () =>
		listRepositories().then(
			(repositories) => {
				const repository = findDataRepository(repositories);
				if (repository.kind === "ready") chooseRepository(repository.fullName);
				else setLookup({ state: "done", repository });
			},
			() => setLookup({ state: "failed" })
		);

	const checkAgain = () => {
		setLookup({ state: "loading" });
		void look();
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => void look(), []);

	const checkAgainButton = (
		<Button variant="secondary" onClick={checkAgain}>
			{t("recheckButton")}
		</Button>
	);

	return (
		<SettingsCard title={t("title")} description={t("body", { name })}>
			{lookup.state === "loading" && <p className="text-muted">{t("checking", { name })}</p>}
			{lookup.state === "failed" && (
				<>
					<Note tone="warning">{t("checkFailed")}</Note>
					<div>{checkAgainButton}</div>
				</>
			)}
			{lookup.state === "done" && lookup.repository.kind === "public" && (
				<>
					<Note tone="warning">
						{t("public", { fullName: lookup.repository.fullName })}
					</Note>
					<div>{checkAgainButton}</div>
				</>
			)}
			{lookup.state === "done" && lookup.repository.kind === "missing" && (
				<>
					<p className="font-semibold">{t("missing", { name })}</p>
					<ol className="list-decimal space-y-4 ps-5 marker:font-semibold">
						<li className="list-item">
							<span className="block">{t("steps.create", { name })}</span>
							<span className="mt-2 block">
								<ButtonLink
									href={CREATE_REPOSITORY_URL}
									target="_blank"
									rel="noreferrer"
								>
									{t("createButton")}
								</ButtonLink>
							</span>
						</li>
						<li className="list-item">
							<span className="block">{t("steps.install", { name })}</span>
							<span className="mt-2 block">
								<Button onClick={installApp}>{t("installButton")}</Button>
							</span>
						</li>
						<li className="list-item">
							<span className="block">{t("steps.recheck")}</span>
							<span className="mt-2 block">{checkAgainButton}</span>
						</li>
					</ol>
				</>
			)}
		</SettingsCard>
	);
}

function ConflictRow({ conflict }: { conflict: Conflict }) {
	const t = useTranslations("sync.conflicts");
	const { playthroughs } = usePlaythrough();
	const { keepLocalValue } = useSync();
	const [section, playthroughId, ...rest] = conflict.path;
	const playthrough =
		section === "playthroughs"
			? playthroughs.find((other) => other.id === playthroughId)
			: null;
	const where = [playthrough?.name ?? section, ...(playthrough ? rest : [playthroughId, ...rest])]
		.filter(Boolean)
		.join(" / ");

	return (
		<li className="border-line flex flex-col gap-2 border-t pt-3 first:border-t-0 first:pt-0">
			<p className="font-mono">{where}</p>
			{conflict.kind === "delete-edit" && <p className="text-muted">{t("deletedEdited")}</p>}
			<dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
				<dt className="text-muted">{t("cloudValue")}</dt>
				<dd className="font-mono break-all">{valueText(conflict.remote) ?? t("empty")}</dd>
				<dt className="text-muted">{t("deviceValue")}</dt>
				<dd className="font-mono break-all">{valueText(conflict.local) ?? t("empty")}</dd>
			</dl>
			<div>
				<Button onClick={() => keepLocalValue(conflict)}>{t("keepDevice")}</Button>
			</div>
		</li>
	);
}

function ConflictsCard() {
	const t = useTranslations("sync.conflicts");
	const { conflicts, dismissConflicts } = useSync();
	if (conflicts.length === 0) return null;

	return (
		<SettingsCard
			title={t("title")}
			description={t("body")}
			aside={
				<Button variant="ghost" onClick={dismissConflicts}>
					{t("dismiss")}
				</Button>
			}
		>
			<ul className="flex flex-col gap-3">
				{conflicts.map((conflict, index) => (
					<ConflictRow key={`${conflict.path.join("/")}-${index}`} conflict={conflict} />
				))}
			</ul>
		</SettingsCard>
	);
}

function Layout({ main, side }: { main: React.ReactNode; side: React.ReactNode }) {
	return (
		<div className="grid items-start gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
			<div className="flex min-w-0 flex-col gap-4">{main}</div>
			<div className="flex min-w-0 flex-col gap-4">{side}</div>
		</div>
	);
}

function NotConnectedPill() {
	const t = useTranslations("sync.connect");
	return (
		<span className="border-line bg-surface text-muted inline-flex h-8 items-center gap-2 rounded-full border-[1.5px] px-3 text-xs">
			<span aria-hidden="true" className="bg-muted size-1.5 rounded-full" />
			{t("pill")}
		</span>
	);
}

function SignedOutView() {
	const t = useTranslations("sync.connect");
	const sync = useSync();
	const [selected, setSelected] = useState<SyncProviderId>(
		sync.providers.includes("google") ? "google" : "github"
	);

	return (
		<Layout
			main={
				<Card className="flex flex-col gap-4 p-4">
					<div className="flex items-center justify-between gap-3">
						<h2 className="text-lg font-semibold">{t("title")}</h2>
						<NotConnectedPill />
					</div>
					<p className="text-muted">{t("intro")}</p>
					<ProviderTiles
						providers={sync.providers}
						selected={selected}
						onSelect={setSelected}
					/>
					<ConnectPanel
						provider={selected}
						pickAnother={sync.providers.length > 1}
						onConnect={() => sync.signIn(selected)}
					/>
				</Card>
			}
			side={<HowSyncWorks />}
		/>
	);
}

function NeedsRepositoryView() {
	const t = useTranslations("sync");
	const sync = useSync();

	return (
		<Layout
			main={
				<>
					<RepositoryPicker />
					<div>
						<Button variant="ghost" onClick={sync.signOut}>
							{t("connected.signOut")}
						</Button>
					</div>
				</>
			}
			side={<HowSyncWorks />}
		/>
	);
}

function ConnectedView() {
	const t = useTranslations("sync");
	const sync = useSync();
	const [dismissedFor, setDismissedFor] = useState<object | null>(null);
	const provider = sync.provider ?? "github";
	const providerName = t(`provider.${provider}.name`);
	const inRepository = usesRepository(provider);

	const failureText: Record<SyncErrorKind | "reauth", string> = {
		rateLimit: t("error.rateLimit"),
		notFound: inRepository
			? t("error.notFound")
			: t("error.notFoundFolder", { provider: providerName }),
		forbidden: inRepository
			? t("error.forbidden")
			: t("error.forbiddenFolder", { provider: providerName }),
		server: t("error.server"),
		data: t("error.data"),
		busy: t("error.busy"),
		other: t("error.other"),
		reauth: t("error.reauth"),
	};
	const failure = sync.status === "reauth" ? "reauth" : sync.errorKind;
	const conflictCount = sync.conflicts.length;
	const choiceOpen = sync.pendingChoice !== null && dismissedFor !== sync.pendingChoice;
	const review = () =>
		document.getElementById("sync-conflicts")?.scrollIntoView({ behavior: "smooth" });

	return (
		<>
			<Layout
				main={
					<>
						<Card className="flex flex-col gap-4 p-4">
							<div className="flex items-start justify-between gap-3">
								<div className="flex min-w-0 items-center gap-3">
									<ProviderIcon provider={provider} size={22} />
									<div className="flex min-w-0 flex-col">
										<h2 className="text-lg font-semibold">{providerName}</h2>
										<span className="text-muted font-mono text-xs break-all">
											{inRepository
												? sync.repository
												: t("connected.folder", { name: ROOT_FOLDER })}
										</span>
									</div>
								</div>
								<Badge
									tone={
										conflictCount > 0
											? "warn"
											: sync.status === "idle"
												? "success"
												: "info"
									}
								>
									{conflictCount > 0
										? t("status.conflicts")
										: t(`status.${sync.status}`)}
								</Badge>
							</div>
							{failure && (
								<Note tone="warning">
									{failureText[failure]}
									{sync.errorStatus !== null && (
										<span className="block">
											{inRepository
												? t("error.httpStatus", {
														status: String(sync.errorStatus),
													})
												: t("error.httpStatusFolder", {
														provider: providerName,
														status: String(sync.errorStatus),
													})}
										</span>
									)}
								</Note>
							)}
							{conflictCount > 0 && (
								<div className="border-primary bg-tint flex flex-col gap-2 rounded-md border-[1.5px] p-3">
									<p className="font-semibold">
										{t("banner.title", {
											count: conflictCount,
											amount: formatNumber(conflictCount),
										})}
									</p>
									<p className="text-muted">{t("banner.body")}</p>
									<div>
										<Button variant="secondary" onClick={review}>
											{t("banner.review")}
										</Button>
									</div>
								</div>
							)}
							{sync.pendingChoice && !choiceOpen && (
								<div className="border-primary bg-tint flex flex-col gap-2 rounded-md border-[1.5px] p-3">
									<p className="font-semibold">{t("banner.waiting")}</p>
									<div>
										<Button
											variant="secondary"
											onClick={() => setDismissedFor(null)}
										>
											{t("banner.choose")}
										</Button>
									</div>
								</div>
							)}
							<div className="flex flex-wrap items-center justify-between gap-3">
								<span className="text-muted">
									{t("connected.lastSync")}{" "}
									<span className="text-ink">
										{sync.lastSyncAt
											? formatDateTime(sync.lastSyncAt)
											: t("connected.never")}
									</span>
								</span>
								{sync.status === "reauth" ? (
									<Button variant="primary" onClick={() => sync.signIn(provider)}>
										{t("connected.signInWith", { provider: providerName })}
									</Button>
								) : (
									<Button
										variant="primary"
										disabled={
											sync.status === "syncing" ||
											sync.status === "needsChoice"
										}
										onClick={() => void sync.syncNow()}
									>
										{t("connected.syncNow")}
									</Button>
								)}
							</div>
							<PlaythroughsList onReview={review} />
						</Card>
						{conflictCount > 0 && (
							<div id="sync-conflicts" className="scroll-mt-4">
								<ConflictsCard />
							</div>
						)}
						<ActivityCard />
					</>
				}
				side={
					<>
						<SyncSettingsCard />
						<LivesCard />
						<DeviceCard />
						<DisconnectCard />
					</>
				}
			/>
			{sync.pendingChoice && (
				<FirstSyncDialog
					open={choiceOpen}
					choice={sync.pendingChoice}
					onLater={() => setDismissedFor(sync.pendingChoice)}
				/>
			)}
		</>
	);
}

export function SyncTab() {
	const t = useTranslations("sync");
	const sync = useSync();

	if (!sync.available) {
		return (
			<SettingsCard title={t("tab.title")}>
				<Note>{t("unavailable")}</Note>
			</SettingsCard>
		);
	}
	if (sync.status === "signedOut") {
		return <SignedOutView />;
	}
	if (sync.status === "needsRepository") return <NeedsRepositoryView />;
	return <ConnectedView />;
}
