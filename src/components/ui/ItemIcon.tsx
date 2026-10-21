import Image from "next/image";

interface ItemIconProps {
	src?: string;
	size?: number;
	className?: string;
}

/**
 * Some items have no image in the package. They get a plain tinted square, so a row never asks
 * the browser for an empty address. The images are small files that ship with the app, so they
 * skip the image optimizer.
 */
export function ItemIcon({ src, size = 32, className = "" }: ItemIconProps) {
	if (!src) {
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
			src={src}
			alt=""
			width={size}
			height={size}
			unoptimized
			style={{ width: size, height: size }}
			className={`shrink-0 rounded-md object-contain ${className}`}
		/>
	);
}
