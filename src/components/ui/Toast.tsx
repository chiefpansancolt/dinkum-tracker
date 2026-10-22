"use client";

import { translator } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { LuBan, LuCircleCheck, LuInfo, LuTriangleAlert, LuX } from "react-icons/lu";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

type ToastVariant = "success" | "info" | "warning" | "error";

interface ToastAction {
	label: string;
	onAction: () => void;
}

interface ToastOptions {
	variant: ToastVariant;
	title: string;
	message?: string;
	action?: ToastAction;
	/** A new toast with the same key replaces the earlier one, so repeated changes show one toast. */
	key?: string;
}

interface ToastItem extends ToastOptions {
	id: number;
}

const SECOND_MS = 1_000;
const PLAIN_CLOSE_MS = 6 * SECOND_MS;
const UNDO_CLOSE_MS = 10 * SECOND_MS;

// An error stays until the player dismisses it. A toast with an action stays longer, so there is
// time to press it.
const closeAfterMs = (options: ToastOptions) => {
	if (options.variant === "error") return null;
	return options.action ? UNDO_CLOSE_MS : PLAIN_CLOSE_MS;
};

const variantStyles: Record<ToastVariant, { Icon: IconType; className: string }> = {
	success: { Icon: LuCircleCheck, className: "text-success" },
	info: { Icon: LuInfo, className: "text-info" },
	warning: { Icon: LuTriangleAlert, className: "text-warn" },
	error: { Icon: LuBan, className: "text-danger" },
};

const ToastContext = createContext<((options: ToastOptions) => void) | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const t = useTranslations("ui.toast");
	const [toasts, setToasts] = useState<ToastItem[]>([]);
	const nextIdRef = useRef(0);
	const timersRef = useRef(new Map<number, ReturnType<typeof setTimeout>>());

	const dismiss = (id: number) => {
		clearTimeout(timersRef.current.get(id));
		timersRef.current.delete(id);
		setToasts((current) => current.filter((toast) => toast.id !== id));
	};

	const show = (options: ToastOptions) => {
		const id = nextIdRef.current++;
		setToasts((current) => {
			const replaced = current.filter((toast) => options.key && toast.key === options.key);
			replaced.forEach((toast) => {
				clearTimeout(timersRef.current.get(toast.id));
				timersRef.current.delete(toast.id);
			});
			return [{ ...options, id }, ...current.filter((toast) => !replaced.includes(toast))];
		});

		const delay = closeAfterMs(options);
		if (delay !== null) {
			timersRef.current.set(
				id,
				setTimeout(() => dismiss(id), delay)
			);
		}
	};

	useEffect(() => {
		const timers = timersRef.current;
		return () => timers.forEach((timer) => clearTimeout(timer));
	}, []);

	return (
		<ToastContext.Provider value={show}>
			{children}
			<div
				role="status"
				aria-live="polite"
				className="pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md flex-col items-stretch gap-2"
			>
				{toasts.map((toast) => {
					const { Icon, className } = variantStyles[toast.variant];
					return (
						<div
							key={toast.id}
							className="border-line bg-surface text-ink pointer-events-auto flex items-start gap-2 rounded-md border-[1.5px] py-2 ps-4 pe-1"
						>
							<Icon
								aria-hidden="true"
								size={20}
								className={`mt-2.5 shrink-0 ${className}`}
							/>
							<div className="flex min-w-0 flex-1 flex-col gap-0.5 py-1">
								<span className="sr-only">{t(`variants.${toast.variant}`)}</span>
								<span className="font-medium">{toast.title}</span>
								{toast.message && (
									<span className="text-muted">{toast.message}</span>
								)}
							</div>
							{toast.action && (
								<Button
									variant="link"
									onClick={() => {
										toast.action?.onAction();
										dismiss(toast.id);
									}}
								>
									{toast.action.label}
								</Button>
							)}
							<IconButton
								label={t("dismiss")}
								className="text-muted hover:bg-tint"
								onClick={() => dismiss(toast.id)}
							>
								<LuX aria-hidden="true" />
							</IconButton>
						</div>
					);
				})}
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error(translator("ui")("toast.missingProvider"));
	}
	return context;
}
