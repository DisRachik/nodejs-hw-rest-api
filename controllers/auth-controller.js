const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { UsersModel } = require('../models');
const decorators = require('../decorators');
const { HttpError } = require('../helpers');

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  // Варіант перевірки на дубль email без хука
  // const user = await UsersModel.findOne(req.body.email);
  // if (user) {
  //   throw HttpError(409, 'Email in use');
  // }

  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const createdUser = await UsersModel.create({
    ...req.body,
    email: email.toLowerCase(),
    password: hashPassword,
  });
  const { email: userEmail, subscription } = createdUser;

  res.status(201).json({
    status: 'created',
    code: 201,
    user: {
      email: userEmail,
      subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersModel.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const { _id: id, email: userEmail, subscription } = user;

  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '23h' });

  res.status(200).json({
    status: 'success',
    code: 200,
    token,
    user: { email: userEmail, subscription },
  });
};

module.exports = {
  register: decorators.ctrlWrapper(register),
  login: decorators.ctrlWrapper(login),
};
