import Joi from "joi";

export const depositSchema = Joi.object({
  cardNumber: Joi.string().required(),
  cardPin: Joi.string().required(),
  amount: Joi.number().min(0).required(),
});

export const withdrawSchema = Joi.object({
  cardNumber: Joi.string().required(),
  cardPin: Joi.string().required(),
  amount: Joi.number().min(0).required(),
});
