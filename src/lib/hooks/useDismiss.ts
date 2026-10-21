import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * Calls `onDismiss` on a press outside `containerRef` or on the Escape key while `open` is true.
 */
export const useDismiss = (
  containerRef: RefObject<HTMLElement | null>,
  open: boolean,
  onDismiss: () => void,
) => {
  useEffect(() => {
    if (!open) return;

    const dismissOnOutsidePress = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) onDismiss();
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // Stops an enclosing dialog from closing on the same key press.
      event.preventDefault();
      onDismiss();
    };
    document.addEventListener("pointerdown", dismissOnOutsidePress);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOnOutsidePress);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [containerRef, open, onDismiss]);
};
