// prettier.config.mjs

/** @type {import('prettier').Config} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindAttributes: ["theme"],
  tailwindFunctions: ["twMerge", "createTheme"],
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.tsx"],
      options: {
        trailingComma: "es5",
        printWidth: 100,
        tabWidth: 4,
        useTabs: true,
        semi: true,
        singleQuote: false,
        bracketSpacing: true,
        arrowParens: "always",
        endOfLine: "lf",
      },
    },
    {
      files: ["*.json"],
      options: {
        tabWidth: 4,
        useTabs: false, // usually best for JSON
        trailingComma: "none",
        printWidth: 100,
      },
    },
  ],
};

export default config;
