import { InternalServerError } from "@/helpers/custom-errors.helper";
import { getCardByNumberRepository } from "@/repositories/cards.repository";
import bcrypt from "bcryptjs";

export const isPinValidService = async (
  cardNumber: string,
  cardPin: string
) => {
  try {
    const card = await getCardByNumberRepository(cardNumber);
    return bcrypt.compareSync(cardPin, card.pin);
  } catch (error) {
    console.error(error);
    throw new InternalServerError("PIN validation failed", "CARD_SERVICE");
  }
};

export const getCardByNumberService = async (cardNumber: string) => {
  try {
    return await getCardByNumberRepository(cardNumber);
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Card retrieval failed", "CARD_SERVICE");
  }
};
