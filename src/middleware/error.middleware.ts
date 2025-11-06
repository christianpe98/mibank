import type { CustomError } from "@/helpers/custom-errors.helper";
import type { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status).json({ message: err.message, code: err.code });
};
