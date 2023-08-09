const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { UsersModel } = require('../../models');

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

module.exports = register;
