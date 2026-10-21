import type { ComponentProps } from "react";
import { Dialog } from "./Dialog";

type FlyoutProps = Omit<ComponentProps<typeof Dialog>, "variant">;

export function Flyout(props: FlyoutProps) {
	return <Dialog variant="flyout" {...props} />;
}
