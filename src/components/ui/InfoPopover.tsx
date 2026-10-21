"use client";

import { useTranslations } from "next-intl";
import { useCallback, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { LuCircleHelp, LuX } from "react-icons/lu";
import { useDismiss } from "@/lib/hooks/useDismiss";
import { IconButton } from "./IconButton";

export function InfoPopover({ label, children }: { label: string; children: ReactNode }) {
	const t = useTranslations("ui");
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLSpanElement>(null);
	const panelId = useId();
	const close = useCallback(() => setOpen(false), []);

	useDismiss(containerRef, open, close);

	return (
		<span ref={containerRef} className="relative inline-flex">
			<IconButton
				label={label}
				aria-expanded={open}
				aria-controls={open ? panelId : undefined}
				onClick={() => setOpen((current) => !current)}
				className="text-muted hover:bg-tint size-8 lg:size-7"
			>
				<LuCircleHelp size={16} aria-hidden="true" />
			</IconButton>
			{open && (
				<div
					id={panelId}
					role="dialog"
					aria-label={label}
					className="border-line bg-surface text-ink absolute top-full left-0 z-30 mt-1 flex w-72 max-w-[calc(100vw-3rem)] flex-col gap-2 rounded-md border-[1.5px] p-3"
				>
					<div className="flex items-start justify-between gap-2">
						<span className="font-medium">{label}</span>
						<IconButton
							label={t("close")}
							onClick={close}
							className="text-muted hover:bg-tint -me-2 -mt-2 size-8 lg:size-7"
						>
							<LuX size={16} aria-hidden="true" />
						</IconButton>
					</div>
					<div className="text-muted flex flex-col gap-2">{children}</div>
				</div>
			)}
		</span>
	);
}
