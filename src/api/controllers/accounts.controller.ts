import { BadRequestError } from "@/helpers/custom-errors.helper";
import { validate } from "@/helpers/validate.helper";
import { depositSchema, withdrawSchema } from "@/api/schemas/accounts.schema";
import { depositService, withdrawService } from "@/services/accounts.service";
import type { NextFunction, Request, Response } from "express";

export const depositController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.iban) {
      throw new BadRequestError("IBAN parameter is missing");
    }
    await validate(req.body, depositSchema);
    const account = await depositService({
      cardNumber: req.body.cardNumber,
      cardPin: req.body.cardPin,
      iban: req.params.iban,
      amount: req.body.amount,
    });
    res.status(200).json({ message: "New amount: " + account.amount });
  } catch (error) {
    next(error);
  }
};

export const withdrawController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.iban) {
      throw new BadRequestError("IBAN parameter is missing");
    }
    await validate(req.body, withdrawSchema);
    const account = await withdrawService({
      cardNumber: req.body.cardNumber,
      cardPin: req.body.cardPin,
      iban: req.params.iban,
      amount: req.body.amount,
    });
    res.status(200).json({ message: "New amount: " + account.amount });
  } catch (error) {
    next(error);
  }
};
