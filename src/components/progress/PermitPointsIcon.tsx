"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export function PermitPointsIcon({ size = 18 }: { size?: number }) {
	const t = useTranslations("progress.common");

	return (
		<Image
			src="/images/other/Permit_Points.png"
			alt={t("permitPoints")}
			width={size}
			height={size}
			unoptimized
			style={{ width: size, height: size }}
			className="inline-block shrink-0 object-contain"
		/>
	);
}
