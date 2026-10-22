// Lists user visible text that is written in the code instead of the language catalog.
// Usage: node scripts/check-i18n.mjs [path ...]. Exit code 1 when it finds any.
// A line that must stay as it is (a code word, a game name) ends with `// i18n-ignore`.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const SKIP = [
  /^src\/i18n\//,
  /^src\/types\//,
  /^src\/data\/game\//,
  /\/layout\.tsx$/,
  /opengraph-image/,
  /robots\.ts$/,
  /sitemap\.ts$/,
  /\.d\.ts$/,
  /^src\/lib\/services\/seasonalTheme\.ts$/,
];
const TEXT_ATTRIBUTES = new Set([
  "placeholder",
  "aria-label",
  "aria-description",
  "title",
  "alt",
  "label",
  "description",
  "hint",
  "error",
  "message",
  "legend",
  "emptyText",
  "helpText",
  "summary",
  "subtitle",
  "heading",
  "caption",
  "tooltip",
  "timeNote",
  "selectLabel",
  "selectHelp",
  "timeLabel",
  "speedLabel",
  "slotLabel",
  "slotHelp",
  "stepWord",
]);
const TEXT_PROPERTIES = new Set([
  "title",
  "message",
  "label",
  "description",
  "placeholder",
  "text",
  "hint",
  "error",
  "summary",
  "subtitle",
  "caption",
  "heading",
  "tooltip",
  "finishText",
  "slotLabel",
]);
const hasWords = (text) => /[A-Za-z]{2,}/.test(text);

const files = [];
const walk = (path) => {
  for (const name of readdirSync(path)) {
    const full = join(path, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(ts|tsx)$/.test(name)) files.push(full);
  }
};
const targets = process.argv.slice(2);
for (const target of targets.length ? targets : ["src"]) {
  const full = join(ROOT, target);
  statSync(full).isDirectory() ? walk(full) : files.push(full);
}

const findings = [];
for (const file of files) {
  const rel = relative(ROOT, file);
  if (SKIP.some((pattern) => pattern.test(rel))) continue;
  const source = readFileSync(file, "utf8");
  const lines = source.split("\n");
  const sf = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const report = (node, text, kind) => {
    const line = sf.getLineAndCharacterOfPosition(node.getStart()).line;
    if (
      /i18n-ignore/.test(lines[line]) ||
      (line > 0 && /i18n-ignore/.test(lines[line - 1]))
    )
      return;
    findings.push(
      `${rel}:${line + 1} [${kind}] ${text.replace(/\s+/g, " ").trim().slice(0, 90)}`,
    );
  };
  const literalText = (node) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
      return node.text;
    if (ts.isTemplateExpression(node))
      return (
        node.head.text +
        node.templateSpans.map((span) => "${} " + span.literal.text).join("")
      );
    return null;
  };
  const insideT = (node) => {
    for (let current = node.parent; current; current = current.parent) {
      if (ts.isCallExpression(current)) {
        const callee = current.expression.getText(sf);
        if (
          /^(t|tr|td|translate|useTranslations|getTranslations)(\.|$)/.test(
            callee,
          ) ||
          /^t\./.test(callee)
        )
          return true;
      }
    }
    return false;
  };
  const visit = (node) => {
    if (ts.isJsxText(node)) {
      const text = node.getText(sf);
      if (hasWords(text)) report(node, text, "jsx-text");
    } else if (
      ts.isJsxAttribute(node) &&
      node.initializer &&
      TEXT_ATTRIBUTES.has(node.name.getText(sf))
    ) {
      const init = ts.isJsxExpression(node.initializer)
        ? node.initializer.expression
        : node.initializer;
      const text = init && literalText(init);
      if (text && hasWords(text))
        report(node, `${node.name.getText(sf)}=${text}`, "jsx-attr");
    } else if (
      ts.isJsxExpression(node) &&
      node.expression &&
      (ts.isJsxElement(node.parent) || ts.isJsxFragment(node.parent))
    ) {
      const walkExpr = (expr) => {
        const text = literalText(expr);
        if (text !== null && hasWords(text) && !insideT(expr))
          return report(expr, text, "jsx-child");
        if (ts.isConditionalExpression(expr)) {
          walkExpr(expr.whenTrue);
          walkExpr(expr.whenFalse);
        } else if (
          ts.isBinaryExpression(expr) &&
          (expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken ||
            expr.operatorToken.kind === ts.SyntaxKind.BarBarToken ||
            expr.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken)
        )
          walkExpr(expr.right);
        else if (ts.isParenthesizedExpression(expr)) walkExpr(expr.expression);
      };
      walkExpr(node.expression);
    } else if (
      ts.isPropertyAssignment(node) &&
      TEXT_PROPERTIES.has(node.name.getText(sf).replace(/["']/g, ""))
    ) {
      const text = literalText(node.initializer);
      if (text && hasWords(text) && !insideT(node.initializer))
        report(node, `${node.name.getText(sf)}: ${text}`, "property");
    } else if (
      ts.isReturnStatement(node) &&
      node.expression &&
      !insideT(node.expression)
    ) {
      const text = literalText(node.expression);
      if (text && /^[A-Z][a-z]+ [A-Za-z]/.test(text))
        report(node, text, "return");
    } else if (
      ts.isThrowStatement(node) ||
      (ts.isNewExpression(node) && node.expression.getText(sf) === "Error")
    ) {
      const arg = ts.isNewExpression(node)
        ? node.arguments?.[0]
        : node.expression;
      const text = arg && literalText(arg);
      if (text && hasWords(text)) report(node, text, "error-text");
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
}

const messageFiles = [];
const messageDir = join(ROOT, "src/i18n/messages");
const walkMessages = (path) => {
  for (const name of readdirSync(path)) {
    const full = join(path, name);
    if (statSync(full).isDirectory()) walkMessages(full);
    else if (name.endsWith(".json")) messageFiles.push(full);
  }
};
walkMessages(messageDir);
for (const file of messageFiles) {
  const walkValue = (value, path) => {
    if (typeof value === "string") {
      if (/#/.test(value) && /plural/.test(value))
        findings.push(
          `${relative(ROOT, file)} [message] ${path}: a plural uses #, pass the formatted number as a variable`,
        );
      if (/\{[^}]*,\s*number/.test(value))
        findings.push(
          `${relative(ROOT, file)} [message] ${path}: do not use {x, number}, pass the formatted number as a variable`,
        );
    } else if (value && typeof value === "object") {
      for (const [key, child] of Object.entries(value))
        walkValue(child, path ? `${path}.${key}` : key);
    }
  };
  walkValue(JSON.parse(readFileSync(file, "utf8")), "");
}

console.log(findings.join("\n"));
console.log(
  `\n${findings.length} hard-coded text ${findings.length === 1 ? "item" : "items"} in ${files.length} files.`,
);
process.exit(findings.length ? 1 : 0);
