"use client";

import React, { ReactNode } from "react";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";

interface SidebarCollapseProps {
	label: string;
	icon: ReactNode;
	children: ReactNode;
	open: boolean;
	onToggle: () => void;
	active?: boolean;
}

export default function SidebarCollapse({
	label,
	icon,
	children,
	open,
	onToggle,
	active = false,
}: SidebarCollapseProps) {
	return (
		<div>
			<button
				type="button"
				className={`flex w-full items-center rounded-lg p-2 text-base font-medium transition duration-75 cursor-pointer ${
					active ? "bg-primary text-white" : "text-white hover:bg-primary"
				} group`}
				onClick={onToggle}
			>
				<div className="h-5 w-5 flex-shrink-0 text-white transition duration-75">
					{icon}
				</div>
				<span className="ml-3 flex-1 text-left whitespace-nowrap">{label}</span>
				{open ? (
					<HiOutlineMinusSm className="h-5 w-5" />
				) : (
					<HiOutlinePlusSm className="h-5 w-5" />
				)}
			</button>
			<div className={`${open ? "block" : "hidden"} space-y-2 py-2`}>{children}</div>
		</div>
	);
}
