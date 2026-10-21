"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { LuX } from "react-icons/lu";
import { IconButton } from "./IconButton";

interface DrawerProps {
	open: boolean;
	onClose: () => void;
	closeLabel: string;
	children: ReactNode;
}

export function Drawer({ open, onClose, closeLabel, children }: DrawerProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	}, [open]);

	return (
		<dialog
			ref={dialogRef}
			onClose={onClose}
			onClick={(event) => {
				if (event.target === event.currentTarget) onClose();
			}}
			className="bg-sb-bg text-sb-text backdrop:bg-scrim fixed inset-s-0 top-0 m-0 h-dvh max-h-none w-77.5 max-w-[85vw] flex-col gap-3 p-4 open:flex"
		>
			<div className="-mb-6 flex justify-end">
				<IconButton
					label={closeLabel}
					onClick={onClose}
					className="text-sb-text hover:bg-sb-line -mt-2"
				>
					<LuX size={22} aria-hidden="true" />
				</IconButton>
			</div>
			{children}
		</dialog>
	);
}
