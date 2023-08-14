const Joi = require('joi');
const { emailRegex, allowedSubscriptions } = require('../constants');

const schemaUser = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegex).required(),
});

const schemaUpdateSubscriptionForUser = Joi.object({
  userId: Joi.string().required(),
  subscription: Joi.string()
    .valid(...allowedSubscriptions)
    .required()
    .messages({
      'any.only': `Subscription must be one of the following values: ${allowedSubscriptions.join(
        ', '
      )}`,
    }),
});

const schemaUserEmail = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'any.required': 'missing required field email',
    'string.pattern.base': 'invalid email format',
  }),
});

module.exports = { schemaUser, schemaUpdateSubscriptionForUser, schemaUserEmail };
