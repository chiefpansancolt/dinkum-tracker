/**
 * The address an old page forwards to. The `q` search of the old address moves to the new one, so
 * a link that fills the name search of a page still fills it.
 */
export const redirectTarget = (to: string, oldSearch: string) => {
  const target = new URL(to, "https://placeholder.invalid");
  const query = new URLSearchParams(oldSearch).get("q");
  if (query) target.searchParams.set("q", query);

  return `${target.pathname}${target.search}`;
};
