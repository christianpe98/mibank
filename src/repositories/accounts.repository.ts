import { pool } from "@/db/connection";
import { NotFoundError } from "@/helpers/custom-errors.helper";

const mapCardRowToModel = (row: any) => ({
  id: row.id,
  iban: row.iban,
  amount: Number(row.amount),
  bankId: row.bank_id,
});

export const getAccountByIdRepository = async (id: string) => {
  const result = await pool.query("SELECT * FROM accounts WHERE id = $1", [id]);
  if (result.rows.length === 0) {
    throw new NotFoundError("Account not found", "GET_ACCOUNT_BY_ID");
  }
  return mapCardRowToModel(result.rows[0]);
};

export const updateAccountAmountRepository = async (
  iban: string,
  newAmount: number
) => {
  const result = await pool.query(
    "UPDATE accounts SET amount = $1 WHERE iban = $2 RETURNING *",
    [newAmount, iban]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Account not found", "UPDATE_ACCOUNT_AMOUNT");
  }
  return mapCardRowToModel(result.rows[0]);
};
