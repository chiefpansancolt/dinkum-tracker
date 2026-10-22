import { SUPPORTED_LOCALES } from "@/i18n/locales";
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

const MESSAGES = "src/i18n/messages";

describe("language catalogs", () => {
  it("has a folder for every language and no folder for an unknown one", () => {
    const folders = readdirSync(MESSAGES, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();

    expect(folders).toEqual([...SUPPORTED_LOCALES].sort());
  });

  it("gives every language every English message with the same variables, tags and plurals", () => {
    // The script exits with 1 and prints the problems when any catalog differs from English.
    const output = execFileSync("node", ["scripts/check-catalogs.mjs"], {
      encoding: "utf8",
    });

    SUPPORTED_LOCALES.filter((locale) => locale !== "en").forEach((locale) =>
      expect(output).toMatch(
        new RegExp(
          `^${locale}: \\d+ of \\d+ messages, 0 missing, 0 problems$`,
          "m",
        ),
      ),
    );
  });
});
