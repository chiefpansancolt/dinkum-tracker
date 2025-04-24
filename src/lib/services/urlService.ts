/**
 * Extracts query parameters from a URL hash fragment
 * @returns An object containing the query parameters
 */
export const getHashQueryParams = (): Record<string, string> => {
  if (typeof window === "undefined") {
    return {};
  }

  const hash = window.location.hash;
  const questionMarkIndex = hash.indexOf("?");

  if (questionMarkIndex === -1) {
    return {};
  }

  const queryString = hash.substring(questionMarkIndex + 1);
  const params = new URLSearchParams(queryString);
  const queryObject: Record<string, string> = {};

  params.forEach((value, key) => {
    queryObject[key] = value;
  });

  return queryObject;
};

/**
 * Sets a query parameter in the URL hash without reloading the page
 * @param key The query parameter key
 * @param value The query parameter value
 */
export const setHashQueryParam = (key: string, value: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  const hash = window.location.hash;
  const hashParts = hash.split("?");
  const baseHash = hashParts[0];

  const params =
    hashParts.length > 1
      ? new URLSearchParams(hashParts[1])
      : new URLSearchParams();

  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  const newQueryString = params.toString();
  const newHash = newQueryString ? `${baseHash}?${newQueryString}` : baseHash;


  window.history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search + newHash,
  );
};
