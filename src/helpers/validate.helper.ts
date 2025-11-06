import { BadRequestError } from "@/helpers/custom-errors.helper";
import type { ObjectSchema, ValidationError } from "joi";

export const validate = async (data: any, schema: ObjectSchema) => {
  try {
    await schema.validateAsync(data);
  } catch (error: unknown) {
    const validationError = error as ValidationError;
    throw new BadRequestError(validationError.details[0]!.message);
  }
};
