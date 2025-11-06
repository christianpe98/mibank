import {
  BadRequestError,
  UnauthorizedError,
} from "@/helpers/custom-errors.helper";

export const calculateDeposit = (
  currentAmount: number,
  depositAmount: number
): number => {
  return currentAmount + depositAmount;
};

export const calculateWithdrawal = (
  currentAmount: number,
  withdrawAmount: number
): number => {
  return currentAmount - withdrawAmount;
};

export const validateAmount = (amount: number, operation: string) => {
  if (amount <= 0) {
    throw new BadRequestError(
      `${operation} amount must be greater than zero`,
      `${operation.toUpperCase()}_SERVICE`
    );
  }
};

export const validateAccountOwnership = (
  accountIban: string,
  requestIban: string,
  operation: string
) => {
  if (accountIban !== requestIban) {
    throw new UnauthorizedError(
      "Card does not belong to the account",
      `${operation.toUpperCase()}_SERVICE`
    );
  }
};

export const validateSufficientFunds = (
  currentAmount: number,
  withdrawAmount: number
) => {
  const newAmount = currentAmount - withdrawAmount;
  if (newAmount < 0) {
    throw new BadRequestError("Insufficient funds", "WITHDRAW_SERVICE");
  }
};
