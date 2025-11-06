import type { Account, DepositDto } from "@/models/accounts.model";
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
    console.log(account.amount, deposit.amount, newAmount);
    return await updateAccountAmountRepository(account.iban, newAmount);
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Deposit failed", "DEPOSIT_SERVICE");
  }
};
