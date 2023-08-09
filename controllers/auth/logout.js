const { UsersModel } = require('../../models');

const logout = async (req, res) => {
  await UsersModel.findByIdAndUpdate(req.user._id, { token: '' });

  res.sendStatus(204);
};

module.exports = logout;
