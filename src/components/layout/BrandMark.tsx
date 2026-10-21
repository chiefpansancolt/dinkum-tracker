import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/data/nav";

export function BrandMark({ onNavigate }: { onNavigate?: () => void }) {
	return (
		<Link href="/" onClick={onNavigate} className="flex items-center gap-2.5">
			<Image
				src="/dinkum_d_logo.png"
				alt=""
				width={32}
				height={32}
				className="block size-8 shrink-0 rounded-md"
			/>
			<span className="text-sb-text flex flex-col leading-tight">
				{/* i18n-ignore */}
				<span className="text-base font-semibold">Dinkum</span>
				{/* i18n-ignore */}
				<span className="text-sb-muted font-mono text-[11px] tracking-[0.08em] uppercase">
					Tracker
				</span>
			</span>
			<span className="sr-only">{APP_NAME}</span>
		</Link>
	);
}
