"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { LuX } from "react-icons/lu";
import { IconButton } from "./IconButton";

type DialogVariant = "modal" | "wide" | "flyout";

const panelClasses: Record<DialogVariant, string> = {
	modal: "fixed m-0 mt-auto max-h-[90dvh] w-full max-w-none flex-col rounded-t-lg border-[1.5px] p-0 open:flex lg:m-auto lg:w-[calc(100%-2rem)] lg:max-w-xl lg:rounded-md",
	wide: "fixed m-0 mt-auto max-h-[90dvh] w-full max-w-none flex-col rounded-t-lg border-[1.5px] p-0 open:flex lg:m-auto lg:w-[calc(100%-2rem)] lg:max-w-3xl lg:rounded-md",
	flyout: "fixed inset-x-0 top-auto bottom-0 m-0 max-h-[90dvh] w-full max-w-none flex-col rounded-t-lg border-[1.5px] p-0 open:flex lg:top-0 lg:inset-e-0 lg:inset-s-auto lg:h-dvh lg:max-h-none lg:w-160 lg:rounded-none lg:border-y-0 lg:border-e-0",
};

interface DialogProps {
	open: boolean;
	onClose: () => void;
	title: string;
	description?: string;
	footer?: ReactNode;
	variant?: DialogVariant;
	children: ReactNode;
}

/**
 * A modal on desktop and a bottom sheet on mobile. The flyout variant is a 640 px panel on the right
 * on desktop. The children mount only while the dialog is
 * open, so a form inside always starts from its saved values.
 */
export function Dialog({
	open,
	onClose,
	title,
	description,
	footer,
	variant = "modal",
	children,
}: DialogProps) {
	const t = useTranslations("ui");
	const dialogRef = useRef<HTMLDialogElement>(null);
	const titleId = useId();

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (open && !dialog.open) {
			dialog.showModal();
			dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
		}
		if (!open && dialog.open) dialog.close();
	}, [open]);

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={titleId}
			onClose={onClose}
			onClick={(event) => {
				if (event.target === event.currentTarget) onClose();
			}}
			className={`border-line bg-surface text-ink backdrop:bg-scrim ${panelClasses[variant]}`}
		>
			{open && (
				<>
					<div
						aria-hidden="true"
						className="bg-line mx-auto mt-2 h-1 w-10 rounded-full lg:hidden"
					/>
					<header className="flex items-start justify-between gap-3 px-4 pt-3 pb-2 lg:pt-4">
						<div className="flex min-w-0 flex-col gap-0.5">
							<h2 id={titleId} className="text-lg font-semibold">
								{title}
							</h2>
							{description && <p className="text-muted">{description}</p>}
						</div>
						<IconButton
							label={t("close")}
							onClick={onClose}
							className="text-muted hover:bg-tint -me-2 -mt-1"
						>
							<LuX size={20} aria-hidden="true" />
						</IconButton>
					</header>
					<div
						className={`flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-3 ${variant === "flyout" ? "bg-bg" : ""}`}
					>
						{children}
					</div>
					{footer && (
						<footer className="border-line flex flex-wrap items-center justify-end gap-2 border-t-[1.5px] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
							{footer}
						</footer>
					)}
				</>
			)}
		</dialog>
	);
}
