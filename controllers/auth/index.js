const { ctrlWrapper } = require('../../decorators');

const register = require('./register');
const verifyEmail = require('./verifyEmail');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./getCurrent');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
