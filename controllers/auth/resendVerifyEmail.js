const { UsersModel } = require('../../models');
const { HttpError } = require('../../helpers');

const { sendEmail } = require('../../helpers');

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const user = await UsersModel.findOne({ email: req.body.email.toLowerCase() });

  if (!user) {
    throw HttpError(404, 'User not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  const verifyEmail = {
    to: user.email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to verify your email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Verification email sent',
  });
};

module.exports = resendVerifyEmail;
