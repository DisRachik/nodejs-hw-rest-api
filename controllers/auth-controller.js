const bcrypt = require('bcryptjs');

const { UsersModel } = require('../models');
const decorators = require('../decorators');
const { HttpError } = require('../helpers');

const register = async (req, res) => {
  // Варіант перевірки на дубль емейла без хука
  // const user = await UsersModel.findOne(req.body.email);
  // if (user) {
  //   throw HttpError(409, 'Email in use');
  // }

  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = await UsersModel.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    status: 'created',
    code: 201,
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = {
  register: decorators.ctrlWrapper(register),
};
