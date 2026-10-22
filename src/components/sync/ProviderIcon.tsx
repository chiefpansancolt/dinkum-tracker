import { FaDropbox, FaGithub, FaGoogleDrive, FaMicrosoft } from "react-icons/fa";
import type { SyncProviderId } from "@/lib/sync/providers";

const ICONS = {
	github: FaGithub,
	google: FaGoogleDrive,
	dropbox: FaDropbox,
	microsoft: FaMicrosoft,
};

export function ProviderIcon({ provider, size = 20 }: { provider: SyncProviderId; size?: number }) {
	const Icon = ICONS[provider];
	return (
		<span
			aria-hidden="true"
			className="bg-tint text-primary flex size-10 shrink-0 items-center justify-center rounded-md"
		>
			<Icon size={size} />
		</span>
	);
}
