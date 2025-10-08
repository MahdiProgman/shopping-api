import Joi from 'joi';

export const configValidationSchema = Joi.object({
  app: {
    port: Joi.number().required(),
  },
});
