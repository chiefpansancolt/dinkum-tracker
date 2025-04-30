/** @type {import('prettier').Config} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindAttributes: ["theme"],
  tailwindFunctions: ["twMerge", "createTheme"],
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^(react|next)(.*)$",
    "^@/types(.*)$",
    "^@/lib(.*)$",
    "^@/service(.*)$",
    "^@/data(.*)$",
    "^@/comps(.*)$",
    "^@/playthrough(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
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
        useTabs: false,
        trailingComma: "none",
        printWidth: 100,
      },
    },
  ],
};

export default config;
