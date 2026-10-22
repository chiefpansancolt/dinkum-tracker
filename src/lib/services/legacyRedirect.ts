/** The `q` search of the old address moves to the new one. */
export const redirectTarget = (to: string, oldSearch: string) => {
  const target = new URL(to, "https://placeholder.invalid");
  const query = new URLSearchParams(oldSearch).get("q");
  if (query) target.searchParams.set("q", query);

  return `${target.pathname}${target.search}`;
};
