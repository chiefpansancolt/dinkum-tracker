"use client";

import Image from "next/image";
import { useState } from "react";

interface ItemIconProps {
	src?: string;
	size?: number;
	className?: string;
}

/**
 * Some file names in the data package contain a literal percent sign, such as `%26`, which a
 * server reads as an escape. Escaping the percent sign requests the file by its real name.
 */
const escapePercent = (src: string) => src.replace(/%/g, "%25");

/** The images ship with the app and are small, so they skip the image optimizer. */
export function ItemIcon({ src, size = 32, className = "" }: ItemIconProps) {
	const [failures, setFailures] = useState(0);
	const current = failures === 0 ? src : failures === 1 && src ? escapePercent(src) : undefined;

	if (!current) {
		return (
			<span
				aria-hidden="true"
				style={{ width: size, height: size }}
				className={`bg-track shrink-0 rounded-md ${className}`}
			/>
		);
	}

	return (
		<Image
			key={current}
			src={current}
			alt=""
			width={size}
			height={size}
			unoptimized
			onError={() => setFailures((count) => count + 1)}
			style={{ width: size, height: size }}
			className={`shrink-0 rounded-md object-contain ${className}`}
		/>
	);
}
