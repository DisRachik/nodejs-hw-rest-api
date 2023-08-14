require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { HttpError } = require('../../helpers');
const { UsersModel } = require('../../models');

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersModel.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  if (!user.verify) {
    throw HttpError(401, 'You must verify your email!');
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const { _id: id, email: userEmail, subscription, avatarURL } = user;

  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '23h' });
  await UsersModel.findByIdAndUpdate(id, { token });

  res.status(200).json({
    status: 'success',
    code: 200,
    token,
    user: { email: userEmail, subscription, avatarURL },
  });
};

module.exports = login;
