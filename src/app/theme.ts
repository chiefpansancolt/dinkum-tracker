import { createTheme, theme } from "flowbite-react";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import type { CustomFlowbiteTheme } from "flowbite-react/types";

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
  toast: {
    toggle: {
      base: twMerge(theme.toast.toggle.base, "cursor-pointer"),
    },
  },
  sidebar: {
    root: {
      base: "h-auto",
      inner:
        "bg-accent overflow-x-hidden overflow-y-auto rounded-lg px-3 py-4 text-white",
    },
    collapse: {
      button:
        "group hover:text-secondary flex w-full cursor-pointer items-center rounded-lg p-2 text-base font-normal text-white transition duration-75 dark:text-white",
      icon: {
        base: "h-6 w-6 text-white transition duration-75 dark:text-white",
        open: {
          on: "text-white",
        },
      },
    },
    item: {
      base: "hover:text-secondary flex items-center justify-center rounded-lg p-2 text-base font-normal text-white dark:text-white",
      active: "bg-primary text-white",
      icon: {
        base: "group-hover:text-secondary h-6 w-6 text-white transition duration-75 dark:text-white",
        active: "text-white",
      },
    },
  },
  progress: {
    base: "w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700",
    label: "mb-1 flex justify-between font-medium dark:text-white",
    bar: "rounded-full text-center leading-none font-medium text-blue-100",
    color: {
      blue: "bg-blue-600",
      indigo: "bg-indigo-600",
      red: "bg-red-600",
      purple: "bg-purple-600",
      orange: "bg-orange-600",
    },
    size: {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4",
      xl: "h-6",
    },
  },
  spinner: {
    color: {
      primary: "fill-primary",
      secondary: "fill-secondary",
      accent: "fill-accent",
    },
  },
  badge: {
    root: {
      color: {
        orange:
          "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-200 dark:text-orange-800 dark:hover:bg-orange-300",
      },
    },
  },
});
