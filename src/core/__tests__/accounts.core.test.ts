import { describe, it, expect } from "vitest";
import {
  calculateDeposit,
  calculateWithdrawal,
  validateAmount,
  validateAccountOwnership,
  validateSufficientFunds,
} from "../accounts.core";
import {
  BadRequestError,
  UnauthorizedError,
} from "@/helpers/custom-errors.helper";

describe("calculateDeposit", () => {
  it("should calculate deposits correctly", () => {
    expect(calculateDeposit(100, 50)).toBe(150);
  });
});

describe("calculateWithdrawal", () => {
  it("should calculate withdrawals correctly", () => {
    expect(calculateWithdrawal(100, 30)).toBe(70);
  });
});

describe("validateAmount", () => {
  it("should pass for positive amounts", () => {
    expect(() => validateAmount(100, "Deposit")).not.toThrow();
  });

  it("should fail for zero", () => {
    expect(() => validateAmount(0, "Deposit")).toThrow(BadRequestError);
  });

  it("should fail for negative amounts", () => {
    expect(() => validateAmount(-10, "Withdraw")).toThrow(BadRequestError);
  });
});

describe("validateAccountOwnership", () => {
  it("should pass when IBANs match", () => {
    expect(() =>
      validateAccountOwnership("ES1", "ES1", "Deposit")
    ).not.toThrow();
  });

  it("should fail when IBANs do not match", () => {
    expect(() => validateAccountOwnership("ES1", "ES2", "Deposit")).toThrow(
      UnauthorizedError
    );
  });
});

describe("validateSufficientFunds", () => {
  it("should pass with sufficient funds", () => {
    expect(() => validateSufficientFunds(100, 50)).not.toThrow();
  });

  it("should pass when exact amount", () => {
    expect(() => validateSufficientFunds(100, 100)).not.toThrow();
  });

  it("should fail with insufficient funds", () => {
    expect(() => validateSufficientFunds(50, 100)).toThrow(BadRequestError);
  });
});
