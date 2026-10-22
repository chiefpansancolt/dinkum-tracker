// Compares every language catalog with the English one.
// Usage: node scripts/check-catalogs.mjs [code ...]   (all languages when no code is given)
// Reports missing and extra keys, messages that do not parse, and messages whose variables,
// tags or plural shape differ from the English message. Exit code 1 when it finds any problem.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const pnpmDir = "node_modules/.pnpm";
const parserDir = readdirSync(pnpmDir)
  .filter((name) => name.startsWith("@formatjs+icu-messageformat-parser@"))
  .sort()
  .at(-1);
const { parse, TYPE } = require(
  join(
    process.cwd(),
    pnpmDir,
    parserDir,
    "node_modules/@formatjs/icu-messageformat-parser",
  ),
);

const DIR = "src/i18n/messages";
const namespaces = readdirSync(join(DIR, "en"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.slice(0, -5))
  .sort();
const codes =
  process.argv.length > 2
    ? process.argv.slice(2)
    : readdirSync(DIR, { withFileTypes: true })
        .filter((e) => e.isDirectory() && e.name !== "en")
        .map((e) => e.name)
        .sort();

const flatten = (value, prefix = "", out = new Map()) => {
  for (const [key, item] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof item === "string") out.set(path, item);
    else if (item && typeof item === "object") flatten(item, path, out);
  }
  return out;
};

const shapeOf = (message, locale) => {
  const ast = parse(message, { locale });
  const variables = new Set();
  const tags = new Set();
  const plurals = [];
  let pound = false;
  const visit = (nodes) => {
    for (const node of nodes) {
      if (node.type === TYPE.argument) variables.add(node.value);
      else if (
        node.type === TYPE.number ||
        node.type === TYPE.date ||
        node.type === TYPE.time
      )
        variables.add(node.value);
      else if (node.type === TYPE.tag) {
        tags.add(node.value);
        visit(node.children);
      } else if (node.type === TYPE.pound) pound = true;
      else if (node.type === TYPE.plural || node.type === TYPE.select) {
        variables.add(node.value);
        if (node.type === TYPE.plural)
          plurals.push({ name: node.value, hasOther: "other" in node.options });
        for (const option of Object.values(node.options)) visit(option.value);
      }
    }
  };
  visit(ast);
  return {
    variables: [...variables].sort().join(","),
    tags: [...tags].sort().join(","),
    plurals,
    pound,
  };
};

const english = new Map();
for (const namespace of namespaces) {
  flatten(
    JSON.parse(readFileSync(join(DIR, "en", `${namespace}.json`), "utf8")),
    namespace,
    english,
  );
}
const englishShapes = new Map(
  [...english].map(([key, text]) => [key, shapeOf(text, "en")]),
);

let problems = 0;
for (const code of codes) {
  const found = new Map();
  for (const namespace of namespaces) {
    const file = join(DIR, code, `${namespace}.json`);
    if (existsSync(file))
      flatten(JSON.parse(readFileSync(file, "utf8")), namespace, found);
  }
  const issues = [];
  let missing = 0;
  for (const [key, text] of english) {
    const own = found.get(key);
    if (own === undefined) {
      missing++;
      continue;
    }
    let shape;
    try {
      shape = shapeOf(own, code);
    } catch (error) {
      issues.push(
        `${key}: does not parse (${String(error.message).split("\n")[0]})`,
      );
      continue;
    }
    const base = englishShapes.get(key);
    if (shape.variables !== base.variables)
      issues.push(
        `${key}: variables {${shape.variables}} should be {${base.variables}}`,
      );
    if (shape.tags !== base.tags)
      issues.push(`${key}: tags <${shape.tags}> should be <${base.tags}>`);
    if (shape.pound) issues.push(`${key}: uses # in a plural`);
    if (shape.plurals.some((p) => !p.hasOther))
      issues.push(`${key}: a plural has no other form`);
    if (base.plurals.length !== shape.plurals.length)
      issues.push(
        `${key}: ${shape.plurals.length} plurals, English has ${base.plurals.length}`,
      );
    if (own.trim() === "" && text.trim() !== "") issues.push(`${key}: empty`);
  }
  const extra = [...found.keys()].filter((key) => !english.has(key));
  extra.forEach((key) => issues.push(`${key}: not an English key`));
  const done = english.size - missing;
  console.log(
    `${code}: ${done} of ${english.size} messages, ${missing} missing, ${issues.length} problems`,
  );
  issues.slice(0, 40).forEach((issue) => console.log(`  ${issue}`));
  if (issues.length > 40) console.log(`  ... ${issues.length - 40} more`);
  problems += issues.length + (missing > 0 ? 1 : 0);
}
process.exit(problems > 0 ? 1 : 0);
