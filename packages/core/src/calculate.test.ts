import { describe, expect, it } from "vitest";
import { calculateTip, parseAmount } from "./calculate";
import { compareSemver, isRemoteNewer } from "./semver";

describe("calculateTip", () => {
  it("splits a standard check", () => {
    const result = calculateTip({ bill: 86, tipPercent: 20, people: 2 });
    expect(result.tip).toBe(17.2);
    expect(result.total).toBe(103.2);
    expect(result.perPerson).toBe(51.6);
  });

  it("never uses fewer than one guest", () => {
    const result = calculateTip({ bill: 40, tipPercent: 15, people: 0 });
    expect(result.people).toBe(1);
    expect(result.tip).toBe(6);
  });
});

describe("parseAmount", () => {
  it("strips currency glyphs", () => {
    expect(parseAmount("$12.50")).toBe(12.5);
  });
});

describe("semver", () => {
  it("treats v-prefixed tags as equal to bare versions", () => {
    expect(compareSemver("v1.2.0", "1.2.0")).toBe(0);
    expect(isRemoteNewer("v1.2.1", "1.2.0")).toBe(true);
    expect(isRemoteNewer("1.0.0", "1.0.0")).toBe(false);
  });
});
