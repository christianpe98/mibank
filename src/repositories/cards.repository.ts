import { pool } from "@/db/connection";
import { NotFoundError } from "@/helpers/custom-errors.helper";
import type { Card } from "@/models/cards.model";

const mapCardRowToModel = (row: any): Card => ({
  id: row.id,
  number: row.number,
  pin: row.pin,
  accountId: row.account_id,
});

export const getCardByNumberRepository = async (
  cardNumber: string
): Promise<Card> => {
  console.log("Fetching card with number:", cardNumber);
  const result = await pool.query("SELECT * FROM cards WHERE number = $1", [
    cardNumber,
  ]);
  if (result.rows.length === 0) {
    throw new NotFoundError("Card not found", "GET_CARD_BY_NUMBER");
  }
  return mapCardRowToModel(result.rows[0]);
};
