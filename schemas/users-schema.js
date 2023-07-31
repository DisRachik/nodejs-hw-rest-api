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

module.exports = { schemaUser, schemaUpdateSubscriptionForUser };
