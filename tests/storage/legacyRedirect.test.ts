import { describe, expect, it } from "vitest";
import { redirectTarget } from "@/lib/services/legacyRedirect";

describe("redirectTarget", () => {
  it("keeps the target tab", () => {
    expect(redirectTarget("/pedia?tab=fish", "")).toBe("/pedia?tab=fish");
  });

  it("moves the name search to the new address", () => {
    expect(redirectTarget("/pedia?tab=fish", "?q=anchovy")).toBe(
      "/pedia?tab=fish&q=anchovy",
    );
  });

  it("adds the name search to a target without a query", () => {
    expect(redirectTarget("/npcs", "?q=fletch")).toBe("/npcs?q=fletch");
  });

  it("encodes a name search with spaces", () => {
    expect(redirectTarget("/gear?tab=tools", "?q=iron%20axe")).toBe(
      "/gear?tab=tools&q=iron+axe",
    );
  });

  it("drops other old search values", () => {
    expect(redirectTarget("/gear", "?page=2")).toBe("/gear");
  });
});
