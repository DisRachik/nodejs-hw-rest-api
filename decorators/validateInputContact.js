const { HttpError } = require('../helpers');

const validateInputContact = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, `${error.details[0].message}`));
    }
    next();
  };
};

module.exports = validateInputContact;
