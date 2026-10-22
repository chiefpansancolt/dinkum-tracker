/**
 * The key and values are the ones Flowbite wrote in the old app, so a player who switches between
 * the old and the new site keeps the same theme.
 */
export const THEME_STORAGE_KEY = "flowbite-theme-mode";

export const DARK_QUERY = "(prefers-color-scheme: dark)";

/** Runs before the first paint so a dark theme never flashes light. */
export const themeInitScript = `try{var m=localStorage.getItem("${THEME_STORAGE_KEY}");var d=m==="dark"||((m!=="light")&&matchMedia("${DARK_QUERY}").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}`;
