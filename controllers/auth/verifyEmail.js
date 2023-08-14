const { UsersModel } = require('../../models');
const { HttpError } = require('../../helpers');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const { _id } = await UsersModel.findOne({ verificationToken });

  if (!_id) {
    throw HttpError(404, 'User not found');
  }

  await UsersModel.findByIdAndUpdate(_id, { verify: true, verificationToken: '' });

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;
