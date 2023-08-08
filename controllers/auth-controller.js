require('dotenv').config();
const path = require('path');
const fs = require('fs/promises');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const { UsersModel } = require('../models');
const decorators = require('../decorators');
const { HttpError, deleteOldImg } = require('../helpers');

const { JWT_SECRET } = process.env;

const avatarPath = path.resolve('public', 'avatars');

const register = async (req, res) => {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const createdUser = await UsersModel.create({
    ...req.body,
    email: email.toLowerCase(),
    password: hashPassword,
    avatarURL: gravatar.url(email),
  });
  const { email: userEmail, subscription, avatarURL } = createdUser;

  res.status(201).json({
    status: 'created',
    code: 201,
    user: {
      email: userEmail,
      subscription,
      avatarURL,
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
  await UsersModel.findByIdAndUpdate(id, { token });

  res.status(200).json({
    status: 'success',
    code: 200,
    token,
    user: { email: userEmail, subscription },
  });
};

const logout = async (req, res) => {
  await UsersModel.findByIdAndUpdate(req.user._id, { token: '' });

  res.sendStatus(204);
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    status: 'success',
    code: 200,
    user: { email, subscription },
  });
};

const updateSubscription = async (req, res) => {
  const { userId, subscription } = req.body;
  const result = await UsersModel.findByIdAndUpdate(userId, { subscription }, { new: true });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      contact: result,
    },
  });
};

const updateAvatar = async (req, res) => {
  const { _id, avatarURL: oldAvatarUrl } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);

  await fs.rename(oldPath, newPath);

  const avatarURL = path.join('public', 'avatars', filename);

  const { avatarURL: newUrl } = await UsersModel.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      avatarURL: newUrl,
    },
  });

  deleteOldImg(oldAvatarUrl);
};

module.exports = {
  register: decorators.ctrlWrapper(register),
  login: decorators.ctrlWrapper(login),
  logout: decorators.ctrlWrapper(logout),
  getCurrent: decorators.ctrlWrapper(getCurrent),
  updateSubscription: decorators.ctrlWrapper(updateSubscription),
  updateAvatar: decorators.ctrlWrapper(updateAvatar),
};
