import type { CustomFlowbiteTheme } from "flowbite-react/types";
import { createTheme, theme } from "flowbite-react";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";

export const customTheme: CustomFlowbiteTheme = createTheme({
  button: {
    base: twMerge(theme.button.base, "cursor-pointer"),
    color: {
      primary: "bg-primary hover:bg-primary/80 focus:ring-primary text-white",
      secondary:
        "bg-secondary hover:bg-secondary/80 focus:ring-secondary text-white",
      accent: "bg-accent hover:bg-accent/80 focus:ring-accent text-white",
    },
  },
  dropdown: {
    inlineWrapper: twMerge(theme.dropdown.inlineWrapper, "cursor-pointer"),
  },
});
