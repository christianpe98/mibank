import {
  BadRequestError,
  UnauthorizedError,
} from "@/helpers/custom-errors.helper";
import { validate } from "@/helpers/validate.helper";
import { cardAuthenticationSchema } from "@/models/schemas/cards.schema";
import { isPinValidService } from "@/services/cards.service";
import type { NextFunction, Request, Response } from "express";

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validate(req.body, cardAuthenticationSchema);
    const isPinValid = await isPinValidService(
      req.body.cardNumber,
      req.body.cardPin
    );
    if (!isPinValid) {
      throw new UnauthorizedError("Invalid pin", "AUTH_MIDDLEWARE");
    }
    next();
  } catch (err) {
    next(err);
  }
};
