import { LuCheck } from "react-icons/lu";

interface CheckboxProps {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
	return (
		<label className="flex min-h-11 cursor-pointer items-center gap-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--ring) lg:min-h-9">
			<input
				type="checkbox"
				checked={checked}
				onChange={(event) => onChange(event.target.checked)}
				className="sr-only"
			/>
			<span
				aria-hidden="true"
				className={`flex size-5 shrink-0 items-center justify-center rounded-sm border-[1.5px] ${
					checked ? "border-primary bg-primary text-on-primary" : "border-line bg-surface"
				}`}
			>
				{checked && <LuCheck size={14} />}
			</span>
			{label}
		</label>
	);
}
