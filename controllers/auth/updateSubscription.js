const { HttpError } = require('../../helpers');
const { UsersModel } = require('../../models');

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

module.exports = updateSubscription;
