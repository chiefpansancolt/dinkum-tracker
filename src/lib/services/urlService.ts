/**
 * Sets a query parameter in the URL without reloading the page
 * @param key The query parameter key
 * @param value The query parameter value
 */
export const setQueryParam = (key: string, value: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);

  if (value) {
    url.searchParams.set(key, value);
  } else {
    url.searchParams.delete(key);
  }

  window.history.replaceState(null, "", url);
};

/**
 * Extracts query parameters from the URL
 * @returns An object containing the query parameters
 */
export const getQueryParams = (): Record<string, string> => {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const queryObject: Record<string, string> = {};

  params.forEach((value, key) => {
    queryObject[key] = value;
  });

  return queryObject;
};
