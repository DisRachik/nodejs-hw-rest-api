const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const generateID = async () => {
  const { nanoid } = await import('nanoid');

  return nanoid();
};

const { UsersModel } = require('../../models');
const { sendEmail } = require('../../helpers');

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = await generateID();

  const createdUser = await UsersModel.create({
    ...req.body,
    email: email.toLowerCase(),
    password: hashPassword,
    verificationToken,
    avatarURL: gravatar.url(email),
  });
  const { email: userEmail, subscription, avatarURL } = createdUser;

  const verifyEmail = {
    to: userEmail,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to verify your email</a>`,
  };
  await sendEmail(verifyEmail);

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
