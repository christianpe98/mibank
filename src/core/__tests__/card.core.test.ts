import { describe, it, expect } from "vitest";
import { comparePin } from "../cards.core";
import bcrypt from "bcryptjs";

describe("comparePin", () => {
  it("should return true for matching pin", () => {
    const plainPin = "1234";
    const hashedPin = bcrypt.hashSync(plainPin, 10);

    expect(comparePin(plainPin, hashedPin)).toBe(true);
  });

  it("should return false for non-matching pin", () => {
    const hashedPin = bcrypt.hashSync("1234", 10);

    expect(comparePin("5678", hashedPin)).toBe(false);
  });
});
