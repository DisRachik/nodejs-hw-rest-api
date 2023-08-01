const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const { userId } = req.body;

  if (contactId && !isValidObjectId(contactId)) {
    return next(HttpError(400, `${contactId} is not a valid id.`));
  }
  if (userId && !isValidObjectId(userId)) {
    return next(HttpError(400, `${userId} is not a valid id.`));
  }
  next();
};

module.exports = isValidId;
