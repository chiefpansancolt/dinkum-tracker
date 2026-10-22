import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TAB_PARAM = "tab";

/** The page must sit inside a Suspense boundary. */
export function useUrlTab<TabId extends string>(
  ids: readonly TabId[],
  fallback: TabId,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requested = searchParams.get(TAB_PARAM);
  const tab = ids.find((id) => id === requested) ?? fallback;

  const setTab = (id: TabId) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set(TAB_PARAM, id);
    router.replace(`${pathname}?${next}`, { scroll: false });
  };

  return [tab, setTab] as const;
}
