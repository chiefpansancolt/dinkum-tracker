import { useSyncExternalStore } from "react";

const subscribeToNothing = () => () => {};

export const useIsHydrated = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
