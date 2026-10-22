// Writes src/i18n/messages/<code>.ts for every language folder src/i18n/messages/<code>/.
// A catalog file is <namespace>.json and has the same keys as the English one.
// Usage: node scripts/gen-locale-indexes.mjs
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/i18n/messages";
const english = readdirSync(join(DIR, "en"))
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.slice(0, -5))
  .sort();

const locales = readdirSync(DIR, { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isFile() && entry.name.endsWith(".ts") && entry.name !== "en.ts",
  )
  .map((entry) => entry.name.slice(0, -3));

for (const code of locales) {
  const folder = join(DIR, code);
  const present = existsSync(folder)
    ? english.filter((namespace) =>
        existsSync(join(folder, `${namespace}.json`)),
      )
    : [];
  const ident = code.replace(/-/g, "");
  const imports = present
    .map(
      (namespace) =>
        `import ${namespace} from "./${code}/${namespace}.json";\n`,
    )
    .join("");
  const body = present.length === 0 ? "{}" : `{ ${present.join(", ")} }`;
  writeFileSync(
    join(DIR, `${code}.ts`),
    `import type { PartialMessages } from "../locales";\n${imports}\nconst ${ident}: PartialMessages = ${body};\n\nexport default ${ident};\n`,
  );
}
execFileSync(
  "pnpm",
  [
    "exec",
    "prettier",
    "--write",
    ...locales.map((code) => join(DIR, `${code}.ts`)),
  ],
  { stdio: "ignore" },
);
console.log(`wrote ${locales.length} language indexes`);
