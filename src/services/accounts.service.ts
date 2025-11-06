import type { Account, DepositDto, WithdrawDto } from "@/models/accounts.model";
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

export const depositService = async (deposit: DepositDto): Promise<Account> => {
  try {
    if (deposit.amount <= 0) {
      throw new BadRequestError(
        "Deposit amount must be greater than zero",
        "DEPOSIT_SERVICE"
      );
    }
    const card = await getCardByNumberService(deposit.cardNumber);
    const account = await getAccountByIdRepository(card.accountId);
    if (deposit.iban !== account.iban) {
      throw new UnauthorizedError(
        "Card does not belong to the account",
        "DEPOSIT_SERVICE"
      );
    }
    const newAmount = account.amount + deposit.amount;
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
    if (withdraw.amount <= 0) {
      throw new BadRequestError(
        "Withdraw amount must be greater than zero",
        "WITHDRAW_SERVICE"
      );
    }
    const card = await getCardByNumberService(withdraw.cardNumber);
    const account = await getAccountByIdRepository(card.accountId);
    if (withdraw.iban !== account.iban) {
      throw new UnauthorizedError(
        "Card does not belong to the account",
        "WITHDRAW_SERVICE"
      );
    }
    const newAmount = account.amount - withdraw.amount;
    if (newAmount < 0) {
      throw new BadRequestError("Insufficient funds", "WITHDRAW_SERVICE");
    }
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
