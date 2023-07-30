const Joi = require('joi');
const { emailRegex } = require('../constants');

const schemaUser = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegex).required(),
});

module.exports = { schemaUser };
