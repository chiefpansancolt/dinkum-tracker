import { LuCheck } from "react-icons/lu";

interface CheckChipProps {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}

export function CheckChip({ label, checked, onChange }: CheckChipProps) {
	return (
		<label
			className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-md border-[1.5px] px-3 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-[:focus-visible]:outline-(--ring) lg:min-h-9 ${
				checked ? "border-primary bg-tint font-medium" : "border-line"
			}`}
		>
			<input
				type="checkbox"
				checked={checked}
				onChange={(event) => onChange(event.target.checked)}
				className="sr-only"
			/>
			<span
				aria-hidden="true"
				className={`flex size-4 items-center justify-center rounded-sm border-[1.5px] ${
					checked ? "border-primary bg-primary text-on-primary" : "border-line"
				}`}
			>
				{checked && <LuCheck size={12} />}
			</span>
			{label}
		</label>
	);
}
