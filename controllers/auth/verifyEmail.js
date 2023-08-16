const { UsersModel } = require('../../models');
const { HttpError } = require('../../helpers');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await UsersModel.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  await UsersModel.findByIdAndUpdate(user._id, { verify: true, verificationToken: '' });

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;
