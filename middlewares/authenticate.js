const jwt = require('jsonwebtoken');

const { UsersModel } = require('../models');
const decorators = require('../decorators');
const { HttpError } = require('../helpers');

const { JWT_SECRET } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw HttpError(401, 'Not authorized');
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await UsersModel.findById(id);
    if (!user || !user.token) {
      throw HttpError(401, 'Not authorized');
    }

    req.user = user;
    next();
  } catch {
    throw HttpError(401, 'Not authorized');
  }
};

module.exports = decorators.ctrlWrapper(authenticate);
