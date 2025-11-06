import type {
  Account,
  DepositDto,
  WithdrawDto,
} from "@/core/models/accounts.model";
import { getCardByNumberService } from "./cards.service";
import {
  getAccountByIdRepository,
  updateAccountAmountRepository,
} from "@/repositories/accounts.repository";
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from "@/helpers/custom-errors.helper";
import {
  calculateDeposit,
  calculateWithdrawal,
  validateAccountOwnership,
  validateAmount,
  validateSufficientFunds,
} from "@/core/accounts.core";

export const depositService = async (deposit: DepositDto): Promise<Account> => {
  try {
    validateAmount(deposit.amount, "deposit");

    const card = await getCardByNumberService(deposit.cardNumber);
    const account = await getAccountByIdRepository(card.accountId);

    validateAccountOwnership(account.iban, deposit.iban, "deposit");

    const newAmount = calculateDeposit(account.amount, deposit.amount);
    return await updateAccountAmountRepository(account.iban, newAmount);
  } catch (error) {
    if (
      error instanceof BadRequestError ||
      error instanceof UnauthorizedError
    ) {
      throw error;
    }
    throw new InternalServerError("Deposit failed", "DEPOSIT_SERVICE");
  }
};

export const withdrawService = async (
  withdraw: WithdrawDto
): Promise<Account> => {
  try {
    validateAmount(withdraw.amount, "withdraw");

    const card = await getCardByNumberService(withdraw.cardNumber);
    const account = await getAccountByIdRepository(card.accountId);
    validateAccountOwnership(account.iban, withdraw.iban, "withdraw");

    const newAmount = calculateWithdrawal(account.amount, withdraw.amount);
    validateSufficientFunds(account.amount, withdraw.amount);

    return await updateAccountAmountRepository(account.iban, newAmount);
  } catch (error) {
    if (
      error instanceof BadRequestError ||
      error instanceof UnauthorizedError
    ) {
      throw error;
    }
    throw new InternalServerError("Withdraw failed", "WITHDRAW_SERVICE");
  }
};
