import { Button } from "flowbite-react";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";

interface BackButtonProps {
	href: string;
}

export default function BackButton({ href }: BackButtonProps) {
	return (
		<Button
			as={Link}
			href={href}
			color="secondary"
			size="sm"
			className="flex items-center gap-2"
		>
			<HiArrowLeft className="h-4 w-4" />
			Back
		</Button>
	);
}
