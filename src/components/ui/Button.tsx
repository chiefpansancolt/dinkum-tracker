import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { LuLoaderCircle } from "react-icons/lu";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "link";

const baseClasses =
	"inline-flex min-h-11 items-center justify-center gap-2 rounded-md border-[1.5px] px-4 font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-50 lg:min-h-9";

const variantClasses: Record<ButtonVariant, string> = {
	primary: "border-primary bg-primary text-on-primary hover:opacity-90",
	secondary: "border-line bg-surface text-ink hover:bg-tint",
	ghost: "border-transparent text-ink hover:bg-tint",
	danger: "border-danger bg-surface text-danger hover:bg-tint",
	link: "border-transparent text-link hover:bg-tint",
};

export const buttonClasses = (variant: ButtonVariant = "secondary", className = "") =>
	`${baseClasses} ${variantClasses[variant]} ${className}`.trim();

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	/** Disables the button and shows a spinner while the action it started is running. */
	loading?: boolean;
}

export function Button({
	variant,
	className,
	type = "button",
	loading = false,
	disabled,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={buttonClasses(variant, className)}
			disabled={disabled || loading}
			aria-busy={loading || undefined}
			{...props}
		>
			{loading && (
				<LuLoaderCircle
					aria-hidden="true"
					className="size-4 animate-spin motion-reduce:animate-none"
				/>
			)}
			{children}
		</button>
	);
}

interface ButtonLinkProps extends ComponentProps<typeof Link> {
	variant?: ButtonVariant;
}

export function ButtonLink({ variant, className, ...props }: ButtonLinkProps) {
	return <Link className={buttonClasses(variant, className)} {...props} />;
}
