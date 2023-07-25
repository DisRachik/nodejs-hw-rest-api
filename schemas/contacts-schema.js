const Joi = require('joi');

const schemaContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const schemaUpdateFavoriteForContact = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { schemaContact, schemaUpdateFavoriteForContact };
