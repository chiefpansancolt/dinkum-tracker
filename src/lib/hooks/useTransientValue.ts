import { useEffect, useRef, useState } from "react";

const DEFAULT_DURATION_MS = 3_000;

export const useTransientValue = <Value>(durationMs = DEFAULT_DURATION_MS) => {
  const [value, setValue] = useState<Value | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const show = (next: Value) => {
    clearTimeout(timer.current);
    setValue(next);
    timer.current = setTimeout(() => setValue(null), durationMs);
  };

  return [value, show] as const;
};
