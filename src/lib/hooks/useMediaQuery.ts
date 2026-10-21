import { useSyncExternalStore } from "react";

export const DESKTOP_QUERY = "(min-width: 1024px)";

export const useMediaQuery = (query: string) =>
  useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );

export const useIsDesktop = () => useMediaQuery(DESKTOP_QUERY);
