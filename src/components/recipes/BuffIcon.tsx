"use client";

import { getBuffIcon } from "@/service/buffIconService";
import { ItemIcon } from "@/comps/ui/ItemIcon";

interface BuffIconProps {
	buff: string;
	value?: number | boolean;
	size?: number;
}

export function BuffIcon({ buff, value, size = 20 }: BuffIconProps) {
	const { icon } = getBuffIcon(buff, typeof value === "number" ? value : 1);
	return <ItemIcon src={icon} size={size} />;
}
