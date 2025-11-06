import { describe, it, expect } from "vitest";
import { isPinValidService } from "../cards.service";

describe("isPinValidService - Integration", () => {
  it("should return true for correct pin", async () => {
    const result = await isPinValidService("1", "1234");

    expect(result).toBe(true);
  });

  it("should return false for incorrect pin", async () => {
    const result = await isPinValidService("1", "adfasdfef");

    expect(result).toBe(false);
  });

  it("should return true for card 2 with correct pin", async () => {
    const result = await isPinValidService("2", "5678");

    expect(result).toBe(true);
  });
});
