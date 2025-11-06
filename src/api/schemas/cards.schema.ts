import Joi from "joi";

export const cardAuthenticationSchema = Joi.object({
  cardNumber: Joi.string().required(),
  cardPin: Joi.string().required(),
}).unknown(true);
