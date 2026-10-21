import { useEffect } from "react";

/** Keeps `?q=` in the address as the player types, so a link to a search can be shared. */
export function useSearchInAddress(query: string) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (query) params.set("q", query);
    else params.delete("q");

    const search = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${search ? `?${search}` : ""}`,
    );
  }, [query]);
}
